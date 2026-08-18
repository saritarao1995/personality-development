import { useState } from 'react';

const FAQS = [
  {
    q: 'What is Personality Development?',
    a: 'It is a personalized growth platform that helps you understand yourself through a Big Five personality assessment, set development goals, and track daily progress through journaling.',
  },
  {
    q: 'Is the assessment free?',
    a: 'Yes! You can take the full personality assessment without creating an account. Sign up only when you want to save your results and track progress over time.',
  },
  {
    q: 'How long does the quiz take?',
    a: 'About 5 minutes. The assessment uses simple questions about how you think, work, and approach life. Answer honestly for the most accurate profile.',
  },
  {
    q: 'What is the Big Five model?',
    a: 'The Big Five is a scientifically validated personality framework measuring five core traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism (emotional balance).',
  },
  {
    q: 'Do I need to sign in?',
    a: 'No. You can explore the full website, take the assessment, and browse sample data as a guest. Create a free account to save your profile, goals, and journal entries.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="landing-section">
      <div className="section-header">
        <span className="section-tag">FAQ</span>
        <h2>Frequently asked questions</h2>
      </div>

      <div className="faq-list">
        {FAQS.map((item, index) => (
          <div key={item.q} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
            <button
              type="button"
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            >
              {item.q}
              <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && <p className="faq-answer">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
