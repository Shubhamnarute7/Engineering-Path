'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './contact.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const FAQS: FAQItem[] = [
    {
      question: 'How quickly do you reply to contact inquiries?',
      answer: 'Our specialists typically review and respond to form submissions within 12-24 hours on business days.'
    },
    {
      question: 'Can we book a direct counseling call?',
      answer: 'Yes. You can inquire about our counselor options, or choose one of our specialized mentorship courses directly on the Pricing page.'
    },
    {
      question: 'Where is your main office located?',
      answer: 'Our headquarters is located at FC Road, Pune, Maharashtra. However, our engineering teams operate fully hybridly.'
    },
    {
      question: 'Do you offer customized agency agreements?',
      answer: 'Absolutely. If you have customized campaign budgets, complex LLM setups, or recurring video requests, we draft tailored Service Level Agreements (SLAs).'
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!subject.trim()) newErrors.subject = 'Subject is required';
    if (!message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    setLoading(true);

    // Mock submission delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <main className={styles.contactPage}>
      <div className="container">
        
        {/* Header */}
        <header className={styles.headerSection}>
          <span className={styles.badge}>Get In Touch</span>
          <h1 className={styles.title}>Connect With Our Team</h1>
          <p className={styles.subtitle}>
            Have questions about ranking predictions, marketing campaigns, or our courses? Send a message to our Pune headquarters.
          </p>
        </header>

        {/* Form and Info Stack split columns */}
        <div className={styles.dashboardGrid}>
          
          {/* Contact Form card (Left Column) */}
          <div className={`${styles.formCard} glass-card`}>
            <div className={styles.cardGlow} style={{ background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.12) 0%, transparent 65%)' }} />
            
            <div className={styles.formContent}>
              {!success ? (
                <>
                  <h3 className={styles.formTitle}>Send a Message</h3>
                  
                  <form onSubmit={handleFormSubmit}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label>Full Name *</label>
                        <input 
                          type="text" 
                          value={fullName} 
                          onChange={e => setFullName(e.target.value)} 
                          placeholder="e.g. Abhi"
                        />
                        {errors.fullName && <span className={styles.validationError}>{errors.fullName}</span>}
                      </div>

                      <div className={styles.formGroup}>
                        <label>Email Address *</label>
                        <input 
                          type="email" 
                          value={email} 
                          onChange={e => setEmail(e.target.value)} 
                          placeholder="e.g. abhi@gmail.com"
                        />
                        {errors.email && <span className={styles.validationError}>{errors.email}</span>}
                      </div>

                      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label>Subject *</label>
                        <input 
                          type="text" 
                          value={subject} 
                          onChange={e => setSubject(e.target.value)} 
                          placeholder="How can we help you?"
                        />
                        {errors.subject && <span className={styles.validationError}>{errors.subject}</span>}
                      </div>

                      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label>Message Content *</label>
                        <textarea 
                          value={message} 
                          onChange={e => setMessage(e.target.value)} 
                          placeholder="Write your inquiry details here..."
                        />
                        {errors.message && <span className={styles.validationError}>{errors.message}</span>}
                      </div>
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                      {loading ? 'Sending Message...' : 'Send Message'}
                    </button>
                  </form>
                </>
              ) : (
                <div className={styles.successState}>
                  <div className={styles.successIcon}>✓</div>
                  <h2 className={styles.successTitle}>Inquiry Sent!</h2>
                  <p className={styles.successDesc}>
                    Thank you for reaching out, **{fullName}**. We have received your inquiry regarding **&quot;{subject}&quot;**. Our team will respond shortly at **{email}**.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Info cards & Map Placeholder (Right Column) */}
          <div className={styles.infoStack}>
            
            {/* Business Email */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon} style={{ color: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.12)' }}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div className={styles.infoMeta}>
                <h4>Business Email</h4>
                <p>contact@engineeringpath.ai</p>
              </div>
            </div>

            {/* Phone Number */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon} style={{ color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.12)' }}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25V14.37a2.25 2.25 0 00-2.25-2.25h-3.064a2.25 2.25 0 00-2.25 2.247v1.83a8.25 8.25 0 01-6.138-6.138h1.83a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0013.5 3H11.25a2.25 2.25 0 00-2.25 2.25v2.25z" />
                </svg>
              </div>
              <div className={styles.infoMeta}>
                <h4>Phone Number</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>

            {/* WhatsApp */}
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className={styles.infoCard}>
              <div className={styles.infoIcon} style={{ color: '#14b8a6', backgroundColor: 'rgba(20, 184, 166, 0.12)' }}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025 4.486 4.486 0 00-.098-.315C3.366 16.93 2.25 14.6 2.25 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              </div>
              <div className={styles.infoMeta}>
                <h4>WhatsApp Support</h4>
                <p>Chat with us directly (wa.me/919876543210)</p>
              </div>
            </a>

            {/* Office Address */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon} style={{ color: '#ec4899', backgroundColor: 'rgba(236, 72, 153, 0.12)' }}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div className={styles.infoMeta}>
                <h4>Office Address</h4>
                <p>Office 402, Supreme Center, FC Road, Pune, MH, 411004</p>
              </div>
            </div>

            {/* Google Maps Placeholder */}
            <div className={styles.mapCard}>
              <div className={styles.mapTitle}>Location Finder</div>
              <div className={styles.mapVisual}>
                <div className={styles.mapGridLines} />
                <div className={styles.mapCenterMarker}>
                  <svg className={styles.mapPin} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className={styles.mapLabel}>EngineeringPath HQ, Pune</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* FAQ Accordion Section */}
        <section className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>Contact FAQs</h2>
          
          <div className={styles.faqList}>
            {FAQS.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <button className={styles.faqQuestion} onClick={() => toggleFaq(index)}>
                  <span className={styles.questionText}>{faq.question}</span>
                  <span className={`${styles.faqIcon} ${activeFaq === index ? styles.faqIconActive : ''}`}>+</span>
                </button>
                <div className={`${styles.faqAnswer} ${activeFaq === index ? styles.faqAnswerActive : ''}`}>
                  <p className={styles.answerText}>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
