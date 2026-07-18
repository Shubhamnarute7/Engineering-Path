'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './services.module.css';

interface Service {
  id: string;
  title: string;
  category: 'AI' | 'Tech' | 'Design' | 'Marketing';
  shortDesc: string;
  longDesc: string;
  highlights: string[];
  color: string;
  icon: React.ReactNode;
}

export default function ServicesPage() {
  const [filter, setFilter] = useState<'All' | 'AI' | 'Tech' | 'Design' | 'Marketing'>('All');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const SERVICES: Service[] = [
    {
      id: 'ai-solutions',
      title: 'AI Solutions',
      category: 'AI',
      shortDesc: 'Automate business logic, predict cutoffs, and clean workflows using custom machine learning pipelines.',
      longDesc: 'Our AI Solutions deliver production-ready predictive architectures. We custom-train models (like Decision Trees, Random Forests, and XGBoost) tailored for specific business needs, ensuring high precision and low error variance.',
      highlights: [
        'Custom Scikit-Learn and PyTorch pipelines',
        'High-accuracy classification & regression models',
        'Model deployment on serverless GPU endpoints',
        'Continuous accuracy monitoring & retraining setups'
      ],
      color: '#7c3aed',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 'web-dev',
      title: 'Website Development',
      category: 'Tech',
      shortDesc: 'Build blazing fast, responsive Next.js & React websites optimized for conversion and rich typography.',
      longDesc: 'We construct state-of-the-art web architectures utilizing Next.js, React, and Turbopack. Every site features full responsive fluid grids, accessible DOM structures, and smooth animations using GSAP and CSS variables.',
      highlights: [
        'Static Site Generation (SSG) & SSR optimization',
        'TypeScript-first robust codebase architectures',
        'Glassmorphic CSS structures and layouts',
        'Full compatibility with core backend APIs'
      ],
      color: '#3b82f6',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      )
    },
    {
      id: 'mobile-app',
      title: 'Mobile App Development',
      category: 'Tech',
      shortDesc: 'Cross-platform iOS and Android mobile systems delivering native performance and fluid animations.',
      longDesc: 'Create premium, responsive mobile app platforms with native integrations. We specialize in cross-platform setups (React Native & Flutter) optimized for minimal bundle sizes and reliable device hardware connectivity.',
      highlights: [
        'Shared native-performance codebase setups',
        'Biometric authentication & secure credentials storage',
        'Background sync routines and offline databases',
        'Apple App Store & Google Play publishing pipeline'
      ],
      color: '#10b981',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 15h12M9 18h6" />
        </svg>
      )
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      category: 'Marketing',
      shortDesc: 'Scale lead capture pipelines and conversion rates using structured growth hacking architectures.',
      longDesc: 'Accelerate user acquisition via modern conversion optimization and quantitative target lists. We analyze customer funnels and engineer optimized campaigns to reduce Customer Acquisition Cost (CAC).',
      highlights: [
        'Landing page A/B testing and conversions setup',
        'Retargeting pixels & analytical funnel building',
        'Attribution modeling and ROI dashboards',
        'Lead qualification and CRM automations'
      ],
      color: '#f59e0b',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.357.205a.75.75 0 01-1.006-.203l-1.86-2.584a2.93 2.93 0 01-.482-1.712V15.84m3.81 1.09a29.818 29.818 0 013.349-.164h1.5a3 3 0 003-3v-.75a3 3 0 00-3-3h-1.5c-1.123 0-2.25-.055-3.35-.164m-.12 6.18A31.85 31.85 0 0012 12c0-1.815-.152-3.6-.447-5.336" />
        </svg>
      )
    },
    {
      id: 'seo',
      title: 'SEO Optimization',
      category: 'Marketing',
      shortDesc: 'Rank page URLs at the top of Google indices. Boost organic search footprints and load velocities.',
      longDesc: 'Optimize site headings, page load speeds, and semantic layouts to maximize search rankings. We index candidate terms and keyword footprints to design clean sitemaps and earn high authority scores.',
      highlights: [
        'Semantic HTML5 outline verification & audits',
        'Core Web Vitals acceleration & speed tuning',
        'Structured schema JSON-LD integrations',
        'Long-tail content strategies & link indexing'
      ],
      color: '#ec4899',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
        </svg>
      )
    },
    {
      id: 'branding',
      title: 'Branding & Identity',
      category: 'Design',
      shortDesc: 'Coherent visual identities co-designed with sleek typography systems and vector logo assets.',
      longDesc: 'Establish a memorable corporate brand strategy. We define responsive visual assets, unified font families (like Inter and Outfit), color tokens, and complete design guidelines to maintain visual excellence.',
      highlights: [
        'Custom vector logos & brand guidelines books',
        'Color palette systems (HSL values & contrast keys)',
        'Typography guidelines and styling rules',
        'Corporate layout systems & templates'
      ],
      color: '#14b8a6',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122A3 3 0 00.47 18.878l1.4 1.4a3 3 0 004.25 0l4.89-4.89a3 3 0 000-4.25l-1.4-1.4zM20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75-3.75h7.5M12 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
        </svg>
      )
    },
    {
      id: 'graphic-design',
      title: 'Graphic Design',
      category: 'Design',
      shortDesc: 'SaaS interfaces, custom graphics, marketing templates, and high-fidelity slide assets.',
      longDesc: 'High-fidelity visual design tailored for websites, campaigns, and slide presentations. We create sleek layouts that utilize modern visual design trends like glassmorphism and smooth, glowing neon backdrops.',
      highlights: [
        'Figma high-fidelity prototypes and source files',
        'Responsive social media graphic templates',
        'Marketing assets & custom icon sets',
        'Modern, scalable vector layout diagrams'
      ],
      color: '#8b5cf6',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.9 2.9m-18 8.75h18a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0022 4.5H2a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 002 21.75zM12 12.75a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
        </svg>
      )
    },
    {
      id: 'video-editing',
      title: 'Video Editing',
      category: 'Design',
      shortDesc: 'Stunning marketing videos co-designed with rich transitions, sound design, and color grading.',
      longDesc: 'Create high-impact video assets for campaigns, websites, and tutorials. We focus on fast-paced, high-converting edits with smooth animations, clear lower-thirds, and optimized export compression profiles.',
      highlights: [
        'Full 4K color-grading & audio balancing',
        'Lottie & vector motion graphics integrations',
        'Optimized compression codecs for web rendering',
        'Short-form and horizontal marketing cut options'
      ],
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
      title: 'Social Media Management',
      category: 'Marketing',
      shortDesc: 'Automate post distribution, optimize engagement trends, and build student community networks.',
      longDesc: 'Build and coordinate a vibrant social presence. We track and schedule updates, design campaign scripts, and direct student campus ambassadors to generate community-driven growth.',
      highlights: [
        'Engagement analysis & hashtag mapping tools',
        'Content calendar pipeline automations',
        'Ambassador content distribution templates',
        'Direct community management & analytics'
      ],
      color: '#f43f5e',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025 4.486 4.486 0 00-.098-.315C3.366 16.93 2.25 14.6 2.25 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      )
    },
    {
      id: 'ai-consulting',
      title: 'AI Consulting',
      category: 'AI',
      shortDesc: 'Align your business processes with Large Language Models, agent roadmaps, and data pipelines.',
      longDesc: 'Navigate the complex landscape of AI integration. We co-design technical roadmaps, audit existing software for LLM agent integration, configure ChromaDB/Pinecone vector systems, and optimize API rate costing limits.',
      highlights: [
        'LLM audit & vector database evaluations',
        'Multi-agent systems architecture mapping (CrewAI, LangChain)',
        'Prompt engineering guardrails & temperature setups',
        'Token usage costs optimization plans'
      ],
      color: '#06b6d4',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    }
  ];

  const filteredServices = filter === 'All' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === filter);

  return (
    <main className={styles.servicesPage}>
      {/* Background Liquid Blobs are globally rendered via layout.tsx */}
      <div className="container">
        
        {/* Header Section */}
        <header className={styles.headerSection}>
          <h1 className={styles.title}>Our Specialized Services</h1>
          <p className={styles.subtitle}>
            Explore our state-of-the-art tech, design, marketing, and predictive AI solutions engineered to accelerate your organization.
          </p>
        </header>

        {/* Filter Row */}
        <div className={styles.filterRow}>
          {(['All', 'AI', 'Tech', 'Design', 'Marketing'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`${styles.filterBtn} ${filter === cat ? styles.activeFilter : ''}`}
            >
              {cat === 'All' ? 'All Services' : cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className={styles.grid}>
          {filteredServices.map((service) => (
            <div key={service.id} className={`${styles.card} glass-card`}>
              <div 
                className={styles.cardGlow} 
                style={{ background: `radial-gradient(circle at 50% 50%, ${service.color}1c 0%, transparent 60%)` }} 
              />
              
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper} style={{ color: service.color, backgroundColor: `${service.color}15` }}>
                  {service.icon}
                </div>
                
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.description}>{service.shortDesc}</p>
                
                <button 
                  onClick={() => setSelectedService(service)}
                  className={styles.learnMoreBtn}
                >
                  Learn More
                  <svg className={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <section className={styles.ctaSection}>
          <div className={`${styles.ctaCard} glass-card`}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Accelerate Your Journey Today</h2>
              <p className={styles.ctaDesc}>
                Looking for customized models, specialized next-gen websites, or direct admissions predictor capabilities? Connect with our mentors and software engineers.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/#contact-section" className={styles.primaryBtn}>
                  Inquire Now
                  <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link href="/predictor" className={styles.secondaryBtn}>
                  Predict College Cutoffs
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Service Detail Drawer Modal */}
      {selectedService && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedService(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedService(null)}>×</button>
            
            <div className={styles.modalHeader}>
              <div className={styles.iconWrapper} style={{ color: selectedService.color, backgroundColor: `${selectedService.color}15`, marginBottom: 0 }}>
                {selectedService.icon}
              </div>
              <h3 className={styles.modalTitle}>{selectedService.title}</h3>
            </div>
            
            <p className={styles.modalDesc}>{selectedService.longDesc}</p>
            
            <h4 style={{ color: '#fff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', fontFamily: 'Outfit' }}>
              Key Capabilities
            </h4>
            <ul className={styles.detailPoints}>
              {selectedService.highlights.map((pt, i) => (
                <li key={i}>
                  <span className={styles.pointCheck}>✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            
            {selectedService.id === 'ai-solutions' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Link 
                  href="/ai-solutions" 
                  onClick={() => setSelectedService(null)} 
                  className={styles.modalActionBtn}
                >
                  Explore AI Solutions Suite
                </Link>
                <Link 
                  href="/#contact-section" 
                  onClick={() => setSelectedService(null)} 
                  className={styles.secondaryBtn}
                  style={{ textAlign: 'center', display: 'block' }}
                >
                  Inquire Directly
                </Link>
              </div>
            ) : selectedService.id === 'digital-marketing' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Link 
                  href="/meta-ads" 
                  onClick={() => setSelectedService(null)} 
                  className={styles.modalActionBtn}
                >
                  Explore Meta Ads Management
                </Link>
                <Link 
                  href="/#contact-section" 
                  onClick={() => setSelectedService(null)} 
                  className={styles.secondaryBtn}
                  style={{ textAlign: 'center', display: 'block' }}
                >
                  Inquire Directly
                </Link>
              </div>
            ) : selectedService.id === 'social-media' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Link 
                  href="/social-media" 
                  onClick={() => setSelectedService(null)} 
                  className={styles.modalActionBtn}
                >
                  Explore Social Media Management
                </Link>
                <Link 
                  href="/#contact-section" 
                  onClick={() => setSelectedService(null)} 
                  className={styles.secondaryBtn}
                  style={{ textAlign: 'center', display: 'block' }}
                >
                  Inquire Directly
                </Link>
              </div>
            ) : selectedService.id === 'video-editing' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Link 
                  href="/reel-editing" 
                  onClick={() => setSelectedService(null)} 
                  className={styles.modalActionBtn}
                >
                  Explore Reel Editing Services
                </Link>
                <Link 
                  href="/#contact-section" 
                  onClick={() => setSelectedService(null)} 
                  className={styles.secondaryBtn}
                  style={{ textAlign: 'center', display: 'block' }}
                >
                  Inquire Directly
                </Link>
              </div>
            ) : (
              <Link 
                href="/#contact-section" 
                onClick={() => setSelectedService(null)} 
                className={styles.modalActionBtn}
              >
                Inquire About This Service
              </Link>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
