import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navigateToDestination } from '../../config/navigation';
import './AffairsPage.css';

gsap.registerPlugin(ScrollTrigger);

interface CulturalEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  attendees: number;
  featured?: boolean;
  image: string;
  description: string;
}

const EVENTS: CulturalEvent[] = [
  {
    id: 'evt-1',
    title: 'The Great Indian Artisan Harvest & Spice Fair',
    category: 'CULINARY & CRAFT',
    date: 'SAT, NOV 08',
    time: '4:00 PM – 10:00 PM',
    venue: 'BOGO Square Outdoor Promenade',
    attendees: 420,
    featured: true,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    description: 'An evening celebrating regional farm-direct spices, master chef live cook-offs, organic tea tastings, and brass craft workshops under festive starlight.',
  },
  {
    id: 'evt-2',
    title: 'Heritage Folk & Acoustic Music Night',
    category: 'PERFORMANCE',
    date: 'FRI, NOV 14',
    time: '7:30 PM – 10:30 PM',
    venue: 'BOGO Square Amphitheatre',
    attendees: 185,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description: 'Intimate indie folk singers, classical sitarists, and fusion percussion ensembles accompanied by warm spiced chai.',
  },
  {
    id: 'evt-3',
    title: 'Children’s Creative Clay & Canvas Studio',
    category: 'WORKSHOP',
    date: 'SUN, NOV 16',
    time: '10:30 AM – 1:30 PM',
    venue: 'BOGO Classroom Community Studio',
    attendees: 64,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    description: 'Hands-on terracotta wheel throwing, botanical leaf prints, and storytelling sessions for young artists aged 5–14.',
  },
  {
    id: 'evt-4',
    title: 'Sustainable Living & Zero-Waste Forum',
    category: 'COMMUNITY DIALOGUE',
    date: 'THU, NOV 20',
    time: '6:00 PM – 8:30 PM',
    venue: 'BOGO Square Atrium Level 2',
    attendees: 98,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    description: 'Pioneering urban farmers, composting innovators, and packaging engineers discuss regenerative neighborhood retail.',
  },
  {
    id: 'evt-5',
    title: 'Festive Lights & Diwali Lantern Bazaar',
    category: 'FESTIVAL',
    date: 'SAT, NOV 22',
    time: '5:00 PM – 11:00 PM',
    venue: 'BOGO Square Flagship Grounds',
    attendees: 650,
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional diya illumination, live rangoli competitions, street sweets tasting, and artisan lantern pop-ups.',
  },
];

export const AffairsPage: React.FC = () => {
  const [rsvps, setRsvps] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const ctx = gsap.context(() => {
      gsap.from('.aff-hero-badge', { opacity: 0, y: -16, duration: 0.6, ease: 'power2.out' });
      gsap.from('.aff-hero-title', { opacity: 0, y: 30, duration: 0.8, delay: 0.1, ease: 'power3.out' });
      gsap.from('.aff-hero-sub', { opacity: 0, y: 20, duration: 0.7, delay: 0.2, ease: 'power2.out' });
      gsap.from('.aff-featured-card', {
        scrollTrigger: { trigger: '.aff-featured-section', start: 'top 80%' },
        opacity: 0,
        y: 35,
        duration: 0.7,
        ease: 'power2.out',
      });
      gsap.from('.aff-event-card', {
        scrollTrigger: { trigger: '.aff-events-grid', start: 'top 85%' },
        opacity: 0,
        y: 30,
        duration: 0.55,
        stagger: 0.1,
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

  const toggleRsvp = (id: string) => {
    setRsvps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const featured = EVENTS.find((e) => e.featured) || EVENTS[0];
  const listEvents = EVENTS.filter((e) => !e.featured);

  return (
    <div className="bogo-affairs-page" id="bogo-affairs-page">
      {/* Top Breadcrumb Nav */}
      <nav className="aff-top-nav" aria-label="Breadcrumb">
        <div className="aff-nav-inner">
          <div className="aff-nav-crumbs">
            <a href="/" onClick={(e) => { e.preventDefault(); navigateToDestination({ id: 'home', label: 'HOME', path: '/', targetId: 'bogo-hero-section' }); }} className="aff-crumb-link">
              BOGO
            </a>
            <span className="aff-crumb-sep">/</span>
            <a href="/programmes" onClick={handleBackToProgrammes} className="aff-crumb-link">
              PROGRAMMES
            </a>
            <span className="aff-crumb-sep">/</span>
            <span className="aff-crumb-current">BOGO AFFAIRS</span>
          </div>
          <button type="button" onClick={handleBackToProgrammes} className="aff-back-btn">
            ← ALL PROGRAMMES
          </button>
        </div>
      </nav>

      {/* Cinematic Hero */}
      <header className="aff-hero">
        <div className="aff-hero-content">
          <div className="aff-hero-badge">
            <span className="aff-badge-dot" />
            <span>COMMUNITY &amp; CULTURAL EVENTS</span>
          </div>

          <div className="aff-logo-row">
            <img src="/images/Affairs.png" alt="BOGO Affairs" className="aff-hero-logo" />
          </div>

          <h1 className="aff-hero-title">
            WHERE COMMUNITY
            <br />
            <span className="aff-title-gradient">COMES ALIVE.</span>
          </h1>

          <p className="aff-hero-sub">
            Festivals, culinary dialogues, acoustic music sessions, and artisan craft workshops connecting neighborhoods across India.
          </p>
        </div>
      </header>

      {/* Featured Headline Event */}
      <section className="aff-featured-section">
        <div className="aff-featured-header">
          <span className="aff-section-kicker">FEATURED SPOTLIGHT EVENT</span>
          <h2 className="aff-section-title">The Grand Stage</h2>
        </div>

        <article className="aff-featured-card">
          <div className="aff-featured-img-wrap">
            <img src={featured.image} alt={featured.title} className="aff-featured-img" />
            <span className="aff-featured-live-badge">🔴 UPCOMING PREMIER</span>
          </div>
          <div className="aff-featured-body">
            <div className="aff-event-meta">
              <span className="aff-meta-cat">{featured.category}</span>
              <span className="aff-meta-date">{featured.date} · {featured.time}</span>
            </div>
            <h3 className="aff-featured-title">{featured.title}</h3>
            <p className="aff-featured-desc">{featured.description}</p>
            <div className="aff-venue-row">
              <span className="aff-venue-icon">📍</span>
              <span className="aff-venue-text">{featured.venue}</span>
            </div>
            <div className="aff-featured-footer">
              <span className="aff-attendees-count">👥 {featured.attendees + (rsvps[featured.id] ? 1 : 0)} Attending</span>
              <button
                type="button"
                className={`aff-rsvp-btn ${rsvps[featured.id] ? 'is-confirmed' : ''}`}
                onClick={() => toggleRsvp(featured.id)}
              >
                {rsvps[featured.id] ? '✓ RSVP CONFIRMED' : 'RESERVE COMPLIMENTARY PASS →'}
              </button>
            </div>
          </div>
        </article>
      </section>

      {/* Events Bento Grid */}
      <section className="aff-events-section">
        <div className="aff-featured-header">
          <span className="aff-section-kicker">CALENDAR &amp; GATHERINGS</span>
          <h2 className="aff-section-title">Upcoming Neighborhood Affairs</h2>
          <p className="aff-section-desc">
            All events are open to the public, with priority entry and front-row seating reserved for BOGO Companion members.
          </p>
        </div>

        <div className="aff-events-grid">
          {listEvents.map((evt) => (
            <article key={evt.id} className="aff-event-card">
              <div className="aff-card-img-wrap">
                <img src={evt.image} alt={evt.title} className="aff-card-img" loading="lazy" />
                <span className="aff-card-tag">{evt.category}</span>
              </div>
              <div className="aff-card-body">
                <div className="aff-card-date-bar">
                  <span className="aff-card-date">{evt.date}</span>
                  <span className="aff-card-time">{evt.time}</span>
                </div>
                <h3 className="aff-card-title">{evt.title}</h3>
                <p className="aff-card-desc">{evt.description}</p>
                <div className="aff-card-venue">
                  <span className="aff-venue-icon">📍</span>
                  <span>{evt.venue}</span>
                </div>
                <div className="aff-card-action-row">
                  <span className="aff-card-count">👥 {evt.attendees + (rsvps[evt.id] ? 1 : 0)} RSVPs</span>
                  <button
                    type="button"
                    className={`aff-card-rsvp-btn ${rsvps[evt.id] ? 'is-confirmed' : ''}`}
                    onClick={() => toggleRsvp(evt.id)}
                  >
                    {rsvps[evt.id] ? '✓ CONFIRMED' : 'RSVP PASS'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Host with Us Strip */}
      <section className="aff-host-strip">
        <div className="aff-host-inner">
          <div className="aff-host-text">
            <span className="aff-host-tag">COMMUNITY COLLECTIVES</span>
            <h3 className="aff-host-title">Host Your Gathering at BOGO Square</h3>
            <p className="aff-host-desc">
              Are you an artist, indie musician, regional food curator, or community leader? BOGO offers amphitheatre space, AV production, and community outreach support at zero venue cost.
            </p>
          </div>
          <div className="aff-host-cta">
            <a href="mailto:affairs@bogo.in?subject=Community%20Host%20Application" className="aff-host-btn">
              SUBMIT GATHERING PROPOSAL →
            </a>
          </div>
        </div>
      </section>

      {/* Closing Call to Action */}
      <section className="aff-closing-banner">
        <div className="aff-closing-content">
          <h2 className="aff-closing-title">Connect with Your City</h2>
          <p className="aff-closing-desc">
            Explore all 4 connected initiatives across the BOGO retail ecosystem.
          </p>
          <div className="aff-closing-actions">
            <button type="button" onClick={handleBackToProgrammes} className="aff-closing-btn">
              EXPLORE ALL 4 PROGRAMMES
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
