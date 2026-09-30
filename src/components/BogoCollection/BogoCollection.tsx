import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { BRAND_SCREENS } from './types';
import { BrandTile } from './BrandTile';
import './BogoCollection.css';

gsap.registerPlugin(ScrollTrigger);

export const BogoCollection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const screensRef = useRef<(HTMLDivElement | null)[]>([]);
  const outroRef = useRef<HTMLDivElement>(null);

  const [activeSetIndex, setActiveSetIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const screens = screensRef.current;
    const outro = outroRef.current;

    if (!track || !stage || screens.length < 3 || !outro) return;

    // Set initial state for screens
    // Screen 0 visible at start, Screen 1 & 2 & Outro hidden below
    gsap.set(screens[0], { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', pointerEvents: 'auto' });
    gsap.set(screens[1], { opacity: 0, y: 40, scale: 0.97, filter: 'blur(6px)', pointerEvents: 'none' });
    gsap.set(screens[2], { opacity: 0, y: 40, scale: 0.97, filter: 'blur(6px)', pointerEvents: 'none' });
    gsap.set(outro, { opacity: 0, y: 40, scale: 0.97, filter: 'blur(6px)', pointerEvents: 'none' });

    const ctx = gsap.context(() => {
      // Pinned scrub timeline across 3 screens + outro
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;

            // Active category telemetry
            if (p < 0.33) {
              setActiveSetIndex(0);
            } else if (p < 0.67) {
              setActiveSetIndex(1);
            } else if (p < 0.92) {
              setActiveSetIndex(2);
            } else {
              setActiveSetIndex(3); // Outro
            }
          },
        },
      });

      // Total timeline duration: 3.0 units
      // [0.00 - 0.70]: Screen 0 stays static, fully readable
      // [0.70 - 1.00]: Screen 0 transitions to Screen 1
      tl.to(
        screens[0],
        {
          opacity: 0,
          y: -35,
          scale: 0.97,
          filter: 'blur(6px)',
          pointerEvents: 'none',
          duration: 0.3,
          ease: 'power2.inOut',
        },
        0.7
      );

      tl.to(
        screens[1],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          pointerEvents: 'auto',
          duration: 0.3,
          ease: 'power2.inOut',
        },
        0.7
      );

      // Stagger tiles in Screen 1 slightly
      const screen1Tiles = screens[1]?.querySelectorAll('.bogo-brand-tile');
      if (screen1Tiles && screen1Tiles.length > 0) {
        tl.fromTo(
          screen1Tiles,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.04, duration: 0.25, ease: 'power2.out' },
          0.74
        );
      }

      // [1.00 - 1.70]: Screen 1 stays static, fully readable
      // [1.70 - 2.00]: Screen 1 transitions to Screen 2
      tl.to(
        screens[1],
        {
          opacity: 0,
          y: -35,
          scale: 0.97,
          filter: 'blur(6px)',
          pointerEvents: 'none',
          duration: 0.3,
          ease: 'power2.inOut',
        },
        1.7
      );

      tl.to(
        screens[2],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          pointerEvents: 'auto',
          duration: 0.3,
          ease: 'power2.inOut',
        },
        1.7
      );

      // Stagger tiles in Screen 2 slightly
      const screen2Tiles = screens[2]?.querySelectorAll('.bogo-brand-tile');
      if (screen2Tiles && screen2Tiles.length > 0) {
        tl.fromTo(
          screen2Tiles,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.25, ease: 'power2.out' },
          1.74
        );
      }

      // [2.00 - 2.65]: Screen 2 stays static, fully readable
      // [2.65 - 2.95]: Screen 2 transitions to Outro
      tl.to(
        screens[2],
        {
          opacity: 0,
          y: -35,
          scale: 0.97,
          filter: 'blur(6px)',
          pointerEvents: 'none',
          duration: 0.3,
          ease: 'power2.inOut',
        },
        2.65
      );

      tl.to(
        outro,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          pointerEvents: 'auto',
          duration: 0.3,
          ease: 'power2.out',
        },
        2.65
      );
    }, trackRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Jump to specific screen smoothly when clicking category tabs
  const handleJumpToScreen = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const trackTop = track.offsetTop;
    const trackHeight = track.offsetHeight - window.innerHeight;

    let targetRatio = 0.08;
    if (index === 1) targetRatio = 0.48;
    if (index === 2) targetRatio = 0.80;

    const targetY = trackTop + trackHeight * targetRatio;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  const activeCategoryName =
    activeSetIndex < 3
      ? BRAND_SCREENS[activeSetIndex]?.category
      : 'PORTFOLIO ARCHITECTURE';

  return (
    <section className="bogo-collection-track" ref={trackRef} id="bogo-collection-section">
      <div className="bogo-collection-viewport">
        {/* Subtle organic paper texture */}
        <div className="bogo-collection-grain" />

        {/* Minimal Collection Top Navigation & Telemetry */}
        <header className="bogo-collection-header">
          <div className="bogo-collection-brand-title">
            <span className="bogo-collection-brand-mark">BOGO</span>
            <span className="bogo-collection-brand-sub">COLLECTION &middot; {activeCategoryName}</span>
          </div>

          {/* Interactive Set Indicator Navigation Tabs */}
          <nav className="bogo-collection-nav-tabs" aria-label="Brand Sets">
            {BRAND_SCREENS.map((screen, idx) => (
              <button
                key={screen.id}
                type="button"
                className={`bogo-nav-tab ${activeSetIndex === idx ? 'is-active' : ''}`}
                onClick={() => handleJumpToScreen(idx)}
              >
                <span className="bogo-tab-num">{screen.number}</span>
                <span className="bogo-tab-label">{screen.id.toUpperCase()}</span>
                {activeSetIndex === idx && <span className="bogo-tab-active-indicator" />}
              </button>
            ))}
          </nav>
        </header>

        {/* Stage Container with Centered Fullscreen Screens */}
        <div className="bogo-screens-stage-container" ref={stageRef}>
          {/* The 3 Curated Set Screens */}
          {BRAND_SCREENS.map((screen, screenIdx) => (
            <div
              key={screen.id}
              className={`bogo-screen-set set-${screen.id}`}
              ref={(el) => {
                screensRef.current[screenIdx] = el;
              }}
            >
              {/* Category Screen Header */}
              <div className="bogo-screen-header">
                <div className="bogo-screen-category-badge">
                  <span className="bogo-screen-num">{screen.number}</span>
                  <span className="bogo-screen-sep">/</span>
                  <span>{screen.category}</span>
                </div>
                <h2 className="bogo-screen-headline">{screen.headline}</h2>
                <p className="bogo-screen-subline">{screen.subline}</p>
              </div>

              {/* Set Brands Grid with Light Architectural Connector Rail */}
              <div className="bogo-brands-stage-wrapper">
                {/* 1px Fine Hairline Connector Rail linking the cards in this set */}
                <div className="bogo-connector-rail" aria-hidden="true">
                  <div
                    className="bogo-connector-line"
                    style={{
                      background:
                        screenIdx === 0
                          ? 'linear-gradient(90deg, transparent 0%, rgba(0, 131, 143, 0.35) 15%, rgba(230, 81, 0, 0.35) 40%, rgba(46, 125, 50, 0.35) 65%, rgba(21, 101, 192, 0.35) 85%, transparent 100%)'
                          : screenIdx === 1
                          ? 'linear-gradient(90deg, transparent 0%, rgba(0, 151, 167, 0.35) 15%, rgba(194, 24, 91, 0.35) 40%, rgba(106, 27, 154, 0.35) 65%, rgba(183, 129, 3, 0.35) 85%, transparent 100%)'
                          : 'linear-gradient(90deg, transparent 0%, rgba(239, 108, 0, 0.35) 25%, rgba(216, 67, 21, 0.35) 55%, rgba(30, 58, 138, 0.35) 85%, transparent 100%)',
                    }}
                  />
                  <div
                    className="bogo-connector-line-glow"
                    style={{
                      background:
                        screenIdx === 0
                          ? 'linear-gradient(90deg, transparent 0%, rgba(0, 131, 143, 0.25) 15%, rgba(230, 81, 0, 0.25) 40%, rgba(46, 125, 50, 0.25) 65%, rgba(21, 101, 192, 0.25) 85%, transparent 100%)'
                          : screenIdx === 1
                          ? 'linear-gradient(90deg, transparent 0%, rgba(0, 151, 167, 0.25) 15%, rgba(194, 24, 91, 0.25) 40%, rgba(106, 27, 154, 0.25) 65%, rgba(183, 129, 3, 0.25) 85%, transparent 100%)'
                          : 'linear-gradient(90deg, transparent 0%, rgba(239, 108, 0, 0.25) 25%, rgba(216, 67, 21, 0.25) 55%, rgba(30, 58, 138, 0.25) 85%, transparent 100%)',
                    }}
                  />

                  {/* Delicate glowing beacon nodes over card positions */}
                  {screen.brands.map((b, bIdx) => (
                    <div
                      key={b.id}
                      className="bogo-connector-node"
                      style={{
                        left: `${((bIdx + 0.5) / screen.brands.length) * 100}%`,
                      }}
                    >
                      <span className="bogo-connector-pulse" style={{ backgroundColor: b.color }} />
                      <span className="bogo-connector-dot" style={{ backgroundColor: b.color }} />
                    </div>
                  ))}
                </div>

                {/* Brands Grid */}
                <div
                  className={`bogo-screen-brands-grid ${
                    screen.brands.length === 4 ? 'grid-4' : 'grid-3'
                  }`}
                >
                  {screen.brands.map((brand, brandIdx) => (
                    <BrandTile
                      key={brand.id}
                      brand={brand}
                      itemIndex={brandIdx + 1}
                      totalInSet={screen.brands.length}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* 4. Section Outro Summary Slate (Unobstructed & Clean) */}
          <div className="bogo-collection-outro-slate" ref={outroRef}>
            <div className="bogo-outro-badge-pill">
              <span className="bogo-outro-badge-dot" />
              <span className="bogo-outro-metric">PORTFOLIO ARCHITECTURE &middot; 11 BRANDS COMPLETE</span>
            </div>
            <h2 className="bogo-outro-headline">
              <span className="bogo-outro-hl-brands">11 SPECIALISED BRANDS.</span>
              <span className="bogo-outro-hl-accent">ONE CONNECTED ECOSYSTEM.</span>
            </h2>
            <p className="bogo-outro-subtext">
              From everyday household nourishment to pet care, conscious wellness, and future learning.
            </p>
            <div className="bogo-outro-next-cue">
              <span className="bogo-outro-cue-text">NEXT: RETAIL FORMATS — BOGO SQUARE</span>
              <div className="bogo-outro-hairline" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
