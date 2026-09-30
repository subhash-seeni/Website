import React from 'react';
import type { SquareExperience } from './types';
import { SQUARE_EXPERIENCES } from './types';

interface ExperienceNavProps {
  activeId: string;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export const ExperienceNav: React.FC<ExperienceNavProps> = ({
  activeId,
  hoveredId,
  onSelect,
  onHover,
}) => {
  const currentExperience: SquareExperience =
    SQUARE_EXPERIENCES.find((exp) => exp.id === (hoveredId || activeId)) ||
    SQUARE_EXPERIENCES[0];

  return (
    <div className="bogo-square-exp-nav-container">
      {/* Experience Tabs Header */}
      <div className="bogo-square-exp-pills" role="tablist" aria-label="BOGO Square Experience Zones">
        {SQUARE_EXPERIENCES.map((exp) => {
          const isSelected = exp.id === (hoveredId || activeId);
          return (
            <button
              key={exp.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`bogo-exp-tab ${isSelected ? 'is-active' : ''}`}
              onClick={() => onSelect(exp.id)}
              onMouseEnter={() => onHover(exp.id)}
              onMouseLeave={() => onHover(null)}
            >
              <span className="bogo-exp-tab-num">{exp.number}</span>
              <span className="bogo-exp-tab-name">{exp.name}</span>
              {isSelected && <span className="bogo-exp-tab-line" />}
            </button>
          );
        })}
      </div>

      {/* Active Zone Editorial Detail Strip */}
      <div className="bogo-square-exp-detail">
        <div className="bogo-square-exp-category">{currentExperience.category}</div>
        <div className="bogo-square-exp-desc">{currentExperience.description}</div>
      </div>
    </div>
  );
};
