'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './failure.module.css';

function FailurePageContent() {
  const searchParams = useSearchParams();
  
  const [planName, setPlanName] = useState('Growth Plan');
  const [errorCode, setErrorCode] = useState('ERR_INSUFFICIENT_FUNDS');
  const [errorMessage, setErrorMessage] = useState('The transaction was declined by the issuing bank due to insufficient funds.');
  const [provider, setProvider] = useState('Stripe');

  useEffect(() => {
    const plan = searchParams.get('plan');
    const err = searchParams.get('code');
    const msg = searchParams.get('message');
    const prov = searchParams.get('provider');

    if (plan) setPlanName(plan);
    if (err) setErrorCode(err);
    if (msg) setErrorMessage(msg);
    if (prov) setProvider(prov);
  }, [searchParams]);

  return (
    <main className={styles.failurePage}>
      <div className={`${styles.failureCard} glass-card`}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', background: 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.08) 0%, transparent 65%)' }} />
        
        <div className={styles.iconCircle}>
          <svg style={{ width: 42, height: 42 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className={styles.failureTitle}>Payment Failed</h1>
        <p className={styles.failureDesc}>
          We were unable to process your transaction. No charges have been made to your account.
        </p>

        <div className={styles.errorCard}>
          <div className={styles.errorRow}>
            <span className={styles.errorLabel}>Target Plan</span>
            <span className={styles.errorValue}>{planName}</span>
          </div>
          <div className={styles.errorRow}>
            <span className={styles.errorLabel}>Gateway Provider</span>
            <span className={styles.errorValue}>{provider}</span>
          </div>
          <div className={styles.errorRow}>
            <span className={styles.errorLabel}>Diagnostic Code</span>
            <span className={styles.errorValue} style={{ color: '#fca5a5', fontFamily: 'monospace' }}>{errorCode}</span>
          </div>
          <div className={styles.errorRow} style={{ flexDirection: 'column', gap: '0.4rem', borderBottom: 'none' }}>
            <span className={styles.errorLabel}>Diagnostic Message</span>
            <span className={styles.errorValue} style={{ fontWeight: 'normal', color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.4' }}>
              {errorMessage}
            </span>
          </div>
        </div>

        <div className={styles.actionRow}>
          <Link href="/pricing" className={styles.primaryBtn}>
            Try Payment Again
          </Link>
          <Link href="/contact" className={styles.secondaryBtn}>
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutFailurePage() {
  return (
    <Suspense fallback={<div className="container" style={{ color: '#fff', paddingTop: '150px', textAlign: 'center', minHeight: '100vh', fontFamily: 'Outfit' }}>Loading Details...</div>}>
      <FailurePageContent />
    </Suspense>
  );
}
