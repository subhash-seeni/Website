import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  SQUARE_EXPERIENCES,
  CONVERGENCE_BRANDS,
} from './types';
import { ExperienceHotspot } from './ExperienceHotspot';
import { ExperienceNav } from './ExperienceNav';
import squareHeroImg from '../../assets/Square.png';
import './BogoSquare.css';

gsap.registerPlugin(ScrollTrigger);

export const BogoSquare: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const convergenceLayerRef = useRef<HTMLDivElement>(null);
  const apertureFrameRef = useRef<HTMLDivElement>(null);
  const imageCanvasRef = useRef<HTMLDivElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);
  const experiencesLayerRef = useRef<HTMLDivElement>(null);
  const outroSlateRef = useRef<HTMLDivElement>(null);

  // Dynamic telemetry states
  const [activeExperienceId, setActiveExperienceId] = useState<string>('shop');
  const [hoveredExperienceId, setHoveredExperienceId] = useState<string | null>(null);
  const [isExperiencesActive, setIsExperiencesActive] = useState<boolean>(false);
  const [pillRadiusX, setPillRadiusX] = useState<number>(370);
  const [pillRadiusY, setPillRadiusY] = useState<number>(370);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobile = w <= 768;
      setIsMobile(mobile);

      if (mobile) {
        // Fits within mobile viewport width without any horizontal overflow
        const rx = Math.min(140, Math.round(w * 0.35));
        const ry = Math.min(220, Math.round(h * 0.28));
        setPillRadiusX(rx);
        setPillRadiusY(ry);
      } else {
        const minDim = Math.min(w, h);
        const r = Math.min(380, Math.max(280, Math.round(minDim * 0.40)));
        setPillRadiusX(r);
        setPillRadiusY(r);
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);



  // Jump to specific experience zone via scroll
  const handleSelectExperience = (id: string) => {
    setActiveExperienceId(id);
    const track = trackRef.current;
    if (!track) return;

    const expIndex = SQUARE_EXPERIENCES.findIndex((e) => e.id === id);
    if (expIndex === -1) return;

    const trackTop = track.offsetTop;
    const trackHeight = track.offsetHeight - window.innerHeight;

    // Experiences live between scroll progress 0.60 and 0.88
    const baseProgress = 0.60;
    const span = 0.26;
    const targetProgress = baseProgress + (expIndex / (SQUARE_EXPERIENCES.length - 1)) * span;

    window.scrollTo({
      top: trackTop + trackHeight * targetProgress,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const track = trackRef.current;
    const convergence = convergenceLayerRef.current;
    const aperture = apertureFrameRef.current;
    const imageCanvas = imageCanvasRef.current;
    const experiencesLayer = experiencesLayerRef.current;
    const outroSlate = outroSlateRef.current;

    if (!track || !convergence || !aperture || !imageCanvas) return;

    const ctx = gsap.context(() => {
      // MASTER SCROLL TIMELINE: 0.00 -> 1.00 scrub
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.35,
          onUpdate: (self) => {
            const p = self.progress;

            // Experience auto-selection
            if (p < 0.22) {
              setIsExperiencesActive(false);
            } else if (p < 0.55) {
              setIsExperiencesActive(false);
            } else if (p < 0.88) {
              setIsExperiencesActive(true);
              const expProgress = (p - 0.55) / 0.33;
              const idx = Math.min(
                SQUARE_EXPERIENCES.length - 1,
                Math.max(0, Math.floor(expProgress * SQUARE_EXPERIENCES.length))
              );
              const active = SQUARE_EXPERIENCES[idx];
              if (active) {
                setActiveExperienceId(active.id);
              }
            } else {
              setIsExperiencesActive(false);
            }
          },
        },
      });

      // =========================================================================
      // [0.00 -> 0.22]: PHASE 1 — THE CONVERGENCE ("MANY → ONE")
      // =========================================================================
      // Brands stream inward from 360° toward center point, rays collapse, beacon activates
      const brandChips = convergence.querySelectorAll('.bogo-conv-brand');
      const rayLines = convergence.querySelectorAll('.bogo-conv-ray');
      const centralBeacon = convergence.querySelector('.bogo-conv-beacon-wrapper');
      const convIntroText = convergence.querySelector('.bogo-conv-header');

      // Set initial convergence state
      gsap.set(brandChips, { scale: 1, opacity: 0.85 });
      gsap.set(rayLines, { strokeDashoffset: 0, opacity: 0.45 });
      gsap.set(centralBeacon, { scale: 0.8, opacity: 0.6 });

      // Animate brands collapsing into the center beacon
      masterTl.to(
        brandChips,
        {
          x: 0,
          y: 0,
          scale: 0.2,
          opacity: 0,
          stagger: 0.01,
          ease: 'power2.in',
          duration: 0.16,
        },
        0.02
      );

      // Ray lines shorten and vanish into focal center
      masterTl.to(
        rayLines,
        {
          opacity: 0,
          scale: 0.1,
          transformOrigin: '50% 50%',
          duration: 0.14,
          ease: 'power2.in',
        },
        0.04
      );

      // Central beacon flares up as all brand vectors converge
      masterTl.to(
        centralBeacon,
        {
          scale: 1.5,
          opacity: 1,
          duration: 0.08,
          ease: 'power1.out',
        },
        0.12
      );

      masterTl.to(
        convIntroText,
        {
          opacity: 0,
          y: -20,
          duration: 0.08,
          ease: 'power2.in',
        },
        0.12
      );

      // Fade out convergence layer to reveal the physical reality
      masterTl.to(
        convergence,
        {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.12,
          ease: 'power2.inOut',
        },
        0.18
      );

      // =========================================================================
      // [0.12 -> 0.45]: PHASE 2 — APERTURE EXPANSION & CINEMATIC CAMERA PUSH
      // =========================================================================
      // Image begins inside a compact architectural aperture, then expands to full viewport
      gsap.set(aperture, {
        width: '320px',
        height: '200px',
        borderRadius: '24px',
        boxShadow: '0 25px 60px rgba(14, 41, 78, 0.18), 0 0 0 1px rgba(247, 134, 52, 0.4)',
      });

      gsap.set(imageCanvas, {
        scale: 1.22,
        y: 15,
      });

      // Expand aperture from architectural window to full immersive viewport
      masterTl.to(
        aperture,
        {
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          boxShadow: 'none',
          duration: 0.28,
          ease: 'power2.inOut',
        },
        0.14
      );

      // Camera push-in toward the grand building entrance (scale 1.22 -> 1.05)
      masterTl.to(
        imageCanvas,
        {
          scale: 1.04,
          y: 0,
          duration: 0.28,
          ease: 'power2.out',
        },
        0.14
      );

      // =========================================================================
      // [0.28 -> 0.60]: PHASE 3 — CINEMATIC EDITORIAL HERO TYPOGRAPHY
      // =========================================================================
      gsap.set('.bogo-sq-hero-editorial', { opacity: 0, y: 25 });

      // Clean, high-impact editorial lockup enters smoothly in twilight sky
      masterTl.to(
        '.bogo-sq-hero-editorial',
        {
          opacity: 1,
          y: 0,
          duration: 0.18,
          ease: 'power2.out',
        },
        0.28
      );

      // Subtly soften to prioritize architectural hotspots as experiences activate
      masterTl.to(
        '.bogo-sq-hero-editorial',
        {
          opacity: 0.35,
          y: -10,
          duration: 0.12,
          ease: 'power2.inOut',
        },
        0.55
      );

      // =========================================================================
      // [0.55 -> 0.88]: PHASE 4 — PROGRESSIVE EXPERIENCES & HOTSPOTS
      // =========================================================================
      gsap.set(experiencesLayer, { opacity: 0, y: 25, pointerEvents: 'none' });

      masterTl.to(
        experiencesLayer,
        {
          opacity: 1,
          y: 0,
          pointerEvents: 'auto',
          duration: 0.10,
          ease: 'power2.out',
        },
        0.56
      );



      // Fade experiences layer before outro
      masterTl.to(
        experiencesLayer,
        {
          opacity: 0,
          y: 20,
          pointerEvents: 'none',
          duration: 0.08,
          ease: 'power2.in',
        },
        0.86
      );

      // =========================================================================
      // [0.88 -> 1.00]: PHASE 5 — DESTINATION HORIZON & OUTRO
      // =========================================================================
      gsap.set(outroSlate, { opacity: 0, y: 35, pointerEvents: 'none' });

      masterTl.to(
        outroSlate,
        {
          opacity: 1,
          y: 0,
          pointerEvents: 'auto',
          duration: 0.12,
          ease: 'power2.out',
        },
        0.88
      );
    }, trackRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      className="bogo-square-track"
      ref={trackRef}
      id="bogo-square-section"
    >
      <div className="bogo-square-viewport" ref={viewportRef}>
        {/* Subtle cinematic film texture */}
        <div className="bogo-square-grain" aria-hidden="true" />

        {/* Minimal Editorial Top Header */}
        <header className="bogo-square-header">
          <div className="bogo-square-brand-group">
            <span className="bogo-square-brand-mark">BOGO</span>
            <span className="bogo-square-brand-div">/</span>
            <span className="bogo-square-section-name">SQUARE</span>
          </div>
        </header>

        {/* =================================================================== */}
        {/* PHASE 1: CONVERGENCE LAYER ("MANY → ONE") */}
        {/* =================================================================== */}
        <div className="bogo-square-convergence" ref={convergenceLayerRef}>
          {/* Convergence Editorial Heading */}
          <div className="bogo-conv-header">
            <div className="bogo-conv-eyebrow">THE PHYSICAL DESTINATION</div>
            <h2 className="bogo-conv-title">MANY BRANDS. ONE PHYSICAL DESTINATION.</h2>
            <p className="bogo-conv-subtext">
              All 11 BOGO brands, farm-to-table dining, and wellness lounges converge under one architectural roof.
            </p>
          </div>

          {/* Convergence Radial Ray Vector SVG Canvas */}
          <svg className="bogo-conv-svg-canvas" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <radialGradient id="beaconGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f78634" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#f78634" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#f78634" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Inward Vector Rays */}
            {CONVERGENCE_BRANDS.map((brand) => {
              const rad = (brand.angle * Math.PI) / 180;
              const rayDistX = isMobile ? 360 : 480;
              const rayDistY = isMobile ? 400 : 480;
              const x1 = 500 + Math.cos(rad) * rayDistX;
              const y1 = 500 + Math.sin(rad) * rayDistY;
              return (
                <line
                  key={brand.name}
                  className="bogo-conv-ray"
                  x1={x1}
                  y1={y1}
                  x2={500}
                  y2={500}
                  stroke={brand.color}
                  strokeWidth="1.2"
                  strokeOpacity="0.35"
                  strokeDasharray="4 6"
                />
              );
            })}
          </svg>

          {/* Central Beacon & Reticle Rings */}
          <div className="bogo-conv-beacon-wrapper">
            <div className="bogo-conv-ring ring-outer" />
            <div className="bogo-conv-ring ring-mid" />
            <div className="bogo-conv-core" />
            <div className="bogo-conv-beacon-label">POINT OF CONVERGENCE</div>
          </div>

          {/* Inward Orbiting Brand Badges */}
          <div className="bogo-conv-brands-stage" aria-hidden="true">
            {CONVERGENCE_BRANDS.map((brand) => {
              const rad = (brand.angle * Math.PI) / 180;
              const x = Math.cos(rad) * pillRadiusX;
              const y = Math.sin(rad) * pillRadiusY;

              return (
                <div
                  key={brand.name}
                  className="bogo-conv-brand"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    borderColor: brand.color,
                  }}
                >
                  <span className="bogo-conv-brand-dot" style={{ backgroundColor: brand.color }} />
                  <span className="bogo-conv-brand-name">{brand.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* =================================================================== */}
        {/* PHASE 2: ARCHITECTURAL APERTURE & CINEMATIC ENVIRONMENT */}
        {/* =================================================================== */}
        <div className="bogo-square-aperture" ref={apertureFrameRef}>
          <div
            className="bogo-square-image-canvas"
            ref={imageCanvasRef}
          >
            {/* Skeleton shimmer shown while the large hero image loads */}
            {!imgLoaded && (
              <div className="bogo-square-img-skeleton" aria-hidden="true" />
            )}
            {/* The Actual Square Hero Image */}
            <img
              src={squareHeroImg}
              alt="BOGO Square — Flagship physical destination with sweeping illuminated architectural canopy, grand entrance plaza, and branded lifestyle wings"
              className={`bogo-square-hero-img ${imgLoaded ? 'is-loaded' : ''}`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
            />

            {/* Subtle Vignette & Contrast Control for Architectural Elegance */}
            <div className="bogo-square-cinematic-overlay" aria-hidden="true" />

            {/* Interactive Hotspots Over Architectural Signage */}
            <div className={`bogo-square-hotspots-container ${isExperiencesActive ? 'is-visible' : ''}`}>
              {SQUARE_EXPERIENCES.map((exp) => (
                <ExperienceHotspot
                  key={exp.id}
                  experience={exp}
                  isActive={activeExperienceId === exp.id}
                  isHovered={hoveredExperienceId === exp.id}
                  onHover={setHoveredExperienceId}
                  onClick={handleSelectExperience}
                />
              ))}
            </div>

          </div>
        </div>

        {/* =================================================================== */}
        {/* PHASE 3: EDITORIAL HERO TYPOGRAPHY */}
        {/* =================================================================== */}
        <div className="bogo-square-typography" ref={typographyRef}>
          <div className="bogo-sq-hero-editorial">
            <span className="bogo-sq-eyebrow">FLAGSHIP DESTINATION</span>
            <h1 className="bogo-sq-title">BOGO SQUARE</h1>
            <div className="bogo-sq-tagline">
              <span className="bogo-sq-tag-main">ONE DESTINATION.</span>
              <span className="bogo-sq-tag-accent">ENDLESS EXPERIENCES.</span>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* PHASE 4: EXPERIENCES PROGRESSION & CONTROLLER */}
        {/* =================================================================== */}
        <div className="bogo-square-experiences-layer" ref={experiencesLayerRef}>
          <ExperienceNav
            activeId={activeExperienceId}
            hoveredId={hoveredExperienceId}
            onSelect={handleSelectExperience}
            onHover={setHoveredExperienceId}
          />
        </div>

        {/* =================================================================== */}
        {/* PHASE 5: OUTRO & RETAIL FORMAT HORIZON */}
        {/* =================================================================== */}
        <div className="bogo-square-outro-slate" ref={outroSlateRef}>
          <div className="bogo-sq-outro-pill">FLAGSHIP ARCHITECTURE &middot; 30,000+ SQ FT</div>
          <h2 className="bogo-sq-outro-headline">
            THE EXPERIENCE CAPITAL
            <br />
            OF BOGO.
          </h2>
          <p className="bogo-sq-outro-subtext">
            BOGO Square anchors our ecosystem — bringing shopping, dining, wellness, and community together in one world-class landmark.
          </p>

          {/* Retail Architecture Horizon Hierarchy Cue */}
          <div className="bogo-sq-retail-hierarchy">
            <div className="bogo-sq-hierarchy-item is-current">
              <span className="bogo-sq-h-step">01</span>
              <span className="bogo-sq-h-name">SQUARE</span>
              <span className="bogo-sq-h-status">FLAGSHIP (30,000+ SQ FT)</span>
            </div>
            <div className="bogo-sq-hierarchy-connector" />
            <div className="bogo-sq-hierarchy-item is-upcoming">
              <span className="bogo-sq-h-step">02</span>
              <span className="bogo-sq-h-name">BAZAAR</span>
              <span className="bogo-sq-h-status">SUPERMARKET (12,000 SQ FT)</span>
            </div>
            <div className="bogo-sq-hierarchy-connector" />
            <div className="bogo-sq-hierarchy-item is-upcoming">
              <span className="bogo-sq-h-step">03</span>
              <span className="bogo-sq-h-name">MINI</span>
              <span className="bogo-sq-h-status">EXPRESS (2,500 SQ FT)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
