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
    tagline: 'From Large Retail Destinations...',
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
    scaleLabel: 'DISTRIBUTION & LOGISTICS',
    tagline: 'Connecting products to people.',
    subtitle: 'The integrated supply chain network moving goods seamlessly from suppliers to retail stores and partners.',
  },
];

