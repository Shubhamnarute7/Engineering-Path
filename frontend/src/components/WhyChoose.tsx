'use client';

import styles from './WhyChoose.module.css';

const STATS = [
  {
    value: '±20',
    label: 'Rank Accuracy',
    description: 'Decision Tree ML algorithm predicts Maharashtra General Merit list positioning with minimal mean absolute error.'
  },
  {
    value: 'IIT & COEP',
    label: 'Mentor Network',
    description: 'Curriculum co-designed and supervised by graduates from top institutes like COEP and IITs.'
  },
  {
    value: '10+',
    label: 'Hands-on Projects',
    description: 'Build real-world code assets from RAG PDF search tools to CNN image classifiers and autonomous agent crews.'
  },
  {
    value: '100%',
    label: 'Industry Aligned',
    description: 'Skip standard outdated textbooks and learn the actual frameworks (LangChain, CrewAI, Scikit-Learn) used in production.'
  }
];

export default function WhyChoose() {
  return (
    <section className={styles.whyChoose} id="why-choose">
      <div className="container">
        <div className={styles.wrapper}>
          {/* Left - Text Header */}
          <div className={styles.textSide}>
            <span className={styles.subtitle}>WHY ENGINEERINGPATH AI</span>
            <h2 className={styles.title}>Precision Algorithms. Practical Skillsets.</h2>
            <p className={styles.description}>
              We bridge the massive divide between traditional university engineering academics and real-world technology demands. Whether you are finding the right college or building high-level AI products, we provide data-backed clarity.
            </p>

            <div className={styles.bullets}>
              <div className={styles.bulletItem}>
                <div className={styles.bulletCheck}>✓</div>
                <div>
                  <strong>No More Cutoff Guesswork:</strong> Backed by official historic admission datasets.
                </div>
              </div>
              <div className={styles.bulletItem}>
                <div className={styles.bulletCheck}>✓</div>
                <div>
                  <strong>End-to-End Skill Development:</strong> Go from writing basic Python to orchestrating autonomous agent swarms.
                </div>
              </div>
              <div className={styles.bulletItem}>
                <div className={styles.bulletCheck}>✓</div>
                <div>
                  <strong>Active Community Support:</strong> Join our student forum to share ideas, resolve bugs, and collaborate.
                </div>
              </div>
            </div>
          </div>

          {/* Right - Grid Stats */}
          <div className={styles.statsSide}>
            <div className={styles.statsGrid}>
              {STATS.map((stat, idx) => (
                <div key={idx} className={`${styles.statCard} glass-card`}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                  <p className={styles.statDesc}>{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
