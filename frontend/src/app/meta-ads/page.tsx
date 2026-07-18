'use client';

import Link from 'next/link';
import styles from './meta-ads.module.css';

interface MetaService {
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

export default function MetaAdsPage() {
  const SERVICES: MetaService[] = [
    {
      id: 'facebook-ads',
      title: 'Facebook Ads',
      description: 'Deploy highly targeted News Feed and sidebar ad campaigns configured to capture student and parent interests in Maharashtra.',
      color: '#3b82f6',
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
        </svg>
      )
    },
    {
      id: 'instagram-ads',
      title: 'Instagram Ads',
      description: 'Engage engineering aspirants directly via Reels and Stories using visually appealing, co-designed student testimonial videos.',
      color: '#ec4899',
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    },
    {
      id: 'lead-generation',
      title: 'Lead Generation',
      description: 'Build native Instant Forms and optimized landing pages to capture verified mobile numbers and email addresses of students.',
      color: '#10b981',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5L12 12.5L5 7.5m14 9L12 21.5L5 16.5m14-9V16.5a2.5 2.5 0 01-2.5 2.5H7.5A2.5 2.5 0 015 16.5V7.5A2.5 2.5 0 017.5 5h9A2.5 2.5 0 0119 7.5z" />
        </svg>
      )
    },
    {
      id: 'pixel-setup',
      title: 'Pixel Setup',
      description: 'Integrate the Meta Pixel & Conversational API (CAPI) on Next.js to track conversions, page views, and button clicks reliably.',
      color: '#14b8a6',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      )
    },
    {
      id: 'campaign-opt',
      title: 'Campaign Optimization',
      description: 'Continuous A/B copy tests, bid tweaks, budget distribution adjustments, and audience targeting reviews to maximize ROAS.',
      color: '#f59e0b',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
        </svg>
      )
    },
    {
      id: 'retargeting',
      title: 'Retargeting',
      description: 'Reach back out to students who qualified ranks on our predictor tool or visited courses pages with customized discount codes.',
      color: '#7c3aed',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      )
    }
  ];

  const TIERS: PriceTier[] = [
    {
      name: 'Starter',
      price: '₹4,999',
      description: 'Perfect for small institutes wanting to test Meta ad conversion capabilities.',
      features: [
        'Up to ₹20,000 monthly ad spend manage',
        '2 ad campaign setups',
        'Pixel event setup configuration',
        'Standard audience definition targeting',
        'Weekly analytics reporting'
      ],
      popular: false
    },
    {
      name: 'Growth',
      price: '₹9,999',
      description: 'Our most popular plan, optimized for active campaigns and choice list launches.',
      features: [
        'Up to ₹75,000 monthly ad spend manage',
        '5 active ad campaign setups',
        'Pixel + Custom Conversion events',
        'Advanced custom & lookalike audiences',
        'A/B copy & creative split tests',
        'Weekly reporting + dedicated Slack support'
      ],
      popular: true
    },
    {
      name: 'Scale',
      price: '₹19,999',
      description: 'Full-scale custom campaigns for colleges and premium coaching academies.',
      features: [
        'Unlimited monthly ad spend manage',
        'Unlimited ad campaign setups',
        'API & CAPI (Server-side Pixel) setup',
        'Automated CRM lead sync setup',
        'Interactive Looker Studio dashboard',
        'Dedicated Ads Account Manager'
      ],
      popular: false
    }
  ];

  return (
    <main className={styles.metaPage}>
      {/* Background radial gradients globally rendered in layout.tsx */}
      <div className="container">
        
        {/* Hero Header */}
        <header className={styles.headerSection}>
          <span className={styles.badge}>Meta Ads Management</span>
          <h1 className={styles.title}>Scale Admissions & Leads</h1>
          <p className={styles.subtitle}>
            Reach Maharashtra engineering aspirants, qualifiy student intent, and maximize conversion ROAS on Facebook & Instagram.
          </p>
        </header>

        {/* Services Showcase */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 className={styles.sectionTitle}>Campaign Capabilities</h2>
          <div className={styles.grid}>
            {SERVICES.map((s) => (
              <div key={s.id} className={`${styles.card} glass-card`}>
                <div 
                  className={styles.cardGlow} 
                  style={{ background: `radial-gradient(circle at 50% 50%, ${s.color}18 0%, transparent 60%)` }} 
                />
                
                <div className={styles.cardContent}>
                  <div className={styles.iconWrapper} style={{ color: s.color, backgroundColor: `${s.color}12` }}>
                    {s.icon}
                  </div>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <p className={styles.description}>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 className={styles.sectionTitle}>Transparent Pricing Packages</h2>
          
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

        {/* Call to Action at Bottom */}
        <section className={styles.ctaSection}>
          <div className={`${styles.ctaCard} glass-card`}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to Launch Your Campaigns?</h2>
              <p className={styles.ctaDesc}>
                Set up custom conversion pixels, custom audiences, and high-ROAS ad creatives. Work directly with our ad specialists.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/#contact-section" className={styles.primaryBtn}>
                  Launch Meta Campaign
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
