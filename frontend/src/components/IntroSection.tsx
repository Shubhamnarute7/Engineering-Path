import Link from 'next/link';
import styles from './IntroSection.module.css';

export default function IntroSection() {
  return (
    <section className={styles.introSection} id="intro-section">
      <div className="container" style={{ textAlign: 'center' }}>
        <div className={styles.heroBadge}>AI-Powered Admissions</div>
        <h2 className={styles.introTitle}>Find Your Perfect Path to Engineering Success</h2>
        <p className={styles.introDesc}>
          EngineeringPath AI leverages machine learning to predict your MHT-CET State Merit Rank and instantly recommends
          Safe, Moderate, and Dream colleges based on dynamic admission trends.
        </p>
        <div className={styles.introActions}>
          <Link href="/predictor" className="btn-primary">
            Try Predictor Tool
            <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24"><path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
          </Link>
          <a href="#features-section" className="btn-secondary">Learn More</a>
        </div>
      </div>
    </section>
  );
}
