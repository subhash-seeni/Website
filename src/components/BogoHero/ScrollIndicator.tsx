import React from 'react';

interface ScrollIndicatorProps {
  opacity?: number;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ opacity = 1 }) => {
  return (
    <div 
      className="bogo-scroll-indicator" 
      style={{ opacity, pointerEvents: opacity <= 0.05 ? 'none' : 'auto' }}
      aria-label="Scroll to discover"
    >
      <span className="bogo-scroll-label">SCROLL</span>
      <div className="bogo-scroll-arrow-wrapper">
        <svg 
          className="bogo-scroll-arrow" 
          width="12" 
          height="14" 
          viewBox="0 0 12 14" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M6 1V11M6 11L1.5 6.5M6 11L10.5 6.5" 
            stroke="currentColor" 
            strokeWidth="1.25" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};
