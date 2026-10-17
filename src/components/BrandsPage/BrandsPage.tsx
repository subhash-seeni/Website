import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRANDS_DATA, type BrandCategoryItem } from './brandsData';
import { navigateToDestination } from '../../config/navigation';
import './BrandsPage.css';

gsap.registerPlugin(ScrollTrigger);

export const BrandsPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const orbitTrackRef = useRef<HTMLDivElement>(null);
  const orbitTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<'all' | 'everyday' | 'wellness' | 'family'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<BrandCategoryItem | null>(null);
  const [hoveredOrbitBrand, setHoveredOrbitBrand] = useState<BrandCategoryItem | null>(null);

  // Filtered list preserving exact specified order
  const displayedBrands = useMemo(() => {
    return BRANDS_DATA.filter((brand) => {
      const matchesFilter =
        activeFilter === 'all' || brand.categoryGroup === activeFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Master GSAP Animations & Interactions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set('.hero-anim, .brands-card, .orbit-node', {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Hero Content Entrance Timeline
      const heroTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      heroTl
        .fromTo(
          '.brands-hero-eyebrow',
          { opacity: 0, y: 18, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.1, ease: 'back.out(1.5)' }
        )
        .fromTo(
          '.hero-title-row',
          { opacity: 0, y: 32, skewY: 1.5 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.8, stagger: 0.12 },
          '-=0.45'
        )
        .fromTo(
          '.brands-hero-sub',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          '.brands-stat-item',
          { opacity: 0, y: 16, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.2)' },
          '-=0.45'
        )
        .fromTo(
          '.brands-hero-visual',
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
          '-=0.7'
        )
        .fromTo(
          '.brands-toolbar-wrap',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.35'
        );

      // 2. Continuous 360-degree Brand Orbit Rotation (Slower & Silky Smooth)
      const track = orbitTrackRef.current;
      if (track) {
        const orbitTl = gsap.timeline({
          repeat: -1,
          defaults: { ease: 'none' },
        });
        orbitTimelineRef.current = orbitTl;

        // Smooth 360-degree Brand Orbit Track Rotation (calibrated to 85s for graceful readability)
        orbitTl.to(
          track,
          {
            rotation: 360,
            duration: 85,
            ease: 'none',
            force3D: true,
          },
          0
        );

        // Counter-rotate each node in lockstep so logos and numbers remain perfectly upright
        orbitTl.to(
          '.orbit-node-inner',
          {
            rotation: -360,
            duration: 85,
            ease: 'none',
            force3D: true,
          },
          0
        );
      }

      // 3. Staggered reveal for Brand Cards using ScrollTrigger
      const cards = gsap.utils.toArray<HTMLElement>('.brands-card');
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 35, scale: 0.97 });

        ScrollTrigger.batch(cards, {
          start: 'top 88%',
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
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 180);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // Animate cards on filter change
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll('.brands-card');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 22, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power2.out',
          overwrite: 'auto',
          clearProps: 'transform',
        }
      );
    }
  }, [activeFilter, searchQuery]);

  // Modal Animation & ESC Key
  useEffect(() => {
    if (selectedBrand && modalCardRef.current) {
      gsap.fromTo(
        modalCardRef.current,
        { opacity: 0, scale: 0.92, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.3)' }
      );
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedBrand) {
        setSelectedBrand(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBrand]);

  // Orbit Speed Controls on Hover (Cushioned Inertial Deceleration)
  const handleOrbitMouseEnter = () => {
    if (orbitTimelineRef.current) {
      gsap.to(orbitTimelineRef.current, {
        timeScale: 0.12,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleOrbitMouseLeave = () => {
    if (orbitTimelineRef.current) {
      gsap.to(orbitTimelineRef.current, {
        timeScale: 1,
        duration: 1.2,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });
    }
    setHoveredOrbitBrand(null);
  };

  const handleOrbitNodeClick = (brandId: string) => {
    const cardEl = document.getElementById(`brand-card-${brandId}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Flash highlight on the card
      gsap.fromTo(
        cardEl,
        { boxShadow: '0 0 0 4px #f78634, 0 16px 36px rgba(14, 41, 78, 0.16)' },
        { boxShadow: '0 4px 20px rgba(14, 41, 78, 0.035)', duration: 1.5, ease: 'power2.out' }
      );
    }
  };

  // Card Hover Handlers using GSAP
  const handleCardMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector<HTMLElement>('.card-featured-img');
    const arrow = card.querySelector<HTMLElement>('.btn-arrow');
    const dot = card.querySelector<HTMLElement>('.card-color-indicator');
    const line = card.querySelector<HTMLElement>('.card-accent-hairline');

    gsap.to(card, {
      y: -8,
      boxShadow: '0 18px 40px rgba(14, 41, 78, 0.10), 0 2px 10px rgba(0, 0, 0, 0.02)',
      duration: 0.32,
      ease: 'power2.out',
    });
    if (img) {
      gsap.to(img, { scale: 1.09, y: -4, duration: 0.4, ease: 'power2.out' });
    }
    if (arrow) {
      gsap.to(arrow, { x: 5, duration: 0.22, ease: 'power2.out' });
    }
    if (dot) {
      gsap.to(dot, { scale: 1.4, duration: 0.22, ease: 'back.out(2)' });
    }
    if (line) {
      gsap.to(line, { scaleX: 1, duration: 0.32, ease: 'power3.out' });
    }
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector<HTMLElement>('.card-featured-img');
    const arrow = card.querySelector<HTMLElement>('.btn-arrow');
    const dot = card.querySelector<HTMLElement>('.card-color-indicator');
    const line = card.querySelector<HTMLElement>('.card-accent-hairline');

    gsap.to(card, {
      y: 0,
      boxShadow: '0 4px 20px rgba(14, 41, 78, 0.035)',
      duration: 0.32,
      ease: 'power2.out',
    });
    if (img) {
      gsap.to(img, { scale: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    }
    if (arrow) {
      gsap.to(arrow, { x: 0, duration: 0.22, ease: 'power2.out' });
    }
    if (dot) {
      gsap.to(dot, { scale: 1, duration: 0.22, ease: 'power2.out' });
    }
    if (line) {
      gsap.to(line, { scaleX: 0.25, duration: 0.32, ease: 'power3.out' });
    }
  };

  const handleExploreBrand = (brand: BrandCategoryItem) => {
    setSelectedBrand(brand);
  };

  const handleNavigateToCollection = (brand: BrandCategoryItem) => {
    setSelectedBrand(null);
    navigateToDestination({
      id: brand.id,
      label: brand.name,
      path: `/collection/${brand.slug}`,
      targetId: 'bogo-collection-section',
      brandSet: brand.brandSet,
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
      className="bogo-brands-page"
      ref={containerRef}
      id="bogo-brands-page"
      role="main"
      aria-label="BOGO Brands Directory"
    >
      {/* Subtle organic noise grain overlay matching site design */}
      <div className="brands-page-grain" aria-hidden="true" />

      {/* Atmospheric ambient lighting gradients */}
      <div className="brands-ambient-glow glow-top" aria-hidden="true" />
      <div className="brands-ambient-glow glow-middle" aria-hidden="true" />

      {/* Top Breadcrumb & Architecture Nav Header */}
      <header className="brands-page-header">
        <div className="brands-header-inner">
          <nav className="brands-breadcrumbs" aria-label="Breadcrumb navigation">
            <a
              href="/"
              onClick={handleReturnHome}
              className="brands-crumb-link"
              aria-label="Navigate back to Home"
            >
              <span className="crumb-arrow" aria-hidden="true">←</span>
              <span>HOME</span>
            </a>
            <span className="crumb-separator" aria-hidden="true">/</span>
            <span className="brands-crumb-current">ECOSYSTEM</span>
            <span className="crumb-separator" aria-hidden="true">/</span>
            <span className="brands-crumb-active">BRANDS</span>
          </nav>

          <div className="brands-header-telemetry">
            <span className="brands-header-badge">
              <span className="badge-pulse-dot" />
              <span>11 CURATED SPECIALISMS</span>
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section: Editorial Left Content + Interactive Orbit Radar on Right */}
      <section className="brands-hero-section" ref={heroRef} aria-labelledby="brands-main-title">
        <div className="brands-hero-layout">
          {/* Left Column: Clean Editorial Content */}
          <div className="brands-hero-content">
            {/* Eyebrow */}
            <div className="brands-hero-eyebrow hero-anim">
              <span className="brands-eyebrow-dot" aria-hidden="true" />
              <span className="brands-eyebrow-text">THE BOGO ECOSYSTEM</span>
            </div>

            {/* Main Heading */}
            <h1 id="brands-main-title" className="brands-hero-title">
              <span className="hero-title-row hero-anim">One Ecosystem.</span>
              <span className="hero-title-row hero-anim brands-hero-highlight">Endless Discoveries.</span>
            </h1>

            {/* Supporting Text */}
            <p className="brands-hero-sub hero-anim">
              Explore a family of specialised brands designed to bring everyday essentials, wellness, beauty, learning, and lifestyle experiences together.
            </p>

            {/* Architectural Telemetry Stats Row */}
            <div className="brands-hero-stats-row hero-anim" role="region" aria-label="Ecosystem metrics">
              <div className="brands-stat-item">
                <span className="stat-number">11</span>
                <span className="stat-label">Category Brands</span>
              </div>
              <div className="stat-divider" aria-hidden="true" />
              <div className="brands-stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Quality Assured</span>
              </div>
              <div className="stat-divider" aria-hidden="true" />
              <div className="brands-stat-item">
                <span className="stat-number">3</span>
                <span className="stat-label">Retail Formats</span>
              </div>
              <div className="stat-divider" aria-hidden="true" />
              <div className="brands-stat-item">
                <span className="stat-number">1</span>
                <span className="stat-label">Unified Architecture</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Ecosystem Orbit Visualizer */}
          <div
            className="brands-hero-visual hero-anim"
            onMouseEnter={handleOrbitMouseEnter}
            onMouseLeave={handleOrbitMouseLeave}
            aria-label="Interactive Ecosystem Orbit"
          >
            <div className="brands-orbit-stage">
              {/* Concentric Decorative Rings */}
              <div className="orbit-ring ring-outer" aria-hidden="true" />
              <div className="orbit-ring ring-middle" aria-hidden="true" />
              <div className="orbit-ring ring-inner" aria-hidden="true" />

              {/* Central BOGO Hub */}
              <div className="orbit-center-hub">
                <div className="hub-pulse" aria-hidden="true" />
                <span className="hub-brand">BOGO</span>
                <span className="hub-desc">11 BRANDS</span>
              </div>

              {/* Orbiting Brand Nodes Track (GSAP Rotates 360deg) */}
              <div className="orbit-nodes-track" ref={orbitTrackRef}>
                {BRANDS_DATA.map((brand, idx) => {
                  const angle = (idx / BRANDS_DATA.length) * 360;
                  const radius = 148; // Distance from center hub
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.round(Math.cos(rad) * radius);
                  const y = Math.round(Math.sin(rad) * radius);
                  const isHovered = hoveredOrbitBrand?.id === brand.id;
                  // Always position the popover pointing outwards (away from center hub) so it never covers the BOGO center hub
                  const placementClass = y <= 0 ? 'placement-outward-top' : 'placement-outward-bottom';

                  return (
                    <div
                      key={brand.id}
                      className={`orbit-node ${isHovered ? 'is-hovered' : ''}`}
                      style={{
                        '--node-x': `${x}px`,
                        '--node-y': `${y}px`,
                        '--node-color': brand.accentColor,
                      } as React.CSSProperties}
                      onClick={() => handleOrbitNodeClick(brand.id)}
                      onMouseEnter={() => setHoveredOrbitBrand(brand)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Jump to ${brand.name}`}
                    >
                      <div className="orbit-node-inner">
                        <img
                          src={brand.image}
                          alt=""
                          className="orbit-node-img"
                          loading="lazy"
                        />

                        {/* Brand Details Tooltip corresponding directly to this node */}
                        {isHovered && (
                          <div
                            className={`orbit-node-popover ${placementClass}`}
                            style={{ '--popover-accent': brand.accentColor } as React.CSSProperties}
                          >
                            <span className="popover-name">{brand.name}</span>
                            <span className="popover-tagline">“{brand.tagline}”</span>
                            <span className="popover-cta">Click to explore ↓</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="orbit-hint-bar">
              <span className="hint-dot" aria-hidden="true" />
              <span className="hint-text">INTERACTIVE ECOSYSTEM RADAR · HOVER TO PAUSE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Directory Toolbar */}
      <section className="brands-directory-section" aria-label="Brand directory">
        <div className="brands-toolbar-wrap hero-anim">
          {/* Category Filter Pills */}
          <div className="brands-filter-group" role="tablist" aria-label="Filter brands by category">
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'all'}
              className={`brands-filter-btn ${activeFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Brands
              <span className="filter-count">11</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'everyday'}
              className={`brands-filter-btn ${activeFilter === 'everyday' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('everyday')}
            >
              Everyday & Food
              <span className="filter-count">4</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'wellness'}
              className={`brands-filter-btn ${activeFilter === 'wellness' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('wellness')}
            >
              Wellness & Beauty
              <span className="filter-count">4</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'family'}
              className={`brands-filter-btn ${activeFilter === 'family' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('family')}
            >
              Life & Learning
              <span className="filter-count">3</span>
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="brands-search-wrap">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              type="search"
              className="brands-search-input"
              placeholder="Filter by brand or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter brands by keyword"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search input"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Directory Telemetry Counter */}
        <div className="brands-directory-counter">
          <span className="counter-dot" aria-hidden="true" />
          <span className="counter-text">
            SHOWING {displayedBrands.length} OF {BRANDS_DATA.length} SPECIALISED BRANDS
          </span>
        </div>

        {/* Brand Cards Responsive Grid with GSAP Entrance & Tactile Micro-Interactions */}
        <div className="brands-grid" ref={gridRef} role="list">
          {displayedBrands.map((brand) => (
            <article
              key={brand.id}
              id={`brand-card-${brand.id}`}
              className="brands-card"
              role="listitem"
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              style={
                {
                  '--brand-color': brand.accentColor,
                  '--brand-bg-tint': brand.bgTint,
                  '--brand-border-tint': brand.borderTint,
                } as React.CSSProperties
              }
            >
              {/* Dynamic Accent Line that smoothly expands on hover */}
              <div
                className="card-accent-hairline"
                style={{
                  background: `linear-gradient(90deg, ${brand.accentColor} 0%, rgba(14, 41, 78, 0.08) 100%)`,
                }}
                aria-hidden="true"
              />

              {/* Card Header Telemetry */}
              <div className="card-top-bar">
                <span className="card-num">{brand.number}</span>
                <span className="card-category-tag">{brand.category}</span>
                <span
                  className="card-color-indicator"
                  style={{ backgroundColor: brand.accentColor }}
                  aria-hidden="true"
                />
              </div>

              {/* Visual Imagery Canvas with Interactive Zoom */}
              <div
                className="card-image-canvas"
                onClick={() => handleExploreBrand(brand)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleExploreBrand(brand);
                  }
                }}
                aria-label={`Preview ${brand.name}`}
              >
                <div
                  className="card-image-backdrop"
                  style={{ backgroundColor: brand.bgTint }}
                />
                <img
                  src={brand.image}
                  alt={`${brand.name} Category Art`}
                  className="card-featured-img"
                  loading="lazy"
                  width="180"
                  height="180"
                />
              </div>

              {/* Card Content Information */}
              <div className="card-body">
                <div className="card-identity-row">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} Wordmark`}
                    className="card-brand-logo"
                    loading="lazy"
                  />
                  <h2 className="card-brand-name">{brand.name}</h2>
                </div>

                <p className="card-tagline">“{brand.tagline}”</p>

                <p className="card-description">{brand.description}</p>
              </div>

              {/* Card Footer Interactive Link */}
              <div className="card-footer">
                <button
                  type="button"
                  className="card-explore-btn"
                  onClick={() => handleExploreBrand(brand)}
                  aria-label={`Explore ${brand.name}`}
                >
                  <span className="btn-text">Explore Brand</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {displayedBrands.length === 0 && (
          <div className="brands-no-results">
            <p className="no-results-title">No matching brands found</p>
            <p className="no-results-sub">
              Try adjusting your search query or clear the filter to view all 11 brands.
            </p>
            <button
              type="button"
              className="no-results-reset-btn"
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Brand Detail Modal / Drawer with GSAP Spring Entrance */}
      {selectedBrand && (
        <div
          className="brand-modal-overlay"
          onClick={() => setSelectedBrand(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-brand-title"
        >
          <div
            className="brand-modal-card"
            ref={modalCardRef}
            onClick={(e) => e.stopPropagation()}
            style={
              {
                '--modal-brand-color': selectedBrand.accentColor,
              } as React.CSSProperties
            }
          >
            {/* Modal Close Button */}
            <button
              type="button"
              className="brand-modal-close"
              onClick={() => setSelectedBrand(null)}
              aria-label="Close brand preview"
            >
              ×
            </button>

            {/* Modal Header */}
            <div className="modal-header">
              <span className="modal-num">{selectedBrand.number} / 11</span>
              <span className="modal-category">{selectedBrand.category}</span>
            </div>

            {/* Modal Visual Area */}
            <div
              className="modal-image-area"
              style={{ backgroundColor: selectedBrand.bgTint }}
            >
              <img
                src={selectedBrand.image}
                alt={`${selectedBrand.name} Showcase`}
                className="modal-art-img"
              />
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <div className="modal-identity">
                <img
                  src={selectedBrand.logo}
                  alt={`${selectedBrand.name} Logo`}
                  className="modal-brand-logo"
                />
                <h3 id="modal-brand-title" className="modal-title">
                  {selectedBrand.name}
                </h3>
              </div>

              <p className="modal-tagline">“{selectedBrand.tagline}”</p>
              <p className="modal-description">{selectedBrand.description}</p>

              <div className="modal-features-list">
                <div className="modal-feature-pill">
                  <span className="feature-dot" />
                  <span>Curated Quality</span>
                </div>
                <div className="modal-feature-pill">
                  <span className="feature-dot" />
                  <span>Transparent Sourcing</span>
                </div>
                <div className="modal-feature-pill">
                  <span className="feature-dot" />
                  <span>Fair Value Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-actions">
              <button
                type="button"
                className="modal-explore-collection-btn"
                onClick={() => handleNavigateToCollection(selectedBrand)}
              >
                <span>View in Ecosystem Collection</span>
                <span className="modal-btn-arrow" aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                className="modal-dismiss-btn"
                onClick={() => setSelectedBrand(null)}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
