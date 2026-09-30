import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bogoLogoLightImg from '../../assets/Bogo-light.png';
import { navigationConfig, navigateToDestination, type NavItem } from '../../config/navigation';
import './BogoFooter.css';

gsap.registerPlugin(ScrollTrigger);

export const BogoFooter: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // Subtle reveal animations on scroll
      gsap.set('.bogo-footer-brand', { opacity: 0, y: 20 });
      gsap.set('.bogo-footer-nav-wrap', { opacity: 0, y: 20 });
      gsap.set('.bogo-footer-link', { opacity: 0, y: 14 });
      gsap.set('.bogo-footer-bottom', { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to('.bogo-footer-brand', {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
      })
        .to(
          '.bogo-footer-nav-wrap',
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.35'
        )
        .to(
          '.bogo-footer-link',
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.03,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          '.bogo-footer-bottom',
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.2'
        );
    }, footerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    navigateToDestination(item);
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Exactly the 8 links from Explore in the main menu
  const exploreLinks = navigationConfig.main;

  return (
    <footer className="bogo-footer" ref={footerRef} id="bogo-footer">
      {/* Subtle organic noise overlay */}
      <div className="bogo-footer-grain" aria-hidden="true" />

      {/* Elegant transition hairline */}
      <div className="bogo-footer-top-edge" aria-hidden="true" />

      <div className="bogo-footer-inner">
        {/* Minimal Main Row: Brand on left, 8 Explore links on right */}
        <div className="bogo-footer-main">
          {/* Brand Identity */}
          <div className="bogo-footer-brand">
            <a
              href="#bogo-hero-section"
              className="bogo-footer-logo-link"
              onClick={handleScrollToTop}
              aria-label="BOGO — Back to top"
            >
              <img
                src={bogoLogoLightImg}
                alt="BOGO"
                className="bogo-footer-logo"
                loading="lazy"
              />
            </a>
            <p className="bogo-footer-tagline">
              Building India's Next Retail Ecosystem.
            </p>
          </div>

          {/* Minimal 8 Links Navigation */}
          <div className="bogo-footer-nav-wrap">
            <span className="bogo-footer-nav-kicker">EXPLORE</span>
            <nav className="bogo-footer-nav-grid" aria-label="Explore Navigation">
              {exploreLinks.map((item, idx) => (
                <a
                  key={item.id}
                  href={`#${item.targetId}`}
                  className="bogo-footer-link"
                  onClick={(e) => handleNavClick(e, item)}
                >
                  <span className="bogo-footer-link-idx">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="bogo-footer-link-text">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="bogo-footer-bottom">
          <div className="bogo-footer-bottom-divider" aria-hidden="true" />
          <div className="bogo-footer-bottom-row">
            <span className="bogo-footer-copy">© 2026 BOGO · ALL RIGHTS RESERVED</span>
            <button
              type="button"
              className="bogo-footer-top-btn"
              onClick={handleScrollToTop}
              aria-label="Scroll back to top"
            >
              <span>BACK TO TOP</span>
              <span className="bogo-footer-top-arrow" aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
