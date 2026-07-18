import styles from './FeaturesSection.module.css';

const FEATURES = [
  { icon: <svg style={{width:24,height:24}} viewBox="0 0 24 24"><path fill="currentColor" d="M12,5.5A2.5,2.5 0 0,1 14.5,8A2.5,2.5 0 0,1 12,10.5A2.5,2.5 0 0,1 9.5,8A2.5,2.5 0 0,1 12,5.5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C8.13,20 4.88,17.5 3.64,14C3.7,13.25 7.6,12 12,12C16.4,12 20.3,13.25 20.36,14C19.12,17.5 15.87,20 12,20Z" /></svg>, title: 'Rank Prediction', desc: 'Uses a highly-optimized Decision Tree pipeline to estimate your Maharashtra General Merit Rank with a mean absolute error of just ±20 ranks.' },
  { icon: <svg style={{width:24,height:24}} viewBox="0 0 24 24"><path fill="currentColor" d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3M18.82 11.29L12 15L5.18 11.29L1.91 13.07L12 18.57L22.09 13.07L18.82 11.29Z" /></svg>, title: 'Smart Recommender', desc: 'Categorizes top government and private engineering colleges into Safe, Moderate, and Dream buckets matching your branch preference.' },
  { icon: <svg style={{width:24,height:24}} viewBox="0 0 24 24"><path fill="currentColor" d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 1,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 1,0 13,8A3,3 0 0,0 16,11Z" /></svg>, title: 'Profile Matching', desc: 'Indexes official candidate databases to display actual candidate entries with matching percentile values, giving real-world context.' },
  { icon: <svg style={{width:24,height:24}} viewBox="0 0 24 24"><path fill="currentColor" d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.22,22.06 11.78,22.06 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.78,1.94 12.22,1.94 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5Z" /></svg>, title: 'Interactive UI', desc: 'Features state-of-the-art animations and glassmorphic design with React and Next.js, adding depth and visual excellence directly to your experience.' },
];

export default function FeaturesSection() {
  return (
    <section className={styles.featuresSection} id="features-section">
      <div className="container">
        <div className="section-header">
          <h2>Platform Capabilities</h2>
          <p>Designed with state-of-the-art predictive modules to make your college search organic and transparent.</p>
        </div>
        <div className={styles.featuresGrid}>
          {FEATURES.map((f, i) => (
            <div className={styles.featureCard} key={i}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
