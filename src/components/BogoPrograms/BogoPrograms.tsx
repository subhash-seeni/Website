import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import lifeLogoImg from '../../assets/Life.png';
import partnerLogoImg from '../../assets/Partner.png';
import companionLogoImg from '../../assets/Companion.png';
import affairsLogoImg from '../../assets/Affairs.png';
import './BogoPrograms.css';

gsap.registerPlugin(ScrollTrigger);

export const BogoPrograms: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.bogo-prog-intro', { opacity: 0, y: 16 });
      gsap.set('.bogo-prog-item-partner', { opacity: 0, y: 14, scale: 0.97 });
      gsap.set('.bogo-prog-item-life', { opacity: 0, y: 14, scale: 0.97 });
      gsap.set('.bogo-prog-item-companion', { opacity: 0, y: 14, scale: 0.97 });
      gsap.set('.bogo-prog-item-affairs', { opacity: 0, y: 14, scale: 0.97 });
      gsap.set('.bogo-prog-connector-path', { strokeDashoffset: 1000 });
      gsap.set('.bogo-prog-center-convergence', { opacity: 0, scale: 0.88 });
      gsap.set('.bogo-prog-bridge', { opacity: 0, y: 12 });

      // Master scrub timeline across ~2.2 viewport heights
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.35,
        },
      });

      // 1. Headline appears first with generous breathing room
      tl.to(
        '.bogo-prog-intro',
        {
          opacity: 1,
          y: 0,
          duration: 0.12,
          ease: 'power2.out',
        },
        0.04
      );

      // 2. Logos appear with subtle stagger into view
      tl.to(
        '.bogo-prog-item-partner',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.12,
          ease: 'power1.out',
        },
        0.14
      );

      tl.to(
        '.bogo-prog-item-life',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.12,
          ease: 'power1.out',
        },
        0.20
      );

      tl.to(
        '.bogo-prog-item-companion',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.12,
          ease: 'power1.out',
        },
        0.26
      );

      tl.to(
        '.bogo-prog-item-affairs',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.12,
          ease: 'power1.out',
        },
        0.32
      );

      // 3. Subtle connecting path line travels between logo positions
      tl.to(
        '.bogo-prog-connector-path',
        {
          strokeDashoffset: 0,
          duration: 0.20,
          ease: 'power1.inOut',
        },
        0.36
      );

      // 4. Subtle spatial elevation as spline energizes (No opacity flickering):
      tl.to(
        ['.bogo-prog-item-partner', '.bogo-prog-item-life'],
        {
          y: -4,
          duration: 0.16,
          ease: 'power1.out',
        },
        0.50
      );

      tl.to(
        ['.bogo-prog-item-companion', '.bogo-prog-item-affairs'],
        {
          y: 4,
          duration: 0.16,
          ease: 'power1.out',
        },
        0.60
      );

      // Settle all 4 programme anchors into balanced alignment as connection completes
      tl.to(
        ['.bogo-prog-item-partner', '.bogo-prog-item-life', '.bogo-prog-item-companion', '.bogo-prog-item-affairs'],
        {
          y: 0,
          scale: 1,
          duration: 0.12,
          ease: 'power2.out',
        },
        0.75
      );

      // 6. Central convergence BOGO infinity symbol reveals
      tl.to(
        '.bogo-prog-center-convergence',
        {
          opacity: 1,
          scale: 1,
          duration: 0.12,
          ease: 'power2.out',
        },
        0.80
      );

      // 7. Final message: "CONNECTED BY TECHNOLOGY." emerges as bridge
      tl.to(
        '.bogo-prog-bridge',
        {
          opacity: 1,
          y: 0,
          duration: 0.12,
          ease: 'power2.out',
        },
        0.86
      );
    }, trackRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="bogo-programs-track" ref={trackRef} id="bogo-programs-section">
      <div className="bogo-programs-viewport" ref={viewportRef}>
        {/* Organic paper texture overlay */}
        <div className="bogo-programs-grain" aria-hidden="true" />

        {/* Quiet transition inlet from dark navy BOGO GO */}
        <div className="bogo-programs-inlet" aria-hidden="true">
          <svg className="bogo-programs-taper-line" viewBox="0 0 800 60" preserveAspectRatio="none">
            <path d="M 0 0 C 220 25, 450 35, 750 55" fill="none" stroke="url(#inletTaperGrad)" strokeWidth="1.5" />
            <defs>
              <linearGradient id="inletTaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f78634" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#f78634" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#f78634" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Minimalist Editorial Header */}
        <header className="bogo-programs-header">
          <div className="bogo-programs-brand-group">
            <span className="bogo-programs-brand-mark">BOGO</span>
            <span className="bogo-programs-brand-sep">/</span>
            <span className="bogo-programs-active-name">PROGRAMS</span>
          </div>
        </header>

        {/* Main Editorial Content Container */}
        <div className="bogo-programs-stage">
          {/* Opening Typography: Eyebrow + Headline */}
          <div className="bogo-prog-intro">
            <div className="bogo-prog-eyebrow">INTEGRATED ECOSYSTEM INITIATIVES</div>
            <h2 className="bogo-prog-headline">
              BEYOND
              <br />
              THE TRANSACTION.
            </h2>
          </div>

          {/* Asymmetric Art-Directed Logo Canvas */}
          <div className="bogo-prog-canvas">
            {/* Even geometric oval stroke traveling behind the four logo positions */}
            <svg className="bogo-prog-spline-svg" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="progSplineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f78634" stopOpacity="0.38" />
                  <stop offset="35%" stopColor="#0e294e" stopOpacity="0.22" />
                  <stop offset="70%" stopColor="#f78634" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#0e294e" stopOpacity="0.36" />
                </linearGradient>
              </defs>
              <ellipse
                className="bogo-prog-connector-path"
                cx="500"
                cy="250"
                rx="420"
                ry="175"
                fill="none"
                stroke="url(#progSplineGrad)"
                strokeWidth="1.2"
                pathLength="1000"
                strokeDasharray="1000"
              />
            </svg>

            {/* 1. BOGO PARTNER (upper left) */}
            <div className="bogo-prog-logo-item bogo-prog-item-partner">
              <div className="bogo-prog-artwork-wrap">
                <img
                  src={partnerLogoImg}
                  alt="BOGO Partner"
                  className="bogo-prog-logo-img img-partner"
                  loading="eager"
                />
              </div>
              <p className="bogo-prog-desc desc-partner">
                Helping emerging regional brands scale through direct store shelf access and shared logistics.
              </p>
            </div>

            {/* 2. BOGO LIFE (upper right) */}
            <div className="bogo-prog-logo-item bogo-prog-item-life">
              <div className="bogo-prog-artwork-wrap">
                <img
                  src={lifeLogoImg}
                  alt="BOGO Life"
                  className="bogo-prog-logo-img img-life"
                  loading="eager"
                />
              </div>
              <p className="bogo-prog-desc desc-life">
                Exclusive wellness benefits and corporate pantry solutions tailored for forward-thinking workplaces.
              </p>
            </div>

            {/* 3. BOGO COMPANION (lower left) */}
            <div className="bogo-prog-logo-item bogo-prog-item-companion">
              <div className="bogo-prog-artwork-wrap">
                <img
                  src={companionLogoImg}
                  alt="BOGO Companion"
                  className="bogo-prog-logo-img img-companion"
                  loading="eager"
                />
              </div>
              <p className="bogo-prog-desc desc-companion">
                One unified membership unlocking member pricing, priority events, and free deliveries across all brands.
              </p>
            </div>

            {/* 4. BOGO AFFAIRS (lower right) */}
            <div className="bogo-prog-logo-item bogo-prog-item-affairs">
              <div className="bogo-prog-artwork-wrap">
                <img
                  src={affairsLogoImg}
                  alt="BOGO Affairs"
                  className="bogo-prog-logo-img img-affairs"
                  loading="eager"
                />
              </div>
              <p className="bogo-prog-desc desc-affairs">
                Community dialogues, cultural forums, and transparent consumer insights keeping the ecosystem connected.
              </p>
            </div>

            {/* Central Convergence: Subtle BOGO Infinity Motif */}
            <div className="bogo-prog-center-convergence" aria-hidden="true">
              <svg className="bogo-prog-infinity-symbol" viewBox="0 0 100 40" fill="none">
                <defs>
                  <linearGradient id="infinityProgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f78634" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#0e294e" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#f78634" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d="M 50 20 C 35 2, 10 2, 10 20 C 10 38, 35 38, 50 20 C 65 2, 90 2, 90 20 C 90 38, 65 38, 50 20 Z"
                  stroke="url(#infinityProgGrad)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Final Message & Bridge to Value Section */}
          <div className="bogo-prog-bridge">
            <span className="bogo-prog-bridge-text">CREATING LASTING VALUE.</span>
            <div className="bogo-prog-bridge-indicator" />
          </div>
        </div>
      </div>
    </section>
  );
};
