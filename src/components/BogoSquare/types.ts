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
const iconBase = import.meta.env.DEV
  ? '/images/logo-icons/'
  : `${(import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')}images/logo-icons/`;

export interface ConvergenceBrand {
  name: string;
  color: string;
  angle: number;
  delay: number;
  icon: string;
  opticalScale: number;
}

export const CONVERGENCE_BRANDS: ConvergenceBrand[] = [
  { name: 'CLASSROOM', color: '#1E3A8A', angle: 286.36, delay: 0.03, icon: `${iconBase}Classroom.webp`, opticalScale: 1.0 },
  { name: 'SUPERFOODS', color: '#1565C0', angle: 319.09, delay: 0.09, icon: `${iconBase}Superfoods.webp`, opticalScale: 0.98 },
  { name: 'PAWS', color: '#EF6C00', angle: 351.82, delay: 0.06, icon: `${iconBase}Paws.webp`, opticalScale: 0.96 },
  { name: 'DIVINE', color: '#B78103', angle: 24.55, delay: 0.04, icon: `${iconBase}Divine.webp`, opticalScale: 1.08 },
  { name: 'ESSENTIALS', color: '#00838F', angle: 57.27, delay: 0, icon: `${iconBase}Essentials.webp`, opticalScale: 1.0 },
  { name: 'DAILY', color: '#E65100', angle: 90.0, delay: 0.05, icon: `${iconBase}Daily.webp`, opticalScale: 1.02 },
  { name: 'FARMS', color: '#2E7D32', angle: 122.73, delay: 0.1, icon: `${iconBase}Farms.webp`, opticalScale: 1.16 },
  { name: 'HEALTH', color: '#0097A7', angle: 155.45, delay: 0.02, icon: `${iconBase}Health.webp`, opticalScale: 0.9 },
  { name: 'BEAUTY', color: '#C2185B', angle: 188.18, delay: 0.07, icon: `${iconBase}Beauty.webp`, opticalScale: 1.25 },
  { name: 'LUXE', color: '#6A1B9A', angle: 220.91, delay: 0.04, icon: `${iconBase}Luxe.webp`, opticalScale: 1.08 },
  { name: 'PLAY', color: '#D84315', angle: 253.64, delay: 0.08, icon: `${iconBase}Play.webp`, opticalScale: 0.86 },
];


