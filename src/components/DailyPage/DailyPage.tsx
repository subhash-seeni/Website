import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navigateToDestination } from '../../config/navigation';
import './DailyPage.css';

gsap.registerPlugin(ScrollTrigger);

interface DailyCategoryItem {
  number: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const DAILY_CATEGORIES: DailyCategoryItem[] = [
  {
    number: '01',
    title: 'PACKAGED GROCERY',
    description: 'A broad selection of packaged grocery products for everyday household needs.',
    image: '/images/daily/cat-packaged-grocery.png',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'RICE, GRAINS AND PULSES',
    description: 'Essential staples that form the foundation of everyday cooking.',
    image: '/images/daily/cat-rice-grains.png',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'DAIRY PRODUCTS',
    description: 'Everyday packaged dairy products for households and families.',
    image: '/images/daily/cat-dairy.png',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2h8l1 4H7l1-4z" />
        <rect x="6" y="6" width="12" height="16" rx="2" />
        <path d="M10 12h4" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'SNACKS AND CONFECTIONERY',
    description: 'Familiar favourites and new choices for everyday snacking.',
    image: '/images/daily/cat-snacks.png',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V17a1 1 0 0 1-2 0v-.07A7.003 7.003 0 0 1 5.07 11H5a1 1 0 0 1 0-2h.07A7.003 7.003 0 0 1 11 3.07V3a1 1 0 0 1 2 0v.07A7.003 7.003 0 0 1 18.93 9H19a1 1 0 0 1 0 2h-.07A7.003 7.003 0 0 1 13 16.93z" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'BEVERAGES AND PACKAGED DRINKS',
    description: 'A convenient range of packaged beverages for different occasions.',
    image: '/images/daily/cat-beverages.png',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
      </svg>
    ),
  },
  {
    number: '06',
    title: 'FROZEN AND PACKAGED FOOD',
    description: 'Convenient packaged food options for everyday household requirements.',
    image: '/images/daily/cat-frozen.png',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20" />
        <path d="m4.93 4.93 4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24" />
      </svg>
    ),
  },
];

export const DailyPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const assortmentRef = useRef<HTMLElement>(null);
  const promiseRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set('.daily-anim', { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Hero Content Entrance Timeline
      const heroTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      heroTl
        .fromTo(
          '.hero-eyebrow-anim',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.1 }
        )
        .fromTo(
          '.hero-heading-anim',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          '.hero-intro-anim',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.5'
        )
        .fromTo(
          '.hero-cta-anim',
          { opacity: 0, y: 14, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5 },
          '-=0.35'
        )
        .fromTo(
          '.hero-visual-anim',
          { opacity: 0, scale: 0.94, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power2.out' },
          '-=0.6'
        );

      // 2. Pillars scroll-triggered stagger reveal
      const heroPillars = gsap.utils.toArray<HTMLElement>('.daily-pillar-card');
      if (heroPillars.length > 0) {
        gsap.set(heroPillars, { opacity: 0, y: 24 });
        ScrollTrigger.batch(heroPillars, {
          start: 'top 88%',
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          },
          once: true,
        });
      }

      // 3. Brand Vision Box reveal
      gsap.fromTo(
        '.daily-vision-box',
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.daily-vision-section',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 4. Assortment Section Header & Category Cards reveal
      const categoryCards = gsap.utils.toArray<HTMLElement>('.daily-category-card');
      if (categoryCards.length > 0) {
        gsap.set(categoryCards, { opacity: 0, y: 35, scale: 0.97 });
        ScrollTrigger.batch(categoryCards, {
          start: 'top 86%',
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              stagger: 0.09,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          },
          once: true,
        });
      }

      // 5. One Pantry Journey reveal
      gsap.fromTo(
        '.daily-journey-strip',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.daily-journey-wrap',
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 6. Promise Section reveal
      gsap.fromTo(
        '.daily-promise-content',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.daily-promise-section',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
      gsap.fromTo(
        '.daily-promise-visual',
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.daily-promise-section',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 7. Closing Tagline Banner reveal
      gsap.fromTo(
        '.daily-closing-banner',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.daily-closing-section',
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 180);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const handleScrollToAssortment = (e: React.MouseEvent) => {
    e.preventDefault();
    if (assortmentRef.current) {
      assortmentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToPromise = (e: React.MouseEvent) => {
    e.preventDefault();
    if (promiseRef.current) {
      promiseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBackToBrands = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToDestination({
      id: 'eco-brands',
      label: 'Brands',
      path: '/ecosystem/brands',
      targetId: 'bogo-brands-page',
    });
  };

  const handleReturnHome = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToDestination({
      id: 'home',
      label: 'HOME',
      path: '/',
      targetId: 'bogo-hero-section',
    });
  };

  return (
    <main
      className="bogo-daily-page"
      ref={containerRef}
      id="bogo-daily-page"
      role="main"
      aria-label="BOGO Daily Brand Page"
    >
      {/* Subtle organic noise grain overlay */}
      <div className="daily-grain" aria-hidden="true" />

      {/* Top Header / Breadcrumb Bar */}
      <header className="daily-header-bar">
        <div className="daily-header-inner">
          <nav className="daily-breadcrumbs" aria-label="Breadcrumb navigation">
            <a
              href="/"
              onClick={handleReturnHome}
              className="daily-crumb-link"
              aria-label="Navigate to Home"
            >
              <span>HOME</span>
            </a>
            <span className="daily-crumb-sep" aria-hidden="true">/</span>
            <a
              href="/ecosystem/brands"
              onClick={handleBackToBrands}
              className="daily-crumb-link"
              aria-label="Navigate to Brands Directory"
            >
              <span>BRANDS</span>
            </a>
            <span className="daily-crumb-sep" aria-hidden="true">/</span>
            <span className="daily-crumb-current">BOGO DAILY</span>
          </nav>

          <div className="daily-header-tag">
            <span className="daily-pulse-dot" />
            <span>02 / 11 · EVERYDAY LIVING</span>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SECTION 1 — HERO: "Your destination for everyday food essentials."
          (From Page 1 of BOGO Daily PDF)
          ========================================================================= */}
      <section className="daily-hero" aria-labelledby="daily-hero-heading">
        <div className="daily-hero-inner">
          {/* Left Column: Editorial Information */}
          <div className="daily-hero-content">
            <div className="daily-brand-badge hero-eyebrow-anim">
              <div className="daily-logo-lockup">
                <img
                  src="/images/logos/Daily.png"
                  alt="BOGO Daily Logo"
                  className="daily-logo-img"
                  width="135"
                  height="44"
                />
              </div>
              <span className="daily-tag-divider" aria-hidden="true">|</span>
              <span className="daily-eyebrow-text">GOOD FOOD · BRIGHTER DAYS</span>
            </div>

            <h1 id="daily-hero-heading" className="daily-hero-heading hero-heading-anim">
              Your destination for everyday food essentials.
            </h1>

            <p className="daily-hero-intro hero-intro-anim">
              BOGO Daily brings together a comprehensive range of packaged food products that
              households rely on every day. From pantry staples and grains to dairy, snacks and
              beverages, the brand offers trusted food brands that make everyday shopping convenient,
              reliable, and affordable.
            </p>

            <div className="daily-hero-actions hero-cta-anim">
              <button
                type="button"
                className="daily-primary-cta"
                onClick={handleScrollToAssortment}
                aria-label="Explore BOGO Daily assortment"
              >
                <span>Explore Assortment</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                className="daily-secondary-ghost-cta"
                onClick={handleScrollToPromise}
                aria-label="View Our Promise"
              >
                <span>Our Promise</span>
                <span aria-hidden="true">↓</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual from Page 1 PDF */}
          <div className="daily-hero-visual hero-visual-anim">
            <div className="daily-hero-glow" aria-hidden="true" />
            <div className="daily-hero-badge-float top-right" aria-hidden="true">
              <span className="daily-mono-number">01 / 03</span>
              <span className="daily-script-tag">Everyday Essentials · Happier Meals</span>
            </div>
            <div className="daily-hero-media-wrap">
              <img
                src="/images/daily/hero-daily-groceries.png"
                alt="BOGO Daily tote bag filled with fresh pantry groceries, vegetables, and everyday food essentials"
                className="daily-hero-img"
                loading="eager"
                width="660"
                height="500"
              />
            </div>
          </div>
        </div>

        {/* 4 Value Pillars from Page 1 PDF */}
        <div className="daily-hero-pillars-wrap">
          <div className="daily-pillars-grid">
            {/* Pillar 1 */}
            <div className="daily-pillar-card">
              <div className="pillar-icon-badge" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h16l-2 10H6L4 10z" />
                  <path d="M9 10V6a3 3 0 0 1 6 0v4" />
                  <line x1="9" y1="14" x2="9" y2="17" />
                  <line x1="12" y1="14" x2="12" y2="17" />
                  <line x1="15" y1="14" x2="15" y2="17" />
                </svg>
              </div>
              <h3 className="pillar-title">PANTRY STAPLES</h3>
              <p className="pillar-desc">
                The everyday products households need to keep their kitchens stocked.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="daily-pillar-card">
              <div className="pillar-icon-badge" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <h3 className="pillar-title">TRUSTED BRANDS</h3>
              <p className="pillar-desc">
                A carefully selected range of familiar and reliable food brands.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="daily-pillar-card">
              <div className="pillar-icon-badge" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="pillar-title">EVERYDAY CONVENIENCE</h3>
              <p className="pillar-desc">
                A simple destination for regular food shopping and replenishment.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="daily-pillar-card">
              <div className="pillar-icon-badge" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
              </div>
              <h3 className="pillar-title">VALUE YOU CAN RELY ON</h3>
              <p className="pillar-desc">
                Quality everyday products at accessible prices.
              </p>
            </div>
          </div>
        </div>

        {/* Brand Vision Card (Bottom of Page 1 PDF) */}
        <div className="daily-vision-section">
          <div className="daily-vision-box">
            <div className="vision-left-col">
              <div className="vision-target-wrap" aria-hidden="true">
                <img
                  src="/images/daily/icon-target-vision.png"
                  alt="Brand Vision Target Icon"
                  className="vision-target-img"
                  width="56"
                  height="56"
                />
              </div>
              <div className="vision-text-block">
                <span className="vision-eyebrow">BRAND VISION</span>
                <p className="vision-quote">
                  "To become the preferred destination for packaged food by offering trusted brands,
                  everyday convenience, and a complete range of pantry essentials for every household."
                </p>
              </div>
            </div>

            <div className="vision-right-col" aria-hidden="true">
              <span className="vision-tagline-kicker">SHOP · STOCK · NOURISH · BELONG</span>
              <span className="vision-footer-pill">FOOD ESSENTIALS FOR A BRIGHTER TOMORROW</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — OUR ASSORTMENT: "Everything your pantry needs."
          (From Page 2 of BOGO Daily PDF)
          ========================================================================= */}
      <section
        ref={assortmentRef}
        id="assortment"
        className="daily-assortment-section"
        aria-labelledby="assortment-heading"
      >
        <div className="daily-section-container">
          {/* Section Header with Store Interior visual */}
          <div className="daily-assortment-head">
            <div className="daily-assortment-info">
              <div className="daily-section-eyebrow">
                <span className="kicker-line" aria-hidden="true" />
                <span>OUR ASSORTMENT</span>
                <span className="assortment-page-num" aria-hidden="true">02 / 03</span>
              </div>
              <h2 id="assortment-heading" className="daily-section-title">
                Everything your pantry needs.
              </h2>
              <p className="daily-section-subline">
                BOGO Daily brings together the food categories that form the foundation of everyday
                household shopping — making it easier to stock, replenish and discover.
              </p>
            </div>

            {/* Store Interior Media from Page 2 PDF */}
            <div className="daily-assortment-store-visual">
              <div className="store-img-card">
                <img
                  src="/images/daily/store-daily-interior.png"
                  alt="BOGO Daily modern retail grocery store storefront and aisles"
                  className="store-interior-img"
                  loading="lazy"
                  width="480"
                  height="260"
                />
                <div className="store-img-overlay" aria-hidden="true">
                  <span className="store-kicker">GOOD FOOD · BRIGHTER DAYS</span>
                </div>
              </div>
            </div>
          </div>

          {/* 6 Category Cards Grid from Page 2 PDF */}
          <div className="daily-categories-grid" role="list">
            {DAILY_CATEGORIES.map((cat) => (
              <article
                key={cat.number}
                className="daily-category-card"
                role="listitem"
                tabIndex={0}
                aria-label={`${cat.number} ${cat.title}: ${cat.description}`}
              >
                <div className="cat-card-header">
                  <span className="cat-num-tag">{cat.number}</span>
                  <h3 className="cat-card-title">{cat.title}</h3>
                </div>

                <div className="cat-card-media">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="cat-card-img"
                    loading="lazy"
                    width="320"
                    height="190"
                  />
                </div>

                <div className="cat-card-body">
                  <div className="cat-icon-badge" aria-hidden="true">
                    {cat.icon}
                  </div>
                  <p className="cat-card-desc">{cat.description}</p>
                </div>
              </article>
            ))}
          </div>

          {/* ONE PANTRY. MANY NEEDS. Journey Bar (Bottom of Page 2 PDF) */}
          <div className="daily-journey-wrap">
            <div className="daily-journey-strip">
              <div className="journey-header">
                <span className="journey-kicker">ONE PANTRY. MANY NEEDS.</span>
              </div>

              <div className="journey-steps-grid">
                {/* Step 1 */}
                <div className="journey-step-item">
                  <div className="journey-step-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </div>
                  <div className="journey-step-content">
                    <h4 className="journey-step-title">STOCK</h4>
                    <p className="journey-step-desc">Get the essentials you need.</p>
                  </div>
                </div>

                <span className="journey-arrow" aria-hidden="true">›</span>

                {/* Step 2 */}
                <div className="journey-step-item">
                  <div className="journey-step-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                  </div>
                  <div className="journey-step-content">
                    <h4 className="journey-step-title">REPLENISH</h4>
                    <p className="journey-step-desc">Keep your pantry ready.</p>
                  </div>
                </div>

                <span className="journey-arrow" aria-hidden="true">›</span>

                {/* Step 3 */}
                <div className="journey-step-item">
                  <div className="journey-step-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <div className="journey-step-content">
                    <h4 className="journey-step-title">DISCOVER</h4>
                    <p className="journey-step-desc">Find familiar favourites and new choices.</p>
                  </div>
                </div>

                <span className="journey-arrow" aria-hidden="true">›</span>

                {/* Step 4 */}
                <div className="journey-step-item">
                  <div className="journey-step-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 4 23 10 17 10" />
                      <polyline points="1 20 1 14 7 14" />
                      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                    </svg>
                  </div>
                  <div className="journey-step-content">
                    <h4 className="journey-step-title">REPEAT</h4>
                    <p className="journey-step-desc">A simple, dependable shopping experience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — OUR PROMISE: "Good food starts with the essentials."
          (From Page 3 of BOGO Daily PDF)
          ========================================================================= */}
      <section
        ref={promiseRef}
        id="promise"
        className="daily-promise-section"
        aria-labelledby="promise-heading"
      >
        <div className="daily-section-container">
          <div className="daily-promise-grid">
            {/* Left Content Column */}
            <div className="daily-promise-content">
              <div className="daily-section-eyebrow">
                <span className="kicker-line" aria-hidden="true" />
                <span>OUR PROMISE</span>
                <span className="assortment-page-num" aria-hidden="true">03 / 03</span>
              </div>

              <h2 id="promise-heading" className="daily-promise-heading">
                Good food starts with the essentials.
              </h2>

              <p className="daily-promise-desc">
                BOGO Daily brings trusted packaged food essentials together — making everyday food
                shopping simpler, more convenient and more reliable.
              </p>

              {/* 4 Promise Pillars */}
              <div className="daily-promise-pillars-grid">
                <div className="promise-pillar-card">
                  <div className="promise-icon-pill" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                  </div>
                  <h4 className="promise-pillar-title">TRUSTED BRANDS</h4>
                  <p className="promise-pillar-desc">
                    A curated range from leading food brands.
                  </p>
                </div>

                <div className="promise-pillar-card">
                  <div className="promise-icon-pill" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 10h16l-2 10H6L4 10z" />
                      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
                      <line x1="9" y1="14" x2="9" y2="17" />
                      <line x1="12" y1="14" x2="12" y2="17" />
                      <line x1="15" y1="14" x2="15" y2="17" />
                    </svg>
                  </div>
                  <h4 className="promise-pillar-title">COMPLETE PANTRY</h4>
                  <p className="promise-pillar-desc">
                    Everything you need, in one place.
                  </p>
                </div>

                <div className="promise-pillar-card">
                  <div className="promise-icon-pill" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a10 10 0 0 0-7.07 17.07l.07.07 7-7 7 7 .07-.07A10 10 0 0 0 12 2z" />
                    </svg>
                  </div>
                  <h4 className="promise-pillar-title">QUALITY YOU CAN TRUST</h4>
                  <p className="promise-pillar-desc">
                    Products selected for freshness and safety.
                  </p>
                </div>

                <div className="promise-pillar-card">
                  <div className="promise-icon-pill" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                      <line x1="7" y1="7" x2="7.01" y2="7" />
                    </svg>
                  </div>
                  <h4 className="promise-pillar-title">EVERYDAY VALUE</h4>
                  <p className="promise-pillar-desc">
                    Great products. Everyday affordable.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Visual Column (Shopping Cart grocery bag from Page 3 PDF) */}
            <div className="daily-promise-visual">
              <div className="daily-promise-media-card">
                <img
                  src="/images/daily/promise-cart-bag.png"
                  alt="Grocery cart filled with fresh produce and Good Food Brighter Days grocery bag"
                  className="promise-cart-img"
                  loading="lazy"
                  width="500"
                  height="600"
                />
                <div className="promise-editorial-quote" aria-hidden="true">
                  <span className="quote-handwriting">Good Food · Brighter Days</span>
                  <span className="quote-sub">SHOP · STOCK · NOURISH · BELONG</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLOSING TAGLINE BANNER & BACK TO BRANDS
          (From Bottom of Page 3 PDF & BOGO Navigation Pattern)
          ========================================================================= */}
      <section className="daily-closing-section" aria-label="Explore BOGO Daily">
        <div className="daily-closing-banner">
          {/* Decorative subtle leaf motifs on outer edges */}
          <svg className="closing-deco-leaf left" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.5 2 2 6.5 2 12c4 0 7-3 8-7 1 4 4 7 8 7 0-5.5-4.5-10-6-10z" />
          </svg>
          <svg className="closing-deco-leaf right" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.5 2 2 6.5 2 12c4 0 7-3 8-7 1 4 4 7 8 7 0-5.5-4.5-10-6-10z" />
          </svg>

          {/* Left: Headline & Icon */}
          <div className="closing-headline-group">
            <div className="closing-icon-badge" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="closing-text-wrap">
              <h2 className="closing-heading">
                Everyday essentials for brighter days.
              </h2>
              <p className="closing-subtext">
                GOOD FOOD · GOOD PEOPLE · BRIGHTER DAYS
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="closing-actions-group">
            <button
              type="button"
              className="closing-secondary-link"
              onClick={handleBackToBrands}
              aria-label="Back to All Brands"
            >
              <span className="secondary-arrow" aria-hidden="true">←</span>
              <span>Back to All Brands</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
