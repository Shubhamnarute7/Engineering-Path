'use client';

import Link from 'next/link';
import styles from './ai-solutions.module.css';

interface AIService {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  color: string;
  icon: React.ReactNode;
}

export default function AISolutionsPage() {
  const SOLUTIONS: AIService[] = [
    {
      id: 'ai-chatbots',
      title: 'AI Chatbots',
      description: 'Conversational LLM chatbots customized with Retrieval-Augmented Generation (RAG) to reference internal PDF structures and guidelines.',
      benefits: [
        'Instant answers with context-aware semantic search',
        'Multi-document vector storage integrations',
        'Custom tone prompts & temperature guardrails'
      ],
      color: '#7c3aed',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025 4.486 4.486 0 00-.098-.315C3.366 16.93 2.25 14.6 2.25 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      )
    },
    {
      id: 'ai-voice-agents',
      title: 'AI Voice Agents',
      description: 'Ultra-low latency conversational voice systems utilizing real-time TTS/STT pipelines and voice synthesis technology.',
      benefits: [
        'Sub-second latency voice responses',
        'Custom voice cloning & emotional tuning options',
        'Direct phone line SIP & Twilio integrations'
      ],
      color: '#3b82f6',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
        </svg>
      )
    },
    {
      id: 'ai-automation',
      title: 'AI Automation',
      description: 'Replace manual business operations with autonomous LLM tasks. Run data extraction, analysis, and validation pipelines automatically.',
      benefits: [
        'Automated document data structural parsing',
        'Multi-step decision loops using LangChain',
        'Continuous execution and task reports'
      ],
      color: '#10b981',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      )
    },
    {
      id: 'ai-customer-support',
      title: 'AI Customer Support',
      description: 'Support automation routing queries, answering common support tickets, and triggering human handoffs when necessary.',
      benefits: [
        '24/7 ticket resolution without queue wait times',
        'Sleek ticketing CRM and dashboard syncing',
        'Smart handoff hooks to human representatives'
      ],
      color: '#f59e0b',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      )
    },
    {
      id: 'ai-lead-generation',
      title: 'AI Lead Generation',
      description: 'Engage visitors interactively to qualify intent, collect profiles, and direct warm leads straight to sales pipelines.',
      benefits: [
        'Interactive conversations qualifying leads',
        'Automatic profile extraction & tagging',
        'Higher conversion rates than standard forms'
      ],
      color: '#ec4899',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5L12 12.5L5 7.5m14 9L12 21.5L5 16.5m14-9V16.5a2.5 2.5 0 01-2.5 2.5H7.5A2.5 2.5 0 015 16.5V7.5A2.5 2.5 0 017.5 5h9A2.5 2.5 0 0119 7.5z" />
        </svg>
      )
    },
    {
      id: 'whatsapp-automation',
      title: 'WhatsApp Automation',
      description: 'Official WhatsApp Business API setups integrated with conversational agents to resolve queries, send updates, and take orders.',
      benefits: [
        'Direct WhatsApp Meta API setups',
        'Automated broadcast notifications',
        'Interactive quick reply buttons workflows'
      ],
      color: '#14b8a6',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h9m-9 3h9m-9 3h9m-9-12h9a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0118 20.25H6.75A2.25 2.25 0 014.5 18V5.25A2.25 2.25 0 016.75 3h.75z" />
        </svg>
      )
    },
    {
      id: 'ai-workflow-automation',
      title: 'AI Workflow Automation',
      description: 'Coordinate multi-agent crews (e.g., CrewAI) to execute complex, multi-tool tasks such as automated market research or content drafting.',
      benefits: [
        'Collaborative multi-agent decision loops',
        'API tool binding (Google Search, Python Exec)',
        'Dramatic reduction in time-to-delivery workflows'
      ],
      color: '#06b6d4',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21m0-12a3 3 0 11-6 0 3 3 0 016 0zm9 0a3 3 0 11-6 0 3 3 0 016 0zm9 0a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <main className={styles.solutionsPage}>
      {/* Background Liquid Blobs globally imported from layout.tsx */}
      <div className="container">
        
        {/* Header Section */}
        <header className={styles.headerSection}>
          <span className={styles.badge}>AI SOLUTIONS SUITE</span>
          <h1 className={styles.title}>Autonomous AI Capabilities</h1>
          <p className={styles.subtitle}>
            Deploy advanced conversational interfaces, custom LLM RAG pipelines, and automated multi-agent crews co-designed for business growth.
          </p>
        </header>

        {/* Services Grid */}
        <div className={styles.grid}>
          {SOLUTIONS.map((sol) => (
            <div key={sol.id} className={`${styles.card} glass-card`}>
              <div 
                className={styles.cardGlow} 
                style={{ background: `radial-gradient(circle at 50% 50%, ${sol.color}1c 0%, transparent 60%)` }} 
              />
              
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper} style={{ color: sol.color, backgroundColor: `${sol.color}12` }}>
                  {sol.icon}
                </div>
                
                <h3 className={styles.cardTitle}>{sol.title}</h3>
                <p className={styles.description}>{sol.description}</p>
                
                <div className={styles.benefitsTitle}>Key Benefits</div>
                <ul className={styles.benefitsList}>
                  {sol.benefits.map((b, i) => (
                    <li key={i}>
                      <span className={styles.bulletCheck}>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/#contact-section" className={styles.ctaBtn}>
                  Inquire Service
                  <svg className={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <section className={styles.ctaSection}>
          <div className={`${styles.ctaCard} glass-card`}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to Deploy Conversational AI?</h2>
              <p className={styles.ctaDesc}>
                Our engineers and mentors co-design custom LLM setups, Twilio/WhatsApp integrations, and automated pipelines. Let&apos;s build together.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/#contact-section" className={styles.primaryBtn}>
                  Inquire AI Suite
                  <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link href="/services" className={styles.secondaryBtn}>
                  View All Services
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
