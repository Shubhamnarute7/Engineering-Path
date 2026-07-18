'use client';

import Link from 'next/link';
import styles from './ServicesOverview.module.css';

const SERVICES = [
  {
    title: 'AI Admission Predictor',
    description: 'Find your perfect engineering college instantly. Predicts your general merit rank and offers safe, moderate, and dream options.',
    link: '/predictor',
    cta: 'Launch Predictor',
    tag: 'Predictive Algorithm',
    badgeColor: 'rgba(124, 58, 237, 0.15)',
    textColor: '#a78bfa',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    )
  },
  {
    title: 'AI Specialization Programs',
    description: 'Learn directly from industry experts. Standard syllabus tracks from Python basics to Deep Learning, LLMs, and Multi-Agent Crews.',
    link: '#courses-section',
    cta: 'Explore Programs',
    tag: 'Structured Syllabus',
    badgeColor: 'rgba(16, 185, 129, 0.15)',
    textColor: '#34d399',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 018.618 5.84 50.56 50.56 0 00-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M12 2.25V1.5m0 21v-1.5M2.25 12h-.75m21 0h-.75" />
      </svg>
    )
  },
  {
    title: 'Career & Tech Mentorship',
    description: 'Get structured path recommendations, resume builders, hackathon coaching, and direct industry ready alignment from IIT and COEP alumni.',
    link: '#mentor-section',
    cta: 'Meet Your Mentor',
    tag: '1-on-1 Guidance',
    badgeColor: 'rgba(59, 130, 246, 0.15)',
    textColor: '#60a5fa',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    )
  }
];

export default function ServicesOverview() {
  return (
    <section className={styles.services} id="services-overview">
      <div className="container">
        <div className="section-header">
          <h2>Premium AI Ecosystem</h2>
          <p>Discover advanced tools and intensive educational courses customized for engineering career prep.</p>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((s, idx) => (
            <div key={idx} className={`${styles.card} glass-card`}>
              <div className={styles.cardGlow} style={{ background: `radial-gradient(circle at 50% 50%, ${s.textColor}1a 0%, transparent 60%)` }} />
              
              <div className={styles.header}>
                <span className={styles.tag} style={{ background: s.badgeColor, color: s.textColor }}>
                  {s.tag}
                </span>
                <div className={styles.iconWrapper} style={{ color: s.textColor }}>
                  {s.icon}
                </div>
              </div>

              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.description}>{s.description}</p>

              <div className={styles.footer}>
                <Link href={s.link} className={styles.ctaBtn}>
                  {s.cta}
                  <svg className={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
