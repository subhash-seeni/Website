import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navigateToDestination } from '../../config/navigation';
import { BogoFooter } from '../BogoFooter/BogoFooter';
import './LifePage.css';

gsap.registerPlugin(ScrollTrigger);

// 1. Core 3 Value Propositions (Page 1)
const CORE_PILLARS = [
  {
    id: 'more-value',
    title: 'More Value',
    description: 'Exclusive savings beyond regular in-store offers.',
    iconType: 'rupee',
  },
  {
    id: 'stronger-partnerships',
    title: 'Stronger Partnerships',
    description: 'Customised programmes designed for organisations and their employees.',
    iconType: 'partnerships',
  },
  {
    id: 'everyday-benefits',
    title: 'Everyday Benefits',
    description: 'Making quality retail more rewarding for working professionals.',
    iconType: 'shopping',
  },
];

// 2. Five-Step Journey (Page 2: 01 Partner -> 02 Curate -> 03 Activate -> 04 Shop -> 05 Save)
const PROCESS_STEPS = [
  {
    num: '01',
    name: 'Partner',
    desc: 'Organisation joins the BOGO Life programme.',
    iconType: 'handshake',
  },
  {
    num: '02',
    name: 'Curate',
    desc: 'We create relevant offers and shopping benefits.',
    iconType: 'gear',
  },
  {
    num: '03',
    name: 'Activate',
    desc: 'Employees receive access to exclusive benefits.',
    iconType: 'people',
  },
  {
    num: '04',
    name: 'Shop',
    desc: 'Employees discover and purchase across participating BOGO channels.',
    iconType: 'cart',
  },
  {
    num: '05',
    name: 'Save',
    desc: 'Employees enjoy additional value every day.',
    iconType: 'percent',
  },
];

// 3. What Employees Get (Page 2: 6 distinct benefits)
const WHAT_EMPLOYEES_GET = [
  {
    id: 'offers',
    title: 'Exclusive offers',
    desc: 'Savings beyond regular in-store offers.',
    iconType: 'tag',
  },
  {
    id: 'programmes',
    title: 'Special programmes',
    desc: 'Curated campaigns and seasonal benefits.',
    iconType: 'gift',
  },
  {
    id: 'categories',
    title: 'Wide range of categories',
    desc: 'Everyday essentials to lifestyle products.',
    iconType: 'grid',
  },
  {
    id: 'satisfaction',
    title: 'Greater satisfaction',
    desc: 'More value for their everyday needs.',
    iconType: 'heart',
  },
  {
    id: 'access',
    title: 'Convenient access',
    desc: 'Easy and seamless shopping experience.',
    iconType: 'device',
  },
  {
    id: 'belonging',
    title: 'A stronger sense of belonging',
    desc: 'Be part of a company that cares.',
    iconType: 'users',
  },
];

// 4. Value Areas (Page 3)
const THREE_VALUES = [
  {
    id: 'employee',
    title: 'Employee Value',
    desc: 'Give your people access to exclusive savings and benefits that make everyday life better.',
    iconType: 'people-group',
  },
  {
    id: 'employer',
    title: 'Employer Value',
    desc: 'Strengthen engagement, attract and retain talent with a practical and easy-to-access programme.',
    iconType: 'chart-growth',
  },
  {
    id: 'partnership',
    title: 'Partnership Value',
    desc: 'A scalable benefits ecosystem that connects your organisation, your people and the BOGO retail network.',
    iconType: 'network-handshake',
  },
];

// 5. Vertical Flow Nodes (Page 3)
const ECOSYSTEM_HIERARCHY = [
  {
    label: 'ORGANISATIONS',
    sub: 'Partner with BOGO Life',
    iconType: 'building',
    color: '#58207e',
  },
  {
    label: 'BOGO LIFE',
    sub: 'Curates meaningful benefits',
    iconType: 'bogo-life',
    color: '#93196c',
  },
  {
    label: 'EMPLOYEES',
    sub: 'Enjoy exclusive savings',
    iconType: 'users-heart',
    color: '#ea580c',
  },
  {
    label: 'A BRIGHTER TOMORROW',
    sub: 'Happier people. Stronger organisations.',
    iconType: 'star-banner',
    color: '#ea580c',
  },
];

export const LifePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const ctx = gsap.context(() => {
      // Hero Entrance Timeline (Page 1)
      const heroTl = gsap.timeline();
      heroTl
        .from('.life-hero-brand-badge', { opacity: 0, y: -20, duration: 0.6, ease: 'power2.out' })
        .from('.life-hero-headline', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .from('.life-hero-lead', { opacity: 0, y: 20, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .from('.life-hero-pillar', { opacity: 0, y: 25, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.3')
        .from('.life-interactive-impact-card', { opacity: 0, scale: 0.9, y: 30, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.4')
        .from('.metric-bar-fill', { scaleX: 0, transformOrigin: 'left center', duration: 1, stagger: 0.15, ease: 'power3.out' }, '-=0.3')
        .from('.life-hero-quote-card', { opacity: 0, scale: 0.92, y: 30, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.4');

      // Floating living animation for impact showcase and quote card
      gsap.to('.life-interactive-impact-card', {
        y: -6,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.life-hero-quote-card', {
        y: -4,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });

      // Section 2: Journey Step Reveal
      gsap.from('.life-step-node', {
        scrollTrigger: {
          trigger: '.life-steps-track',
          start: 'top 82%',
        },
        opacity: 0,
        y: 30,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // Section 2: What Employees Get Grid
      gsap.from('.life-employee-benefit-card', {
        scrollTrigger: {
          trigger: '.life-employee-benefits-grid',
          start: 'top 85%',
        },
        opacity: 0,
        y: 25,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      });

      // Section 3: Three Values
      gsap.from('.life-value-unit', {
        scrollTrigger: {
          trigger: '.life-values-col',
          start: 'top 82%',
        },
        opacity: 0,
        x: -30,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
      });

      // Section 3: Ecosystem Hierarchy Flow Nodes
      gsap.from('.life-flow-node', {
        scrollTrigger: {
          trigger: '.life-hierarchy-flow',
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.85,
        y: 25,
        duration: 0.65,
        stagger: 0.15,
        ease: 'back.out(1.5)',
      });

      // Final CTA Reveal
      gsap.from('.life-final-cta-wrap', {
        scrollTrigger: {
          trigger: '.life-final-cta-wrap',
          start: 'top 88%',
        },
        opacity: 0,
        y: 30,
        duration: 0.75,
        ease: 'power3.out',
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

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToDestination({
      id: 'home',
      label: 'HOME',
      path: '/',
      targetId: 'bogo-hero-section',
    });
  };

  return (
    <div className="bogo-life-page" id="bogo-life-page">
      {/* Top Breadcrumb Bar */}
      <nav className="life-top-nav" aria-label="Breadcrumb Navigation">
        <div className="life-nav-inner">
          <div className="life-nav-crumbs">
            <a href="/" onClick={handleHomeClick} className="life-crumb-link">
              BOGO
            </a>
            <span className="life-crumb-sep">/</span>
            <a href="/programmes" onClick={handleBackToProgrammes} className="life-crumb-link">
              PROGRAMMES
            </a>
            <span className="life-crumb-sep">/</span>
            <span className="life-crumb-current">BOGO LIFE</span>
          </div>
          <button type="button" onClick={handleBackToProgrammes} className="life-back-btn">
            ← ALL PROGRAMMES
          </button>
        </div>
      </nav>

      {/* ===================================================================
          PAGE 1 CONTENT: EXCLUSIVE BENEFITS. EVERYDAY SAVINGS.
          =================================================================== */}
      <section className="life-page-section life-section-one">
        <div className="life-container">
          <div className="life-hero-two-col">
            {/* Left Column: Heading, Lead, and 3 Pillars */}
            <div className="life-hero-left">
              <div className="life-hero-brand-badge">
                <img src="/images/Life.png" alt="BOGO Life" className="life-brand-logo-img" />
              </div>

              <h1 className="life-hero-headline">
                Exclusive benefits.
                <br />
                <span className="life-headline-purple">Everyday savings.</span>
              </h1>

              <p className="life-hero-lead">
                BOGO Life is the corporate engagement platform within the BOGO ecosystem. By partnering with leading organisations, it provides employees with exclusive shopping privileges and additional savings through customised employee benefit programmes.
              </p>

              <div className="life-hero-pillars-grid">
                {CORE_PILLARS.map((pillar) => (
                  <div key={pillar.id} className="life-hero-pillar">
                    <div className="life-pillar-icon-circle">
                      {pillar.iconType === 'rupee' && (
                        <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 3h12" />
                          <path d="M6 8h12" />
                          <path d="M6 13l8.5 8" />
                          <path d="M6 13h3a4.5 4.5 0 0 0 0-9" />
                        </svg>
                      )}
                      {pillar.iconType === 'partnerships' && (
                        <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      )}
                      {pillar.iconType === 'shopping' && (
                        <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                      )}
                    </div>
                    <h3 className="life-pillar-title">{pillar.title}</h3>
                    <p className="life-pillar-desc">{pillar.description}</p>
                  </div>
                ))}
              </div>

              <div className="life-sub-strip-note">
                <span className="life-sub-kicker">BETTER PEOPLE. BRIGHTER TOMORROWS.</span>
              </div>
            </div>

            {/* Right Column: Graphic Composition & Value Quote Box */}
            <div className="life-hero-right">
              {/* Interactive BOGO Life Corporate Impact Showcase */}
              <div className="life-interactive-impact-card">
                <div className="impact-card-header">
                  <div className="impact-badge-pill">
                    <span className="impact-badge-pulse" />
                    <span>CORPORATE ENGAGEMENT ECOSYSTEM</span>
                  </div>
                  <span className="impact-chip">BOGO LIFE</span>
                </div>

                <div className="impact-metrics-list">
                  <div className="impact-metric-row">
                    <div className="metric-info">
                      <span className="metric-label">Employee Shopping Privileges</span>
                      <span className="metric-val">100% Ecosystem Access</span>
                    </div>
                    <div className="metric-bar-bg">
                      <div className="metric-bar-fill fill-purple" style={{ width: '92%' }} />
                    </div>
                  </div>

                  <div className="impact-metric-row">
                    <div className="metric-info">
                      <span className="metric-label">Curated Workplace Programmes</span>
                      <span className="metric-val">11 Specialised Categories</span>
                    </div>
                    <div className="metric-bar-bg">
                      <div className="metric-bar-fill fill-magenta" style={{ width: '86%' }} />
                    </div>
                  </div>

                  <div className="impact-metric-row">
                    <div className="metric-info">
                      <span className="metric-label">Additional Everyday Savings</span>
                      <span className="metric-val">Beyond In-Store Offers</span>
                    </div>
                    <div className="metric-bar-bg">
                      <div className="metric-bar-fill fill-amber" style={{ width: '78%' }} />
                    </div>
                  </div>
                </div>

                <div className="impact-card-tagline">
                  <span className="impact-tagline-text">GOOD BRANDS · BRIGHTER PEOPLE · STRONGER ORGANISATIONS</span>
                </div>
              </div>

              {/* PDF Quote Card */}
              <div className="life-hero-quote-card">
                <p className="life-quote-text">“When people feel valued, great things happen.”</p>
                <div className="life-quote-footer">
                  <div className="life-quote-action-item">
                    <div className="quote-action-icon-wrap">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                    </div>
                    <span className="action-label">SHOP MORE</span>
                  </div>

                  <div className="life-quote-action-item">
                    <div className="quote-action-icon-wrap">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                    <span className="action-label">SAVE MORE</span>
                  </div>

                  <div className="life-quote-action-item">
                    <div className="quote-action-icon-wrap">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </div>
                    <span className="action-label">LIVE BETTER</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          PAGE 2 CONTENT: A SIMPLER WAY TO REWARD YOUR PEOPLE.
          =================================================================== */}
      <section className="life-page-section life-section-two">
        <div className="life-container">
          <div className="life-section-title-wrap">
            <h2 className="life-page-heading">
              A simpler way
              <br />
              <span className="life-headline-purple">to reward your people.</span>
            </h2>
            <p className="life-section-lead-text">
              We make it easy for organisations to offer meaningful benefits while giving employees access to exclusive savings across the BOGO ecosystem.
            </p>
          </div>

          {/* 5-Step Process Timeline */}
          <div className="life-steps-track">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.num} className="life-step-node">
                <div className="step-node-top">
                  <span className="step-node-num">{step.num}</span>
                  <div className="step-node-icon-circle">
                    {step.iconType === 'handshake' && (
                      <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 17a1 1 0 0 0 1.41 0l5.3-5.3a2 2 0 0 0 0-2.83l-1.42-1.41a2 2 0 0 0-2.83 0L10 11l-2.4-2.4a2 2 0 0 0-2.83 0l-1.41 1.41a2 2 0 0 0 0 2.83L6.5 16" />
                        <path d="M16 8l2 2" />
                        <path d="M8 16l2-2" />
                      </svg>
                    )}
                    {step.iconType === 'gear' && (
                      <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    )}
                    {step.iconType === 'people' && (
                      <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )}
                    {step.iconType === 'cart' && (
                      <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                    )}
                    {step.iconType === 'percent' && (
                      <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="5" x2="5" y2="19" />
                        <circle cx="6.5" cy="6.5" r="2.5" />
                        <circle cx="17.5" cy="17.5" r="2.5" />
                      </svg>
                    )}
                  </div>
                  {idx < PROCESS_STEPS.length - 1 && <span className="step-node-arrow">›</span>}
                </div>
                <h3 className="step-node-name">{step.name}</h3>
                <p className="step-node-desc">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* What Employees Get Section */}
          <div className="life-employees-get-wrap">
            <div className="life-get-graphic-side">
              <div className="life-graphic-callout">
                <span className="callout-line">Good</span>
                <span className="callout-line highlight">Brands</span>
                <span className="callout-line">Brighter</span>
                <span className="callout-line highlight">People</span>
              </div>
            </div>

            <div className="life-get-content-side">
              <h3 className="life-subheading">What employees get</h3>

              <div className="life-employee-benefits-grid">
                {WHAT_EMPLOYEES_GET.map((item) => (
                  <div key={item.id} className="life-employee-benefit-card">
                    <div className="employee-benefit-icon-box">
                      {item.iconType === 'tag' && (
                        <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                          <line x1="7" y1="7" x2="7.01" y2="7" />
                        </svg>
                      )}
                      {item.iconType === 'gift' && (
                        <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 12 20 22 4 22 4 12" />
                          <rect x="2" y="7" width="20" height="5" />
                          <line x1="12" y1="22" x2="12" y2="7" />
                          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                        </svg>
                      )}
                      {item.iconType === 'grid' && (
                        <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="7" height="7" />
                          <rect x="14" y="3" width="7" height="7" />
                          <rect x="14" y="14" width="7" height="7" />
                          <rect x="3" y="14" width="7" height="7" />
                        </svg>
                      )}
                      {item.iconType === 'heart' && (
                        <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      )}
                      {item.iconType === 'device' && (
                        <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                          <line x1="12" y1="18" x2="12.01" y2="18" />
                        </svg>
                      )}
                      {item.iconType === 'users' && (
                        <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      )}
                    </div>
                    <div className="employee-benefit-meta">
                      <h4 className="employee-benefit-title">{item.title}</h4>
                      <p className="employee-benefit-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="life-sub-strip-foot">
            <span className="life-sub-kicker">EVERYDAY SAVINGS. BRIGHTER TOMORROWS.</span>
          </div>
        </div>
      </section>

      {/* ===================================================================
          PAGE 3 CONTENT: BENEFITS THAT STRENGTHEN THE WORKPLACE.
          =================================================================== */}
      <section className="life-page-section life-section-three">
        <div className="life-container">
          <div className="life-section-title-wrap">
            <h2 className="life-page-heading">
              Benefits that
              <br />
              <span className="life-headline-purple">strengthen the workplace.</span>
            </h2>
            <p className="life-section-lead-text">
              BOGO Life helps organisations create a more engaged, motivated and valued workforce through meaningful retail benefits.
            </p>
          </div>

          <div className="life-strengthen-grid">
            {/* Left: 3 Core Value Items */}
            <div className="life-values-col">
              {THREE_VALUES.map((val) => (
                <div key={val.id} className="life-value-unit">
                  <div className="value-unit-icon-circle">
                    {val.iconType === 'people-group' && (
                      <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )}
                    {val.iconType === 'chart-growth' && (
                      <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                        <path d="M3 3l18 18" />
                      </svg>
                    )}
                    {val.iconType === 'network-handshake' && (
                      <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </svg>
                    )}
                  </div>
                  <div className="value-unit-content">
                    <h3 className="value-unit-title">{val.title}</h3>
                    <p className="value-unit-desc">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Vertical Connected Hierarchy Flow */}
            <div className="life-hierarchy-col">
              <div className="life-hierarchy-flow">
                {ECOSYSTEM_HIERARCHY.map((node, index) => (
                  <React.Fragment key={node.label}>
                    <div className="life-flow-node">
                      <div className="node-icon-box" style={{ color: node.color }}>
                        {node.iconType === 'building' && (
                          <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                            <line x1="9" y1="22" x2="9" y2="18" />
                            <line x1="15" y1="22" x2="15" y2="18" />
                            <line x1="8" y1="6" x2="8.01" y2="6" />
                            <line x1="16" y1="6" x2="16.01" y2="6" />
                            <line x1="8" y1="10" x2="8.01" y2="10" />
                            <line x1="16" y1="10" x2="16.01" y2="10" />
                            <line x1="8" y1="14" x2="8.01" y2="14" />
                            <line x1="16" y1="14" x2="16.01" y2="14" />
                          </svg>
                        )}
                        {node.iconType === 'bogo-life' && (
                          <img src="/images/Life.png" alt="BOGO Life" className="node-logo-glyph" />
                        )}
                        {node.iconType === 'users-heart' && (
                          <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        )}
                        {node.iconType === 'star-banner' && (
                          <svg className="prem-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        )}
                      </div>
                      <div className="node-meta">
                        <span className="node-label" style={{ color: node.color }}>{node.label}</span>
                        <span className="node-sub">{node.sub}</span>
                      </div>
                    </div>

                    {index < ECOSYSTEM_HIERARCHY.length - 1 && (
                      <div className="life-flow-line">
                        <span className="line-pip" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action Section: A stronger tomorrow, together. */}
          <div className="life-final-cta-wrap">
            <div className="life-final-cta-text">
              <h3 className="final-cta-heading">
                A stronger tomorrow,
                <br />
                <span className="final-cta-purple">together.</span>
              </h3>
              <p className="final-cta-lead">
                Let's build a workplace where everyone feels valued — today and every day.
              </p>
            </div>

            <div className="life-final-cta-btn-wrap">
              <a href="mailto:partnerships@bogo.in?subject=BOGO%20Life%20Partnership" className="life-partner-cta-btn">
                Partner with BOGO Life →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Global Footer */}
      <BogoFooter />
    </div>
  );
};
