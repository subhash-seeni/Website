export interface SquareExperience {
  id: string;
  number: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  coords: {
    x: number; // percentage horizontally (0-100)
    y: number; // percentage vertically (0-100)
  };
}

export const SQUARE_EXPERIENCES: SquareExperience[] = [
  {
    id: 'shop',
    number: '01',
    name: 'SHOP',
    category: 'FLAGSHIP STORES',
    tagline: 'All 11 In-House Brands',
    description: 'Explore and shop the complete catalog of all 11 BOGO brands in expansive, dedicated brand pavilions.',
    coords: { x: 8.5, y: 49.5 },
  },
  {
    id: 'dine',
    number: '02',
    name: 'DINE',
    category: 'CULINARY TERRACES',
    tagline: 'Farm-Fresh Dining',
    description: 'Farm-to-table organic cafes, artisanal bakeries, and open-air dining terraces powered by fresh BOGO produce.',
    coords: { x: 17.5, y: 49.5 },
  },
  {
    id: 'wellness',
    number: '03',
    name: 'WELLNESS',
    category: 'HOLISTIC HEALTH',
    tagline: 'Wellness & Skincare Lounge',
    description: 'Personalized wellness consultations, clean skincare testing counters, and organic nutritional guidance.',
    coords: { x: 27.5, y: 49.5 },
  },
  {
    id: 'lifestyle',
    number: '04',
    name: 'LIFESTYLE',
    category: 'HOME & COMPANIONS',
    tagline: 'Modern Living & Pet Care',
    description: 'Curated home décor galleries, sustainable kitchen setups, and dedicated pet nutrition and care stations.',
    coords: { x: 74.5, y: 49.5 },
  },
  {
    id: 'discover',
    number: '05',
    name: 'DISCOVER',
    category: 'INNOVATION ATRIUM',
    tagline: 'Interactive Learning & Play',
    description: 'Hands-on children’s STEM labs, interactive sensory exhibits, and weekend learning workshops.',
    coords: { x: 84.8, y: 49.5 },
  },
  {
    id: 'experience',
    number: '06',
    name: 'EXPERIENCE',
    category: 'COMMUNITY PLAZA',
    tagline: 'Live Events & Culture',
    description: 'Central open-air amphitheater hosting weekend farmers markets, live cooking demonstrations, and cultural events.',
    coords: { x: 94.2, y: 49.5 },
  },
];

export const CONVERGENCE_BRANDS = [
  { name: 'ESSENTIALS', color: '#00838F', angle: 25, delay: 0 },
  { name: 'DAILY', color: '#E65100', angle: 60, delay: 0.05 },
  { name: 'FARMS', color: '#2E7D32', angle: 100, delay: 0.1 },
  { name: 'HEALTH', color: '#1565C0', angle: 140, delay: 0.02 },
  { name: 'BEAUTY', color: '#0097A7', angle: 175, delay: 0.07 },
  { name: 'LUXE', color: '#C2185B', angle: 215, delay: 0.04 },
  { name: 'PLAY', color: '#6A1B9A', angle: 250, delay: 0.08 },
  { name: 'CLASSROOM', color: '#B78103', angle: 290, delay: 0.03 },
  { name: 'SUPERFOODS', color: '#EF6C00', angle: 320, delay: 0.09 },
  { name: 'PAWS', color: '#D84315', angle: 345, delay: 0.06 },
  { name: 'DIVINE', color: '#1E3A8A', angle: 10, delay: 0.04 },
];
