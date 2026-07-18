'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './success.module.css';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  
  const [planName, setPlanName] = useState('Growth Plan');
  const [amount, setAmount] = useState('₹9,999');
  const [invoiceId, setInvoiceId] = useState('INV-2026-004');
  const [provider, setProvider] = useState('Stripe');

  useEffect(() => {
    const plan = searchParams.get('plan');
    const amt = searchParams.get('amount');
    const inv = searchParams.get('invoice');
    const prov = searchParams.get('provider');

    if (plan) setPlanName(plan);
    if (amt) setAmount(amt);
    if (inv) setInvoiceId(inv);
    if (prov) setProvider(prov);
  }, [searchParams]);

  return (
    <main className={styles.successPage}>
      <div className={`${styles.successCard} glass-card`}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 65%)' }} />
        
        <div className={styles.iconCircle}>
          <svg style={{ width: 42, height: 42 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className={styles.successTitle}>Payment Successful</h1>
        <p className={styles.successDesc}>
          Thank you for your purchase! Your subscription is now active.
        </p>

        <div className={styles.receiptCard}>
          <div className={styles.receiptRow}>
            <span className={styles.receiptLabel}>Invoice ID</span>
            <span className={styles.receiptValue}>{invoiceId}</span>
          </div>
          <div className={styles.receiptRow}>
            <span className={styles.receiptLabel}>Purchased Service</span>
            <span className={styles.receiptValue}>{planName}</span>
          </div>
          <div className={styles.receiptRow}>
            <span className={styles.receiptLabel}>Payment Gateway</span>
            <span className={styles.receiptValue}>{provider}</span>
          </div>
          <div className={styles.receiptRow}>
            <span className={styles.receiptLabel}>Amount Billed</span>
            <span className={styles.receiptValue} style={{ color: '#34d399' }}>{amount}</span>
          </div>
          <div className={styles.receiptRow}>
            <span className={styles.receiptLabel}>Billing Status</span>
            <span className={styles.receiptValue} style={{ color: '#34d399' }}>Paid ✓</span>
          </div>
        </div>

        <div className={styles.actionRow}>
          <Link href="/client" className={styles.primaryBtn}>
            Go to Client Dashboard
          </Link>
          <button onClick={() => alert('Downloading Receipt PDF...')} className={styles.secondaryBtn}>
            Download Receipt
          </button>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="container" style={{ color: '#fff', paddingTop: '150px', textAlign: 'center', minHeight: '100vh', fontFamily: 'Outfit' }}>Loading Confirmation...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
