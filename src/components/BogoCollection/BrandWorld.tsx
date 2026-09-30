import React from 'react';
import type { BrandItem } from './types';

interface BrandWorldProps {
  brand: BrandItem;
  index: number;
  total: number;
}

export const BrandWorld: React.FC<BrandWorldProps> = ({ brand, index, total }) => {
  return (
    <article className={`bogo-brand-world world-${brand.id}`} id={`brand-${brand.id}`}>
      <div 
        className="bogo-world-ambient" 
        style={{
          background: `radial-gradient(ellipse at 50% 45%, ${brand.color}15 0%, rgba(251, 251, 253, 0) 70%)`
        }} 
      />

      <div className="bogo-world-content">
        <div className="bogo-world-group-tag">
          <span className="bogo-world-counter">({index + 1} of {total})</span>
        </div>

        <div className="bogo-world-logo-wrapper">
          <img
            src={brand.logo}
            alt={brand.name}
            className="bogo-world-logo-img"
            loading="lazy"
            draggable={false}
          />
        </div>

        <div className="bogo-world-narrative">
          <h2 className="bogo-world-statement">{brand.statement}</h2>
          <p className="bogo-world-tagline">{brand.tagline}</p>
        </div>
      </div>
    </article>
  );
};
