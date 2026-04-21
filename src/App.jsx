import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="site">
      <header className="nav">
        <div className="brand">AdSphere</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/platform">Platform</Link>
          <Link to="/parcelace">ParcelAce</Link>
          <Link to="/impact">Impact</Link>
          <Link to="/founder">Founder</Link>
        </nav>
        <Link className="contact-btn" to="/contact">
          Contact
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}

function HomePage() {
  return (
    <>
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
          <Link className="primary-btn" to="/platform">
            Explore Platform
          </Link>
          <Link className="secondary-btn" to="/parcelace">
            Learn About Our Infrastructure
          </Link>
        </div>
      </section>

      <section className="section">
        <h2>About AdSphere</h2>
        <p>
          AdSphere is an AI-enabled virtual trade and collaboration system designed
          to help small businesses, independent merchants, and emerging creators
          enter digital commerce more efficiently.
        </p>
      </section>

      <section className="section">
        <h2>What We Do</h2>
        <div className="grid">
          <div className="card">
            <h3>Intelligent Matching</h3>
            <p>
              Help merchants identify suitable creators, products, and supply-side
              opportunities.
            </p>
          </div>
          <div className="card">
            <h3>Product Understanding</h3>
            <p>
              Improve remote product evaluation before committing time and budget.
            </p>
          </div>
          <div className="card">
            <h3>Structured Collaboration</h3>
            <p>
              Organize workflows between merchants, creators, and partners.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <section className="section page-section">
      <h1 className="page-title">About AdSphere</h1>
      <p className="page-text">
        AdSphere is an AI-enabled virtual trade and collaboration system built to
        reduce barriers to digital commerce participation for small businesses,
        independent merchants, and emerging creators.
      </p>
      <p className="page-text">
        It is designed to improve how users identify opportunities, evaluate
        products remotely, and coordinate more efficiently across digital commerce
        workflows.
      </p>
      <p className="page-text">
        Rather than serving as a simple marketplace, AdSphere is intended to
        function as a broader infrastructure layer connecting matching, product
        understanding, collaboration, and execution.
      </p>
    </section>
  );
}

function PlatformPage() {
  return (
    <section className="section page-section">
      <h1 className="page-title">Platform</h1>
      <p className="page-text">
        AdSphere combines intelligent matching, digital product understanding,
        and structured collaboration into a single digital commerce participation
        system.
      </p>

      <div className="grid">
        <div className="card">
          <h3>Intelligent Matching</h3>
          <p>
            Help merchants identify creators, products, and supply-side
            opportunities with greater efficiency.
          </p>
        </div>
        <div className="card">
          <h3>Product Understanding</h3>
          <p>
            Improve remote product evaluation before businesses commit time,
            capital, or operational resources.
          </p>
        </div>
        <div className="card">
          <h3>Structured Collaboration</h3>
          <p>
            Organize workflows between merchants, creators, and partners in a
            more usable and structured way.
          </p>
        </div>
      </div>

      <div className="section-block">
        <h2>Core Use Cases</h2>
        <p className="page-text">
          The platform is initially designed for high-friction commerce settings
          where merchants need to identify suitable creators, evaluate products
          quickly, and move from opportunity discovery to real execution more
          effectively.
        </p>
      </div>
    </section>
  );
}

function ParcelAcePage() {
  return (
    <section className="section page-section">
      <h1 className="page-title">ParcelAce Express</h1>
      <p className="page-text">
        ParcelAce Express is the operational logistics arm of the broader
        AdSphere system. It provides last-mile sorting and delivery support as
        the execution layer of digital commerce participation.
      </p>
      <p className="page-text">
        Its role is important because digital commerce decisions ultimately
        require real-world operational follow-through. ParcelAce helps connect
        online matching and coordination to practical fulfillment outcomes.
      </p>

      <div className="grid">
        <div className="card">
          <h3>Sorting & Fulfillment</h3>
          <p>
            Support parcel movement and operational execution for commerce-related
            activity.
          </p>
        </div>
        <div className="card">
          <h3>Last-Mile Support</h3>
          <p>
            Provide the physical execution component that complements digital
            commerce workflows.
          </p>
        </div>
        <div className="card">
          <h3>Execution Layer</h3>
          <p>
            Strengthen AdSphere by linking digital opportunity to practical
            logistics support.
          </p>
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
        AdSphere is intended to help smaller businesses and newer market
        participants access digital commerce opportunities more effectively while
        improving efficiency across the broader ecosystem.
      </p>

      <div className="grid">
        <div className="card">
          <h3>Support Small Businesses</h3>
          <p>
            Lower barriers for merchants entering larger digital marketplaces.
          </p>
        </div>
        <div className="card">
          <h3>Expand Opportunity</h3>
          <p>
            Create clearer pathways for creators and individuals to participate
            in digital commerce.
          </p>
        </div>
        <div className="card">
          <h3>Improve Efficiency</h3>
          <p>
            Reduce friction in product discovery, matching, and execution.
          </p>
        </div>
      </div>

      <div className="section-block">
        <h2>Why It Matters</h2>
        <p className="page-text">
          As more commercial activity moves into digital environments, systems
          that improve access, reduce coordination burdens, and support practical
          market participation become increasingly valuable.
        </p>
      </div>
    </section>
  );
}

function FounderPage() {
  return (
    <section className="section page-section">
      <h1 className="page-title">Founder</h1>
      <p className="page-text">
        Wenqian Shao is a digital commerce professional with experience in
        creator-led e-commerce, product selection, campaign execution, and
        multi-party collaboration.
      </p>
      <p className="page-text">
        Her work has focused on understanding how merchants identify products,
        coordinate with creators, and navigate fast-moving digital commerce
        environments.
      </p>
      <p className="page-text">
        Her background in Instructional Technology and Media also supports a
        systems-oriented approach to information design, decision support, and
        digital workflow clarity.
      </p>
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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/platform" element={<PlatformPage />} />
        <Route path="/parcelace" element={<ParcelAcePage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/founder" element={<FounderPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Layout>
  );
}
