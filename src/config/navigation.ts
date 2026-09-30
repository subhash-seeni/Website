/**
 * BOGO Website Navigation Configuration
 * Single source of truth for all website destinations, hierarchy,
 * routing paths, and on-page section targets.
 */

export interface NavItem {
  id: string;
  label: string;
  path: string;
  targetId: string;
  subtitle?: string;
  badge?: string;
  brandSet?: number;
}

export interface NavigationStructure {
  main: NavItem[];
  ecosystem: NavItem[];
  collectionBrands: NavItem[];
  programmes: NavItem[];
  footer: {
    explore: NavItem[];
    ecosystem: NavItem[];
    programmes: NavItem[];
  };
}

export const navigationConfig: NavigationStructure = {
  // ---------------------------------------------------------------------------
  // MAIN NAVIGATION (Primary Full-Screen Menu Items — Highest Hierarchy)
  // Each maps directly to its own unique ecosystem section without overlap
  // ---------------------------------------------------------------------------
  main: [
    {
      id: 'home',
      label: 'HOME',
      path: '/',
      targetId: 'bogo-hero-section',
      subtitle: 'The Connected Ecosystem',
    },
    {
      id: 'collection',
      label: 'COLLECTION',
      path: '/collection',
      targetId: 'bogo-collection-section',
      subtitle: '11 Curated Brands',
    },
    {
      id: 'square',
      label: 'BOGO SQUARE',
      path: '/square',
      targetId: 'bogo-square-section',
      subtitle: 'Flagship Destination',
    },
    {
      id: 'retail',
      label: 'RETAIL FORMATS',
      path: '/retail',
      targetId: 'bogo-formats-section',
      subtitle: 'Flagship, Supermarket & Express',
    },
    {
      id: 'technology',
      label: 'TECHNOLOGY',
      path: '/technology',
      targetId: 'bogo-technology-section',
      subtitle: 'In-Store Intelligence',
    },
    {
      id: 'go',
      label: 'BOGO GO',
      path: '/go',
      targetId: 'bogo-go-section',
      subtitle: '10-Minute Doorstep Delivery',
    },
    {
      id: 'programmes',
      label: 'PROGRAMMES',
      path: '/programmes',
      targetId: 'bogo-programs-section',
      subtitle: 'Life, Companion, Affairs & Partner',
    },
    {
      id: 'value',
      label: 'THE BOGO DIFFERENCE',
      path: '/value',
      targetId: 'bogo-value-section',
      subtitle: 'Direct Savings & Fair Value',
    },
    {
      id: 'growth',
      label: 'GROWTH ROADMAP',
      path: '/growth',
      targetId: 'bogo-growth-section',
      subtitle: 'The Ascent & Future Horizon',
    },
  ],

  // ---------------------------------------------------------------------------
  // ECOSYSTEM STRUCTURE
  // ---------------------------------------------------------------------------
  ecosystem: [
    {
      id: 'eco-brands',
      label: 'Brands',
      path: '/ecosystem/brands',
      targetId: 'bogo-collection-section',
      subtitle: '11 Distinct Specialised Brands',
    },
    {
      id: 'eco-retail',
      label: 'Retail Formats',
      path: '/ecosystem/retail',
      targetId: 'bogo-formats-section',
      subtitle: 'Square, Bazaar & Mini',
    },
    {
      id: 'eco-distribution',
      label: 'Distribution',
      path: '/ecosystem/distribution',
      targetId: 'bogo-go-section',
      subtitle: 'BOGO Go Mobility & Logistics',
    },
    {
      id: 'eco-partnerships',
      label: 'Partnerships',
      path: '/ecosystem/partnerships',
      targetId: 'bogo-programs-section',
      subtitle: 'BOGO Partner Strategic Network',
    },
  ],

  // ---------------------------------------------------------------------------
  // BOGO COLLECTION (11 Distinct Brands with Targeted Category Offsets)
  // ---------------------------------------------------------------------------
  collectionBrands: [
    { id: 'brand-essentials', label: 'BOGO Essentials', path: '/collection/essentials', targetId: 'bogo-collection-section', brandSet: 0 },
    { id: 'brand-daily', label: 'BOGO Daily', path: '/collection/daily', targetId: 'bogo-collection-section', brandSet: 0 },
    { id: 'brand-farms', label: 'BOGO Farms', path: '/collection/farms', targetId: 'bogo-collection-section', brandSet: 0 },
    { id: 'brand-superfoods', label: 'BOGO Superfoods', path: '/collection/superfoods', targetId: 'bogo-collection-section', brandSet: 0 },
    { id: 'brand-health', label: 'BOGO Health', path: '/collection/health', targetId: 'bogo-collection-section', brandSet: 1 },
    { id: 'brand-beauty', label: 'BOGO Beauty', path: '/collection/beauty', targetId: 'bogo-collection-section', brandSet: 1 },
    { id: 'brand-luxe', label: 'BOGO Luxe', path: '/collection/luxe', targetId: 'bogo-collection-section', brandSet: 1 },
    { id: 'brand-divine', label: 'BOGO Divine', path: '/collection/divine', targetId: 'bogo-collection-section', brandSet: 1 },
    { id: 'brand-paws', label: 'BOGO Paws', path: '/collection/paws', targetId: 'bogo-collection-section', brandSet: 2 },
    { id: 'brand-play', label: 'BOGO Play', path: '/collection/play', targetId: 'bogo-collection-section', brandSet: 2 },
    { id: 'brand-classroom', label: 'BOGO Classroom', path: '/collection/classroom', targetId: 'bogo-collection-section', brandSet: 2 },
  ],

  // ---------------------------------------------------------------------------
  // PROGRAMMES
  // ---------------------------------------------------------------------------
  programmes: [
    {
      id: 'prog-life',
      label: 'BOGO Life',
      path: '/programmes/life',
      targetId: 'bogo-programs-section',
      subtitle: 'Lifestyle & Wellness Initiatives',
    },
    {
      id: 'prog-companion',
      label: 'BOGO Companion',
      path: '/programmes/companion',
      targetId: 'bogo-programs-section',
      subtitle: 'Personalized Member Experience',
    },
    {
      id: 'prog-affairs',
      label: 'BOGO Affairs',
      path: '/programmes/affairs',
      targetId: 'bogo-programs-section',
      subtitle: 'Community & Cultural Events',
    },
    {
      id: 'prog-partner',
      label: 'BOGO Partner',
      path: '/ecosystem/partnerships',
      targetId: 'bogo-programs-section',
      subtitle: 'Strategic Supplier Collaboration',
    },
  ],

  // ---------------------------------------------------------------------------
  // FOOTER VISIBLE NAVIGATION (Clean, Ecosystem-Oriented Hierarchy)
  // ---------------------------------------------------------------------------
  footer: {
    explore: [
      { id: 'f-home', label: 'Home', path: '/', targetId: 'bogo-hero-section' },
      { id: 'f-collection', label: 'Collection', path: '/collection', targetId: 'bogo-collection-section' },
      { id: 'f-square', label: 'BOGO Square', path: '/square', targetId: 'bogo-square-section' },
      { id: 'f-retail', label: 'Retail Formats', path: '/retail', targetId: 'bogo-formats-section' },
      { id: 'f-technology', label: 'Technology', path: '/technology', targetId: 'bogo-technology-section' },
      { id: 'f-go', label: 'BOGO Go', path: '/go', targetId: 'bogo-go-section' },
      { id: 'f-programmes', label: 'Programmes', path: '/programmes', targetId: 'bogo-programs-section' },
      { id: 'f-value', label: 'Value', path: '/value', targetId: 'bogo-value-section' },
      { id: 'f-growth', label: 'Growth Roadmap', path: '/growth', targetId: 'bogo-growth-section' },
    ],
    ecosystem: [
      { id: 'f-brands', label: 'Brands', path: '/ecosystem/brands', targetId: 'bogo-collection-section' },
      { id: 'f-retail-formats', label: 'Retail Formats', path: '/ecosystem/retail', targetId: 'bogo-formats-section' },
      { id: 'f-bogo-go', label: 'BOGO Go', path: '/ecosystem/distribution', targetId: 'bogo-go-section' },
      { id: 'f-bogo-partner', label: 'BOGO Partner', path: '/ecosystem/partnerships', targetId: 'bogo-programs-section' },
    ],
    programmes: [
      { id: 'f-life', label: 'BOGO Life', path: '/programmes/life', targetId: 'bogo-programs-section' },
      { id: 'f-companion', label: 'BOGO Companion', path: '/programmes/companion', targetId: 'bogo-programs-section' },
      { id: 'f-affairs', label: 'BOGO Affairs', path: '/programmes/affairs', targetId: 'bogo-programs-section' },
      { id: 'f-prog-partner', label: 'BOGO Partner', path: '/ecosystem/partnerships', targetId: 'bogo-programs-section' },
    ],
  },
};

/**
 * Global navigation helper to smoothly scroll to on-page destinations
 * while updating browser history cleanly.
 */
export const navigateToDestination = (item: NavItem, onComplete?: () => void) => {
  // Update browser history path without page reload
  if (window.history && window.history.pushState) {
    window.history.pushState(null, '', item.path);
  }

  // Smooth scroll to the on-page anchor target if it exists
  const targetElement = document.getElementById(item.targetId);
  if (targetElement) {
    if (item.targetId === 'bogo-collection-section' && item.brandSet !== undefined) {
      const trackTop = targetElement.offsetTop;
      const trackHeight = targetElement.offsetHeight - window.innerHeight;
      let targetRatio = 0.08;
      if (item.brandSet === 1) targetRatio = 0.48;
      if (item.brandSet === 2) targetRatio = 0.80;
      const targetY = trackTop + trackHeight * targetRatio;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    } else {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  } else if (item.targetId === 'bogo-hero-section' || item.path === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (onComplete) {
    onComplete();
  }
};
