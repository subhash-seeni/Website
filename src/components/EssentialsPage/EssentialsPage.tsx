import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navigateToDestination } from '../../config/navigation';
import './EssentialsPage.css';

gsap.registerPlugin(ScrollTrigger);

interface CategoryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'bath-body',
    title: 'Bath & Body Care',
    description: 'Everyday bathing and body-care necessities.',
    image: '/images/essentials/cat-bath-body.jpg',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    id: 'hair-care',
    title: 'Hair Care',
    description: 'Products for everyday hair-care routines.',
    image: '/images/essentials/cat-hair-care.jpg',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 3v18" />
        <path d="M12 3v18" />
        <path d="M17 3v18" />
        <path d="M3 8h18" />
      </svg>
    ),
  },
  {
    id: 'oral-care',
    title: 'Oral Care',
    description: 'Daily oral-hygiene essentials.',
    image: '/images/essentials/cat-oral-care.jpg',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8 2 6 5 6 9c0 5 2 13 6 13s6-8 6-13c0-4-2-7-6-7z" />
        <path d="M9 10c0-1.5 1.3-2 3-2s3 .5 3 2" />
      </svg>
    ),
  },
  {
    id: 'cleaning',
    title: 'Household Cleaning',
    description: 'Cleaning products for everyday home care.',
    image: '/images/essentials/cat-cleaning.jpg',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'laundry',
    title: 'Laundry & Fabric Care',
    description: 'Essentials for keeping clothes fresh and clean.',
    image: '/images/essentials/cat-laundry.jpg',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    id: 'home-essentials',
    title: 'Home & Hygiene Essentials',
    description: 'Everyday necessities for a comfortable, clean home.',
    image: '/images/essentials/cat-home-essentials.jpg',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    ),
  },
];

export const EssentialsPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Scroll smoothly to top on initial page mount
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set('.essentials-anim', { opacity: 1, y: 0, scale: 1 });
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
          '.hero-tagline-anim',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.5'
        )
        .fromTo(
          '.hero-intro-anim',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.45'
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

      // 2. Category Cards ScrollTrigger reveal
      const categoryCards = gsap.utils.toArray<HTMLElement>('.essentials-category-card');
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
              stagger: 0.1,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          },
          once: true,
        });
      }

      // 3. Promise Section progressive reveal
      const promiseTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.essentials-promise-section',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      promiseTimeline
        .fromTo(
          '.promise-title-anim',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6 }
        )
        .fromTo(
          '.promise-benefit-anim',
          { opacity: 0, x: -25 },
          { opacity: 1, x: 0, duration: 0.55, stagger: 0.12 },
          '-=0.3'
        )
        .fromTo(
          '.promise-visual-anim',
          { opacity: 0, scale: 0.93, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8 },
          '-=0.5'
        );

      // 4. Vision Section reveal
      gsap.fromTo(
        '.essentials-vision-card',
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.essentials-vision-section',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 5. Closing CTA banner reveal
      gsap.fromTo(
        '.essentials-closing-banner',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.essentials-closing-section',
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

  const handleScrollToCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    if (categoriesRef.current) {
      categoriesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      className="bogo-essentials-page"
      ref={containerRef}
      id="bogo-essentials-page"
      role="main"
      aria-label="BOGO Essentials Brand Page"
    >
      {/* Subtle organic noise grain overlay */}
      <div className="essentials-grain" aria-hidden="true" />

      {/* Top Header / Breadcrumb Bar */}
      <header className="essentials-header-bar">
        <div className="essentials-header-inner">
          <nav className="essentials-breadcrumbs" aria-label="Breadcrumb navigation">
            <a
              href="/"
              onClick={handleReturnHome}
              className="essentials-crumb-link"
              aria-label="Navigate to Home"
            >
              <span>HOME</span>
            </a>
            <span className="essentials-crumb-sep" aria-hidden="true">/</span>
            <a
              href="/ecosystem/brands"
              onClick={handleBackToBrands}
              className="essentials-crumb-link"
              aria-label="Navigate to Brands Directory"
            >
              <span>BRANDS</span>
            </a>
            <span className="essentials-crumb-sep" aria-hidden="true">/</span>
            <span className="essentials-crumb-current">BOGO ESSENTIALS</span>
          </nav>

          <div className="essentials-header-tag">
            <span className="essentials-pulse-dot" />
            <span>01 / 11 · EVERYDAY LIVING</span>
          </div>
        </div>
      </header>

      {/* SECTION A — HERO */}
      <section className="essentials-hero" aria-labelledby="essentials-hero-heading">
        <div className="essentials-hero-inner">
          {/* Left Column: Editorial Information */}
          <div className="essentials-hero-content">
            <div className="essentials-eyebrow hero-eyebrow-anim">
              <span>EVERYDAY LIVING</span>
            </div>

            <h1 id="essentials-hero-heading" className="essentials-hero-heading hero-heading-anim">
              Everyday Essentials for Every Home.
            </h1>

            <p className="essentials-hero-tagline hero-tagline-anim">
              Everyday Needs, All in One Place.
            </p>

            <p className="essentials-hero-intro hero-intro-anim">
              BOGO Essentials brings together household and personal care products families use
              every day, focusing on quality, convenience, and value.
            </p>

            <div className="hero-cta-anim">
              <button
                type="button"
                className="essentials-primary-cta"
                onClick={handleScrollToCategories}
                aria-label="Explore Essentials categories"
              >
                <span>Explore Essentials</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Product Basket Image */}
          <div className="essentials-hero-visual hero-visual-anim">
            <div className="essentials-hero-glow" aria-hidden="true" />
            <div className="essentials-hero-media-wrap">
              <img
                src="/images/essentials/hero-essentials.png"
                alt="BOGO Essentials household and personal care products including cleaning supplies and bath essentials"
                className="essentials-hero-img"
                loading="eager"
                width="660"
                height="360"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B — EXPLORE OUR CATEGORIES */}
      <section
        ref={categoriesRef}
        id="categories"
        className="essentials-categories-section"
        aria-labelledby="categories-heading"
      >
        <div className="essentials-section-container">
          <div className="essentials-section-head">
            <div>
              <span className="essentials-kicker">WHAT YOU'LL FIND</span>
              <h2 id="categories-heading" className="essentials-section-title">
                Explore Our Categories
              </h2>
            </div>
            <a
              href="#categories"
              onClick={handleScrollToCategories}
              className="essentials-view-all-link"
              aria-label="View all 6 categories"
            >
              <span>View All Categories</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="essentials-categories-grid" role="list">
            {CATEGORIES.map((cat) => (
              <article
                key={cat.id}
                className="essentials-category-card"
                role="listitem"
                tabIndex={0}
                aria-label={`${cat.title}: ${cat.description}`}
              >
                <div className="cat-card-media">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="cat-card-img"
                    loading="lazy"
                    width="394"
                    height="200"
                  />
                </div>
                <div className="cat-card-body">
                  <div className="cat-icon-badge" aria-hidden="true">
                    {cat.icon}
                  </div>
                  <div className="cat-card-text">
                    <h3 className="cat-title">{cat.title}</h3>
                    <p className="cat-desc">{cat.description}</p>
                  </div>
                  <div className="cat-arrow-cue" aria-hidden="true">
                    <span>→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION C — OUR PROMISE */}
      <section className="essentials-promise-section" aria-labelledby="promise-heading">
        <div className="essentials-section-container">
          <div className="essentials-promise-card-shell">
            <div className="essentials-promise-grid">
              {/* Left Column: Benefits List */}
              <div className="essentials-promise-content">
                <div className="promise-title-anim">
                  <span className="essentials-kicker">OUR PROMISE</span>
                  <h2 id="promise-heading" className="essentials-promise-title">
                    Why Choose BOGO Essentials?
                  </h2>
                </div>

                <div className="essentials-benefits-list">
                  <div className="benefit-item promise-benefit-anim">
                    <div className="benefit-icon-box" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <div className="benefit-text-box">
                      <h3 className="benefit-headline">Trusted Everyday Brands</h3>
                      <p className="benefit-copy">
                        A carefully selected range of reliable brands.
                      </p>
                    </div>
                  </div>

                  <div className="benefit-item promise-benefit-anim">
                    <div className="benefit-icon-box" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                        <line x1="7" y1="7" x2="7.01" y2="7" />
                      </svg>
                    </div>
                    <div className="benefit-text-box">
                      <h3 className="benefit-headline">Value for Every Household</h3>
                      <p className="benefit-copy">
                        Everyday essentials at competitive prices.
                      </p>
                    </div>
                  </div>

                  <div className="benefit-item promise-benefit-anim">
                    <div className="benefit-icon-box" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                    <div className="benefit-text-box">
                      <h3 className="benefit-headline">Always Within Reach</h3>
                      <p className="benefit-copy">
                        Keeping household necessities accessible for everyday family needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Imagery & Callout */}
              <div className="essentials-promise-visual-side promise-visual-anim">
                <div className="promise-handwritten-note">
                  <span>Simple choices.</span>
                  <span>A healthier, happier home.</span>
                </div>
                <div className="promise-image-frame">
                  <img
                    src="/images/essentials/promise-basket.png"
                    alt="Woven basket with daily personal care and hygiene essentials"
                    className="promise-art-img"
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D — OUR VISION */}
      <section className="essentials-vision-section" aria-labelledby="vision-heading">
        <div className="essentials-section-container">
          <div className="essentials-vision-card">
            {/* Left: Family Lifestyle Imagery */}
            <div className="vision-image-col">
              <img
                src="/images/essentials/vision-family.png"
                alt="A warm family with fresh laundry towels embracing quality home living"
                className="vision-lifestyle-img"
                loading="lazy"
                width="520"
                height="325"
              />
            </div>

            {/* Right: Vision Copy */}
            <div className="vision-text-col">
              <span className="essentials-kicker">OUR VISION</span>
              <h2 id="vision-heading" className="essentials-vision-title">
                Everyday Essentials for Stronger Families.
              </h2>
              <p className="essentials-vision-desc">
                To become every household's trusted destination for daily essentials by delivering
                quality, convenience, and value in every shopping experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E — CLOSING CTA */}
      <section className="essentials-closing-section" aria-label="Explore BOGO Essentials">
        <div className="essentials-closing-banner">
          {/* Decorative subtle leaf motifs on outer edges */}
          <svg className="closing-deco-leaf left" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.5 2 2 6.5 2 12c4 0 7-3 8-7 1 4 4 7 8 7 0-5.5-4.5-10-6-10z" />
          </svg>
          <svg className="closing-deco-leaf right" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
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
            <h2 className="closing-heading">
              Everything your home needs, all in one place.
            </h2>
          </div>

          {/* Right: Actions */}
          <div className="closing-actions-group">
            <button
              type="button"
              className="essentials-primary-cta"
              onClick={handleScrollToCategories}
              aria-label="Explore Essentials categories"
            >
              <span>Explore Essentials</span>
              <span className="cta-arrow" aria-hidden="true">→</span>
            </button>

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
