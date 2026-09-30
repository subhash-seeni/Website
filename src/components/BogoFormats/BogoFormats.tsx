import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { BAZAAR_ZONES } from './types';
import squareHeroImg from '../../assets/Square.png';
import bazaarHeroImg from '../../assets/Bazaar.png';
import miniHeroImg from '../../assets/Mini.png';
import './BogoFormats.css';

gsap.registerPlugin(ScrollTrigger);

export const BogoFormats: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Dynamic header format
  const [activeFormat, setActiveFormat] = useState<string>('RETAIL FORMATS');
  const [bazaarLoaded, setBazaarLoaded] = useState<boolean>(false);
  const [miniLoaded, setMiniLoaded] = useState<boolean>(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // Master Scroll scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;

            if (p < 0.20) {
              setActiveFormat('RETAIL FORMATS');
            } else if (p < 0.58) {
              setActiveFormat('BOGO BAZAAR');
            } else if (p < 0.85) {
              setActiveFormat('BOGO MINI');
            } else {
              setActiveFormat('ECOSYSTEM SCALES');
            }
          },
        },
      });

      // =========================================================================
      // [0.00 -> 0.18]: STAGE 1 — RETAIL EVOLUTION ("FROM DESTINATIONS...")
      // =========================================================================
      gsap.set('.bogo-fmt-destinations-text', { opacity: 0, y: 30 });

      // "FROM DESTINATIONS..." typography emerges proudly
      tl.to(
        '.bogo-fmt-destinations-text',
        {
          opacity: 1,
          y: 0,
          duration: 0.10,
          ease: 'power2.out',
        },
        0.04
      );

      tl.to(
        '.bogo-fmt-destinations-text',
        {
          opacity: 0,
          y: -25,
          duration: 0.06,
          ease: 'power2.in',
        },
        0.16
      );

      // =========================================================================
      // [0.18 -> 0.56]: STAGE 2 — BAZAAR HORIZONTAL REVEAL & ENVIRONMENT
      // =========================================================================
      gsap.set('.bogo-fmt-bazaar-slit', { clipPath: 'inset(50% 0% 50% 0%)', opacity: 0 });
      gsap.set('.bogo-fmt-bazaar-img', { scale: 1.15 });
      gsap.set('.bogo-fmt-bazaar-editorial', { opacity: 0, y: 25 });
      gsap.set('.bogo-fmt-bazaar-zone', { opacity: 0, y: 15 });
      gsap.set('.bogo-fmt-closer-text', { opacity: 0, y: 30 });

      // Thin orange slit appears and expands vertically
      tl.to(
        '.bogo-fmt-bazaar-slit',
        {
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.18,
          ease: 'power2.inOut',
        },
        0.18
      );

      // Camera slowly moves toward entrance
      tl.to(
        '.bogo-fmt-bazaar-img',
        {
          scale: 1.02,
          duration: 0.20,
          ease: 'power1.out',
        },
        0.20
      );

      // Editorial typography appears in twilight sky
      tl.to(
        '.bogo-fmt-bazaar-editorial',
        {
          opacity: 1,
          y: 0,
          duration: 0.12,
          ease: 'power2.out',
        },
        0.26
      );

      // Category zones subtly reveal along the storefront bays
      tl.to(
        '.bogo-fmt-bazaar-zone',
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.10,
          ease: 'power2.out',
        },
        0.34
      );

      // Fade zones and editorial
      tl.to(
        ['.bogo-fmt-bazaar-editorial', '.bogo-fmt-bazaar-zone'],
        {
          opacity: 0,
          y: -15,
          duration: 0.08,
          ease: 'power2.in',
        },
        0.48
      );

      // Pull back camera as Bazaar recedes into everyday residential life
      tl.to(
        '.bogo-fmt-bazaar-slit',
        {
          scale: 0.52,
          opacity: 0.2,
          filter: 'blur(3px)',
          duration: 0.12,
          ease: 'power2.inOut',
        },
        0.50
      );

      // "CLOSER TO HOME." text moment
      tl.to(
        '.bogo-fmt-closer-text',
        {
          opacity: 1,
          y: 0,
          duration: 0.08,
          ease: 'power2.out',
        },
        0.52
      );

      tl.to(
        ['.bogo-fmt-bazaar-slit', '.bogo-fmt-closer-text'],
        {
          opacity: 0,
          duration: 0.06,
          ease: 'power2.in',
        },
        0.60
      );

      // =========================================================================
      // [0.60 -> 0.86]: STAGE 3 — BOGO MINI CENTER DISCOVERY & ENVIRONMENT
      // =========================================================================
      gsap.set('.bogo-fmt-mini-reveal-wrap', { clipPath: 'circle(0% at 50% 50%)', opacity: 0 });
      gsap.set('.bogo-fmt-mini-img', { scale: 1.14 });
      gsap.set('.bogo-fmt-mini-editorial', { opacity: 0, y: 25 });

      // Mini expands outward from center point
      tl.to(
        '.bogo-fmt-mini-reveal-wrap',
        {
          opacity: 1,
          clipPath: 'circle(100% at 50% 50%)',
          duration: 0.16,
          ease: 'power2.inOut',
        },
        0.62
      );

      // Camera gently moves toward the storefront
      tl.to(
        '.bogo-fmt-mini-img',
        {
          scale: 1.03,
          duration: 0.18,
          ease: 'power1.out',
        },
        0.64
      );

      // Mini typography enters
      tl.to(
        '.bogo-fmt-mini-editorial',
        {
          opacity: 1,
          y: 0,
          duration: 0.12,
          ease: 'power2.out',
        },
        0.70
      );

      // Mini recedes toward the three-scale convergence
      tl.to(
        ['.bogo-fmt-mini-editorial'],
        {
          opacity: 0,
          y: -15,
          duration: 0.06,
          ease: 'power2.in',
        },
        0.82
      );

      tl.to(
        '.bogo-fmt-mini-reveal-wrap',
        {
          opacity: 0,
          scale: 0.85,
          duration: 0.06,
          ease: 'power2.in',
        },
        0.84
      );

      // =========================================================================
      // [0.85 -> 1.00]: STAGE 4 — SCALE CONVERGENCE ("ONE ECOSYSTEM. DIFFERENT SCALES.")
      // =========================================================================
      gsap.set('.bogo-fmt-convergence-stage', { opacity: 0, y: 35 });
      gsap.set('.bogo-fmt-infinity-line', { strokeDashoffset: 1000 });
      gsap.set('.bogo-fmt-conv-cue', { opacity: 0, y: 15 });

      tl.to(
        '.bogo-fmt-convergence-stage',
        {
          opacity: 1,
          y: 0,
          duration: 0.10,
          ease: 'power2.out',
        },
        0.85
      );

      // Draw the connecting infinity path linking the 3 formats
      tl.to(
        '.bogo-fmt-infinity-line',
        {
          strokeDashoffset: 0,
          duration: 0.10,
          ease: 'power1.inOut',
        },
        0.87
      );

      // Bottom cue pointing to Technology
      tl.to(
        '.bogo-fmt-conv-cue',
        {
          opacity: 1,
          y: 0,
          duration: 0.06,
          ease: 'power2.out',
        },
        0.92
      );
    }, trackRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="bogo-formats-track" ref={trackRef} id="bogo-formats-section">
      <div className="bogo-formats-viewport" ref={viewportRef}>
        {/* Film texture overlay */}
        <div className="bogo-formats-grain" aria-hidden="true" />

        {/* Minimal Format Header */}
        <header className="bogo-formats-header">
          <div className="bogo-formats-brand-group">
            <span className="bogo-formats-brand-mark">BOGO</span>
            <span className="bogo-formats-brand-sep">/</span>
            <span className="bogo-formats-active-name">{activeFormat}</span>
          </div>
        </header>

        {/* =================================================================== */}
        {/* STAGE 1: RETAIL EVOLUTION TYPOGRAPHIC MOMENT */}
        {/* =================================================================== */}

        {/* "FROM DESTINATIONS..." Typographic Moment */}
        <div className="bogo-fmt-destinations-text">
          <div className="bogo-fmt-meta-eyebrow">RETAIL FORMAT TIERS</div>
          <h2 className="bogo-fmt-giant-statement">FROM DESTINATIONS...</h2>
          <p className="bogo-fmt-giant-subline">30,000+ sq ft regional landmarks anchoring culture, dining, and brand discovery.</p>
        </div>

        {/* =================================================================== */}
        {/* STAGE 2: BOGO BAZAAR ARCHITECTURAL REVEAL */}
        {/* =================================================================== */}
        <div className="bogo-fmt-bazaar-slit">
          <div className="bogo-fmt-slit-border top" />
          <div className="bogo-fmt-bazaar-canvas">
            {!bazaarLoaded && <div className="bogo-fmt-img-skeleton" aria-hidden="true" />}
            <img
              src={bazaarHeroImg}
              alt="BOGO Bazaar — Everyday community retail architecture"
              className={`bogo-fmt-full-img bogo-fmt-bazaar-img ${bazaarLoaded ? 'is-loaded' : ''}`}
              loading="eager"
              decoding="async"
              onLoad={() => setBazaarLoaded(true)}
            />
            <div className="bogo-fmt-bazaar-scrim" />

            {/* Subtle Storefront Bay Callouts */}
            <div className="bogo-fmt-bazaar-zones-layer" aria-hidden="true">
              {BAZAAR_ZONES.map((zone) => (
                <div
                  key={zone.name}
                  className="bogo-fmt-bazaar-zone"
                  style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                >
                  <div className="bogo-fmt-zone-pin" />
                  <div className="bogo-fmt-zone-label">
                    <span className="bogo-fmt-zone-title">{zone.name}</span>
                    <span className="bogo-fmt-zone-desc">{zone.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bogo-fmt-slit-border bottom" />
        </div>

        {/* BOGO Bazaar Editorial Headline */}
        <div className="bogo-fmt-bazaar-editorial">
          <span className="bogo-fmt-eyebrow-pill">COMMUNITY SUPERMARKET</span>
          <h2 className="bogo-fmt-hero-title">BOGO BAZAAR</h2>
          <p className="bogo-fmt-hero-tagline">Weekly groceries, farm-fresh produce, and household pantries closer to home.</p>
        </div>

        {/* "CLOSER TO HOME." Typographic Moment */}
        <div className="bogo-fmt-closer-text">
          <div className="bogo-fmt-meta-eyebrow">NEIGHBORHOOD PROXIMITY</div>
          <h2 className="bogo-fmt-giant-statement">CLOSER TO HOME.</h2>
          <p className="bogo-fmt-giant-subline">Placing modern retail right where daily life happens.</p>
        </div>

        {/* =================================================================== */}
        {/* STAGE 3: BOGO MINI REVEAL & ENVIRONMENT */}
        {/* =================================================================== */}
        <div className="bogo-fmt-mini-reveal-wrap">
          {!miniLoaded && <div className="bogo-fmt-img-skeleton" aria-hidden="true" />}
          <img
            src={miniHeroImg}
            alt="BOGO Mini — Local neighborhood essentials storefront"
            className={`bogo-fmt-full-img bogo-fmt-mini-img ${miniLoaded ? 'is-loaded' : ''}`}
            loading="eager"
            decoding="async"
            onLoad={() => setMiniLoaded(true)}
          />
          <div className="bogo-fmt-mini-scrim" />
        </div>

        {/* BOGO Mini Editorial Headline */}
        <div className="bogo-fmt-mini-editorial">
          <span className="bogo-fmt-eyebrow-pill pill-blue">NEIGHBORHOOD EXPRESS</span>
          <h2 className="bogo-fmt-hero-title">BOGO MINI</h2>
          <p className="bogo-fmt-hero-tagline">Everyday essentials. Five minutes in and out, right on your block.</p>
        </div>

        {/* =================================================================== */}
        {/* STAGE 4: THREE SCALES CONVERGENCE */}
        {/* =================================================================== */}
        <div className="bogo-fmt-convergence-stage">
          <div className="bogo-fmt-conv-badge">PHYSICAL NETWORK</div>
          <h2 className="bogo-fmt-conv-headline">
            ONE ECOSYSTEM.
            <br />
            <span className="bogo-fmt-accent-text">THREE INTENTIONAL SCALES.</span>
          </h2>
          <p className="bogo-fmt-conv-subtext">
            A cohesive physical infrastructure scaling from destination flagships to neighborhood grocers and rapid doorstep outposts.
          </p>

          {/* Three Architectural Scaled Environments */}
          <div className="bogo-fmt-scales-triptych">
            {/* Scale 1: SQUARE (Large) */}
            <div className="bogo-fmt-scale-card card-square">
              <div className="bogo-fmt-scale-img-wrap">
                <img src={squareHeroImg} alt="BOGO Square" className="bogo-fmt-thumb-img" />
                <span className="bogo-fmt-scale-badge">30,000+ SQ FT // FLAGSHIP</span>
              </div>
              <div className="bogo-fmt-scale-info">
                <h3 className="bogo-fmt-scale-name">BOGO SQUARE</h3>
                <span className="bogo-fmt-scale-role">Flagship Experience &amp; Dining</span>
              </div>
            </div>

            {/* Scale 2: BAZAAR (Medium) */}
            <div className="bogo-fmt-scale-card card-bazaar">
              <div className="bogo-fmt-scale-img-wrap">
                <img src={bazaarHeroImg} alt="BOGO Bazaar" className="bogo-fmt-thumb-img" />
                <span className="bogo-fmt-scale-badge">12,000 SQ FT // SUPERMARKET</span>
              </div>
              <div className="bogo-fmt-scale-info">
                <h3 className="bogo-fmt-scale-name">BOGO BAZAAR</h3>
                <span className="bogo-fmt-scale-role">Weekly Family Groceries</span>
              </div>
            </div>

            {/* Scale 3: MINI (Small) */}
            <div className="bogo-fmt-scale-card card-mini">
              <div className="bogo-fmt-scale-img-wrap">
                <img src={miniHeroImg} alt="BOGO Mini" className="bogo-fmt-thumb-img" />
                <span className="bogo-fmt-scale-badge">2,500 SQ FT // EXPRESS</span>
              </div>
              <div className="bogo-fmt-scale-info">
                <h3 className="bogo-fmt-scale-name">BOGO MINI</h3>
                <span className="bogo-fmt-scale-role">5-Minute Daily Top-Ups</span>
              </div>
            </div>

            {/* Infinity Connector Ribbon SVG */}
            <svg className="bogo-fmt-scales-svg-line" viewBox="0 0 900 120" preserveAspectRatio="none" aria-hidden="true">
              <path
                className="bogo-fmt-infinity-line"
                d="M 120 60 C 260 20, 340 100, 450 60 C 560 20, 640 100, 780 60"
                fill="none"
                stroke="url(#infinityGrad)"
                strokeWidth="2.5"
                strokeDasharray="1000"
              />
              <defs>
                <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0e294e" />
                  <stop offset="50%" stopColor="#f78634" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </linearGradient>
              </defs>
            </svg>

            {/* Cue to Technology Section */}
            <div className="bogo-fmt-conv-cue">
              <div className="bogo-fmt-conv-cue-badge">
                <span className="bogo-fmt-conv-cue-dot" />
                <span className="bogo-fmt-conv-cue-text">NEXT &middot; TECHNOLOGY &mdash; THE INTELLIGENCE BEHIND BOGO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
