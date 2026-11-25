
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const KEY = 'adsphere_test_records_v2';

const types = [
  'External User Test',
  'Internal Functional Test',
  'Simulated Test'
];

function read() {
  try {
    const x = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(x)
      ? x.filter(r => r && typeof r === 'object')
      : [];
  } catch {
    return [];
  }
}

function avg(rows, key, min, max) {
  const a = rows
    .filter(r => r[key] !== '' && r[key] != null)
    .map(r => Number(r[key]))
    .filter(v => Number.isFinite(v) && v >= min && v <= max);

  return a.length
    ? (a.reduce((s, v) => s + v, 0) / a.length).toFixed(2)
    : '—';
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

function Bars({ title, items, total }) {
  return (
    <section className="ba-panel">
      <h2>{title}</h2>

      {items.length ? items.map(([name, n]) => (
        <div className="ba-bar" key={name}>
          <div>
            <span>{name}</span>
            <b>{n}</b>
          </div>

          <div className="ba-track">
            <i style={{
              width: `${total ? 100 * n / total : 0}%`
            }} />
          </div>
        </div>
      )) : (
        <p>No records available.</p>
      )}
    </section>
  );
}

function download(rows) {
  const keys = [...new Set(rows.flatMap(Object.keys))];

  const esc = v =>
    '"' + String(v ?? '')
      .replace(/^[\s]*[=+\-@]/, "'$&")
      .replace(/"/g, '""') + '"';

  const csv = [
    keys.map(esc).join(','),
    ...rows.map(r => keys.map(k => esc(r[k])).join(','))
  ].join('\r\n');

  const url = URL.createObjectURL(
    new Blob(['\uFEFF' + csv], {
      type: 'text/csv;charset=utf-8'
    })
  );

  const a = document.createElement('a');
  a.href = url;
  a.download = 'AdSphere_Beta_Test_Records.csv';
  a.click();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function Dashboard() {
  const [all, setAll] = useState(read);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const refresh = () => setAll(read());

    window.addEventListener('storage', refresh);
    window.addEventListener('focus', refresh);

    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('focus', refresh);
    };
  }, []);

  const rows = all.filter(
    r => filter === 'All' || r.testType === filter
  );

  const external = rows.filter(
    r => r.testType === types[0]
  );

  const users = new Set(
    external
      .map(r => String(r.userId || '').trim().toLowerCase())
      .filter(Boolean)
  ).size;

  const assessed = rows.filter(
    r => ['Pass', 'Partial Pass', 'Fail'].includes(r.status)
  );

  const pass = assessed.filter(
    r => r.status === 'Pass'
  ).length;

  const qty = rows.reduce(
    (s, r) => s + (
      Number.isFinite(Number(r.quantity))
        ? Math.max(0, Number(r.quantity))
        : 0
    ), 0
  );

  const metrics = [
    [
      'Recorded Test Sessions',
      rows.length,
      'Saved records'
    ],
    [
      'External Participant IDs',
      users,
      'Self-reported; not independently verified'
    ],
    [
      'Suggested Creator Quantity',
      qty,
      'Recommendations, not actual matches'
    ],
    [
      'Average Readiness Score',
      avg(rows, 'score', 0, 100),
      'Experimental heuristic / 100'
    ],
    [
      'Test Pass Rate',
      assessed.length
        ? `${(100 * pass / assessed.length).toFixed(1)}%`
        : '—',
      `${assessed.length} assessed sessions`
    ],
    [
      'External Test Sessions',
      external.length,
      'Self-reported classification'
    ]
  ];

  return (
    <div className="ba">

      <header className="ba-head">
        <small>ADSPHERE / PRODUCT VALIDATION</small>

        <h1>Intelligence &amp; Beta Analytics</h1>

        <p>
          Recorded testing activity, recommendation
          outputs and participant feedback.
        </p>
      </header>

      <div className="ba-notice">
        Browser-local records only. Results are not
        independently verified. Simulated and internal
        tests are not external pilot evidence.
      </div>

      <div className="ba-tools">

        <label>
          Test classification

          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            {['All', ...types].map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        <button onClick={() => setAll(read())}>
          Refresh
        </button>

        <button
          disabled={!rows.length}
          onClick={() => download(rows)}
        >
          Export CSV
        </button>

        <Link to="/demo">Run a test</Link>

      </div>

      <div className="ba-kpis">
        {metrics.map(([label, value, note]) => (
          <article className="ba-panel" key={label}>
            <small>{label}</small>
            <strong>{value}</strong>
            <p>{note}</p>
          </article>
        ))}
      </div>

      <div className="ba-two">

        <Bars
          title="Industry Distribution"
          items={counts(rows, 'category')}
          total={rows.length}
        />

        <Bars
          title="Test Classification"
          items={counts(rows, 'testType')}
          total={rows.length}
        />

        <Bars
          title="Validation Status"
          items={counts(rows, 'status')}
          total={rows.length}
        />

        <section className="ba-panel">

          <h2>Participant Feedback</h2>

          {[
            ['Recommendation Relevance', 'relevance'],
            ['Ease of Use', 'ease'],
            ['Business Applicability', 'applicability']
          ].map(([name, key]) => (
            <div className="ba-rating" key={key}>
              <span>{name}</span>
              <b>{avg(rows, key, 1, 5)} / 5</b>
            </div>
          ))}

          <p>
            Based on available ratings in the
            selected records.
          </p>

        </section>

      </div>

      <section className="ba-panel">

        <h2>Recent Test Activity</h2>

        <div className="ba-table">

          <table>

            <thead>
              <tr>
                {[
                  'Date',
                  'Participant',
                  'Classification',
                  'Category',
                  'Budget',
                  'Score',
                  'Status'
                ].map(x => (
                  <th key={x}>{x}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {[...rows].reverse().slice(0, 50).map((r, i) => (
                <tr key={r.recordId || i}>

                  <td>
                    {String(r.testDate || '').slice(0, 10)}
                  </td>

                  <td>{r.userId}</td>

                  <td>{r.testType}</td>

                  <td>{r.category}</td>

                  <td>
                    {Number(r.budget).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })}
                  </td>

                  <td>{r.score}</td>

                  <td>{r.status || 'Unspecified'}</td>

                </tr>
              ))}
            </tbody>

          </table>

          {!rows.length && (
            <p>
              No saved tests yet.
              Run and save a test in Demo.
            </p>
          )}

        </div>

      </section>

    </div>
  );
}
