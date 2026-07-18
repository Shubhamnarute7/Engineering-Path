'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './blog.module.css';

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

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/blogs?status=Published`);
      const data = await res.json();
      if (res.ok && data.blogs) {
        setBlogs(data.blogs);
      }
    } catch (e) {
      console.warn("FastAPI offline, fallback to mock data");
      setBlogs([
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
    fetchBlogs();
  }, []);

  const CATEGORIES = ['ALL', 'CAP Admissions', 'Career Guide', 'AI Roadmaps', 'General'];

  // Filtering
  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'ALL' || b.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <main className={styles.blogPage}>
      <div className="container">
        
        {/* Header */}
        <header className={styles.headerSection}>
          <span className={styles.badge}>Insights Hub</span>
          <h1 className={styles.title}>Latest Guides & Blueprints</h1>
          <p className={styles.subtitle}>
            Read step-by-step admission advice, coding career roadmaps, and digital marketing tutorials compiled by engineering mentors.
          </p>
        </header>

        {/* Filters & Search Toolbar */}
        <section className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <svg className={styles.searchIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search articles by title or keyword..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.categoriesList}>
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={`${styles.categoryTab} ${activeCategory === cat ? styles.categoryTabActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Blogs Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', fontFamily: 'Outfit' }}>
            Loading Articles...
          </div>
        ) : (
          <section className={styles.grid}>
            {filteredBlogs.map(blog => (
              <article key={blog.slug} className={`${styles.card} glass-card`}>
                <div className={styles.cardImageWrapper}>
                  <img src={blog.featured_image} alt={blog.title} className={styles.cardImage} />
                </div>
                
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardCategory}>{blog.category}</span>
                    <span>👁 {blog.views} views</span>
                  </div>

                  <h3 className={styles.cardTitle}>{blog.title}</h3>
                  <p className={styles.cardExcerpt}>{blog.excerpt}</p>

                  <div className={styles.cardFooter}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                      <span className={styles.cardAuthor}>By {blog.author}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{blog.date}</span>
                    </div>

                    <Link href={`/blog/${blog.slug}`} className={styles.readMoreBtn}>
                      Read Article
                      <svg className={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            {filteredBlogs.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '20px' }}>
                No published articles match your current search and filters.
              </div>
            )}
          </section>
        )}

      </div>
    </main>
  );
}
