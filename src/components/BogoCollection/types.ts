export interface BrandItem {
  id: string;
  name: string;
  statement: string;
  tagline: string;
  color: string;
  logo: string;
}

export interface BrandScreenSet {
  id: string;
  number: string;
  category: string;
  headline: string;
  subline: string;
  brands: BrandItem[];
}

export const BRAND_SCREENS: BrandScreenSet[] = [
  // SCREEN 1: 4 Brands (Everyday Essentials & Nutrition)
  {
    id: 'everyday',
    number: '01',
    category: 'EVERYDAY & NOURISHMENT',
    headline: 'DAILY LIVING, NOURISHMENT & FARM-FRESH PROVENANCE.',
    subline: 'The essential foundations of every modern household, delivered with uncompromising quality.',
    brands: [
      {
        id: 'essentials',
        name: 'BOGO Essentials',
        statement: 'EVERYDAY UTILITY.',
        tagline: 'Reliable household, kitchen, and hygiene staples crafted for durable daily use.',
        color: '#00838f',
        logo: '/images/logos/Essentials.png',
      },
      {
        id: 'daily',
        name: 'BOGO Daily',
        statement: 'EVERYDAY FOOD.',
        tagline: 'Fresh pantry staples, unpolished grains, and honest cooking essentials.',
        color: '#e65100',
        logo: '/images/logos/Daily.png',
      },
      {
        id: 'farms',
        name: 'BOGO Farms',
        statement: 'PURE & ORGANIC.',
        tagline: '100% certified organic produce and dairy, harvested direct from partner farms.',
        color: '#2e7d32',
        logo: '/images/logos/Farms.png',
      },
      {
        id: 'superfoods',
        name: 'BOGO Superfoods',
        statement: 'CLEAN NUTRITION.',
        tagline: 'Nutrient-dense superfoods, ancient grains, and natural plant-based nutrition.',
        color: '#1565c0',
        logo: '/images/logos/Superfoods.png',
      },
    ],
  },

  // SCREEN 2: 4 Brands (Wellness & Elevated Living)
  {
    id: 'wellness',
    number: '02',
    category: 'WELLNESS & ELEVATED LIVING',
    headline: 'HOLISTIC HEALTH, CLEAN CARE & REFINED LIVING.',
    subline: 'Preventative wellness, non-toxic skincare, and curated essentials for the modern home.',
    brands: [
      {
        id: 'health',
        name: 'BOGO Health',
        statement: 'ACTIVE VITALITY.',
        tagline: 'Preventative wellness, clean vitamins, and daily ayurvedic nutrition for active longevity.',
        color: '#0097a7',
        logo: '/images/logos/Health.png',
      },
      {
        id: 'beauty',
        name: 'BOGO Beauty',
        statement: 'CONSCIOUS CARE.',
        tagline: 'Dermatologist-tested skincare and body care, free from parabens and sulfates.',
        color: '#c2185b',
        logo: '/images/logos/Beauty.png',
      },
      {
        id: 'luxe',
        name: 'BOGO Luxe',
        statement: 'CURATED LIVING.',
        tagline: 'Thoughtfully crafted home décor, premium bed linens, and timeless lifestyle accents.',
        color: '#6a1b9a',
        logo: '/images/logos/Luxe.png',
      },
      {
        id: 'divine',
        name: 'BOGO Divine',
        statement: 'SACRED MOMENTS.',
        tagline: 'Pure puja oils, temple-grade natural agarbatti, and sacred devotional brassware.',
        color: '#b78103',
        logo: '/images/logos/Divine.png',
      },
    ],
  },

  // SCREEN 3: 3 Brands (Life, Companions & Discovery)
  {
    id: 'family',
    number: '03',
    category: 'LIFE, COMPANIONS & DISCOVERY',
    headline: 'JOYFUL LIVING, CREATIVE PLAY & FUTURE LEARNING.',
    subline: 'Ecosystem experiences nurturing family pets and curious, growing young minds.',
    brands: [
      {
        id: 'paws',
        name: 'BOGO Paws',
        statement: 'TOTAL NOURISHMENT.',
        tagline: 'Complete biological pet food, wholesome natural treats, and mindful grooming care.',
        color: '#ef6c00',
        logo: '/images/logos/Paws.png',
      },
      {
        id: 'play',
        name: 'BOGO Play',
        statement: 'IMAGINATIVE PLAY.',
        tagline: 'Safe, tactile physical toys and activities that spark children’s natural curiosity.',
        color: '#d84315',
        logo: '/images/logos/Play.png',
      },
      {
        id: 'classroom',
        name: 'BOGO Classroom',
        statement: 'FUTURE LEARNING.',
        tagline: 'Hands-on STEM learning kits and experiential developmental tools for young explorers.',
        color: '#1e3a8a',
        logo: '/images/logos/Classroom.png',
      },
    ],
  },
];
