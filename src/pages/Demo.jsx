import React, { useState } from "react";
import "./Demo.css";

export default function Demo() {
  const [result, setResult] = useState(null);

  const [form, setForm] = useState({
    category: "",
    budget: "",
    audience: "",
    goal: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const generateRecommendation = () => {
    let creatorTier = "Nano Influencer";
    let score = 65;

    const budget = Number(form.budget);

    if (budget >= 3000) {
      creatorTier = "Micro Influencer";
      score = 82;
    }

    if (budget >= 10000) {
      creatorTier = "Mid-Tier Influencer";
      score = 91;
    }

    setResult({
      creatorTier,
      score,
      followers:
        creatorTier === "Nano Influencer"
          ? "1k - 10k"
          : creatorTier === "Micro Influencer"
          ? "10k - 50k"
          : "50k - 250k",
      quantity:
        creatorTier === "Nano Influencer"
          ? "30 Creators"
          : creatorTier === "Micro Influencer"
          ? "15 Creators"
          : "5 Creators",
    });
  };

  return (
    <div className="demo-container">

      <div className="demo-header">
        <h1>AdSphere Match Engine (Beta)</h1>

        <p>
          An early-stage decision-support prototype designed to help merchants,
          creators, and commerce operators identify more suitable opportunities
          in digital commerce environments.
        </p>
      </div>

      <div className="demo-form">

        <div className="input-group">
          <label>Product Category</label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Beauty</option>
            <option>Fashion</option>
            <option>Electronics</option>
            <option>Home</option>
            <option>Health</option>
            <option>Food</option>
          </select>
        </div>

        <div className="input-group">
          <label>Monthly Budget ($)</label>

          <input
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            placeholder="5000"
          />
        </div>

        <div className="input-group">
          <label>Target Audience</label>

          <input
            type="text"
            name="audience"
            value={form.audience}
            onChange={handleChange}
            placeholder="Female 25-34"
          />
        </div>

        <div className="input-group">
          <label>Business Goal</label>

          <select
            name="goal"
            value={form.goal}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Product Launch</option>
            <option>Brand Awareness</option>
            <option>Sales Growth</option>
            <option>Market Testing</option>
          </select>
        </div>

        <button
          className="generate-btn"
          onClick={generateRecommendation}
        >
          Generate Recommendation
        </button>

      </div>

      {result && (
        <div className="results">

          <div className="result-card">
            <h3>Creator Recommendation</h3>

            <p>
              <strong>Tier:</strong> {result.creatorTier}
            </p>

            <p>
              <strong>Follower Range:</strong> {result.followers}
            </p>

            <p>
              <strong>Suggested Quantity:</strong> {result.quantity}
            </p>
          </div>

          <div className="result-card">
            <h3>Market Readiness Score</h3>

            <div className="score">
              {result.score}/100
            </div>
          </div>

          <div className="result-card">
            <h3>Commerce Strategy</h3>

            <p>
              Short-form product demonstration content is recommended for
              initial market validation and creator collaboration.
            </p>
          </div>

          <div className="result-card">
            <h3>ParcelAce Recommendation</h3>

            <p>
              ParcelAce fulfillment support is recommended to improve
              operational visibility and execution readiness.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
