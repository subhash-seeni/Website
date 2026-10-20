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
  brands: string[];
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'food-staples',
    title: 'Food & Pantry Staples',
    description: 'Everyday breakfast, snacks, spices, rice, tea, and kitchen essentials.',
    image: '/images/essentials/cat-food-staples.jpg',
    brands: ["Lay's", "Kellogg's", 'Coca-Cola', 'Tropicana', 'Maggi', 'Nutella', 'Good Day', 'India Gate', 'Tata Salt', 'Tata Tea'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    id: 'personal-care',
    title: 'Personal & Hygiene Care',
    description: 'Daily body wash, oral hygiene, lotions, soaps, and grooming staples.',
    image: '/images/essentials/cat-personal-care.jpg',
    brands: ['Dove', 'NIVEA', "L'Oréal", 'Garnier', 'Dettol', 'Pantene', 'Colgate', 'Gillette', 'Always'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    id: 'beauty-skincare',
    title: 'Beauty & Skincare',
    description: 'Face washes, revitalizing serums, day creams, and beauty essentials.',
    image: '/images/essentials/cat-beauty-skincare.jpg',
    brands: ["L'Oréal Paris", 'Maybelline New York', 'Garnier Skin Naturals', 'Lakmé 9to5', 'Lakmé Absolute'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    id: 'nutrition-wellness',
    title: 'Health & Nutrition',
    description: 'Nutritional drinks, wellness cereals, proteins, muesli, and vitality boosters.',
    image: '/images/essentials/cat-nutrition-wellness.jpg',
    brands: ['Horlicks', 'Optimum Nutrition (ON)', 'MyProtein', 'Ensure', 'BournVita', 'Nature Valley', 'Nutrilite'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: 'cleaning-laundry',
    title: 'Cleaning & Household Care',
    description: 'Surface disinfectants, detergents, floor cleaners, and home hygiene supplies.',
    image: '/images/essentials/cat-cleaning.jpg',
    brands: ['Colin', 'Harpic', 'Vim Dishwash', 'Lizol', 'Ariel', 'Surf Excel', 'Comfort'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'pet-care',
    title: 'Pet Care & Nutrition',
    description: 'Nutritious pet foods, treats, grooming shampoos, and playful pet essentials.',
    image: '/images/essentials/cat-pet-care.jpg',
    brands: ['Purina Pro Plan', 'Pedigree', 'Whiskas', 'Royal Canin', 'Himalaya Pet', 'Furminator', 'Greenies', 'Fancy Feast'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="4" r="2" />
        <circle cx="18" cy="8" r="2" />
        <circle cx="4" cy="8" r="2" />
        <path d="M12 10a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4z" />
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

      // 3. Closing CTA banner reveal
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
                src="/images/essentials/hero-store.png"
                alt="BOGO Essentials modern retail store interior with organized shelves and aisles"
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

      {/* SECTION C — CLOSING CTA */}
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
