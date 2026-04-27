import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="site">
      <header className="nav">
        <div className="brand">AdSphere</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/platform">Platform</Link>
          <Link to="/impact">Impact</Link>
          <Link to="/about">About</Link>
        </nav>
        <Link className="contact-btn" to="/contact">
          Contact
        </Link>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <p>Contact: parcelacexp@gmail.com</p>
        <p>© 2026 AdSphere</p>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="eyebrow">AI-Enabled Digital Commerce Infrastructure</div>
        <h1>
          Expanding access to digital commerce through intelligent infrastructure
        </h1>
        <p>
          AdSphere connects opportunity discovery, product evaluation, collaboration,
          and execution into a unified system that lowers barriers for small businesses,
          merchants, and creators.
        </p>
        <div className="hero-actions">
          <Link className="primary-btn" to="/platform">
            Explore Platform
          </Link>
          <Link className="secondary-btn" to="/about">
            Learn About Our Infrastructure
          </Link>
        </div>
      </section>

      <section className="section">
        <h2>Why AdSphere</h2>
        <p>
          AdSphere is designed as an infrastructure layer for digital commerce participation,
          helping smaller businesses and emerging market participants identify opportunities,
          coordinate workflows, and move from discovery to execution more efficiently.
        </p>
      </section>

      <section className="section">
        <h2>Core System Components</h2>
        <div className="cards">
          <div className="card">
            <h3>Intelligent Matching</h3>
            <p>
              Identify relevant creators, products, and supply-side opportunities based on
              structured signals and contextual data.
            </p>
          </div>
          <div className="card">
            <h3>Product Understanding</h3>
            <p>
              Improve product evaluation and market fit assessment before committing time,
              capital, or operational resources.
            </p>
          </div>
          <div className="card">
            <h3>Structured Collaboration</h3>
            <p>
              Enable coordinated workflows between merchants, creators, suppliers, and
              execution partners.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function PlatformPage() {
  return (
    <section className="section page-section">
      <h1 className="page-title">Platform</h1>
      <p className="page-text">
        AdSphere combines multiple components into a unified commerce participation
        system designed to improve market access and coordination efficiency.
      </p>

      <div className="cards">
        <div className="card">
          <h3>Intelligent Matching</h3>
          <p>
            Help merchants identify suitable creators, products, and supply-side
            opportunities with greater efficiency.
          </p>
        </div>
        <div className="card">
          <h3>Product Understanding</h3>
          <p>
            Improve remote product evaluation before businesses commit time, capital,
            or operational resources.
          </p>
        </div>
        <div className="card">
          <h3>Structured Collaboration</h3>
          <p>
            Organize coordination between merchants, creators, and partners through
            more structured workflows.
          </p>
        </div>
      </div>

      <div className="section-block">
        <h2>How It Works</h2>
        <div className="cards">
          <div className="card"><p>1. Identify product, commerce, or sourcing need</p></div>
          <div className="card"><p>2. Match with relevant creators or supply-side opportunities</p></div>
          <div className="card"><p>3. Evaluate fit, viability, and next-step feasibility</p></div>
          <div className="card"><p>4. Organize structured collaboration workflow</p></div>
          <div className="card"><p>5. Connect execution through fulfillment and logistics support</p></div>
        </div>
      </div>

      <div className="section-block">
        <h2>Core Use Cases</h2>
        <div className="cards">
          <div className="card">
            <h3>Small Business Entry</h3>
            <p>
              Support small merchants in entering larger digital marketplaces with
              lower coordination costs and clearer execution pathways.
            </p>
          </div>
          <div className="card">
            <h3>Creator Commerce</h3>
            <p>
              Help creators connect with product and supply-side opportunities that
              support more structured commercial participation.
            </p>
          </div>
          <div className="card">
            <h3>Cross-Border Participation</h3>
            <p>
              Improve the ability of merchants and operators to navigate digital trade
              participation across more complex commerce settings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactPage() {
  return (
    <section className="section page-section">
      <h1 className="page-title">Impact</h1>
      <p className="page-text">
        AdSphere is designed to expand economic participation and improve market access
        by reducing structural friction in digital commerce systems.
      </p>

      <div className="cards">
        <div className="card">
          <h3>Support Small Businesses</h3>
          <p>
            Lower entry barriers for merchants participating in larger digital markets.
          </p>
        </div>
        <div className="card">
          <h3>Expand Opportunity</h3>
          <p>
            Create clearer participation pathways for creators, merchants, and individuals.
          </p>
        </div>
        <div className="card">
          <h3>Reduce System Friction</h3>
          <p>
            Improve efficiency across matching, coordination, and execution layers.
          </p>
        </div>
      </div>

      <div className="section-block">
        <h2>Why It Matters</h2>
        <p className="page-text">
          As more commercial activity moves into digital environments, infrastructure
          systems that reduce coordination burdens and improve access become increasingly
          important for enabling broader market participation and economic growth.
        </p>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="section page-section section-last">
      <h1 className="page-title">About AdSphere</h1>

      <p className="page-text">
        AdSphere is an AI-enabled digital commerce infrastructure system designed to
        reduce barriers to participation for small businesses, independent merchants,
        and emerging creators.
      </p>
      <p className="page-text">
        Rather than serving as a simple marketplace, AdSphere is intended to function
        as a broader coordination layer connecting matching, product understanding,
        workflow organization, and execution.
      </p>

      <div className="section-block">
        <h2>ParcelAce Express</h2>
        <p className="page-text">
          ParcelAce Express functions as the execution infrastructure layer of AdSphere.
          It provides logistics, sorting, fulfillment, and last-mile support that help
          connect digital coordination to real-world outcomes.
        </p>

        <div className="cards">
          <div className="card">
            <h3>Sorting & Fulfillment</h3>
            <p>Support operational execution for commerce-related logistics workflows.</p>
          </div>
          <div className="card">
            <h3>Last-Mile Delivery</h3>
            <p>Provide the physical execution component needed for end-to-end commerce support.</p>
          </div>
          <div className="card">
            <h3>Execution Infrastructure</h3>
            <p>Connect digital discovery and coordination to practical fulfillment outcomes.</p>
          </div>
        </div>
      </div>

      <div className="section-block">
        <h2>Founder</h2>
        <p className="page-text">
          Wenqian Shao is a digital commerce professional with experience in creator-led
          e-commerce, product selection, campaign execution, and multi-party coordination.
        </p>
        <p className="page-text">
          Her background in digital commerce operations and structured workflow thinking
          informs AdSphere’s approach to improving access, reducing friction, and supporting
          more practical market participation.
        </p>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="section page-section section-last">
      <h1 className="page-title">Contact</h1>
      <p className="page-text">
        Interested in the future of digital commerce infrastructure?
      </p>
      <a className="primary-btn" href="mailto:parcelacexp@gmail.com">
        parcelacexp@gmail.com
      </a>
    </section>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/platform" element={<PlatformPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Layout>
  );
}
