'use client';

import Link from 'next/link';
import styles from './social-media.module.css';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

interface PriceTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}

export default function SocialMediaPage() {
  const FEATURES: FeatureItem[] = [
    {
      id: 'posts',
      title: 'Posts',
      description: 'Engaging, custom-branded graphic posts and carousel sheets highlighting rank predictor updates, college details, and syllabus tips.',
      color: '#ec4899',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.9 2.9m-18 8.75h18a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0022 4.5H2a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 002 21.75zM12 12.75a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
        </svg>
      )
    },
    {
      id: 'reels',
      title: 'Reels',
      description: 'High-retention short-form video edits (Instagram Reels & YouTube Shorts) optimized with engaging transitions, captions, and student Q&As.',
      color: '#7c3aed',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l-4.5-3v6l4.5-3z" />
        </svg>
      )
    },
    {
      id: 'stories',
      title: 'Stories',
      description: 'Daily interactive stories (polls, countdowns to exams/CAP rounds, links, and quick predictor tips) to maintain continuous community engagement.',
      color: '#3b82f6',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'hashtag-research',
      title: 'Hashtag Research',
      description: 'Advanced keyword and hashtag trend matching to rank posts in search results and capture niche student groups across Maharashtra.',
      color: '#14b8a6',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
        </svg>
      )
    },
    {
      id: 'monthly-report',
      title: 'Monthly Report',
      description: 'Comprehensive analysis on reach, impressions, follower growth, website click metrics, and conversion outcomes to track actual ROI.',
      color: '#f59e0b',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5M21 21H3m18-18v16.5M16.5 12l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    },
    {
      id: 'community-management',
      title: 'Community Management',
      description: 'Active comment moderation, direct message responses guiding prospective leads, and coordinating student forum groups.',
      color: '#06b6d4',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      )
    }
  ];

  const TIERS: PriceTier[] = [
    {
      name: 'Basic',
      price: '₹3,499',
      description: 'Ideal entry package to maintain a clean brand footprint on Instagram.',
      features: [
        '12 custom branded graphic posts',
        '8 interactive story slides',
        'Niche hashtag & keywords research',
        'Core monthly metrics report',
        'Email & ticketing support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '₹7,999',
      description: 'Our most popular plan, adding co-designed reels, active DMs routing, and reports.',
      features: [
        '20 graphic posts + custom designs',
        '6 co-designed reels / shorts edits',
        '15 interactive story slides',
        'Full trend research & hashtags mapping',
        'Active community response management',
        'Detailed monthly growth & traffic reports'
      ],
      popular: true
    },
    {
      name: 'Premium',
      price: '₹14,999',
      description: 'Complete high-growth suite with daily updates, full moderation, and strategy consulting.',
      features: [
        '30 graphic posts (Daily posting schedule)',
        '12 co-designed reels / shorts edits',
        'Unlimited stories & interactive Q&As',
        'Complete community moderation & replies',
        'Monthly strategy call & consultation',
        'Custom Looker Studio traffic dashboard'
      ],
      popular: false
    }
  ];

  return (
    <main className={styles.socialPage}>
      {/* Background gradients globally rendered in layout.tsx */}
      <div className="container">
        
        {/* Hero Header */}
        <header className={styles.headerSection}>
          <span className={styles.badge}>Social Media Management</span>
          <h1 className={styles.title}>Build Student Communities</h1>
          <p className={styles.subtitle}>
            Design custom educational carousels, edit viral reels, schedule stories, and handle community comments organically.
          </p>
        </header>

        {/* Features Grid */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 className={styles.sectionTitle}>Management Capabilities</h2>
          <div className={styles.grid}>
            {FEATURES.map((f) => (
              <div key={f.id} className={`${styles.card} glass-card`}>
                <div 
                  className={styles.cardGlow} 
                  style={{ background: `radial-gradient(circle at 50% 50%, ${f.color}15 0%, transparent 60%)` }} 
                />
                
                <div className={styles.cardContent}>
                  <div className={styles.iconWrapper} style={{ color: f.color, backgroundColor: `${f.color}10` }}>
                    {f.icon}
                  </div>
                  <h3 className={styles.cardTitle}>{f.title}</h3>
                  <p className={styles.description}>{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Cards */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 className={styles.sectionTitle}>Flexible Pricing Plans</h2>
          
          <div className={styles.pricingGrid}>
            {TIERS.map((t, idx) => (
              <div key={idx} className={`${styles.priceCard} ${t.popular ? styles.popularCard : ''}`}>
                {t.popular && <span className={styles.popularBadge}>Most Popular</span>}
                
                <div className={styles.priceHeader}>
                  <h3 className={styles.priceName}>{t.name}</h3>
                  <div className={styles.priceRow}>
                    <span className={styles.priceValue}>{t.price}</span>
                    <span className={styles.pricePeriod}>/month</span>
                  </div>
                  <p className={styles.priceDesc}>{t.description}</p>
                </div>

                <ul className={styles.featuresList}>
                  {t.features.map((f, i) => (
                    <li key={i}>
                      <span className={styles.tick}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/#contact-section" 
                  className={`${styles.selectBtn} ${t.popular ? styles.popularSelectBtn : ''}`}
                >
                  Get Started with {t.name}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Card */}
        <section className={styles.ctaSection}>
          <div className={`${styles.ctaCard} glass-card`}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to Grow Organically?</h2>
              <p className={styles.ctaDesc}>
                Plan your content calendars, design premium student resources, and moderate incoming messages with our specialists.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/#contact-section" className={styles.primaryBtn}>
                  Inquire Social Suite
                  <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link href="/services" className={styles.secondaryBtn}>
                  View All Services
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
