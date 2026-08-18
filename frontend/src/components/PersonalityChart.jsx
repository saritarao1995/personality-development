const TRAIT_LABELS = {
  openness: 'Openness',
  conscientiousness: 'Conscientiousness',
  extraversion: 'Extraversion',
  agreeableness: 'Agreeableness',
  neuroticism: 'Emotional Stability',
};

const PersonalityChart = ({ traits }) => {
  if (!traits) return null;

  return (
    <div className="personality-chart">
      {Object.entries(traits).map(([key, value], index) => (
        <div key={key} className="trait-bar" style={{ animationDelay: `${index * 0.08}s` }}>
          <div className="trait-label">
            <span>{TRAIT_LABELS[key] || key}</span>
            <span>{value}%</span>
          </div>
          <div className="trait-track">
            <div
              className="trait-fill"
              style={{ '--trait-value': `${value}%`, '--animation-delay': `${index * 0.08}s` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonalityChart;
