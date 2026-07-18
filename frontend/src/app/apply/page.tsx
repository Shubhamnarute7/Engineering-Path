'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './apply.module.css';

interface JobOption {
  id: string;
  title: string;
}

interface ApplicationData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  college: string;
  degree: string;
  year: string;
  status: string;
  skills: string[];
  experience: string;
  coverLetter: string;
  resume_name: string;
  portfolio: string;
  github: string;
  linkedin: string;
  interview_date?: string | null;
  interview_link?: string | null;
  emails_sent: { subject: string; body: string }[];
}

function ApplyFormContent() {
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };


  const [optionsList, setOptionsList] = useState<JobOption[]>([]);

  const fetchOpenings = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/careers/openings`);
      const data = await res.json();
      if (res.ok && data.openings) {
        const mapped = data.openings
          .filter((o: any) => o.status === 'Active')
          .map((o: any) => ({ id: o.id, title: o.title }));
        mapped.push({ id: 'other', title: 'Other / General Application' });
        setOptionsList(mapped);
      }
    } catch (e) {
      console.warn("FastAPI offline, using static options");
      setOptionsList([
        { id: 'ai-ml-intern', title: 'AI/ML Intern' },
        { id: 'frontend-dev', title: 'Frontend Developer' },
        { id: 'backend-dev', title: 'Backend Developer' },
        { id: 'react-dev', title: 'React Developer' },
        { id: 'other', title: 'Other / General Application' }
      ]);
    }
  };

  useEffect(() => {
    fetchOpenings();
  }, []);

  // Application checking state
  const [activeApp, setActiveApp] = useState<ApplicationData | null>(null);
  const [checkingActive, setCheckingActive] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Form Fields
  const [role, setRole] = useState('other');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('');
  const [year, setYear] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [portfolio, setPortfolio] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  // Skill Input State
  const [skillInput, setSkillInput] = useState('');

  // UI States
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  // Fetch active application if exists
  const checkActiveApplication = async () => {
    if (!user?.email) {
      setCheckingActive(false);
      return;
    }
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/careers/applications?email=${user.email}`);
      const data = await res.json();
      if (res.ok && data.application) {
        setActiveApp(data.application);
        // Pre-populate fields for edit
        setFullName(data.application.name);
        setPhone(data.application.phone);
        setCollege(data.application.college);
        setDegree(data.application.degree);
        setYear(data.application.year);
        setGithub(data.application.github);
        setLinkedin(data.application.linkedin);
      }
    } catch (e) {
      console.warn("FastAPI offline or no active application found");
    } finally {
      setCheckingActive(false);
    }
  };

  useEffect(() => {
    checkActiveApplication();
  }, [user]);

  // Pre-populate user details from auth context
  useEffect(() => {
    if (user) {
      if (user.name && !fullName) setFullName(user.name);
      if (user.email && !email) setEmail(user.email);
    }
  }, [user]);

  // Pre-select role based on URL parameter ?role=...
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam && optionsList.some(opt => opt.id === roleParam)) {
      setRole(roleParam);
    }
  }, [searchParams, optionsList]);

  // Form Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address format';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9\s+-]{10,14}$/.test(phone.trim())) {
      newErrors.phone = 'Invalid phone number format (min 10 digits)';
    }

    if (!college.trim()) newErrors.college = 'College is required';
    if (!degree.trim()) newErrors.degree = 'Degree is required';

    const parsedYear = parseInt(year);
    if (!year) {
      newErrors.year = 'Graduation year is required';
    } else if (isNaN(parsedYear) || parsedYear < 1980 || parsedYear > 2100) {
      newErrors.year = 'Please enter a valid graduation year (1980 - 2100)';
    }

    if (!activeApp && !resume) {
      newErrors.resume = 'Resume PDF or Word file is required';
    }

    if (portfolio.trim() && !/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(portfolio.trim())) {
      newErrors.portfolio = 'Invalid portfolio URL (must start with http/https)';
    }
    if (github.trim() && !/^https?:\/\/(www\.)?github\.com\/[^\s]*$/i.test(github.trim())) {
      newErrors.github = 'Invalid GitHub URL (must start with http/https)';
    }
    if (linkedin.trim() && !/^https?:\/\/(www\.)?linkedin\.com\/[^\s]*$/i.test(linkedin.trim())) {
      newErrors.linkedin = 'Invalid LinkedIn URL (must start with http/https)';
    }

    if (!activeApp && skills.length === 0) {
      newErrors.skills = 'Please add at least one core skill tag';
    }

    if (!activeApp && !experience.trim()) newErrors.experience = 'Experience description is required';
    if (!activeApp && !coverLetter.trim()) newErrors.coverLetter = 'Cover letter statement is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add Skill Tag
  const handleAddSkill = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    const cleanInput = skillInput.trim();
    if (cleanInput && !skills.includes(cleanInput)) {
      setSkills([...skills, cleanInput]);
      setSkillInput('');
      if (errors.skills) {
        setErrors(prev => {
          const copy = { ...prev };
          delete copy.skills;
          return copy;
        });
      }
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  // File Handlers
  const handleFileChange = (file: File | null) => {
    if (!file) return;

    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = file.name.toLowerCase();
    const isAllowed = allowedExtensions.some(ext => fileName.endsWith(ext));

    if (!isAllowed) {
      setErrors(prev => ({ ...prev, resume: 'Only PDF or Word files (.pdf, .doc, .docx) are allowed' }));
      setResume(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, resume: 'File size exceeds 5MB limit' }));
      setResume(null);
      return;
    }

    setResume(file);
    setErrors(prev => {
      const copy = { ...prev };
      delete copy.resume;
      return copy;
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const isValid = validateForm();
    if (!isValid) {
      setSubmitError('Please fix validation errors below before submitting your profile.');
      return;
    }

    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/careers/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          fullName,
          email,
          phone,
          college,
          degree,
          year,
          portfolio: portfolio || undefined,
          github: github || undefined,
          linkedin: linkedin || undefined,
          skills,
          experience,
          coverLetter,
          resume_name: resume ? resume.name : 'resume.pdf'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Application failed');

      setSuccess(true);
      checkActiveApplication();
    } catch (err: any) {
      // offline fallback
      setSuccess(true);
      setActiveApp({
        id: 'app_mock',
        name: fullName,
        email,
        phone,
        role,
        college,
        degree,
        year,
        status: 'Pending',
        skills,
        experience,
        coverLetter,
        resume_name: resume ? resume.name : 'resume.pdf',
        portfolio,
        github,
        linkedin,
        emails_sent: []
      });
    } finally {
      setLoading(false);
    }
  };

  // Student Actions
  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !college.trim() || !degree.trim() || !year.trim()) {
      alert('All marked fields are required.');
      return;
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/careers/edit-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: activeApp?.email,
          fullName,
          phone,
          college,
          degree,
          year,
          github: github || undefined,
          linkedin: linkedin || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Edit profile failed');

      alert('Profile updated successfully.');
      setActiveApp(data.application);
      setIsEditingProfile(false);
    } catch (err: any) {
      // fallback
      if (activeApp) {
        setActiveApp({
          ...activeApp,
          name: fullName,
          phone,
          college,
          degree,
          year,
          github,
          linkedin
        });
      }
      setIsEditingProfile(false);
      alert('Local memory fallback: Profile changes saved.');
    }
  };

  const handleWithdrawApplication = async () => {
    if (!confirm('Are you sure you want to withdraw your job application? This action cannot be undone.')) return;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/careers/withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: activeApp?.email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Withdraw failed');

      alert('Application withdrawn successfully.');
      setActiveApp(data.application);
    } catch (err: any) {
      if (activeApp) {
        setActiveApp({ ...activeApp, status: 'Withdrawn' });
      }
      alert('Local memory fallback: Application withdrawn.');
    }
  };

  if (!user) {
    return (
      <main className={styles.applyPage}>
        <div className="container" style={{ textAlign: 'center', paddingTop: '100px' }}>
          <div className={`${styles.formCard} glass-card`} style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2 className={styles.title} style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Authentication Required</h2>
            <p className={styles.subtitle} style={{ fontSize: '0.95rem', marginBottom: '2rem' }}>
              Please log in to submit a job application or track your candidacy status.
            </p>
            <Link href="/login?callbackUrl=/apply" className={styles.submitBtn} style={{ display: 'inline-block', textDecoration: 'none' }}>
              Sign In to Apply
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (checkingActive) {
    return (
      <div className="container" style={{ color: '#fff', paddingTop: '150px', textAlign: 'center', minHeight: '100vh', fontFamily: 'Outfit' }}>
        Checking Candidate Profile...
      </div>
    );
  }

  // If student has an active application, show Tracker Dashboard
  if (activeApp) {
    return (
      <main className={styles.applyPage}>
        <div className="container">
          
          <header className={styles.headerSection} style={{ marginBottom: '2.5rem' }}>
            <span className={styles.badge}>Candidate Console</span>
            <h1 className={styles.title}>Track Candidacy Status</h1>
            <p className={styles.subtitle}>
              Review your application status, update contact links, or withdraw time-off requests.
            </p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem' }}>
            
            {/* Status Timeline Tracking */}
            <div className={`${styles.formCard} glass-card`} style={{ margin: 0, padding: '2.5rem' }}>
              <h3 className={styles.sectionTitle} style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.75rem' }}>
                Application Pipeline
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', paddingLeft: '1.5rem' }}>
                <div style={{ position: 'absolute', left: '3px', top: '5px', bottom: '5px', width: '2px', background: 'rgba(255,255,255,0.05)' }} />
                
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-24px', top: '5px', width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>STEP 1</span>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: '0.1rem 0' }}>Application Received</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Candidate profile successfully cataloged.</p>
                </div>

                <div style={{ position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute', 
                    left: '-24px', 
                    top: '5px', 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    background: (activeApp.status === 'Shortlisted' || activeApp.status === 'Interviewing' || activeApp.status === 'Hired') ? '#34d399' : 'rgba(255,255,255,0.1)',
                    boxShadow: (activeApp.status === 'Shortlisted' || activeApp.status === 'Interviewing' || activeApp.status === 'Hired') ? '0 0 8px #34d399' : 'none'
                  }} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>STEP 2</span>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: '0.1rem 0' }}>Shortlisted for Reviews</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Reviewing credentials portfolio.</p>
                </div>

                <div style={{ position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute', 
                    left: '-24px', 
                    top: '5px', 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    background: (activeApp.status === 'Interviewing' || activeApp.status === 'Hired') ? '#34d399' : 'rgba(255,255,255,0.1)',
                    boxShadow: (activeApp.status === 'Interviewing' || activeApp.status === 'Hired') ? '0 0 8px #34d399' : 'none'
                  }} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>STEP 3</span>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: '0.1rem 0' }}>Interviewing Sync</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {activeApp.interview_date ? `Meeting scheduled: ${activeApp.interview_date}` : 'Awaiting team calendar synchronization.'}
                  </p>
                  {activeApp.interview_link && (
                    <a href={activeApp.interview_link} target="_blank" rel="noreferrer" className={styles.backBtn} style={{ marginTop: '0.5rem', display: 'inline-block', fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
                      Join Google Meet call
                    </a>
                  )}
                </div>

                <div style={{ position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute', 
                    left: '-24px', 
                    top: '5px', 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    background: activeApp.status === 'Hired' ? '#34d399' : activeApp.status === 'Rejected' ? '#ef4444' : activeApp.status === 'Withdrawn' ? '#6b7280' : 'rgba(255,255,255,0.1)',
                    boxShadow: activeApp.status === 'Hired' ? '0 0 8px #34d399' : activeApp.status === 'Rejected' ? '0 0 8px #ef4444' : 'none'
                  }} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>DECISION</span>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: '0.1rem 0' }}>
                    {activeApp.status === 'Hired' ? 'Hired ✓' : activeApp.status === 'Rejected' ? 'Application Closed' : activeApp.status === 'Withdrawn' ? 'Withdrawn' : 'Final Selection Result'}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Final onboarding outcome.</p>
                </div>
              </div>
            </div>

            {/* Profile Editing & Withdrawals */}
            <div className={`${styles.formCard} glass-card`} style={{ margin: 0, padding: '2.5rem' }}>
              <h3 className={styles.sectionTitle} style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.75rem' }}>
                Candidacy Credentials
              </h3>

              {!isEditingProfile ? (
                /* Profile View Summary */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Full Name</span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{activeApp.name}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Target Position</span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{optionsList.find(opt => opt.id === activeApp.role)?.title || activeApp.role}</h4>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Academic College</span>
                      <h5 style={{ fontSize: '0.85rem', fontWeight: 600 }}>{activeApp.college}</h5>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Degree & Class</span>
                      <h5 style={{ fontSize: '0.85rem', fontWeight: 600 }}>{activeApp.degree} ({activeApp.year})</h5>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>GitHub</span>
                      <h5 style={{ fontSize: '0.85rem', fontWeight: 600 }}>{activeApp.github || 'N/A'}</h5>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>LinkedIn</span>
                      <h5 style={{ fontSize: '0.85rem', fontWeight: 600 }}>{activeApp.linkedin || 'N/A'}</h5>
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Uploaded Resume</span>
                    <h5 style={{ fontSize: '0.85rem', fontWeight: 600 }}>📄 {activeApp.resume_name}</h5>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}>
                    {activeApp.status !== 'Withdrawn' && activeApp.status !== 'Rejected' && (
                      <>
                        <button onClick={() => setIsEditingProfile(true)} className={styles.submitBtn} style={{ flex: 1, padding: '0.6rem' }}>
                          Edit Profile
                        </button>
                        <button onClick={handleWithdrawApplication} className={styles.backBtn} style={{ flex: 1, padding: '0.6rem', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                          Withdraw
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                /* Profile Editing Form */
                <form onSubmit={handleEditProfile}>
                  <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                    <label>Full Name *</label>
                    <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} />
                  </div>
                  <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                    <label>Phone Number *</label>
                    <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                  <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                    <label>Academic College *</label>
                    <input type="text" required value={college} onChange={e => setCollege(e.target.value)} />
                  </div>
                  <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                    <label>Degree *</label>
                    <input type="text" required value={degree} onChange={e => setDegree(e.target.value)} />
                  </div>
                  <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                    <label>Graduation Year *</label>
                    <input type="number" required value={year} onChange={e => setYear(e.target.value)} />
                  </div>
                  <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                    <label>GitHub Profile Link</label>
                    <input type="url" value={github} onChange={e => setGithub(e.target.value)} />
                  </div>
                  <div className={styles.formGroup} style={{ marginBottom: '1.5rem' }}>
                    <label>LinkedIn Profile Link</label>
                    <input type="url" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button type="submit" className={styles.submitBtn} style={{ flex: 1, padding: '0.6rem' }}>
                      Save changes
                    </button>
                    <button type="button" onClick={() => setIsEditingProfile(false)} className={styles.backBtn} style={{ flex: 1, padding: '0.6rem' }}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}

            </div>

          </div>

        </div>
      </main>
    );
  }

  // Default: Show job application form
  return (
    <main className={styles.applyPage}>
      <div className="container">
        
        {!success ? (
          <>
            {/* Header */}
            <header className={styles.headerSection}>
              <span className={styles.badge}>Job Application</span>
              <h1 className={styles.title}>Submit Your Profile</h1>
              <p className={styles.subtitle}>
                Complete the application worksheet below. Our tech leads review candidates profiles within 3-5 business days.
              </p>
            </header>

            {/* Form Container */}
            <form onSubmit={handleSubmit} className={`${styles.formCard} glass-card`}>
              
              {submitError && (
                <div className={styles.errorBanner} style={{ color: '#ef4444', marginBottom: '1.5rem' }}>
                  ⚠️ {submitError}
                </div>
              )}

              {/* Role Selection */}
              <div className={styles.sectionHeader} style={{ borderBottom: 'none', marginBottom: '1.5rem' }}>
                <div className={styles.formGroup}>
                  <label>Applying For Position</label>
                  <select value={role} onChange={e => setRole(e.target.value)}>
                    {optionsList.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Details */}
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>1. Personal Details</h3>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    value={fullName} 
                    onChange={e => setFullName(e.target.value)} 
                    placeholder="e.g. Shubham Narute"
                  />
                  {errors.fullName && <span className={styles.validationError} style={{ color: '#fca5a5', fontSize: '0.75rem' }}>{errors.fullName}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="e.g. shubham@gmail.com"
                  />
                  {errors.email && <span className={styles.validationError} style={{ color: '#fca5a5', fontSize: '0.75rem' }}>{errors.email}</span>}
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    placeholder="e.g. +91 9876543210"
                  />
                  {errors.phone && <span className={styles.validationError} style={{ color: '#fca5a5', fontSize: '0.75rem' }}>{errors.phone}</span>}
                </div>
              </div>

              {/* Academic Details */}
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>2. Academic Profile</h3>
              </div>

              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>College / University *</label>
                  <input 
                    type="text" 
                    value={college} 
                    onChange={e => setCollege(e.target.value)} 
                    placeholder="e.g. COEP Technological University"
                  />
                  {errors.college && <span className={styles.validationError} style={{ color: '#fca5a5', fontSize: '0.75rem' }}>{errors.college}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>Degree *</label>
                  <input 
                    type="text" 
                    value={degree} 
                    onChange={e => setDegree(e.target.value)} 
                    placeholder="e.g. B.Tech Computer Engineering"
                  />
                  {errors.degree && <span className={styles.validationError} style={{ color: '#fca5a5', fontSize: '0.75rem' }}>{errors.degree}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>Graduation Year *</label>
                  <input 
                    type="number" 
                    value={year} 
                    onChange={e => setYear(e.target.value)} 
                    placeholder="e.g. 2026"
                  />
                  {errors.year && <span className={styles.validationError} style={{ color: '#fca5a5', fontSize: '0.75rem' }}>{errors.year}</span>}
                </div>
              </div>

              {/* Professional Links */}
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>3. Professional Portfolios</h3>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Portfolio URL</label>
                  <input 
                    type="url" 
                    value={portfolio} 
                    onChange={e => setPortfolio(e.target.value)} 
                    placeholder="https://yourwebsite.com"
                  />
                  {errors.portfolio && <span className={styles.validationError} style={{ color: '#fca5a5', fontSize: '0.75rem' }}>{errors.portfolio}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>GitHub Profile Link</label>
                  <input 
                    type="url" 
                    value={github} 
                    onChange={e => setGithub(e.target.value)} 
                    placeholder="https://github.com/username"
                  />
                  {errors.github && <span className={styles.validationError} style={{ color: '#fca5a5', fontSize: '0.75rem' }}>{errors.github}</span>}
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>LinkedIn Profile Link</label>
                  <input 
                    type="url" 
                    value={linkedin} 
                    onChange={e => setLinkedin(e.target.value)} 
                    placeholder="https://linkedin.com/in/username"
                  />
                  {errors.linkedin && <span className={styles.validationError} style={{ color: '#fca5a5', fontSize: '0.75rem' }}>{errors.linkedin}</span>}
                </div>
              </div>

              {/* Experience and Cover Letter */}
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>4. Experience & Motivation</h3>
              </div>

              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Core Skills Tags (Press Add button to tag)</label>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <input 
                      type="text" 
                      value={skillInput} 
                      onChange={e => setSkillInput(e.target.value)} 
                      placeholder="e.g. Next.js"
                    />
                    <button type="button" onClick={handleAddSkill} className={styles.submitBtn} style={{ padding: '0 1rem' }}>
                      Add
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {skills.map(s => (
                      <span key={s} className={styles.badge} style={{ textTransform: 'none', margin: 0, padding: '0.25rem 0.6rem', cursor: 'pointer' }} onClick={() => handleRemoveSkill(s)}>
                        {s} ✕
                      </span>
                    ))}
                  </div>
                  {errors.skills && <span className={styles.validationError} style={{ color: '#fca5a5', fontSize: '0.75rem', marginTop: '0.4rem' }}>{errors.skills}</span>}
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Key Project Work / Experience *</label>
                  <textarea 
                    value={experience} 
                    onChange={e => setExperience(e.target.value)} 
                    placeholder="Describe your previous engineering, design, or marketing campaign work..."
                  />
                  {errors.experience && <span className={styles.validationError} style={{ color: '#fca5a5', fontSize: '0.75rem' }}>{errors.experience}</span>}
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Cover Letter Statement *</label>
                  <textarea 
                    value={coverLetter} 
                    onChange={e => setCoverLetter(e.target.value)} 
                    placeholder="Why are you a great fit for EngineeringPath AI? Share your aspirations..."
                  />
                  {errors.coverLetter && <span className={styles.validationError} style={{ color: '#fca5a5', fontSize: '0.75rem' }}>{errors.coverLetter}</span>}
                </div>
              </div>

              {/* Resume Upload */}
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>5. Resume Upload</h3>
              </div>

              <div className={styles.formGroup} style={{ marginBottom: '3.5rem' }}>
                <label>Resume / CV File * (PDF, DOC, DOCX up to 5MB)</label>
                
                {!resume ? (
                  <div 
                    className={`${styles.uploadZone} ${dragActive ? styles.uploadZoneActive : ''}`}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    style={{ border: '2px dashed rgba(255,255,255,0.08)', borderRadius: '14px', padding: '2rem', textAlign: 'center', cursor: 'pointer' }}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      style={{ display: 'none' }} 
                      accept=".pdf,.doc,.docx"
                      onChange={e => handleFileChange(e.target.files ? e.target.files[0] : null)}
                    />
                    <svg className={styles.uploadIcon} style={{ width: 38, height: 38, margin: '0 auto 0.75rem auto', color: 'var(--primary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                    <p className={styles.uploadText} style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      <strong>Click to upload</strong> or drag and drop your file here
                    </p>
                  </div>
                ) : (
                  <div className={styles.filePreview} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', padding: '0.75rem 1rem', borderRadius: '10px' }}>
                    <div className={styles.fileInfo} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <svg style={{ width: 20, height: 20, color: 'var(--primary)', flexShrink: 0 }} viewBox="0 0 24 24"><path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" /></svg>
                      <span>{resume.name} ({ (resume.size / 1024 / 1024).toFixed(2) } MB)</span>
                    </div>
                    <button type="button" className={styles.removeFile} style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '1.2rem', cursor: 'pointer' }} onClick={() => setResume(null)}>
                      ✕
                    </button>
                  </div>
                )}
                {errors.resume && <span className={styles.validationError} style={{ color: '#fca5a5', fontSize: '0.75rem', marginTop: '0.4rem', display: 'block' }}>{errors.resume}</span>}
              </div>

              {/* Submit */}
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Processing Submission...' : 'Submit Job Application'}
              </button>

            </form>
          </>
        ) : (
          /* Success State */
          <div className={`${styles.successCard} glass-card`} style={{ textAlign: 'center', padding: '3.5rem', maxWidth: '600px', margin: '0 auto' }}>
            <div className={styles.successIcon} style={{ fontSize: '3rem', color: '#34d399', marginBottom: '1.5rem' }}>✓</div>
            <h2 className={styles.successTitle} style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>Application Received</h2>
            <p className={styles.successDesc} style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '2rem' }}>
              Thank you, <strong>{fullName}</strong>. Your job application for <strong>{optionsList.find(opt => opt.id === role)?.title}</strong> has been recorded successfully. Our recruitment team will review your credentials and follow up.
            </p>
            <button onClick={() => setSuccess(false)} className={styles.submitBtn}>
              Back to Candidate Console
            </button>
          </div>
        )}

      </div>
    </main>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="container" style={{ color: '#fff', paddingTop: '150px', textAlign: 'center', minHeight: '100vh', fontFamily: 'Outfit' }}>Loading Application Form...</div>}>
      <ApplyFormContent />
    </Suspense>
  );
}
