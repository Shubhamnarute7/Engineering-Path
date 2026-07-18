'use client';

import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    quote: "EngineeringPath AI saved me weeks of manual cutoff spreadsheet searching. The rank predictor got my state merit placement spot-on, and the recommendation tool helped me lock COEP Computer Engineering in CAP Round 2!",
    name: "Aditya Deshmukh",
    college: "COEP Tech Pune",
    branch: "Computer Engineering",
    avatarColor: "linear-gradient(135deg, #a78bfa, #7c3aed)"
  },
  {
    quote: "Shubham Narute's ML & Generative AI programs are absolutely state-of-the-art. Building a custom PDF chatbot and a multi-agent Stock Research assistant gave me actual skills that helped me clear my placement interviews.",
    name: "Rohan Kulkarni",
    college: "VJTI Mumbai",
    branch: "Information Technology",
    avatarColor: "linear-gradient(135deg, #34d399, #10b981)"
  },
  {
    quote: "I was highly confused between choosing Entc at a top college vs CS at a lower tier one. The 1-on-1 mentorship sessions gave me the complete roadmap. Currently at PICT, building neural network projects confidently!",
    name: "Sneha Patil",
    college: "PICT Pune",
    branch: "Electronics & Telecommunication",
    avatarColor: "linear-gradient(135deg, #60a5fa, #3b82f6)"
  }
];

export default function Testimonials() {
  return (
    <section className={styles.testimonials} id="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2>Student Testimonials</h2>
          <p>Read how engineering aspirants and developers leverage our tools to secure admissions and learn AI.</p>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`${styles.card} glass-card`}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.quote}>&quot;{t.quote}&quot;</p>
              
              <div className={styles.user}>
                <div className={styles.avatar} style={{ background: t.avatarColor }}>
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className={styles.name}>{t.name}</h4>
                  <p className={styles.detail}>{t.college} • {t.branch}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
