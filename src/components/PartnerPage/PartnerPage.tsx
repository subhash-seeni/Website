import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navigateToDestination } from '../../config/navigation';
import './PartnerPage.css';

gsap.registerPlugin(ScrollTrigger);

// 1. Four Pillars of Built For People Who Want To Build (Page 1)
const CORE_PILLARS = [
  {
    id: 'ambition',
    title: 'Ambition',
    description: 'You bring the drive to build something of your own.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    id: 'opportunity',
    title: 'Opportunity',
    description: 'Identify a market, location or business opportunity with potential.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    id: 'ecosystem',
    title: 'Ecosystem',
    description: 'Access the products, supply, knowledge and support needed to turn that opportunity into a business.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 'growth',
    title: 'Growth',
    description: 'Build a business with the ability to evolve, expand and create long-term value.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

// 2. What BOGO Brings (Page 2 - 6 capabilities)
const BOGO_BRINGS = [
  {
    id: 'products',
    title: 'Products',
    desc: 'Access to products and brands from the BOGO ecosystem.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    id: 'supply',
    title: 'Supply',
    desc: 'A connected supply and distribution network to support everyday operations.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: 'store-setup',
    title: 'Store Setup',
    desc: 'Support in creating and establishing the retail business.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'people',
    title: 'People',
    desc: 'Support with hiring, training and building the capabilities needed to operate.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'know-how',
    title: 'Know-How',
    desc: 'Business guidance, retail knowledge and practical expertise.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 'ongoing-support',
    title: 'Ongoing Support',
    desc: 'Continued collaboration as the business develops and grows.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
];

// 3. What The Partner Brings (Page 2 - 4 qualities)
const PARTNER_BRINGS = [
  {
    id: 'vision',
    title: 'Vision',
    desc: 'The ambition and idea to build something meaningful.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
      </svg>
    ),
  },
  {
    id: 'local-understanding',
    title: 'Local Understanding',
    desc: 'Knowledge of the opportunity, customers and market.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: 'ownership',
    title: 'Ownership',
    desc: 'The commitment to operate, manage and grow the business.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 9" />
      </svg>
    ),
  },
  {
    id: 'entrepreneurial-drive',
    title: 'Entrepreneurial Drive',
    desc: 'The energy to make decisions, solve problems and create value.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

// 4. Four Shared Quadrants (Page 3)
const SHARED_SUCCESS_QUADRANTS = [
  {
    id: 'shared-investment',
    title: 'Shared Investment',
    desc: 'BOGO contributes resources, capabilities and ecosystem support to help establish and develop the business.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: 'shared-ownership',
    title: 'Shared Ownership',
    desc: 'The partnership can be structured around a shared stake in the business, aligning both sides around long-term growth.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="12" r="7" />
        <circle cx="15" cy="12" r="7" />
      </svg>
    ),
  },
  {
    id: 'shared-responsibility',
    title: 'Shared Responsibility',
    desc: 'The entrepreneur leads the business while BOGO provides the ecosystem and support required to help it succeed.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'shared-rewards',
    title: 'Shared Rewards',
    desc: 'As the business creates value and grows, both partners participate in the success.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
  },
];

// 5. Five-Step Journey (Page 3)
const JOURNEY_STEPS = [
  {
    num: '01',
    title: 'Idea',
    desc: 'Identify the right opportunity with strong potential.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Partner',
    desc: 'Bring the entrepreneur and BOGO ecosystem together.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 17a1 1 0 0 0 1.41 0l5.3-5.3a2 2 0 0 0 0-2.83l-1.42-1.41a2 2 0 0 0-2.83 0L10 11l-2.4-2.4a2 2 0 0 0-2.83 0l-1.41 1.41a2 2 0 0 0 0 2.83L6.5 16" />
        <path d="M16 8l2 2" />
        <path d="M8 16l2-2" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Build',
    desc: 'Set up the business with the right products, people and support.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Grow',
    desc: 'Operate, learn and build a stronger customer base.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Scale',
    desc: 'Create opportunities for long-term expansion.',
    icon: (
      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export const PartnerPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero Entrance Timeline
      const heroTl = gsap.timeline();
      heroTl
        .from('.partner-hero-badge', { opacity: 0, y: -20, duration: 0.6, ease: 'power2.out' })
        .from('.partner-hero-headline', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .from('.partner-hero-lead', { opacity: 0, y: 20, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .from('.partner-hero-statement', { opacity: 0, y: 15, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .from('.partner-hero-pillar', { opacity: 0, y: 25, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.3')
        .from('.partner-ecosystem-visual-card', { opacity: 0, scale: 0.92, y: 30, duration: 0.85, ease: 'back.out(1.4)' }, '-=0.4');

      // Floating living micro-animation for ecosystem hub
      gsap.to('.partner-ecosystem-visual-card', {
        y: -6,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Section 2: Two-sided Collaboration Columns & Center Convergence
      gsap.utils.toArray<HTMLElement>('.partner-bogo-card, .partner-entrepreneur-card, .partner-convergence-node, .partner-true-partnership-card').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            once: true,
          },
          opacity: 0,
          y: 20,
          duration: 0.45,
          ease: 'power2.out',
        });
      });

      // Section 3: Quadrants
      gsap.utils.toArray<HTMLElement>('.partner-quadrant-card').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            once: true,
          },
          opacity: 0,
          y: 25,
          duration: 0.5,
          ease: 'power2.out',
        });
      });

      // Section 3: Five Steps Track
      gsap.utils.toArray<HTMLElement>('.partner-step-node').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            once: true,
          },
          opacity: 0,
          y: 20,
          duration: 0.45,
          ease: 'power2.out',
        });
      });

      // Bottom Banner
      gsap.from('.partner-closing-banner', {
        scrollTrigger: {
          trigger: '.partner-closing-banner',
          start: 'top 90%',
          once: true,
        },
        opacity: 0,
        y: 25,
        duration: 0.6,
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
    <div className="bogo-partner-page" id="bogo-partner-page">
      {/* Top Sticky Breadcrumb Nav with logo right inside */}
      <nav className="partner-top-nav" aria-label="Breadcrumb Navigation">
        <div className="partner-nav-inner">
          <div className="partner-nav-left">
            <div className="partner-nav-logo-box">
              <img src="/images/Partner.png" alt="BOGO Partner" className="partner-nav-logo-img" />
            </div>
            <div className="partner-nav-crumbs">
              <a href="/" onClick={handleHomeClick} className="partner-crumb-link">
                BOGO
              </a>
              <span className="partner-crumb-sep">/</span>
              <a href="/programmes" onClick={handleBackToProgrammes} className="partner-crumb-link">
                PROGRAMMES
              </a>
              <span className="partner-crumb-sep">/</span>
              <span className="partner-crumb-current">BOGO PARTNER</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleBackToProgrammes}
            className="partner-back-btn"
            id="all-programmes-btn"
          >
            ← ALL PROGRAMMES
          </button>
        </div>
      </nav>

      {/* ===================================================================
          SECTION 1: YOUR AMBITION. OUR ECOSYSTEM. SHARED SUCCESS.
          =================================================================== */}
      <section className="partner-page-section partner-section-hero">
        <div className="partner-container">
          <div className="partner-hero-grid">
            {/* Left Column: Heading, Narrative, and 4 Core Pillars */}
            <div className="partner-hero-left">
              <div className="partner-hero-badge">
                <img src="/images/Partner.png" alt="BOGO Partner" className="partner-brand-logo-img" />
              </div>

              <h1 className="partner-hero-headline">
                Your ambition.
                <br />
                <span className="headline-dark">Our ecosystem.</span>
                <br />
                <span className="headline-green">Shared success.</span>
              </h1>

              <p className="partner-hero-lead">
                BOGO Partner is a growth platform for entrepreneurs and promising businesses.
                We combine our ecosystem, capabilities and experience with your ambition to build
                and grow sustainable retail businesses that create long-term value.
              </p>

              <div className="partner-hero-statement">
                <p className="statement-line">You bring the ambition.</p>
                <p className="statement-line statement-highlight">BOGO brings the ecosystem.</p>
              </div>
            </div>

            {/* Right Column: Dynamic Ecosystem Orbit Composition */}
            <div className="partner-hero-right">
              <div className="partner-ecosystem-visual-card">
                {/* Top Row: Ecosystem & Opportunity */}
                <div className="orbit-satellites-row">
                  <div className="orbit-satellite">
                    <div className="sat-icon-wrap">
                      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <div className="sat-info">
                      <span className="sat-label">ECOSYSTEM</span>
                      <span className="sat-sub">Products, Supply &amp; Support</span>
                    </div>
                  </div>

                  <div className="orbit-satellite">
                    <div className="sat-icon-wrap">
                      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </div>
                    <div className="sat-info">
                      <span className="sat-label">OPPORTUNITY</span>
                      <span className="sat-sub">Location &amp; High-Potential Market</span>
                    </div>
                  </div>
                </div>

                {/* Center Core Node */}
                <div className="orbit-center-node">
                  <div className="orbit-center-inner">
                    <span className="orbit-center-tag">BOGO PARTNER</span>
                    <h3 className="orbit-center-heading">BUILD · GROW · SUCCEED</h3>
                  </div>
                </div>

                {/* Bottom Row: Growth & Partnership */}
                <div className="orbit-satellites-row">
                  <div className="orbit-satellite">
                    <div className="sat-icon-wrap">
                      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                    </div>
                    <div className="sat-info">
                      <span className="sat-label">GROWTH</span>
                      <span className="sat-sub">Evolve &amp; Expand Long-Term</span>
                    </div>
                  </div>

                  <div className="orbit-satellite">
                    <div className="sat-icon-wrap">
                      <svg className="prem-partner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 17a1 1 0 0 0 1.41 0l5.3-5.3a2 2 0 0 0 0-2.83l-1.42-1.41a2 2 0 0 0-2.83 0L10 11l-2.4-2.4a2 2 0 0 0-2.83 0l-1.41 1.41a2 2 0 0 0 0 2.83L6.5 16" />
                        <path d="M16 8l2 2" />
                        <path d="M8 16l2-2" />
                      </svg>
                    </div>
                    <div className="sat-info">
                      <span className="sat-label">PARTNERSHIP</span>
                      <span className="sat-sub">Shared Commitment &amp; Effort</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars: Built For People Who Want To Build (Centered) */}
          <div className="partner-pillars-block">
            <div className="partner-pillars-header">
              <span className="pillars-kicker">BUILT FOR</span>
              <h3 className="pillars-title">PEOPLE WHO WANT TO BUILD</h3>
            </div>

            <div className="partner-pillars-grid">
              {CORE_PILLARS.map((pillar) => (
                <div key={pillar.id} className="partner-hero-pillar">
                  <div className="partner-pillar-icon-box">{pillar.icon}</div>
                  <h4 className="partner-pillar-title">{pillar.title}</h4>
                  <p className="partner-pillar-desc">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 2: YOU BRING THE AMBITION. WE BRING THE ECOSYSTEM.
          =================================================================== */}
      <section className="partner-page-section partner-section-capabilities">
        <div className="partner-container">
          <div className="partner-section-header">
            <h2 className="partner-section-heading">
              You bring the ambition.
              <br />
              <span className="heading-accent">We bring the ecosystem.</span>
            </h2>
            <p className="partner-section-lead-text">
              BOGO Partner is built around a simple principle: combine the strengths of the
              entrepreneur with the capabilities of BOGO.
            </p>
          </div>

          <div className="partner-collaboration-layout">
            {/* Left: What BOGO Brings (6 capabilities) */}
            <div className="partner-col partner-col-bogo">
              <div className="col-header-badge bogo-badge">
                <span className="col-kicker">WHAT</span>
                <h3 className="col-title">BOGO BRINGS</h3>
              </div>

              <div className="partner-cards-list">
                {BOGO_BRINGS.map((item) => (
                  <div key={item.id} className="partner-bogo-card">
                    <div className="item-icon-box bogo-icon">{item.icon}</div>
                    <div className="item-text">
                      <h4 className="item-title">{item.title}</h4>
                      <p className="item-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Center Convergence Badge */}
            <div className="partner-center-convergence">
              <div className="partner-convergence-node">
                <div className="convergence-icon">🤝</div>
                <h4 className="convergence-title">BOGO ECOSYSTEM + ENTREPRENEURIAL AMBITION</h4>
                <div className="convergence-divider" />
                <span className="convergence-outcome">A BUSINESS BUILT TO GROW</span>
              </div>
            </div>

            {/* Right: What The Partner Brings (4 qualities) */}
            <div className="partner-col partner-col-partner">
              <div className="col-header-badge partner-badge">
                <span className="col-kicker">WHAT</span>
                <h3 className="col-title">THE PARTNER BRINGS</h3>
              </div>

              <div className="partner-cards-list">
                {PARTNER_BRINGS.map((item) => (
                  <div key={item.id} className="partner-entrepreneur-card">
                    <div className="item-icon-box partner-icon">{item.icon}</div>
                    <div className="item-text">
                      <h4 className="item-title">{item.title}</h4>
                      <p className="item-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* A True Partnership Box */}
              <div className="partner-true-partnership-card">
                <h4 className="partnership-card-title">A true partnership</h4>
                <p className="partnership-card-desc">
                  We invest our ecosystem and experience. You invest your ambition and effort.
                  Together, we build a stronger, sustainable business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 3: BUILD TOGETHER. GROW TOGETHER. SUCCEED TOGETHER.
          =================================================================== */}
      <section className="partner-page-section partner-section-success">
        <div className="partner-container">
          <div className="partner-section-header">
            <h2 className="partner-section-heading">
              Build together.
              <br />
              <span className="heading-green">Grow together.</span>
              <br />
              <span className="heading-dark">Succeed together.</span>
            </h2>
            <p className="partner-section-lead-text">
              BOGO Partner is built on shared success. We invest our ecosystem and expertise.
              You bring ownership and commitment. Together, we build a business that grows in value and creates impact.
            </p>
          </div>

          {/* 4 Shared Success Quadrants */}
          <div className="partner-quadrants-grid">
            {SHARED_SUCCESS_QUADRANTS.map((quad) => (
              <div key={quad.id} className="partner-quadrant-card">
                <div className="quadrant-top">
                  <div className="quadrant-icon-box">{quad.icon}</div>
                  <h3 className="quadrant-title">{quad.title}</h3>
                </div>
                <p className="quadrant-desc">{quad.desc}</p>
              </div>
            ))}
          </div>

          {/* Five Steps: The Journey Together */}
          <div className="partner-journey-container">
            <div className="journey-header">
              <span className="journey-kicker">COLLABORATIVE ROADMAP</span>
              <h3 className="journey-title">THE JOURNEY TOGETHER</h3>
            </div>

            <div className="partner-journey-track">
              {JOURNEY_STEPS.map((step) => (
                <div key={step.num} className="partner-step-node">
                  <div className="step-top-row">
                    <span className="step-num">{step.num}</span>
                    <div className="step-icon-wrap">{step.icon}</div>
                  </div>
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Closing Brand Banner */}
          <div className="partner-closing-banner">
            <div className="closing-left">
              <span className="closing-kicker">PARTNER PHILOSOPHY</span>
              <h3 className="closing-title">When our partners grow, BOGO grows with them.</h3>
              <p className="closing-sub">
                BOGO Partner is more than a way to start a business. It is a way to build one together.
              </p>
            </div>

            <div className="closing-trio">
              <div className="trio-item">
                <span className="trio-icon">🌱</span>
                <span className="trio-label">Your business.</span>
              </div>
              <div className="trio-item">
                <span className="trio-icon">🌐</span>
                <span className="trio-label">Our ecosystem.</span>
              </div>
              <div className="trio-item">
                <span className="trio-icon">🤝</span>
                <span className="trio-label">Our shared future.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
