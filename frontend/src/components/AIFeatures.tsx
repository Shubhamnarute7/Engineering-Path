'use client';

import styles from './AIFeatures.module.css';

const FEATURES = [
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Rank Prediction',
    desc: 'Uses an optimized Decision Tree pipeline to estimate your Maharashtra General Merit Rank based on percentile scoring, with an accuracy range of ±20 ranks.',
    color: '#a78bfa'
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Smart Recommender',
    desc: 'Instantly classifies top government and private engineering colleges in Maharashtra into Safe, Moderate, and Dream buckets matching your personal engineering branch preferences.',
    color: '#34d399'
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A2.25 2.25 0 0112.75 21.5h-1.5a2.25 2.25 0 01-2.25-2.263V19.13m0-3.07A9.38 9.38 0 016 19.5a9.38 9.38 0 01-4.25-1.077 4.125 4.125 0 017.532-2.484M12 12.75A4.5 4.5 0 1012 3.75 4.5 4.5 0 0012 12.75zm1.5-12a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm10.5 7.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'Profile Matching',
    desc: 'Cross-references real historic candidate lists by category (Open, OBC, SC, ST, EWS) and seat types (TFWS, Home District, All India) for realistic context.',
    color: '#60a5fa'
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-.813-5.096M9 21h7.5M12 11.25a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'AI Tech Curriculum',
    desc: 'Intensive modular learning tracks built around core industry requirements, letting you transition directly into roles like AI Engineer or Data Scientist.',
    color: '#f59e0b'
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h9m-9 3h9m-9 3h9m-9-12h9a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0118 20.25H6.75A2.25 2.25 0 014.5 18V5.25A2.25 2.25 0 016.75 3h.75z" />
      </svg>
    ),
    title: 'Choice Filling Guide',
    desc: 'Receive dynamic list builders to submit in your CAP rounds, optimizing the sequence of colleges to maximize your chances of secure allocation.',
    color: '#ec4899'
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Lifetime Portal Access',
    desc: 'Enroll once and get lifetime membership to updated lecture records, custom cheatsheets, coding templates, and student community portals.',
    color: '#14b8a6'
  }
];

export default function AIFeatures() {
  return (
    <section className={styles.features} id="features-section">
      <div className="container">
        <div className="section-header">
          <h2>Platform Capabilities</h2>
          <p>Explore the tools and services built directly into EngineeringPath AI to accelerate your college search and career progression.</p>
        </div>

        <div className={styles.grid}>
          {FEATURES.map((f, i) => (
            <div key={i} className={`${styles.card} glass-card`}>
              <div className={styles.iconBox} style={{ color: f.color, backgroundColor: `${f.color}15` }}>
                {f.icon}
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
