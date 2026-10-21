import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navigateToDestination } from '../../config/navigation';
import './PartnerPage.css';

gsap.registerPlugin(ScrollTrigger);

interface TierPartner {
  title: string;
  badge: string;
  turnover: string;
  reach: string;
  description: string;
  benefits: string[];
}

const PARTNER_TIERS: TierPartner[] = [
  {
    title: 'REGIONAL PRODUCER',
    badge: 'STARTER TIER',
    turnover: 'Up to ₹2 Cr Annually',
    reach: 'Direct placement across 5–15 local BOGO Supermarkets',
    description: 'Designed for artisanal food makers, local spice grinders, and regional organic growers entering modern organized retail.',
    benefits: [
      'Zero listing fee for first 12 months',
      'Direct store delivery via BOGO Go logistics hubs',
      'Weekly automated payments via escrow',
      'Basic barcode & POS SKU onboarding support',
    ],
  },
  {
    title: 'STRATEGIC BRAND ALLIANCE',
    badge: 'MOST POPULAR',
    turnover: '₹2 Cr – ₹25 Cr Annually',
    reach: 'Guaranteed prime aisle presence in all BOGO Formats & Flagships',
    description: 'For fast-growing FMCG, organic personal care, and packaged staple brands scaling state-wide and nationally.',
    benefits: [
      'Preferred eye-level shelf real estate',
      'Co-branded promotional campaigns in BOGO Companion app',
      'Real-time inventory and sell-through analytics dashboard',
      'Priority restocking powered by BOGO Go predictive routing',
      'Joint tasting pop-up booths at BOGO Square',
    ],
  },
  {
    title: 'NATIONAL ECOSYSTEM PARTNER',
    badge: 'ENTERPRISE',
    turnover: '₹25 Cr+ Annually',
    reach: 'Complete nationwide distribution across all formats & quick commerce',
    description: 'Deep strategic integration encompassing contract manufacturing, white-label collaboration, and bulk logistics supply.',
    benefits: [
      'National multi-hub warehouse fulfillment allocation',
      'Exclusive category partnership windows',
      'Dedicated category manager & weekly performance sprints',
      'Co-innovation of new SKUs tailored to consumer purchase data',
      'Direct cross-border export opportunities through BOGO trade arms',
    ],
  },
];

const ONBOARDING_STEPS = [
  { step: '01', title: 'Submit Catalog', desc: 'Share your FSSAI/trademark certificates, product catalog, and sample pricing sheets online.' },
  { step: '02', title: 'Quality Audit', desc: 'Our category team completes lab testing and packaging compliance within 7 business days.' },
  { step: '03', title: 'EDI & Hub Connect', desc: 'Plug your inventory into BOGO Go distribution network with unified electronic data interchange.' },
  { step: '04', title: 'Shelf Placement', desc: 'Go live on store shelves and in the digital companion catalog with immediate consumer reach.' },
];

export const PartnerPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const ctx = gsap.context(() => {
      gsap.from('.part-hero-badge', { opacity: 0, y: -16, duration: 0.6, ease: 'power2.out' });
      gsap.from('.part-hero-title', { opacity: 0, y: 30, duration: 0.8, delay: 0.1, ease: 'power3.out' });
      gsap.from('.part-hero-sub', { opacity: 0, y: 20, duration: 0.7, delay: 0.2, ease: 'power2.out' });
      gsap.from('.part-metric-card', {
        scrollTrigger: { trigger: '.part-metrics-row', start: 'top 85%' },
        opacity: 0,
        y: 25,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });
      gsap.from('.part-tier-card', {
        scrollTrigger: { trigger: '.part-tiers-grid', start: 'top 85%' },
        opacity: 0,
        y: 35,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, []);

  const handleBackToProgrammes = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToDestination({
      id: 'programmes',
      label: 'PROGRAMMES',
      path: '/programmes',
      targetId: 'bogo-programs-section',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bogo-partner-page" id="bogo-partner-page">
      {/* Top Breadcrumb Nav */}
      <nav className="part-top-nav" aria-label="Breadcrumb">
        <div className="part-nav-inner">
          <div className="part-nav-crumbs">
            <a href="/" onClick={(e) => { e.preventDefault(); navigateToDestination({ id: 'home', label: 'HOME', path: '/', targetId: 'bogo-hero-section' }); }} className="part-crumb-link">
              BOGO
            </a>
            <span className="part-crumb-sep">/</span>
            <a href="/programmes" onClick={handleBackToProgrammes} className="part-crumb-link">
              PROGRAMMES
            </a>
            <span className="part-crumb-sep">/</span>
            <span className="part-crumb-current">BOGO PARTNER</span>
          </div>
          <button type="button" onClick={handleBackToProgrammes} className="part-back-btn">
            ← ALL PROGRAMMES
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="part-hero">
        <div className="part-hero-content">
          <div className="part-hero-badge">
            <span className="part-badge-dot" />
            <span>STRATEGIC SUPPLIER COLLABORATION</span>
          </div>

          <div className="part-logo-row">
            <img src="/images/Partner.png" alt="BOGO Partner" className="part-hero-logo" />
          </div>

          <h1 className="part-hero-title">
            SCALE TOGETHER.
            <br />
            <span className="part-title-emerald">GROW NATIONWIDE.</span>
          </h1>

          <p className="part-hero-sub">
            The direct gateway for regional farmers, artisan producers, and consumer packaged goods enterprises to access prime store shelves and cold-chain logistics.
          </p>

          <div className="part-hero-actions">
            <a href="#partner-tiers" className="part-primary-btn">
              EXPLORE PARTNER TIERS
            </a>
            <a href="#onboard-form" className="part-secondary-btn">
              APPLY AS A SUPPLIER →
            </a>
          </div>
        </div>
      </header>

      {/* Impact Metric Counters */}
      <section className="part-metrics-section">
        <div className="part-metrics-row">
          <div className="part-metric-card">
            <span className="part-metric-num">500+</span>
            <span className="part-metric-label">Active Regional Producers</span>
          </div>
          <div className="part-metric-card">
            <span className="part-metric-num">₹200Cr+</span>
            <span className="part-metric-label">Supplier GMV Channelled</span>
          </div>
          <div className="part-metric-card">
            <span className="part-metric-num">45+</span>
            <span className="part-metric-label">Cities &amp; Logistics Corridors</span>
          </div>
          <div className="part-metric-card">
            <span className="part-metric-num">7 Days</span>
            <span className="part-metric-label">Fast-Track Compliance Audit</span>
          </div>
        </div>
      </section>

      {/* Partner Tiers */}
      <section className="part-tiers-section" id="partner-tiers">
        <div className="part-section-header">
          <span className="part-section-kicker">COLLABORATION MODELS</span>
          <h2 className="part-section-title">Structured for Every Stage of Scale</h2>
          <p className="part-section-desc">
            Whether you cultivate organic tea in the Nilgiris or produce cold-pressed oils at scale, our partnership frameworks align directly with your growth.
          </p>
        </div>

        <div className="part-tiers-grid">
          {PARTNER_TIERS.map((tier) => (
            <div key={tier.title} className="part-tier-card">
              <div className="part-tier-top">
                <span className="part-tier-badge">{tier.badge}</span>
                <h3 className="part-tier-title">{tier.title}</h3>
                <span className="part-tier-turnover">{tier.turnover}</span>
              </div>
              <p className="part-tier-reach">📍 {tier.reach}</p>
              <p className="part-tier-desc">{tier.description}</p>
              <div className="part-tier-divider" />
              <ul className="part-tier-benefits">
                {tier.benefits.map((b, idx) => (
                  <li key={idx}>
                    <span className="part-check">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works: 4 Steps */}
      <section className="part-steps-section">
        <div className="part-section-header">
          <span className="part-section-kicker">STREAMLINED ONBOARDING</span>
          <h2 className="part-section-title">From Farm or Factory to Shelf</h2>
        </div>

        <div className="part-steps-grid">
          {ONBOARDING_STEPS.map((s) => (
            <div key={s.step} className="part-step-card">
              <span className="part-step-num">{s.step}</span>
              <h3 className="part-step-title">{s.title}</h3>
              <p className="part-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supplier Application Form */}
      <section className="part-form-section" id="onboard-form">
        <div className="part-form-container">
          <div className="part-form-header">
            <span className="part-section-kicker">SUPPLIER ADMISSIONS</span>
            <h2 className="part-form-title">Join the BOGO Supplier Network</h2>
            <p className="part-form-desc">
              Submit your enterprise details below. Our category acquisition leads will review and respond within 48 business hours.
            </p>
          </div>

          {formSubmitted ? (
            <div className="part-success-msg">
              <span className="part-success-icon">✓</span>
              <h3>Application Successfully Received!</h3>
              <p>Our category team will review your product catalog and reach out within 48 hours.</p>
            </div>
          ) : (
            <form className="part-form" onSubmit={handleSubmit}>
              <div className="part-form-row">
                <div className="part-form-group">
                  <label htmlFor="company-name">Company / Enterprise Name *</label>
                  <input id="company-name" type="text" required placeholder="e.g. Nilgiri Naturals Pvt Ltd" />
                </div>
                <div className="part-form-group">
                  <label htmlFor="contact-person">Contact Person *</label>
                  <input id="contact-person" type="text" required placeholder="Full name & designation" />
                </div>
              </div>

              <div className="part-form-row">
                <div className="part-form-group">
                  <label htmlFor="email">Business Email *</label>
                  <input id="email" type="email" required placeholder="partner@yourcompany.com" />
                </div>
                <div className="part-form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input id="phone" type="tel" required placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="part-form-row">
                <div className="part-form-group">
                  <label htmlFor="category">Primary Product Category *</label>
                  <select id="category" required defaultValue="">
                    <option value="" disabled>Select category</option>
                    <option value="staples">Food &amp; Pantry Staples</option>
                    <option value="farms">Farm Fresh &amp; Organic Produce</option>
                    <option value="superfoods">Superfoods &amp; Cold-Pressed</option>
                    <option value="beauty">Personal Care &amp; Beauty</option>
                    <option value="fmcg">Packaged FMCG Goods</option>
                  </select>
                </div>
                <div className="part-form-group">
                  <label htmlFor="turnover">Current Annual Turnover *</label>
                  <select id="turnover" required defaultValue="">
                    <option value="" disabled>Select turnover bracket</option>
                    <option value="under50l">Under ₹50 Lakhs</option>
                    <option value="50l-2cr">₹50 Lakhs – ₹2 Crores</option>
                    <option value="2cr-10cr">₹2 Crores – ₹10 Crores</option>
                    <option value="10cr+">₹10 Crores+</option>
                  </select>
                </div>
              </div>

              <div className="part-form-group">
                <label htmlFor="notes">Tell Us About Your Brand &amp; SKUs</label>
                <textarea id="notes" rows={3} placeholder="Briefly describe what makes your products unique and your production capacity." />
              </div>

              <button type="submit" className="part-submit-btn">
                SUBMIT SUPPLIER APPLICATION →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Closing Banner */}
      <section className="part-closing-banner">
        <div className="part-closing-content">
          <h2 className="part-closing-title">Building India's Modern Supply Chain</h2>
          <p className="part-closing-desc">
            Explore how BOGO Partner connects with BOGO Go logistics and all retail formats.
          </p>
          <div className="part-closing-actions">
            <button type="button" onClick={handleBackToProgrammes} className="part-closing-btn">
              EXPLORE ALL 4 PROGRAMMES
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
