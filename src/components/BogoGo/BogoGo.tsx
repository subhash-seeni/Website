import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import goLogoImg from '../../assets/Go.png';
import './BogoGo.css';

gsap.registerPlugin(ScrollTrigger);

export const BogoGo: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.bogo-go-stage', { opacity: 0 });
      gsap.set('.bogo-go-velocity-ray', { strokeDashoffset: 1200 });
      gsap.set('.bogo-go-content', { opacity: 0, y: 35 });
      gsap.set('.bogo-go-logo-wrapper', { opacity: 0.85, scale: 0.92 });
      gsap.set('.bogo-go-subtext', { opacity: 0, y: 16 });
      gsap.set('.bogo-go-cue', { opacity: 0 });

      // Master scroll timeline over 240vh
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      });

      // 1. Stage fades in smoothly
      tl.to(
        '.bogo-go-stage',
        {
          opacity: 1,
          duration: 0.12,
          ease: 'power2.out',
        },
        0.02
      );

      // 2. Velocity / kinetic conduits draw across the dark canvas
      tl.to(
        '.bogo-go-velocity-ray',
        {
          strokeDashoffset: 0,
          duration: 0.22,
          stagger: 0.03,
          ease: 'power2.out',
        },
        0.08
      );

      // 3. Central content ("THE ECOSYSTEM MOVES.") enters
      tl.to(
        '.bogo-go-content',
        {
          opacity: 1,
          y: 0,
          duration: 0.16,
          ease: 'power2.out',
        },
        0.12
      );

      // 4. Logo scales and settles into ambient glow
      tl.to(
        '.bogo-go-logo-wrapper',
        {
          opacity: 1,
          scale: 1,
          duration: 0.14,
          ease: 'power1.out',
        },
        0.20
      );

      // 5. Supporting copy and cue reveal
      tl.to(
        ['.bogo-go-subtext', '.bogo-go-cue'],
        {
          opacity: 1,
          y: 0,
          duration: 0.14,
          ease: 'power2.out',
        },
        0.30
      );
    }, trackRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="bogo-go-track" ref={trackRef} id="bogo-go-section">
      <div className="bogo-go-viewport" ref={viewportRef}>
        {/* Subtle noise grain */}
        <div className="bogo-go-grain" aria-hidden="true" />

        {/* Minimal Header */}
        <header className="bogo-go-header">
          <div className="bogo-go-brand-group">
            <span className="bogo-go-brand-mark">BOGO</span>
            <span className="bogo-go-brand-sep">/</span>
            <span className="bogo-go-active-name">GO</span>
          </div>
        </header>

        {/* Cinematic Kinetic Canvas */}
        <div className="bogo-go-stage">
          {/* Kinetic Flow Conduits SVG */}
          <svg className="bogo-go-velocity-canvas" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="goKineticOrangeCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f78634" stopOpacity="0.1" />
                <stop offset="25%" stopColor="#f78634" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#ffaa40" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="goKineticCyanOrange" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#f78634" stopOpacity="0.15" />
                <stop offset="35%" stopColor="#ffaa40" stopOpacity="0.85" />
                <stop offset="75%" stopColor="#f78634" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f78634" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Upper sweeping conduit */}
            <path
              className="bogo-go-velocity-ray ray-upper"
              d="M -50,180 C 340,140 520,240 720,230 C 940,220 1140,120 1500,160"
              fill="none"
              stroke="url(#goKineticOrangeCyan)"
              strokeWidth="2"
              strokeDasharray="1200"
            />

            {/* Side orbital conduits framing the central identity */}
            <path
              className="bogo-go-velocity-ray ray-mid-left"
              d="M -50,470 C 260,470 380,390 540,430"
              fill="none"
              stroke="url(#goKineticOrangeCyan)"
              strokeWidth="1.5"
              strokeDasharray="800"
            />
            <path
              className="bogo-go-velocity-ray ray-mid-right"
              d="M 900,430 C 1060,470 1180,390 1500,410"
              fill="none"
              stroke="url(#goKineticCyanOrange)"
              strokeWidth="1.5"
              strokeDasharray="800"
            />

            {/* Lower sweeping conduit */}
            <path
              className="bogo-go-velocity-ray ray-lower"
              d="M -50,720 C 350,780 540,660 720,670 C 920,680 1120,760 1500,700"
              fill="none"
              stroke="url(#goKineticCyanOrange)"
              strokeWidth="2"
              strokeDasharray="1200"
            />
          </svg>

          {/* Central Content */}
          <div className="bogo-go-content">
            <div className="bogo-go-kicker">
              <span className="bogo-go-kicker-dot" />
              DISTRIBUTION &amp; SUPPLY CHAIN
            </div>

            <h2 className="bogo-go-headline">
              CONNECTING PRODUCTS
              <br />
              TO PEOPLE.
            </h2>

            <div className="bogo-go-logo-wrapper">
              <div className="bogo-go-halo" aria-hidden="true" />
              <img
                src={goLogoImg}
                alt="BOGO Go"
                className="bogo-go-logo"
                loading="eager"
              />
            </div>

            <p className="bogo-go-subtext">
              The distribution and supply chain arm of the BOGO ecosystem. Moving products efficiently from manufacturers and suppliers to BOGO stores, retail partners, and customers.
            </p>

            <div className="bogo-go-cue">
              <div className="bogo-go-cue-badge">
                <span className="bogo-go-cue-dot" />
                <span className="bogo-go-cue-text">NEXT &middot; BOGO PROGRAMS &mdash; COLLABORATIVE INITIATIVES</span>
              </div>
              <div className="bogo-go-hairline" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
