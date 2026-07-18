'use client';

import Link from 'next/link';
import styles from './about.module.css';

interface ValueItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

interface Milestone {
  date: string;
  title: string;
  desc: string;
}

export default function AboutPage() {
  const VALUES: ValueItem[] = [
    {
      title: 'Innovation',
      desc: 'Deploying the latest Scikit-Learn pipelines and modern Next.js frameworks.',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: '#7c3aed' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      )
    },
    {
      title: 'Transparency',
      desc: 'Providing clear statistical confidence levels and zone cutoffs with zero fluff.',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: '#3b82f6' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: 'Reliability',
      desc: 'Keeping our prediction engines aligned with official DTE admission datasets.',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: '#10b981' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      )
    },
    {
      title: 'Impact',
      desc: 'Empowering candidates and colleges to maximize their placements potential.',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: '#f59e0b' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  const TEAM: TeamMember[] = [
    {
      name: 'Shubham Narute',
      role: 'Founder & AI Engineer',
      bio: 'Leading EngineeringPath AI with a vision to build AI-powered products and digital solutions for businesses and students.',
      image: '/shubham.jpg',
      linkedin: 'https://in.linkedin.com/in/shubham-narute-19a546289',
      github: 'https://github.com/shubhamnarute',
      email: 'shubham@engineeringpath.ai'
    },
    {
      name: 'Harsh Patil',
      role: 'Co-Founder',
      bio: 'Responsible for business strategy, operations, partnerships, and scaling EngineeringPath AI.',
      image: '/harsh.jpg',
      linkedin: 'https://in.linkedin.com/in/harsh-patil-11264b2a8',
      email: 'harsh@engineeringpath.ai'
    },
    {
      name: 'Ayush Wasawade',
      role: 'Chief Executive Officer (CEO)',
      bio: 'Leading company operations, client success, execution, and business growth.',
      image: '/ayush.jpg',
      linkedin: 'https://in.linkedin.com/in/ayush-vasawade',
      email: 'ayush@engineeringpath.ai'
    }
  ];

  const TIMELINE: Milestone[] = [
    {
      date: 'OCTOBER 2024',
      title: 'Algorithm Launch',
      desc: 'Created the first basic MHT-CET rank prediction script using Python pandas tools to parse local CAP cutoffs.'
    },
    {
      date: 'FEBRUARY 2025',
      title: 'Dashboard Release',
      desc: 'Ingested 50,000+ official DTE data points and launched the online interactive college predictor portal.'
    },
    {
      date: 'JULY 2025',
      title: 'Scale & B2B Pivot',
      desc: 'Expanded operations to deliver Next.js development, advertising, and reels editing templates for coaching academies.'
    },
    {
      date: 'JANUARY 2026',
      title: 'Next-Gen Redesign',
      desc: 'Rewrote the complete system into a premium dark-themed SaaS experience, highlighting core agency services.'
    }
  ];

  return (
    <main className={styles.aboutPage}>
      <div className="container">
        
        {/* Header */}
        <header className={styles.headerSection}>
          <span className={styles.badge}>Our Story</span>
          <h1 className={styles.title}>About EngineeringPath AI</h1>
          <p className={styles.subtitle}>
            A collective of developers, marketing strategists, and counselors bridging the information gap for Maharashtra colleges & aspirants.
          </p>
        </header>

        {/* Mission & Vision */}
        <section className={styles.mvGrid}>
          <div className={`${styles.mvCard} glass-card`}>
            <div className={styles.cardGlow} style={{ background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 60%)' }} />
            <div className={styles.cardContent}>
              <div className={styles.iconWrapper} style={{ color: '#7c3aed', backgroundColor: 'rgba(124, 58, 237, 0.15)' }}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className={styles.cardTitle}>Our Mission</h2>
              <p className={styles.cardText}>
                To build high-accuracy machine learning predictor engines and co-design specialized visual resources that guide engineering students into their dream campuses throughout Maharashtra.
              </p>
            </div>
          </div>

          <div className={`${styles.mvCard} glass-card`}>
            <div className={styles.cardGlow} style={{ background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)' }} />
            <div className={styles.cardContent}>
              <div className={styles.iconWrapper} style={{ color: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.15)' }}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className={styles.cardTitle}>Our Vision</h2>
              <p className={styles.cardText}>
                To establish a transparent, data-driven admissions ecosystem. We bridge the structural information divide in CAP rounds by putting precise forecasting models in the hands of every student.
              </p>
            </div>
          </div>
        </section>

        {/* Our Journey Narrative */}
        <section style={{ marginBottom: '6rem', maxWidth: '800px', margin: '0 auto 6rem auto', textAlign: 'center' }}>
          <h2 className={styles.sectionTitle}>Our Journey</h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.8', fontStyle: 'italic' }}>
            &quot;EngineeringPath AI began as a simple rank prediction algorithm created by Shubham Narute to help local Maharashtra candidates decode CAP round cutoffs. Spotting the huge gap in counseling tech, we trained precise models, built interactive dashboards, and expanded into a B2B development and digital marketing agency partnering with educational institutes across the state.&quot;
          </p>
        </section>

        {/* Core Values */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 className={styles.sectionTitle}>Our Core Values</h2>
          <div className={styles.valuesGrid}>
            {VALUES.map((val, idx) => (
              <div key={idx} className={`${styles.valueCard} glass-card`}>
                <div className={styles.valueIcon}>{val.icon}</div>
                <h3 className={styles.valueTitle}>{val.title}</h3>
                <p className={styles.valueText}>{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className={styles.timelineSection}>
          <h2 className={styles.sectionTitle}>Development Timeline</h2>
          <div className={styles.timelineContainer}>
            {TIMELINE.map((item, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={`${styles.timelineCard} glass-card`}>
                  <div className={styles.timelineDate}>{item.date}</div>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  <p className={styles.timelineText}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Team */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 className={styles.sectionTitle}>Our Core Team</h2>
          <div className={styles.teamGrid}>
            {TEAM.map((member, idx) => (
              <div key={idx} className={`${styles.teamCard} glass-card`}>
                <div className={styles.cardGlowBlue} />
                <div className={styles.avatar}>
                  <img src={member.image} alt={member.name} className={styles.avatarImg} />
                </div>
                <h3 className={styles.memberName}>{member.name}</h3>
                <div className={styles.memberRole}>{member.role}</div>
                <p className={styles.memberBio}>{member.bio}</p>
                <div className={styles.socialLinks}>
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
                      <svg viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noreferrer" className={styles.socialBtn} aria-label="GitHub">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.72.37-1.22.69-1.5-2.2-.25-4.52-1.1-4.52-4.9 0-1.08.38-1.96 1-2.65-.1-.26-.43-1.26.1-2.62 0 0 .83-.27 2.72 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.89-1.29 2.72-1.02 2.72-1.02.53 1.36.2 2.36.1 2.62.63.69 1 1.57 1 2.65 0 3.8-2.3 4.65-4.5 4.9.36.3.68.9.68 1.81V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                      </svg>
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} className={styles.socialBtn} aria-label="Email">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className={styles.ctaSection}>
          <div className={`${styles.ctaCard} glass-card`}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Accelerate with Us</h2>
              <p className={styles.ctaDesc}>
                Whether you need to scale your educational brand or want to join our engineering crew, we build high-impact platforms.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                <Link href="/careers" className={styles.primaryBtn}>
                  View Careers Openings
                  <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link href="/#contact-section" className={styles.primaryBtn} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: 'none' }}>
                  Contact Specialists
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
