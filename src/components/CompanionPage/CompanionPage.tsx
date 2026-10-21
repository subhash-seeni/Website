import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navigateToDestination } from '../../config/navigation';
import './CompanionPage.css';

gsap.registerPlugin(ScrollTrigger);

// 11 BOGO Brands in Circular Orbit matching Page 3
interface OrbitBrand {
  id: string;
  name: string;
  category: string;
  color: string;
  icon?: string;
  angle: number; // in degrees for circular layout
}

const ORBIT_BRANDS: OrbitBrand[] = [
  { id: 'essentials', name: 'Essentials', category: 'Grocery & Staples', color: '#0d5c3a', angle: 270 }, // Top (12 o'clock)
  { id: 'daily', name: 'Daily', category: 'Fresh & Dairy', color: '#dc2626', angle: 302.7 },
  { id: 'farms', name: 'Farms', category: 'Organic Produce', color: '#16a34a', angle: 335.4 },
  { id: 'divine', name: 'Divine', category: 'Pooja & Spiritual', color: '#ca8a04', angle: 8.1 },
  { id: 'beauty', name: 'Beauty', category: 'Wellness & Care', color: '#e11d48', angle: 40.8 },
  { id: 'luxe', name: 'Luxe', category: 'Gourmet & Premium', color: '#1e3a8a', angle: 73.5 },
  { id: 'paws', name: 'Paws', category: 'Pet Supplies', color: '#92400e', angle: 106.2 },
  { id: 'play', name: 'Play', category: 'Kids & Games', color: '#0284c7', angle: 138.9 },
  { id: 'classroom', name: 'Classroom', category: 'Learning & Stationery', color: '#0f766e', angle: 171.6 },
  { id: 'go', name: 'Go', category: 'Express & Logistics', color: '#ea580c', angle: 204.3 },
  { id: 'partner', name: 'Partner', category: 'Merchant Network', color: '#6b21a8', angle: 237 },
];

export const CompanionPage: React.FC = () => {
  const [activeBrandIndex, setActiveBrandIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const ctx = gsap.context(() => {
      // 1. Hero Brand Badge Entrance
      gsap.from('.comp-hero-brand-badge', {
        opacity: 0,
        y: -20,
        scale: 0.9,
        duration: 0.7,
        ease: 'power2.out',
      });

      // 2. Hero entrance typography (Page 1)
      gsap.from('.comp-pdf-hero-text > *:not(.comp-hero-brand-badge)', {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.12,
        delay: 0.15,
        ease: 'power3.out',
      });

      // 3. Fanned Cards Fan-out Entrance Animation
      const fanTl = gsap.timeline({ delay: 0.25 });
      fanTl.from('.comp-pdf-fan-card', {
        opacity: 0,
        scale: 0.75,
        y: 50,
        duration: 0.9,
        stagger: 0.08,
        ease: 'back.out(1.4)',
      });

      // Subtle living floating motion on the main companion card
      gsap.to('.card-main-companion', {
        y: -6,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 4. Page 1 Bottom Pillars Row
      gsap.from('.comp-pdf-pillar-col', {
        scrollTrigger: {
          trigger: '.comp-pdf-pillars-row',
          start: 'top 85%',
        },
        opacity: 0,
        y: 35,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power2.out',
      });

      // 5. Page 2: Journey Section Header & Hero
      gsap.from('.comp-journey-text-col > *', {
        scrollTrigger: {
          trigger: '.comp-journey-hero-row',
          start: 'top 82%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });

      // 6. Page 2: 3D Round Pedestal Showcase Entrance & Gentle Float
      gsap.from('.comp-podium-card-wrap', {
        scrollTrigger: {
          trigger: '.comp-journey-hero-row',
          start: 'top 80%',
        },
        opacity: 0,
        y: 45,
        scale: 0.9,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from('.comp-pedestal-cylinder', {
        scrollTrigger: {
          trigger: '.comp-journey-hero-row',
          start: 'top 80%',
        },
        opacity: 0,
        scaleY: 0.7,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
      });

      gsap.to('.comp-podium-card-wrap', {
        y: -8,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 7. Page 2: 5 Sequential Journey Steps
      gsap.from('.comp-journey-step', {
        scrollTrigger: {
          trigger: '.comp-journey-track',
          start: 'top 82%',
        },
        opacity: 0,
        y: 30,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power2.out',
      });

      // 8. Page 2: Benefits 2x2 Grid Entrance
      gsap.from('.comp-benefit-cell', {
        scrollTrigger: {
          trigger: '.comp-benefits-grid',
          start: 'top 85%',
        },
        opacity: 0,
        y: 24,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // 9. Page 3: Ecosystem Section Headline
      gsap.from('.comp-ecosystem-lead-col > *', {
        scrollTrigger: {
          trigger: '.comp-ecosystem-section',
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
      });

      // 10. Page 3: Radial Orbit Hub Entrance & Pulse
      gsap.from('.comp-orbit-center', {
        scrollTrigger: {
          trigger: '.comp-radial-orbit-stage',
          start: 'top 80%',
        },
        scale: 0.6,
        opacity: 0,
        duration: 0.85,
        ease: 'back.out(1.7)',
      });

      // Subtle gentle breathing pulse on orbit center
      gsap.to('.comp-orbit-center', {
        scale: 1.03,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Orbit track ring stroke expansion
      gsap.from('.comp-orbit-track-ring', {
        scrollTrigger: {
          trigger: '.comp-radial-orbit-stage',
          start: 'top 80%',
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      });

      // Cycle action labels pop in
      gsap.from('.comp-cycle-action', {
        scrollTrigger: {
          trigger: '.comp-radial-orbit-stage',
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.7,
        stagger: 0.08,
        duration: 0.5,
        delay: 0.4,
        ease: 'back.out(1.5)',
      });

      // 11 Brand Nodes Blossom Outward
      gsap.from('.comp-orbit-node', {
        scrollTrigger: {
          trigger: '.comp-radial-orbit-stage',
          start: 'top 80%',
        },
        scale: 0,
        opacity: 0,
        stagger: 0.06,
        duration: 0.6,
        delay: 0.3,
        ease: 'back.out(1.6)',
      });

      // 11. Page 3: Right Value Metric Cards Entrance
      gsap.from('.comp-value-pillar-card', {
        scrollTrigger: {
          trigger: '.comp-value-pillars-col',
          start: 'top 82%',
        },
        opacity: 0,
        x: 35,
        stagger: 0.15,
        duration: 0.75,
        ease: 'power2.out',
      });

      // 12. Page 3: Bottom Call to Action Banner
      gsap.from('.comp-ecosystem-cta-banner', {
        scrollTrigger: {
          trigger: '.comp-ecosystem-cta-banner',
          start: 'top 88%',
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: 'power3.out',
      });
    });

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

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToDestination({
      id: 'home',
      label: 'HOME',
      path: '/',
      targetId: 'bogo-hero-section',
    });
  };

  return (
    <div className="bogo-companion-page" id="bogo-companion-page">
      {/* Top Breadcrumb Nav */}
      <nav className="comp-top-nav" aria-label="Breadcrumb Navigation">
        <div className="comp-nav-inner">
          <div className="comp-nav-crumbs">
            <a href="/" onClick={handleHomeClick} className="comp-crumb-link">
              BOGO
            </a>
            <span className="comp-crumb-sep">/</span>
            <a href="/programmes" onClick={handleBackToProgrammes} className="comp-crumb-link">
              PROGRAMMES
            </a>
            <span className="comp-crumb-sep">/</span>
            <span className="comp-crumb-current">BOGO COMPANION</span>
          </div>
          <button type="button" onClick={handleBackToProgrammes} className="comp-back-btn">
            ← ALL PROGRAMMES
          </button>
        </div>
      </nav>

      {/* ===================================================================
          PAGE 1 / 03: MORE THAN MEMBERSHIP. A BETTER WAY TO EXPERIENCE BOGO.
          =================================================================== */}
      <section className="comp-page-block comp-page-one">
        <div className="comp-page-one-body">
          <div className="comp-pdf-hero-text">
            <div className="comp-hero-brand-badge">
              <img src="/images/Companion.png" alt="BOGO Companion" className="comp-hero-brand-logo" />
            </div>

            <h1 className="comp-pdf-main-headline">
              More than <span className="comp-highlight-blue">membership.</span>
              <br />
              A better way to experience <span className="comp-highlight-gold">BOGO.</span>
            </h1>

            <p className="comp-pdf-hero-lead">
              BOGO Companion brings you closer to the brands, stores and experiences within the BOGO ecosystem. 
              Through one connected membership, you can unlock greater value, exclusive benefits and meaningful rewards across BOGO.
            </p>

            <div className="comp-kicker-capsule">
              <span className="comp-capsule-line">ONE MEMBERSHIP.</span>
              <span className="comp-capsule-line highlight">ELEVEN WORLDS OF VALUE.</span>
            </div>
          </div>

          {/* Realistic Graphic Composition of Fanned BOGO Brand Pass Cards */}
          <div className="comp-cards-fan-container" aria-label="BOGO Brand Passes Display">
            <div className="comp-cards-fan-stage">
              {/* Card: Essentials (Deep Green) */}
              <div className="comp-pdf-fan-card card-essentials">
                <div className="fan-card-top">
                  <span className="fan-brand-icon">🧺</span>
                  <span className="fan-brand-bogo">BOGO</span>
                </div>
                <div className="fan-brand-title">Essentials</div>
              </div>

              {/* Card: Daily (Crimson Red) */}
              <div className="comp-pdf-fan-card card-daily">
                <div className="fan-card-top">
                  <span className="fan-brand-icon">🥛</span>
                  <span className="fan-brand-bogo">BOGO</span>
                </div>
                <div className="fan-brand-title">Daily</div>
              </div>

              {/* Card: Farms (Fresh Leaf Green) */}
              <div className="comp-pdf-fan-card card-farms">
                <div className="fan-card-top">
                  <span className="fan-brand-icon">🌿</span>
                  <span className="fan-brand-bogo">BOGO</span>
                </div>
                <div className="fan-brand-title">Farms</div>
              </div>

              {/* Card: Divine (Warm Gold/Bronze) */}
              <div className="comp-pdf-fan-card card-divine">
                <div className="fan-card-top">
                  <span className="fan-brand-icon">🪔</span>
                  <span className="fan-brand-bogo">BOGO</span>
                </div>
                <div className="fan-brand-title">Divine</div>
              </div>

              {/* Card: Beauty (Lotus Pink/Berry) */}
              <div className="comp-pdf-fan-card card-beauty">
                <div className="fan-card-top">
                  <span className="fan-brand-icon">🪷</span>
                  <span className="fan-brand-bogo">BOGO</span>
                </div>
                <div className="fan-brand-title">Beauty</div>
              </div>

              {/* Main Lead Card: BOGO COMPANION PASS (Deep Navy & Official Companion Logo) */}
              <div className="comp-pdf-fan-card card-main-companion">
                <div className="fan-main-aura" />
                <div className="fan-main-top-row">
                  <span className="fan-main-chip">MEMBER PASS</span>
                  <span className="fan-main-sub-text">A BRIGHTER EVERYDAY TOGETHER</span>
                </div>

                <div className="fan-main-center">
                  <img src="/images/Companion.png" alt="BOGO Companion" className="fan-main-companion-logo" />
                </div>

                <div className="fan-main-bottom-bar">
                  <span>SHOP</span>
                  <span className="dot">•</span>
                  <span>EARN</span>
                  <span className="dot">•</span>
                  <span>SAVE</span>
                  <span className="dot">•</span>
                  <span>BELONG</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Value Pillars Row matching Bottom of Page 1 */}
        <div className="comp-pdf-pillars-row">
          <div className="comp-pillar-intro-col">
            <span className="comp-side-kicker">GOOD BRANDS · BRIGHTER LIVES</span>
          </div>

          <div className="comp-pdf-pillar-col">
            <div className="comp-pillar-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3 className="comp-pillar-title">MEMBERSHIP</h3>
            <p className="comp-pillar-desc">Belong to the BOGO ecosystem.</p>
          </div>

          <div className="comp-pdf-pillar-col">
            <div className="comp-pillar-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M7 15h0" />
                <path d="M2 9.5h20" />
              </svg>
            </div>
            <h3 className="comp-pillar-title">SUBSCRIPTION</h3>
            <p className="comp-pillar-desc">Choose greater value with flexible options.</p>
          </div>

          <div className="comp-pdf-pillar-col">
            <div className="comp-pillar-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 12 20 22 4 22 4 12" />
                <rect x="2" y="7" width="20" height="5" />
                <line x1="12" y1="22" x2="12" y2="7" />
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
              </svg>
            </div>
            <h3 className="comp-pillar-title">PRIVILEGES</h3>
            <p className="comp-pillar-desc">Enjoy more. Save more. Everyday.</p>
          </div>

          <div className="comp-pillar-outro-col">
            <span className="comp-side-kicker">SAME PEOPLE. MORE TO DISCOVER.</span>
          </div>
        </div>
      </section>

      {/* ===================================================================
          PAGE 2 / 03: ONE MEMBERSHIP. MORE WAYS TO BENEFIT.
          =================================================================== */}
      <section className="comp-page-block comp-page-two">
        <div className="comp-journey-hero-row">
          <div className="comp-journey-text-col">
            <h2 className="comp-pdf-main-headline">
              One membership.
              <br />
              <span className="comp-highlight-gold">More ways to benefit.</span>
            </h2>

            <p className="comp-pdf-hero-lead">
              Join BOGO Companion and unlock a world of rewards, offers and experiences across the entire BOGO ecosystem. 
              A simpler, more rewarding way to shop, engage and stay connected.
            </p>
          </div>

          {/* 3D Round Pedestal Showcase displaying the Companion Pass Card */}
          <div className="comp-podium-showcase-col">
            <span className="comp-podium-kicker">A MORE REWARDING JOURNEY TOGETHER.</span>
            <div className="comp-podium-stage">
              <div className="comp-podium-card-wrap">
                <div className="comp-podium-card">
                  <div className="podium-card-header">
                    <span className="podium-pass-chip">DIGITAL WALLET</span>
                    <span className="podium-tag">MORE VALUE. BRIGHTER DAYS.</span>
                  </div>

                  <div className="podium-card-body">
                    <img src="/images/Companion.png" alt="BOGO Companion" className="podium-companion-logo" />
                  </div>

                  <div className="podium-card-footer">
                    <span>SHOP</span>
                    <span>•</span>
                    <span>EARN</span>
                    <span>•</span>
                    <span>SAVE</span>
                    <span>•</span>
                    <span>BELONG</span>
                  </div>
                </div>
              </div>

              {/* Cylindrical Pedestal Base */}
              <div className="comp-pedestal-cylinder">
                <div className="pedestal-top-disc" />
                <div className="pedestal-body" />
                <div className="pedestal-shadow" />
              </div>
            </div>
          </div>
        </div>

        {/* The Companion Journey (01 JOIN -> 02 ENGAGE -> 03 EARN -> 04 ENJOY -> 05 RETURN) */}
        <div className="comp-journey-section-wrap">
          <h3 className="comp-subheading-title">The Companion Journey</h3>

          <div className="comp-journey-track">
            {/* Step 01 */}
            <div className="comp-journey-step">
              <div className="journey-icon-row">
                <div className="journey-step-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                </div>
                <span className="journey-arrow">→</span>
              </div>
              <div className="journey-step-meta">
                <span className="journey-step-num">01</span>
                <span className="journey-step-tag">JOIN</span>
              </div>
              <p className="journey-step-desc">Become a Companion member through a simple and convenient process.</p>
            </div>

            {/* Step 02 */}
            <div className="comp-journey-step">
              <div className="journey-icon-row">
                <div className="journey-step-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <span className="journey-arrow">→</span>
              </div>
              <div className="journey-step-meta">
                <span className="journey-step-num">02</span>
                <span className="journey-step-tag">ENGAGE</span>
              </div>
              <p className="journey-step-desc">Shop and interact across BOGO brands and stores.</p>
            </div>

            {/* Step 03 */}
            <div className="comp-journey-step">
              <div className="journey-icon-row">
                <div className="journey-step-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                </div>
                <span className="journey-arrow">→</span>
              </div>
              <div className="journey-step-meta">
                <span className="journey-step-num">03</span>
                <span className="journey-step-tag">EARN</span>
              </div>
              <p className="journey-step-desc">Collect points and unlock rewards with every transaction.</p>
            </div>

            {/* Step 04 */}
            <div className="comp-journey-step">
              <div className="journey-icon-row">
                <div className="journey-step-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 12 20 22 4 22 4 12" />
                    <rect x="2" y="7" width="20" height="5" />
                    <line x1="12" y1="22" x2="12" y2="7" />
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                  </svg>
                </div>
                <span className="journey-arrow">→</span>
              </div>
              <div className="journey-step-meta">
                <span className="journey-step-num">04</span>
                <span className="journey-step-tag">ENJOY</span>
              </div>
              <p className="journey-step-desc">Redeem points for exclusive offers, discounts and experiences.</p>
            </div>

            {/* Step 05 */}
            <div className="comp-journey-step">
              <div className="journey-icon-row">
                <div className="journey-step-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10" />
                    <polyline points="1 20 1 14 7 14" />
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                  </svg>
                </div>
              </div>
              <div className="journey-step-meta">
                <span className="journey-step-num">05</span>
                <span className="journey-step-tag">RETURN</span>
              </div>
              <p className="journey-step-desc">Come back for more value and new benefits everyday.</p>
            </div>
          </div>
        </div>

        {/* Bottom Benefits Matrix: Your benefits, wherever you shop */}
        <div className="comp-benefits-grid-wrap">
          <div className="comp-benefits-lead-col">
            <h3 className="comp-benefits-main-title">
              Your benefits,
              <br />
              <span className="comp-highlight-blue">wherever you shop.</span>
            </h3>
            <p className="comp-benefits-lead-desc">
              Get more value with exclusive benefits designed for every moment.
            </p>
            <span className="comp-benefits-brand-foot">BOGO COMPANION</span>
          </div>

          <div className="comp-benefits-grid">
            {/* Benefit 1 */}
            <div className="comp-benefit-cell">
              <div className="benefit-icon-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                  <circle cx="9" cy="9" r="1" fill="currentColor" />
                  <circle cx="15" cy="15" r="1" fill="currentColor" />
                </svg>
              </div>
              <div className="benefit-cell-content">
                <h4 className="benefit-cell-title">Exclusive Discounts</h4>
                <p className="benefit-cell-desc">Special member prices and exclusive offers.</p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="comp-benefit-cell">
              <div className="benefit-icon-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
              </div>
              <div className="benefit-cell-content">
                <h4 className="benefit-cell-title">Reward Points</h4>
                <p className="benefit-cell-desc">Earn points on every transaction and unlock rewards.</p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="comp-benefit-cell">
              <div className="benefit-icon-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div className="benefit-cell-content">
                <h4 className="benefit-cell-title">Festival Offers</h4>
                <p className="benefit-cell-desc">Early access and extra savings during festive seasons.</p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="comp-benefit-cell">
              <div className="benefit-icon-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 12 20 22 4 22 4 12" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                  <circle cx="12" cy="3" r="1" />
                </svg>
              </div>
              <div className="benefit-cell-content">
                <h4 className="benefit-cell-title">Birthday Treats</h4>
                <p className="benefit-cell-desc">Special surprises and offers on your special day.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          PAGE 3 / 03: ONE COMPANION. A CONNECTED BOGO EXPERIENCE.
          =================================================================== */}
      <section className="comp-page-block comp-page-three comp-ecosystem-section">
        <div className="comp-ecosystem-grid">
          {/* Left Column: Heading & Description */}
          <div className="comp-ecosystem-lead-col">
            <h2 className="comp-pdf-main-headline">
              One Companion.
              <br />
              <span className="comp-highlight-gold">A connected</span>
              <br />
              <span className="comp-highlight-gold">BOGO experience.</span>
            </h2>

            <p className="comp-pdf-hero-lead">
              BOGO Companion connects you to the entire BOGO ecosystem, bringing together multiple brands, stores and experiences under one membership. 
              Shop, engage and earn across eleven unique worlds – with more value, more opportunities and more of what you love.
            </p>

            <div className="comp-ecosystem-side-note">
              <span className="comp-side-kicker">DIFFERENT WORLDS. A BRIGHTER TOMORROW.</span>
            </div>
          </div>

          {/* Center Column: The 11 Brands Radial Orbit & Central Companion Hub */}
          <div className="comp-radial-orbit-stage" aria-label="11 Brands Radial Wheel">
            {/* Central Companion Core */}
            <div className="comp-orbit-center">
              <img src="/images/Companion.png" alt="BOGO Companion" className="comp-orbit-center-logo" />
              <span className="comp-orbit-center-sub">YOU AT THE CENTRE</span>
            </div>

            {/* Orbit Circle Track */}
            <div className="comp-orbit-track-ring" />

            {/* Radial Cycle Action Labels (SHOP -> EARN -> SAVE -> DISCOVER -> RETURN) */}
            <div className="comp-cycle-action act-shop">SHOP</div>
            <div className="comp-cycle-action act-earn">EARN</div>
            <div className="comp-cycle-action act-save">SAVE</div>
            <div className="comp-cycle-action act-discover">DISCOVER</div>
            <div className="comp-cycle-action act-return">RETURN</div>

            {/* 11 Circular Brand Nodes around the perimeter */}
            {ORBIT_BRANDS.map((brand, idx) => {
              // Calculate x, y percentage coordinates on a circle of radius 42%
              const rad = (brand.angle * Math.PI) / 180;
              const r = 42; // percent radius
              const leftPercent = 50 + r * Math.cos(rad);
              const topPercent = 50 + r * Math.sin(rad);

              return (
                <div
                  key={brand.id}
                  className={`comp-orbit-node node-${brand.id} ${activeBrandIndex === idx ? 'is-active' : ''}`}
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    backgroundColor: brand.color,
                  }}
                  onMouseEnter={() => setActiveBrandIndex(idx)}
                  onMouseLeave={() => setActiveBrandIndex(null)}
                  title={`${brand.name} · ${brand.category}`}
                >
                  <span className="comp-node-label">{brand.name}</span>
                </div>
              );
            })}
          </div>

          {/* Right Column: 3 Value Metrics matching Page 3 */}
          <div className="comp-value-pillars-col">
            {/* Value Metric 1 */}
            <div className="comp-value-pillar-card">
              <div className="value-pillar-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <div className="value-pillar-meta">
                <h4 className="value-pillar-title">GREATER VALUE</h4>
                <p className="value-pillar-desc">More savings and rewards across BOGO.</p>
              </div>
            </div>

            {/* Value Metric 2 */}
            <div className="comp-value-pillar-card">
              <div className="value-pillar-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="value-pillar-meta">
                <h4 className="value-pillar-title">GREATER ENGAGEMENT</h4>
                <p className="value-pillar-desc">More reasons to interact with the ecosystem.</p>
              </div>
            </div>

            {/* Value Metric 3 */}
            <div className="comp-value-pillar-card">
              <div className="value-pillar-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="value-pillar-meta">
                <h4 className="value-pillar-title">GREATER LOYALTY</h4>
                <p className="value-pillar-desc">A stronger, long-term relationship.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Ecosystem Call To Action matching bottom of Page 3 */}
        <div className="comp-ecosystem-cta-banner">
          <div className="comp-cta-content">
            <h3 className="comp-cta-title">Become part of the BOGO Companion ecosystem.</h3>
            <p className="comp-cta-sub">Unlock a world of rewards, offers and experiences.</p>
          </div>
          <button type="button" onClick={handleBackToProgrammes} className="comp-cta-action-btn">
            JOIN BOGO COMPANION →
          </button>
        </div>

        <div className="comp-page-bottom-strip">
          <span className="comp-side-kicker">GOOD BRANDS · BRIGHTER LIVES</span>
          <span className="comp-side-kicker">SAME PEOPLE. MORE TO DISCOVER.</span>
        </div>
      </section>
    </div>
  );
};
