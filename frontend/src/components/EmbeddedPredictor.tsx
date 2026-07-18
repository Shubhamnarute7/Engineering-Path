'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './EmbeddedPredictor.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface PredictResult {
  estimated_merit_rank: number;
  safe_range: { min_percentile: number; max_percentile: number; min_rank: number; max_rank: number };
  moderate_range: { min_percentile: number; max_percentile: number; min_rank: number; max_rank: number };
  dream_range: { min_percentile: number; max_percentile: number; min_rank: number; max_rank: number };
  similar_students: Array<{
    merit_no: number; candidate_name: string; merit_percentile: number;
    category: string; gender: string; hsc_total_percent: number;
    is_ews: string; is_tfws: string; is_pwd_def: string;
  }>;
  recommendations: Array<{
    college_name: string; location: string; college_type: string;
    cutoff_percentile: number; estimated_cutoff_rank: number; branch: string;
    recommendation_type: string; admission_chance: string; color_theme: string;
  }>;
  input_parameters: Record<string, unknown>;
}

export default function EmbeddedPredictor() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [percentile, setPercentile] = useState(85.0);
  const [hscMarks, setHscMarks] = useState(70.0);
  const [category, setCategory] = useState('Open');
  const [gender, setGender] = useState('Male');
  const [branch, setBranch] = useState('Computer Engineering');
  const [minorityType, setMinorityType] = useState('-/-');
  const [ews, setEws] = useState(false);
  const [tfws, setTfws] = useState(false);
  const [pwd, setPwd] = useState(false);

  const [results, setResults] = useState<PredictResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Results entrance animations
  useEffect(() => {
    if (results && containerRef.current) {
      const el = containerRef.current;
      const targets = el.querySelectorAll(
        `.${styles.rankBanner}, .${styles.rangeCard}, .glass-card`
      );

      gsap.set(targets, { opacity: 0, y: 15 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }
  }, [results]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          percentile,
          hsc_marks: hscMarks,
          category,
          gender,
          branch_preference: branch,
          minority_type: minorityType,
          ews: ews ? 'Yes' : 'No',
          tfws: tfws ? 'Yes' : 'No',
          pwd: pwd ? 'Yes' : 'No',
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || `Server error ${res.status}`);
      }

      const data = await res.json();
      setResults(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prediction');
    } finally {
      setLoading(false);
    }
  };

  const getBadgeClass = (type: string) => {
    switch (type.toLowerCase()) {
      case 'safe': return styles.badgeSafe;
      case 'moderate': return styles.badgeModerate;
      case 'dream': return styles.badgeDream;
      default: return '';
    }
  };

  return (
    <section id="predictor-lead" className={styles.section} ref={containerRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>MHT-CET Rank & Recommender</h2>
          <p className={styles.sectionDesc}>
            Test our AI Admissions engine. Input your percentile to predict your Maharashtra merit rank and view matching engineering colleges.
          </p>
        </div>

        <div className={styles.dashboardGrid}>
          {/* Form Side */}
          <form onSubmit={handleSubmit} className={styles.formCard}>
            <h3 className={styles.cardTitle}>
              <svg style={{ width: 22, height: 22 }} viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
              Student Profile
            </h3>

            {/* Percentile */}
            <div className={styles.formGroup}>
              <label>MHT-CET Percentile</label>
              <div className={styles.sliderGroup}>
                <input 
                  type="range" 
                  min="0.01" 
                  max="100" 
                  step="0.01" 
                  value={percentile} 
                  onChange={e => setPercentile(parseFloat(e.target.value))} 
                />
                <input 
                  type="number" 
                  min={0.01} 
                  max={100} 
                  step={0.01} 
                  value={percentile} 
                  onChange={e => setPercentile(parseFloat(e.target.value) || 0)} 
                  className={styles.numInput} 
                />
              </div>
            </div>

            {/* HSC Percentage */}
            <div className={styles.formGroup}>
              <label>HSC Percentage</label>
              <div className={styles.sliderGroup}>
                <input 
                  type="range" 
                  min="30" 
                  max="100" 
                  step="0.5" 
                  value={hscMarks} 
                  onChange={e => setHscMarks(parseFloat(e.target.value))} 
                />
                <input 
                  type="number" 
                  min={30} 
                  max={100} 
                  step={0.5} 
                  value={hscMarks} 
                  onChange={e => setHscMarks(parseFloat(e.target.value) || 30)} 
                  className={styles.numInput} 
                />
              </div>
            </div>

            {/* Category */}
            <div className={styles.formGroup}>
              <label>Reservation Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="Open">Open</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="SEBC">SEBC</option>
                <option value="NT 2 (NT-C)">NT 2 (NT-C)</option>
                <option value="NT 3 (NT-D)">NT 3 (NT-D)</option>
                <option value="NT 1 (NT-B)">NT 1 (NT-B)</option>
                <option value="DT/VJ">DT/VJ</option>
                <option value="SBC">SBC</option>
              </select>
            </div>

            {/* Gender & Branch */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label>Gender</label>
                <select value={gender} onChange={e => setGender(e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Minority Type</label>
                <select value={minorityType} onChange={e => setMinorityType(e.target.value)}>
                  <option value="-/-">None</option>
                  <option value="-/RM">Religious (-/RM)</option>
                  <option value="LM/-">Linguistic (LM/-)</option>
                  <option value="LM/RM">Both (LM/RM)</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Preferred Branch</label>
              <select value={branch} onChange={e => setBranch(e.target.value)}>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="AI & Data Science">AI & Data Science</option>
                <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Chemical Engineering">Chemical Engineering</option>
                <option value="B. Pharmacy">B. Pharmacy</option>
              </select>
            </div>

            {/* Quotas */}
            <div className={styles.formGroup}>
              <label>Additional Quotas</label>
              <div className={styles.checkboxGrid}>
                <label className={styles.checkboxItem}>
                  <input type="checkbox" checked={ews} onChange={e => setEws(e.target.checked)} />
                  <span>EWS</span>
                </label>
                <label className={styles.checkboxItem}>
                  <input type="checkbox" checked={tfws} onChange={e => setTfws(e.target.checked)} />
                  <span>TFWS</span>
                </label>
                <label className={styles.checkboxItem}>
                  <input type="checkbox" checked={pwd} onChange={e => setPwd(e.target.checked)} />
                  <span>PWD</span>
                </label>
              </div>
            </div>

            <button type="submit" className={styles.predictBtn} disabled={loading}>
              {loading ? 'Predicting...' : 'Predict My Rank & Colleges'}
            </button>

            {error && <p className={styles.errorMsg}>{error}</p>}
          </form>

          {/* Results Side */}
          <div className={styles.resultsContainer}>
            {!results ? (
              <div className={styles.placeholder}>
                <svg style={{ width: 64, height: 64, color: 'rgba(255,255,255,0.1)' }} viewBox="0 0 24 24"><path fill="currentColor" d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z" /></svg>
                <h3>Your Results Will Appear Here</h3>
                <p>Provide your CET details and click &quot;Predict My Rank & Colleges&quot; to estimate your Maharashtra merit status.</p>
              </div>
            ) : (
              <div className={styles.resultsContent}>
                
                {/* Merit Rank Circle */}
                <div className={`${styles.rankBanner} glass-card`}>
                  <div className={styles.rankCircleContainer}>
                    <div className={styles.rankCircle}>
                      <span className={styles.rankLabel}>Merit Rank</span>
                      <span className={styles.rankValue}>#{results.estimated_merit_rank.toLocaleString()}</span>
                      <span className={styles.rankSuffix}>Estimated</span>
                    </div>
                  </div>
                  <div className={styles.rankInfo}>
                    <h3>Predicted Merit Rank: <span style={{ color: '#c084fc' }}>#{results.estimated_merit_rank.toLocaleString()}</span></h3>
                    <p>Based on your {percentile}% score, our models estimated your positioning in the Maharashtra State Merit List.</p>
                  </div>
                </div>

                {/* Range Zone Cards */}
                <div className={styles.rangesGrid}>
                  <div className={`${styles.rangeCard} ${styles.safe}`}>
                    <div className={styles.rangeTitle}>Safe Zone</div>
                    <div className={styles.rangePct}>{results.safe_range.min_percentile}% — {results.safe_range.max_percentile}%</div>
                  </div>
                  <div className={`${styles.rangeCard} ${styles.moderate}`}>
                    <div className={styles.rangeTitle}>Moderate Zone</div>
                    <div className={styles.rangePct}>{results.moderate_range.min_percentile}% — {results.moderate_range.max_percentile}%</div>
                  </div>
                  <div className={`${styles.rangeCard} ${styles.dream}`}>
                    <div className={styles.rangeTitle}>Dream Zone</div>
                    <div className={styles.rangePct}>{results.dream_range.min_percentile}% — {results.dream_range.max_percentile}%</div>
                  </div>
                </div>

                {/* College recommendations summary list */}
                <div className="glass-card" style={{ padding: '1.75rem !important' }}>
                  <h3 className={styles.cardTitle} style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>🎓 College Matches</h3>
                  
                  {results.recommendations.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>No direct matching cutoffs found. Try widening your criteria.</p>
                  ) : (
                    <div className={styles.recsList}>
                      {results.recommendations.slice(0, 4).map((rec, i) => (
                        <div className={styles.recsCard} key={i}>
                          <div className={styles.recsHeader}>
                            <span className={styles.collegeName}>{rec.college_name}</span>
                            <span className={`${styles.recsBadge} ${getBadgeClass(rec.recommendation_type)}`}>
                              {rec.recommendation_type}
                            </span>
                          </div>
                          
                          <div className={styles.recsFooter}>
                            <div className={styles.recsStat}>
                              <span className={styles.statLabel}>Cutoff Score</span>
                              <span className={styles.statValue}>{rec.cutoff_percentile}%</span>
                            </div>
                            <div className={styles.recsStat} style={{ textAlign: 'right' }}>
                              <span className={styles.statLabel}>Admission Chance</span>
                              <span className={styles.statValue} style={{ color: 'var(--primary)' }}>{rec.admission_chance}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Marketing Call To Action */}
                <div className={styles.cTAInquiryCard}>
                  <p className={styles.cTAInquiryText}>
                    Want to lock in your seat? Our specialized counselors help you design optimal CAP round option lists with our mentorship courses.
                  </p>
                  <Link href="/#courses-section" className={styles.cTAInquiryBtn}>
                    Explore Mentorship & Courses
                  </Link>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
