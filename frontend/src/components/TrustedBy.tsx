'use client';

import styles from './TrustedBy.module.css';

const COLLEGES = [
  { name: 'COEP Pune', icon: (
    <svg viewBox="0 0 24 24" className={styles.collegeIcon} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 018.618 5.84 50.56 50.56 0 00-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M12 2.25V1.5m0 21v-1.5M2.25 12h-.75m21 0h-.75" />
    </svg>
  )},
  { name: 'VJTI Mumbai', icon: (
    <svg viewBox="0 0 24 24" className={styles.collegeIcon} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
  )},
  { name: 'SPIT Mumbai', icon: (
    <svg viewBox="0 0 24 24" className={styles.collegeIcon} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
  )},
  { name: 'PICT Pune', icon: (
    <svg viewBox="0 0 24 24" className={styles.collegeIcon} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v17.792m0-17.792a9.774 9.774 0 013.75-.724A9.775 9.775 0 0121 9.917H3A9.775 9.775 0 0110.5 2.38a9.774 9.774 0 012.25.724m-3 0h3" />
    </svg>
  )},
  { name: 'WCE Sangli', icon: (
    <svg viewBox="0 0 24 24" className={styles.collegeIcon} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  )}
];

export default function TrustedBy() {
  return (
    <section className={styles.trusted}>
      <div className="container">
        <p className={styles.label}>TRUSTED BY STUDENTS ADMITTED TO TOP MAHARASHTRA INSTITUTIONS</p>
        <div className={styles.logos}>
          {COLLEGES.map((c, i) => (
            <div key={i} className={styles.logoItem}>
              {c.icon}
              <span className={styles.name}>{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
