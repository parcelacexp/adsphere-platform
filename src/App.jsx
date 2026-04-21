import React from 'react';
export default function App() {
  return (
    <div className="site">
      <header className="nav">
        <div className="brand">AdShpere</div>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#platform">Platform</a>
          <a href="#parcelace">ParcelAce</a>
          <a href="#impact">Impact</a>
          <a href="#founder">Founder</a>
        </nav>
        <a className="contact-btn" href="#contact">Contact</a>
      </header>

      <main>
        <section className="hero">
          <div className="eyebrow">AI-Enabled Digital Commerce Infrastructure</div>
          <h1>
            Helping small businesses, merchants, and creators
            enter digital commerce.
          </h1>
          <p>
            AI-powered matching, product understanding, and structured collaboration —
            connected to real-world execution through ParcelAce Express.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#platform">Explore Platform</a>
            <a className="secondary-btn" href="#parcelace">Learn About Our Infrastructure</a>
          </div>
        </section>

        <section className="section" id="about">
          <h2>About AdShpere</h2>
          <p>
            AdShpere is an AI-enabled virtual trade and collaboration system designed
            to help small businesses, independent merchants, and emerging creators
            enter digital commerce more efficiently.
          </p>
        </section>

        <section className="section" id="platform">
          <h2>What We Do</h2>
          <div className="grid">
            <div className="card">
              <h3>Intelligent Matching</h3>
              <p>Help merchants identify suitable creators, products, and supply-side opportunities.</p>
            </div>
            <div className="card">
              <h3>Product Understanding</h3>
              <p>Improve remote product evaluation before committing time and budget.</p>
            </div>
            <div className="card">
              <h3>Structured Collaboration</h3>
              <p>Organize workflows between merchants, creators, and partners.</p>
            </div>
          </div>
        </section>

        <section className="section" id="parcelace">
          <h2>ParcelAce Express</h2>
          <p>
            ParcelAce Express is the operational logistics arm of the broader AdShpere
            system, providing last-mile sorting and delivery support as the execution layer
            of digital commerce participation.
          </p>
        </section>

        <section className="section" id="impact">
          <h2>Why It Matters</h2>
          <div className="grid">
            <div className="card">
              <h3>Support Small Businesses</h3>
              <p>Lower barriers for merchants entering larger digital marketplaces.</p>
            </div>
            <div className="card">
              <h3>Expand Opportunity</h3>
              <p>Create clearer pathways for creators and individuals to participate in digital commerce.</p>
            </div>
            <div className="card">
              <h3>Improve Efficiency</h3>
              <p>Reduce friction in product discovery, matching, and execution.</p>
            </div>
          </div>
        </section>

        <section className="section" id="founder">
          <h2>Founder</h2>
          <p>
            Wenqian Shao is a digital commerce professional with experience in
            creator-led e-commerce, product selection, campaign execution, and
            multi-party collaboration.
          </p>
        </section>

        <section className="section section-last" id="contact">
          <h2>Contact</h2>
          <p>Interested in the future of digital commerce infrastructure?</p>
          <a className="primary-btn" href="mailto:hello@adsphere.com">Contact Us</a>
        </section>
      </main>
    </div>
  );
}
