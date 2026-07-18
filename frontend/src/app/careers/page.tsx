'use client';

import Link from 'next/link';
import styles from './careers.module.css';

interface Job {
  id: string;
  title: string;
  location: 'Remote' | 'Hybrid' | 'On-site';
  type: 'Full-time' | 'Internship';
  description: string;
  color: string;
}

export default function CareersPage() {
  const OPENINGS: Job[] = [
    {
      id: 'ai-ml-intern',
      title: 'AI/ML Intern',
      location: 'Remote',
      type: 'Internship',
      description: 'Analyze candidate rank distributions and help train machine learning classification models for cutoff predictions.',
      color: '#7c3aed'
    },
    {
      id: 'frontend-dev',
      title: 'frontend-dev',
      location: 'Hybrid',
      type: 'Full-time',
      description: 'Develop responsive glassmorphic layouts, custom animations, and coordinate Client Components under Next.js.',
      color: '#3b82f6'
    },
    {
      id: 'backend-dev',
      title: 'backend-dev',
      location: 'Hybrid',
      type: 'Full-time',
      description: 'Optimize FastAPI route payloads, secure SQL databases, and structure serverless API deployments.',
      color: '#10b981'
    },
    {
      id: 'react-dev',
      title: 'react-dev',
      location: 'Remote',
      type: 'Full-time',
      description: 'Maintain reusable React components, coordinate local states hooks, and structure clean client builds.',
      color: '#06b6d4'
    },
    {
      id: 'python-dev',
      title: 'python-dev',
      location: 'Remote',
      type: 'Full-time',
      description: 'Ingest raw PDF datasets using scrapers, clean candidate tables, and build regression data workflows.',
      color: '#f59e0b'
    },
    {
      id: 'video-editor',
      title: 'video-editor',
      location: 'Remote',
      type: 'Internship',
      description: 'Edit pacing for Reels, Shorts, and marketing videos. Configure custom captions overlays and sound design cuts.',
      color: '#ef4444'
    },
    {
      id: 'graphic-designer',
      title: 'graphic-designer',
      location: 'Remote',
      type: 'Internship',
      description: 'Co-design brand logo guidelines, color tokens, presentation slides, and marketing carousels using Figma.',
      color: '#ec4899'
    },
    {
      id: 'digital-marketing',
      title: 'digital-marketing',
      location: 'Remote',
      type: 'Internship',
      description: 'Coordinate Meta ad accounts, setup custom pixel triggers, and optimize campaigns cost conversions.',
      color: '#14b8a6'
    },
    {
      id: 'biz-dev',
      title: 'biz-dev',
      location: 'Hybrid',
      type: 'Full-time',
      description: 'Outreach to coaching institutions in Maharashtra and coordinate campus events with student ambassadors.',
      color: '#f43f5e'
    }
  ];

  return (
    <main className={styles.careersPage}>
      <div className="container">
        
        {/* Header */}
        <header className={styles.headerSection}>
          <span className={styles.badge}>Join the team</span>
          <h1 className={styles.title}>Shape Future Education</h1>
          <p className={styles.subtitle}>
            Work with machine learning developers, designers, and marketing experts. Discover remote & hybrid openings at EngineeringPath AI.
          </p>
        </header>

        {/* Current Openings */}
        <section>
          <h2 className={styles.sectionTitle}>Current Openings</h2>
          
          <div className={styles.grid}>
            {OPENINGS.map((job) => (
              <div key={job.id} className={`${styles.jobCard} glass-card`}>
                <div 
                  className={styles.jobCardGlow} 
                  style={{ background: `radial-gradient(circle at 50% 50%, ${job.color}14 0%, transparent 60%)` }} 
                />
                
                <div className={styles.jobContent}>
                  <div className={styles.tagRow}>
                    <span className={`${styles.jobTag} ${styles.tagLocation}`}>{job.location}</span>
                    <span className={`${styles.jobTag} ${styles.tagType}`}>{job.type}</span>
                  </div>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  <p className={styles.jobDesc}>{job.description}</p>
                  
                  <Link 
                    href={`/apply?role=${job.id}`}
                    className={styles.applyBtn}
                  >
                    Apply Now
                    <svg className={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
