import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import bogoLogoLightImg from '../../assets/Bogo-light.png';
import { navigationConfig, navigateToDestination, type NavItem } from '../../config/navigation';
import { stopScroll, startScroll } from '../../utils/smoothScroll';
import './BogoMenu.css';

export const BogoMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent background scrolling while menu is open
  useEffect(() => {
    if (isOpen) {
      stopScroll();
      document.body.style.overflow = 'hidden';
    } else {
      startScroll();
      document.body.style.overflow = '';
    }
    return () => {
      startScroll();
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Master GSAP open/close animation
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isOpen) {
      setIsAnimating(true);
      // Ensure overlay is visible before animating
      overlay.style.display = 'flex';

      // Initial element states for entry
      gsap.set(overlay, { opacity: 0 });
      gsap.set('.bogo-menu-backdrop', { scaleY: 0, transformOrigin: 'top center' });
      gsap.set('.bogo-menu-header', { opacity: 0, y: -20 });
      gsap.set('.bogo-menu-main-item', { opacity: 0, x: -24 });
      gsap.set('.bogo-menu-accent-bar', { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('.bogo-menu-subcol', { opacity: 0, y: 24 });
      gsap.set('.bogo-menu-footer-bar', { opacity: 0, y: 15 });

      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
        },
      });

      timelineRef.current = tl;

      // 1. Dark navy backdrop curtain reveals
      tl.to(overlay, { opacity: 1, duration: 0.15, ease: 'none' })
        .to(
          '.bogo-menu-backdrop',
          {
            scaleY: 1,
            duration: 0.5,
            ease: 'power4.out',
          },
          0
        )
        // 2. Menu Header
        .to(
          '.bogo-menu-header',
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          },
          0.15
        )
        // 3. Small orange accent bar reveals
        .to(
          '.bogo-menu-accent-bar',
          {
            scaleX: 1,
            duration: 0.4,
            ease: 'power3.out',
          },
          0.2
        )
        // 4. Main navigation items reveal sequentially with stagger
        .to(
          '.bogo-menu-main-item',
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            stagger: 0.04,
            ease: 'power3.out',
          },
          0.22
        )
        // 5. Secondary category columns reveal
        .to(
          '.bogo-menu-subcol',
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: 'power3.out',
          },
          0.32
        )
        // 6. Bottom info bar
        .to(
          '.bogo-menu-footer-bar',
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
          },
          0.45
        );
    }
  }, [isOpen]);

  const handleCloseMenu = (callback?: () => void) => {
    const overlay = overlayRef.current;
    if (!overlay) {
      setIsOpen(false);
      if (callback) callback();
      return;
    }

    setIsAnimating(true);
    // Smooth cinematic reverse timeline
    gsap.to(['.bogo-menu-subcol', '.bogo-menu-main-item', '.bogo-menu-footer-bar'], {
      opacity: 0,
      y: -12,
      duration: 0.22,
      stagger: 0.015,
      ease: 'power2.in',
    });

    gsap.to('.bogo-menu-backdrop', {
      scaleY: 0,
      duration: 0.35,
      delay: 0.12,
      ease: 'power3.in',
      onComplete: () => {
        overlay.style.display = 'none';
        setIsOpen(false);
        setIsAnimating(false);
        if (callback) callback();
      },
    });
  };

  const handleToggle = () => {
    if (isAnimating) return;
    if (isOpen) {
      handleCloseMenu();
    } else {
      setIsOpen(true);
    }
  };

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    handleCloseMenu(() => {
      // Small timeout allows overlay exit animation to complete before scrolling
      setTimeout(() => {
        navigateToDestination(item);
      }, 80);
    });
  };

  return (
    <>
      {/* ===================================================================
          TOP-RIGHT HAMBURGER BUTTON (FIXED ACROSS HOMEPAGE)
          =================================================================== */}
      <button
        type="button"
        className={`bogo-menu-trigger ${isOpen ? 'is-active' : ''}`}
        onClick={handleToggle}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="bogo-fullscreen-nav"
      >
        <span className="bogo-trigger-dot" aria-hidden="true" />
        <span className="bogo-trigger-text">{isOpen ? 'CLOSE' : 'MENU'}</span>
        <span className="bogo-trigger-glyph" aria-hidden="true">
          <span className="glyph-bar bar-1" />
          <span className="glyph-bar bar-2" />
        </span>
      </button>

      {/* ===================================================================
          FULL-SCREEN CINEMATIC NAVIGATION OVERLAY
          =================================================================== */}
      <div
        id="bogo-fullscreen-nav"
        className={`bogo-fullscreen-nav ${isOpen ? 'is-open' : ''}`}
        ref={overlayRef}
        style={{ display: 'none' }}
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
      >
        {/* Full-width dark navy backdrop curtain */}
        <div className="bogo-menu-backdrop" aria-hidden="true" />

        {/* Subtle organic noise overlay */}
        <div className="bogo-menu-grain" aria-hidden="true" />

        <div className="bogo-menu-container">
          {/* Top Brand & Context Row */}
          <div className="bogo-menu-header">
            <a
              href="/"
              className="bogo-menu-brand-link"
              onClick={(e) => {
                e.preventDefault();
                handleCloseMenu(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                });
              }}
              aria-label="BOGO — Home"
            >
              <img
                src={bogoLogoLightImg}
                alt="BOGO"
                className="bogo-menu-logo"
              />
            </a>

            <div className="bogo-menu-telemetry">
              <span className="bogo-telemetry-dot" />
              <span className="bogo-telemetry-text">THE CONNECTED RETAIL ECOSYSTEM</span>
            </div>
          </div>

          {/* Accent hairline */}
          <div className="bogo-menu-accent-bar" aria-hidden="true" />

          {/* Main Architectural Navigation Canvas */}
          <div className="bogo-menu-canvas">
            {/* COLUMN 1: MAIN EXPLORATION */}
            <div className="bogo-menu-main-col">
              <span className="bogo-menu-col-kicker">EXPLORE</span>
              <ul className="bogo-menu-main-list">
                {navigationConfig.main.map((item, idx) => (
                  <li key={item.id} className="bogo-menu-main-item">
                    <a
                      href={`#${item.targetId}`}
                      className="bogo-menu-main-link"
                      onClick={(e) => handleItemClick(e, item)}
                    >
                      <span className="bogo-main-link-num">0{idx + 1}</span>
                      <span className="bogo-main-link-label">{item.label}</span>
                      <span className="bogo-main-link-arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 2: ECOSYSTEM & PROGRAMMES */}
            <div className="bogo-menu-secondary-col">
              {/* GROUP 1: ECOSYSTEM */}
              <div className="bogo-menu-subcol">
                <span className="bogo-menu-col-kicker">ECOSYSTEM</span>
                <ul className="bogo-menu-sublist">
                  {navigationConfig.ecosystem.map((item) => (
                    <li key={item.id} className="bogo-menu-subitem">
                      <a
                        href={`#${item.targetId}`}
                        className="bogo-menu-sublink"
                        onClick={(e) => handleItemClick(e, item)}
                      >
                        <span className="bogo-sublink-title">{item.label}</span>
                        <span className="bogo-sublink-arrow">→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* GROUP 2: PROGRAMMES */}
              <div className="bogo-menu-subcol">
                <span className="bogo-menu-col-kicker">PROGRAMMES</span>
                <ul className="bogo-menu-sublist">
                  {navigationConfig.programmes.map((item) => (
                    <li key={item.id} className="bogo-menu-subitem">
                      <a
                        href={`#${item.targetId}`}
                        className="bogo-menu-sublink"
                        onClick={(e) => handleItemClick(e, item)}
                      >
                        <span className="bogo-sublink-title">{item.label}</span>
                        <span className="bogo-sublink-arrow">→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* COLUMN 3: COLLECTION (11 BRANDS) */}
            <div className="bogo-menu-collection-col bogo-menu-subcol">
              <span className="bogo-menu-col-kicker">COLLECTION</span>
              <ul className="bogo-menu-brands-grid">
                {navigationConfig.collectionBrands.map((brand) => (
                  <li key={brand.id} className="bogo-menu-brand-item">
                    <a
                      href={`#${brand.targetId}`}
                      className="bogo-menu-brand-link-item"
                      onClick={(e) => handleItemClick(e, brand)}
                    >
                      <span className="brand-dot" />
                      <span className="brand-name">{brand.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Architectural Info Row */}
          <div className="bogo-menu-footer-bar">
            <span className="bogo-menu-copy">© 2026 BOGO</span>
            <span className="bogo-menu-tagline">
              BUILDING INDIA'S NEXT RETAIL ECOSYSTEM.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
