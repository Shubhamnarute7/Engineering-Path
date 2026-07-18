'use client';

import { useState } from 'react';
import styles from './ContactCTA.module.css';

export default function ContactCTA() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  return (
    <section className={styles.contact} id="contact-section">
      <div className="container">
        <div className={styles.wrapper}>
          {/* Left Column */}
          <div className={styles.infoSide}>
            <span className={styles.subtitle}>GET IN TOUCH</span>
            <h2 className={styles.title}>Have Questions? Let&apos;s Connect.</h2>
            <p className={styles.desc}>
              Whether you need details regarding MHT-CET counseling lists, our Python & AI specialization courses, or general career mentorship, we are here to assist.
            </p>

            <div className={styles.contactPoints}>
              <div className={styles.point}>
                <div className={styles.pointIcon}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h4>Email Us Directly</h4>
                  <p className={styles.linkText}>support@engineeringpath.ai</p>
                </div>
              </div>

              <div className={styles.point}>
                <div className={styles.pointIcon}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                </div>
                <div>
                  <h4>Student Community</h4>
                  <p className={styles.linkText}>Join 1200+ Maharashtra tech students on Discord</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className={styles.formSide}>
            <div className={`${styles.formCard} glass-card`}>
              {submitted ? (
                <div className={styles.successState}>
                  <div className={styles.successIcon}>✓</div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. One of our student mentors will respond within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className={styles.resetBtn}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aditya Deshmukh"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. aditya@gmail.com"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your query or course details you want to learn..."
                      rows={4}
                      required
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? (
                      <span className="loader" style={{ width: 18, height: 18, borderWidth: 2 }} />
                    ) : (
                      <>
                        Send Message
                        <svg className={styles.sendIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
