'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './register.module.css';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full Name is required';
    if (!email) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Invalid email format';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
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
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Registration failed');
      }

      // Successful registration redirects to verify email page with email query param
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setApiError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.registerPage}>
      <div className={`${styles.registerCard} glass-card`}>
        <div className={styles.cardGlow} style={{ background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.12) 0%, transparent 65%)' }} />
        
        <div className={styles.cardContent}>
          <header className={styles.cardHeader}>
            <div className={styles.logoText}>Create Account</div>
            <p className={styles.cardSub}>Join EngineeringPath AI and scale your admissions.</p>
          </header>

          {apiError && <div className={styles.errorBanner}>⚠️ {apiError}</div>}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="e.g. Abhi Patil"
              />
              {validationErrors.name && <span className={styles.validationError}>{validationErrors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="e.g. abhi@engineeringpath.ai"
              />
              {validationErrors.email && <span className={styles.validationError}>{validationErrors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Min. 6 characters"
              />
              {validationErrors.password && <span className={styles.validationError}>{validationErrors.password}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Account Role</label>
              <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="Student">Student (Counseling seeker)</option>
                <option value="Client">Client (Coaching Institute Owner)</option>
                <option value="Employee">Employee (Staff / Content Creator)</option>
                <option value="Admin">Admin (Platform Manager)</option>
              </select>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Registering Account...' : 'Sign Up'}
            </button>
          </form>

          <div className={styles.divider}>Already Have an Account?</div>

          <p className={styles.footerText}>
            Registered already?
            <Link href="/login" className={styles.footerLink}>
              Sign In Here
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}
