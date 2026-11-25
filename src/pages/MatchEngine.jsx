
import React, { useState } from "react";
import "./MatchEngine.css";

const CATEGORIES = [
  "Beauty", "Fashion", "Electronics",
  "Home & Living", "Food & Beverage",
  "Pet Supplies", "Sports & Outdoors",
  "Personal Care", "Other"
];

const GOALS = [
  "Market Testing", "Sales Growth",
  "Brand Awareness", "Product Launch",
  "Market Expansion"
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
  "Beauty": "Prioritize tutorials, product texture and application demonstrations.",
  "Fashion": "Prioritize styling videos, fit demonstrations and audience alignment.",
  "Electronics": "Prioritize feature demonstrations and product comparisons.",
  "Home & Living": "Prioritize practical use cases and lifestyle demonstrations.",
  "Food & Beverage": "Prioritize preparation, taste and product experience.",
  "Pet Supplies": "Prioritize practical demonstrations for pet owners.",
  "Sports & Outdoors": "Prioritize activity-based product demonstrations.",
  "Personal Care": "Prioritize routine-based educational content.",
  "Other": "Prioritize clear product demonstrations and audience relevance."
};

const STORAGE_KEY = "adsphere_test_records_v2";

function loadRecords() {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );
  } catch {
    return [];
  }
}

function generateRecommendation(input) {
  const budget = Number(input.budget);

  let tier, range, estimatedCost;

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
    100, 40 + budgetScore + audienceScore
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
      STRATEGIES[input.goal] + " " +
      CATEGORY_ADVICE[input.category],
    logistics:
      budget >= 10000
        ? "Evaluate inventory capacity, fulfillment performance and third-party logistics options before scaling."
        : "Validate inventory availability and shipping readiness during the initial pilot.",
    explanation:
      "Recommendations are based on campaign budget, selected category, audience description and business objective.",
    modelVersion: "2.0-rule-based"
  };
}

export default function MatchEngine() {
  const [input, setInput] = useState({
    userId: "",
    userType: "Merchant",
    location: "",
    category: "",
    budget: "",
    audience: "",
    goal: "",
    testType: "External User Test"
  });

  const [evaluation, setEvaluation] = useState({
    relevance: "",
    ease: "",
    applicability: "",
    feedback: "",
    issues: "",
    improvements: "",
    status: ""
  });

  const [result, setResult] = useState(null);
  const [records, setRecords] = useState(loadRecords);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  function changeInput(e) {
    setInput(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setResult(null);
    setMessage("");
  }

  function changeEvaluation(e) {
    setEvaluation(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function runEngine(e) {
    e.preventDefault();

    if (
      !input.category ||
      !input.goal ||
      !input.audience.trim() ||
      !Number.isFinite(Number(input.budget)) ||
      Number(input.budget) <= 0
    ) {
      setMessage("Please enter valid business parameters.");
      return;
    }

    setResult({
      ...generateRecommendation(input),
      generatedAt: new Date().toISOString()
    });

    setMessage("");
  }

  function saveTest(e) {
    e.preventDefault();

    if (!result || !consent) {
      setMessage(
        "Generate a recommendation and confirm consent first."
      );
      return;
    }

    const record = {
      recordId: crypto.randomUUID(),
      testDate: new Date().toISOString(),
      ...input,
      ...result,
      ...evaluation
    };

    const updated = [...records, record];

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );
      setRecords(updated);
      setMessage("Test record saved successfully.");
      setResult(null);
      setConsent(false);
      setEvaluation({
        relevance: "",
        ease: "",
        applicability: "",
        feedback: "",
        issues: "",
        improvements: "",
        status: ""
      });
    } catch {
      setMessage("Unable to save. Browser storage may be full.");
    }
  }

  function exportCSV() {
    if (!records.length) {
      setMessage("No test records available.");
      return;
    }

    const keys = Object.keys(records[0]);

    const escapeCSV = value => {
      let text = String(value ?? "");
      if (/^[=+\-@\t\r\n]/.test(text)) {
        text = "'" + text;
      }
      return '"' + text.replace(/"/g, '""') + '"';
    };

    const csv = [
      keys.join(","),
      ...records.map(record =>
        keys.map(key => escapeCSV(record[key])).join(",")
      )
    ].join("\n");

    const blob = new Blob(
      ["\uFEFF" + csv],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download =
      "AdSphere_Beta_Test_Records.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function average(field) {
    if (!records.length) return "—";

    return (
      records.reduce(
        (sum, record) => sum + Number(record[field]), 0
      ) / records.length
    ).toFixed(2);
  }

  const metrics = [
    ["Recorded Tests", records.length],
    ["Recommendation Relevance", average("relevance")],
    ["Ease of Use", average("ease")],
    ["Business Applicability", average("applicability")]
  ];

  return (
    <main className="as-engine">

      <header className="as-hero">
        <span className="as-eyebrow">
          ADSPHERE / PRODUCT VALIDATION
        </span>
        <h1>AdSphere Match Engine</h1>
        <span className="as-beta">BETA V2.0</span>
        <p>
          Structured commerce recommendations,
          business decision support and user validation.
        </p>
      </header>

      <form onSubmit={runEngine}>

        <section className="as-panel">
          <h2>01. User Profile</h2>

          <div className="as-grid">

            <label>
              Anonymous User ID
              <input
                name="userId"
                value={input.userId}
                onChange={changeInput}
                placeholder="Participant ID"
                required
              />
            </label>

            <label>
              User Type
              <select
                name="userType"
                value={input.userType}
                onChange={changeInput}
              >
                <option>Merchant</option>
                <option>Creator</option>
                <option>Agency</option>
                <option>Supplier</option>
              </select>
            </label>

            <label>
              Business Location
              <input
                name="location"
                value={input.location}
                onChange={changeInput}
                placeholder="City, State"
                required
              />
            </label>

            <label>
              Test Classification
              <select
                name="testType"
                value={input.testType}
                onChange={changeInput}
              >
                <option>External User Test</option>
                <option>Internal Functional Test</option>
                <option>Simulated Test</option>
              </select>
            </label>

          </div>
        </section>

        <section className="as-panel">
          <h2>02. Business Parameters</h2>

          <div className="as-grid">

            <label>
              Product Category
              <select
                name="category"
                value={input.category}
                onChange={changeInput}
                required
              >
                <option value="">Select category</option>
                {CATEGORIES.map(category => (
                  <option key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Monthly Budget (USD)
              <input
                type="number"
                name="budget"
                min="1"
                value={input.budget}
                onChange={changeInput}
                placeholder="5000"
                required
              />
            </label>

            <label>
              Target Audience
              <input
                name="audience"
                value={input.audience}
                onChange={changeInput}
                placeholder="Female, age 25–34"
                required
              />
            </label>

            <label>
              Business Goal
              <select
                name="goal"
                value={input.goal}
                onChange={changeInput}
                required
              >
                <option value="">Select goal</option>
                {GOALS.map(goal => (
                  <option key={goal}>{goal}</option>
                ))}
              </select>
            </label>

          </div>

          <button className="as-primary" type="submit">
            Generate Recommendation →
          </button>

        </section>
      </form>

      {result && (
        <>
          <section className="as-panel">
            <h2>03. Recommendation Results</h2>

            <div className="as-metrics">

              <article className="as-metric">
                <span>Market Readiness Score</span>
                <strong>{result.score}/100</strong>
                <div className="as-progress">
                  <div style={{
                    width: `${result.score}%`
                  }} />
                </div>
                <small>Experimental heuristic</small>
              </article>

              <article className="as-metric">
                <span>Recommended Creator Tier</span>
                <h3>{result.tier}</h3>
                <small>{result.range} followers</small>
              </article>

              <article className="as-metric">
                <span>Suggested Creator Quantity</span>
                <strong>{result.quantity}</strong>
                <small>Budget-based estimate</small>
              </article>

              <article className="as-metric">
                <span>Estimated Creator Budget</span>
                <strong>
                  ${result.creatorBudget.toLocaleString()}
                </strong>
                <small>70% planning allocation</small>
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
                <h3>Recommendation Logic</h3>
                <p>{result.explanation}</p>
                <p>
                  Assumed cost per creator:
                  ${result.estimatedCost}
                </p>
              </article>

              <article className="as-detail">
                <h3>Score Breakdown</h3>
                <p>Baseline: 40 points</p>
                <p>
                  Budget: {result.budgetScore}/45
                </p>
                <p>
                  Audience description:
                  {" "}{result.audienceScore}/15
                </p>
              </article>

            </div>

            <p className="as-note">
              This beta uses experimental rule-based logic.
              Scores and budget estimates are not validated
              forecasts or guarantees of commercial success.
            </p>
          </section>

          <form onSubmit={saveTest}>
            <section className="as-panel">
              <h2>04. User Evaluation</h2>
              <p className="as-note">
                Rate your actual experience from 1 (poor)
                to 5 (excellent).
              </p>

              <div className="as-grid">
                {[
                  ["relevance", "Recommendation Relevance"],
                  ["ease", "Ease of Use"],
                  ["applicability", "Business Applicability"]
                ].map(([key, label]) => (
                  <label key={key}>
                    {label}
                    <select
                      name={key}
                      value={evaluation[key]}
                      onChange={changeEvaluation}
                      required
                    >
                      <option value="">Select rating</option>
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>

              {[
                ["feedback", "User Feedback",
                  "Describe your actual testing experience."],
                ["issues", "Issues Identified",
                  "Describe any errors or limitations observed."],
                ["improvements", "Suggested Improvements",
                  "What should be improved?"]
              ].map(([key, label, placeholder]) => (
                <label className="as-text-field" key={key}>
                  {label}
                  <textarea
                    name={key}
                    value={evaluation[key]}
                    onChange={changeEvaluation}
                    placeholder={placeholder}
                    rows="3"
                    required={key === "feedback"}
                  />
                </label>
              ))}

              <label>
                Test Status
                <select
                  name="status"
                  value={evaluation.status}
                  onChange={changeEvaluation}
                  required
                >
                  <option value="">Select status</option>
                  <option>Pass</option>
                  <option>Partial Pass</option>
                  <option>Fail</option>
                </select>
              </label>

              <label className="as-consent">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={e =>
                    setConsent(e.target.checked)
                  }
                  required
                />
                I consent to the storage and analysis
                of this anonymized test record.
              </label>

              <button className="as-primary" type="submit">
                Submit Test Record
              </button>
            </section>
          </form>
        </>
      )}

      {message && (
        <p className="as-message" role="status">
          {message}
        </p>
      )}

      <section className="as-panel">
        <h2>05. Testing Analytics</h2>
        <p className="as-note">
          Records stored in this browser.
          Includes all test classifications.
        </p>

        <div className="as-metrics">
          {metrics.map(([label, value]) => (
            <article className="as-metric" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="as-primary"
          onClick={exportCSV}
        >
          Export Test Data (CSV)
        </button>
      </section>

      <section className="as-panel">
        <h2>06. Test History</h2>

        <div className="as-table-wrap">
          <table className="as-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Type</th>
                <th>Test Type</th>
                <th>Date</th>
                <th>Category</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr key={record.recordId}>
                  <td>{record.userId}</td>
                  <td>{record.userType}</td>
                  <td>{record.testType}</td>
                  <td>{record.testDate.slice(0, 10)}</td>
                  <td>{record.category}</td>
                  <td>{record.score}/100</td>
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {!records.length && (
            <p className="as-empty">
              No test records yet.
            </p>
          )}
        </div>
      </section>

      <footer className="as-footer">
        AdSphere Beta V2.0 · Commerce Decision Support
        <br />
        Prototype & User Validation Environment
      </footer>

    </main>
  );
}
