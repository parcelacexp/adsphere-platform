import { useState } from 'react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  ['home', 'Home'],
  ['about', 'About'],
  ['platform', 'Platform'],
  ['parcelace', 'ParcelAce'],
  ['impact', 'Impact'],
  ['founder', 'Founder'],
];

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

function SectionHeader({ eyebrow, title, body }) {
  return (
    <div className="section-header">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}

function HomePage({ setPage }) {
  return (
    <>
      <section className="hero page-wrap">
        <motion.div variants={reveal} initial="hidden" animate="show" className="hero-copy">
          <div className="pill">AI-Enabled Virtual Trade & Commerce Infrastructure</div>
          <h1>
            Helping small businesses, merchants, and creators enter digital commerce.
          </h1>
          <p className="hero-subtitle">
            AI-powered matching, product understanding, and structured collaboration —
            connected to real-world execution through ParcelAce Express.
          </p>
          <div className="button-row">
            <button className="btn btn-primary" onClick={() => setPage('platform')}>
              Explore Platform
            </button>
            <button className="btn btn-secondary" onClick={() => setPage('parcelace')}>
              Learn About Our Infrastructure
            </button>
          </div>
          <div className="stat-grid">
            {[
              ['SMBs', 'Supported'],
              ['AI', 'Matching Logic'],
              ['Creators', 'Enabled'],
              ['Logistics', 'Execution Layer'],
            ].map(([value, label]) => (
              <div className="stat-card" key={label}>
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={reveal} initial="hidden" animate="show" className="glass-panel hero-panel">
          <div className="panel-top">
            <div>
              <div className="panel-eyebrow">AdShpere System Overview</div>
              <div className="panel-title">Digital Commerce Participation Flow</div>
            </div>
            <div className="status-badge">Infrastructure Active</div>
          </div>
          <div className="flow-list">
            {[
              'Match merchants with suitable creators, products, and supply-side opportunities.',
              'Improve remote product understanding and reduce decision uncertainty.',
              'Support structured collaboration and connect execution through ParcelAce Express.',
            ].map((item, index) => (
              <div className="flow-card" key={item}>
                <div className="flow-step">Step {index + 1}</div>
                <div className="flow-text">{item}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="page-wrap section-space">
        <SectionHeader
          eyebrow="The Problem"
          title="Digital commerce opportunity is expanding, but market access is still inefficient."
        />
        <div className="card-grid three">
          {[
            'Small businesses often lack efficient ways to identify suitable creators, products, suppliers, and market-entry opportunities.',
            'Independent merchants face high coordination costs when trying to expand into larger and faster-moving platforms such as TikTok Shop.',
            'Early-stage creators and individuals frequently lack structured pathways to connect with legitimate commercial opportunities.',
          ].map((text) => (
            <motion.div whileHover={{ y: -6 }} className="feature-card" key={text}>
              <p>{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-alt section-space">
        <div className="page-wrap">
          <SectionHeader
            eyebrow="What We Do"
            title="Built to help users move from opportunity discovery to action."
            body="AdShpere is intended to reduce cost, improve fit, and organize execution for smaller participants in digital commerce."
          />
          <div className="card-grid four">
            {[
              ['Intelligent Matching', 'Help merchants identify suitable creators, products, and supply-side opportunities with greater efficiency.'],
              ['Product Understanding', 'Improve remote product evaluation before businesses commit time, budget, or operational resources.'],
              ['Structured Collaboration', 'Organize communication and workflows between merchants, creators, and commercial partners.'],
              ['Execution Support', 'Connect online decisions to real-world delivery and fulfillment through ParcelAce Express.'],
            ].map(([title, text]) => (
              <motion.div whileHover={{ y: -6 }} className="module-card" key={title}>
                <div className="icon-dot">+</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-wrap section-space">
        <div className="glass-panel centered-panel">
          <div className="eyebrow">Integrated Model</div>
          <h2>A two-layer system for modern commerce participation.</h2>
          <div className="system-stack">
            <div className="stack-card">AdShpere (AI + Matching + Collaboration)</div>
            <div className="stack-arrow">↓</div>
            <div className="stack-card">ParcelAce Express (Logistics & Fulfillment)</div>
          </div>
          <p className="centered-copy">
            We bridge digital decision-making with real-world execution, creating a more
            complete infrastructure for market entry and digital trade participation.
          </p>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <section className="page-wrap section-space">
      <SectionHeader
        eyebrow="About"
        title="A broader infrastructure system for digital commerce participation."
        body="AdShpere is designed to help small and medium-sized businesses, independent merchants, and emerging creators access digital commerce opportunities with lower friction and more structured support."
      />
      <div className="card-grid two top-gap">
        <div className="feature-card large-card">
          <div className="eyebrow small">The System</div>
          <h3>More than a platform or marketplace.</h3>
          <p>
            AdShpere is intended to function as a technology-enabled commercial
            infrastructure system. Rather than simply increasing visibility, it is designed
            to improve how users identify suitable opportunities, evaluate products remotely,
            and organize collaboration more effectively.
          </p>
          <p>
            Its purpose is to lower barriers to market entry for smaller participants who
            often lack the internal systems, networks, or operational support needed to
            navigate fast-moving digital commerce environments.
          </p>
        </div>
        <div className="feature-card large-card">
          <div className="eyebrow small">Why It Matters</div>
          <h3>Built for access, efficiency, and scalability.</h3>
          <p>
            Many smaller businesses and individual operators can see the opportunity in
            digital commerce, but they still face fragmented workflows, weak matching
            quality, and high coordination costs. AdShpere is designed to help close that gap.
          </p>
          <p>
            Over time, the system is intended to support broader digital trade participation
            by making opportunity discovery, product evaluation, and collaboration more
            navigable and more consistent.
          </p>
        </div>
      </div>
    </section>
  );
}

function PlatformPage() {
  return (
    <section className="page-wrap section-space">
      <SectionHeader
        eyebrow="Platform"
        title="Designed to reduce cost, improve fit, and organize execution."
        body="AdShpere combines decision support, product understanding, and workflow structure into a more coherent path from market entry to commercial action."
      />
      <div className="card-grid two top-gap">
        {[
          ['AI-Enabled Matching', 'Improves how merchants, creators, products, and supply-side opportunities are identified and prioritized.'],
          ['Digital Product Evaluation', 'Strengthens remote product understanding so users can make better decisions before deeper commitment.'],
          ['Collaboration Workflow', 'Helps users organize communication, next steps, and multi-party execution more efficiently.'],
          ['Iteration & Learning', 'Allows outcomes from prior interactions to inform future matching, evaluation, and participation pathways.'],
        ].map(([title, text]) => (
          <div className="feature-card large-card" key={title}>
            <div className="eyebrow small">Module</div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="glass-panel top-gap">
        <div className="eyebrow">Use Cases</div>
        <h3>Initial use cases focused on practical validation.</h3>
        <div className="card-grid three compact-gap top-gap-small">
          {[
            'Helping independent merchants enter TikTok-centered commerce more efficiently.',
            'Supporting lower-cost matching between merchants and creators at suitable levels.',
            'Improving remote product review before operational commitment.',
          ].map((text) => (
            <div className="feature-card dark-card" key={text}>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParcelAcePage() {
  return (
    <section className="page-wrap section-space">
      <SectionHeader
        eyebrow="ParcelAce Express"
        title="The execution layer of the broader AdShpere system."
        body="ParcelAce Express provides logistics and fulfillment services, including last-mile sorting and delivery support, and reflects the practical operational side of the broader digital commerce infrastructure model."
      />
      <div className="card-grid two top-gap special-layout">
        <div className="feature-card large-card">
          <div className="eyebrow small">What It Does</div>
          <h3>Real-world logistics support for commerce operations.</h3>
          <p>
            ParcelAce Express focuses on parcel sorting, last-mile delivery, and
            fulfillment-related operational support. Its role is important because digital
            commerce decisions ultimately require dependable real-world execution.
          </p>
          <p>
            Within the AdShpere narrative, ParcelAce helps demonstrate that the broader
            vision is connected to actual commercial operations rather than remaining purely conceptual.
          </p>
        </div>
        <div className="card-grid three nested-grid">
          {[
            ['Sorting', 'Supporting order flow and downstream fulfillment efficiency.'],
            ['Last-Mile Delivery', 'Helping ensure that commercial activity leads to real delivery outcomes.'],
            ['Infrastructure Relevance', 'Serving as a grounded operational component within the larger system.'],
          ].map(([title, text]) => (
            <div className="feature-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactPage() {
  return (
    <section className="page-wrap section-space">
      <SectionHeader
        eyebrow="Impact"
        title="Lowering barriers to market participation in the digital economy."
        body="AdShpere is intended to help smaller businesses and new market participants access digital commerce opportunities more effectively while improving efficiency across the broader ecosystem."
      />
      <div className="card-grid three top-gap">
        {[
          ['Support U.S. Small Businesses', 'Help merchants and independent sellers access larger digital marketplaces without requiring large internal teams or excessive trial-and-error costs.'],
          ['Expand Economic Opportunity', 'Create clearer pathways for beginner creators, entrepreneurs, and ordinary individuals to participate in commerce-driven work.'],
          ['Improve Ecosystem Efficiency', 'Reduce inefficiencies in matching, product discovery, remote evaluation, and execution coordination.'],
        ].map(([title, text]) => (
          <div className="feature-card large-card" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="glass-panel top-gap">
        <div className="eyebrow">Why This Matters</div>
        <h3>A more inclusive and practical digital commerce environment.</h3>
        <p>
          As more commercial activity moves into digital and platform-based environments,
          systems that improve access, reduce friction, and help smaller participants operate
          more effectively become increasingly important. AdShpere is intended to contribute
          to that broader infrastructure need.
        </p>
      </div>
    </section>
  );
}

function FounderPage() {
  return (
    <section className="page-wrap section-space">
      <SectionHeader
        eyebrow="Founder"
        title="Wenqian Shao"
        body="A digital commerce professional working at the intersection of creator-led commerce, operational execution, and system-level design thinking."
      />
      <div className="card-grid two top-gap">
        <div className="feature-card large-card">
          <div className="eyebrow small">Background</div>
          <p>
            Wenqian’s experience includes creator-led e-commerce, product selection,
            campaign execution, and multi-party commercial coordination. This operational
            foundation informs AdShpere’s focus on making digital commerce participation
            more practical and more structured.
          </p>
        </div>
        <div className="feature-card large-card">
          <div className="eyebrow small">Design Approach</div>
          <p>
            Her background in Instructional Technology and Media supports a systems-oriented
            design approach centered on how users understand information, make decisions,
            and navigate complex digital environments. This perspective is reflected in
            AdShpere’s emphasis on usability, clarity, and structured workflows.
          </p>
          <div className="button-row top-gap-small">
            <a className="btn btn-primary" href="mailto:hello@adsphere.com">
              Contact Us
            </a>
            <span className="badge-label">Founder-Led Infrastructure Vision</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState('home');

  const content = {
    home: <HomePage setPage={setPage} />,
    about: <AboutPage />,
    platform: <PlatformPage />,
    parcelace: <ParcelAcePage />,
    impact: <ImpactPage />,
    founder: <FounderPage />,
  };

  return (
    <div className="site-shell">
      <div className="background-glow background-glow-top" />
      <div className="background-glow background-glow-right" />
      <div className="background-glow background-glow-left" />
      <div className="grid-overlay" />

      <header className="site-header">
        <div className="page-wrap header-inner">
          <button className="brand" onClick={() => setPage('home')}>
            <div className="brand-mark" />
            <div>
              <div className="brand-name">ADSHPERE</div>
              <div className="brand-subtitle">Digital Commerce Infrastructure</div>
            </div>
          </button>

          <nav className="desktop-nav">
            {NAV_ITEMS.map(([key, label]) => (
              <button
                key={key}
                className={`nav-button ${page === key ? 'active' : ''}`}
                onClick={() => setPage(key)}
              >
                {label}
              </button>
            ))}
          </nav>

          <button className="contact-button" onClick={() => setPage('founder')}>
            Contact
          </button>
        </div>
      </header>

      <main>{content[page]}</main>

      <footer className="site-footer">
        <div className="page-wrap footer-inner">
          <div>
            <div className="footer-brand">AdShpere</div>
            <div className="footer-copy">
              AI-enabled virtual trade and digital commerce collaboration infrastructure.
            </div>
          </div>
          <div className="footer-links">
            {NAV_ITEMS.map(([key, label]) => (
              <button key={key} onClick={() => setPage(key)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
