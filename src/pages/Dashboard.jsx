
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const KEY = 'adsphere_test_records_v2';

function readRecords() {
  try {
    const data = JSON.parse(
      localStorage.getItem(KEY) || '[]'
    );

    return Array.isArray(data)
      ? data.filter(r => r && typeof r === 'object')
      : [];
  } catch {
    return [];
  }
}

function average(rows, key, min = 0, max = Infinity) {
  const values = rows
    .filter(r => r[key] !== '' && r[key] != null)
    .map(r => Number(r[key]))
    .filter(v =>
      Number.isFinite(v) && v >= min && v <= max
    );

  return values.length
    ? values.reduce((a, b) => a + b, 0) / values.length
    : null;
}

function counts(rows, key) {
  return Object.entries(
    rows.reduce((a, r) => {
      const k = r[key] || 'Unspecified';
      a[k] = (a[k] || 0) + 1;
      return a;
    }, Object.create(null))
  ).sort((a, b) => b[1] - a[1]);
}

function currency(value) {
  return value === null
    ? '—'
    : Number(value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      });
}

const COLORS = [
  '#42ced1',
  '#548cf5',
  '#9c83ef',
  '#e8b56b',
  '#6bc5a2',
  '#d17fa9'
];

function Metric({ label, value, note, icon }) {
  return (
    <article className="ad-card ad-metric">

      <div className="ad-metric-top">
        <span>{label}</span>
        <div className="ad-icon">{icon}</div>
      </div>

      <strong>{value}</strong>

      <p>{note}</p>

    </article>
  );
}

function Bars({ title, subtitle, items, total }) {
  return (
    <section className="ad-card">

      <h2>{title}</h2>
      <p className="ad-subtitle">{subtitle}</p>

      {items.length ? (
        <div className="ad-bars">

          {items.map(([name, n], i) => (
            <div className="ad-bar" key={name}>

              <div className="ad-bar-label">
                <span>{name}</span>
                <b>
                  {n} · {total
                    ? Math.round(n / total * 100)
                    : 0}%
                </b>
              </div>

              <div className="ad-track">
                <div
                  className="ad-fill"
                  style={{
                    width: `${total
                      ? 100 * n / total
                      : 0}%`,
                    background: COLORS[i % COLORS.length]
                  }}
                />
              </div>

            </div>
          ))}

        </div>
      ) : (
        <div className="ad-empty">
          No planning data available yet.
        </div>
      )}

    </section>
  );
}

function CreatorChart({ items, total }) {
  let offset = 0;

  const segments = items.map(([name, count], i) => {
    const start = offset;

    offset += total ? count / total * 100 : 0;

    return `${COLORS[i % COLORS.length]} ${start}% ${offset}%`;
  });

  const background = segments.length
    ? `conic-gradient(${segments.join(',')})`
    : '#24354b';

  return (
    <section className="ad-card">

      <h2>Creator Partnership Distribution</h2>

      <p className="ad-subtitle">
        Recommended creator tiers across planning sessions
      </p>

      <div className="ad-donut-layout">

        <div
          className="ad-donut"
          style={{ background }}
        >

          <div className="ad-donut-center">
            <strong>{total}</strong>
            <span>Sessions</span>
          </div>

        </div>

        <div className="ad-legend">

          {items.length ? items.map(([name, n], i) => (
            <div className="ad-legend-row" key={name}>

              <i style={{
                background: COLORS[i % COLORS.length]
              }} />

              <span>{name}</span>

              <b>{n}</b>

            </div>
          )) : (
            <p className="ad-subtitle">
              Creator recommendations will appear here.
            </p>
          )}

        </div>

      </div>

    </section>
  );
}

export default function Dashboard() {

  const [all, setAll] = useState(readRecords);

  useEffect(() => {

    const refresh = () => setAll(readRecords());

    window.addEventListener('storage', refresh);
    window.addEventListener('focus', refresh);

    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('focus', refresh);
    };

  }, []);

  // Only include explicitly classified external sessions.
  // These remain self-reported, browser-local records.
  const rows = all.filter(
    r => r.testType === 'External User Test'
  );

  const total = rows.length;

  const creatorQuantity = rows.reduce((sum, r) => {
    const n = Number(r.quantity);

    return sum + (
      Number.isFinite(n) ? Math.max(0, n) : 0
    );
  }, 0);

  const readiness = average(rows, 'score', 0, 100);

  const monthlyBudget = average(rows, 'budget');

  const creatorBudget = average(rows, 'creatorBudget');

  const industries = counts(rows, 'category');

  const creatorTiers = counts(rows, 'tier');

  const objectives = counts(rows, 'goal');

  const latest = [...rows].sort((a, b) => {
    const dateA = Date.parse(a.testDate) || 0;
    const dateB = Date.parse(b.testDate) || 0;
    return dateB - dateA;
  })[0];

  return (
    <div className="ad-dashboard">

      <style>{styles}</style>

      <header className="ad-header">

        <div>

          <div className="ad-eyebrow">
            ADSPHERE / INTELLIGENCE
          </div>

          <h1>Commerce Intelligence Dashboard</h1>

          <p>
            Creator partnership recommendations,
            market readiness insights and intelligent
            commerce planning.
          </p>

        </div>

        <Link className="ad-button" to="/demo">
          New Recommendation →
        </Link>

      </header>

      <div className="ad-workspace">

        <div className="ad-workspace-left">
          <span className="ad-dot" />
          <span>Commerce Intelligence Workspace</span>
        </div>

        <span className="ad-version">
          BETA V2.0
        </span>

      </div>

      <div className="ad-kpis">

        <Metric
          label="Recommendation Sessions"
          value={total.toLocaleString()}
          note="Recorded external planning sessions"
          icon="◎"
        />

        <Metric
          label="Suggested Creator Quantity"
          value={creatorQuantity.toLocaleString()}
          note="Recommended creators, not actual matches"
          icon="◇"
        />

        <Metric
          label="Market Readiness"
          value={
            readiness === null
              ? '—'
              : `${readiness.toFixed(1)}/100`
          }
          note="Average experimental readiness score"
          icon="↗"
        />

        <Metric
          label="Industries Evaluated"
          value={
            industries.filter(
              ([name]) => name !== 'Unspecified'
            ).length
          }
          note="Product category coverage"
          icon="▦"
        />

      </div>

      <div className="ad-grid">

        <Bars
          title="Industry Intelligence"
          subtitle="Distribution of commerce planning activity"
          items={industries}
          total={total}
        />

        <CreatorChart
          items={creatorTiers}
          total={total}
        />

      </div>

      <div className="ad-grid">

        <Bars
          title="Business Objective Analysis"
          subtitle="Primary objectives across recorded sessions"
          items={objectives}
          total={total}
        />

        <section className="ad-card">

          <h2>Budget Intelligence</h2>

          <p className="ad-subtitle">
            Business investment and creator allocation insights
          </p>

          <div className="ad-budget">

            <span>Average Monthly Planning Budget</span>

            <strong>
              {currency(monthlyBudget)}
            </strong>

          </div>

          <div className="ad-budget">

            <span>Average Suggested Creator Budget</span>

            <strong>
              {currency(creatorBudget)}
            </strong>

          </div>

          <p className="ad-budget-note">
            Based on submitted planning parameters
            and recommendation outputs.
          </p>

        </section>

      </div>

      <section className="ad-card ad-strategy">

        <div className="ad-section-header">

          <div>

            <h2>Latest Commerce Strategy</h2>

            <p className="ad-subtitle">
              Insights from the latest recorded planning session
            </p>

          </div>

          <span className="ad-tag">
            INTELLIGENCE ENGINE
          </span>

        </div>

        {latest ? (

          <div className="ad-strategy-grid">

            <article className="ad-inner">

              <span>CREATOR PARTNERSHIP</span>

              <h3>{latest.tier || '—'}</h3>

              <p>
                Follower Range: {latest.range || '—'}
              </p>

              <p>
                Suggested Quantity: {latest.quantity ?? '—'}
              </p>

            </article>

            <article className="ad-inner">

              <span>MARKET READINESS</span>

              <h3>
                {latest.score == null
                  ? '—'
                  : `${latest.score}/100`}
              </h3>

              <p>
                Business Objective: {latest.goal || '—'}
              </p>

              <p>
                Product Category: {latest.category || '—'}
              </p>

            </article>

            <article className="ad-inner">

              <span>COMMERCE STRATEGY</span>

              <p>
                {latest.strategy || 'No strategy available.'}
              </p>

            </article>

            <article className="ad-inner">

              <span>FULFILLMENT READINESS</span>

              <p>
                {latest.logistics ||
                  'No fulfillment recommendation available.'}
              </p>

            </article>

          </div>

        ) : (

          <div className="ad-empty-strategy">

            <div className="ad-empty-icon">◇</div>

            <h3>Your commerce insights start here</h3>

            <p>
              Generate a commerce strategy through
              the AdSphere Match Engine to explore
              creator partnerships and market opportunities.
            </p>

            <Link className="ad-button" to="/demo">
              Explore Match Engine →
            </Link>

          </div>

        )}

      </section>

      <div className="ad-disclaimer">

        <p>
          Beta decision-support environment.
          Figures are derived from self-reported external
          planning records stored in the current browser.
          They are not independently verified commercial
          outcomes, actual creator engagements or
          realized financial returns.
        </p>

      </div>

      <footer className="ad-footer">

        <strong>AdSphere Intelligence</strong>

        <p>
          Commerce Decision Support Infrastructure
          · Beta V2.0
        </p>

      </footer>

    </div>
  );
}

const styles = `

.ad-dashboard {
  max-width: 1320px;
  margin: 0 auto;
  padding: 64px 28px 30px;
  color: #edf5ff;
  font-family: inherit;
}

.ad-dashboard * {
  box-sizing: border-box;
}

.ad-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  margin-bottom: 32px;
}

.ad-eyebrow {
  color: #42ced1;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2.5px;
  margin-bottom: 14px;
}

.ad-header h1 {
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 750;
  line-height: 1.2;
  letter-spacing: -1.5px;
  margin: 0 0 14px;
  color: #f3f8ff;
}

.ad-header p {
  font-size: 14px;
  color: #91a9c1;
  line-height: 1.8;
  margin: 0;
  max-width: 650px;
}

.ad-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #42ced1;
  color: #071722 !important;
  padding: 14px 22px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.ad-button:hover {
  background: #79e1e2;
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(66,206,209,0.16);
}

.ad-workspace {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 15px 18px;
  border: 1px solid #23384d;
  background: #101c2b;
  border-radius: 10px;
  margin-bottom: 24px;
  font-size: 12px;
  color: #9eb5cc;
}

.ad-workspace-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ad-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #42ced1;
  box-shadow: 0 0 12px rgba(66,206,209,0.5);
}

.ad-version {
  color: #42ced1;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.ad-kpis {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 22px;
}

.ad-card {
  background: linear-gradient(
    145deg,
    #142236 0%,
    #111c2c 100%
  );
  border: 1px solid #273a50;
  border-radius: 16px;
  padding: 26px;
  min-width: 0;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.ad-metric {
  min-height: 175px;
  transition: border-color 0.2s ease;
}

.ad-metric:hover {
  border-color: #42ced1;
}

.ad-metric-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.ad-metric-top > span {
  font-size: 12px;
  color: #a7bdd2;
  font-weight: 500;
  line-height: 1.5;
}

.ad-icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(66,206,209,0.08);
  border: 1px solid rgba(66,206,209,0.15);
  border-radius: 9px;
  color: #42ced1;
  font-size: 20px;
  flex-shrink: 0;
}

.ad-metric > strong {
  display: block;
  font-size: 36px;
  font-weight: 750;
  letter-spacing: -1px;
  color: #f5faff;
  margin: 20px 0 12px;
  line-height: 1;
}

.ad-metric > p {
  color: #809ab4;
  font-size: 11px;
  line-height: 1.7;
  margin: 0;
}

.ad-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
  margin-bottom: 22px;
}

.ad-card h2 {
  font-size: 19px;
  font-weight: 650;
  color: #edf5ff;
  letter-spacing: -0.4px;
  margin: 0 0 8px;
}

.ad-subtitle {
  font-size: 12px;
  color: #829cb6;
  line-height: 1.7;
  margin: 0 0 28px;
}

.ad-bars {
  margin-top: 20px;
}

.ad-bar {
  margin-bottom: 23px;
}

.ad-bar:last-child {
  margin-bottom: 0;
}

.ad-bar-label {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 10px;
  font-size: 13px;
  color: #a9bed3;
}

.ad-bar-label b {
  color: #dbe8f5;
  font-size: 12px;
  font-weight: 600;
}

.ad-track {
  height: 9px;
  width: 100%;
  background: #24354b;
  border-radius: 20px;
  overflow: hidden;
}

.ad-fill {
  height: 100%;
  border-radius: 20px;
  transition: width 0.5s ease;
}

.ad-donut-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
  min-height: 220px;
}

.ad-donut {
  width: 188px;
  height: 188px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ad-donut-center {
  width: 148px;
  height: 148px;
  border-radius: 50%;
  background: #142236;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.ad-donut-center strong {
  font-size: 35px;
  font-weight: 700;
  color: #f1f8ff;
}

.ad-donut-center span {
  color: #91aac1;
  font-size: 11px;
  margin-top: 6px;
}

.ad-legend {
  flex: 1;
  min-width: 140px;
}

.ad-legend-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 18px 0;
  font-size: 12px;
  color: #a8bdd2;
}

.ad-legend-row i {
  width: 9px;
  height: 9px;
  border-radius: 3px;
  flex-shrink: 0;
}

.ad-legend-row b {
  margin-left: auto;
  color: #f0f6ff;
}

.ad-budget {
  padding: 18px 0;
  border-bottom: 1px solid #293b50;
}

.ad-budget span {
  display: block;
  font-size: 12px;
  color: #9cb3ca;
  margin-bottom: 10px;
}

.ad-budget strong {
  display: block;
  font-size: 30px;
  font-weight: 700;
  color: #42ced1;
  letter-spacing: -0.7px;
}

.ad-budget-note {
  color: #7e98b1;
  font-size: 11px;
  line-height: 1.8;
  margin: 18px 0 0;
}

.ad-section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 15px;
}

.ad-tag {
  padding: 8px 11px;
  color: #42ced1;
  background: rgba(66,206,209,0.07);
  border: 1px solid rgba(66,206,209,0.18);
  border-radius: 6px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1px;
  white-space: nowrap;
}

.ad-strategy-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.ad-inner {
  background: #0e1928;
  border: 1px solid #26394e;
  border-radius: 12px;
  padding: 24px;
  overflow-wrap: anywhere;
}

.ad-inner > span {
  color: #42ced1;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.3px;
}

.ad-inner h3 {
  font-size: 23px;
  font-weight: 650;
  color: #edf5ff;
  margin: 16px 0 10px;
}

.ad-inner p {
  color: #a0b7ce;
  font-size: 13px;
  line-height: 1.9;
  margin: 12px 0 0;
}

.ad-empty {
  min-height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7f9ab3;
  font-size: 13px;
  text-align: center;
}

.ad-empty-strategy {
  border: 1px dashed #31485f;
  background: rgba(9,19,31,0.35);
  border-radius: 12px;
  padding: 40px 24px;
  text-align: center;
}

.ad-empty-icon {
  font-size: 36px;
  color: #42ced1;
  margin-bottom: 12px;
}

.ad-empty-strategy h3 {
  color: #e6f0fb;
  font-size: 21px;
  margin: 0 0 12px;
}

.ad-empty-strategy p {
  color: #8da6be;
  font-size: 13px;
  line-height: 1.9;
  max-width: 520px;
  margin: 0 auto 24px;
}

.ad-disclaimer {
  padding: 20px 4px 0;
}

.ad-disclaimer p {
  color: #7891aa;
  font-size: 11px;
  line-height: 1.8;
  margin: 0;
}

.ad-footer {
  text-align: center;
  padding: 40px 0 20px;
}

.ad-footer strong {
  color: #9eb5cb;
  font-size: 13px;
  font-weight: 600;
}

.ad-footer p {
  color: #627f9b;
  font-size: 11px;
  margin: 8px 0 0;
}

@media (max-width: 1050px) {

  .ad-kpis {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

}

@media (max-width: 700px) {

  .ad-dashboard {
    padding: 35px 16px 20px;
  }

  .ad-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .ad-kpis,
  .ad-grid,
  .ad-strategy-grid {
    grid-template-columns: 1fr;
  }

  .ad-card {
    padding: 22px;
  }

  .ad-section-header {
    flex-direction: column;
  }

  .ad-donut-layout {
    gap: 20px;
  }

  .ad-metric {
    min-height: 150px;
  }

  .ad-metric > strong {
    font-size: 32px;
  }

  .ad-tag {
    margin-bottom: 16px;
  }

}

`;
