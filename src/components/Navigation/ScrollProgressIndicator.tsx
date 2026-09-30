import React, { useEffect, useState } from 'react';
import { navigationConfig, navigateToDestination, type NavItem } from '../../config/navigation';
import './ScrollProgressIndicator.css';

export const ScrollProgressIndicator: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const sections: NavItem[] = navigationConfig.main;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      setProgress(currentProgress);

      // Determine active section based on bounding rect
      let activeIdx = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].targetId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If section top has entered or is covering the upper third of screen
          if (rect.top <= window.innerHeight * 0.45) {
            activeIdx = i;
          }
        }
      }
      setActiveSectionIndex(activeIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const activeSection = sections[activeSectionIndex] || sections[0];

  const handleSectionClick = (item: NavItem) => {
    navigateToDestination(item);
    setIsExpanded(false);
  };

  return (
    <>
      {/* 1. Ultra-fine top global progress bar */}
      <div className="bogo-global-progress-track" aria-hidden="true">
        <div
          className="bogo-global-progress-bar"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* 2. Floating Minimal Architectural Section HUD */}
      <aside
        className={`bogo-nav-hud ${isExpanded ? 'is-expanded' : ''}`}
        aria-label="Section Navigation"
      >
        <button
          type="button"
          className="bogo-hud-current-badge"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label={`Current Section: ${activeSection.label}. Click to ${isExpanded ? 'collapse' : 'expand'} quick navigation.`}
        >
          <span className="bogo-hud-index">
            {String(activeSectionIndex + 1).padStart(2, '0')}
            <span className="bogo-hud-total"> / {String(sections.length).padStart(2, '0')}</span>
          </span>
          <span className="bogo-hud-dot" aria-hidden="true" />
          <span className="bogo-hud-name">{activeSection.label}</span>
          <span className="bogo-hud-toggle-icon" aria-hidden="true">
            {isExpanded ? '×' : '⋯'}
          </span>
        </button>

        {/* Expandable Fast-Skip Drawer */}
        <div className="bogo-hud-drawer" aria-hidden={!isExpanded}>
          <div className="bogo-hud-drawer-header">
            <span className="bogo-hud-drawer-title">FAST NAVIGATION</span>
            <span className="bogo-hud-drawer-sub">SKIP SCROLL-LOCKED SECTIONS</span>
          </div>
          <div className="bogo-hud-sections-list">
            {sections.map((item, idx) => {
              const isActive = idx === activeSectionIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`bogo-hud-sec-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleSectionClick(item)}
                >
                  <span className="bogo-hud-sec-num">0{idx + 1}</span>
                  <span className="bogo-hud-sec-label">{item.label}</span>
                  {isActive && <span className="bogo-hud-sec-active-glyph" aria-hidden="true">●</span>}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};
