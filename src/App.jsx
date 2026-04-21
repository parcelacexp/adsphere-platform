import React from 'react';

export default function App() {
  return (
    <div className="site">

      {/* NAV */}
      <header className="nav">
        <div className="brand">AdSphere</div>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="#about">About</a>
          <a href="#platform">Platform</a>
          <a href="#parcelace">ParcelAce</a>
          <a href="#impact">Impact</a>
          <a href="#founder">Founder</a>
        </nav>
        <a className="contact-btn" href="mailto:parcelacexp@gmail.com">Contact</a>
      </header>

      {/* HERO */}
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
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <h2>About AdSphere</h2>
        <p>
          AdSphere is an AI-enabled infrastructure system designed to improve market access
          and participation in digital commerce. Rather than functioning as a marketplace,
          AdSphere operates as a coordination layer that connects matching, product
          understanding, structured collaboration, and real-world execution.
        </p>
        <p>
          The system aims to reduce friction in commerce workflows, enabling individuals and
          small businesses to identify opportunities, evaluate products, and execute
          operations more efficiently.
        </p>
      </section>

      {/* PLATFORM */}
      <section id="platform" className="section">
        <h2>Platform</h2>
        <p>
          AdSphere integrates multiple components into a unified commerce participation system.
        </p>

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
              Evaluate product viability and market positioning before committing time,
              capital, or operational resources.
            </p>
          </div>

          <div className="card">
            <h3>Structured Collaboration</h3>
            <p>
              Enable coordinated workflows between merchants, creators, and partners
              through structured interaction layers.
            </p>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <h3 style={{ marginTop: "60px" }}>How It Works</h3>
        <div className="cards">
          <div className="card">
            <p>1. Identify opportunities or product needs</p>
          </div>
          <div className="card">
            <p>2. Match with relevant creators or suppliers</p>
          </div>
          <div className="card">
            <p>3. Evaluate product and market fit</p>
          </div>
          <div className="card">
            <p>4. Coordinate structured collaboration</p>
          </div>
          <div className="card">
            <p>5. Execute through logistics and fulfillment</p>
          </div>
        </div>

        {/* USE CASES */}
        <h3 style={{ marginTop: "60px" }}>Core Use Cases</h3>
        <div className="cards">
          <div className="card">
            <h4>Small Business Entry</h4>
            <p>
              Enable small merchants to discover and test products with lower upfront risk.
            </p>
          </div>
          <div className="card">
            <h4>Creator Commerce</h4>
            <p>
              Help creators connect with supply and fulfillment infrastructure to monetize
              audiences.
            </p>
          </div>
          <div className="card">
            <h4>Cross-Border Trade</h4>
            <p>
              Facilitate participation in global commerce through coordinated digital workflows.
            </p>
          </div>
        </div>
      </section>

      {/* PARCELACE */}
      <section id="parcelace" className="section">
        <h2>ParcelAce Express</h2>
        <p>
          ParcelAce Express functions as the execution infrastructure layer of AdSphere.
          It bridges digital opportunity with real-world logistics, enabling fulfillment,
          sorting, and last-mile delivery.
        </p>

        <div className="cards">
          <div className="card">
            <h3>Sorting & Fulfillment</h3>
            <p>
              Support operational execution for commerce-related logistics workflows.
            </p>
          </div>
          <div className="card">
            <h3>Last-Mile Delivery</h3>
            <p>
              Provide the physical execution layer required for end-to-end commerce systems.
            </p>
          </div>
          <div className="card">
            <h3>Execution Infrastructure</h3>
            <p>
              Connect digital coordination with real-world outcomes, enabling full-cycle
              commerce participation.
            </p>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" className="section">
        <h2>Impact</h2>
        <p>
          AdSphere is designed to improve market access and expand economic participation
          by reducing structural barriers in digital commerce systems.
        </p>

        <div className="cards">
          <div className="card">
            <h3>Support Small Businesses</h3>
            <p>
              Lower entry barriers for merchants to participate in digital markets.
            </p>
          </div>
          <div className="card">
            <h3>Expand Opportunity</h3>
            <p>
              Create clearer pathways for individuals and creators to engage in commerce.
            </p>
          </div>
          <div className="card">
            <h3>Reduce System Friction</h3>
            <p>
              Improve efficiency across matching, coordination, and execution layers.
            </p>
          </div>
        </div>

        <h3 style={{ marginTop: "60px" }}>Why It Matters</h3>
        <p>
          As commerce increasingly shifts into digital environments, infrastructure systems
          that reduce coordination costs and improve access will play a critical role in
          enabling broader participation and economic growth.
        </p>
      </section>

      {/* FOUNDER */}
      <section id="founder" className="section">
        <h2>Founder</h2>
        <p>
          AdSphere is developed as part of an effort to explore infrastructure-driven
          approaches to digital commerce participation, with a focus on reducing barriers
          for small and emerging market participants.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>Contact: parcelacexp@gmail.com</p>
        <p>© 2026 AdSphere</p>
      </footer>

    </div>
  );
}
