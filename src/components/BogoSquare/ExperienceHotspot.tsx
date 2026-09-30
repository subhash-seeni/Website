import React from 'react';
import type { SquareExperience } from './types';

interface ExperienceHotspotProps {
  experience: SquareExperience;
  isActive: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
}

export const ExperienceHotspot: React.FC<ExperienceHotspotProps> = ({
  experience,
  isActive,
  isHovered,
  onHover,
  onClick,
}) => {
  const isSelected = isActive || isHovered;

  return (
    <div
      className={`bogo-square-hotspot ${isSelected ? 'is-active' : ''}`}
      style={{
        left: `${experience.coords.x}%`,
        top: `${experience.coords.y}%`,
      }}
      onMouseEnter={() => onHover(experience.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(experience.id)}
      role="button"
      tabIndex={0}
      aria-label={`Explore ${experience.name} — ${experience.tagline}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(experience.id);
        }
      }}
    >
      {/* Target Radar Halo */}
      <div className="bogo-hotspot-radar" />
      <div className="bogo-hotspot-core-dot" />

      {/* Subtle Storefront Sign Highlight Frame */}
      <div className="bogo-hotspot-frame" />

      {/* Floating Architectural Callout Tag */}
      <div className="bogo-hotspot-callout">
        <div className="bogo-hotspot-hairline" />
        <div className="bogo-hotspot-tag-body">
          <div className="bogo-hotspot-meta">
            <span className="bogo-hotspot-num">{experience.number}</span>
            <span className="bogo-hotspot-sep">//</span>
            <span className="bogo-hotspot-name">{experience.name}</span>
          </div>
          <div className="bogo-hotspot-tagline">{experience.tagline}</div>
        </div>
      </div>
    </div>
  );
};
