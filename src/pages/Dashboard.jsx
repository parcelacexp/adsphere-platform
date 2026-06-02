import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>AdSphere Intelligence Dashboard</h1>
        <p>
          AI-powered creator matching, campaign insights,
          and commerce intelligence.
        </p>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Active Campaigns</h3>
          <span>24</span>
        </div>

        <div className="stat-card">
          <h3>Creator Matches</h3>
          <span>186</span>
        </div>

        <div className="stat-card">
          <h3>Conversion Rate</h3>
          <span>4.8%</span>
        </div>

        <div className="stat-card">
          <h3>Estimated ROI</h3>
          <span>327%</span>
        </div>

      </div>

      <div className="dashboard-sections">

        <div className="dashboard-card">
          <h2>Top Creator Matches</h2>

          <div className="creator">
            <strong>Sarah Beauty</strong>
            <p>82k Followers</p>
            <p>Match Score: 94%</p>
          </div>

          <div className="creator">
            <strong>James Lifestyle</strong>
            <p>110k Followers</p>
            <p>Match Score: 91%</p>
          </div>

          <div className="creator">
            <strong>Emma Wellness</strong>
            <p>76k Followers</p>
            <p>Match Score: 89%</p>
          </div>

        </div>

        <div className="dashboard-card">
          <h2>Market Trends</h2>

          <div className="trend">
            <span>Beauty</span>
            <strong>+18%</strong>
          </div>

          <div className="trend">
            <span>Health</span>
            <strong>+12%</strong>
          </div>

          <div className="trend">
            <span>Technology</span>
            <strong>+9%</strong>
          </div>

          <div className="trend">
            <span>Home & Living</span>
            <strong>+6%</strong>
          </div>

        </div>

      </div>

    </div>
  );
}
