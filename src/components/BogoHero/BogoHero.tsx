import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { BogoWordmark } from './BogoWordmark';
import { InfinityMark } from './InfinityMark';
import { EcosystemPaths } from './EcosystemPaths';
import { ScrollIndicator } from './ScrollIndicator';
import './BogoHero.css';

gsap.registerPlugin(ScrollTrigger);

export const BogoHero: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Animated state variables driven by ScrollTrigger scrub
  const [scrollProgress, setScrollProgress] = useState(0);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [infinityScale, setInfinityScale] = useState(1);
  const [outerLettersOffset, setOuterLettersOffset] = useState(0);
  const [gBarProgress, setGBarProgress] = useState(1);
  const [scrollIndicatorOpacity, setScrollIndicatorOpacity] = useState(1);

  // Mouse parallax offset for tactile camera feel
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Initial serene entrance
    gsap.fromTo(
      stageRef.current,
      { opacity: 0, scale: 0.98, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 1.6, ease: 'power2.out', delay: 0.15 }
    );

    gsap.fromTo(
      '.bogo-supporting-copy',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out', delay: 0.6 }
    );

    gsap.fromTo(
      '.bogo-scroll-indicator',
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out', delay: 1.0 }
    );

    // Scroll choreography timeline (0% to 100%)
    // The hero locks into the 5-pillar constellation state as its final destination
    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8, // Controlled physical deceleration
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        // 1. Scroll Indicator Opacity (Fades out by 15% scroll)
        const indOpacity = Math.max(0, 1 - p * 6.5);
        setScrollIndicatorOpacity(indOpacity);

        // 2. Connection Activation (0.16 -> 0.38) & Stays Locked
        let conn = 0;
        if (p >= 0.16 && p <= 0.38) {
          conn = (p - 0.16) / 0.22;
        } else if (p > 0.38) {
          conn = 1;
        }
        setConnectionProgress(conn);

        // 3. G Crossbar Retraction (0.18 -> 0.40) & Stays Cleanly Retracted
        let gBar = 1;
        if (p >= 0.18 && p <= 0.40) {
          gBar = 1 - (p - 0.18) / 0.22;
        } else if (p > 0.40) {
          gBar = 0;
        }
        setGBarProgress(gBar);

        // 4. Outer Letters Drift (B & Green O) Outward (0.20 -> 0.44) & Stays Out
        let offset = 0;
        if (p >= 0.20 && p <= 0.44) {
          offset = ((p - 0.20) / 0.24) * 80;
        } else if (p > 0.44) {
          offset = 80;
        }
        setOuterLettersOffset(offset);

        // 5. Infinity Scale: Gently expands (1.0 -> 1.24) and stays locked
        let scale = 1;
        if (p >= 0.18 && p <= 0.50) {
          scale = 1 + ((p - 0.18) / 0.32) * 0.24;
        } else if (p > 0.50) {
          scale = 1.24;
        }
        setInfinityScale(scale);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  // Subtle mouse parallax listener for tactile camera feel
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / innerHeight - 0.5) * 2;
      setMouseOffset({
        x: normalizedX * 6, // subtle max 6px
        y: normalizedY * 6,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bogo-hero-track" ref={trackRef} id="bogo-hero-section">
      <div className="bogo-hero-viewport" ref={viewportRef}>
        {/* Subtle organic paper texture */}
        <div className="bogo-hero-grain" />

        {/* Minimal Editorial Header */}
        <header className="bogo-hero-header">
          <div className="bogo-header-brand">
            <span className="bogo-header-mark">BOGO</span>
            <span className="bogo-header-sub">THE BOGO ECOSYSTEM</span>
          </div>
        </header>

        {/* 5 Ecosystem Pillar Pills SVG Overlay */}
        <EcosystemPaths progress={scrollProgress} />

        {/* Central Stage Container */}
        <main
          className="bogo-stage-container"
          style={{
            transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
            transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          {/* Authentic BOGO Logo Stage */}
          <div ref={stageRef} className="bogo-logo-stage">
            {/* 1. Authentic Infinity Core (Connective Tissue of BOGO) */}
            <InfinityMark
              progress={scrollProgress}
              connectionProgress={connectionProgress}
              infinityScale={infinityScale}
              opacity={1}
            />

            {/* 2. Authentic Outer Letters & G-Bar from Bogo.png */}
            <BogoWordmark
              progress={scrollProgress}
              wordmarkOpacity={1}
              outerLettersOffset={outerLettersOffset}
              gBarProgress={gBarProgress}
            />
          </div>
        </main>

        {/* Unified Emotional Statement & Value Proposition */}
        <div className="bogo-supporting-copy">
          <div className="bogo-copy-line accent">CONNECTING PRODUCTS, PLACES &amp; PEOPLE</div>
          <p className="bogo-hero-descriptor">
            11 Curated In-House Brands &middot; Multi-Format Retail Stores &middot; Integrated Supply Chain &amp; Logistics
          </p>
          <button
            type="button"
            className="bogo-hero-explore-cta"
            onClick={() => {
              const el = document.getElementById('bogo-collection-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Explore the BOGO Ecosystem"
          >
            <span>ENTER THE ECOSYSTEM</span>
            <span className="bogo-hero-cta-arrow" aria-hidden="true">&darr;</span>
          </button>
        </div>

        {/* Scroll Indicator (State 1) */}
        <ScrollIndicator opacity={scrollIndicatorOpacity} />


      </div>
    </div>
  );
};
