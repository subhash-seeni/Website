import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navigateToDestination } from '../../config/navigation';
import affairsLogoImg from '../../assets/Affairs.png';
import './AffairsPage.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Evolution Timeline Stages (2027 vs 2028)
 */
interface EvolutionStage {
  step: string;
  title: string;
  period: '2027' | '2028';
  phaseLabel: string;
  description: string;
  deliverables: string[];
}

const EVOLUTION_STAGES: EvolutionStage[] = [
  {
    step: '01',
    title: 'Inform',
    period: '2027',
    phaseLabel: 'Foundation Phase · 2027',
    description: 'Establish BOGO Affairs as the authoritative information layer across the retail network.',
    deliverables: ['Real-time news wire', 'Storefront dispatch boards', 'Ecosystem press releases'],
  },
  {
    step: '02',
    title: 'Connect',
    period: '2027',
    phaseLabel: 'Community Phase · 2027',
    description: 'Build a stronger BOGO community through regular dialogues and partner exchanges.',
    deliverables: ['Producer roundtables', 'Consumer councils', 'Direct buyer-seller touchpoints'],
  },
  {
    step: '03',
    title: 'Engage',
    period: '2027',
    phaseLabel: 'Brand Phase · 2027',
    description: 'Strengthen communication and engagement with BOGO brands and store touchpoints.',
    deliverables: ['Dedicated brand showrooms', 'Interactive seasonal campaigns', 'Co-marketing initiatives'],
  },
  {
    step: '04',
    title: 'Evolve',
    period: '2028',
    phaseLabel: 'Strategic Horizon · 2028',
    description: 'Grow into a comprehensive retail and FMCG industry-intelligence platform.',
    deliverables: ['National grocery data index', 'Predictive FMCG reports', 'Autonomous supply intelligence'],
  },
];

export const AffairsPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. HERO ENTRANCE: Kinetic Stagger & Magnetic Depth
      // Initialize with base values to ensure 100% visibility guarantee
      gsap.set('.aff-hero-orbit-stage', { opacity: 1, scale: 1 });
      gsap.set('.aff-hero-center-logo', { opacity: 1, scale: 1 });
      gsap.set('.aff-hero-title-main', { opacity: 1 });
      gsap.set('.aff-hero-sub-text', { opacity: 1 });
      gsap.set('.aff-hero-dock-bar .aff-hero-telemetry-btn', { opacity: 1 });

      // Smooth from animation
      gsap.from('.aff-hero-orbit-stage', {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: 'back.out(1.4)',
      });

      gsap.from('.aff-hero-center-logo', {
        scale: 0.85,
        y: 20,
        opacity: 0,
        duration: 1.1,
        delay: 0.15,
        ease: 'power3.out',
      });

      gsap.from('.aff-hero-title-main', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.25,
        ease: 'power3.out',
      });

      gsap.from('.aff-hero-sub-text', {
        y: 20,
        opacity: 0,
        duration: 0.9,
        delay: 0.35,
        ease: 'power3.out',
      });

      gsap.from('.aff-hero-dock-bar .aff-hero-telemetry-btn', {
        y: 15,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.45,
        ease: 'back.out(1.5)',
      });

      // Living ambient continuous orbit rotation with varied speeds
      gsap.to('.aff-orbit-ring-outer', {
        rotation: 360,
        duration: 65,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.aff-orbit-ring-inner', {
        rotation: -360,
        duration: 45,
        repeat: -1,
        ease: 'none',
      });

      // Subtle breathing pulse on the hero radial flare
      gsap.to('.aff-hero-radial-flare', {
        scale: 1.2,
        opacity: 0.85,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Ambient Background Glow floating drifts
      gsap.to('.aff-ambient-glow.glow-top', {
        x: 60,
        y: 40,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.aff-ambient-glow.glow-middle', {
        x: -50,
        y: 50,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 2. STRATEGIC ROADMAP (2027 -> 2028): ADVANCED GSAP SCRUB & PHOTON BEAM
      // Section header entrance
      gsap.fromTo(
        '.aff-timeline-section .aff-section-header > *',
        { y: 35, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.aff-timeline-section',
            start: 'top 82%',
          },
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      // Year indicator capsules with magnetic snap
      const timelineTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.aff-horizon-indicator',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      timelineTl
        .fromTo(
          '.horizon-2027',
          { x: -60, opacity: 0, scale: 0.88 },
          { x: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }
        )
        .fromTo(
          '.aff-horizon-arrow-node',
          { scale: 0, opacity: 0, rotation: -180 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(2)' },
          '-=0.4'
        )
        .fromTo(
          '.horizon-2028',
          { x: 60, opacity: 0, scale: 0.88 },
          { x: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.5'
        );

      // Scrubbing laser progression line connecting 2027 to 2028 across cards
      gsap.fromTo(
        '.aff-timeline-beam-path',
        { strokeDashoffset: 1200 },
        {
          scrollTrigger: {
            trigger: '.aff-timeline-wrapper',
            start: 'top 80%',
            end: 'bottom 55%',
            scrub: 0.4,
          },
          strokeDashoffset: 0,
          ease: 'none',
        }
      );

      // Traveling glowing photon pulse running along the beam line synced to scroll
      gsap.fromTo(
        '.aff-timeline-pulse-node',
        { left: '1%' },
        {
          scrollTrigger: {
            trigger: '.aff-timeline-wrapper',
            start: 'top 80%',
            end: 'bottom 55%',
            scrub: 0.4,
          },
          left: '99%',
          ease: 'none',
        }
      );

      // Staggered cascade of the 4 timeline stage cards with 3D tilt & individual step reveal
      const timelineCards = gsap.utils.toArray<HTMLElement>('.aff-timeline-card');
      gsap.fromTo(
        timelineCards,
        { y: 70, opacity: 0, scale: 0.9, rotationX: 14 },
        {
          scrollTrigger: {
            trigger: '.aff-timeline-grid',
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          stagger: 0.15,
          duration: 0.85,
          ease: 'power3.out',
        }
      );

      timelineCards.forEach((card) => {
        // Sub-deliverables sequential ripple inside each timeline card
        const items = card.querySelectorAll('.aff-timeline-item-row');
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { x: -16, opacity: 0 },
            {
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              },
              x: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 0.5,
              delay: 0.25,
              ease: 'power2.out',
            }
          );
        }

        // Tactile mouse tilt tracking on timeline cards
        const handleTimelineMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(card, {
            rotationY: x * 0.05,
            rotationX: -y * 0.05,
            transformPerspective: 900,
            duration: 0.25,
            ease: 'power1.out',
          });
        };

        const handleTimelineMouseLeave = () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.6,
            ease: 'power2.out',
          });
        };

        card.addEventListener('mousemove', handleTimelineMouseMove);
        card.addEventListener('mouseleave', handleTimelineMouseLeave);
      });

      // Continuous subtle breathing animation on 2028 Horizon Card
      gsap.to('.aff-timeline-card.is-horizon-2028', {
        boxShadow: '0 20px 56px rgba(253, 114, 17, 0.32), 0 0 20px rgba(253, 114, 17, 0.2)',
        borderColor: 'rgba(253, 114, 17, 0.85)',
        scale: 1.02,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

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

  const handleNavigateHome = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToDestination({
      id: 'home',
      label: 'HOME',
      path: '/',
      targetId: 'bogo-hero-section',
    });
  };

  const handleJumpToTimeline = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('affairs-evolution-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bogo-affairs-page" id="bogo-affairs-page" ref={containerRef}>
      {/* Tactile organic paper grain texture */}
      <div className="aff-page-grain" aria-hidden="true" />

      {/* Atmospheric multi-layer radiant glow field */}
      <div className="aff-ambient-glow glow-top" aria-hidden="true" />
      <div className="aff-ambient-glow glow-middle" aria-hidden="true" />
      <div className="aff-ambient-glow glow-bottom" aria-hidden="true" />

      {/* 1. TOP BREADCRUMB & CONTEXT NAVIGATION */}
      <nav className="aff-top-nav" aria-label="Breadcrumb Navigation">
        <div className="aff-nav-inner">
          <div className="aff-nav-crumbs">
            <a href="/" onClick={handleNavigateHome} className="aff-crumb-link">
              BOGO
            </a>
            <span className="aff-crumb-sep" aria-hidden="true">/</span>
            <a href="/programmes" onClick={handleBackToProgrammes} className="aff-crumb-link">
              PROGRAMMES
            </a>
            <span className="aff-crumb-sep" aria-hidden="true">/</span>
            <span className="aff-crumb-current" aria-current="page">BOGO AFFAIRS</span>
          </div>

          <button
            type="button"
            onClick={handleBackToProgrammes}
            className="aff-back-btn"
            aria-label="Return to all BOGO programmes"
          >
            ← ALL PROGRAMMES
          </button>
        </div>
      </nav>

      {/* 2. LIVING HERO SECTION WITH AMBIENT ORBIT STAGE */}
      <header className="aff-hero-section" ref={heroRef}>
        <div className="aff-hero-container">
          {/* Central Logo Stage with Orbit Rings */}
          <div className="aff-hero-orbit-stage">
            <div className="aff-hero-orbit-ring aff-orbit-ring-outer" aria-hidden="true" />
            <div className="aff-hero-orbit-ring aff-orbit-ring-inner" aria-hidden="true" />
            <div className="aff-hero-radial-flare" aria-hidden="true" />

            <div className="aff-hero-center-logo">
              <img
                src={affairsLogoImg}
                alt="BOGO Affairs"
                className="aff-hero-logo-img"
                loading="eager"
              />
            </div>
          </div>

          <h1 className="aff-hero-title-main">
            Insights That Move the BOGO Ecosystem Forward
          </h1>

          <p className="aff-hero-sub-text">
            Discover the latest news, industry insights, brand stories, and ideas shaping the BOGO ecosystem. Bringing people, brands, and partners together to build a more informed and connected retail community.
          </p>

          {/* Clean Interactive Telemetry Navigation Dock */}
          <div className="aff-hero-dock-bar">
            <button
              type="button"
              onClick={handleJumpToTimeline}
              className="aff-hero-telemetry-btn is-active"
            >
              <span className="aff-telemetry-dot dot-amber" aria-hidden="true" />
              <span>THE FOUR PILLARS</span>
              <span className="aff-telemetry-arrow">↓</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. LONG-TERM VISION & EVOLUTION TIMELINE (2027–2028 WITH SVG BEAM PROGRESSION) */}
      <section
        className="aff-timeline-section"
        id="affairs-evolution-section"
        aria-labelledby="affairs-evolution-heading"
      >
        <div className="aff-section-container">
          <div className="aff-section-header">
            <h2 className="aff-section-heading" id="affairs-evolution-heading">
              The Four Pillars of BOGO Affairs
            </h2>
            <p className="aff-section-sub">
              Guiding how information, connections, visibility, and market intelligence shape our retail collective.
            </p>
          </div>

          {/* Timeline Horizon Header with Animated Indicator Capsules */}
          <div className="aff-horizon-indicator">
            <div className="aff-horizon-pill horizon-2027">
              <span className="aff-horizon-year">2027</span>
              <span className="aff-horizon-label">Inform · Connect · Engage</span>
            </div>
            <div className="aff-horizon-arrow-node" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="#fd7211" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="aff-horizon-pill horizon-2028">
              <span className="aff-horizon-year">2028</span>
              <span className="aff-horizon-label">Evolve into Industry Intelligence</span>
            </div>
          </div>

          {/* Timeline Grid with Flow Connector Beam */}
          <div className="aff-timeline-wrapper">
            <svg
              className="aff-timeline-svg-beam"
              viewBox="0 0 1200 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="affBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0d4098" stopOpacity="0.2" />
                  <stop offset="70%" stopColor="#2172df" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#fd7211" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path
                d="M 20,30 L 1180,30"
                stroke="url(#affBeamGrad)"
                strokeWidth="2.5"
                strokeDasharray="1200"
                className="aff-timeline-beam-path"
              />
            </svg>

            {/* Traveling Photon Node on Beam */}
            <div className="aff-timeline-pulse-node" aria-hidden="true" />

            <div className="aff-timeline-grid">
              {EVOLUTION_STAGES.map((stage) => {
                const is2028 = stage.period === '2028';
                return (
                  <article
                    key={stage.step}
                    className={`aff-timeline-card ${is2028 ? 'is-horizon-2028' : 'is-horizon-2027'}`}
                  >
                    <div className="aff-timeline-top">
                      <span className="aff-timeline-step">{stage.step}</span>
                      <span className={`aff-timeline-pill ${is2028 ? 'pill-2028' : 'pill-2027'}`}>
                        {stage.period}
                      </span>
                    </div>
                    <span className="aff-timeline-phase">{stage.phaseLabel}</span>
                    <h3 className="aff-timeline-title">{stage.title}</h3>
                    <p className="aff-timeline-desc">{stage.description}</p>

                    <div className="aff-timeline-deliverables">
                      {stage.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="aff-timeline-item-row">
                          <span className="aff-timeline-dot" aria-hidden="true" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
