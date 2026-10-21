import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navigateToDestination } from '../../config/navigation';
import './CompanionPage.css';

gsap.registerPlugin(ScrollTrigger);

interface ActivityItem {
  id: string;
  store: string;
  brand: string;
  date: string;
  amount: string;
  pointsEarned: string;
}

const RECENT_ACTIVITY: ActivityItem[] = [
  { id: '1', store: 'BOGO Square Flagship', brand: 'BOGO Essentials', date: 'Yesterday, 6:42 PM', amount: '₹1,840', pointsEarned: '+184 pts' },
  { id: '2', store: 'BOGO Supermarket Express', brand: 'BOGO Farms', date: 'Oct 17, 11:15 AM', amount: '₹620', pointsEarned: '+62 pts' },
  { id: '3', store: 'BOGO Online Delivery', brand: 'BOGO Daily', date: 'Oct 14, 8:20 PM', amount: '₹2,490', pointsEarned: '+249 pts' },
  { id: '4', store: 'BOGO Square Flagship', brand: 'BOGO Luxe', date: 'Oct 09, 4:10 PM', amount: '₹4,100', pointsEarned: '+410 pts' },
];

const FAVORITES = [
  { name: 'Organic Cold-Pressed Olive Oil', brand: 'BOGO Essentials', price: '₹480', inStock: true },
  { name: 'Himalayan Pink Salt Crystals', brand: 'BOGO Daily', price: '₹140', inStock: true },
  { name: 'Single-Origin Arabica Roast', brand: 'BOGO Superfoods', price: '₹390', inStock: true },
  { name: 'Pure Lavender Essential Serum', brand: 'BOGO Beauty', price: '₹650', inStock: true },
];

const SHOPPING_LIST = [
  { id: 'item-1', name: 'Almond & Oat Granola 500g', checked: true },
  { id: 'item-2', name: 'Organic Whole Milk (2L)', checked: true },
  { id: 'item-3', name: 'Greek Plain Yogurt 400g', checked: false },
  { id: 'item-4', name: 'Fresh Cold Brew Concentrate', checked: false },
  { id: 'item-5', name: 'BOGO Recycled Kraft Carry Bags', checked: false },
];

export const CompanionPage: React.FC = () => {
  const [list, setList] = useState(SHOPPING_LIST);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const ctx = gsap.context(() => {
      gsap.from('.comp-hero-card', { opacity: 0, y: 25, duration: 0.7, ease: 'power2.out' });
      gsap.from('.comp-bento-panel', {
        scrollTrigger: {
          trigger: '.comp-bento-grid',
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.55,
        stagger: 0.08,
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

  const toggleListItem = (id: string) => {
    setList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  return (
    <div className="bogo-companion-page" id="bogo-companion-page">
      {/* Top Breadcrumb Nav */}
      <nav className="comp-top-nav" aria-label="Breadcrumb">
        <div className="comp-nav-inner">
          <div className="comp-nav-crumbs">
            <a href="/" onClick={(e) => { e.preventDefault(); navigateToDestination({ id: 'home', label: 'HOME', path: '/', targetId: 'bogo-hero-section' }); }} className="comp-crumb-link">
              BOGO
            </a>
            <span className="comp-crumb-sep">/</span>
            <a href="/programmes" onClick={handleBackToProgrammes} className="comp-crumb-link">
              PROGRAMMES
            </a>
            <span className="comp-crumb-sep">/</span>
            <span className="comp-crumb-current">BOGO COMPANION</span>
          </div>
          <button type="button" onClick={handleBackToProgrammes} className="comp-back-btn">
            ← ALL PROGRAMMES
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="comp-hero">
        <div className="comp-hero-inner">
          <div className="comp-hero-badge">
            <span className="comp-badge-dot" />
            <span>PERSONALIZED MEMBER EXPERIENCE</span>
          </div>

          <div className="comp-logo-row">
            <img src="/images/Companion.png" alt="BOGO Companion" className="comp-hero-logo" />
          </div>

          <h1 className="comp-hero-title">
            ONE PASS.
            <br />
            <span className="comp-title-gold">EVERY PRIVILEGE.</span>
          </h1>

          <p className="comp-hero-sub">
            Your unified digital membership across all 11 BOGO brands, flagship destinations, and neighborhood supermarket express stores.
          </p>
        </div>
      </header>

      {/* Live Member Dashboard Bento Showcase */}
      <section className="comp-dashboard-section">
        <div className="comp-dashboard-header">
          <span className="comp-section-kicker">INTERACTIVE MEMBER DASHBOARD</span>
          <h2 className="comp-section-title">Your Companion Command Center</h2>
          <p className="comp-section-desc">
            Instantly access your digital card pass, shopping history, bookmarked staples, and reward balances in one place.
          </p>
        </div>

        <div className="comp-bento-grid">
          {/* Panel 1: Digital Membership Pass with QR */}
          <div className="comp-bento-panel comp-panel-pass">
            <div className="comp-pass-top">
              <span className="comp-pass-chip">NFC ENABLED</span>
              <span className="comp-pass-status">ACTIVE GOLD TIER</span>
            </div>
            <div className="comp-pass-qr-wrap">
              {/* Minimal SVG QR code mock */}
              <svg className="comp-qr-svg" viewBox="0 0 100 100" fill="currentColor">
                <rect x="10" y="10" width="24" height="24" fill="#0A1628" />
                <rect x="14" y="14" width="16" height="16" fill="#D4A843" />
                <rect x="18" y="18" width="8" height="8" fill="#0A1628" />

                <rect x="66" y="10" width="24" height="24" fill="#0A1628" />
                <rect x="70" y="14" width="16" height="16" fill="#D4A843" />
                <rect x="74" y="18" width="8" height="8" fill="#0A1628" />

                <rect x="10" y="66" width="24" height="24" fill="#0A1628" />
                <rect x="14" y="70" width="16" height="16" fill="#D4A843" />
                <rect x="18" y="74" width="8" height="8" fill="#0A1628" />

                <rect x="42" y="14" width="6" height="6" fill="#0A1628" />
                <rect x="52" y="24" width="6" height="6" fill="#0A1628" />
                <rect x="42" y="42" width="16" height="16" fill="#D4A843" />
                <rect x="66" y="48" width="8" height="8" fill="#0A1628" />
                <rect x="78" y="60" width="8" height="8" fill="#0A1628" />
                <rect x="48" y="68" width="10" height="10" fill="#0A1628" />
                <rect x="62" y="76" width="12" height="12" fill="#D4A843" />
              </svg>
            </div>
            <div className="comp-pass-details">
              <div className="comp-pass-name">Sarah Jenkins</div>
              <div className="comp-pass-id">ID: #BC-987654 · SCAN IN STORE</div>
            </div>
          </div>

          {/* Panel 2: Rewards Balance & Tier */}
          <div className="comp-bento-panel comp-panel-points">
            <span className="comp-panel-kicker">ACCUMULATED REWARDS</span>
            <div className="comp-points-num">12,450</div>
            <div className="comp-points-meta">Available BOGO Points</div>
            <div className="comp-points-bar-wrap">
              <div className="comp-points-bar-fill" style={{ width: '74%' }} />
            </div>
            <p className="comp-points-sub">
              2,550 points until your next ₹500 store voucher unlocks.
            </p>
          </div>

          {/* Panel 3: Shopping History Timeline */}
          <div className="comp-bento-panel comp-panel-activity">
            <div className="comp-panel-head">
              <span className="comp-panel-kicker">MY ACTIVITY</span>
              <span className="comp-panel-badge">LAST 30 DAYS</span>
            </div>
            <ul className="comp-activity-list">
              {RECENT_ACTIVITY.map((act) => (
                <li key={act.id} className="comp-act-item">
                  <div className="comp-act-info">
                    <span className="comp-act-store">{act.store}</span>
                    <span className="comp-act-date">{act.brand} · {act.date}</span>
                  </div>
                  <div className="comp-act-nums">
                    <span className="comp-act-amount">{act.amount}</span>
                    <span className="comp-act-pts">{act.pointsEarned}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Panel 4: Saved Favorites */}
          <div className="comp-bento-panel comp-panel-favorites">
            <div className="comp-panel-head">
              <span className="comp-panel-kicker">SAVED FAVORITES</span>
              <span className="comp-panel-badge">QUICK REORDER</span>
            </div>
            <ul className="comp-fav-list">
              {FAVORITES.map((fav, i) => (
                <li key={i} className="comp-fav-item">
                  <div className="comp-fav-info">
                    <span className="comp-fav-name">{fav.name}</span>
                    <span className="comp-fav-brand">{fav.brand}</span>
                  </div>
                  <span className="comp-fav-price">{fav.price}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Panel 5: Smart In-Store Shopping List */}
          <div className="comp-bento-panel comp-panel-list">
            <div className="comp-panel-head">
              <span className="comp-panel-kicker">SMART SHOPPING CHECKLIST</span>
              <span className="comp-panel-badge">INTERACTIVE</span>
            </div>
            <ul className="comp-checklist">
              {list.map((item) => (
                <li key={item.id} className={`comp-check-item ${item.checked ? 'is-checked' : ''}`} onClick={() => toggleListItem(item.id)}>
                  <span className="comp-check-box">{item.checked ? '✓' : ''}</span>
                  <span className="comp-check-text">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Member Privileges Matrix */}
      <section className="comp-privileges-section">
        <div className="comp-dashboard-header">
          <span className="comp-section-kicker">TIER COMPARISON</span>
          <h2 className="comp-section-title">Exclusive Companion Privileges</h2>
          <p className="comp-section-desc">
            Enjoy guaranteed savings, priority checkout lines, and complimentary doorstep delivery.
          </p>
        </div>

        <div className="comp-tier-grid">
          <div className="comp-tier-col">
            <h3 className="comp-tier-title">MEMBER</h3>
            <span className="comp-tier-price">COMPLIMENTARY</span>
            <ul className="comp-tier-bullets">
              <li>1x Points on every transaction</li>
              <li>Digital wallet pass in Apple &amp; Google Wallet</li>
              <li>Receipts emailed &amp; archived in app</li>
              <li>Standard return window (14 days)</li>
            </ul>
          </div>

          <div className="comp-tier-col is-featured">
            <span className="comp-featured-tag">MOST POPULAR</span>
            <h3 className="comp-tier-title">GOLD</h3>
            <span className="comp-tier-price">₹10,000 ANNUAL SPEND</span>
            <ul className="comp-tier-bullets">
              <li><strong>2x Points</strong> on all 11 BOGO brands</li>
              <li>Priority cashier line at BOGO Square &amp; Supermarkets</li>
              <li>Free home delivery on orders over ₹499</li>
              <li>Extended return window (30 days)</li>
              <li>Early access to seasonal brand collection drops</li>
            </ul>
          </div>

          <div className="comp-tier-col">
            <h3 className="comp-tier-title">PLATINUM</h3>
            <span className="comp-tier-price">₹35,000 ANNUAL SPEND</span>
            <ul className="comp-tier-bullets">
              <li><strong>3x Points</strong> on all transactions</li>
              <li>Unlimited free same-day delivery</li>
              <li>Personal in-store concierge at BOGO Square</li>
              <li>Complimentary parking at flagship stores</li>
              <li>VIP invites to BOGO Affairs festivals &amp; tastings</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Closing Call to Action */}
      <section className="comp-closing-banner">
        <div className="comp-closing-content">
          <h2 className="comp-closing-title">Never Miss a BOGO Privilege</h2>
          <p className="comp-closing-desc">
            Download the pass to your mobile device or link your mobile number at checkout.
          </p>
          <div className="comp-closing-actions">
            <button type="button" onClick={handleBackToProgrammes} className="comp-closing-btn">
              EXPLORE ALL 4 PROGRAMMES
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
