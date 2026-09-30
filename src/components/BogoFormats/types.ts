export interface RetailFormat {
  id: 'square' | 'bazaar' | 'mini' | 'go';
  name: string;
  scaleLabel: string;
  tagline: string;
  subtitle: string;
  imageSrc?: string;
}

export const RETAIL_FORMATS: RetailFormat[] = [
  {
    id: 'square',
    name: 'BOGO SQUARE',
    scaleLabel: 'FLAGSHIP DESTINATION',
    tagline: 'From Destinations...',
    subtitle: '30,000+ sq ft regional landmark uniting all 11 brands, experiential dining, and community culture.',
  },
  {
    id: 'bazaar',
    name: 'BOGO BAZAAR',
    scaleLabel: 'COMMUNITY SUPERMARKET',
    tagline: 'Weekly groceries, closer to home.',
    subtitle: '10,000–15,000 sq ft supermarkets offering farm-fresh produce, bakery, and full-basket pantries.',
  },
  {
    id: 'mini',
    name: 'BOGO MINI',
    scaleLabel: 'NEIGHBORHOOD EXPRESS',
    tagline: 'Everyday essentials. Five minutes in and out.',
    subtitle: '2,000–4,000 sq ft quick-stop stores right on your block for instant daily top-ups and snacks.',
  },
  {
    id: 'go',
    name: 'BOGO GO',
    scaleLabel: '10-MINUTE INSTANT COMMERCE',
    tagline: 'From shelf to doorstep.',
    subtitle: '10-minute ultra-fast doorstep delivery dispatched directly from our local store network.',
  },
];

export const BAZAAR_ZONES = [
  { name: 'FRESH PRODUCE', x: 37, y: 60, desc: 'Farm-direct organic harvest within 24h' },
  { name: 'PANTRY & GRAINS', x: 46, y: 60, desc: 'Cold-pressed oils, grains & daily staples' },
  { name: 'CLEAN CARE', x: 55, y: 60, desc: 'Toxin-free personal care & home hygiene' },
  { name: 'BAKERY & DAIRY', x: 65, y: 60, desc: 'Fresh daily breads & organic dairy' },
];
