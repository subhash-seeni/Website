import React, { useEffect, useState } from 'react';

interface EcosystemPathsProps {
  progress: number; // 0 to 1 overall hero scroll progress
}

interface PillarItem {
  id: string;
  name: string;
  index: string;
  startX: number;
  startY: number;
  anchorX: number;
  anchorY: number;
  textX: number;
  textY: number;
  textAnchor: 'middle' | 'start' | 'end';
  startColor: string;
  endColor: string;
}

/**
 * 5 Ecosystem Pillars — Desktop Layout (1600x900 coordinate space)
 */
const DESKTOP_PILLARS: PillarItem[] = [
  {
    id: 'technology',
    name: 'TECHNOLOGY',
    index: '01',
    startX: 800,
    startY: 385,
    anchorX: 800,
    anchorY: 235,
    textX: 800,
    textY: 202,
    textAnchor: 'middle',
    startColor: '#0e294e',
    endColor: '#0284c7', // Luminous Cyan
  },
  {
    id: 'brands',
    name: 'BRANDS',
    index: '02',
    startX: 680,
    startY: 405,
    anchorX: 470,
    anchorY: 310,
    textX: 450,
    textY: 310,
    textAnchor: 'end',
    startColor: '#f78634', // Brand Orange
    endColor: '#ea580c',
  },
  {
    id: 'retail',
    name: 'RETAIL',
    index: '03',
    startX: 920,
    startY: 405,
    anchorX: 1130,
    anchorY: 310,
    textX: 1150,
    textY: 310,
    textAnchor: 'start',
    startColor: '#0e294e', // Brand Navy
    endColor: '#2563eb', // Royal Blue
  },
  {
    id: 'partnerships',
    name: 'PARTNERSHIPS',
    index: '04',
    startX: 680,
    startY: 475,
    anchorX: 470,
    anchorY: 575,
    textX: 450,
    textY: 575,
    textAnchor: 'end',
    startColor: '#f78634',
    endColor: '#059669', // Emerald Growth Green
  },
  {
    id: 'distribution',
    name: 'DISTRIBUTION',
    index: '05',
    startX: 920,
    startY: 475,
    anchorX: 1130,
    anchorY: 575,
    textX: 1150,
    textY: 575,
    textAnchor: 'start',
    startColor: '#0e294e',
    endColor: '#0284c7', // Connected Mobility Cyan
  },
];

/**
 * 5 Ecosystem Pillars — Mobile Portrait Layout (800x1100 coordinate space)
 * Optimized for vertical viewports so labels never clip or become unreadable.
 */
const MOBILE_PILLARS: PillarItem[] = [
  {
    id: 'technology',
    name: 'TECHNOLOGY',
    index: '01',
    startX: 400,
    startY: 450,
    anchorX: 400,
    anchorY: 275,
    textX: 400,
    textY: 232,
    textAnchor: 'middle',
    startColor: '#0e294e',
    endColor: '#0284c7',
  },
  {
    id: 'brands',
    name: 'BRANDS',
    index: '02',
    startX: 320,
    startY: 470,
    anchorX: 180,
    anchorY: 370,
    textX: 160,
    textY: 370,
    textAnchor: 'end',
    startColor: '#f78634',
    endColor: '#ea580c',
  },
  {
    id: 'retail',
    name: 'RETAIL',
    index: '03',
    startX: 480,
    startY: 470,
    anchorX: 620,
    anchorY: 370,
    textX: 640,
    textY: 370,
    textAnchor: 'start',
    startColor: '#0e294e',
    endColor: '#2563eb',
  },
  {
    id: 'partnerships',
    name: 'PARTNERSHIPS',
    index: '04',
    startX: 320,
    startY: 530,
    anchorX: 180,
    anchorY: 630,
    textX: 160,
    textY: 630,
    textAnchor: 'end',
    startColor: '#f78634',
    endColor: '#059669',
  },
  {
    id: 'distribution',
    name: 'DISTRIBUTION',
    index: '05',
    startX: 480,
    startY: 530,
    anchorX: 620,
    anchorY: 630,
    textX: 640,
    textY: 630,
    textAnchor: 'start',
    startColor: '#0e294e',
    endColor: '#0284c7',
  },
];

export const EcosystemPaths: React.FC<EcosystemPathsProps> = ({ progress }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // STAGE 1 (0% to 18%): Complete whitespace.
  if (progress < 0.18) return null;

  // STAGE 2 (18% to 42%): Glowing lines emerge smoothly from infinity
  const linesProgress = Math.min(1, Math.max(0, (progress - 0.18) / 0.22));

  // STAGE 3 (36% to 58%): Text fades in gracefully and locks
  const textProgress = Math.min(1, Math.max(0, (progress - 0.36) / 0.20));

  // TRANSITION TO COLLECTION (74% to 98%):
  // Other pillars fade softly; BRANDS stays prominent as the gateway
  const otherPillarsFade = progress > 0.74 ? Math.max(0, 1 - (progress - 0.74) / 0.14) : 1;
  const brandsPillarFade = progress > 0.86 ? Math.max(0, 1 - (progress - 0.86) / 0.12) : 1;

  const pillars = isMobile ? MOBILE_PILLARS : DESKTOP_PILLARS;
  const viewBox = isMobile ? '0 0 800 1100' : '0 0 1600 900';

  // Sizing tokens scaled for mobile vs desktop SVG viewports
  const strokeHaloWidth = isMobile ? 8 : 5;
  const strokeCoreWidth = isMobile ? 2.8 : 1.75;
  const beaconHaloRadius = isMobile ? 10 : 7;
  const beaconCoreRadius = isMobile ? 4.5 : 3.5;
  const fontSizeMain = isMobile ? 20 : 14.5;

  return (
    <svg
      className="bogo-svg-ecosystem-overlay"
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      style={{
        pointerEvents: 'none',
      }}
    >
      <defs>
        {/* Gradients matching each pillar and the BOGO infinity lobes */}
        {pillars.map((p) => (
          <linearGradient
            key={`glow-grad-${p.id}`}
            id={`glow-grad-${p.id}`}
            x1={p.startX}
            y1={p.startY}
            x2={p.anchorX}
            y2={p.anchorY}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={p.startColor} stopOpacity="0.4" />
            <stop offset="40%" stopColor={p.endColor} stopOpacity="0.75" />
            <stop offset="100%" stopColor={p.endColor} stopOpacity="0.95" />
          </linearGradient>
        ))}
      </defs>

      {pillars.map((pillar, idx) => {
        const isBrandPillar = pillar.id === 'brands';
        const transitionOpacity = isBrandPillar ? brandsPillarFade : otherPillarsFade;

        const lineP = Math.min(1, Math.max(0, (linesProgress - idx * 0.06) / 0.72));
        if (lineP <= 0 || transitionOpacity <= 0) return null;

        const curX = pillar.startX + (pillar.anchorX - pillar.startX) * lineP;
        const curY = pillar.startY + (pillar.anchorY - pillar.startY) * lineP;
        const fadeP = Math.min(1, Math.max(0, (textProgress - idx * 0.05) / 0.75)) * transitionOpacity;

        return (
          <g key={pillar.id} className={`bogo-pillar-text-group pillar-${pillar.id}`}>
            {/* 1. Ambient Glow Halo Stroke (Wide & Soft) */}
            <line
              x1={pillar.startX}
              y1={pillar.startY}
              x2={curX}
              y2={curY}
              stroke={`url(#glow-grad-${pillar.id})`}
              strokeWidth={strokeHaloWidth}
              strokeLinecap="round"
              opacity={0.3 * transitionOpacity}
            />

            {/* 2. Core Solid Glowing Gradient Line */}
            <line
              x1={pillar.startX}
              y1={pillar.startY}
              x2={curX}
              y2={curY}
              stroke={`url(#glow-grad-${pillar.id})`}
              strokeWidth={isBrandPillar && progress > 0.70 ? strokeCoreWidth * 1.4 : strokeCoreWidth}
              strokeLinecap="round"
              opacity={0.9 * transitionOpacity}
            />

            {/* 3. Travelling Energy Particle along the line */}
            {lineP > 0.4 && (
              <line
                x1={pillar.startX}
                y1={pillar.startY}
                x2={curX}
                y2={curY}
                stroke="#ffffff"
                strokeWidth={strokeCoreWidth * 1.3}
                strokeLinecap="round"
                strokeDasharray="25 300"
                strokeDashoffset={-300 * ((progress * 3.5 + idx * 0.2) % 1)}
                opacity={0.85 * transitionOpacity}
              />
            )}

            {/* 4. Glowing Anchor Beacon Node */}
            {lineP > 0.7 && (
              <g transform={`translate(${curX}, ${curY})`} opacity={lineP * transitionOpacity}>
                {/* Soft outer glow ring */}
                <circle cx="0" cy="0" r={beaconHaloRadius} fill={pillar.endColor} opacity="0.22" />
                {/* Core dot */}
                <circle cx="0" cy="0" r={beaconCoreRadius} fill={pillar.endColor} />
                <circle cx="0" cy="0" r={beaconCoreRadius * 0.4} fill="#ffffff" />
              </g>
            )}

            {/* 5. Pure Architectural Typography (No Pills) */}
            {fadeP > 0.02 && lineP >= 0.85 && (
              <g
                className="bogo-pillar-label-item"
                opacity={fadeP}
                style={{
                  transform: `translate(0, ${(1 - fadeP) * 5}px)`,
                  transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
                }}
              >
                <text
                  x={pillar.textX}
                  y={pillar.textY}
                  textAnchor={pillar.textAnchor}
                  dominantBaseline={pillar.textAnchor === 'middle' ? 'auto' : 'central'}
                  fill={isBrandPillar && progress > 0.70 ? '#e26b18' : '#0e294e'}
                  fontSize={fontSizeMain}
                  fontWeight="800"
                  letterSpacing="0.24em"
                  fontFamily="var(--font-family-sans)"
                  style={{
                    transition: 'fill 0.3s ease',
                  }}
                >
                  {pillar.name}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};
