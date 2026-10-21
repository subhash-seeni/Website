import React from 'react';
import type { BrandItem } from './types';
import { navigateToDestination } from '../../config/navigation';

interface BrandTileProps {
  brand: BrandItem;
  itemIndex?: number;
  totalInSet?: number;
}

export const BrandTile: React.FC<BrandTileProps> = ({ brand, itemIndex, totalInSet }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (brand.id === 'essentials') {
      navigateToDestination({
        id: 'brand-essentials',
        label: 'BOGO Essentials',
        path: '/brands/essentials',
        targetId: 'bogo-essentials-page',
      });
      return;
    }
    if (brand.id === 'daily') {
      navigateToDestination({
        id: 'brand-daily',
        label: 'BOGO Daily',
        path: '/brands/daily',
        targetId: 'bogo-daily-page',
      });
      return;
    }
    // For other brands, navigate to the Brands directory
    navigateToDestination({
      id: 'eco-brands',
      label: 'Brands',
      path: '/ecosystem/brands',
      targetId: 'bogo-brands-page',
    });
  };

  return (
    <div
      className={`bogo-brand-tile tile-${brand.id} is-clickable`}
      data-brand-id={brand.id}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent);
        }
      }}
      aria-label={`View details for ${brand.name}`}
    >
      {/* Subtle brand color hairline accent */}
      <div
        className="bogo-tile-accent-line"
        style={{
          background: `linear-gradient(90deg, ${brand.color} 0%, rgba(14, 41, 78, 0.08) 100%)`,
        }}
      />

      {/* Item Index Telemetry (e.g. 01 / 04) */}
      {itemIndex && (
        <div className="bogo-tile-index-tag">
          <span className="bogo-tile-index-num">
            {String(itemIndex).padStart(2, '0')}
          </span>
          {totalInSet && (
            <span className="bogo-tile-index-total">
              /{String(totalInSet).padStart(2, '0')}
            </span>
          )}
        </div>
      )}

      {/* Authentic Brand Logo */}
      <div className="bogo-tile-logo-wrapper">
        <img
          src={brand.logo}
          alt={brand.name}
          className="bogo-tile-logo-img"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Brand Statement & Tagline */}
      <div className="bogo-tile-info">
        <h3 className="bogo-tile-statement">{brand.statement}</h3>
        <p className="bogo-tile-tagline">{brand.tagline}</p>
      </div>

      {/* Brand Identifier Pill */}
      <div className="bogo-tile-footer">
        <span
          className="bogo-tile-brand-pill"
          style={{ borderColor: `${brand.color}35`, color: brand.color }}
        >
          {brand.name}
        </span>
      </div>
    </div>
  );
};

