'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './forgot-password.module.css';

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [apiError, setApiError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    setApiError('');
    setSuccessMsg('');

    if (!email) {
      setValidationError('Email is required');
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError('Invalid email format');
      return;
    }

    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Failed to trigger reset email');
      }

      setSuccessMsg(data.message || 'Verification code sent.');
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 1500);
    } catch (err: any) {
      setApiError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.forgotPage}>
      <div className={`${styles.forgotCard} glass-card`}>
        <div className={styles.cardGlow} style={{ background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.12) 0%, transparent 65%)' }} />
        
        <div className={styles.cardContent}>
          <header className={styles.cardHeader}>
            <div className={styles.logoText}>Forgot Password</div>
            <p className={styles.cardSub}>
              Enter your email address and we will generate a secure verification OTP code.
            </p>
          </header>

          {apiError && <div className={styles.errorBanner}>⚠️ {apiError}</div>}
          {successMsg && <div className={styles.successBanner}>✓ {successMsg}</div>}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="e.g. student@engineeringpath.ai"
                disabled={loading || !!successMsg}
              />
              {validationError && <span className={styles.validationError}>{validationError}</span>}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading || !!successMsg}>
              {loading ? 'Sending OTP...' : 'Send Reset Code'}
            </button>
          </form>

          <p className={styles.footerText}>
            Remembered password?
            <Link href="/login" className={styles.footerLink}>
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}
