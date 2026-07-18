'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './login.module.css';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');

  // Handle redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      const callback = searchParams.get('callbackUrl') || (user.role === 'Admin' ? '/admin' : '/predictor');
      router.push(callback);
    }
  }, [isAuthenticated, user, searchParams, router]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Invalid email format';
    }
    if (!password) {
      errs.password = 'Password is required';
    }
    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (!validate()) return;

    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        // If unverified, redirect to verify email route
        if (res.status === 403) {
          router.push(`/verify-email?email=${encodeURIComponent(email)}`);
          return;
        }
        throw new Error(data.detail || 'Failed to authenticate');
      }

      login(data.access_token, {
        name: data.name,
        email: data.email,
        role: data.role
      });
    } catch (err: any) {
      setApiError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Mock SSO Login handlers
  const handleSSOLogin = (provider: 'Google' | 'GitHub') => {
    setLoading(true);
    setTimeout(() => {
      // Simulate quick mock SSO session
      const mockUser = {
        name: `SSO ${provider} User`,
        email: `${provider.toLowerCase()}@engineeringpath.ai`,
        role: 'Student' as const
      };
      // Simple mock token
      const mockToken = 'mock.sso.token';
      login(mockToken, mockUser);
      setLoading(false);
    }, 1000);
  };

  return (
    <main className={styles.loginPage}>
      <div className={`${styles.loginCard} glass-card`}>
        <div className={styles.cardGlow} style={{ background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.12) 0%, transparent 65%)' }} />
        
        <div className={styles.cardContent}>
          <header className={styles.cardHeader}>
            <div className={styles.logoText}>EngineeringPath AI</div>
            <p className={styles.cardSub}>Welcome back. Sign in to your portal.</p>
          </header>

          {apiError && <div className={styles.errorBanner}>⚠️ {apiError}</div>}

          <form onSubmit={handleSubmit}>
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

            <div className={styles.formGroup}>
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="••••••••"
              />
              {validationErrors.password && <span className={styles.validationError}>{validationErrors.password}</span>}
              <Link href="/forgot-password" className={styles.forgotLink}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className={styles.divider}>Or Sign In With</div>

          {/* Social SSO Buttons */}
          <div className={styles.ssoRow}>
            <button type="button" className={styles.ssoBtn} onClick={() => handleSSOLogin('Google')} disabled={loading}>
              <svg className={styles.ssoIcon} viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.3.6 4.6 1.8l2.4-2.4C17.3 1.6 14.9 1 12.24 1A9.997 9.997 0 0 0 2.25 11c0 5.5 4.5 10 10 10 5.7 0 10-4 10-10 0-.6-.1-1.2-.2-1.715H12.24Z" />
              </svg>
              Google
            </button>
            <button type="button" className={styles.ssoBtn} onClick={() => handleSSOLogin('GitHub')} disabled={loading}>
              <svg className={styles.ssoIcon} viewBox="0 0 24 24">
                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
          </div>

          <p className={styles.footerText}>
            New to EngineeringPath?
            <Link href="/register" className={styles.footerLink}>
              Create an Account
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="container" style={{ color: '#fff', paddingTop: '150px', textAlign: 'center', minHeight: '100vh', fontFamily: 'Outfit' }}>Loading Sign In...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
