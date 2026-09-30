import React from 'react';
import type { BrandItem } from './types';

interface BrandTileProps {
  brand: BrandItem;
  itemIndex?: number;
  totalInSet?: number;
}

export const BrandTile: React.FC<BrandTileProps> = ({ brand, itemIndex, totalInSet }) => {
  return (
    <div className={`bogo-brand-tile tile-${brand.id}`} data-brand-id={brand.id}>
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
