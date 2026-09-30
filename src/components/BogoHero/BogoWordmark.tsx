import React from 'react';

interface BogoWordmarkProps {
  progress: number;            // 0 to 1 overall scroll progress
  wordmarkOpacity: number;     // 1 to 0
  outerLettersOffset: number;  // px translation for B and second O drifting outward
  gBarProgress: number;        // 1 (full bar) to 0 (retracted bar)
}

/**
 * Authentic BOGO Wordmark
 * B and Green O fade out as scroll reveals the 5-pillar ecosystem constellation,
 * and the state remains locked without reverting back to the simple logo.
 */
export const BogoWordmark: React.FC<BogoWordmarkProps> = ({
  progress,
  wordmarkOpacity,
  outerLettersOffset,
  gBarProgress,
}) => {
  // STAGE 1: 0% to 20% -> Opacity = 1
  // STAGE 2: 20% to 42% -> Fades out as the infinity and 5 pillars awaken
  // 42% to 100% -> Stays cleanly hidden so the 5-pillar constellation remains the final hero state
  let outerOpacity = 1;
  if (progress > 0.20 && progress <= 0.42) {
    outerOpacity = 1 - (progress - 0.20) / 0.22;
  } else if (progress > 0.42) {
    outerOpacity = 0;
  }

  const finalOuterOpacity = Math.max(0, Math.min(1, outerOpacity * wordmarkOpacity));
  const barOpacity = Math.max(0, Math.min(1, gBarProgress * wordmarkOpacity));

  return (
    <div className="bogo-authentic-wordmark-container">
      {/* Letter 'B' (Navy #0e294e) */}
      <div
        className="bogo-layer-letter-b"
        style={{
          transform: `translateX(${-outerLettersOffset}px)`,
          opacity: finalOuterOpacity,
          transition: 'transform 0.05s ease-out, opacity 0.1s ease-out',
        }}
      >
        <img
          src="/images/bogo/bogo-b.png"
          alt="B"
          className="bogo-img-letter-b"
          draggable={false}
        />
      </div>

      {/* Trailing Letter 'O' (Green #4e8e3b) */}
      <div
        className="bogo-layer-letter-o"
        style={{
          transform: `translateX(${outerLettersOffset}px)`,
          opacity: finalOuterOpacity,
          transition: 'transform 0.05s ease-out, opacity 0.1s ease-out',
        }}
      >
        <img
          src="/images/bogo/bogo-green-o.png"
          alt="O"
          className="bogo-img-letter-o"
          draggable={false}
        />
      </div>

      {/* Crossbar of 'G' inside the right loop — dissolves into pure infinity */}
      {barOpacity > 0.01 && (
        <div
          className="bogo-layer-g-bar"
          style={{
            opacity: barOpacity,
            transform: `scaleX(${gBarProgress})`,
            transformOrigin: 'right center',
            transition: 'transform 0.05s ease-out',
          }}
        >
          <img
            src="/images/bogo/bogo-g-bar.png"
            alt=""
            className="bogo-img-g-bar"
            draggable={false}
          />
        </div>
      )}
    </div>
  );
};
