'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './pricing.module.css';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  color: string;
  icon: React.ReactNode;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function PricingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleBuyNow = async (planName: string, amountStr: string) => {
    if (!isAuthenticated || !user) {
      alert("Please login to your Client account first to purchase subscription plans.");
      router.push("/login");
      return;
    }
    if (user.role !== 'Client') {
      alert("Only Client accounts can purchase B2B subscription plans.");
      return;
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/payments/invoices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: user.name || "Default Client",
          email: user.email,
          plan: planName,
          amount: amountStr,
          status: 'Paid'
        })
      });
      const data = await res.json();
      if (res.ok && data.invoice) {
        router.push(`/checkout/success?plan=${encodeURIComponent(planName)}&amount=${encodeURIComponent(amountStr)}&provider=Stripe&invoice=${data.invoice.id}`);
      } else {
        throw new Error("Creation failed");
      }
    } catch (e) {
      const mockInvoiceId = `INV-2026-00${Math.floor(Math.random() * 90) + 10}`;
      router.push(`/checkout/success?plan=${encodeURIComponent(planName)}&amount=${encodeURIComponent(amountStr)}&provider=Stripe&invoice=${mockInvoiceId}`);
    }
  };


  const PLANS: PricingPlan[] = [
    {
      id: 'ai-automation',
      name: 'AI Automation',
      price: '₹14,999',
      description: 'Deploy autonomous LLM agents and multi-step validation decision loops.',
      features: [
        'LLM data structural parsing',
        'Custom vector DB configs (Pinecone)',
        'Model training & auto retraining pipelines',
        'Standard Slack support channel access'
      ],
      popular: false,
      color: '#7c3aed',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      )
    },
    {
      id: 'meta-ads',
      name: 'Meta Ads Management',
      price: '₹9,999',
      description: 'Scale lead capture pipelines and maximize conversion ROAS on FB & IG.',
      features: [
        'Up to ₹75,000 monthly ad spend manage',
        '5 active ad campaign setups',
        'Pixel & Custom conversion events setup',
        'Advanced custom & lookalike audiences',
        'Weekly analytics performance reports'
      ],
      popular: true,
      color: '#3b82f6',
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
        </svg>
      )
    },
    {
      id: 'web-dev',
      name: 'Website Development',
      price: '₹24,999',
      description: 'Blazing fast Next.js & React web platforms optimized for conversions.',
      features: [
        'Custom Next.js layouts & design',
        'TypeScript-first robust codebase',
        'SSG & SSR optimization checks',
        'Fluid glassmorphic CSS rules',
        'Standard backend APIs integration'
      ],
      popular: false,
      color: '#10b981',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      )
    },
    {
      id: 'reel-editing',
      name: 'Reel Editing',
      price: '₹8,999',
      description: 'Viral short-form edits designed with engaging kinetic overlays.',
      features: [
        '20 custom reels / shorts edited',
        'Dynamic captions & custom emojis',
        'Advanced motion graphics & SFX',
        'Trend research & viral audio pairing',
        'Priority 48-hour delivery turnarounds'
      ],
      popular: false,
      color: '#ef4444',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l-4.5-3v6l4.5-3z" />
        </svg>
      )
    },
    {
      id: 'social-media',
      name: 'Social Media Management',
      price: '₹7,999',
      description: 'Build active student communities and post resources calendars.',
      features: [
        '20 graphic posts + custom designs',
        '6 co-designed reels / shorts edits',
        '15 interactive story slides',
        'Active community response management',
        'Detailed monthly metrics report'
      ],
      popular: false,
      color: '#ec4899',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025 4.486 4.486 0 00-.098-.315C3.366 16.93 2.25 14.6 2.25 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      )
    },
    {
      id: 'branding',
      name: 'Branding & Identity',
      price: '₹11,999',
      description: 'Coherent visual logo guides co-designed with sleek font keys.',
      features: [
        'Vector corporate logo guidelines book',
        'Color palette systems (HSL values)',
        'Standard typography guidelines',
        'Pitch decks layout presentation slides',
        'Corporate letterhead & files templates'
      ],
      popular: false,
      color: '#14b8a6',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122A3 3 0 00.47 18.878l1.4 1.4a3 3 0 004.25 0l4.89-4.89a3 3 0 000-4.25l-1.4-1.4zM20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75-3.75h7.5M12 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
        </svg>
      )
    }
  ];

  const FAQS: FAQItem[] = [
    {
      question: 'How do onboarding processes work?',
      answer: 'Once we agree on a package, we set up a dedicated Slack/WhatsApp channel with your editors, engineers, or managers. We define timelines and ingest credentials securely in 24-48 hours.'
    },
    {
      question: 'Are monthly ad budgets included in pricing?',
      answer: 'No, ad budgets (e.g. for Meta Ads) are paid directly to Meta via your business manager credit card. Our monthly cost covers campaigns building, pixel tracking, and active ROAS management.'
    },
    {
      question: 'Can I change or cancel packages mid-month?',
      answer: 'Yes, you can upgrade, downgrade, or cancel your subscription packages at any time. Any changes will adjust billing cycles from the next statement date.'
    },
    {
      question: 'What is the typical turnaround for edits and pages?',
      answer: 'Typically, reel editing and standard web adjustments are completed in 24-48 hours. Comprehensive Next.js builds take 2-4 weeks depending on database schemas.'
    },
    {
      question: 'Do you offer custom pricing templates?',
      answer: 'Absolutely. If you have high-volume automation tasks, custom models retraining, or enterprise-scale campaign targets, we design custom scope worksheets.'
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <main className={styles.pricingPage}>
      <div className="container">
        
        {/* Header */}
        <header className={styles.headerSection}>
          <span className={styles.badge}>TRANSPARENT PLANS</span>
          <h1 className={styles.title}>Flexible Monthly Pricing</h1>
          <p className={styles.subtitle}>
            Choose a specialized scope engineered to accelerate your organization. No hidden variables or complex licensing locks.
          </p>
        </header>

        {/* Pricing Cards Grid */}
        <div className={styles.grid}>
          {PLANS.map((plan) => (
            <div key={plan.id} className={`${styles.priceCard} ${plan.popular ? styles.popularCard : ''} glass-card`}>
              {plan.popular && <span className={styles.popularBadge}>Most Popular</span>}
              <div 
                className={styles.cardGlow} 
                style={{ background: `radial-gradient(circle at 50% 50%, ${plan.color}14 0%, transparent 60%)` }} 
              />
              
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper} style={{ color: plan.color, backgroundColor: `${plan.color}12` }}>
                  {plan.icon}
                </div>
                <h3 className={styles.priceName}>{plan.name}</h3>
                <div className={styles.priceRow}>
                  <span className={styles.priceValue}>{plan.price}</span>
                  <span className={styles.pricePeriod}>/month</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: '1.4' }}>
                  {plan.description}
                </p>
              </div>

              <ul className={styles.featuresList}>
                {plan.features.map((f, i) => (
                  <li key={i}>
                    <span className={styles.tick} style={{ color: plan.color }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleBuyNow(plan.name, plan.price)}
                className={`${styles.buyBtn} ${plan.popular ? styles.popularBuyBtn : ''}`}
                style={{ cursor: 'pointer', border: 'none', textAlign: 'center', width: '100%', display: 'block' }}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          
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

        {/* Bottom CTA */}
        <section className={styles.ctaSection}>
          <div className={`${styles.ctaCard} glass-card`}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Need a Customized Scope?</h2>
              <p className={styles.ctaDesc}>
                Whether you need dedicated GPU nodes integrations, multiple Meta Business Managers synced, or a dynamic choice list solver, we co-design customized pricing templates.
              </p>
              <Link href="/#contact-section" className={styles.primaryBtn}>
                Schedule strategy Call
                <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
