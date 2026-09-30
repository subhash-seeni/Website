import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BogoValue.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Subtle Corporate Premium Vector Backgrounds
 * Ultra-fine geometric hairlines and matrix elements reflecting ecosystem value
 */
const ValueVectorBg: React.FC<{ type: 'matrix' | 'customers' | 'businesses' | 'ecosystem' }> = ({ type }) => {
  if (type === 'matrix') {
    return (
      <svg className="bogo-val-vector-bg" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="valGridPat" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#0e294e" strokeWidth="0.5" strokeOpacity="0.04" />
            <circle cx="50" cy="50" r="1" fill="#0e294e" fillOpacity="0.06" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#valGridPat)" />
        <circle cx="500" cy="250" r="180" stroke="#f78634" strokeWidth="0.8" strokeDasharray="4 8" strokeOpacity="0.16" />
        <circle cx="500" cy="250" r="320" stroke="#0e294e" strokeWidth="0.6" strokeOpacity="0.05" />
        <line x1="100" y1="250" x2="900" y2="250" stroke="#0e294e" strokeWidth="0.5" strokeOpacity="0.06" />
        <line x1="500" y1="40" x2="500" y2="460" stroke="#0e294e" strokeWidth="0.5" strokeOpacity="0.06" />
      </svg>
    );
  }

  if (type === 'customers') {
    return (
      <svg className="bogo-val-vector-bg" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="500" cy="200" r="140" stroke="#0e294e" strokeWidth="0.75" strokeOpacity="0.04" />
        <circle cx="500" cy="200" r="240" stroke="#f78634" strokeWidth="0.75" strokeDasharray="6 8" strokeOpacity="0.12" />
        <circle cx="500" cy="200" r="360" stroke="#0e294e" strokeWidth="0.5" strokeOpacity="0.04" />
        <line x1="200" y1="100" x2="800" y2="300" stroke="#0e294e" strokeWidth="0.5" strokeOpacity="0.04" />
        <line x1="200" y1="300" x2="800" y2="100" stroke="#0e294e" strokeWidth="0.5" strokeOpacity="0.04" />
      </svg>
    );
  }

  if (type === 'businesses') {
    return (
      <svg className="bogo-val-vector-bg" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="valBizGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.03" />
            <circle cx="60" cy="60" r="1.5" fill="#f78634" fillOpacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#valBizGrid)" />
        <polygon points="500,80 600,140 500,200 400,140" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.08" fill="none" />
        <line x1="500" y1="200" x2="500" y2="320" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.08" />
        <polygon points="500,200 600,140 600,260 500,320" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.05" fill="none" />
        <polygon points="500,200 400,140 400,260 500,320" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.05" fill="none" />
        <circle cx="500" cy="200" r="280" stroke="#f78634" strokeWidth="0.8" strokeDasharray="8 8" strokeOpacity="0.14" />
      </svg>
    );
  }

  if (type === 'ecosystem') {
    return (
      <svg className="bogo-val-vector-bg" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M 320 250 C 320 160, 400 120, 500 250 C 600 380, 680 340, 680 250 C 680 160, 600 120, 500 250 C 400 380, 320 340, 320 250 Z"
          stroke="#0e294e"
          strokeWidth="1.2"
          strokeOpacity="0.1"
          fill="none"
        />
        <circle cx="400" cy="250" r="130" stroke="#0e294e" strokeWidth="0.75" strokeDasharray="4 6" strokeOpacity="0.08" />
        <circle cx="600" cy="250" r="130" stroke="#0e294e" strokeWidth="0.75" strokeDasharray="4 6" strokeOpacity="0.08" />
      </svg>
    );
  }

  return null;
};

export const BogoValue: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // -----------------------------------------------------------------------
      // INITIAL ELEMENT STATES
      // -----------------------------------------------------------------------
      gsap.set('.bogo-val-opening', { opacity: 0, y: 24, pointerEvents: 'none' });
      gsap.set('.bogo-val-world-customers', { opacity: 0, y: 24, pointerEvents: 'none' });
      gsap.set('.bogo-val-world-customers .bogo-val-point-card', { opacity: 0, y: 14 });

      // Navy Plane
      gsap.set('.bogo-val-navy-plane', { xPercent: 100 });
      gsap.set('.bogo-val-world-businesses', { opacity: 0, y: 24, pointerEvents: 'none' });
      gsap.set('.bogo-val-world-businesses .bogo-val-point-card', { opacity: 0, y: 14 });

      // Orange Plane
      gsap.set('.bogo-val-orange-plane', { yPercent: 100 });
      gsap.set('.bogo-val-world-ecosystem', { opacity: 0, y: 24, pointerEvents: 'none' });
      gsap.set('.bogo-val-world-ecosystem .bogo-val-point-card', { opacity: 0, y: 14 });

      // Convergence Compressing Panels
      gsap.set('.bogo-val-convergence-overlay', { opacity: 0 });
      gsap.set('.bogo-val-panel-left', { xPercent: -100 });
      gsap.set('.bogo-val-panel-center', { scaleY: 0 });
      gsap.set('.bogo-val-panel-right', { xPercent: 100 });

      // Final Statement & Transition to Growth
      gsap.set('.bogo-val-final-statement', { opacity: 0, y: 24, pointerEvents: 'none' });
      gsap.set('.bogo-val-transition-growth', { opacity: 0, y: 16, pointerEvents: 'none' });

      // -----------------------------------------------------------------------
      // MASTER SCROLL TIMELINE (Pinned sequence over 560vh)
      // -----------------------------------------------------------------------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      });

      // [0.00 -> 0.26]: SECTION OPENING ("MORE VALUE. FOR EVERYONE.")
      tl.to(
        '.bogo-val-opening',
        {
          opacity: 1,
          y: 0,
          pointerEvents: 'auto',
          duration: 0.12,
          ease: 'power2.out',
        },
        0.02
      );

      tl.to(
        '.bogo-val-opening',
        {
          opacity: 0,
          y: -20,
          pointerEvents: 'none',
          duration: 0.04,
          ease: 'power2.in',
        },
        0.26
      );

      // [0.28 -> 0.48]: WORLD 01 — CUSTOMERS ("SHOP MORE EASILY.")
      tl.to(
        '.bogo-val-world-customers',
        {
          opacity: 1,
          y: 0,
          pointerEvents: 'auto',
          duration: 0.07,
          ease: 'power2.out',
        },
        0.29
      );

      tl.to(
        '.bogo-val-world-customers .bogo-val-point-card',
        {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.02,
          ease: 'power2.out',
        },
        0.31
      );

      tl.to(
        '.bogo-val-world-customers',
        {
          opacity: 0,
          y: -20,
          pointerEvents: 'none',
          duration: 0.04,
          ease: 'power2.in',
        },
        0.46
      );

      // [0.46 -> 0.52]: NAVY FIELD SLIDE
      tl.to(
        '.bogo-val-navy-plane',
        {
          xPercent: 0,
          duration: 0.08,
          ease: 'power2.inOut',
        },
        0.46
      );

      // Header text turns white on navy background
      tl.to(
        ['.bogo-val-brand-mark', '.bogo-val-brand-sep'],
        {
          color: '#ffffff',
          duration: 0.04,
          ease: 'power1.out',
        },
        0.48
      );

      // [0.52 -> 0.70]: WORLD 02 — BUSINESSES ("GROW WITH BOGO.")
      tl.to(
        '.bogo-val-world-businesses',
        {
          opacity: 1,
          y: 0,
          pointerEvents: 'auto',
          duration: 0.07,
          ease: 'power2.out',
        },
        0.53
      );

      tl.to(
        '.bogo-val-world-businesses .bogo-val-point-card',
        {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.02,
          ease: 'power2.out',
        },
        0.55
      );

      tl.to(
        '.bogo-val-world-businesses',
        {
          opacity: 0,
          y: -20,
          pointerEvents: 'none',
          duration: 0.04,
          ease: 'power2.in',
        },
        0.68
      );

      // [0.68 -> 0.74]: ORANGE PLANE SWEEP
      tl.to(
        '.bogo-val-orange-plane',
        {
          yPercent: 0,
          duration: 0.08,
          ease: 'power2.inOut',
        },
        0.68
      );

      // Header text restores contrast on orange background
      tl.to(
        '.bogo-val-brand-mark',
        {
          color: '#0e294e',
          duration: 0.04,
          ease: 'power1.out',
        },
        0.70
      );
      tl.to(
        '.bogo-val-brand-sep',
        {
          color: 'rgba(14, 41, 78, 0.35)',
          duration: 0.04,
          ease: 'power1.out',
        },
        0.70
      );
      tl.to(
        '.bogo-val-active-name',
        {
          color: '#0e294e',
          duration: 0.04,
          ease: 'power1.out',
        },
        0.70
      );

      // [0.74 -> 0.88]: WORLD 03 — THE ECOSYSTEM ("STRONGER TOGETHER.")
      tl.to(
        '.bogo-val-world-ecosystem',
        {
          opacity: 1,
          y: 0,
          pointerEvents: 'auto',
          duration: 0.07,
          ease: 'power2.out',
        },
        0.74
      );

      tl.to(
        '.bogo-val-world-ecosystem .bogo-val-point-card',
        {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.02,
          ease: 'power2.out',
        },
        0.76
      );

      tl.to(
        '.bogo-val-world-ecosystem',
        {
          opacity: 0,
          y: -20,
          pointerEvents: 'none',
          duration: 0.04,
          ease: 'power2.in',
        },
        0.87
      );

      // [0.88 -> 0.94]: THREE WORLDS CONVERGE
      tl.to(
        '.bogo-val-convergence-overlay',
        {
          opacity: 1,
          duration: 0.01,
        },
        0.88
      );

      tl.to(
        '.bogo-val-panel-left',
        {
          xPercent: 0,
          duration: 0.05,
          ease: 'power2.inOut',
        },
        0.89
      );

      tl.to(
        '.bogo-val-panel-right',
        {
          xPercent: 0,
          duration: 0.05,
          ease: 'power2.inOut',
        },
        0.89
      );

      tl.to(
        '.bogo-val-panel-center',
        {
          scaleY: 1,
          duration: 0.05,
          ease: 'power2.inOut',
        },
        0.89
      );

      // Panels flash and clear
      tl.to(
        '.bogo-val-convergence-overlay',
        {
          opacity: 0,
          duration: 0.03,
          ease: 'power1.out',
        },
        0.94
      );

      // [0.94 -> 0.98]: FINAL VALUE STATEMENT ("GREATER VALUE.")
      tl.to(
        '.bogo-val-final-statement',
        {
          opacity: 1,
          y: 0,
          pointerEvents: 'auto',
          duration: 0.035,
          ease: 'power2.out',
        },
        0.945
      );

      tl.to(
        '.bogo-val-final-statement',
        {
          opacity: 0,
          y: -20,
          pointerEvents: 'none',
          duration: 0.02,
          ease: 'power2.in',
        },
        0.975
      );

      // [0.98 -> 1.00]: FINAL TRANSITION TO GROWTH ("AND THIS IS JUST THE BEGINNING.")
      tl.to(
        '.bogo-val-transition-growth',
        {
          opacity: 1,
          y: 0,
          pointerEvents: 'auto',
          duration: 0.02,
          ease: 'power2.out',
        },
        0.98
      );
    }, trackRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="bogo-val-track" ref={trackRef} id="bogo-value-section">
      <div className="bogo-val-viewport">
        {/* Subtle organic paper texture overlay */}
        <div className="bogo-val-grain" aria-hidden="true" />

        {/* LARGE-SCALE COLOR PLANES (Off-White -> Navy -> Orange) */}
        <div className="bogo-val-navy-plane" aria-hidden="true" />
        <div className="bogo-val-orange-plane" aria-hidden="true" />

        {/* Convergence Compression Overlay */}
        <div className="bogo-val-convergence-overlay" aria-hidden="true">
          <div className="bogo-val-panel bogo-val-panel-left" />
          <div className="bogo-val-panel bogo-val-panel-center" />
          <div className="bogo-val-panel bogo-val-panel-right" />
        </div>

        {/* Editorial Header */}
        <header className="bogo-val-header">
          <div className="bogo-val-brand-group">
            <span className="bogo-val-brand-mark">BOGO</span>
            <span className="bogo-val-brand-sep">/</span>
            <span className="bogo-val-active-name">THE BOGO DIFFERENCE</span>
          </div>
        </header>

        {/* EDITORIAL CHAPTERS CONTAINER */}
        <div className="bogo-val-stage-container">
          {/* 1. SECTION OPENING */}
          <div className="bogo-val-chapter bogo-val-opening">
            <ValueVectorBg type="matrix" />
            <div className="bogo-val-kicker-badge">
              <span className="bogo-val-kicker-dot" />
              <span>THE BOGO DIFFERENCE</span>
            </div>
            <h2 className="bogo-val-giant-headline">
              <span className="bogo-val-line-block bogo-val-hl-primary">MORE VALUE.</span>
              <span className="bogo-val-line-block bogo-val-hl-secondary">FOR EVERYONE.</span>
            </h2>
            <p className="bogo-val-subline">
              By producing our own trusted brands and cutting middle distributors, we pass direct savings to families, pay higher margins to farmers, and build sustainable scale.
            </p>
          </div>

          {/* 2. WORLD 01 — CUSTOMERS */}
          <div className="bogo-val-chapter bogo-val-world-customers">
            <ValueVectorBg type="customers" />
            <div className="bogo-val-kicker-badge">
              <span className="bogo-val-kicker-dot" />
              <span>FOR CUSTOMERS</span>
            </div>
            <h2 className="bogo-val-world-headline">
              SHOP SMARTER &amp; SAVE.
            </h2>
            
            {/* Points Grid with Bespoke Icons */}
            <div className="bogo-val-points-grid">
              <div className="bogo-val-point-card">
                <div className="bogo-val-point-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div className="bogo-val-point-content">
                  <h3 className="bogo-val-point-title">11 IN-HOUSE BRANDS</h3>
                  <p className="bogo-val-point-desc">Clean, certified staples across pantry, personal care &amp; home</p>
                </div>
              </div>

              <div className="bogo-val-point-card">
                <div className="bogo-val-point-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div className="bogo-val-point-content">
                  <h3 className="bogo-val-point-title">HONEST PRICING</h3>
                  <p className="bogo-val-point-desc">Direct-from-producer prices with zero middleman markups</p>
                </div>
              </div>

              <div className="bogo-val-point-card">
                <div className="bogo-val-point-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                </div>
                <div className="bogo-val-point-content">
                  <h3 className="bogo-val-point-title">SEAMLESS ACCESS</h3>
                  <p className="bogo-val-point-desc">Shop across regional flagships, community supermarkets, and local outposts</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. WORLD 02 — BUSINESSES & PRODUCERS (Deep Navy World) */}
          <div className="bogo-val-chapter bogo-val-world-businesses">
            <ValueVectorBg type="businesses" />
            <div className="bogo-val-kicker-badge is-light">
              <span className="bogo-val-kicker-dot is-light" />
              <span>FOR PRODUCERS &amp; PARTNERS</span>
            </div>
            <h2 className="bogo-val-world-headline is-light">
              GROW SUSTAINABLY.
            </h2>
            
            {/* Points Grid with Bespoke Icons */}
            <div className="bogo-val-points-grid">
              <div className="bogo-val-point-card is-light">
                <div className="bogo-val-point-icon-box is-light">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div className="bogo-val-point-content">
                  <h3 className="bogo-val-point-title is-light">FAIR PROCUREMENT</h3>
                  <p className="bogo-val-point-desc is-light">Direct farmgate purchase with guaranteed 24-hour settlements</p>
                </div>
              </div>

              <div className="bogo-val-point-card is-light">
                <div className="bogo-val-point-icon-box is-light">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="bogo-val-point-content">
                  <h3 className="bogo-val-point-title is-light">SHARED FOOTFALL</h3>
                  <p className="bogo-val-point-desc is-light">Access to 30,000+ sq ft physical hubs and shared digital traffic</p>
                </div>
              </div>

              <div className="bogo-val-point-card is-light">
                <div className="bogo-val-point-icon-box is-light">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </div>
                <div className="bogo-val-point-content">
                  <h3 className="bogo-val-point-title is-light">ZERO LISTING BARRIERS</h3>
                  <p className="bogo-val-point-desc is-light">Transparent margins without hidden slotting or shelf fees</p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. WORLD 03 — THE ECOSYSTEM (BOGO Orange World) */}
          <div className="bogo-val-chapter bogo-val-world-ecosystem">
            <ValueVectorBg type="ecosystem" />
            <div className="bogo-val-kicker-badge is-dark">
              <span className="bogo-val-kicker-dot is-dark" />
              <span>THE ECOSYSTEM</span>
            </div>
            <h2 className="bogo-val-world-headline is-dark">
              A SELF-SUSTAINING LOOP.
            </h2>
            
            {/* Points Grid with Bespoke Icons */}
            <div className="bogo-val-points-grid">
              <div className="bogo-val-point-card is-dark">
                <div className="bogo-val-point-icon-box is-dark">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div className="bogo-val-point-content">
                  <h3 className="bogo-val-point-title is-dark">BRANDS &amp; RETAIL</h3>
                  <p className="bogo-val-point-desc is-dark">Square, Bazaar and Mini formats synchronized with in-house brands</p>
                </div>
              </div>

              <div className="bogo-val-point-card is-dark">
                <div className="bogo-val-point-icon-box is-dark">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                </div>
                <div className="bogo-val-point-content">
                  <h3 className="bogo-val-point-title is-dark">PREDICTIVE LOGISTICS</h3>
                  <p className="bogo-val-point-desc is-dark">Live demand matching to eliminate food waste and stockouts</p>
                </div>
              </div>

              <div className="bogo-val-point-card is-dark">
                <div className="bogo-val-point-icon-box is-dark">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </div>
                <div className="bogo-val-point-content">
                  <h3 className="bogo-val-point-title is-dark">SHARED SCALE</h3>
                  <p className="bogo-val-point-desc is-dark">Every efficiency gain is returned as lower prices and higher quality</p>
                </div>
              </div>
            </div>
          </div>

          {/* 5. FINAL VALUE STATEMENT */}
          <div className="bogo-val-chapter bogo-val-final-statement">
            <div className="bogo-val-kicker-badge is-dark">
              <span className="bogo-val-kicker-dot is-dark" />
              <span>ONE CONNECTED</span>
            </div>
            <h2 className="bogo-val-payoff-headline">
              ECOSYSTEM.
            </h2>
            <div className="bogo-val-pillars-summary">
              <span className="bogo-val-pill-tag">GREATER VALUE</span>
              <span className="bogo-val-pill-sep">·</span>
              <span className="bogo-val-pill-tag">STRONGER CONNECTIONS</span>
              <span className="bogo-val-pill-sep">·</span>
              <span className="bogo-val-pill-tag">LONG-TERM GROWTH</span>
            </div>
          </div>

          {/* 6. FINAL TRANSITION TO GROWTH */}
          <div className="bogo-val-chapter bogo-val-transition-growth">
            <span className="bogo-val-growth-cue">
              AND THIS IS
              <br />
              JUST THE BEGINNING.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
