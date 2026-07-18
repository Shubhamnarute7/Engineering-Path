'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './client.module.css';

interface SidebarItem {
  id: string;
  label: string;
  badge?: number;
  icon: React.ReactNode;
}

interface RequirementFile {
  name: string;
  size: string;
  uploadedAt: string;
}

interface SupportTicket {
  id: string;
  title: string;
  severity: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Closed';
  createdAt: string;
}

interface ChatMessage {
  id: string;
  sender: 'client' | 'team';
  text: string;
  time: string;
}

interface Invoice {
  id: string;
  service: string;
  amount: string;
  date: string;
  status: 'Paid' | 'Pending';
  refundStatus?: 'None' | 'Pending' | 'Approved' | 'Rejected';
}

export default function ClientDashboard() {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || user?.role !== 'Client') {
        router.replace('/login');
      }
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#fff', fontFamily: 'Outfit' }}>Loading Client Console...</div>;
  }

  if (!user || user.role !== 'Client') {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#fff', fontFamily: 'Outfit' }}>Access Denied. Redirecting to login...</div>;
  }


  // Billing and Payment States
  const [invoicesList, setInvoicesList] = useState<Invoice[]>([]);
  const [invoicesLoading, setInvoicesLoading] = useState(true);

  const fetchInvoices = async () => {
    if (!user?.email) return;
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/payments/invoices?email=${user.email}`);
      const data = await res.json();
      if (res.ok && data.invoices) {
        setInvoicesList(data.invoices);
      }
    } catch (e) {
      console.warn("FastAPI offline, using static mock invoices");
      setInvoicesList([
        { id: 'INV-2026-001', service: 'Meta Ads Setup + Ad Account Audit', amount: '₹9,999', date: 'Jan 02, 2026', status: 'Paid', refundStatus: 'None' },
        { id: 'INV-2026-002', service: 'AI WhatsApp Chatbot Subscription', amount: '₹14,999', date: 'Jan 15, 2026', status: 'Paid', refundStatus: 'None' },
        { id: 'INV-2026-003', service: 'Meta Ads Management (Feb cycle)', amount: '₹9,999', date: 'Feb 02, 2026', status: 'Pending', refundStatus: 'None' }
      ]);
    } finally {
      setInvoicesLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [user]);

  const [billingSettings, setBillingSettings] = useState({
    defaultProvider: 'stripe',
    billingEmail: user?.email || 'director@iitpune.com',
    autoRenew: true
  });


  // ──────────────────────────────────────────
  // SIDEBAR ITEMS DEFINITIONS
  // ──────────────────────────────────────────
  const SIDEBAR_ITEMS: SidebarItem[] = [
    {
      id: 'overview',
      label: 'Overview & Progress',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    },
    {
      id: 'requirements',
      label: 'Upload Requirements',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
    },
    {
      id: 'deliverables',
      label: 'Download Deliverables',
      badge: 2,
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
    },
    {
      id: 'billing',
      label: 'Billing & Invoices',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      id: 'tickets',
      label: 'Support Tickets',
      badge: 1,
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    },
    {
      id: 'chat',
      label: 'Team Chat',
      badge: 2,
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
    },
    {
      id: 'settings',
      label: 'Profile Settings',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    }
  ];

  return (
    <div className={styles.clientLayout}>
      
      {/* Sidebar Navigation */}
      <aside className={`${styles.sidebar} ${mobileSidebarOpen ? styles.sidebarOpen : ''}`}>
        
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogoText}>
            <img src="/logo.jpg" alt="Logo" style={{ width: 28, height: 28, borderRadius: '50%' }} />
            Client Portal
          </div>
        </div>

        <nav className={styles.sidebarMenu}>
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileSidebarOpen(false);
              }}
              className={`${styles.menuItem} ${activeTab === item.id ? styles.activeItem : ''}`}
            >
              <div className={styles.menuItemLeft}>
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && <span className={styles.itemBadge}>{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.clientProfileInfo}>
            <div className={styles.avatar}>C</div>
            <div className={styles.clientMeta}>
              <h5>{user?.name || 'Client Institute'}</h5>
              <span>{user?.role || 'Partner Client'}</span>
            </div>
          </div>
          <button onClick={logout} className={styles.logoutBtn} title="Sign Out">
            <svg style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

      </aside>

      {/* Main Panel Content */}
      <main className={styles.mainPanel}>
        
        {/* Header Desktop */}
        <header className={styles.mainHeader}>
          <h1 className={styles.pageTitle}>
            {SIDEBAR_ITEMS.find(i => i.id === activeTab)?.label}
          </h1>
          <div className={styles.dateRange}>
            🏢 Partner Hub • Client Console
          </div>
        </header>

        {/* Header Mobile */}
        <div className={styles.mobileHeaderRow}>
          <button 
            className={styles.menuBtn}
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            ☰
          </button>
          <h1 className={styles.pageTitle} style={{ fontSize: '1.4rem' }}>
            {SIDEBAR_ITEMS.find(i => i.id === activeTab)?.label}
          </h1>
          <div className={styles.avatar} style={{ width: 32, height: 32 }}>C</div>
        </div>

        {/* Dynamic Tab Switch Router */}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'requirements' && <RequirementsTab />}
        {activeTab === 'deliverables' && <DeliverablesTab />}
        {activeTab === 'billing' && <BillingTab invoices={invoicesList} setInvoices={setInvoicesList} settings={billingSettings} setSettings={setBillingSettings} />}
        {activeTab === 'tickets' && <TicketsTab />}
        {activeTab === 'chat' && <ChatTab />}
        {activeTab === 'notifications' && <NotificationsTab />}
        {activeTab === 'settings' && <SettingsTab />}

      </main>

    </div>
  );
}

// ──────────────────────────────────────────
// TABS CONTENT IMPLEMENTATIONS
// ──────────────────────────────────────────

// 1. Overview & Project Progress Tab
function OverviewTab() {
  const SERVICES = [
    { name: 'Meta Ads Management', plan: 'Growth Package (₹9,999/mo)', activeSince: 'Oct 14, 2025', color: '#3b82f6' },
    { name: 'AI WhatsApp Chatbot', plan: 'Automation Setup (₹14,999/mo)', activeSince: 'Nov 02, 2025', color: '#7c3aed' }
  ];

  const TIMELINE_STEPS = [
    { num: 1, label: 'Data Ingestion', status: 'complete' },
    { num: 2, label: 'Model Customization', status: 'complete' },
    { num: 3, label: 'UI Integrations', status: 'active' },
    { num: 4, label: 'Deploy Production', status: 'pending' }
  ];

  return (
    <div>
      {/* Active Services */}
      <h2 style={{ fontSize: '1.1rem', color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
        Purchased Subscriptions
      </h2>
      <div className={styles.servicesGrid}>
        {SERVICES.map((s, idx) => (
          <div key={idx} className={`${styles.serviceCard} glass-card`}>
            <div className={styles.serviceGlow} style={{ background: `radial-gradient(circle at 50% 50%, ${s.color}12 0%, transparent 60%)` }} />
            <div className={styles.serviceHeader}>
              <span className={styles.serviceBadge} style={{ color: s.color, borderColor: `${s.color}33`, background: `${s.color}15` }}>Active</span>
            </div>
            <h3 className={styles.serviceTitle}>{s.name}</h3>
            <p className={styles.priceTag}>Plan scope: <strong>{s.plan}</strong></p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Ingested: {s.activeSince}</p>
          </div>
        ))}
      </div>

      {/* Project Progress Tracker */}
      <div className={`${styles.timelineCard} glass-card`}>
        <h3 className={styles.timelineTitle}>AI Chatbot Integration Progress</h3>
        
        <div className={styles.progressBarTrack}>
          <div className={styles.progressBarFill} style={{ width: '65%' }} />
        </div>

        <div className={styles.stepsRow}>
          {TIMELINE_STEPS.map((s) => (
            <div key={s.num} className={`${styles.stepNode} ${
              s.status === 'active' ? styles.nodeActive : 
              s.status === 'complete' ? styles.nodeComplete : ''
            }`}>
              <div className={styles.nodeCircle}>
                {s.status === 'complete' ? '✓' : s.num}
              </div>
              <span className={styles.nodeLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 2. Upload Requirements Tab
function RequirementsTab() {
  const [reqs, setReqs] = useState<RequirementFile[]>([
    { name: 'logo-assets-highres.pdf', size: '2.4 MB', uploadedAt: 'Dec 12, 2025' },
    { name: 'mht-cet-merit-list-draft.csv', size: '4.8 MB', uploadedAt: 'Jan 02, 2026' }
  ]);

  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const sizeStr = `${(file.size / 1024 / 1024).toFixed(1)} MB`;
    const newReq: RequirementFile = {
      name: file.name,
      size: sizeStr,
      uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setReqs([newReq, ...reqs]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className={`${styles.fileCard} glass-card`}>
      <h3 className={styles.timelineTitle}>Upload Project Briefs & Assets</h3>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Provide copywriting spreadsheets, color tokens, counselor logs, or MHT-CET college seat structures.
      </p>

      {/* Drag Zone */}
      <div 
        className={`${styles.uploadZone} ${dragActive ? styles.uploadZoneActive : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={e => e.target.files && handleFile(e.target.files[0])} 
        />
        <svg className={styles.uploadIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
        </svg>
        <p className={styles.uploadText}><strong>Click to browse</strong> or drag requirements file here</p>
      </div>

      {/* Uploaded List */}
      <div className={styles.fileList}>
        {reqs.map((f, idx) => (
          <div key={idx} className={styles.fileItem}>
            <div className={styles.fileMeta}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" /></svg>
              <div>
                <div className={styles.fileName}>{f.name}</div>
                <div className={styles.fileSize}>{f.size} • Uploaded {f.uploadedAt}</div>
              </div>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>Uploaded ✓</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. Download Deliverables Tab
function DeliverablesTab() {
  const FILES = [
    { name: 'logo-brandbook-final.zip', size: '14.2 MB', desc: 'Vector logo variations, color palettes HSL guide, and Outfit typography configs.' },
    { name: 'chatbot-widget-embed.txt', size: '1.2 KB', desc: 'Copy-paste HTML JS snippet to embed the MHT-CET predictor chatbot on your external portal.' }
  ];

  return (
    <div className={`${styles.fileCard} glass-card`}>
      <h3 className={styles.timelineTitle}>Project Deliverables Folder</h3>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Download finished assets, Next.js code ZIP sheets, or integrations code snippets from here.
      </p>

      <div className={styles.fileList}>
        {FILES.map((f, idx) => (
          <div key={idx} className={styles.fileItem}>
            <div className={styles.fileMeta}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" /></svg>
              <div>
                <div className={styles.fileName}>{f.name}</div>
                <div className={styles.fileSize}>{f.size} • {f.desc}</div>
              </div>
            </div>
            <button className={styles.dlBtn} onClick={() => alert(`Starting download: ${f.name}`)}>
              Download File
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Billing & Invoices Tab
function BillingTab({ 
  invoices, 
  setInvoices, 
  settings, 
  setSettings 
}: { 
  invoices: Invoice[]; 
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>; 
  settings: { defaultProvider: string; billingEmail: string; autoRenew: boolean }; 
  setSettings: React.Dispatch<React.SetStateAction<{ defaultProvider: string; billingEmail: string; autoRenew: boolean }>>; 
}) {
  const [billingSubTab, setBillingSubTab] = useState<'ledger' | 'settings'>('ledger');

  // local state for editing settings
  const [localEmail, setLocalEmail] = useState(settings.billingEmail);
  const [localProvider, setLocalProvider] = useState(settings.defaultProvider);
  const [localAutoRenew, setLocalAutoRenew] = useState(settings.autoRenew);
  const [savingSettings, setSavingSettings] = useState(false);

  const handleRequestRefund = async (invoiceId: string) => {
    const reason = prompt('Please specify the reason for this refund request:');
    if (reason === null) return; // cancelled
    if (!reason.trim()) {
      alert('A refund reason is required.');
      return;
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/payment/request-refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoice_id: invoiceId, reason })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Refund request failed');

      alert(data.message || 'Refund requested successfully.');
      setInvoices(invoices.map(inv => inv.id === invoiceId ? { ...inv, refundStatus: 'Pending' } : inv));
    } catch (err: any) {
      alert(err.message || 'Network error occurred');
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/payment/save-billing-settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          default_provider: localProvider,
          billing_email: localEmail,
          auto_renew: localAutoRenew
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Save settings failed');

      setSettings({
        defaultProvider: localProvider,
        billingEmail: localEmail,
        autoRenew: localAutoRenew
      });
      alert('Billing settings updated successfully.');
    } catch (err: any) {
      alert(err.message || 'Network error occurred');
    } finally {
      setSavingSettings(false);
    }
  };

  return (
    <div>
      {/* Sub tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => setBillingSubTab('ledger')}
          style={{ 
            background: billingSubTab === 'ledger' ? 'rgba(124, 58, 237, 0.1)' : 'transparent', 
            border: billingSubTab === 'ledger' ? '1px solid rgba(124,58,237,0.2)' : '1px solid transparent', 
            color: billingSubTab === 'ledger' ? '#c084fc' : 'var(--text-muted)', 
            fontSize: '0.85rem', 
            fontWeight: 700, 
            padding: '0.5rem 1rem', 
            borderRadius: '8px', 
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          INVOICES & REFUNDS
        </button>
        <button 
          onClick={() => setBillingSubTab('settings')}
          style={{ 
            background: billingSubTab === 'settings' ? 'rgba(124, 58, 237, 0.1)' : 'transparent', 
            border: billingSubTab === 'settings' ? '1px solid rgba(124,58,237,0.2)' : '1px solid transparent', 
            color: billingSubTab === 'settings' ? '#c084fc' : 'var(--text-muted)', 
            fontSize: '0.85rem', 
            fontWeight: 700, 
            padding: '0.5rem 1rem', 
            borderRadius: '8px', 
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          BILLING GATEWAY SETTINGS
        </button>
      </div>

      {billingSubTab === 'ledger' ? (
        <div className={`${styles.tableCard} glass-card`} style={{ border: 'none', padding: '0' }}>
          <h3 className={styles.tableTitle}>Invoices Ledger</h3>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Service Scope</th>
                <th>Billing Date</th>
                <th>Amount Due</th>
                <th>Status</th>
                <th>Refund Action</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{inv.id}</td>
                  <td style={{ fontWeight: 700 }}>{inv.service}</td>
                  <td>{inv.date}</td>
                  <td style={{ fontWeight: 'bold' }}>{inv.amount}</td>
                  <td>
                    <span className={`${styles.statusPill} ${inv.status === 'Paid' ? styles.statusPaid : styles.statusPending}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td>
                    {inv.status === 'Paid' && (!inv.refundStatus || inv.refundStatus === 'None') && (
                      <button 
                        className={styles.actionBtn}
                        style={{ color: '#fca5a5', background: 'rgba(239,68,68,0.06)', borderColor: 'rgba(239,68,68,0.15)' }}
                        onClick={() => handleRequestRefund(inv.id)}
                      >
                        Request Refund
                      </button>
                    )}
                    {inv.refundStatus === 'Pending' && (
                      <span className={styles.statusPill} style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' }}>
                        Refund Pending
                      </span>
                    )}
                    {inv.refundStatus === 'Approved' && (
                      <span className={styles.statusPill} style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
                        Refunded ✓
                      </span>
                    )}
                    {inv.status !== 'Paid' && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>N/A</span>
                    )}
                  </td>
                  <td>
                    <button className={styles.dlBtn} onClick={() => alert(`Downloading PDF Invoice ${inv.id}`)}>
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={`${styles.fileCard} glass-card`}>
          <h3 className={styles.timelineTitle}>Payment Gateway Settings</h3>
          <form onSubmit={handleSaveSettings}>
            <div className={styles.formGroup} style={{ marginBottom: '1.5rem' }}>
              <label>Default Payment Gateway</label>
              <select value={localProvider} onChange={e => setLocalProvider(e.target.value)}>
                <option value="stripe">Stripe Checkout (International / Card)</option>
                <option value="razorpay">Razorpay Checkout (UPI, Cards, NetBanking)</option>
              </select>
            </div>

            <div className={styles.formGroup} style={{ marginBottom: '1.5rem' }}>
              <label>Billing Statement Email Address</label>
              <input 
                type="email" 
                required
                value={localEmail} 
                onChange={e => setLocalEmail(e.target.value)} 
                placeholder="billing@yourdomain.com"
              />
            </div>

            <div className={styles.formGroup} style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <input 
                type="checkbox" 
                id="autoRenewCheck"
                checked={localAutoRenew} 
                onChange={e => setLocalAutoRenew(e.target.checked)} 
                style={{ width: 'auto', cursor: 'pointer' }}
              />
              <label htmlFor="autoRenewCheck" style={{ margin: 0, cursor: 'pointer', textTransform: 'none', fontSize: '0.88rem' }}>
                Automatically renew subscriptions (automatic invoicing charge)
              </label>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={savingSettings}>
              {savingSettings ? 'Saving Settings...' : 'Save Billing Settings'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// 5. Support Tickets Tab
function TicketsTab() {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    { id: 'TCK-849', title: 'Chatbot percentile slider not sliding on Firefox', severity: 'Medium', status: 'In Progress', createdAt: 'Jan 12, 2026' }
  ]);

  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;

    const newTicket: SupportTicket = {
      id: `TCK-${Math.floor(Math.random() * 900) + 100}`,
      title,
      severity,
      status: 'Open',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setTickets([newTicket, ...tickets]);
    setTitle('');
    setDesc('');
    alert('Support ticket created. Our engineers will check in shortly.');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem' }}>
      
      {/* Raise Ticket Form */}
      <div className={`${styles.fileCard} glass-card`}>
        <h3 className={styles.timelineTitle}>Raise Support Ticket</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Ticket Summary / Title *</label>
            <input type="text" required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Chatbot server returns 500 error" />
          </div>

          <div className={styles.formGroup}>
            <label>Severity Level</label>
            <select value={severity} onChange={e => setSeverity(e.target.value as any)}>
              <option value="Low">Low (Visual tweaks / general query)</option>
              <option value="Medium">Medium (Feature blocked on certain screens)</option>
              <option value="High">High (System down / prediction failures)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Detailed Description *</label>
            <textarea required value={desc} onChange={e => setDesc(e.target.value)} placeholder="Specify browser, device details, and inputs used..." />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Open Support Ticket
          </button>
        </form>
      </div>

      {/* Active Tickets List */}
      <div className={`${styles.fileCard} glass-card`}>
        <h3 className={styles.timelineTitle}>Active Tickets Logs</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
          {tickets.map((t) => (
            <div key={t.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.id}</span>
                <span className={`${styles.statusPill} ${
                  t.status === 'Open' ? styles.statusOpen : 
                  t.status === 'In Progress' ? styles.statusProgress : styles.statusClosed
                }`}>
                  {t.status}
                </span>
              </div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>{t.title}</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Severity: <strong style={{ color: t.severity === 'High' ? '#ef4444' : '#f59e0b' }}>{t.severity}</strong></span>
                <span>Opened {t.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// 6. Team Chat Tab
function ChatTab() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'team', text: "Hello! Shubham here. We loaded your 2025 MH merit list coefficients database. Let us know if we should deploy active validation.", time: '10:30 AM' },
    { id: '2', sender: 'client', text: "Yes, please activate it on Pune VJTI/COEP entries first. Let's make sure the cutoff offset averages are correct.", time: '10:35 AM' },
    { id: '3', sender: 'team', text: "Copy that. We are adjusting ENTC/Computer branch weights. It will reflect on your widget in 2 hours.", time: '10:38 AM' }
  ]);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'client',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate Team Lead automated response
    setTimeout(() => {
      const autoReply: ChatMessage = {
        id: Math.random().toString(),
        sender: 'team',
        text: "Got it! Our engineering team has received your message and is reviewing this scope adjustment.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, autoReply]);
    }, 1200);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h4>EngineeringPath Support Team</h4>
        <span>● Active Counseling Engineers</span>
      </div>

      <div className={styles.messagesList}>
        {messages.map((m) => (
          <div key={m.id} className={`${styles.msgRow} ${m.sender === 'client' ? styles.msgRowClient : styles.msgRowTeam}`}>
            <div className={`${styles.bubble} ${m.sender === 'client' ? styles.bubbleClient : styles.bubbleTeam}`}>
              {m.text}
              <span className={styles.msgMeta}>{m.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className={styles.chatInputArea}>
        <input 
          type="text" 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          placeholder="Ask something to your developers, editors, or marketing leads..."
          className={styles.chatInput}
        />
        <button type="submit" className={styles.sendBtn}>
          Send Message
        </button>
      </form>
    </div>
  );
}

// 7. Notifications Tab
function NotificationsTab() {
  const ALERTS = [
    { title: 'Project timeline update: UI Integrations node active', desc: 'Snehal Patil completed ML model training validations and activated React frontend widgets configs.', time: '2 hours ago' },
    { title: 'New Invoice available: INV-2026-003', desc: 'Billing cycle generated for Meta Ads management package.', time: '1 day ago' },
    { title: 'Requirement File verified: logo-assets-highres.pdf', desc: 'Design leads reviewed logo brief and loaded visual assets into Figma mockup boards.', time: '3 days ago' }
  ];

  return (
    <div className={`${styles.fileCard} glass-card`}>
      <h3 className={styles.timelineTitle}>Platform Alerts Logs</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
        {ALERTS.map((a, idx) => (
          <div key={idx} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0, color: '#fff' }}>{a.title}</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{a.time}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 8. Profile Settings Tab
function SettingsTab() {
  return (
    <div className={`${styles.fileCard} glass-card`}>
      <h3 className={styles.timelineTitle}>Institute Profile Settings</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className={styles.formGroup}>
          <label>Coaching Institute Name</label>
          <input type="text" defaultValue="Chate Classes Pune" />
        </div>

        <div className={styles.formGroup}>
          <label>Contact Phone</label>
          <input type="tel" defaultValue="+91 98220 12345" />
        </div>

        <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
          <label>Office Address</label>
          <input type="text" defaultValue="Plot 18, FC Road, Shivaji Nagar, Pune, MH, 411004" />
        </div>

        <div className={styles.formGroup}>
          <label>Password Update</label>
          <input type="password" placeholder="Type new password" />
        </div>

        <div className={styles.formGroup}>
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm new password" />
        </div>
      </div>

      <button className={styles.submitBtn} onClick={() => alert('Profile credentials updated successfully.')}>
        Save Profile changes
      </button>
    </div>
  );
}
