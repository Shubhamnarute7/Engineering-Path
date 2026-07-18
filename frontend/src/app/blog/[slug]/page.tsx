'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import styles from '../blog.module.css';

interface Comment {
  author: string;
  content: string;
  date: string;
}

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  excerpt: string;
  author: string;
  status?: string;
  views: number;
  featured_image: string;
  seo_title: string;
  seo_description: string;
  date: string;
  comments: Comment[];
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Comment Form States
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentStatus, setCommentStatus] = useState('');

  const fetchBlogData = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      
      // 1. Fetch current post
      const res = await fetch(`${API_URL}/api/blogs/${slug}`);
      const data = await res.json();
      if (res.ok && data.blog) {
        setBlog(data.blog);
        
        // 2. Fetch all posts to filter for related articles
        const relRes = await fetch(`${API_URL}/api/blogs`);
        const relData = await relRes.json();
        if (relRes.ok && relData.blogs) {
          const filtered = relData.blogs.filter(
            (b: BlogPost) => b.slug !== slug && b.category === data.blog.category && b.status === 'Published'
          ).slice(0, 2);
          setRelated(filtered);
        }
      }
    } catch (e) {
      console.warn("FastAPI offline, fallback to mock data");
      
      // Fallback mock data
      const mockBlogs = [
        {
          slug: "mht-cet-choice-filling-guide-cap-rounds",
          title: "MHT-CET Choice Filling: The Ultimate Guide to CAP Rounds",
          content: "# MHT-CET Choice Filling: The Ultimate Guide to CAP Rounds\n\nLearn the exact strategy to sequence your option forms, optimize safe vs dream choices, and avoid common allocation pitfalls.\n\n## 1. Understand CAP Round Mechanics\nAdmission rounds in Maharashtra are highly structured. Sequencing your options properly is the difference between securing COEP or getting stuck in a lower-tier college.\n\n## 2. Sequence Strategy\n- **Safe Options**: Colleges where your percentile exceeds the past 3-year cutoff by 2.5% or more.\n- **Moderate Options**: Within a range of -1.5% to +2.5% of past cutoffs.\n- **Dream Options**: Up to +6.0% above your percentile.",
          category: "CAP Admissions",
          tags: ["MHT-CET", "CAP Rounds", "Admissions"],
          excerpt: "Learn the exact strategy to sequence your option forms, optimize safe vs dream choices, and avoid common allocation pitfalls.",
          author: "Shubham Narute",
          date: "July 15, 2026",
          views: 2483,
          featured_image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60",
          seo_title: "MHT-CET Choice Filling Guide 2026 | CAP Rounds Strategy",
          seo_description: "Master the option form sequencing for MHT-CET 2026. Step-by-step strategies for VJTI, COEP, and SPIT admission allocation.",
          comments: [
            { author: "Nitin Sawant", content: "This sequencing strategy really helped me understand how to place SPIT in my option list. Thanks!", date: "July 16, 2026" }
          ]
        },
        {
          slug: "top-5-engineering-branches-maharashtra",
          title: "Top 5 Engineering Branches in Maharashtra: Placement & Stats",
          content: "# Top 5 Engineering Branches in Maharashtra: Placement & Stats\n\nAn objective review comparing Computer Science, AI/ML, E&TC, and core branches across COEP, VJTI, and SPIT.\n\n## Comparison Overview\n1. **Computer Science & Engineering**: Average package around 15 LPA. Peak cutoffs.\n2. **AI & Data Science**: Rising demands, average 14 LPA.\n3. **Electronics & Telecommunication**: Good core and tech prospects, average 10 LPA.",
          category: "Career Guide",
          tags: ["Engineering", "Placements", "COEP"],
          excerpt: "An objective review comparing Computer Science, AI/ML, E&TC, and core branches across COEP, VJTI, and SPIT.",
          author: "Snehal Patil",
          date: "July 12, 2026",
          views: 840,
          featured_image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60",
          seo_title: "Top Maharashtra Engineering Branches: Fees & Placements",
          seo_description: "Discover the best engineering fields in Maharashtra. Placement comparisons, salary trends, and top college insights.",
          comments: []
        }
      ];

      const found = mockBlogs.find(b => b.slug === slug);
      if (found) {
        setBlog(found);
        setRelated(mockBlogs.filter(b => b.slug !== slug && b.category === found.category));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [slug]);

  const handleShareCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) {
      alert('Both Name and Comment text are required.');
      return;
    }

    const payload = {
      author: commentName,
      content: commentText
    };

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/blogs/${slug}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error('Comment post failed');

      setCommentStatus('Comment posted successfully!');
      setCommentName('');
      setCommentText('');
      
      // Update state comments list
      if (blog) {
        setBlog({
          ...blog,
          comments: [...blog.comments, data.comment]
        });
      }
    } catch (err) {
      // Local fallback comment insertion
      const mockComment: Comment = {
        author: commentName,
        content: commentText,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
      };
      
      if (blog) {
        setBlog({
          ...blog,
          comments: [...blog.comments, mockComment]
        });
      }
      setCommentName('');
      setCommentText('');
      setCommentStatus('Local fallback: Comment added.');
    }
  };

  const renderMarkdown = (md: string) => {
    if (!md) return '';
    let html = md
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>[\s\S]*<\/li>)/gm, '<ul>$1</ul>');
    html = html.replace(/\n$/gim, '<br />');
    html = html.replace(/\n/g, '<br />');
    return html;
  };

  if (loading) {
    return (
      <main className={styles.blogPage}>
        <div className="container" style={{ textAlign: 'center', padding: '100px 0', fontFamily: 'Outfit' }}>
          Loading Article details...
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className={styles.blogPage}>
        <div className="container" style={{ textAlign: 'center', padding: '100px 0', fontFamily: 'Outfit' }}>
          <h2>Article Not Found</h2>
          <p style={{ color: 'var(--text-muted)', margin: '1rem 0' }}>The article you are looking for does not exist or has been removed.</p>
          <Link href="/blog" className={styles.backLink}>✕ Back to Blogs</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.blogPage}>
      {/* Dynamic SEO Meta Title tag check */}
      <title>{blog.seo_title || blog.title}</title>
      <meta name="description" content={blog.seo_description || blog.excerpt} />

      <div className="container">
        <article className={styles.articleContainer}>
          
          {/* Back button */}
          <Link href="/blog" className={styles.backLink}>
            <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Articles
          </Link>

          {/* Article Header */}
          <header className={styles.articleHeader}>
            <div className={styles.articleMetaRow}>
              <span className={styles.badge} style={{ margin: 0 }}>{blog.category}</span>
              <span>•</span>
              <span>👁 {blog.views} views</span>
              <span>•</span>
              <span>{blog.date}</span>
            </div>
            
            <h1 className={styles.articleTitle}>{blog.title}</h1>
            
            <div className={styles.authorRow}>
              <div className={styles.authorAvatar}>
                {blog.author.charAt(0).toUpperCase()}
              </div>
              <div className={styles.authorName}>By {blog.author}</div>
            </div>
          </header>

          {/* Featured Image */}
          <img src={blog.featured_image} alt={blog.title} className={styles.featuredImage} />

          {/* Content rendered safely */}
          <div 
            className={styles.articleContent} 
            dangerouslySetInnerHTML={{ __html: renderMarkdown(blog.content) }} 
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className={styles.tagsRow}>
              {blog.tags.map(t => (
                <span key={t} className={styles.tagPill}>#{t}</span>
              ))}
            </div>
          )}

          {/* Share Section */}
          <div className={styles.shareRow}>
            <span className={styles.shareLabel}>Share this article:</span>
            <button onClick={handleShareCopy} className={styles.shareBtn}>
              🔗 Copy URL
            </button>
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`} 
              target="_blank" 
              rel="noreferrer" 
              className={styles.shareBtn}
            >
              🐦 Share on X (Twitter)
            </a>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <section className={styles.relatedSection}>
              <h3 className={styles.sectionTitle}>Related Articles</h3>
              <div className={styles.grid}>
                {related.map(r => (
                  <article key={r.slug} className={`${styles.card} glass-card`} style={{ height: 'auto' }}>
                    <div className={styles.cardImageWrapper} style={{ height: '140px' }}>
                      <img src={r.featured_image} alt={r.title} className={styles.cardImage} />
                    </div>
                    <div className={styles.cardContent} style={{ padding: '1.25rem' }}>
                      <h4 className={styles.cardTitle} style={{ fontSize: '1.05rem', margin: '0.2rem 0 0.5rem 0' }}>{r.title}</h4>
                      <Link href={`/blog/${r.slug}`} className={styles.readMoreBtn} style={{ fontSize: '0.8rem' }}>
                        Read Guide
                        <svg className={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Comments Section */}
          <section className={styles.commentsSection}>
            <h3 className={styles.sectionTitle}>Reader Comments ({blog.comments ? blog.comments.length : 0})</h3>
            
            <div className={styles.commentsList}>
              {blog.comments && blog.comments.length > 0 ? (
                blog.comments.map((c, idx) => (
                  <div key={idx} className={styles.commentCard}>
                    <div className={styles.commentHeader}>
                      <span className={styles.commentAuthor}>{c.author}</span>
                      <span className={styles.commentDate}>{c.date}</span>
                    </div>
                    <p className={styles.commentText}>{c.content}</p>
                  </div>
                ))
              ) : (
                <div className={styles.noComments}>
                  No comments posted yet. Be the first to share your thoughts!
                </div>
              )}
            </div>

            {/* Leave a Comment Form */}
            <h3 className={styles.sectionTitle} style={{ marginTop: '3rem' }}>Leave a Comment</h3>
            <form onSubmit={handlePostComment} className={styles.commentForm}>
              <div className={styles.commentInputGroup}>
                <label>Your Name *</label>
                <input 
                  type="text" 
                  required 
                  value={commentName} 
                  onChange={e => setCommentName(e.target.value)} 
                  placeholder="Enter your name..."
                  className={styles.commentInput}
                />
              </div>
              <div className={styles.commentInputGroup}>
                <label>Your Comment *</label>
                <textarea 
                  required 
                  value={commentText} 
                  onChange={e => setCommentText(e.target.value)} 
                  placeholder="Share your thoughts or questions..."
                  className={styles.commentInput}
                  style={{ height: '110px' }}
                />
              </div>

              {commentStatus && (
                <div style={{ color: '#34d399', fontSize: '0.88rem', fontWeight: 600 }}>{commentStatus}</div>
              )}

              <button type="submit" className={styles.submitCommentBtn}>
                Submit Comment
              </button>
            </form>
          </section>

        </article>
      </div>
    </main>
  );
}
