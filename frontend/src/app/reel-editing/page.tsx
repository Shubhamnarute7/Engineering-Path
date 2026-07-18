'use client';

import Link from 'next/link';
import styles from './reel-editing.module.css';

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

export default function ReelEditingPage() {
  const FEATURES: FeatureItem[] = [
    {
      id: 'captions',
      title: 'Captions',
      description: 'Dynamic kinetic captions, styled subtitle presets, and custom highlights to keep viewers hooked even without sound.',
      color: '#ef4444',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h9m-9 3h9m-9 3h9m-9-12h9a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0118 20.25H6.75A2.25 2.25 0 014.5 18V5.25A2.25 2.25 0 016.75 3h.75z" />
        </svg>
      )
    },
    {
      id: 'motion-graphics',
      title: 'Motion Graphics',
      description: 'Smooth vector assets, animated emoji overlays, progress bars, and custom lower-third branding grids.',
      color: '#ec4899',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.904-4.474M18 12V3m0 0L9 12h9z" />
        </svg>
      )
    },
    {
      id: 'trend-research',
      title: 'Trend Research',
      description: 'Aligning short-form videos with viral audio clips, trending edit patterns, and algorithm-favored durations.',
      color: '#f43f5e',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
        </svg>
      )
    },
    {
      id: 'hook-opt',
      title: 'Hook Optimization',
      description: 'Re-pacing and re-structuring the first 3 seconds of footage to trigger rapid interest and slash scroll-past rates.',
      color: '#f59e0b',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        </svg>
      )
    },
    {
      id: 'thumbnail-design',
      title: 'Thumbnail Design',
      description: 'Designing high-contrast, attention-grabbing grid covers with expressive typography to boost organic profile clicks.',
      color: '#10b981',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.9 2.9m-18 8.75h18a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0022 4.5H2a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 002 21.75z" />
        </svg>
      )
    }
  ];

  const TIERS: PriceTier[] = [
    {
      name: 'Basic',
      price: '₹4,999',
      description: '10 Reels edited per month. Perfect for creators testing out short-form video branding.',
      features: [
        '10 professional reels',
        'Dynamic captions overlay',
        'Standard background audio cleaning',
        'Basic typography highlights',
        '2 revisions per video',
        '4-5 days delivery turnarounds'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '₹8,999',
      description: '20 Reels edited per month. Ideal for active profiles looking to scale post volumes.',
      features: [
        '20 professional reels',
        'Dynamic captions & custom emojis',
        'Motion graphics overlays & SFX',
        'Trend research & audio pairing',
        '3 revisions per video',
        'Priority 48-hour delivery turnarounds'
      ],
      popular: false
    },
    {
      name: 'Viral',
      price: '₹12,999',
      description: '30 Reels edited per month. Our ultimate growth package containing hooks blueprints & covers.',
      features: [
        '30 high-converting viral reels',
        'Custom kinetic typography subtitles',
        'Advanced motion graphics & animations',
        'Hook optimization blueprint audits',
        'High-CTR custom thumbnail covers',
        'Unlimited revisions support',
        'Direct WhatsApp editor communications'
      ],
      popular: true
    }
  ];

  return (
    <main className={styles.reelPage}>
      {/* Background gradients globally rendered in layout.tsx */}
      <div className="container">
        
        {/* Hero Header */}
        <header className={styles.headerSection}>
          <span className={styles.badge}>REEL EDITING SUITE</span>
          <h1 className={styles.title}>Craft Viral Short Videos</h1>
          <p className={styles.subtitle}>
            Maximize watch time, elevate visual pacing, and design high-converting hooks for Instagram Reels & YouTube Shorts.
          </p>
        </header>

        {/* Features Grid */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 className={styles.sectionTitle}>Video Capabilities</h2>
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
          <h2 className={styles.sectionTitle}>Flexible Reel Bundles</h2>
          
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
              <h2 className={styles.ctaTitle}>Ready to Boost Video Retention?</h2>
              <p className={styles.ctaDesc}>
                Set up custom captions templates, motion graphics assets, and high-pacing hooks. Work directly with our video editors.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/#contact-section" className={styles.primaryBtn}>
                  Order Reels Package
                  <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link href="/services" className={styles.secondaryBtn}>
                  View Other Services
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
