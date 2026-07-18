'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './reset-password.module.css';

function ResetFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email) errs.email = 'Email address is required';
    if (!otp.trim()) errs.otp = 'Verification OTP code is required';
    if (!newPassword) {
      errs.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      errs.newPassword = 'Password must be at least 6 characters';
    }
    if (newPassword !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    setSuccessMsg('');

    if (!validate()) return;

    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, new_password: newPassword })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Reset password failed');
      }

      setSuccessMsg(data.message || 'Password updated successfully!');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err: any) {
      setApiError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.resetPage}>
      <div className={`${styles.resetCard} glass-card`}>
        <div className={styles.cardGlow} style={{ background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.12) 0%, transparent 65%)' }} />
        
        <div className={styles.cardContent}>
          <header className={styles.cardHeader}>
            <div className={styles.logoText}>Reset Password</div>
            <p className={styles.cardSub}>
              Enter the reset OTP code sent to your email and set your new credentials.
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
                  placeholder="e.g. student@engineeringpath.ai"
                />
                {validationErrors.email && <span className={styles.validationError}>{validationErrors.email}</span>}
              </div>
            )}

            <div className={styles.formGroup}>
              <label>OTP Reset Code *</label>
              <input 
                type="text" 
                value={otp} 
                onChange={e => setOtp(e.target.value)} 
                placeholder="e.g. 654321"
                maxLength={6}
              />
              {validationErrors.otp && <span className={styles.validationError}>{validationErrors.otp}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>New Password *</label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)} 
                placeholder="Min. 6 characters"
              />
              {validationErrors.newPassword && <span className={styles.validationError}>{validationErrors.newPassword}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Confirm Password *</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                placeholder="Confirm password"
              />
              {validationErrors.confirmPassword && <span className={styles.validationError}>{validationErrors.confirmPassword}</span>}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading || !!successMsg}>
              {loading ? 'Updating Password...' : 'Reset Password'}
            </button>
          </form>

          <p className={styles.footerText}>
            Go back to
            <Link href="/login" className={styles.footerLink}>
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="container" style={{ color: '#fff', paddingTop: '150px', textAlign: 'center', minHeight: '100vh', fontFamily: 'Outfit' }}>Loading Form...</div>}>
      <ResetFormContent />
    </Suspense>
  );
}
