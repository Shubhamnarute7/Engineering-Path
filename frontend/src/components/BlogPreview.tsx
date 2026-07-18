'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './BlogPreview.module.css';


interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  views: number;
  featured_image: string;
}

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLatestPosts = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/blogs?status=Published`);
      const data = await res.json();
      if (res.ok && data.blogs) {
        setPosts(data.blogs.slice(0, 3));
      }
    } catch (e) {
      console.warn("FastAPI offline, using static posts");
      setPosts([
        {
          slug: "mht-cet-choice-filling-guide-cap-rounds",
          title: "MHT-CET Choice Filling: The Ultimate Guide to CAP Rounds",
          excerpt: "Learn the exact strategy to sequence your option forms, optimize safe vs dream choices, and avoid common allocation pitfalls.",
          category: "CAP Admissions",
          author: "Shubham Narute",
          date: "July 15, 2026",
          views: 2482,
          featured_image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60"
        },
        {
          slug: "top-5-engineering-branches-maharashtra",
          title: "Top 5 Engineering Branches in Maharashtra: Placement & Stats",
          excerpt: "An objective review comparing Computer Science, AI/ML, E&TC, and core branches across COEP, VJTI, and SPIT.",
          category: "Career Guide",
          author: "Snehal Patil",
          date: "July 12, 2026",
          views: 839,
          featured_image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  const getTagColor = (category: string) => {
    switch (category) {
      case 'CAP Admissions': return '#a78bfa';
      case 'Career Guide': return '#34d399';
      case 'AI Roadmaps': return '#60a5fa';
      default: return '#fbbf24';
    }
  };

  if (loading) {
    return (
      <section className={styles.blogs} id="blog-preview-section">
        <div className="container" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          Loading insights...
        </div>
      </section>
    );
  }

  return (
    <section className={styles.blogs} id="blog-preview-section">
      <div className="container">
        <div className="section-header">
          <h2>Latest Insights & Guides</h2>
          <p>Read expert advice, roadmap blueprints, and admission tutorials curated by top mentors.</p>
        </div>

        <div className={styles.grid}>
          {posts.map((p, i) => {
            const tagColor = getTagColor(p.category);
            return (
              <article key={i} className={`${styles.card} glass-card`}>
                <div className={styles.meta}>
                  <span className={styles.tag} style={{ color: tagColor, backgroundColor: `${tagColor}15` }}>
                    {p.category}
                  </span>
                  <span className={styles.read}>{p.views} views</span>
                </div>
                
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.excerpt}>{p.excerpt}</p>
                
                <div className={styles.footer}>
                  <span className={styles.date}>{p.date}</span>
                  <Link href={`/blog/${p.slug}`} className={styles.link}>
                    Read Article
                    <svg className={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
