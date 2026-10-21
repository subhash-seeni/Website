import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navigateToDestination } from '../../config/navigation';
import './LifePage.css';

gsap.registerPlugin(ScrollTrigger);

interface WellnessPillar {
  id: string;
  title: string;
  subtitle: string;
  points: string;
  tag: string;
  description: string;
  image: string;
  features: string[];
}

const PILLARS: WellnessPillar[] = [
  {
    id: 'mindfulness',
    title: 'Yoga & Mindful Movement',
    subtitle: 'Breath, Balance & Strength',
    points: '25 Pts / Session',
    tag: 'RESTORATIVE',
    description: 'Guided vinyasa, hatha, and sound healing sessions with certified wellness instructors in your neighborhood.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80',
    features: ['Neighborhood Studio Passes', 'Sunrise Outdoor Sessions', 'Breathwork Clinics'],
  },
  {
    id: 'nutrition',
    title: 'Wholefood & Clean Nutrition',
    subtitle: 'Nourish From the Inside Out',
    points: '50 Pts / Plan',
    tag: 'ORGANIC',
    description: 'Personalized dietary roadmaps, cold-pressed cleanses, and farm-to-table organic produce baskets delivered weekly.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    features: ['Weekly Organic Crop Box', 'Nutritionist Consultations', 'Cold-Pressed Juices'],
  },
  {
    id: 'meditation',
    title: 'Meditation & Sound Baths',
    subtitle: 'Quiet the Internal Noise',
    points: '20 Pts / Session',
    tag: 'CALM',
    description: 'Immersive sound baths, Tibetan singing bowls, and guided sensory deprivation sessions to recharge mental clarity.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
    features: ['Acoustic Sound Baths', 'Mindful Pause Lounges', 'Guided Sleep Rituals'],
  },
  {
    id: 'fitness',
    title: 'Holistic Fitness & Movement',
    subtitle: 'Strength, Endurance & Longevity',
    points: '100 Pts / Month',
    tag: 'VITALITY',
    description: 'Full-access passes to curated functional fitness centers, strength conditioning clinics, and recovery lounges.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
    features: ['Cross-Brand Gym Access', 'Physio & Recovery Bars', 'Community Runs'],
  },
];

const TIERS = [
  {
    name: 'SILVER',
    range: '0 – 500 Pts',
    color: '#94A3B8',
    perks: ['5% back on all organic produce', 'Complimentary quarterly wellness tea box', 'Access to digital yoga libraries'],
  },
  {
    name: 'GOLD',
    range: '501 – 1,500 Pts',
    color: '#F59E0B',
    perks: ['10% back on all BOGO Farms & Superfoods', '2 complimentary studio yoga passes monthly', 'Priority nutritionist appointment booking', 'Free cold-pressed juice with every weekly order'],
  },
  {
    name: 'PLATINUM',
    range: '1,501+ Pts',
    color: '#E0E7FF',
    perks: ['15% flat savings across entire health & wellness range', 'Unlimited weekend outdoor sessions', 'Dedicated wellness concierge', 'Seasonal luxury wellness retreat invitation'],
  },
];

export const LifePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const ctx = gsap.context(() => {
      gsap.from('.life-hero-badge', { opacity: 0, y: -16, duration: 0.6, ease: 'power2.out' });
      gsap.from('.life-hero-title', { opacity: 0, y: 30, duration: 0.8, delay: 0.1, ease: 'power3.out' });
      gsap.from('.life-hero-sub', { opacity: 0, y: 20, duration: 0.7, delay: 0.2, ease: 'power2.out' });
      gsap.from('.life-pillar-card', {
        scrollTrigger: {
          trigger: '.life-pillars-grid',
          start: 'top 80%',
        },
        opacity: 0,
        y: 35,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
      });
      gsap.from('.life-tier-card', {
        scrollTrigger: {
          trigger: '.life-tiers-grid',
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, []);

  const handleBackToProgrammes = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToDestination({
      id: 'programmes',
      label: 'PROGRAMMES',
      path: '/programmes',
      targetId: 'bogo-programs-section',
    });
  };

  return (
    <div className="bogo-life-page" id="bogo-life-page">
      {/* Top Breadcrumb Bar */}
      <nav className="life-top-nav" aria-label="Breadcrumb">
        <div className="life-nav-inner">
          <div className="life-nav-crumbs">
            <a href="/" onClick={(e) => { e.preventDefault(); navigateToDestination({ id: 'home', label: 'HOME', path: '/', targetId: 'bogo-hero-section' }); }} className="life-crumb-link">
              BOGO
            </a>
            <span className="life-crumb-sep">/</span>
            <a href="/programmes" onClick={handleBackToProgrammes} className="life-crumb-link">
              PROGRAMMES
            </a>
            <span className="life-crumb-sep">/</span>
            <span className="life-crumb-current">BOGO LIFE</span>
          </div>
          <button type="button" onClick={handleBackToProgrammes} className="life-back-btn">
            ← ALL PROGRAMMES
          </button>
        </div>
      </nav>

      {/* Cinematic Hero */}
      <header className="life-hero">
        <div className="life-hero-bg" aria-hidden="true">
          <div className="life-hero-glow" />
          <div className="life-hero-mesh" />
        </div>

        <div className="life-hero-content">
          <div className="life-hero-badge">
            <span className="life-badge-dot" />
            <span>LIFESTYLE &amp; WELLNESS INITIATIVES</span>
          </div>

          <div className="life-logo-display">
            <img src="/images/Life.png" alt="BOGO Life" className="life-hero-logo-img" />
          </div>

          <h1 className="life-hero-title">
            UNEARTH YOUR
            <br />
            <span className="life-title-gradient">VIBRANT LIFE.</span>
          </h1>

          <p className="life-hero-sub">
            A conscious wellness rewards sanctuary bridging everyday nourishing essentials, mindful physical movement, and regenerative community living.
          </p>

          <div className="life-hero-actions">
            <a href="#wellness-pillars" className="life-primary-btn">
              EXPLORE PILLARS
            </a>
            <a href="#tier-structure" className="life-secondary-btn">
              VIEW TIERS &amp; PRIVILEGES
            </a>
          </div>
        </div>
      </header>

      {/* Wellness Pillars Section */}
      <section className="life-pillars-section" id="wellness-pillars">
        <div className="life-section-header">
          <span className="life-section-kicker">FOUR FOUNDATIONS</span>
          <h2 className="life-section-title">Wholeness in Every Dimension</h2>
          <p className="life-section-desc">
            Earn vitality points with every clean lifestyle choice. Redeem them seamlessly across holistic nutrition, body movement, and mindful recovery.
          </p>
        </div>

        <div className="life-pillars-grid">
          {PILLARS.map((pillar) => (
            <article key={pillar.id} className="life-pillar-card">
              <div className="life-pillar-img-wrap">
                <img src={pillar.image} alt={pillar.title} className="life-pillar-img" loading="lazy" />
                <span className="life-pillar-tag">{pillar.tag}</span>
                <span className="life-pillar-pts">{pillar.points}</span>
              </div>
              <div className="life-pillar-body">
                <h3 className="life-pillar-title">{pillar.title}</h3>
                <span className="life-pillar-subtitle">{pillar.subtitle}</span>
                <p className="life-pillar-desc">{pillar.description}</p>
                <ul className="life-pillar-features">
                  {pillar.features.map((feat, i) => (
                    <li key={i}>
                      <span className="life-feature-check">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Tier Structure (Without Member Current Position) */}
      <section className="life-tiers-section" id="tier-structure">
        <div className="life-section-header">
          <span className="life-section-kicker">MEMBERSHIP TIERS</span>
          <h2 className="life-section-title">Ascend to Deeper Vitality</h2>
          <p className="life-section-desc">
            Every step toward mindful living unlocks curated perks, preferred rates, and invitations to exclusive wellness sanctuaries.
          </p>
        </div>

        <div className="life-tiers-grid">
          {TIERS.map((tier) => (
            <div key={tier.name} className="life-tier-card" style={{ '--tier-accent': tier.color } as React.CSSProperties}>
              <div className="life-tier-top">
                <span className="life-tier-kicker">TIER STATUS</span>
                <h3 className="life-tier-name">{tier.name}</h3>
                <span className="life-tier-range">{tier.range}</span>
              </div>
              <div className="life-tier-divider" />
              <ul className="life-tier-perks">
                {tier.perks.map((perk, idx) => (
                  <li key={idx} className="life-perk-item">
                    <span className="life-perk-dot" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Pantry & Wellness Integration */}
      <section className="life-corporate-strip">
        <div className="life-corporate-inner">
          <div className="life-corporate-text">
            <span className="life-corp-tag">FOR WORKPLACES</span>
            <h3 className="life-corp-title">BOGO Life Corporate Pantry Solutions</h3>
            <p className="life-corp-desc">
              Transform office culture with weekly subscriptions of certified organic fruits, cold-pressed elixirs, functional snacks, and on-site meditation retreats for your entire team.
            </p>
          </div>
          <div className="life-corporate-cta">
            <a href="mailto:partnerships@bogo.in?subject=BOGO%20Life%20Corporate%20Inquiry" className="life-corp-btn">
              REQUEST CORPORATE PROSPECTUS →
            </a>
          </div>
        </div>
      </section>

      {/* Closing Call to Action */}
      <section className="life-closing-banner">
        <div className="life-closing-content">
          <h2 className="life-closing-title">Ready to Live Vibrantly?</h2>
          <p className="life-closing-desc">
            Connect with BOGO Life through any BOGO store, mobile companion pass, or corporate affiliate program.
          </p>
          <div className="life-closing-actions">
            <button type="button" onClick={handleBackToProgrammes} className="life-closing-btn">
              EXPLORE ALL 4 PROGRAMMES
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
