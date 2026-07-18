'use client';

import styles from './CareerCTA.module.css';

const ENROLL_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd9rJsC5I7Dw0x78-1VSuQAoBed7g2KXBibvUFZTDfKv3mYZQ/viewform?usp=dialog';

export default function CareerCTA() {
  return (
    <section className={styles.careers} id="careers-section">
      <div className="container">
        <div className={`${styles.banner} glass-card`}>
          <div className={styles.glow} />
          
          <div className={styles.content}>
            <span className={styles.badge}>WE ARE HIRING</span>
            <h2 className={styles.title}>Build the Future of Engineering Education</h2>
            <p className={styles.desc}>
              Are you passionate about AI, Machine Learning, or student mentorship? Join EngineeringPath AI as a software engineer intern, AI content creator, or campus ambassador at your college.
            </p>
            
            <div className={styles.actions}>
              <a href={ENROLL_URL} target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
                Apply Now
                <svg className={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a href="mailto:careers@engineeringpath.ai" className={styles.secondaryBtn}>
                Contact Careers
              </a>
            </div>
          </div>

          <div className={styles.rolesGrid}>
            <div className={styles.roleCard}>
              <h4>Campus Ambassadors</h4>
              <p>Lead tech communities, webinars, and drive user engagement at your college campus.</p>
            </div>
            <div className={styles.roleCard}>
              <h4>AI / Software Interns</h4>
              <p>Build predictive algorithms, frontend dashboards, and deploy production ML systems.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
