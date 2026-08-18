import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuestions,
  submitAssessment,
  clearCurrentResults,
} from '../store/slices/assessmentsSlice';
import { fetchProfile } from '../store/slices/authSlice';
import PersonalityChart from '../components/PersonalityChart';
import GuestBanner from '../components/GuestBanner';
import PageBanner from '../components/ui/PageBanner';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { ASSESSMENT_QUESTIONS, calculateAssessmentResults } from '../data/demoData';
import { IMAGES } from '../data/images';

const SCORE_LABELS = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

const Assessment = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { questions: apiQuestions, currentResults, loading } = useSelector((state) => state.assessments);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [guestResults, setGuestResults] = useState(null);

  const isGuest = !token;
  const questions = isGuest ? ASSESSMENT_QUESTIONS : apiQuestions;
  const results = isGuest ? guestResults : currentResults;
  const progress = questions.length ? Math.round(((step + 1) / questions.length) * 100) : 0;

  useEffect(() => {
    if (token) {
      dispatch(fetchQuestions());
    }
    return () => dispatch(clearCurrentResults());
  }, [dispatch, token]);

  const currentQuestion = questions[step];
  const allAnswered = questions.length > 0 && questions.every((q) => answers[q.id]);

  const handleAnswer = (questionId, score) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const handleNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    const formattedAnswers = Object.entries(answers).map(([questionId, score]) => ({
      questionId: Number(questionId),
      score,
    }));

    if (isGuest) {
      setGuestResults(calculateAssessmentResults(formattedAnswers));
      return;
    }

    dispatch(submitAssessment(formattedAnswers)).then(() => {
      dispatch(fetchProfile());
    });
  };

  const handleRetake = () => {
    setAnswers({});
    setStep(0);
    if (isGuest) {
      setGuestResults(null);
    } else {
      dispatch(clearCurrentResults());
    }
  };

  if (!isGuest && questions.length === 0) {
    return (
      <div className="page assessment-page">
        <LoadingSpinner label="Loading assessment..." />
      </div>
    );
  }

  if (results) {
    return (
      <div className="page assessment-page">
        <PageBanner
          src={IMAGES.pages.assessment}
          alt="Personality assessment results"
          title="Your Personality Results"
          subtitle="Based on the scientifically validated Big Five model"
        />
        {isGuest && <GuestBanner />}
        <div className="card results-card">
          <PersonalityChart traits={results} />
        </div>
        {isGuest && (
          <div className="results-cta card">
            <p>Save your results and track growth over time.</p>
            <Link to="/register" className="btn btn-primary">Create Free Account</Link>
          </div>
        )}
        <button type="button" className="btn btn-outline" onClick={handleRetake}>
          Retake Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="page assessment-page">
      <PageBanner
        src={IMAGES.pages.assessment}
        alt="Personality assessment quiz"
        title="Personality Assessment"
        subtitle="Answer honestly — there are no right or wrong answers. Free · 5 minutes"
      />
      {isGuest && <GuestBanner />}

      <div className="card assessment-card">
        <div className="assessment-progress-bar">
          <div className="assessment-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-indicator">
          Question {step + 1} of {questions.length}
        </div>

        <h2 className="question-text">{currentQuestion?.text}</h2>

        <div className="score-options">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              type="button"
              className={`score-btn ${answers[currentQuestion?.id] === score ? 'selected' : ''}`}
              onClick={() => handleAnswer(currentQuestion.id, score)}
            >
              <span className="score-num">{score}</span>
              <span className="score-label">{SCORE_LABELS[score - 1]}</span>
            </button>
          ))}
        </div>

        <div className="assessment-nav">
          <button type="button" className="btn btn-outline" onClick={handlePrev} disabled={step === 0}>
            Previous
          </button>
          {step < questions.length - 1 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNext}
              disabled={!answers[currentQuestion?.id]}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!allAnswered || loading}
            >
              {loading ? 'Submitting...' : 'See My Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
