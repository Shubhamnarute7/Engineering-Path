'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './MentorSection.module.css';

export default function MentorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Set initial hidden states to prevent flash of unstyled content
    gsap.set(el.querySelectorAll(`.${styles.headerReveal}`), { opacity: 0, y: 30 });
    gsap.set(el.querySelectorAll(`.${styles.cardReveal}`), { opacity: 0, y: 40 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const ctx = gsap.context(() => {
            // Header animation
            gsap.to(el.querySelectorAll(`.${styles.headerReveal}`), {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
            });

            // Card contents animation
            gsap.to(el.querySelectorAll(`.${styles.cardReveal}`), {
              opacity: 1,
              y: 0,
              duration: 1.0,
              stagger: 0.12,
              ease: 'back.out(1.15)',
              delay: 0.25,
            });
          }, el);

          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.mentorSection} id="mentor-section">
      <div className="container">
        <div className="section-header">
          <h2 className={styles.headerReveal}>Meet Your Mentor</h2>
          <p className={styles.headerReveal}>Learn directly from an AI practitioner & developer built for engineering students.</p>
        </div>

        <div className={styles.mentorContainer}>
          {/* Left Column */}
          <div className={styles.mentorLeft}>
            <div className={`${styles.profileCard} ${styles.cardReveal}`}>
              <div className={styles.avatarWrapper}>
                <img src="/mentor.jpg" alt="Shubham Narute" className={styles.avatar} />
              </div>
              <h3 className={styles.mentorName}>Shubham Narute</h3>
              <p className={styles.mentorTitle}>Founder & Lead AI/ML Mentor</p>
              <p className={styles.mentorSubtitle}>EngineeringPath AI</p>
              <div className={styles.tags}>
                <span className={styles.tag}>AI/ML Engineer</span>
                <span className={styles.tag}>B.Tech AI & ML</span>
              </div>
            </div>

            <div className={`${styles.missionCard} ${styles.cardReveal}`}>
              <div className={styles.cardIcon}>🎯</div>
              <h4>Our Mission</h4>
              <p className={styles.missionText}>
                &quot;My goal is to help engineering students bridge the gap between college education and industry
                requirements by providing practical AI skills, project experience, and career guidance.&quot;
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.mentorRight}>
            <div className={`${styles.detailsCard} ${styles.cardReveal}`}>
              <h4 className={styles.detailsHeading}>💡 Core Specializations</h4>
              <div className={styles.specGrid}>
                {['Artificial Intelligence (AI)', 'Machine Learning (ML)', 'Deep Learning (DL)', 'Generative AI', 'Python Development', 'Full Stack AI Applications', 'AI Automation & Agents'].map(s => (
                  <div className={styles.specItem} key={s}>{s}</div>
                ))}
              </div>
            </div>

            <div className={`${styles.detailsCard} ${styles.cardReveal}`}>
              <h4 className={styles.detailsHeading}>🏆 Experience & Achievements</h4>
              <ul className={styles.achievementsList}>
                <li>5★ Python Programmer on HackerRank</li>
                <li>AI/ML Project Developer</li>
                <li>Internship Experience in AI & Machine Learning</li>
                <li>Creator of AI-based solutions and educational platforms</li>
                <li>Active participant in Hackathons and Technical Events</li>
                <li>Mentor for Engineering Students interested in AI Careers</li>
              </ul>
            </div>

            <div className={styles.dualGrid}>
              <div className={`${styles.detailsCard} ${styles.mini} ${styles.cardReveal}`}>
                <h4 className={styles.detailsHeading}>📚 What Students Will Learn</h4>
                <ul className={styles.learnList}>
                  <li>Python Programming</li>
                  <li>Machine Learning Fundamentals</li>
                  <li>Deep Learning & Neural Networks</li>
                  <li>Generative AI & LLMs</li>
                  <li>AI Agents & Automation</li>
                  <li>Real-world AI Projects</li>
                  <li>Internship & Placement Preparation</li>
                </ul>
              </div>

              <div className={`${styles.detailsCard} ${styles.mini} ${styles.cardReveal}`}>
                <h4 className={styles.detailsHeading}>🚀 Areas of Mentorship</h4>
                <ul className={styles.mentorshipList}>
                  <li>Engineering Career Guidance</li>
                  <li>AI & ML Roadmaps</li>
                  <li>Project Development</li>
                  <li>Resume Building</li>
                  <li>Hackathon Guidance</li>
                  <li>Internship Preparation</li>
                  <li>Placement Readiness</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
