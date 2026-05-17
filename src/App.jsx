import { useMemo, useState } from "react";

const bookingUrl = "https://apps.kitomba.com/bookings/ancostudio";

const services = {
  consultation: {
    eyebrow: "Start here",
    title: "Consultation",
    price: "$25-$50",
    time: "15 minutes",
    plain: "Best if you are not sure what to book, want a big change, or need an artist to check your hair first.",
    examples: ["Hair plan", "Colour advice", "Suitability check"],
  },
  colour: {
    eyebrow: "Hair colour",
    title: "Colour, blonding or gloss",
    price: "$30-$350+",
    time: "15-120 minutes before finish time",
    plain: "Best if you want lighter hair, grey coverage, balayage, highlights, bleach, toner, gloss, or a full colour refresh.",
    examples: ["Balayage", "Highlights", "Tint", "Toner / gloss", "On-scalp bleach"],
  },
  cut: {
    eyebrow: "Cut and finish",
    title: "Cut, blow-dry or styling",
    price: "$15-$200",
    time: "15-90 minutes",
    plain: "Best if you want a trim, a restyle, a tidy short cut, a blow-dry, event hair, or a fringe tidy.",
    examples: ["Cut and blow-dry", "Restyle", "Blow dry", "Hair up", "Fringe trim"],
  },
  headspa: {
    eyebrow: "Scalp care",
    title: "Head spa",
    price: "$108-$168",
    time: "60-75 minutes",
    plain: "Best if your scalp feels oily, dry, flaky, itchy, or you want a relaxing reset with massage and a soft finish.",
    examples: ["Classic Head Spa", "Deluxe Head Spa", "Scalp treatment upgrade"],
  },
  treatment: {
    eyebrow: "Hair health",
    title: "Smoothing or repair treatment",
    price: "$30-$600",
    time: "15-240 minutes",
    plain: "Best if your hair feels dry, frizzy, fragile, hard to blow-dry, or needs strength and shine.",
    examples: ["Aura smoothing", "K18", "Olaplex", "Keratin protein", "Protein and moisture"],
  },
  texture: {
    eyebrow: "Texture change",
    title: "Perm or straightening",
    price: "$100-$400",
    time: "30-240 minutes",
    plain: "Best if you want a longer-lasting change to curl, wave, volume, or straightness.",
    examples: ["Cold perm", "Roots perm", "Down perm", "Chemical straightening"],
  },
  makeup: {
    eyebrow: "Event ready",
    title: "Makeup and dry styling",
    price: "$10-$180",
    time: "15-90 minutes",
    plain: "Best if you have an event, photos, a night out, or want makeup paired with styled hair.",
    examples: ["Natural glam", "Full glam", "False lashes", "Dry styling"],
  },
  beauty: {
    eyebrow: "Beauty",
    title: "Waxing, brows, lashes or nails",
    price: "$10-$98",
    time: "15-45 minutes",
    plain: "Best if you want waxing, brow tinting, lash tinting, manicure, pedicure, or gel polish.",
    examples: ["Brow wax", "Lash tint", "Face or body waxing", "Manicure", "Pedicure"],
  },
};

const questions = [
  {
    id: "mainNeed",
    title: "What are you hoping to book?",
    helper: "Choose the option that sounds closest. You do not need to know the salon name for it.",
    options: [
      { label: "I need advice first", value: "consultation" },
      { label: "I want colour or lighter hair", value: "colour" },
      { label: "I want a cut or blow-dry", value: "cut" },
      { label: "I want beauty, brows, lashes or nails", value: "beauty" },
    ],
  },
  {
    id: "hairGoal",
    title: "What result do you want most?",
    helper: "This helps narrow down the right ANCO service family.",
    options: [
      { label: "Brighter blonde, balayage or highlights", value: "colour" },
      { label: "Less frizz, more shine, healthier hair", value: "treatment" },
      { label: "A relaxing scalp reset", value: "headspa" },
      { label: "Longer-lasting curl, wave or straightness", value: "texture" },
    ],
  },
  {
    id: "occasion",
    title: "Is this for an occasion?",
    helper: "A normal day, a big event, or a bigger change all point to different bookings.",
    options: [
      { label: "Just everyday maintenance", value: "cut" },
      { label: "A special event or photos", value: "makeup" },
      { label: "A noticeable transformation", value: "consultation" },
      { label: "A tidy-up before I book something bigger", value: "colour" },
    ],
  },
  {
    id: "confidence",
    title: "How sure are you about the service?",
    helper: "If you are unsure, ANCO's consultation is the safest starting point.",
    options: [
      { label: "I am not sure what my hair needs", value: "consultation" },
      { label: "I know I need hair colour", value: "colour" },
      { label: "I know I need a cut or styling", value: "cut" },
      { label: "I know I need beauty services", value: "beauty" },
    ],
  },
];

const categoryRows = [
  "Colour",
  "Consultation",
  "Cut and styling",
  "Head spa",
  "Make up",
  "Perm and straightening",
  "Treatments",
  "Barbering",
  "Waxing, brows, lashes and nails",
];

function getRecommendation(answers) {
  const scores = Object.keys(services).reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});

  Object.values(answers).forEach((answer) => {
    scores[answer] += answer === "consultation" ? 1.2 : 1;
  });

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

export default function App() {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);

  const currentQuestion = questions[step];
  const isComplete = step >= questions.length;
  const recommendationKey = useMemo(() => getRecommendation(answers), [answers]);
  const recommendation = services[recommendationKey];

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
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">ANCO Studio - Auckland CBD</p>
          <h1 id="hero-title">Find the right ANCO booking.</h1>
          <p>
            A simple guide for colour, cuts, styling, head spa, treatments,
            makeup, grooming and beauty services.
          </p>
          <a className="text-link" href={bookingUrl}>
            Book online with ANCO
          </a>
        </div>
        <img
          src="https://static.wixstatic.com/media/385ad2_9e78327fe21e4c039ee8f0875ab81597~mv2.jpg/v1/fill/w_2024,h_1168,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/385ad2_9e78327fe21e4c039ee8f0875ab81597~mv2.jpg"
          alt="ANCO Studio hair work"
        />
      </section>

      <section className="consultation-panel" aria-live="polite">
        {!isComplete ? (
          <>
            <div className="progress">
              <span>Question {step + 1} of {questions.length}</span>
              <div>
                <span style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
              </div>
            </div>

            <h2>{currentQuestion.title}</h2>
            <p className="helper">{currentQuestion.helper}</p>
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
            <p className="eyebrow">{recommendation.eyebrow}</p>
            <h2>{recommendation.title}</h2>
            <p>{recommendation.plain}</p>

            <dl>
              <div>
                <dt>Price guide</dt>
                <dd>{recommendation.price}</dd>
              </div>
              <div>
                <dt>Time guide</dt>
                <dd>{recommendation.time}</dd>
              </div>
            </dl>

            <div className="chips" aria-label="Example services">
              {recommendation.examples.map((example) => (
                <span key={example}>{example}</span>
              ))}
            </div>

            <div className="actions">
              <a href={bookingUrl}>Book this at ANCO</a>
              <button type="button" onClick={restart}>Start again</button>
            </div>
          </div>
        )}
      </section>

      <section className="service-strip" aria-label="ANCO service offering">
        <div>
          <p className="eyebrow">Full service offering</p>
          <h2>Hair, beauty and grooming under one roof.</h2>
        </div>
        <ul>
          {categoryRows.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </section>

      <section className="details">
        <p>
          ANCO Studio is at 1A/120 Customs Street West, Viaduct Harbour,
          Auckland CBD, 1010.
        </p>
        <p>
          Call +64 27 225 7002 or email info@ancostudio.com.
        </p>
      </section>
    </main>
  );
}
