'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.04)', padding: '5rem 0 3rem 0', background: 'rgba(3, 0, 20, 0.6)', marginTop: '6rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(3, 1fr)', gap: '3rem', textAlign: 'left', marginBottom: '3rem' }}>
        
        {/* Logo and Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="footer-logo">
            <img src="/logo.jpg" alt="EngineeringPath AI Logo" style={{ width: 32, height: 32, borderRadius: '50%' }} />
            <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>EngineeringPath AI</span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '280px' }}>
            AI-powered rank prediction & engineering roadmap education co-designed by IIT & COEP mentors.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            {/* Social Icons */}
            <a href="#discord" aria-label="Discord Community" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#7c3aed'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
              <svg style={{ width: 20, height: 20 }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
              </svg>
            </a>
            <a href="#github" aria-label="Github Repo" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#7c3aed'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
              <svg style={{ width: 20, height: 20 }} fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
            <a href="#linkedin" aria-label="Linkedin" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#7c3aed'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
              <svg style={{ width: 20, height: 20 }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 1 - Tools */}
        <div>
          <h4 style={{ fontFamily: 'Outfit', color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, marginBottom: '1.25rem' }}>Admissions Tools</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <li><Link href="/predictor" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Rank Predictor</Link></li>
            <li><Link href="/predictor" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>College Recommender</Link></li>
            <li><Link href="/predictor" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>CAP Cutoff Analytics</Link></li>
            <li><Link href="/#intro-section" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Choice List Builder</Link></li>
          </ul>
        </div>

        {/* Column 2 - Programs */}
        <div>
          <h4 style={{ fontFamily: 'Outfit', color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, marginBottom: '1.25rem' }}>AI Specializations</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <li><Link href="/#courses-section" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Python for AI & ML</Link></li>
            <li><Link href="/#courses-section" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Machine Learning Basics</Link></li>
            <li><Link href="/#courses-section" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Deep Learning Core</Link></li>
            <li><Link href="/#courses-section" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Generative AI & LLMs</Link></li>
          </ul>
        </div>

        {/* Column 3 - Company */}
        <div>
          <h4 style={{ fontFamily: 'Outfit', color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, marginBottom: '1.25rem' }}>Company</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <li><Link href="/#intro-section" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>About Us</Link></li>
            <li><Link href="/#mentor-section" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Our Mentors</Link></li>
            <li><Link href="/#careers-section" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Careers</Link></li>
            <li><Link href="/#contact-section" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Contact Support</Link></li>
          </ul>
        </div>

      </div>

      {/* Copyright Bottom Bar */}
      <div className="container" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.04)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        <p>© 2026 EngineeringPath AI. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#terms" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Terms of Service</a>
          <a href="#privacy" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
