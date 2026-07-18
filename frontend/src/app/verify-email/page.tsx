'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './verify-email.module.css';

function VerifyFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [apiError, setApiError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    setApiError('');
    setSuccessMsg('');

    if (!email) {
      setValidationError('Email address is missing');
      return;
    }
    if (!otp.trim()) {
      setValidationError('Verification code is required');
      return;
    }

    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Email verification failed');
      }

      setSuccessMsg(data.message || 'Email verified successfully!');
      
      // Auto login
      login(data.access_token, {
        name: data.name,
        email: email,
        role: data.role
      });

      setTimeout(() => {
        router.push(data.role === 'Admin' ? '/admin' : '/predictor');
      }, 1500);
    } catch (err: any) {
      setApiError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.verifyPage}>
      <div className={`${styles.verifyCard} glass-card`}>
        <div className={styles.cardGlow} style={{ background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.12) 0%, transparent 65%)' }} />
        
        <div className={styles.cardContent}>
          <header className={styles.cardHeader}>
            <div className={styles.logoText}>Verify Email</div>
            <p className={styles.cardSub}>
              We have generated a verification OTP code for **{email || 'your account'}**. Please enter it below.
            </p>
          </header>

          {apiError && <div className={styles.errorBanner}>⚠️ {apiError}</div>}
          {successMsg && <div className={styles.successBanner}>✓ {successMsg}</div>}

          <form onSubmit={handleSubmit}>
            {!searchParams.get('email') && (
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="student@engineeringpath.ai"
                  style={{ letterSpacing: 'normal', textAlign: 'left', fontSize: '0.9rem' }}
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label>6-Digit Verification Code *</label>
              <input 
                type="text" 
                value={otp} 
                onChange={e => setOtp(e.target.value)} 
                placeholder="123456"
                maxLength={6}
                disabled={loading || !!successMsg}
              />
              {validationError && <span className={styles.validationError}>{validationError}</span>}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading || !!successMsg}>
              {loading ? 'Verifying Code...' : 'Verify & Continue'}
            </button>
          </form>

          <p className={styles.footerText}>
            Didn&apos;t receive code?
            <Link href="/register" className={styles.footerLink}>
              Try Again
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="container" style={{ color: '#fff', paddingTop: '150px', textAlign: 'center', minHeight: '100vh', fontFamily: 'Outfit' }}>Loading Verification Form...</div>}>
      <VerifyFormContent />
    </Suspense>
  );
}
