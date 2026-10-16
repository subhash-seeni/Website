import essentialsImg from '../../assets/logo-icons/Essentials.webp';
import dailyImg from '../../assets/logo-icons/Daily.webp';
import farmsImg from '../../assets/logo-icons/Farms.webp';
import superfoodsImg from '../../assets/logo-icons/Superfoods.webp';
import pawsImg from '../../assets/logo-icons/Paws.webp';
import beautyImg from '../../assets/logo-icons/Beauty.webp';
import luxeImg from '../../assets/logo-icons/Luxe.webp';
import playImg from '../../assets/logo-icons/Play.webp';
import classroomImg from '../../assets/logo-icons/Classroom.webp';
import divineImg from '../../assets/logo-icons/Divine.webp';
import healthImg from '../../assets/logo-icons/Health.webp';

export interface BrandCategoryItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  categoryGroup: 'everyday' | 'wellness' | 'family';
  accentColor: string;
  bgTint: string;
  borderTint: string;
  image: string;
  logo: string;
  slug: string;
  brandSet: number;
}

const base = import.meta.env.BASE_URL;

export const BRANDS_DATA: BrandCategoryItem[] = [
  {
    id: 'brand-essentials',
    number: '01',
    name: 'BOGO Essentials',
    tagline: 'Everyday Needs, All in One Place.',
    description:
      'Find trusted household and personal care products, from hygiene essentials to home care necessities, for simpler and more comfortable everyday living.',
    category: 'Household & Hygiene',
    categoryGroup: 'everyday',
    accentColor: '#00838f',
    bgTint: 'rgba(0, 131, 143, 0.05)',
    borderTint: 'rgba(0, 131, 143, 0.22)',
    image: essentialsImg,
    logo: `${base}images/logos/Essentials.png`,
    slug: 'essentials',
    brandSet: 0,
  },
  {
    id: 'brand-daily',
    number: '02',
    name: 'BOGO Daily',
    tagline: 'Good Food for Every Day.',
    description:
      'Discover everyday groceries, pantry staples, snacks, and beverages that make shopping convenient and help keep every household stocked.',
    category: 'Groceries & Pantry',
    categoryGroup: 'everyday',
    accentColor: '#e65100',
    bgTint: 'rgba(230, 81, 0, 0.05)',
    borderTint: 'rgba(230, 81, 0, 0.22)',
    image: dailyImg,
    logo: `${base}images/logos/Daily.png`,
    slug: 'daily',
    brandSet: 0,
  },
  {
    id: 'brand-farms',
    number: '03',
    name: 'BOGO Farms',
    tagline: 'Naturally Better, Every Day.',
    description:
      'Explore organic produce and naturally sourced food products that celebrate freshness, mindful choices, and a more conscious way of living.',
    category: 'Organic & Farm Produce',
    categoryGroup: 'everyday',
    accentColor: '#2e7d32',
    bgTint: 'rgba(46, 125, 50, 0.05)',
    borderTint: 'rgba(46, 125, 50, 0.22)',
    image: farmsImg,
    logo: `${base}images/logos/Farms.png`,
    slug: 'farms',
    brandSet: 0,
  },
  {
    id: 'brand-superfoods',
    number: '04',
    name: 'BOGO Superfoods',
    tagline: 'Fuel Your Everyday Wellness.',
    description:
      'Discover nutrition-focused products, protein supplements, health snacks, and wellness essentials to complement your healthy, active lifestyle.',
    category: 'Nutrition & Wellness',
    categoryGroup: 'everyday',
    accentColor: '#1565c0',
    bgTint: 'rgba(21, 101, 192, 0.05)',
    borderTint: 'rgba(21, 101, 192, 0.22)',
    image: superfoodsImg,
    logo: `${base}images/logos/Superfoods.png`,
    slug: 'superfoods',
    brandSet: 0,
  },
  {
    id: 'brand-paws',
    number: '05',
    name: 'BOGO Paws',
    tagline: 'More Love for Every Paw.',
    description:
      'Find pet food, treats, accessories, grooming products, and care services designed to keep your furry companions happy, healthy, and cared for.',
    category: 'Pet Care & Accessories',
    categoryGroup: 'family',
    accentColor: '#ef6c00',
    bgTint: 'rgba(239, 108, 0, 0.05)',
    borderTint: 'rgba(239, 108, 0, 0.22)',
    image: pawsImg,
    logo: `${base}images/logos/Paws.png`,
    slug: 'paws',
    brandSet: 2,
  },
  {
    id: 'brand-beauty',
    number: '06',
    name: 'BOGO Beauty',
    tagline: 'Discover Your Kind of Beautiful.',
    description:
      'Explore skincare, makeup, haircare, fragrances, and personal care products that make self-care enjoyable and help you express your unique style.',
    category: 'Skincare & Cosmetics',
    categoryGroup: 'wellness',
    accentColor: '#c2185b',
    bgTint: 'rgba(194, 24, 91, 0.05)',
    borderTint: 'rgba(194, 24, 91, 0.22)',
    image: beautyImg,
    logo: `${base}images/logos/Beauty.png`,
    slug: 'beauty',
    brandSet: 1,
  },
  {
    id: 'brand-luxe',
    number: '07',
    name: 'BOGO Luxe',
    tagline: 'A Touch of the Extraordinary.',
    description:
      'Discover premium products, imported favourites, gourmet selections, and thoughtful gifts curated for those who appreciate quality and exclusivity.',
    category: 'Gourmet & Exclusive Gifts',
    categoryGroup: 'wellness',
    accentColor: '#6a1b9a',
    bgTint: 'rgba(106, 27, 154, 0.05)',
    borderTint: 'rgba(106, 27, 154, 0.22)',
    image: luxeImg,
    logo: `${base}images/logos/Luxe.png`,
    slug: 'luxe',
    brandSet: 1,
  },
  {
    id: 'brand-play',
    number: '08',
    name: 'BOGO Play',
    tagline: 'Where Fun Meets Imagination.',
    description:
      'Explore toys, games, puzzles, and creative activities that inspire children to imagine, learn, and create joyful memories through play.',
    category: 'Toys, Games & Puzzles',
    categoryGroup: 'family',
    accentColor: '#d84315',
    bgTint: 'rgba(216, 67, 21, 0.05)',
    borderTint: 'rgba(216, 67, 21, 0.22)',
    image: playImg,
    logo: `${base}images/logos/Play.png`,
    slug: 'play',
    brandSet: 2,
  },
  {
    id: 'brand-classroom',
    number: '09',
    name: 'BOGO Classroom',
    tagline: 'Inspiring Minds, Every Day.',
    description:
      'Discover books, stationery, educational resources, and creative supplies that encourage curiosity, nurture creativity, and support lifelong learning.',
    category: 'Books & Learning Supplies',
    categoryGroup: 'family',
    accentColor: '#1e3a8a',
    bgTint: 'rgba(30, 58, 138, 0.05)',
    borderTint: 'rgba(30, 58, 138, 0.22)',
    image: classroomImg,
    logo: `${base}images/logos/Classroom.png`,
    slug: 'classroom',
    brandSet: 2,
  },
  {
    id: 'brand-divine',
    number: '10',
    name: 'BOGO Divine',
    tagline: 'Faith, Tradition, and Togetherness.',
    description:
      'Find pooja essentials, devotional products, incense, and festive offerings that bring convenience and meaning to daily worship and special occasions.',
    category: 'Devotional & Tradition',
    categoryGroup: 'wellness',
    accentColor: '#b78103',
    bgTint: 'rgba(183, 129, 3, 0.05)',
    borderTint: 'rgba(183, 129, 3, 0.22)',
    image: divineImg,
    logo: `${base}images/logos/Divine.png`,
    slug: 'divine',
    brandSet: 1,
  },
  {
    id: 'brand-health',
    number: '11',
    name: 'BOGO Health',
    tagline: 'Your Wellbeing Comes First.',
    description:
      'Explore healthcare essentials, Ayurvedic products, wellness solutions, and personal health necessities for convenient everyday care.',
    category: 'Healthcare & Ayurveda',
    categoryGroup: 'wellness',
    accentColor: '#0097a7',
    bgTint: 'rgba(0, 151, 167, 0.05)',
    borderTint: 'rgba(0, 151, 167, 0.22)',
    image: healthImg,
    logo: `${base}images/logos/Health.png`,
    slug: 'health',
    brandSet: 1,
  },
];
