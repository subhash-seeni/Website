import React from 'react';

interface InfinityMarkProps {
  progress: number;            // Overall scroll progress (0 to 1)
  connectionProgress: number;  // 0 to 1 (connection forming)
  infinityScale: number;       // e.g. 1.0 to 1.38
  opacity: number;             // Overall opacity
}

/**
 * Authentic BOGO Infinity Metaphor:
 * The connective tissue of the entire ecosystem.
 * Clean, razor-sharp vector graphic with zero muddy drop shadows.
 */
export const InfinityMark: React.FC<InfinityMarkProps> = ({
  progress,
  connectionProgress,
  infinityScale = 1,
  opacity = 1,
}) => {
  return (
    <div
      className="bogo-authentic-infinity-container"
      style={{
        transform: `scale(${infinityScale})`,
        transformOrigin: 'center center',
        opacity: opacity,
        transition: 'transform 0.05s ease-out',
      }}
    >
      {/* 1. Authentic Infinity Graphic (from Bogo.png) — Crisp & Clean */}
      <img
        src="/images/bogo/bogo-infinity.png"
        alt="BOGO Connective Tissue"
        className="bogo-img-infinity-core"
        draggable={false}
      />

      {/* 2. Living Center Crossing Node Indicator */}
      {connectionProgress > 0.08 && progress < 0.90 && (
        <div
          className="bogo-infinity-center-node"
          style={{
            opacity: Math.min(1, connectionProgress * 1.3),
            transform: `translate(-50%, -50%) scale(${0.8 + connectionProgress * 0.4})`,
          }}
        >
          <div className="bogo-node-core-glow" />
        </div>
      )}
    </div>
  );
};
