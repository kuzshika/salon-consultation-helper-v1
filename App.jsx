import { useMemo, useState } from "react";

const salonPricing = {
  refresh: {
    service: "Gloss and Refresh",
    time: "60-75 minutes",
    price: "$95-$145",
    fit: "Best for guests who like their current look and want shine, tone, and polish.",
  },
  colour: {
    service: "Signature Colour Consultation",
    time: "90-150 minutes",
    price: "$180-$320",
    fit: "Best for guests wanting a visible colour change, grey blending, or a softer grow-out.",
  },
  cut: {
    service: "Shape and Styling Session",
    time: "60-90 minutes",
    price: "$110-$180",
    fit: "Best for guests who want a new shape, stronger layers, or easier everyday styling.",
  },
  repair: {
    service: "Repair Ritual and Finish",
    time: "75-105 minutes",
    price: "$120-$210",
    fit: "Best for dry, fragile, or heat-stressed hair that needs care before a bigger change.",
  },
};

const questions = [
  {
    id: "goal",
    title: "What would you like help with?",
    options: [
      { label: "Freshen my current look", value: "refresh" },
      { label: "Change my colour", value: "colour" },
      { label: "Change my cut or shape", value: "cut" },
      { label: "Repair and improve condition", value: "repair" },
    ],
  },
  {
    id: "maintenance",
    title: "How much salon upkeep feels right?",
    options: [
      { label: "Low maintenance", value: "refresh" },
      { label: "Every 6-8 weeks", value: "colour" },
      { label: "I enjoy regular appointments", value: "colour" },
      { label: "I need a plan first", value: "repair" },
    ],
  },
  {
    id: "priority",
    title: "What matters most today?",
    options: [
      { label: "Gloss and shine", value: "refresh" },
      { label: "A noticeable transformation", value: "colour" },
      { label: "Easy styling at home", value: "cut" },
      { label: "Healthier-feeling hair", value: "repair" },
    ],
  },
];

function getRecommendation(answers) {
  const scores = Object.keys(salonPricing).reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});

  Object.values(answers).forEach((answer) => {
    scores[answer] += 1;
  });

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

export default function App() {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);

  const currentQuestion = questions[step];
  const isComplete = step >= questions.length;
  const recommendationKey = useMemo(() => getRecommendation(answers), [answers]);
  const recommendation = salonPricing[recommendationKey];

  function chooseAnswer(value) {
    setAnswers((current) => ({ ...current, [currentQuestion.id]: value }));
    setStep((current) => current + 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Atelier Salon</p>
        <h1>Not sure what to book?</h1>
        <p>
          Answer a few quick questions and get a calm, client-friendly starting
          recommendation before booking.
        </p>
      </section>

      <section className="consultation-panel" aria-live="polite">
        {!isComplete ? (
          <>
            <div className="progress">
              <span>Step {step + 1} of {questions.length}</span>
              <div>
                <span style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
              </div>
            </div>

            <h2>{currentQuestion.title}</h2>
            <div className="option-grid">
              {currentQuestion.options.map((option) => (
                <button key={option.label} type="button" onClick={() => chooseAnswer(option.value)}>
                  {option.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <p className="eyebrow">Recommended starting point</p>
            <h2>{recommendation.service}</h2>
            <p>{recommendation.fit}</p>

            <dl>
              <div>
                <dt>Estimated time</dt>
                <dd>{recommendation.time}</dd>
              </div>
              <div>
                <dt>Typical range</dt>
                <dd>{recommendation.price}</dd>
              </div>
            </dl>

            <div className="actions">
              <a href="mailto:hello@example-salon.com">Enquire now</a>
              <button type="button" onClick={restart}>Start again</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
