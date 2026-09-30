import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import knowWebp from '../../assets/technology/know.webp';
import assistWebp from '../../assets/technology/assist.webp';
import discoverWebp from '../../assets/technology/discover.webp';
import './BogoTechnology.css';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Technology Image Asset References
// ---------------------------------------------------------------------------
const technologyImages = {
  know: knowWebp,
  assist: assistWebp,
  discover: discoverWebp,
};

interface TechnologyImageSlotProps {
  src: string;
  alt: string;
  stageNum: string;
  stageName: string;
  features: string[];
  className?: string;
}

/**
 * TechnologyImageSlot:
 * Gracefully attempts to render the image. If the file does not exist yet,
 * it renders an elegant architectural placeholder with reticles and file paths,
 * preventing any broken image icons or build errors.
 */
const TechnologyImageSlot: React.FC<TechnologyImageSlotProps> = ({
  src,
  alt,
  stageNum,
  stageName,
  features,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`technology-image ${className}`}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          className="technology-img-element"
          loading="eager"
          decoding="async"
          onError={() => setHasError(true)}
        />
      ) : null}

      {hasError && (
        <div className="technology-placeholder-frame" aria-label={`Asset Slot: ${alt}`}>
          <div className="technology-placeholder-grid-bg" aria-hidden="true" />
          <div className="technology-placeholder-content">
            <div className="technology-placeholder-meta">
              <span className="placeholder-stage-id">{stageNum} // ASSET SLOT</span>
              <span className="placeholder-stage-name">{stageName}</span>
            </div>

            <div className="technology-placeholder-features">
              {features.map((feat, idx) => (
                <span key={idx} className="placeholder-feat-pill">
                  {feat}
                </span>
              ))}
            </div>

            <div className="technology-placeholder-file-path">
              <code>{src}</code>
            </div>
          </div>

          {/* Architectural Framing Reticles */}
          <div className="technology-reticles" aria-hidden="true">
            <span className="reticle-corner reticle-tl" />
            <span className="reticle-corner reticle-tr" />
            <span className="reticle-corner reticle-bl" />
            <span className="reticle-corner reticle-br" />
            <div className="reticle-center-cross" />
          </div>
        </div>
      )}
    </div>
  );
};

export const BogoTechnology: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // -----------------------------------------------------------------------
      // INITIAL ELEMENT STATES
      // -----------------------------------------------------------------------
      // Section Opening
      gsap.set('.bogo-tech-intro', { opacity: 0, y: 30 });

      // Stage 01: KNOW
      gsap.set('.bogo-tech-stage-know', { opacity: 0, y: 36, pointerEvents: 'none' });

      // Stage 02: ASSIST
      gsap.set('.bogo-tech-stage-assist', { opacity: 0, y: 36, pointerEvents: 'none' });

      // Stage 03: DISCOVER
      gsap.set('.bogo-tech-stage-discover', { opacity: 0, y: 36, pointerEvents: 'none' });

      // Final Payoff
      gsap.set('.bogo-tech-final-payoff', { opacity: 0, y: 30, pointerEvents: 'none' });

      // -----------------------------------------------------------------------
      // MASTER SCROLL TIMELINE (Pinned sequence over 540vh)
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
      // PHASE 1 [0.00 -> 0.18]: SECTION OPENING
      // "THE INTELLIGENCE BEHIND BOGO."
      // -----------------------------------------------------------------------
      tl.to(
        '.bogo-tech-intro',
        {
          opacity: 1,
          y: 0,
          duration: 0.08,
          ease: 'power2.out',
        },
        0.02
      );

      tl.to(
        '.bogo-tech-intro',
        {
          opacity: 0,
          y: -24,
          duration: 0.04,
          ease: 'power2.in',
        },
        0.14
      );

      // -----------------------------------------------------------------------
      // PHASE 2 [0.18 -> 0.44]: 01 — KNOW
      // "BOGO remembers what matters." + Purchase History Image Slot
      // -----------------------------------------------------------------------
      tl.to(
        '.bogo-tech-stage-know',
        {
          opacity: 1,
          y: 0,
          duration: 0.06,
          ease: 'power2.out',
          onStart: () => {
            const el = document.querySelector('.bogo-tech-stage-know') as HTMLElement;
            if (el) el.style.pointerEvents = 'auto';
          },
        },
        0.19
      );

      tl.to(
        '.bogo-tech-stage-know',
        {
          opacity: 0,
          y: -30,
          duration: 0.04,
          ease: 'power2.in',
          onComplete: () => {
            const el = document.querySelector('.bogo-tech-stage-know') as HTMLElement;
            if (el) el.style.pointerEvents = 'none';
          },
        },
        0.42
      );

      // -----------------------------------------------------------------------
      // PHASE 3 [0.44 -> 0.70]: 02 — ASSIST (CENTRAL & PROMINENT)
      // "BOGO helps while you shop." + Assist Image Slot + Smart Basket/Trolley/Concierge
      // -----------------------------------------------------------------------
      tl.to(
        '.bogo-tech-stage-assist',
        {
          opacity: 1,
          y: 0,
          duration: 0.06,
          ease: 'power2.out',
          onStart: () => {
            const el = document.querySelector('.bogo-tech-stage-assist') as HTMLElement;
            if (el) el.style.pointerEvents = 'auto';
          },
        },
        0.45
      );

      tl.to(
        '.bogo-tech-stage-assist',
        {
          opacity: 0,
          y: -30,
          duration: 0.04,
          ease: 'power2.in',
          onComplete: () => {
            const el = document.querySelector('.bogo-tech-stage-assist') as HTMLElement;
            if (el) el.style.pointerEvents = 'none';
          },
        },
        0.68
      );

      // -----------------------------------------------------------------------
      // PHASE 4 [0.70 -> 0.88]: 03 — DISCOVER
      // "BOGO helps you discover what's next." + Discover Image Slot
      // -----------------------------------------------------------------------
      tl.to(
        '.bogo-tech-stage-discover',
        {
          opacity: 1,
          y: 0,
          duration: 0.06,
          ease: 'power2.out',
          onStart: () => {
            const el = document.querySelector('.bogo-tech-stage-discover') as HTMLElement;
            if (el) el.style.pointerEvents = 'auto';
          },
        },
        0.71
      );

      tl.to(
        '.bogo-tech-stage-discover',
        {
          opacity: 0,
          y: -30,
          duration: 0.04,
          ease: 'power2.in',
          onComplete: () => {
            const el = document.querySelector('.bogo-tech-stage-discover') as HTMLElement;
            if (el) el.style.pointerEvents = 'none';
          },
        },
        0.86
      );

      // -----------------------------------------------------------------------
      // PHASE 5 [0.88 -> 1.00]: FINAL CONVERGENCE & PAYOFF
      // "ONE CONNECTED SHOPPING JOURNEY."
      // -----------------------------------------------------------------------
      tl.to(
        '.bogo-tech-final-payoff',
        {
          opacity: 1,
          y: 0,
          duration: 0.06,
          ease: 'power2.out',
          onStart: () => {
            const el = document.querySelector('.bogo-tech-final-payoff') as HTMLElement;
            if (el) el.style.pointerEvents = 'auto';
          },
        },
        0.89
      );
    }, trackRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="bogo-tech-track" ref={trackRef} id="bogo-technology-section">
      <div className="bogo-tech-viewport">
        {/* Subtle organic noise texture overlay */}
        <div className="bogo-tech-grain" aria-hidden="true" />

        {/* Transitional inlet from retail formats / Go */}
        <div className="bogo-tech-inlet" aria-hidden="true" />

        {/* Minimal architectural alignment lines */}
        <div className="bogo-tech-grid-lines" aria-hidden="true">
          <div className="bogo-tech-grid-h line-h1" />
          <div className="bogo-tech-grid-h line-h2" />
          <div className="bogo-tech-grid-v line-v1" />
          <div className="bogo-tech-grid-v line-v2" />
        </div>

        {/* Editorial Header */}
        <header className="bogo-tech-header">
          <div className="bogo-tech-brand-group">
            <span className="bogo-tech-brand-mark">BOGO</span>
            <span className="bogo-tech-brand-sep">/</span>
            <span className="bogo-tech-active-name">TECHNOLOGY</span>
          </div>
        </header>

        {/* ================================================================= */}
        {/* EDITORIAL CHAPTERS CONTAINER                                      */}
        {/* ================================================================= */}
        <div className="bogo-tech-stage-container">
          {/* 1. SECTION OPENING */}
          <div className="bogo-tech-chapter bogo-tech-intro">
            <span className="bogo-tech-kicker">THE TECHNOLOGY BEHIND BOGO</span>
            <h2 className="bogo-tech-headline">
              THE INTELLIGENCE
              <br />
              BEHIND BOGO.
            </h2>
          </div>

          {/* 2. EXPERIENCE 01 — KNOW */}
          <div className="bogo-tech-chapter bogo-tech-stage-card bogo-tech-stage-know">
            <div className="bogo-tech-card-content">
              <span className="bogo-tech-stage-label">01 // KNOW</span>
              <h3 className="bogo-tech-stage-title">KNOW</h3>
              <p className="bogo-tech-stage-message">BOGO remembers what matters.</p>
              <p className="bogo-tech-stage-copy">
                Your shopping history helps BOGO understand what you buy, what you need and what you may want next.
              </p>
              <div className="bogo-tech-tags">
                <span className="bogo-tech-tag">PURCHASE HISTORY</span>
              </div>
            </div>

            <div className="bogo-tech-card-media">
              <TechnologyImageSlot
                src={technologyImages.know}
                alt="BOGO Know — Purchase History"
                stageNum="01"
                stageName="KNOW / PURCHASE HISTORY"
                features={['Purchase History', 'Smart Memory', 'Personalized Preferences']}
                className="technology-image-know"
              />
            </div>
          </div>

          {/* 3. EXPERIENCE 02 — ASSIST (CENTRAL & PROMINENT) */}
          <div className="bogo-tech-chapter bogo-tech-stage-card bogo-tech-stage-assist is-prominent">
            <div className="bogo-tech-card-content">
              <span className="bogo-tech-stage-label">02 // ASSIST</span>
              <h3 className="bogo-tech-stage-title">ASSIST</h3>
              <p className="bogo-tech-stage-message">BOGO helps while you shop.</p>
              <p className="bogo-tech-stage-copy">
                Smart tools make every shopping interaction easier, from building your basket to getting help along the way.
              </p>
              <div className="bogo-tech-tags">
                <span className="bogo-tech-tag">SMART BASKET</span>
                <span className="bogo-tech-tag">CONCIERGE SERVICE</span>
                <span className="bogo-tech-tag">SMART TROLLEY</span>
              </div>
            </div>

            <div className="bogo-tech-card-media">
              <TechnologyImageSlot
                src={technologyImages.assist}
                alt="BOGO Assist — Smart Shopping"
                stageNum="02"
                stageName="ASSIST / SMART SHOPPING"
                features={['Smart Basket', 'Concierge Service', 'Smart Trolley']}
                className="technology-image-assist"
              />
            </div>
          </div>

          {/* 4. EXPERIENCE 03 — DISCOVER */}
          <div className="bogo-tech-chapter bogo-tech-stage-card bogo-tech-stage-discover">
            <div className="bogo-tech-card-content">
              <span className="bogo-tech-stage-label">03 // DISCOVER</span>
              <h3 className="bogo-tech-stage-title">DISCOVER</h3>
              <p className="bogo-tech-stage-message">BOGO helps you discover what's next.</p>
              <p className="bogo-tech-stage-copy">
                From finding the right products to getting them home, technology keeps the journey connected.
              </p>
              <div className="bogo-tech-tags">
                <span className="bogo-tech-tag">INTELLIGENT PRODUCT DISCOVERY</span>
                <span className="bogo-tech-tag">HOME DELIVERY</span>
              </div>
            </div>

            <div className="bogo-tech-card-media">
              <TechnologyImageSlot
                src={technologyImages.discover}
                alt="BOGO Discover — Product Discovery & Home Delivery"
                stageNum="03"
                stageName="DISCOVER / PRODUCT DISCOVERY + DELIVERY"
                features={['Intelligent Product Discovery', 'Home Delivery', 'Connected Fulfillment']}
                className="technology-image-discover"
              />
            </div>
          </div>

          {/* 5. FINAL PAYOFF */}
          <div className="bogo-tech-chapter bogo-tech-final-payoff">
            <span className="bogo-tech-kicker">ONE PLATFORM. ONE JOURNEY.</span>
            <h2 className="bogo-tech-payoff-headline">
              ONE CONNECTED
              <br />
              SHOPPING JOURNEY.
            </h2>
            <p className="bogo-tech-payoff-sub">
              From in-store smart carts to end-to-end supply chain orchestration, our technology keeps the entire retail journey connected.
            </p>
            <div className="bogo-tech-next-cue">
              <span className="bogo-tech-cue-dot" />
              <span>NEXT &middot; BOGO GO &mdash; DISTRIBUTION &amp; LOGISTICS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
