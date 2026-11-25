
import React, { useState } from "react";
import "./MatchEngine.css";

const STORAGE_KEY = "adsphere_test_records_v2";
const USER_KEY = "adsphere_anonymous_user_v2";

const CATEGORIES = [
  "Beauty",
  "Fashion",
  "Electronics",
  "Home & Living",
  "Food & Beverage",
  "Pet Supplies",
  "Sports & Outdoors",
  "Personal Care",
  "Other"
];

const GOALS = [
  "Market Testing",
  "Sales Growth",
  "Brand Awareness",
  "Product Launch",
  "Market Expansion"
];

const USER_TYPES = [
  "Merchant",
  "Creator",
  "Agency",
  "Supplier"
];

const STRATEGIES = {
  "Market Testing":
    "Begin with a controlled creator pilot. Evaluate audience response, product interest and feedback before scaling.",

  "Sales Growth":
    "Prioritize conversion-focused product demonstrations. Monitor conversion rate and customer acquisition cost.",

  "Brand Awareness":
    "Develop audience-aligned storytelling and short-form content. Track reach, engagement and brand discovery.",

  "Product Launch":
    "Coordinate product sampling, creator demonstrations and launch schedules. Evaluate initial customer feedback.",

  "Market Expansion":
    "Validate demand in new customer segments. Assess distribution capacity and potential commercial partnerships."
};

const CATEGORY_ADVICE = {
  "Beauty":
    "Prioritize tutorials, product texture and application demonstrations.",

  "Fashion":
    "Prioritize styling videos, fit demonstrations and audience alignment.",

  "Electronics":
    "Prioritize feature demonstrations and product comparisons.",

  "Home & Living":
    "Prioritize practical use cases and lifestyle demonstrations.",

  "Food & Beverage":
    "Prioritize preparation, taste and product experience.",

  "Pet Supplies":
    "Prioritize practical demonstrations for pet owners.",

  "Sports & Outdoors":
    "Prioritize activity-based product demonstrations.",

  "Personal Care":
    "Prioritize routine-based educational content.",

  "Other":
    "Prioritize clear product demonstrations and audience relevance."
};

const EMPTY_EVALUATION = {
  relevance: "",
  ease: "",
  applicability: "",
  feedback: "",
  issues: "",
  improvements: "",
  status: ""
};

function createId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return (
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2)
  );
}

function getAnonymousUserId() {
  try {
    const existing = localStorage.getItem(USER_KEY);

    if (existing) return existing;

    const id = "AS-" + createId();

    localStorage.setItem(USER_KEY, id);

    return id;
  } catch {
    return "AS-" + createId();
  }
}

function loadRecords() {
  try {
    const data = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    return Array.isArray(data)
      ? data.filter(
          r => r && typeof r === "object"
        )
      : [];
  } catch {
    return [];
  }
}

function currency(value) {
  return Number(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  });
}

function generateRecommendation(input) {
  const budget = Number(input.budget);

  let tier;
  let range;
  let estimatedCost;

  if (budget < 2000) {
    tier = "Nano Influencer";
    range = "1K–10K";
    estimatedCost = 100;
  } else if (budget < 15000) {
    tier = "Micro Influencer";
    range = "10K–50K";
    estimatedCost = 300;
  } else {
    tier = "Mid-Tier Influencer";
    range = "50K–250K";
    estimatedCost = 1000;
  }

  const budgetScore = Math.round(
    45 * budget / (budget + 3000)
  );

  const audienceScore =
    input.audience.trim().length >= 10 ? 15 : 8;

  const score = Math.min(
    100,
    40 + budgetScore + audienceScore
  );

  const creatorBudget = budget * 0.7;

  return {
    tier,
    range,

    quantity: Math.floor(
      creatorBudget / estimatedCost
    ),

    score,
    estimatedCost,
    creatorBudget,
    budgetScore,
    audienceScore,

    strategy:
      STRATEGIES[input.goal] +
      " " +
      CATEGORY_ADVICE[input.category],

    logistics:
      budget >= 10000
        ? "Evaluate inventory capacity, fulfillment performance and third-party logistics options before scaling."
        : "Validate inventory availability and shipping readiness during the initial pilot.",

    explanation:
      "Recommendations are based on campaign budget, selected product category, audience description and business objective.",

    modelVersion: "2.0-rule-based"
  };
}

export default function MatchEngine() {
  const [userId] = useState(getAnonymousUserId);

  const [input, setInput] = useState({
    userType: "Merchant",
    location: "",
    category: "",
    budget: "",
    audience: "",
    goal: ""
  });

  const [evaluation, setEvaluation] = useState({
    ...EMPTY_EVALUATION
  });

  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  function changeInput(e) {
    const { name, value } = e.target;

    setInput(prev => ({
      ...prev,
      [name]: value
    }));

    setResult(null);
    setMessage("");
    setConsent(false);

    setEvaluation({
      ...EMPTY_EVALUATION
    });
  }

  function changeEvaluation(e) {
    const { name, value } = e.target;

    setEvaluation(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function runEngine(e) {
    e.preventDefault();

    const budget = Number(input.budget);

    if (
      !USER_TYPES.includes(input.userType) ||
      !input.location.trim() ||
      !CATEGORIES.includes(input.category) ||
      !GOALS.includes(input.goal) ||
      !input.audience.trim() ||
      !Number.isFinite(budget) ||
      budget <= 0
    ) {
      setMessage(
        "Please complete all required business parameters."
      );

      return;
    }

    setResult({
      ...generateRecommendation(input),
      generatedAt: new Date().toISOString()
    });

    setEvaluation({
      ...EMPTY_EVALUATION
    });

    setConsent(false);
    setMessage("");
  }

  function saveFeedback(e) {
    e.preventDefault();

    if (!result || !consent) {
      setMessage(
        "Please generate a recommendation and confirm consent."
      );

      return;
    }

    const ratings = [
      evaluation.relevance,
      evaluation.ease,
      evaluation.applicability
    ];

    if (
      ratings.some(
        value =>
          ![1, 2, 3, 4, 5].includes(Number(value))
      )
    ) {
      setMessage(
        "Please complete all three feedback ratings."
      );

      return;
    }

    if (
      !evaluation.feedback.trim() ||
      !["Pass", "Partial Pass", "Fail"].includes(
        evaluation.status
      )
    ) {
      setMessage(
        "Please complete your feedback and recommendation assessment."
      );

      return;
    }

    const record = {
      recordId: createId(),

      userId,

      testDate: new Date().toISOString(),

      testType: "Unverified User Session",

      ...input,

      ...result,

      ...evaluation,

      consent: true,

      storageSource: "Browser Local Storage"
    };

    try {
      const records = loadRecords();

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...records, record])
      );

      setMessage(
        "Thank you for your feedback. Your response has been saved in this browser."
      );

      setResult(null);
      setConsent(false);

      setEvaluation({
        ...EMPTY_EVALUATION
      });

    } catch {
      setMessage(
        "Unable to save your feedback. Please check your browser storage settings."
      );
    }
  }

  return (
    <div className="as-engine">

      <header className="as-hero">

        <span className="as-eyebrow">
          ADSPHERE / COMMERCE INTELLIGENCE
        </span>

        <h1>AdSphere Match Engine</h1>

        <span className="as-beta">
          BETA V2.0
        </span>

        <p>
          Intelligent creator recommendations,
          commerce strategy and business decision support.
        </p>

      </header>

      <form onSubmit={runEngine}>

        <section className="as-panel">

          <h2>01. Business Profile</h2>

          <div className="as-grid">

            <label>
              Business Type

              <select
                name="userType"
                value={input.userType}
                onChange={changeInput}
                required
              >
                {USER_TYPES.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

            </label>

            <label>
              Business Location

              <input
                name="location"
                value={input.location}
                onChange={changeInput}
                placeholder="e.g. Los Angeles, CA"
                required
              />

            </label>

          </div>

        </section>

        <section className="as-panel">

          <h2>02. Commerce Parameters</h2>

          <div className="as-grid">

            <label>
              Product Category

              <select
                name="category"
                value={input.category}
                onChange={changeInput}
                required
              >

                <option value="">
                  Select product category
                </option>

                {CATEGORIES.map(category => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}

              </select>

            </label>

            <label>
              Monthly Campaign Budget (USD)

              <input
                type="number"
                name="budget"
                min="1"
                step="0.01"
                value={input.budget}
                onChange={changeInput}
                placeholder="e.g. 5000"
                required
              />

            </label>

            <label>
              Target Audience

              <input
                name="audience"
                value={input.audience}
                onChange={changeInput}
                placeholder="e.g. Women aged 25–34"
                required
              />

            </label>

            <label>
              Business Objective

              <select
                name="goal"
                value={input.goal}
                onChange={changeInput}
                required
              >

                <option value="">
                  Select business objective
                </option>

                {GOALS.map(goal => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}

              </select>

            </label>

          </div>

          <button
            className="as-primary"
            type="submit"
          >
            Generate Recommendations →
          </button>

        </section>

      </form>

      {result && (
        <>

          <section className="as-panel">

            <h2>03. Commerce Recommendations</h2>

            <p className="as-note">
              A personalized planning overview based on
              your selected business parameters.
            </p>

            <div className="as-metrics">

              <article className="as-metric">

                <span>
                  Market Readiness Score
                </span>

                <strong>
                  {result.score}/100
                </strong>

                <div className="as-progress">

                  <div
                    style={{
                      width: `${result.score}%`
                    }}
                  />

                </div>

                <small>
                  Experimental readiness indicator
                </small>

              </article>

              <article className="as-metric">

                <span>
                  Recommended Creator Tier
                </span>

                <h3>{result.tier}</h3>

                <small>
                  {result.range} followers
                </small>

              </article>

              <article className="as-metric">

                <span>
                  Suggested Creator Quantity
                </span>

                <strong>
                  {result.quantity}
                </strong>

                <small>
                  Estimated collaboration capacity
                </small>

              </article>

              <article className="as-metric">

                <span>
                  Estimated Creator Budget
                </span>

                <strong>
                  {currency(result.creatorBudget)}
                </strong>

                <small>
                  70% planning allocation
                </small>

              </article>

            </div>

            <div className="as-detail-grid">

              <article className="as-detail">

                <h3>Commerce Strategy</h3>

                <p>{result.strategy}</p>

              </article>

              <article className="as-detail">

                <h3>Fulfillment Readiness</h3>

                <p>{result.logistics}</p>

              </article>

              <article className="as-detail">

                <h3>Budget Allocation</h3>

                <p>
                  Creator collaboration:
                  {" "}
                  {currency(result.creatorBudget)}
                </p>

                <p>
                  Remaining campaign budget:
                  {" "}
                  {currency(
                    Number(input.budget) -
                    result.creatorBudget
                  )}
                </p>

                <p>
                  Assumed cost per creator:
                  {" "}
                  {currency(result.estimatedCost)}
                </p>

              </article>

              <article className="as-detail">

                <h3>Recommendation Logic</h3>

                <p>{result.explanation}</p>

                <p>
                  Baseline: 40 points
                </p>

                <p>
                  Budget assessment:
                  {" "}
                  {result.budgetScore}/45
                </p>

                <p>
                  Audience description:
                  {" "}
                  {result.audienceScore}/15
                </p>

              </article>

            </div>

            <p className="as-note">

              AdSphere Beta currently uses experimental
              rule-based recommendation logic.
              Recommendations and estimated budgets are
              intended for planning purposes and are not
              validated forecasts or guarantees of
              commercial performance.

            </p>

          </section>

          <form onSubmit={saveFeedback}>

            <section className="as-panel">

              <h2>04. Recommendation Feedback</h2>

              <p className="as-note">
                Help improve AdSphere by sharing your
                experience with these recommendations.
                Rate each item from 1 (poor) to
                5 (excellent).
              </p>

              <div className="as-grid">

                {[
                  [
                    "relevance",
                    "Recommendation Relevance"
                  ],
                  [
                    "ease",
                    "Ease of Use"
                  ],
                  [
                    "applicability",
                    "Business Applicability"
                  ]
                ].map(([key, label]) => (

                  <label key={key}>

                    {label}

                    <select
                      name={key}
                      value={evaluation[key]}
                      onChange={changeEvaluation}
                      required
                    >

                      <option value="">
                        Select rating
                      </option>

                      <option value="1">
                        1 — Poor
                      </option>

                      <option value="2">
                        2 — Fair
                      </option>

                      <option value="3">
                        3 — Satisfactory
                      </option>

                      <option value="4">
                        4 — Good
                      </option>

                      <option value="5">
                        5 — Excellent
                      </option>

                    </select>

                  </label>

                ))}

                <label>

                  Recommendation Assessment

                  <select
                    name="status"
                    value={evaluation.status}
                    onChange={changeEvaluation}
                    required
                  >

                    <option value="">
                      Select assessment
                    </option>

                    <option value="Pass">
                      Meets my expectations
                    </option>

                    <option value="Partial Pass">
                      Partially meets my expectations
                    </option>

                    <option value="Fail">
                      Does not meet my expectations
                    </option>

                  </select>

                </label>

              </div>

              {[
                [
                  "feedback",
                  "Overall Experience",
                  "How useful were these recommendations for your business?"
                ],
                [
                  "issues",
                  "Limitations or Issues",
                  "Did you encounter any errors, limitations or unexpected results?"
                ],
                [
                  "improvements",
                  "Suggestions for Improvement",
                  "What additional features or improvements would you like to see?"
                ]
              ].map(([key, label, placeholder]) => (

                <label
                  className="as-text-field"
                  key={key}
                >

                  {label}

                  <textarea
                    name={key}
                    value={evaluation[key]}
                    onChange={changeEvaluation}
                    placeholder={placeholder}
                    rows="3"
                    maxLength="2000"
                    required={key === "feedback"}
                  />

                </label>

              ))}

              <label className="as-consent">

                <input
                  type="checkbox"
                  checked={consent}
                  onChange={e =>
                    setConsent(e.target.checked)
                  }
                  required
                />

                I consent to storing this feedback and
                recommendation record in my browser for
                product evaluation. I will not include
                confidential or personally identifying
                information in my feedback.

              </label>

              <button
                className="as-primary"
                type="submit"
              >
                Save Feedback →
              </button>

            </section>

          </form>

        </>
      )}

      {message && (

        <p
          className="as-message"
          role="status"
        >
          {message}
        </p>

      )}

      <footer className="as-footer">

        AdSphere Beta V2.0 · Commerce Decision Support

        <br />

        Creator Intelligence · Business Strategy ·
        Fulfillment Planning

      </footer>

    </div>
  );
}
