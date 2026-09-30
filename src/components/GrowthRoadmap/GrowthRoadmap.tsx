import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GrowthRoadmap.css';

gsap.registerPlugin(ScrollTrigger);

interface RoadmapPhase {
  id: string;
  num: string;
  label: string;
  headline: string;
  concept: string;
  statements: string[];
}

const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 'phase-1',
    num: '01',
    label: 'PHASE 01',
    headline: 'BUILD THE FOUNDATION',
    concept: 'FOUNDATION',
    statements: [
      'Launch flagship BOGO Square experience center',
      'Establish direct farmgate & producer supply chain',
      'Roll out the core 11 in-house consumer brands',
      'Introduce unified BOGO Companion membership',
    ],
  },
  {
    id: 'phase-2',
    num: '02',
    label: 'PHASE 02',
    headline: 'EXPAND THE NETWORK',
    concept: 'NETWORK',
    statements: [
      'Deploy BOGO Bazaar community supermarkets',
      'Establish BOGO Mini neighborhood express stores',
      'Scale BOGO Go supply chain & multi-tier distribution network',
      'Expand across key Tier-1 & Tier-2 urban clusters',
    ],
  },
  {
    id: 'phase-3',
    num: '03',
    label: 'PHASE 03',
    headline: 'ENABLE SCALE & TECH',
    concept: 'GROWTH',
    statements: [
      'Deploy smart shopping carts & frictionless checkout',
      'Scale BOGO Partner program for regional producers',
      'Expand product lines across clean nutrition & living',
      'Establish regional cold-chain distribution centers',
    ],
  },
  {
    id: 'phase-4',
    num: '04',
    label: 'PHASE 04',
    headline: 'LEAD MODERN RETAIL',
    concept: 'FUTURE',
    statements: [
      'Establish nationwide footprint across 100+ physical stores',
      'Direct partnerships supporting 10,000+ local farmers',
      'Predictive inventory mesh minimizing food waste',
      'Deliver lasting, honest value to families and communities',
    ],
  },
];

export const GrowthRoadmap: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // -----------------------------------------------------------------------
      // INITIAL ELEMENT STATES
      // -----------------------------------------------------------------------
      // Section intro & headers
      gsap.set('.bogo-growth-intro', { opacity: 0, y: 24 });
      gsap.set('.bogo-growth-header-block', { opacity: 0, y: 30 });

      // The 4 phases
      gsap.set('.bogo-growth-phase-1', { opacity: 0, y: 30, scale: 0.96 });
      gsap.set('.bogo-growth-phase-2', { opacity: 0, y: 30, scale: 0.96 });
      gsap.set('.bogo-growth-phase-3', { opacity: 0, y: 30, scale: 0.96 });
      gsap.set('.bogo-growth-phase-4', { opacity: 0, y: 30, scale: 0.96 });

      // Statements initial states inside phases
      gsap.set('.bogo-growth-statement', { opacity: 0, y: 12 });

      // Convergence ascending composition
      gsap.set('.bogo-growth-ascent-stele', { opacity: 0, y: 60 });
      gsap.set('.bogo-growth-stele-item', { opacity: 0, x: -20 });

      // Final Looking Ahead transition & closing statement
      gsap.set('.bogo-growth-light-plane', { opacity: 0 });
      gsap.set('.bogo-growth-looking-ahead', { opacity: 0 });
      gsap.set('.bogo-closing-eyebrow', { opacity: 0, y: 14 });
      gsap.set('.bogo-closing-line-1', { opacity: 0, y: 24 });
      gsap.set('.bogo-closing-line-2', { opacity: 0, y: 30, scale: 0.98 });
      gsap.set('.bogo-closing-sub', { opacity: 0, y: 16 });

      // -----------------------------------------------------------------------
      // MASTER SCROLL TIMELINE (Pinned sequence over 600vh)
      // -----------------------------------------------------------------------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      });

      // -----------------------------------------------------------------------
      // [0.00 -> 0.12]: SECTION INTRO & HEADER ("BUILDING THE FUTURE.")
      // Architectural spaciousness in deep BOGO navy
      // -----------------------------------------------------------------------
      tl.to(
        '.bogo-growth-intro',
        {
          opacity: 1,
          y: 0,
          duration: 0.05,
          ease: 'power2.out',
        },
        0.01
      );

      tl.to(
        '.bogo-growth-header-block',
        {
          opacity: 1,
          y: 0,
          duration: 0.06,
          ease: 'power2.out',
        },
        0.02
      );

      tl.to(
        ['.bogo-growth-intro', '.bogo-growth-header-block'],
        {
          opacity: 0,
          y: -24,
          duration: 0.03,
          ease: 'power2.in',
        },
        0.11
      );

      // -----------------------------------------------------------------------
      // [0.12 -> 0.30]: PHASE 01 — BUILD THE FOUNDATION
      // Compact, foundational, deliberate initial anchor
      // -----------------------------------------------------------------------
      tl.to(
        '.bogo-growth-phase-1',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.06,
          ease: 'power2.out',
        },
        0.13
      );

      // Progressive disclosure of foundational statements
      tl.to(
        '.phase-1-statements .bogo-growth-statement',
        {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          duration: 0.05,
          ease: 'power2.out',
        },
        0.15
      );

      // Phase 01 moves subtly backward and upward
      tl.to(
        '.bogo-growth-phase-1',
        {
          opacity: 0,
          y: -30,
          scale: 0.95,
          duration: 0.04,
          ease: 'power2.in',
        },
        0.28
      );

      // -----------------------------------------------------------------------
      // [0.30 -> 0.50]: PHASE 02 — EXPAND THE NETWORK
      // Wider composition, spreading outward into community nodes
      // -----------------------------------------------------------------------
      tl.to(
        '.bogo-growth-phase-2',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.06,
          ease: 'power2.out',
        },
        0.31
      );

      tl.to(
        '.phase-2-statements .bogo-growth-statement',
        {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          duration: 0.05,
          ease: 'power2.out',
        },
        0.33
      );

      tl.to(
        '.bogo-growth-phase-2',
        {
          opacity: 0,
          y: -30,
          scale: 0.95,
          duration: 0.04,
          ease: 'power2.in',
        },
        0.48
      );

      // -----------------------------------------------------------------------
      // [0.50 -> 0.70]: PHASE 03 — ENABLE GROWTH
      // Layered structure, scalable technology & strategic partnerships
      // -----------------------------------------------------------------------
      tl.to(
        '.bogo-growth-phase-3',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.06,
          ease: 'power2.out',
        },
        0.51
      );

      tl.to(
        '.phase-3-statements .bogo-growth-statement',
        {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          duration: 0.05,
          ease: 'power2.out',
        },
        0.53
      );

      tl.to(
        '.bogo-growth-phase-3',
        {
          opacity: 0,
          y: -30,
          scale: 0.95,
          duration: 0.04,
          ease: 'power2.in',
        },
        0.68
      );

      // -----------------------------------------------------------------------
      // [0.70 -> 0.86]: PHASE 04 — LEAD THE FUTURE OF RETAIL.
      // Reaching destination; most spacious and commanding phase
      // -----------------------------------------------------------------------
      tl.to(
        '.bogo-growth-phase-4',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.06,
          ease: 'power2.out',
        },
        0.71
      );

      tl.to(
        '.phase-4-statements .bogo-growth-statement',
        {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          duration: 0.05,
          ease: 'power2.out',
        },
        0.73
      );

      tl.to(
        '.bogo-growth-phase-4',
        {
          opacity: 0,
          y: -30,
          scale: 0.96,
          duration: 0.04,
          ease: 'power2.in',
        },
        0.85
      );

      // -----------------------------------------------------------------------
      // [0.86 -> 0.94]: THE FOUR PHASES CONVERGE — THE ASCENT
      // Vertical ascending arrangement rising upward: Foundation -> Network -> Growth -> Future
      // -----------------------------------------------------------------------
      tl.to(
        '.bogo-growth-ascent-stele',
        {
          opacity: 1,
          y: 0,
          duration: 0.04,
          ease: 'power2.out',
        },
        0.87
      );

      tl.to(
        '.bogo-growth-stele-item',
        {
          opacity: 1,
          x: 0,
          stagger: 0.012,
          duration: 0.04,
          ease: 'power2.out',
        },
        0.875
      );

      // The entire ascending composition slowly rises upward
      tl.to(
        '.bogo-growth-ascent-stele',
        {
          y: -40,
          duration: 0.04,
          ease: 'none',
        },
        0.89
      );

      tl.to(
        '.bogo-growth-ascent-stele',
        {
          opacity: 0,
          y: -70,
          duration: 0.025,
          ease: 'power2.in',
        },
        0.915
      );

      // -----------------------------------------------------------------------
      // [0.915 -> 1.00]: FINAL TRANSITION — LOOKING AHEAD & CLOSING STATEMENT
      // Quiet confidence -> conclusion -> transition to footer
      // -----------------------------------------------------------------------
      // 1. Previous content gradually fades
      tl.to(
        '.bogo-growth-header',
        {
          opacity: 0,
          duration: 0.025,
          ease: 'power2.in',
        },
        0.915
      );

      // 2. Background becomes clean off-white
      tl.to(
        '.bogo-growth-light-plane',
        {
          opacity: 1,
          duration: 0.03,
          ease: 'power2.inOut',
        },
        0.92
      );

      tl.to(
        '.bogo-growth-looking-ahead',
        {
          opacity: 1,
          duration: 0.01,
          onStart: () => {
            const el = document.querySelector('.bogo-growth-looking-ahead') as HTMLElement;
            if (el) el.style.pointerEvents = 'auto';
          },
        },
        0.925
      );

      // 3. "LOOKING AHEAD" appears first
      tl.to(
        '.bogo-closing-eyebrow',
        {
          opacity: 1,
          y: 0,
          duration: 0.03,
          ease: 'power2.out',
        },
        0.93
      );

      // 4. "BUILDING INDIA'S" fades/slides upward
      tl.to(
        '.bogo-closing-line-1',
        {
          opacity: 1,
          y: 0,
          duration: 0.035,
          ease: 'power2.out',
        },
        0.942
      );

      // 5. "NEXT RETAIL ECOSYSTEM." follows with slightly stronger emphasis
      tl.to(
        '.bogo-closing-line-2',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.04,
          ease: 'power2.out',
        },
        0.952
      );

      // 6. Supporting line appears underneath
      tl.to(
        '.bogo-closing-sub',
        {
          opacity: 1,
          y: 0,
          duration: 0.03,
          ease: 'power2.out',
        },
        0.965
      );
      // 7. Hold this composition briefly through 1.00
    }, trackRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="bogo-growth-track" ref={trackRef} id="bogo-growth-section">
      <div className="bogo-growth-viewport">
        {/* Subtle organic noise overlay */}
        <div className="bogo-growth-grain" aria-hidden="true" />

        {/* Faint Architectural Alignment Lines (Subtle structural grounding) */}
        <div className="bogo-growth-grid-lines" aria-hidden="true">
          <div className="bogo-growth-grid-h line-h1" />
          <div className="bogo-growth-grid-h line-h2" />
          <div className="bogo-growth-grid-v line-v1" />
          <div className="bogo-growth-grid-v line-v2" />
        </div>

        {/* Final Warm Off-White Transition Plane for Looking Ahead */}
        <div className="bogo-growth-light-plane" aria-hidden="true" />

        {/* Editorial Header */}
        <header className="bogo-growth-header">
          <div className="bogo-growth-brand-group">
            <span className="bogo-growth-brand-mark">BOGO</span>
            <span className="bogo-growth-brand-sep">/</span>
            <span className="bogo-growth-active-name">GROWTH ROADMAP</span>
          </div>
        </header>

        {/* ================================================================= */}
        {/* EDITORIAL STAGES CONTAINER                                        */}
        {/* ================================================================= */}
        <div className="bogo-growth-stage-container">
          {/* 1. SECTION INTRO & HEADLINE */}
          <div className="bogo-growth-chapter bogo-growth-intro-wrapper">
            <div className="bogo-growth-intro">
              <span className="bogo-growth-kicker">GROWTH ROADMAP</span>
            </div>
            <div className="bogo-growth-header-block">
              <h2 className="bogo-growth-headline">
                BUILDING THE FUTURE.
                <br />
                <span className="bogo-growth-sub-headline">ONE STEP AT A TIME.</span>
              </h2>
            </div>
          </div>

          {/* 2. FOUR PROGRESSIVE PHASES */}
          {ROADMAP_PHASES.map((phase) => (
            <div
              key={phase.id}
              className={`bogo-growth-chapter bogo-growth-phase-${phase.num.slice(1)} ${phase.id}`}
            >
              <div className="bogo-growth-phase-masthead">
                <span className="bogo-growth-phase-giant-num">{phase.num}</span>
                <div className="bogo-growth-phase-meta">
                  <span className="bogo-growth-phase-label">{phase.label}</span>
                  <h3 className="bogo-growth-phase-title">{phase.headline}</h3>
                </div>
              </div>

              {/* Progressively Revealed Statements */}
              <div className={`bogo-growth-statements phase-${phase.num.slice(1)}-statements`}>
                {phase.statements.map((stmt, idx) => (
                  <div key={idx} className="bogo-growth-statement">
                    <span className="bogo-growth-statement-tick" aria-hidden="true" />
                    <span className="bogo-growth-statement-text">{stmt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 3. THE CONVERGENCE — VERTICAL ASCENDING STELE */}
          <div className="bogo-growth-chapter bogo-growth-ascent-stele" aria-hidden="true">
            <h3 className="bogo-growth-stele-kicker">
              THE ASCENT OF <span className="bogo-orange-accent">BOGO</span>
            </h3>
            <div className="bogo-growth-stele-list">
              <div className="bogo-growth-stele-item item-4">
                <span className="stele-num">04</span>
                <span className="stele-divider">──</span>
                <span className="stele-concept">FUTURE</span>
                <span className="stele-sub">LEAD THE FUTURE OF RETAIL</span>
              </div>
              <div className="bogo-growth-stele-item item-3">
                <span className="stele-num">03</span>
                <span className="stele-divider">──</span>
                <span className="stele-concept">GROWTH</span>
                <span className="stele-sub">ENABLE SCALE &amp; PARTNERSHIPS</span>
              </div>
              <div className="bogo-growth-stele-item item-2">
                <span className="stele-num">02</span>
                <span className="stele-divider">──</span>
                <span className="stele-concept">NETWORK</span>
                <span className="stele-sub">EXPAND BAZAAR, MINI &amp; GO</span>
              </div>
              <div className="bogo-growth-stele-item item-1">
                <span className="stele-num">01</span>
                <span className="stele-divider">──</span>
                <span className="stele-concept">FOUNDATION</span>
                <span className="stele-sub">SQUARE &amp; FLAGSHIP ECOSYSTEM</span>
              </div>
            </div>
          </div>

          {/* 4. FINAL TRANSITION — LOOKING AHEAD & CLOSING STATEMENT */}
          <div className="bogo-growth-chapter bogo-growth-looking-ahead">
            <span className="bogo-closing-eyebrow">LOOKING AHEAD</span>
            <h2 className="bogo-closing-headline">
              <span className="bogo-closing-line bogo-closing-line-1">BUILDING INDIA'S</span>
              <span className="bogo-closing-line bogo-closing-line-2">NEXT RETAIL ECOSYSTEM.</span>
            </h2>
            <p className="bogo-closing-sub">
              11 in-house brands, multi-format retail stores, and a unified distribution network working as one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
