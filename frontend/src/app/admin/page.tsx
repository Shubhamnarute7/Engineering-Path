'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './admin.module.css';

interface SidebarItem {
  id: string;
  label: string;
  badge?: number;
  icon: React.ReactNode;
}

export default function AdminDashboard() {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [analytics, setAnalytics] = useState<any>(null);

  const fetchAnalytics = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/analytics/dashboard`);
      const data = await res.json();
      if (res.ok) {
        setAnalytics(data);
      }
    } catch (e) {
      console.warn("FastAPI offline, using mock analytics");
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || user?.role !== 'Admin') {
        router.replace('/login');
      } else {
        fetchAnalytics();
      }
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#fff', fontFamily: 'Outfit' }}>Loading Admin Console...</div>;
  }

  if (!user || user.role !== 'Admin') {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#fff', fontFamily: 'Outfit' }}>Access Denied. Redirecting to login...</div>;
  }

  // Search filter state
  const [searchQuery, setSearchQuery] = useState('');


  // 14 Sidebar Items
  const SIDEBAR_ITEMS: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg>
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    },
    {
      id: 'users',
      label: 'Users',
      badge: 4,
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    },
    {
      id: 'clients',
      label: 'Clients',
      badge: 2,
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    },
    {
      id: 'employees',
      label: 'Employees',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    },
    {
      id: 'careers',
      label: 'Careers',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    },
    {
      id: 'applications',
      label: 'Job Applications',
      badge: 3,
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    },
    {
      id: 'services',
      label: 'Services',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
    },
    {
      id: 'pricing',
      label: 'Pricing',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
    },
    {
      id: 'leads',
      label: 'Leads',
      badge: 5,
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6m-6 4h6" /></svg>
    },
    {
      id: 'crm',
      label: 'CRM',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    }
  ];

  return (
    <div className={styles.adminLayout}>
      
      {/* Sidebar Navigation */}
      <aside className={`${styles.sidebar} ${mobileSidebarOpen ? styles.sidebarOpen : ''}`}>
        
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogoText}>
            <img src="/logo.jpg" alt="Logo" style={{ width: 28, height: 28, borderRadius: '50%' }} />
            EngineeringPath AI
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
          <div className={styles.adminProfileInfo}>
            <div className={styles.avatar}>A</div>
            <div className={styles.adminMeta}>
              <h5>{user?.name || 'Admin User'}</h5>
              <span>{user?.role || 'Administrator'}</span>
            </div>
          </div>
          <button onClick={logout} className={styles.logoutBtn} title="Sign Out">
            <svg style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

      </aside>

      {/* Main Administrative Panel */}
      <main className={styles.mainPanel}>
        
        {/* Header Desktop */}
        <header className={styles.mainHeader}>
          <h1 className={styles.pageTitle}>
            {SIDEBAR_ITEMS.find(i => i.id === activeTab)?.label}
          </h1>
          <div className={styles.dateRange}>
            📅 FY 2026/27 • Live Reports
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
          <div className={styles.avatar} style={{ width: 32, height: 32 }}>A</div>
        </div>

        {/* Dynamic Render Tab Views */}
        {activeTab === 'dashboard' && <DashboardTab data={analytics} />}
        {activeTab === 'analytics' && <AnalyticsTab dbData={analytics} />}
        {activeTab === 'users' && <UsersTab searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
        {activeTab === 'clients' && <ClientsTab />}
        {activeTab === 'employees' && <EmployeesTab />}
        {activeTab === 'careers' && <CareersTab />}
        {activeTab === 'applications' && <ApplicationsTab />}
        {activeTab === 'services' && <ServicesTab />}
        {activeTab === 'pricing' && <PricingTab />}
        {activeTab === 'leads' && <LeadsTab />}
        {activeTab === 'blog' && <BlogTab />}
        {activeTab === 'crm' && <CrmTab />}
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'payments' && <PaymentsTab />}
        {activeTab === 'settings' && <SettingsTab />}

      </main>

    </div>
  );
}

// ──────────────────────────────────────────
// TAB COMPONENT IMPLEMENTATIONS
// ──────────────────────────────────────────

// 1. Dashboard Module
function DashboardTab({ data }: { data: any }) {
  const counts = data?.counts || {
    total_users: '1,248',
    total_revenue: '₹1,48,990',
    clients: '12',
    total_leads: '42',
    total_applications: '29'
  };

  const revenuePoints = data?.revenue?.points || "M 0 170 Q 70 140 120 120 T 240 70 T 360 90 T 500 30";
  const revenueFill = data?.revenue?.fill || "M 0 170 Q 70 140 120 120 T 240 70 T 360 90 T 500 30 L 500 200 L 0 200 Z";
  const revenueTotal = data?.revenue?.total || counts.total_revenue;

  // 7 Widgets
  const WIDGETS = [
    { label: 'Total Users', value: counts.total_users, trend: '+14% MoM', up: true, color: '#3b82f6' },
    { label: 'Total Revenue', value: revenueTotal, trend: '+22% MoM', up: true, color: '#10b981' },
    { label: 'Active Clients', value: counts.clients, trend: '+8% MoM', up: true, color: '#7c3aed' },
    { label: 'Open Projects', value: '5', trend: 'Stable', up: true, color: '#06b6d4' },
    { label: 'Pending Leads', value: counts.total_leads, trend: '-2% MoM', up: false, color: '#f59e0b' },
    { label: 'Job Applications', value: counts.total_applications, trend: '+45% MoM', up: true, color: '#ec4899' },
    { label: 'Website Visitors', value: '4,582', trend: '+19% MoM', up: true, color: '#14b8a6' }
  ];

  return (
    <div>
      {/* 7 Widgets Grid */}
      <div className={styles.widgetsGrid}>
        {WIDGETS.map((w, idx) => (
          <div key={idx} className={`${styles.widgetCard} glass-card`}>
            <div className={styles.widgetGlow} style={{ background: `radial-gradient(circle at 50% 50%, ${w.color}15 0%, transparent 65%)` }} />
            <div className={styles.widgetContent}>
              <div className={styles.widgetHeader}>
                <span>{w.label}</span>
              </div>
              <div className={styles.widgetValue}>{w.value}</div>
              <div className={`${styles.widgetTrend} ${w.up ? styles.trendUp : styles.trendDown}`}>
                {w.up ? '▲' : '▼'} {w.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SVG Charts section */}
      <div className={styles.chartsGrid}>
        
        {/* Revenue Growth Area Chart */}
        <div className={`${styles.chartCard} glass-card`}>
          <h3 className={styles.chartTitle}>Revenue Performance (FY 2026/27)</h3>
          <div className={styles.svgWrapper}>
            <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <g style={{ stroke: 'rgba(255,255,255,0.04)', strokeWidth: 1 }}>
                <line x1="0" y1="40" x2="500" y2="40" />
                <line x1="0" y1="90" x2="500" y2="90" />
                <line x1="0" y1="140" x2="500" y2="140" />
              </g>
              {/* Chart Line path */}
              <path
                d={revenuePoints}
                fill="none"
                stroke="#10b981"
                strokeWidth={3}
              />
              {/* Fill area */}
              <path
                d={revenueFill}
                fill="url(#chart-glow)"
              />
              {/* Points */}
              <circle cx="120" cy="120" r="5" fill="#10b981" />
              <circle cx="240" cy="70" r="5" fill="#10b981" />
              <circle cx="500" cy="30" r="5" fill="#10b981" />
            </svg>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
            <span>Q1 (Apr)</span>
            <span>Q2 (Jul)</span>
            <span>Q3 (Oct)</span>
            <span>Q4 (Jan)</span>
          </div>
        </div>

        {/* User Signups Bar Chart */}
        <div className={`${styles.chartCard} glass-card`}>
          <h3 className={styles.chartTitle}>Monthly User Ingestion</h3>
          <div className={styles.svgWrapper}>
            <svg viewBox="0 0 350 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <g fill="#7c3aed" opacity="0.85">
                <rect x="20" y="120" width="24" height="80" rx="4" />
                <rect x="70" y="90" width="24" height="110" rx="4" />
                <rect x="120" y="60" width="24" height="140" rx="4" fill="#a78bfa" />
                <rect x="170" y="40" width="24" height="160" rx="4" fill="#a78bfa" />
                <rect x="220" y="70" width="24" height="130" rx="4" />
                <rect x="270" y="30" width="24" height="170" rx="4" fill="#6366f1" />
              </g>
            </svg>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
            <span>Jan</span>
          </div>
        </div>

      </div>

      {/* Recent Activities list */}
      <div className={`${styles.tableCard} glass-card`}>
        <div className={styles.tableHeaderRow}>
          <h3 className={styles.tableTitle}>Recent Platform Activities</h3>
        </div>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Event Description</th>
              <th>Status</th>
              <th>Category</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Student Shubham Narute submitted predictability score 97.8%</td>
              <td><span className={`${styles.statusPill} ${styles.statusActive}`}>Success</span></td>
              <td>Predictor Engine</td>
              <td>5 mins ago</td>
            </tr>
            <tr>
              <td>Invoice paid by IIT Academy Pune (Growth plan)</td>
              <td><span className={`${styles.statusPill} ${styles.statusPaid}`}>Paid</span></td>
              <td>Billing</td>
              <td>2 hours ago</td>
            </tr>
            <tr>
              <td>New Job application: AI/ML Intern (Abhi Narute)</td>
              <td><span className={`${styles.statusPill} ${styles.statusPending}`}>Pending</span></td>
              <td>Careers Recruitment</td>
              <td>4 hours ago</td>
            </tr>
            <tr>
              <td>System database backup verification successfully run</td>
              <td><span className={`${styles.statusPill} ${styles.statusActive}`}>Complete</span></td>
              <td>SysAdmin</td>
              <td>12 hours ago</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

// 2. Analytics Module
function AnalyticsTab({ dbData }: { dbData: any }) {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | 'ytd' | 'all'>('ytd');

  // ──────────────────────────────────────────
  // MOCK ANALYTICS DATASETS (DYNAMIC TO DATE FILTERS)
  // ──────────────────────────────────────────
  const getChartData = () => {
    switch (dateRange) {
      case '7d':
        return {
          revenue: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], points: 'M 0 170 Q 70 160 120 150 T 240 130 T 360 110 T 500 80', fill: 'M 0 170 Q 70 160 120 150 T 240 130 T 360 110 T 500 80 L 500 200 L 0 200 Z', total: '₹24,850' },
          users: { students: 'M 0 180 Q 100 160 200 130 T 400 110 T 500 90', staff: 'M 0 190 Q 100 180 200 170 T 400 150 T 500 140' },
          traffic: { views: 'M 0 150 Q 80 120 200 140 T 380 90 T 500 70', visitors: 'M 0 170 Q 80 150 200 160 T 380 120 T 500 100' },
          sales: [30, 45, 60, 80, 50, 90, 110],
          leads: 'M 0 160 Q 90 140 180 150 T 360 110 T 500 60',
          growth: { current: 'M 0 160 Q 100 140 250 110 T 500 50', previous: 'M 0 180 Q 100 170 250 150 T 500 120' }
        };
      case '30d':
        return {
          revenue: { labels: ['W1', 'W2', 'W3', 'W4'], points: 'M 0 180 Q 100 140 200 110 T 400 80 T 500 40', fill: 'M 0 180 Q 100 140 200 110 T 400 80 T 500 40 L 500 200 L 0 200 Z', total: '₹98,400' },
          users: { students: 'M 0 160 Q 100 130 200 90 T 400 60 T 500 30', staff: 'M 0 190 Q 100 170 200 160 T 400 140 T 500 120' },
          traffic: { views: 'M 0 160 Q 80 140 200 110 T 380 70 T 500 40', visitors: 'M 0 180 Q 80 165 200 140 T 380 100 T 500 80' },
          sales: [40, 70, 90, 140],
          leads: 'M 0 170 Q 90 130 180 110 T 360 70 T 500 30',
          growth: { current: 'M 0 170 Q 100 130 250 80 T 500 20', previous: 'M 0 190 Q 100 165 250 135 T 500 100' }
        };
      case 'all':
        return {
          revenue: { labels: ['2023', '2024', '2025', '2026'], points: 'M 0 190 Q 100 150 200 120 T 400 60 T 500 10', fill: 'M 0 190 Q 100 150 200 120 T 400 60 T 500 10 L 500 200 L 0 200 Z', total: '₹8,42,500' },
          users: { students: 'M 0 180 Q 100 140 200 80 T 400 30 T 500 10', staff: 'M 0 195 Q 100 185 200 165 T 400 135 T 500 110' },
          traffic: { views: 'M 0 170 Q 80 130 200 90 T 380 50 T 500 15', visitors: 'M 0 190 Q 80 160 200 130 T 380 90 T 500 50' },
          sales: [120, 240, 480, 850],
          leads: 'M 0 185 Q 90 155 180 115 T 360 65 T 500 15',
          growth: { current: 'M 0 185 Q 100 135 250 75 T 500 10', previous: 'M 0 195 Q 100 175 250 145 T 500 95' }
        };
      case 'ytd':
      default:
        return {
          revenue: { 
            labels: dbData?.revenue?.labels || ['Q1', 'Q2', 'Q3', 'Q4'], 
            points: dbData?.revenue?.points || 'M 0 170 Q 70 140 120 120 T 240 70 T 360 90 T 500 30', 
            fill: dbData?.revenue?.fill || 'M 0 170 Q 70 140 120 120 T 240 70 T 360 90 T 500 30 L 500 200 L 0 200 Z', 
            total: dbData?.revenue?.total || '₹1,48,990' 
          },
          users: { 
            students: dbData?.users?.students || 'M 0 170 Q 100 140 200 110 T 400 80 T 500 40', 
            staff: dbData?.users?.staff || 'M 0 195 Q 100 180 200 175 T 400 150 T 500 130' 
          },
          traffic: { 
            views: dbData?.traffic?.views || 'M 0 150 Q 80 120 200 130 T 380 80 T 500 55', 
            visitors: dbData?.traffic?.visitors || 'M 0 175 Q 80 150 200 155 T 380 115 T 500 90' 
          },
          sales: dbData?.sales || [50, 95, 140, 185],
          leads: dbData?.leads || 'M 0 165 Q 90 135 180 140 T 360 100 T 500 45',
          growth: { 
            current: dbData?.growth?.current || 'M 0 170 Q 100 130 250 90 T 500 30', 
            previous: dbData?.growth?.previous || 'M 0 190 Q 100 160 250 140 T 500 110' 
          }
        };
    }
  };

  const data = getChartData();



  // ──────────────────────────────────────────
  // EXPORT UTILITIES (CSV & PDF)
  // ──────────────────────────────────────────
  const handleExportCSV = () => {
    const csvContent = 
      "Category,Metric,Value,Period\n" +
      `Revenue,Total Revenue,${data.revenue.total},${dateRange}\n` +
      `Users,Students Growth Rate,High,${dateRange}\n` +
      `Users,Staff Members,Stable,${dateRange}\n` +
      `Traffic,Page Views,Peak Q3,${dateRange}\n` +
      `Traffic,Unique Visitors,Growth +19%,${dateRange}\n` +
      `CRM,Captured Leads,Scale UP,${dateRange}\n` +
      "Projects,Completed Projects,72%,All time\n" +
      "Services,AI Automation Sales,420 orders,All time\n" +
      "Services,Meta Ads Setup,280 orders,All time\n" +
      "Top Customer,IIT Academy Pune,₹39998,YTD\n" +
      "Top Customer,Chate Classes Group,₹19998,YTD";

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `analytics_report_${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className={styles.analyticsContainer}>
      
      {/* Header and filters Row */}
      <div className={styles.analyticsHeader}>
        <div className={styles.analyticsControls}>
          <select 
            value={dateRange}
            onChange={e => setDateRange(e.target.value as any)}
            className={styles.crmFilterSelect}
            style={{ width: '180px' }}
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="ytd">Year to Date (YTD)</option>
            <option value="all">All Time</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={handleExportCSV} className={styles.exportBtn}>
            <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
          <button onClick={handleExportPDF} className={styles.exportBtn} style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', border: 'none' }}>
            <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Export PDF / Print
          </button>
        </div>
      </div>

      {/* 9 Charts Grid */}
      <div className={styles.analyticsGrid}>
        
        {/* 1. Revenue Chart */}
        <div className={`${styles.analyticsChartCard} glass-card`}>
          <div className={styles.analyticsChartHeader}>
            <div className={styles.chartTitleSubtitle}>
              <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>1. Total Revenue</span>
              <span className={styles.chartMetaText}>Gateway receipts (INR)</span>
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399', fontFamily: 'Outfit' }}>{data.revenue.total}</span>
          </div>
          <div className={styles.svgWrapper}>
            <svg viewBox="0 0 500 200" style={{ width: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="revenue-glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g style={{ stroke: 'rgba(255,255,255,0.03)', strokeWidth: 1 }}>
                <line x1="0" y1="50" x2="500" y2="50" />
                <line x1="0" y1="100" x2="500" y2="100" />
                <line x1="0" y1="150" x2="500" y2="150" />
              </g>
              <path d={data.revenue.points} fill="none" stroke="#10b981" strokeWidth={3.5} />
              <path d={data.revenue.fill} fill="url(#revenue-glow)" />
            </svg>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.85rem' }}>
            {data.revenue.labels.map((lbl: string, idx: number) => <span key={idx}>{lbl}</span>)}
          </div>
        </div>

        {/* 2. Users Chart */}
        <div className={`${styles.analyticsChartCard} glass-card`}>
          <div className={styles.analyticsChartHeader}>
            <div className={styles.chartTitleSubtitle}>
              <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>2. Users Ingestion</span>
              <span className={styles.chartMetaText}>Students (indigo) vs Employees (cyan)</span>
            </div>
          </div>
          <div className={styles.svgWrapper}>
            <svg viewBox="0 0 500 200" style={{ width: '100%', overflow: 'visible' }}>
              <g style={{ stroke: 'rgba(255,255,255,0.03)', strokeWidth: 1 }}>
                <line x1="0" y1="50" x2="500" y2="50" />
                <line x1="0" y1="100" x2="500" y2="100" />
                <line x1="0" y1="150" x2="500" y2="150" />
              </g>
              <path d={data.users.students} fill="none" stroke="#6366f1" strokeWidth={3} />
              <path d={data.users.staff} fill="none" stroke="#06b6d4" strokeWidth={2} strokeDasharray="4,4" />
            </svg>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.85rem' }}>
            <span>Start</span>
            <span>Midpoint</span>
            <span>End Range</span>
          </div>
        </div>

        {/* 3. Traffic Chart */}
        <div className={`${styles.analyticsChartCard} glass-card`}>
          <div className={styles.analyticsChartHeader}>
            <div className={styles.chartTitleSubtitle}>
              <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>3. Website Traffic</span>
              <span className={styles.chartMetaText}>Page Views (purple) vs Uniques (amber)</span>
            </div>
          </div>
          <div className={styles.svgWrapper}>
            <svg viewBox="0 0 500 200" style={{ width: '100%', overflow: 'visible' }}>
              <g style={{ stroke: 'rgba(255,255,255,0.03)', strokeWidth: 1 }}>
                <line x1="0" y1="50" x2="500" y2="50" />
                <line x1="0" y1="100" x2="500" y2="100" />
                <line x1="0" y1="150" x2="500" y2="150" />
              </g>
              <path d={data.traffic.views} fill="none" stroke="#a78bfa" strokeWidth={3} />
              <path d={data.traffic.visitors} fill="none" stroke="#fbbf24" strokeWidth={2} />
            </svg>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.85rem' }}>
            <span>Beginning</span>
            <span>Range Mid</span>
            <span>Range End</span>
          </div>
        </div>

        {/* 4. Sales Conversions Chart */}
        <div className={`${styles.analyticsChartCard} glass-card`}>
          <div className={styles.analyticsChartHeader}>
            <div className={styles.chartTitleSubtitle}>
              <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>4. Sales Conversions</span>
              <span className={styles.chartMetaText}>B2B subscriptions closed</span>
            </div>
          </div>
          <div className={styles.svgWrapper} style={{ display: 'flex', alignItems: 'flex-end', height: '140px', gap: '1rem', paddingBottom: '0.5rem' }}>
            {data.sales.map((val: number, idx: number) => (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '100%', height: `${val}px`, background: 'linear-gradient(to top, var(--primary), var(--secondary))', borderRadius: '4px' }} />
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>P{idx+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Leads Chart */}
        <div className={`${styles.analyticsChartCard} glass-card`}>
          <div className={styles.analyticsChartHeader}>
            <div className={styles.chartTitleSubtitle}>
              <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>5. Counselor Leads</span>
              <span className={styles.chartMetaText}>College predictor capture log rate</span>
            </div>
          </div>
          <div className={styles.svgWrapper}>
            <svg viewBox="0 0 500 200" style={{ width: '100%', overflow: 'visible' }}>
              <path d={data.leads} fill="none" stroke="#ec4899" strokeWidth={3} />
              <g style={{ stroke: 'rgba(255,255,255,0.03)', strokeWidth: 1 }}>
                <line x1="0" y1="100" x2="500" y2="100" />
              </g>
            </svg>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.85rem' }}>
            <span>W1</span>
            <span>W2</span>
            <span>W3</span>
            <span>W4</span>
          </div>
        </div>

        {/* 6. Projects Completion Chart (Gauge widget) */}
        <div className={`${styles.analyticsChartCard} glass-card`}>
          <div className={styles.analyticsChartHeader}>
            <div className={styles.chartTitleSubtitle}>
              <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>6. Developer Projects</span>
              <span className={styles.chartMetaText}>Rounds completions stats</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                <span>Chatbot Widgets Integrations</span>
                <span style={{ fontWeight: 'bold' }}>92%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                <div style={{ height: '100%', width: '92%', background: '#34d399', borderRadius: '10px' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>MHT-CET Merit List Ingestion</span>
                <span style={{ fontWeight: 'bold' }}>72%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                <div style={{ height: '100%', width: '72%', background: 'var(--primary)', borderRadius: '10px' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>WhatsApp Notification Engines</span>
                <span style={{ fontWeight: 'bold' }}>35%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                <div style={{ height: '100%', width: '35%', background: '#fbbf24', borderRadius: '10px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* 7. Services Popularity (Horizontal Bar Chart) */}
        <div className={`${styles.analyticsChartCard} glass-card`}>
          <div className={styles.analyticsChartHeader}>
            <div className={styles.chartTitleSubtitle}>
              <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>7. Services Popularity</span>
              <span className={styles.chartMetaText}>Subscription signups by tech category</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ width: '80px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>AI Automation</span>
              <div style={{ flexGrow: 1, height: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                <div style={{ height: '100%', width: '85%', background: '#8b5cf6', borderRadius: '4px' }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ width: '80px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Meta Ads</span>
              <div style={{ flexGrow: 1, height: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                <div style={{ height: '100%', width: '60%', background: '#3b82f6', borderRadius: '4px' }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ width: '80px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Web Dev</span>
              <div style={{ flexGrow: 1, height: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                <div style={{ height: '100%', width: '45%', background: '#10b981', borderRadius: '4px' }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ width: '80px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Reel Editing</span>
              <div style={{ flexGrow: 1, height: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                <div style={{ height: '100%', width: '30%', background: '#ec4899', borderRadius: '4px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* 8. Top Customers (Donut Chart Widget) */}
        <div className={`${styles.analyticsChartCard} glass-card`}>
          <div className={styles.analyticsChartHeader}>
            <div className={styles.chartTitleSubtitle}>
              <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>8. Top Customer Share</span>
              <span className={styles.chartMetaText}>Billing contribution by institutes</span>
            </div>
          </div>
          <div className={styles.donutWrapper}>
            <svg width="140" height="140" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
              {/* IIT Academy Pune (60%) */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#7c3aed" strokeWidth="4.5" strokeDasharray="60 40" strokeDashoffset="25" />
              {/* Chate Classes Group (30%) */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#06b6d4" strokeWidth="4.5" strokeDasharray="30 70" strokeDashoffset="85" />
            </svg>
            <div className={styles.donutCenterLabel}>
              <div className={styles.donutCenterValue}>90%</div>
              <div className={styles.donutCenterText}>Top 2 Share</div>
            </div>
          </div>
        </div>

        {/* 9. Monthly Growth (Comparing Curves) */}
        <div className={`${styles.analyticsChartCard} glass-card`}>
          <div className={styles.analyticsChartHeader}>
            <div className={styles.chartTitleSubtitle}>
              <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>9. Monthly Growth Curves</span>
              <span className={styles.chartMetaText}>Current year (solid purple) vs Previous year (dotted)</span>
            </div>
          </div>
          <div className={styles.svgWrapper}>
            <svg viewBox="0 0 500 200" style={{ width: '100%', overflow: 'visible' }}>
              <path d={data.growth.current} fill="none" stroke="#8b5cf6" strokeWidth={3} />
              <path d={data.growth.previous} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={1.5} strokeDasharray="4,4" />
            </svg>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.85rem' }}>
            <span>Q1</span>
            <span>Q2</span>
            <span>Q3</span>
            <span>Q4</span>
          </div>
        </div>

      </div>

    </div>
  );
}

// 3. Users Module
function UsersTab({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (q: string) => void }) {
  const USERS = [
    { id: 'usr-1', name: 'Abhi Narute', email: 'abhi@engineeringpath.ai', role: 'Admin', status: 'Active' },
    { id: 'usr-2', name: 'Shubham Narute', email: 'shubham@engineeringpath.ai', role: 'Employee', status: 'Active' },
    { id: 'usr-3', name: 'Snehal Patil', email: 'snehal@engineeringpath.ai', role: 'Employee', status: 'Active' },
    { id: 'usr-4', name: 'Swapnil Shinde', email: 'swapnil@engineeringpath.ai', role: 'Employee', status: 'Active' },
    { id: 'usr-5', name: 'IIT Academy Pune', email: 'director@iitpune.com', role: 'Client', status: 'Active' },
    { id: 'usr-6', name: 'Amit Kulkarni', email: 'amit99@gmail.com', role: 'Student', status: 'Active' },
    { id: 'usr-7', name: 'Priya Joshi', email: 'priyaj@outlook.com', role: 'Student', status: 'Pending' }
  ];

  const filtered = USERS.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${styles.tableCard} glass-card`}>
      <div className={styles.tableHeaderRow}>
        <h3 className={styles.tableTitle}>User Directories</h3>
        <input 
          type="text" 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Filter by name, email or role..."
          className={styles.tableSearch}
        />
      </div>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{u.id}</td>
              <td style={{ fontWeight: 700 }}>{u.name}</td>
              <td>{u.email}</td>
              <td><span style={{ fontSize: '0.75rem', fontWeight: 600, background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{u.role}</span></td>
              <td>
                <span className={`${styles.statusPill} ${u.status === 'Active' ? styles.statusActive : styles.statusPending}`}>
                  {u.status}
                </span>
              </td>
              <td>
                <button className={styles.actionBtn}>Edit User</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 4. Clients Module
interface ClientItem {
  id: string;
  company: string;
  contact: string;
  plan: string;
  status: string;
}

function ClientsTab() {
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/clients`);
      const data = await res.json();
      if (res.ok && data.clients) {
        setClients(data.clients);
      }
    } catch (e) {
      console.warn("FastAPI offline, fallback to local B2B Client directories");
      setClients([
        { id: 'cli-1', company: 'IIT Academy Pune', contact: 'director@iitpune.com', plan: 'Scale Plus Plan', status: 'Active' },
        { id: 'cli-2', company: 'Chate Classes Group', contact: 'management@chate.edu', plan: 'Growth Tier Plan', status: 'Active' },
        { id: 'cli-3', company: 'Pinnacle Mentors', contact: 'pinnaclepune@gmail.com', plan: 'Starter Setup Plan', status: 'Pending' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  if (loading) {
    return <div style={{ color: 'var(--text-muted)', padding: '2rem', fontFamily: 'Outfit' }}>Loading B2B Clients...</div>;
  }

  return (
    <div className={`${styles.tableCard} glass-card`}>
      <div className={styles.tableHeaderRow}>
        <h3 className={styles.tableTitle}>B2B Client Institutes</h3>
      </div>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Contact Email</th>
            <th>Active Plan</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id}>
              <td style={{ fontWeight: 700 }}>{c.company}</td>
              <td>{c.contact}</td>
              <td><span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{c.plan}</span></td>
              <td>
                <span className={`${styles.statusPill} ${c.status === 'Active' ? styles.statusActive : styles.statusPending}`}>
                  {c.status}
                </span>
              </td>
              <td>
                <button className={styles.actionBtn} onClick={() => alert(`Managing billing logs for ${c.company}`)}>Manage billing</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// 5. Employees Module
function EmployeesTab() {
  const EMPLOYEES = [
    { id: 'emp-1', name: 'Shubham Narute', email: 'shubham@engineeringpath.ai', designation: 'Chief AI Architect', location: 'Pune' },
    { id: 'emp-2', name: 'Snehal Patil', email: 'snehal@engineeringpath.ai', designation: 'Senior Software Engineer', location: 'Remote' },
    { id: 'emp-3', name: 'Swapnil Shinde', email: 'swapnil@engineeringpath.ai', designation: 'Growth Director', location: 'Pune' }
  ];

  return (
    <div className={`${styles.tableCard} glass-card`}>
      <div className={styles.tableHeaderRow}>
        <h3 className={styles.tableTitle}>Staff Directory</h3>
      </div>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {EMPLOYEES.map((e) => (
            <tr key={e.id}>
              <td style={{ fontWeight: 700 }}>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.designation}</td>
              <td>{e.location}</td>
              <td>
                <button className={styles.actionBtn}>Check Activity</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 6. Careers Module
function CareersTab() {
  const CAREERS = [
    { id: 'car-1', title: 'AI/ML Intern', type: 'Internship', location: 'Remote', status: 'Active' },
    { id: 'car-2', title: 'Frontend Developer', type: 'Full-time', location: 'Hybrid', status: 'Active' },
    { id: 'car-3', title: 'Backend Developer', type: 'Full-time', location: 'Hybrid', status: 'Active' },
    { id: 'car-4', title: 'React Developer', type: 'Full-time', location: 'Remote', status: 'Active' },
    { id: 'car-5', title: 'Video Editor', type: 'Internship', location: 'Remote', status: 'Closed' }
  ];

  return (
    <div className={`${styles.tableCard} glass-card`}>
      <div className={styles.tableHeaderRow}>
        <h3 className={styles.tableTitle}>Manage Careers Openings</h3>
        <button className={styles.actionBtn} style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', border: 'none' }}>+ Add Opening</button>
      </div>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Type</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {CAREERS.map((job) => (
            <tr key={job.id}>
              <td style={{ fontWeight: 700 }}>{job.title}</td>
              <td>{job.type}</td>
              <td>{job.location}</td>
              <td>
                <span className={`${styles.statusPill} ${job.status === 'Active' ? styles.statusActive : styles.statusClosed}`}>
                  {job.status}
                </span>
              </td>
              <td>
                <button className={styles.actionBtn}>Toggle status</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 7. Applications Module
interface CandidateApp {
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

function ApplicationsTab() {
  const [apps, setApps] = useState<CandidateApp[]>([
    {
      id: "app_1",
      name: "Abhi Patil",
      email: "abhi@gmail.com",
      phone: "+91 9998887770",
      role: "ai-ml-intern",
      college: "COEP",
      degree: "B.Tech CSE",
      year: "2026",
      status: "Pending",
      skills: ["Python", "PyTorch", "scikit-learn"],
      experience: "Built linear regression solvers for MHT-CET scores.",
      coverLetter: "Excited to join the engineering path squad.",
      resume_name: "abhi_coep_resume.pdf",
      portfolio: "https://abhipatil.dev",
      github: "https://github.com/abhipatil",
      linkedin: "https://linkedin.in/abhipatil",
      interview_date: null,
      interview_link: null,
      emails_sent: []
    },
    {
      id: "app_2",
      name: "Rajesh Shinde",
      email: "rajesh@outlook.com",
      phone: "+91 9998887771",
      role: "frontend-dev",
      college: "VJTI",
      degree: "B.Tech IT",
      year: "2025",
      status: "Interviewing",
      skills: ["React", "CSS Modules", "Next.js"],
      experience: "Designed landing pages for coaching groups in Mumbai.",
      coverLetter: "Fascinated by high fidelity web styling details.",
      resume_name: "rajesh_vjti_dev.docx",
      portfolio: "",
      github: "https://github.com/rajeshshinde",
      linkedin: "https://linkedin.in/rajesh",
      interview_date: "2026-07-22T14:30",
      interview_link: "https://meet.google.com/abc-def-ghi",
      emails_sent: [
        {"subject": "Interview Invitation", "body": "Your interview is scheduled for July 22nd at 2:30 PM."}
      ]
    },
    {
      id: "app_3",
      name: "Nisha Kulkarni",
      email: "nisha@gmail.com",
      phone: "+91 9998887772",
      role: "react-dev",
      college: "VIT Pune",
      degree: "B.Tech CSE",
      year: "2025",
      status: "Hired",
      skills: ["TypeScript", "Redux", "Vanilla CSS"],
      experience: "React developer intern at an edtech startup.",
      coverLetter: "Want to optimize the predictive CET rank predictor tool.",
      resume_name: "nisha_vit_resume.pdf",
      portfolio: "",
      github: "https://github.com/nishak",
      linkedin: "https://linkedin.in/nisha",
      interview_date: null,
      interview_link: null,
      emails_sent: []
    }
  ]);

  // Loading indicator for API calls
  const [loading, setLoading] = useState(false);

  // Dialog Modals State
  const [selectedApp, setSelectedApp] = useState<CandidateApp | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);

  // Form states
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [meetLink, setMeetLink] = useState('https://meet.google.com/abc-defg-hij');

  const handleDownloadResume = (app: CandidateApp) => {
    const resumeContent = `==================================================
RESUME / CV: ${app.resume_name}
==================================================
Personal Information:
- Full Name: ${app.name}
- Email: ${app.email}
- Phone: ${app.phone}

Education:
- College: ${app.college}
- Degree: ${app.degree}
- Graduation Year: ${app.year}

Professional Profile:
- Target Role: ${app.role}
- Skills: ${app.skills ? app.skills.join(', ') : 'Not Specified'}

Work Experience & Project details:
${app.experience || 'Not Specified'}

Cover Letter:
${app.coverLetter || 'Not Specified'}

Online Profiles:
- GitHub: ${app.github || 'Not Provided'}
- LinkedIn: ${app.linkedin || 'Not Provided'}
- Portfolio: ${app.portfolio || 'Not Provided'}

--------------------------------------------------
Recruiter Portal Auto-Export System - EngineeringPath AI
Generated at: ${new Date().toLocaleString()}
`;
    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${app.name.replace(/\s+/g, '_')}_resume.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchApps = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/careers/applications`);
      const data = await res.json();
      if (res.ok && data.applications) {
        setApps(data.applications);
      }
    } catch (e) {
      console.warn("FastAPI offline, using local memory values");
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleUpdateStatus = async (email: string, newStatus: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/careers/update-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, status: newStatus })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed status update');
      
      alert(data.message || `Status changed to ${newStatus}.`);
      setApps(apps.map(a => a.email === email ? { ...a, status: newStatus } : a));
    } catch (e: any) {
      // offline fallback
      setApps(apps.map(a => a.email === email ? { ...a, status: newStatus } : a));
      alert(`Local memory fallback: Status updated to ${newStatus}`);
    }
  };

  const handleScheduleInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !interviewTime || !meetLink) return;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/careers/schedule-interview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: selectedApp.email,
          datetime: interviewTime,
          meet_link: meetLink
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Schedule interview failed');

      alert('Interview scheduled and notification logged.');
      setApps(apps.map(a => a.email === selectedApp.email ? { 
        ...a, 
        status: 'Interviewing',
        interview_date: interviewTime,
        interview_link: meetLink,
        emails_sent: [...a.emails_sent, { subject: 'Interview Scheduled Invitation', body: `Scheduled for ${interviewTime} via meet link ${meetLink}` }]
      } : a));
      setShowInterviewModal(false);
    } catch (err: any) {
      // fallback
      setApps(apps.map(a => a.email === selectedApp.email ? { 
        ...a, 
        status: 'Interviewing',
        interview_date: interviewTime,
        interview_link: meetLink,
        emails_sent: [...a.emails_sent, { subject: 'Interview Scheduled Invitation', body: `Scheduled for ${interviewTime} via meet link ${meetLink}` }]
      } : a));
      setShowInterviewModal(false);
      alert('Local memory fallback: Interview Scheduled.');
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !emailSubject || !emailBody) return;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/careers/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: selectedApp.email,
          subject: emailSubject,
          body: emailBody
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Email dispatch failed');

      alert('Email sent successfully.');
      setApps(apps.map(a => a.email === selectedApp.email ? {
        ...a,
        emails_sent: [...a.emails_sent, { subject: emailSubject, body: emailBody }]
      } : a));
      setShowEmailModal(false);
      setEmailSubject('');
      setEmailBody('');
    } catch (err: any) {
      // fallback
      setApps(apps.map(a => a.email === selectedApp.email ? {
        ...a,
        emails_sent: [...a.emails_sent, { subject: emailSubject, body: emailBody }]
      } : a));
      setShowEmailModal(false);
      setEmailSubject('');
      setEmailBody('');
      alert('Local memory fallback: Email dispatched.');
    }
  };

  return (
    <div className={`${styles.tableCard} glass-card`}>
      <div className={styles.tableHeaderRow}>
        <h3 className={styles.tableTitle}>Candidate Job Applications</h3>
      </div>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>Applicant Details</th>
            <th>Target Position</th>
            <th>Interview Details</th>
            <th>History Logs</th>
            <th>Status Pill</th>
            <th>Resume</th>
            <th>Recruit Action</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((app) => (
            <tr key={app.id}>
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <span style={{ fontWeight: 700, color: '#fff' }}>{app.name}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Email: {app.email} | Phone: {app.phone}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    College: {app.college} ({app.year})
                  </span>
                </div>
              </td>
              <td>{app.role}</td>
              <td style={{ fontSize: '0.8rem' }}>
                {app.interview_date ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ color: '#fbbf24', fontWeight: 600 }}>⏰ {app.interview_date}</span>
                    <a href={app.interview_link || '#'} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                      Join call
                    </a>
                  </div>
                ) : (
                  <span style={{ color: 'var(--text-muted)' }}>Not Scheduled</span>
                )}
              </td>
              <td>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  ✉ {app.emails_sent.length} emails logged
                </span>
              </td>
              <td>
                <span className={`${styles.statusPill} ${
                  app.status === 'Hired' ? styles.statusPaid : 
                  app.status === 'Shortlisted' ? styles.statusPresent :
                  app.status === 'Interviewing' ? styles.statusLate :
                  app.status === 'Rejected' ? styles.statusPending : styles.statusPending
                }`}
                style={{ 
                  background: app.status === 'Rejected' ? 'rgba(239, 68, 68, 0.1)' : undefined, 
                  color: app.status === 'Rejected' ? '#fca5a5' : undefined, 
                  borderColor: app.status === 'Rejected' ? 'rgba(239, 68, 68, 0.2)' : undefined 
                }}>
                  {app.status}
                </span>
              </td>
              <td>
                <button className={styles.dlBtn} onClick={() => handleDownloadResume(app)}>
                  Download CV
                </button>
              </td>
              <td>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  <button 
                    onClick={() => handleUpdateStatus(app.email, 'Shortlisted')}
                    className={styles.actionBtn}
                    style={{ color: '#34d399', background: 'rgba(52,211,153,0.06)' }}
                  >
                    Shortlist
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(app.email, 'Rejected')}
                    className={styles.actionBtn}
                    style={{ color: '#f87171', background: 'rgba(248,113,113,0.06)' }}
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedApp(app);
                      setInterviewTime(app.interview_date || '');
                      setMeetLink(app.interview_link || 'https://meet.google.com/abc-defg-hij');
                      setShowInterviewModal(true);
                    }}
                    className={styles.actionBtn}
                  >
                    Calendar Sync
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedApp(app);
                      setEmailSubject('EngineeringPath AI Careers Update');
                      setEmailBody(`Hi ${app.name},\n\nWe have reviewed your application for the ${app.role} role...`);
                      setShowEmailModal(true);
                    }}
                    className={styles.actionBtn}
                  >
                    Send Email
                  </button>
                  <select
                    value={app.status}
                    onChange={(e) => handleUpdateStatus(app.email, e.target.value)}
                    className={styles.statusSelect}
                    title="Change Status"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Withdrawn">Withdrawn</option>
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ──────────────────────────────────────────
          MODAL INTERFACES
      ────────────────────────────────────────── */}

      {/* 1. Schedule Interview Modal */}
      {showInterviewModal && selectedApp && (
        <div className={styles.crmModalOverlay}>
          <div className={`${styles.crmModalContent} glass-card`}>
            <h3 className={styles.modalTitle}>Schedule Interview - {selectedApp.name}</h3>
            <form onSubmit={handleScheduleInterview}>
              <div className={styles.crmFormGroup}>
                <label>Interview Date & Time *</label>
                <input 
                  type="datetime-local" 
                  required 
                  value={interviewTime}
                  onChange={e => setInterviewTime(e.target.value)}
                />
              </div>
              <div className={styles.crmFormGroup}>
                <label>Google Meet Link *</label>
                <input 
                  type="url" 
                  required 
                  value={meetLink}
                  onChange={e => setMeetLink(e.target.value)}
                />
              </div>

              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowInterviewModal(false)} className={styles.crmModalCancelBtn}>
                  Cancel
                </button>
                <button type="submit" className={styles.addLeadBtn}>
                  Schedule Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Send Email Modal */}
      {showEmailModal && selectedApp && (
        <div className={styles.crmModalOverlay}>
          <div className={`${styles.crmModalContent} glass-card`}>
            <h3 className={styles.modalTitle}>Send Email Invite - {selectedApp.name}</h3>
            <form onSubmit={handleSendEmail}>
              <div className={styles.crmFormGroup}>
                <label>Email Subject *</label>
                <input 
                  type="text" 
                  required 
                  value={emailSubject}
                  onChange={e => setEmailSubject(e.target.value)}
                />
              </div>
              <div className={styles.crmFormGroup}>
                <label>Email Body *</label>
                <textarea 
                  required 
                  value={emailBody}
                  onChange={e => setEmailBody(e.target.value)}
                  style={{ height: '140px' }}
                />
              </div>

              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowEmailModal(false)} className={styles.crmModalCancelBtn}>
                  Cancel
                </button>
                <button type="submit" className={styles.addLeadBtn}>
                  Send Email Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// 8. Services Module
function ServicesTab() {
  const SERVICES = [
    { title: 'AI Automation', type: 'Core Tech', price: '₹14,999/mo', status: 'Active' },
    { title: 'Meta Ads Management', type: 'Digital Marketing', price: '₹9,999/mo', status: 'Active' },
    { title: 'Website Development', type: 'Core Tech', price: '₹24,999/mo', status: 'Active' },
    { title: 'Reel Editing Services', type: 'Video Editing', price: '₹8,999/mo', status: 'Active' }
  ];

  return (
    <div className={`${styles.tableCard} glass-card`}>
      <div className={styles.tableHeaderRow}>
        <h3 className={styles.tableTitle}>Agency Services Catalog</h3>
      </div>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Type</th>
            <th>Base Cost</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {SERVICES.map((s, idx) => (
            <tr key={idx}>
              <td style={{ fontWeight: 700 }}>{s.title}</td>
              <td>{s.type}</td>
              <td>{s.price}</td>
              <td><span className={`${styles.statusPill} ${styles.statusActive}`}>{s.status}</span></td>
              <td>
                <button className={styles.actionBtn}>Modify scope</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 9. Pricing Module
function PricingTab() {
  const PLANS = [
    { name: 'Starter Package', price: '₹4,999/mo', audience: 'Coaching center local marketing', status: 'Active' },
    { name: 'Growth Package', price: '₹9,999/mo', audience: 'Multi-branch regional classes', status: 'Active' },
    { name: 'Scale Package', price: '₹19,999/mo', audience: 'Corporate Maharashtra institutes', status: 'Active' }
  ];

  return (
    <div className={`${styles.tableCard} glass-card`}>
      <div className={styles.tableHeaderRow}>
        <h3 className={styles.tableTitle}>Subscription Tiers</h3>
      </div>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>Plan Name</th>
            <th>Price Value</th>
            <th>Target Audience</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {PLANS.map((p, idx) => (
            <tr key={idx}>
              <td style={{ fontWeight: 700 }}>{p.name}</td>
              <td><span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{p.price}</span></td>
              <td>{p.audience}</td>
              <td><span className={`${styles.statusPill} ${styles.statusActive}`}>{p.status}</span></td>
              <td>
                <button className={styles.actionBtn}>Configure Tiers</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 10. Leads Module
function LeadsTab() {
  const LEADS = [
    { name: 'Ritesh Patil', email: 'ritesh@gmail.com', course: 'MHT-CET Math counseling', score: '98.5%', date: 'Jul 15, 2026' },
    { name: 'Neha Joshi', email: 'neha99@outlook.com', course: 'Meta Ads Inquiry', score: '93.2%', date: 'Jul 16, 2026' },
    { name: 'Sanket Kadam', email: 'sanketk@gmail.com', course: 'Website Development', score: 'N/A', date: 'Jul 17, 2026' }
  ];

  return (
    <div className={`${styles.tableCard} glass-card`}>
      <div className={styles.tableHeaderRow}>
        <h3 className={styles.tableTitle}>Captured Admissions & Sales Leads</h3>
      </div>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>Lead Name</th>
            <th>Email</th>
            <th>Course / Service Interest</th>
            <th>MHT-CET Percentile</th>
            <th>Date Captured</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {LEADS.map((l, idx) => (
            <tr key={idx}>
              <td style={{ fontWeight: 700 }}>{l.name}</td>
              <td>{l.email}</td>
              <td>{l.course}</td>
              <td>{l.score}</td>
              <td>{l.date}</td>
              <td>
                <button className={styles.actionBtn}>Inquire Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 11. Blog Module
interface AdminBlogPost {
  slug: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  excerpt: string;
  author: string;
  status: string;
  views: number;
  featured_image: string;
  seo_title: string;
  seo_description: string;
  date: string;
}

function BlogTab() {
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [previewActive, setPreviewActive] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('CAP Admissions');
  const [tags, setTags] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('Shubham Narute');
  const [status, setStatus] = useState('Published');
  const [featuredImage, setFeaturedImage] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [selectedSlug, setSelectedSlug] = useState('');

  const fetchPosts = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/blogs`);
      const data = await res.json();
      if (res.ok && data.blogs) {
        setPosts(data.blogs);
      }
    } catch (e) {
      console.warn("FastAPI offline, using static mock blogs");
      setPosts([
        {
          slug: "mht-cet-choice-filling-guide-cap-rounds",
          title: "MHT-CET Choice Filling: The Ultimate Guide to CAP Rounds",
          content: "# MHT-CET Choice Filling: The Ultimate Guide to CAP Rounds\n\nLearn the exact strategy to sequence your option forms, optimize safe vs dream choices, and avoid common allocation pitfalls.",
          category: "CAP Admissions",
          tags: ["MHT-CET", "CAP Rounds", "Admissions"],
          excerpt: "Learn the exact strategy to sequence your option forms, optimize safe vs dream choices, and avoid common allocation pitfalls.",
          author: "Shubham Narute",
          status: "Published",
          views: 2482,
          featured_image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60",
          seo_title: "MHT-CET Choice Filling Guide 2026 | CAP Rounds Strategy",
          seo_description: "Master the option form sequencing for MHT-CET 2026. Step-by-step strategies for VJTI, COEP, and SPIT admission allocation.",
          date: "July 15, 2026"
        },
        {
          slug: "top-5-engineering-branches-maharashtra",
          title: "Top 5 Engineering Branches in Maharashtra: Placement & Stats",
          content: "# Top 5 Engineering Branches in Maharashtra: Placement & Stats\n\nAn objective review comparing Computer Science, AI/ML, E&TC, and core branches across COEP, VJTI, and SPIT.",
          category: "Career Guide",
          tags: ["Engineering", "Placements", "COEP"],
          excerpt: "An objective review comparing Computer Science, AI/ML, E&TC, and core branches across COEP, VJTI, and SPIT.",
          author: "Snehal Patil",
          status: "Published",
          views: 839,
          featured_image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60",
          seo_title: "Top Maharashtra Engineering Branches: Fees & Placements",
          seo_description: "Discover the best engineering fields in Maharashtra. Placement comparisons, salary trends, and top college insights.",
          date: "July 12, 2026"
        }
      ]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (p: AdminBlogPost) => {
    setEditorMode('edit');
    setSelectedSlug(p.slug);
    setTitle(p.title);
    setContent(p.content);
    setCategory(p.category);
    setTags(p.tags ? p.tags.join(', ') : '');
    setExcerpt(p.excerpt);
    setAuthor(p.author);
    setStatus(p.status);
    setFeaturedImage(p.featured_image || '');
    setSeoTitle(p.seo_title || '');
    setSeoDescription(p.seo_description || '');
    setIsEditing(true);
    setPreviewActive(false);
  };

  const handleNew = () => {
    setEditorMode('create');
    setSelectedSlug('');
    setTitle('');
    setContent('');
    setCategory('CAP Admissions');
    setTags('');
    setExcerpt('');
    setAuthor('Admin Recruiter');
    setStatus('Draft');
    setFeaturedImage('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60');
    setSeoTitle('');
    setSeoDescription('');
    setIsEditing(true);
    setPreviewActive(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Title and Content are required fields.');
      return;
    }

    const payload = {
      title,
      content,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      excerpt,
      author,
      status,
      featured_image: featuredImage,
      seo_title: seoTitle || undefined,
      seo_description: seoDescription || undefined
    };

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const url = editorMode === 'create' 
        ? `${API_URL}/api/blogs` 
        : `${API_URL}/api/blogs/${selectedSlug}`;
      const method = editorMode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Save post failed');

      alert(data.message || 'Saved successfully.');
      setIsEditing(false);
      fetchPosts();
    } catch (err: any) {
      // Local fallback
      const generatedSlug = selectedSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const mockPost: AdminBlogPost = {
        slug: generatedSlug,
        title,
        content,
        category,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        excerpt,
        author,
        status,
        views: editorMode === 'create' ? 0 : posts.find(p => p.slug === selectedSlug)?.views || 0,
        featured_image: featuredImage,
        seo_title: seoTitle || title,
        seo_description: seoDescription || excerpt,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
      };

      if (editorMode === 'create') {
        setPosts([...posts, mockPost]);
      } else {
        setPosts(posts.map(p => p.slug === selectedSlug ? mockPost : p));
      }
      setIsEditing(false);
      alert(`Local memory fallback: Blog saved.`);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/blogs/${slug}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Delete failed');
      alert('Post deleted successfully.');
      fetchPosts();
    } catch (e) {
      setPosts(posts.filter(p => p.slug !== slug));
      alert('Local memory fallback: Post deleted.');
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

  if (isEditing) {
    return (
      <div className={`${styles.tableCard} glass-card`} style={{ padding: '2rem' }}>
        <div className={styles.tableHeaderRow} style={{ marginBottom: '2rem' }}>
          <h3 className={styles.tableTitle}>{editorMode === 'create' ? 'Create New Post' : 'Edit Blog Post'}</h3>
          <button className={styles.actionBtn} onClick={() => setIsEditing(false)}>Back to List</button>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className={styles.crmFormRow}>
            <div className={styles.crmFormGroup}>
              <label>Article Title *</label>
              <input type="text" required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Choice Filling Guide..." />
            </div>
            <div className={styles.crmFormGroup}>
              <label>Author *</label>
              <input type="text" required value={author} onChange={e => setAuthor(e.target.value)} />
            </div>
          </div>

          <div className={styles.crmFormRow}>
            <div className={styles.crmFormGroup}>
              <label>Category *</label>
              <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="CAP Admissions">CAP Admissions</option>
                <option value="Career Guide">Career Guide</option>
                <option value="AI Roadmaps">AI Roadmaps</option>
                <option value="General">General</option>
              </select>
            </div>
            <div className={styles.crmFormGroup}>
              <label>Status *</label>
              <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <div className={styles.crmFormGroup}>
            <label>Tags (Comma separated) *</label>
            <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="e.g. MHT-CET, CAP, Pune" />
          </div>

          <div className={styles.crmFormGroup}>
            <label>Featured Image URL *</label>
            <input type="url" value={featuredImage} onChange={e => setFeaturedImage(e.target.value)} placeholder="https://unsplash.com/..." />
          </div>

          <div className={styles.crmFormGroup}>
            <label>Excerpt / Short Description *</label>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Brief summary of the article..." style={{ height: '80px' }} />
          </div>

          {/* Markdown Content Editor */}
          <div className={styles.crmFormGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ margin: 0 }}>Markdown Article Content *</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="button" className={`${styles.projSubNavItem} ${!previewActive ? styles.projSubNavActive : ''}`} onClick={() => setPreviewActive(false)} style={{ padding: '0.2rem 0.6rem' }}>Write</button>
                <button type="button" className={`${styles.projSubNavItem} ${previewActive ? styles.projSubNavActive : ''}`} onClick={() => setPreviewActive(true)} style={{ padding: '0.2rem 0.6rem' }}>Preview</button>
              </div>
            </div>

            {!previewActive ? (
              <textarea 
                value={content} 
                onChange={e => setContent(e.target.value)} 
                placeholder="Type your blog content using Markdown (# Headers, **bold**, - list items)..." 
                style={{ height: '300px', fontFamily: 'monospace', lineHeight: '1.5' }} 
              />
            ) : (
              <div 
                style={{ 
                  height: '300px', 
                  overflowY: 'auto', 
                  background: 'rgba(255,255,255,0.01)', 
                  border: '1px solid rgba(255,255,255,0.08)', 
                  borderRadius: '10px', 
                  padding: '1rem',
                  color: '#e2e8f0',
                  lineHeight: '1.6'
                }} 
                dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
              />
            )}
          </div>

          {/* SEO Block */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.25rem', marginTop: '1rem' }}>
            <h4 style={{ color: '#a5b4fc', fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🔍 SEO Meta Configuration</h4>
            <div className={styles.crmFormGroup} style={{ marginBottom: '1rem' }}>
              <label>Meta Title Tag</label>
              <input type="text" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} placeholder="Custom page title for search engines..." />
            </div>
            <div className={styles.crmFormGroup} style={{ marginBottom: 0 }}>
              <label>Meta Description</label>
              <textarea value={seoDescription} onChange={e => setSeoDescription(e.target.value)} placeholder="Compelling snippet for SERP results..." style={{ height: '60px' }} />
            </div>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.crmModalCancelBtn} onClick={() => setIsEditing(false)}>Cancel</button>
            <button type="submit" className={styles.createLeadBtn} style={{ padding: '0.6rem 2rem' }}>Save Post</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`${styles.tableCard} glass-card`}>
      <div className={styles.tableHeaderRow}>
        <h3 className={styles.tableTitle}>Content Calendar & Blogs</h3>
        <button className={styles.actionBtn} onClick={handleNew} style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', border: 'none' }}>+ Write Post</button>
      </div>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>Article Title</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Total Views</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p, idx) => (
            <tr key={p.slug || idx}>
              <td style={{ fontWeight: 700 }}>{p.title}</td>
              <td>{p.category}</td>
              <td>{p.author}</td>
              <td>
                <span className={`${styles.statusPill} ${p.status === 'Published' ? styles.statusActive : styles.statusPending}`}>
                  {p.status}
                </span>
              </td>
              <td>{p.views}</td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className={styles.actionBtn} onClick={() => handleEdit(p)}>Edit</button>
                  <button className={styles.actionBtn} onClick={() => handleDelete(p.slug)} style={{ color: '#f87171', borderColor: 'rgba(248,113,113,0.2)' }}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No blog posts found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// 12. CRM Module
interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  serviceInterested: string;
  status: 'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost';
  assignedEmployee: string;
  notes: string;
  dealSize: string;
}

function CrmTab() {
  const [crmSubTab, setCrmSubTab] = useState<'leads' | 'prospects' | 'clients' | 'deals' | 'pipeline'>('leads');
  const [leadsList, setLeadsList] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/leads`);
      const data = await res.json();
      if (res.ok && data.leads) {
        setLeadsList(data.leads);
      }
    } catch (e) {
      console.warn("FastAPI offline, using mock leads");
      setLeadsList([
        { id: 'LD-001', name: 'Ritesh Patil', company: 'Chate Classes Pune', email: 'ritesh@chate.edu', phone: '+91 98220 12345', source: 'Website Predictor', serviceInterested: 'AI Automation', status: 'Contacted', assignedEmployee: 'Swapnil Shinde', notes: 'Interested in integrating MHT-CET predictor widget on main page.', dealSize: '₹14,999/mo' },
        { id: 'LD-002', name: 'Neha Joshi', company: 'IIT Academy Pune', email: 'neha@iitpune.com', phone: '+91 98901 88888', source: 'Referral', serviceInterested: 'Meta Ads', status: 'Won', assignedEmployee: 'Swapnil Shinde', notes: 'Closed growth plan package. Ad account audits scheduled.', dealSize: '₹9,999/mo' },
        { id: 'LD-003', name: 'Sanket Kadam', company: 'Kadam Tutorials', email: 'sanket@kadam.in', phone: '+91 88888 12345', source: 'Google Ads', serviceInterested: 'Web Dev', status: 'Meeting Scheduled', assignedEmployee: 'Snehal Patil', notes: 'Meeting tomorrow at 4 PM to discuss multi-page Next.js app.', dealSize: '₹24,999/mo' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [serviceFilter, setServiceFilter] = useState('ALL');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  // Form Fields State (New / Edit)
  const [formData, setFormData] = useState<Partial<Lead>>({
    name: '', company: '', email: '', phone: '', source: 'Website Predictor',
    serviceInterested: 'AI Automation', status: 'New', assignedEmployee: 'Unassigned',
    notes: '', dealSize: '₹9,999/mo'
  });

  const resetForm = () => {
    setFormData({
      name: '', company: '', email: '', phone: '', source: 'Website Predictor',
      serviceInterested: 'AI Automation', status: 'New', assignedEmployee: 'Unassigned',
      notes: '', dealSize: '₹9,999/mo'
    });
  };

  // Helper to open Edit Modal
  const handleOpenEdit = (lead: Lead) => {
    setEditingLead(lead);
    setFormData(lead);
  };

  // Create Lead Trigger
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company) {
      alert('Name and Company are required!');
      return;
    }
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setLeadsList([...leadsList, data.lead]);
      }
    } catch (e) {
      const newLead: Lead = {
        id: `LD-00${leadsList.length + 1}`,
        name: formData.name || '',
        company: formData.company || '',
        email: formData.email || '',
        phone: formData.phone || '',
        source: formData.source || 'Website Predictor',
        serviceInterested: formData.serviceInterested || 'AI Automation',
        status: (formData.status as any) || 'New',
        assignedEmployee: formData.assignedEmployee || 'Unassigned',
        notes: formData.notes || '',
        dealSize: formData.dealSize || '₹9,999/mo'
      };
      setLeadsList([...leadsList, newLead]);
    }
    setShowCreateModal(false);
    resetForm();
  };

  // Update Lead Trigger
  const handleUpdateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/leads/${editingLead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setLeadsList(leadsList.map(l => l.id === editingLead.id ? data.lead : l));
      }
    } catch (e) {
      setLeadsList(leadsList.map(l => l.id === editingLead.id ? { ...l, ...formData } as Lead : l));
    }
    setEditingLead(null);
    resetForm();
  };

  // Move Lead Status In Pipeline
  const moveLeadPipeline = async (leadId: string, direction: 'forward' | 'backward') => {
    const statuses: Lead['status'][] = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
    const lead = leadsList.find(l => l.id === leadId);
    if (!lead) return;
    const curIdx = statuses.indexOf(lead.status);
    let nextIdx = curIdx + (direction === 'forward' ? 1 : -1);
    if (nextIdx < 0 || nextIdx >= statuses.length) return;
    const newStatus = statuses[nextIdx];

    const updatedFormData = { ...lead, status: newStatus };

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData)
      });
      const data = await res.json();
      if (res.ok) {
        setLeadsList(leadsList.map(l => l.id === leadId ? data.lead : l));
      }
    } catch (e) {
      setLeadsList(leadsList.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    }
  };


  // ──────────────────────────────────────────
  // SUB-TAB FILTERING LOGIC
  // ──────────────────────────────────────────
  let processedLeads = leadsList;

  // 1. Tab Level Filtering
  if (crmSubTab === 'prospects') {
    processedLeads = leadsList.filter(l => l.status === 'Contacted' || l.status === 'Meeting Scheduled' || l.status === 'Proposal Sent');
  } else if (crmSubTab === 'clients') {
    processedLeads = leadsList.filter(l => l.status === 'Won');
  } else if (crmSubTab === 'deals') {
    processedLeads = leadsList.filter(l => l.status === 'Won' || l.status === 'Proposal Sent');
  }

  // 2. Query Filtering
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    processedLeads = processedLeads.filter(l => 
      l.name.toLowerCase().includes(q) ||
      l.company.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.phone.toLowerCase().includes(q) ||
      l.notes.toLowerCase().includes(q) ||
      l.assignedEmployee.toLowerCase().includes(q)
    );
  }

  // 3. Dropdown Filters
  if (statusFilter !== 'ALL') {
    processedLeads = processedLeads.filter(l => l.status === statusFilter);
  }
  if (serviceFilter !== 'ALL') {
    processedLeads = processedLeads.filter(l => l.serviceInterested === serviceFilter);
  }

  // Pagination Calculation
  const totalItems = processedLeads.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = processedLeads.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset page when filters modify
  useEffect(() => {
    setCurrentPage(1);
  }, [crmSubTab, searchQuery, statusFilter, serviceFilter]);

  return (
    <div>
      {/* Mini tabs header */}
      <div className={styles.crmSubNav}>
        {(['leads', 'prospects', 'clients', 'deals', 'pipeline'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setCrmSubTab(tab)}
            className={`${styles.crmSubNavItem} ${crmSubTab === tab ? styles.crmSubNavItemActive : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter Options Row */}
      <div className={styles.crmFilterRow}>
        <input 
          type="text" 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search leads, notes, assignees..."
          className={styles.tableSearch}
          style={{ width: '250px' }}
        />

        {crmSubTab !== 'prospects' && crmSubTab !== 'clients' && (
          <select 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
            className={styles.crmFilterSelect}
          >
            <option value="ALL">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Meeting Scheduled">Meeting Scheduled</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
        )}

        <select 
          value={serviceFilter} 
          onChange={e => setServiceFilter(e.target.value)}
          className={styles.crmFilterSelect}
        >
          <option value="ALL">All Services</option>
          <option value="AI Automation">AI Automation</option>
          <option value="Meta Ads">Meta Ads</option>
          <option value="Web Dev">Website Development</option>
          <option value="Reel Editing">Reel Editing</option>
          <option value="Social Media">Social Media</option>
        </select>

        <button 
          onClick={() => { resetForm(); setShowCreateModal(true); }}
          className={styles.createLeadBtn}
        >
          + Add Lead
        </button>
      </div>

      {/* ──────────────────────────────────────────
          CONDITIONAL RENDER TABS CONTENT
          ────────────────────────────────────────── */}

      {crmSubTab !== 'pipeline' ? (
        // TABLE MODE (Leads, Prospects, Clients, Deals)
        <div className={`${styles.tableCard} glass-card`} style={{ padding: '1.5rem', border: 'none' }}>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Lead ID</th>
                <th>Name</th>
                <th>Company</th>
                <th>Contact</th>
                <th>Service</th>
                {crmSubTab === 'deals' ? <th>Est. Deal Value</th> : <th>Status</th>}
                <th>Assignee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLeads.map((l) => (
                <tr key={l.id}>
                  <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{l.id}</td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{l.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>via {l.source}</div>
                  </td>
                  <td>{l.company}</td>
                  <td>
                    <div style={{ fontSize: '0.82rem' }}>{l.email}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{l.phone}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      {l.serviceInterested}
                    </span>
                  </td>
                  {crmSubTab === 'deals' ? (
                    <td style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{l.dealSize}</td>
                  ) : (
                    <td>
                      <span className={`${styles.statusPill} ${
                        l.status === 'Won' ? styles.statusActive : 
                        l.status === 'Lost' ? styles.statusClosed : styles.statusPending
                      }`}>
                        {l.status}
                      </span>
                    </td>
                  )}
                  <td style={{ fontSize: '0.82rem', color: l.assignedEmployee === 'Unassigned' ? 'var(--text-muted)' : '#a5b4fc' }}>
                    {l.assignedEmployee}
                  </td>
                  <td>
                    <button 
                      className={styles.actionBtn}
                      onClick={() => handleOpenEdit(l)}
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedLeads.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                    No leads found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className={styles.crmPaginationRow}>
              <span className={styles.paginationInfo}>
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} entries
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.paginationBtn}
                >
                  Previous
                </button>
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.paginationBtn}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        // SALES PIPELINE (KANBAN BOARD) MODE
        <div className={styles.pipelineWrapper}>
          <div className={styles.pipelineBoard}>
            {(['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'] as const).map(stage => {
              const stageLeads = processedLeads.filter(l => l.status === stage);
              return (
                <div key={stage} className={styles.pipelineColumn}>
                  <div className={styles.pipelineColumnHeader}>
                    <h4>{stage}</h4>
                    <span className={styles.itemBadge}>{stageLeads.length}</span>
                  </div>
                  
                  <div className={styles.pipelineCardList}>
                    {stageLeads.map(lead => (
                      <div key={lead.id} className={styles.pipelineLeadCard}>
                        <div className={styles.pipelineCardName}>{lead.name}</div>
                        <div className={styles.pipelineCardCompany}>{lead.company}</div>
                        
                        <div className={styles.pipelineCardMeta}>
                          <span className={styles.pipelineBadge}>{lead.serviceInterested}</span>
                          <span className={styles.pipelineBadge} style={{ color: 'var(--primary)' }}>{lead.dealSize}</span>
                        </div>

                        {lead.notes && (
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 0.85rem 0', lineHeight: '1.4', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                            {lead.notes}
                          </p>
                        )}

                        <div className={styles.pipelineCardFooter}>
                          <button 
                            className={styles.pipelineNavBtn}
                            onClick={() => moveLeadPipeline(lead.id, 'backward')}
                            title="Move back"
                          >
                            ◀
                          </button>
                          
                          <button 
                            className={styles.actionBtn}
                            style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                            onClick={() => handleOpenEdit(lead)}
                          >
                            Edit
                          </button>
                          
                          <button 
                            className={styles.pipelineNavBtn}
                            onClick={() => moveLeadPipeline(lead.id, 'forward')}
                            title="Advance stage"
                          >
                            ▶
                          </button>
                        </div>
                      </div>
                    ))}
                    {stageLeads.length === 0 && (
                      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.03)', borderRadius: '8px', padding: '2rem' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Empty Stage</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────
          MODALS DECK (CREATE / EDIT FORM)
          ────────────────────────────────────────── */}

      {/* 1. Add Lead Modal */}
      {showCreateModal && (
        <div className={styles.crmModalBackdrop}>
          <div className={styles.crmModalContent}>
            <h3 className={styles.chartTitle} style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Add New CRM Lead</h3>
            
            <form onSubmit={handleCreateLead}>
              <div className={styles.crmFormRow}>
                <div className={styles.crmFormGroup}>
                  <label>Lead / Contact Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name || ''} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                    placeholder="e.g. Abhi Patil"
                  />
                </div>
                <div className={styles.crmFormGroup}>
                  <label>Coaching Institute / Company *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.company || ''} 
                    onChange={e => setFormData({ ...formData, company: e.target.value })} 
                    placeholder="e.g. Chate Classes Pune"
                  />
                </div>
              </div>

              <div className={styles.crmFormRow}>
                <div className={styles.crmFormGroup}>
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email || ''} 
                    onChange={e => setFormData({ ...formData, email: e.target.value })} 
                    placeholder="you@coaching.com"
                  />
                </div>
                <div className={styles.crmFormGroup}>
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    value={formData.phone || ''} 
                    onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                    placeholder="+91 99999 99999"
                  />
                </div>
              </div>

              <div className={styles.crmFormRow}>
                <div className={styles.crmFormGroup}>
                  <label>Lead Source</label>
                  <select 
                    value={formData.source || 'Website Predictor'} 
                    onChange={e => setFormData({ ...formData, source: e.target.value })}
                  >
                    <option value="Website Predictor">Website Predictor</option>
                    <option value="Cold Email">Cold Email</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="Referral">Referral</option>
                  </select>
                </div>
                <div className={styles.crmFormGroup}>
                  <label>Service Interested</label>
                  <select 
                    value={formData.serviceInterested || 'AI Automation'} 
                    onChange={e => setFormData({ ...formData, serviceInterested: e.target.value })}
                  >
                    <option value="AI Automation">AI Automation</option>
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="Web Dev">Website Development</option>
                    <option value="Reel Editing">Reel Editing</option>
                    <option value="Social Media">Social Media</option>
                  </select>
                </div>
              </div>

              <div className={styles.crmFormRow}>
                <div className={styles.crmFormGroup}>
                  <label>Pipeline Status</label>
                  <select 
                    value={formData.status || 'New'} 
                    onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Meeting Scheduled">Meeting Scheduled</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
                <div className={styles.crmFormGroup}>
                  <label>Estimated Monthly Value</label>
                  <input 
                    type="text" 
                    value={formData.dealSize || ''} 
                    onChange={e => setFormData({ ...formData, dealSize: e.target.value })} 
                    placeholder="e.g. ₹9,999/mo"
                  />
                </div>
              </div>

              <div className={styles.crmFormGroup}>
                <label>Assigned Employee</label>
                <select 
                  value={formData.assignedEmployee || 'Unassigned'} 
                  onChange={e => setFormData({ ...formData, assignedEmployee: e.target.value })}
                >
                  <option value="Unassigned">Unassigned</option>
                  <option value="Swapnil Shinde">Swapnil Shinde (Growth)</option>
                  <option value="Snehal Patil">Snehal Patil (Developer)</option>
                  <option value="Shubham Narute">Shubham Narute (Tech Lead)</option>
                </select>
              </div>

              <div className={styles.crmFormGroup}>
                <label>Activity Logs / Notes</label>
                <textarea 
                  value={formData.notes || ''} 
                  onChange={e => setFormData({ ...formData, notes: e.target.value })} 
                  placeholder="Details of client requirements or notes from call..."
                  style={{ height: '70px' }}
                />
              </div>

              <div className={styles.modalActions}>
                <button 
                  type="button" 
                  onClick={() => setShowCreateModal(false)}
                  className={styles.actionBtn}
                  style={{ marginRight: '0.5rem' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.createLeadBtn}
                >
                  Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Edit Lead Modal */}
      {editingLead && (
        <div className={styles.crmModalBackdrop}>
          <div className={styles.crmModalContent}>
            <h3 className={styles.chartTitle} style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Manage Lead details ({editingLead.id})</h3>
            
            <form onSubmit={handleUpdateLead}>
              <div className={styles.crmFormRow}>
                <div className={styles.crmFormGroup}>
                  <label>Lead / Contact Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name || ''} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  />
                </div>
                <div className={styles.crmFormGroup}>
                  <label>Coaching Institute Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.company || ''} 
                    onChange={e => setFormData({ ...formData, company: e.target.value })} 
                  />
                </div>
              </div>

              <div className={styles.crmFormRow}>
                <div className={styles.crmFormGroup}>
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email || ''} 
                    onChange={e => setFormData({ ...formData, email: e.target.value })} 
                  />
                </div>
                <div className={styles.crmFormGroup}>
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    value={formData.phone || ''} 
                    onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                  />
                </div>
              </div>

              <div className={styles.crmFormRow}>
                <div className={styles.crmFormGroup}>
                  <label>Lead Source</label>
                  <select 
                    value={formData.source || 'Website Predictor'} 
                    onChange={e => setFormData({ ...formData, source: e.target.value })}
                  >
                    <option value="Website Predictor">Website Predictor</option>
                    <option value="Cold Email">Cold Email</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="Referral">Referral</option>
                  </select>
                </div>
                <div className={styles.crmFormGroup}>
                  <label>Service Interested</label>
                  <select 
                    value={formData.serviceInterested || 'AI Automation'} 
                    onChange={e => setFormData({ ...formData, serviceInterested: e.target.value })}
                  >
                    <option value="AI Automation">AI Automation</option>
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="Web Dev">Website Development</option>
                    <option value="Reel Editing">Reel Editing</option>
                    <option value="Social Media">Social Media</option>
                  </select>
                </div>
              </div>

              <div className={styles.crmFormRow}>
                <div className={styles.crmFormGroup}>
                  <label>Pipeline Status</label>
                  <select 
                    value={formData.status || 'New'} 
                    onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Meeting Scheduled">Meeting Scheduled</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
                <div className={styles.crmFormGroup}>
                  <label>Estimated Monthly Value</label>
                  <input 
                    type="text" 
                    value={formData.dealSize || ''} 
                    onChange={e => setFormData({ ...formData, dealSize: e.target.value })} 
                  />
                </div>
              </div>

              <div className={styles.crmFormGroup}>
                <label>Assigned Employee</label>
                <select 
                  value={formData.assignedEmployee || 'Unassigned'} 
                  onChange={e => setFormData({ ...formData, assignedEmployee: e.target.value })}
                >
                  <option value="Unassigned">Unassigned</option>
                  <option value="Swapnil Shinde">Swapnil Shinde (Growth)</option>
                  <option value="Snehal Patil">Snehal Patil (Developer)</option>
                  <option value="Shubham Narute">Shubham Narute (Tech Lead)</option>
                </select>
              </div>

              <div className={styles.crmFormGroup}>
                <label>Activity Logs / Notes</label>
                <textarea 
                  value={formData.notes || ''} 
                  onChange={e => setFormData({ ...formData, notes: e.target.value })} 
                  style={{ height: '70px' }}
                />
              </div>

              <div className={styles.modalActions}>
                <button 
                  type="button" 
                  onClick={() => setEditingLead(null)}
                  className={styles.actionBtn}
                  style={{ marginRight: '0.5rem' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.createLeadBtn}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// 13. Payments Module
interface AdminInvoice {
  id: string;
  client: string;
  email: string;
  plan: string;
  amount: string;
  date: string;
  status: string;
  refundStatus: string;
  refundReason?: string;
}

function PaymentsTab() {
  const [invoices, setInvoices] = useState<AdminInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/payments/invoices`);
      const data = await res.json();
      if (res.ok && data.invoices) {
        setInvoices(data.invoices);
      }
    } catch (e) {
      console.warn("FastAPI offline, using mock payments");
      setInvoices([
        { id: 'INV-2026-001', client: 'IIT Academy Pune', email: 'director@iitpune.com', plan: 'Scale Plus Plan', amount: '₹19,999', date: 'Jul 15, 2026', status: 'Paid', refundStatus: 'None' },
        { id: 'INV-2026-002', client: 'Chate Classes Group', email: 'management@chate.edu', plan: 'Growth Tier Plan', amount: '₹9,999', date: 'Jul 16, 2026', status: 'Paid', refundStatus: 'None' },
        { id: 'INV-2026-003', client: 'Modern Coaching', email: 'modern@coaching.com', plan: 'Starter Setup Plan', amount: '₹4,999', date: 'Jul 17, 2026', status: 'Pending', refundStatus: 'None' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleApproveRejectRefund = async (id: string, approve: boolean) => {
    const status = approve ? 'Approved' : 'Rejected';
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/payments/invoices/${id}/refund-approval`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Refund request ${status.toLowerCase()} successfully.`);
        setInvoices(invoices.map(inv => inv.id === id ? data.invoice : inv));
      }
    } catch (e) {
      setInvoices(invoices.map(inv => inv.id === id ? { ...inv, refundStatus: status, status: approve ? 'Refunded' : inv.status } : inv));
      alert(`Local memory fallback: Refund ${status.toLowerCase()}.`);
    }
  };

  if (loading) {
    return <div style={{ color: 'var(--text-muted)', padding: '2rem', fontFamily: 'Outfit' }}>Loading Invoices Ledger...</div>;
  }

  return (
    <div className={`${styles.tableCard} glass-card`}>
      <div className={styles.tableHeaderRow}>
        <h3 className={styles.tableTitle}>Invoices Ledger</h3>
      </div>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Client Name</th>
            <th>Product Tier</th>
            <th>Amount Paid</th>
            <th>Date Billing</th>
            <th>Status</th>
            <th>Refund Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((p, idx) => (
            <tr key={idx}>
              <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{p.id}</td>
              <td style={{ fontWeight: 700 }}>
                {p.client}
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.email}</div>
              </td>
              <td>{p.plan}</td>
              <td style={{ fontWeight: 'bold' }}>{p.amount}</td>
              <td>{p.date}</td>
              <td>
                <span className={`${styles.statusPill} ${
                  p.status === 'Paid' ? styles.statusPaid : 
                  p.status === 'Refunded' ? styles.statusClosed : styles.statusPending
                }`}>
                  {p.status}
                </span>
              </td>
              <td>
                {p.refundStatus === 'Pending' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontStyle: 'italic' }}>Reason: "{p.refundReason}"</span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button 
                        className={styles.actionBtn}
                        style={{ color: '#34d399', borderColor: 'rgba(52,211,153,0.2)', padding: '0.2rem 0.5rem', fontSize: '0.72rem' }}
                        onClick={() => handleApproveRejectRefund(p.id, true)}
                      >
                        Approve
                      </button>
                      <button 
                        className={styles.actionBtn}
                        style={{ color: '#fca5a5', borderColor: 'rgba(239,68,68,0.2)', padding: '0.2rem 0.5rem', fontSize: '0.72rem' }}
                        onClick={() => handleApproveRejectRefund(p.id, false)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}
                {p.refundStatus === 'Approved' && (
                  <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>Refund Approved ✓</span>
                )}
                {p.refundStatus === 'Rejected' && (
                  <span style={{ fontSize: '0.8rem', color: '#f87171', fontWeight: 600 }}>Refund Rejected ✕</span>
                )}
                {(!p.refundStatus || p.refundStatus === 'None') && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No Requests</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// 14. Settings Module
interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  created: string;
  status: 'Active' | 'Revoked';
}

interface OrgMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Employee' | 'Client' | 'Student';
  status: 'Active' | 'Pending';
}

interface RolePermission {
  role: string;
  accessPredictor: boolean;
  editContent: boolean;
  manageBilling: boolean;
  configureSystem: boolean;
}

function SettingsTab() {
  const [settingsSubTab, setSettingsSubTab] = useState<'profile' | 'security' | 'theme' | 'api' | 'billing' | 'roles'>('profile');

  // 1. Profile & Company
  const [profileName, setProfileName] = useState('Admin User');
  const [profileEmail, setProfileEmail] = useState('admin@engineeringpath.ai');
  const [companyName, setCompanyName] = useState('EngineeringPath AI');
  const [companyWebsite, setCompanyWebsite] = useState('https://engineeringpath.ai');
  const [companyIndustry, setCompanyIndustry] = useState('EdTech / AI Admissions');

  // 2. Security & Password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // 3. Theme & Notifications
  const [activeTheme, setActiveTheme] = useState('glass-void');
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyPush, setNotifyPush] = useState(true);
  const [notifySMS, setNotifySMS] = useState(false);

  // 4. API Keys
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([
    { id: 'key_1', name: 'Predictor Widget API', key: 'ep_live_4821a8b9cf2e105d7', created: 'Jan 15, 2026', status: 'Active' },
    { id: 'key_2', name: 'WhatsApp Webhook SDK', key: 'ep_live_9012cd34ef56ab789', created: 'Mar 12, 2026', status: 'Active' }
  ]);
  const [newKeyName, setNewKeyName] = useState('');

  // 5. Billing
  const [billingPlan, setBillingPlan] = useState('Growth Plan (₹9,999/mo)');
  const [billingEmail, setBillingEmail] = useState('billing@engineeringpath.ai');

  // 6. Organization Settings & Role Management
  const [orgName, setOrgName] = useState('EngineeringPath AI Maharashtra HQ');
  const [members, setMembers] = useState<OrgMember[]>([
    { id: 'mem_1', name: 'Shubham Narute', email: 'shubham@engineeringpath.ai', role: 'Admin', status: 'Active' },
    { id: 'mem_2', name: 'Snehal Patil', email: 'snehal@engineeringpath.ai', role: 'Employee', status: 'Active' },
    { id: 'mem_3', name: 'Swapnil Shinde', email: 'swapnil@engineeringpath.ai', role: 'Employee', status: 'Active' },
    { id: 'mem_4', name: 'IIT Academy Pune', email: 'director@iitpune.com', role: 'Client', status: 'Active' }
  ]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'Admin' | 'Employee' | 'Client' | 'Student'>('Employee');

  const [rolesPermissions, setRolesPermissions] = useState<RolePermission[]>([
    { role: 'Admin', accessPredictor: true, editContent: true, manageBilling: true, configureSystem: true },
    { role: 'Employee', accessPredictor: true, editContent: true, manageBilling: false, configureSystem: false },
    { role: 'Client', accessPredictor: true, editContent: false, manageBilling: true, configureSystem: false },
    { role: 'Student', accessPredictor: true, editContent: false, manageBilling: false, configureSystem: false }
  ]);

  // Handlers
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile and Company settings updated in client memory!');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    alert('Security password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const randomKey = 'ep_live_' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    const newKey: ApiKeyItem = {
      id: `key_${apiKeys.length + 1}`,
      name: newKeyName,
      key: randomKey,
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Active'
    };
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    alert('New API Key generated successfully.');
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(apiKeys.map(k => k.id === id ? { ...k, status: 'Revoked' } : k));
    alert('API Key revoked.');
  };

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberEmail.trim()) return;
    const newMember: OrgMember = {
      id: `mem_${members.length + 1}`,
      name: newMemberName,
      email: newMemberEmail,
      role: newMemberRole,
      status: 'Pending'
    };
    setMembers([...members, newMember]);
    setNewMemberName('');
    setNewMemberEmail('');
    alert(`Invitation sent to ${newMemberEmail}`);
  };

  const togglePermission = (roleName: string, permissionField: keyof Omit<RolePermission, 'role'>) => {
    setRolesPermissions(rolesPermissions.map(rp => {
      if (rp.role === roleName) {
        return {
          ...rp,
          [permissionField]: !rp[permissionField]
        };
      }
      return rp;
    }));
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem' }}>
      
      {/* Sub tabs Menu */}
      <aside style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {(['profile', 'security', 'theme', 'api', 'billing', 'roles'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSettingsSubTab(tab)}
            className={`${styles.projSubNavItem} ${settingsSubTab === tab ? styles.projSubNavActive : ''}`}
            style={{ textAlign: 'left', padding: '0.65rem 1rem', width: '100%' }}
          >
            {tab === 'profile' && '👤 Profile & Company'}
            {tab === 'security' && '🔒 Security & Password'}
            {tab === 'theme' && '🎨 Theme & Alerts'}
            {tab === 'api' && '🔑 Developer API Keys'}
            {tab === 'billing' && '💳 Billing & Plans'}
            {tab === 'roles' && '👥 Org Roles & Perms'}
          </button>
        ))}
      </aside>

      {/* Main Settings Content Area */}
      <div className={`${styles.tableCard} glass-card`} style={{ margin: 0, padding: '2rem' }}>
        
        {/* 1. PROFILE & COMPANY */}
        {settingsSubTab === 'profile' && (
          <form onSubmit={handleSaveProfile}>
            <h3 className={styles.chartTitle} style={{ fontSize: '1.15rem', marginBottom: '1.5rem', marginTop: 0 }}>Profile & Company Configuration</h3>
            
            <div className={styles.settingsGrid}>
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input type="text" required value={profileName} onChange={e => setProfileName(e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label>Email Address *</label>
                <input type="email" required value={profileEmail} onChange={e => setProfileEmail(e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label>Company Name</label>
                <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label>Industry</label>
                <input type="text" value={companyIndustry} onChange={e => setCompanyIndustry(e.target.value)} />
              </div>
              <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                <label>Company Website URL</label>
                <input type="url" value={companyWebsite} onChange={e => setCompanyWebsite(e.target.value)} />
              </div>
            </div>

            <button type="submit" className={styles.saveSettingsBtn}>Save Profile Changes</button>
          </form>
        )}

        {/* 2. SECURITY & PASSWORD */}
        {settingsSubTab === 'security' && (
          <div>
            <form onSubmit={handleUpdatePassword} style={{ marginBottom: '2.5rem' }}>
              <h3 className={styles.chartTitle} style={{ fontSize: '1.15rem', marginBottom: '1.5rem', marginTop: 0 }}>Security Settings</h3>
              
              <div className={styles.settingsGrid}>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label>Current Password *</label>
                  <input type="password" required value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label>New Password *</label>
                  <input type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label>Confirm New Password *</label>
                  <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
              </div>

              <button type="submit" className={styles.saveSettingsBtn}>Update Password</button>
            </form>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '2rem' }}>
              <h4 style={{ color: '#a5b4fc', fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.5rem', marginTop: 0 }}>Two-Factor Authentication (2FA)</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                Add an extra layer of security to your admin account. Verify logins using authenticator apps like Google Authenticator or Authy.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <input 
                  type="checkbox" 
                  id="twoFactorEnableCheck" 
                  checked={twoFactorEnabled} 
                  onChange={e => setTwoFactorEnabled(e.target.checked)} 
                  style={{ width: 'auto', cursor: 'pointer' }} 
                />
                <label htmlFor="twoFactorEnableCheck" style={{ margin: 0, cursor: 'pointer', fontSize: '0.85rem' }}>
                  Enable Multi-Factor Authenticator UI
                </label>
              </div>

              {twoFactorEnabled && (
                <div style={{ display: 'flex', gap: '1.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.25rem', maxWidth: '500px' }}>
                  <div style={{ width: '110px', height: '110px', background: '#ffffff', borderRadius: '8px', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {/* Simulated QR Code */}
                    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', color: '#000000' }}>
                      <path fill="currentColor" d="M10 10h30v30H10zm5 5v20h20V15zM60 10h30v30H60zm5 5v20h20V15zM10 60h30v30H10zm5 5v20h20V65zM50 50h10v10H50zm10 10h10v10H60zm-10 10h10v10H50zm30 10h10v10H80zm0-30h10v10H80zm-10 10h10v10H70z" />
                    </svg>
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.8rem', fontWeight: 700, margin: '0 0 0.4rem 0', color: '#ffffff' }}>Scan QR Code</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: '0 0 0.75rem 0' }}>
                      Scan the barcode with your authenticator app, or enter secret key:
                    </p>
                    <code style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#c084fc', fontFamily: 'monospace' }}>
                      EP99-CET2026-LOCK-SECURE
                    </code>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. THEME & ALERTS */}
        {settingsSubTab === 'theme' && (
          <div>
            <h3 className={styles.chartTitle} style={{ fontSize: '1.15rem', marginBottom: '1.5rem', marginTop: 0 }}>Theme & Alerts Configuration</h3>
            
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#a5b4fc', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>System Display Theme</label>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {[
                  { id: 'glass-void', name: 'Glass Void (Dark)', desc: 'Glassmorphic styling tint over deep space backdrop.', color: '#7c3aed' },
                  { id: 'midnight', name: 'Midnight (Pure Black)', desc: 'Full contrast AMOLED black layout background.', color: '#11131e' },
                  { id: 'cyberpunk', name: 'Neon Cyberpunk', desc: 'Glowing neon margins with vibrant magenta accents.', color: '#ec4899' }
                ].map(theme => (
                  <div 
                    key={theme.id} 
                    onClick={() => { setActiveTheme(theme.id); alert(`Theme switched to: ${theme.name}`); }}
                    style={{ 
                      cursor: 'pointer',
                      background: 'rgba(255,255,255,0.01)', 
                      border: '1px solid',
                      borderColor: activeTheme === theme.id ? theme.color : 'rgba(255,255,255,0.06)',
                      borderRadius: '14px',
                      padding: '1.25rem',
                      transition: 'border-color 0.2s',
                      boxShadow: activeTheme === theme.id ? `0 0 10px ${theme.color}25` : undefined
                    }}
                  >
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>{theme.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4', display: 'block' }}>{theme.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '2rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#a5b4fc', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>Notification Delivery Settings</label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input type="checkbox" id="notifyEmailCheck" checked={notifyEmail} onChange={e => setNotifyEmail(e.target.checked)} style={{ width: 'auto', cursor: 'pointer' }} />
                  <label htmlFor="notifyEmailCheck" style={{ margin: 0, cursor: 'pointer', fontSize: '0.85rem' }}>Email Notifications for transactional status events</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input type="checkbox" id="notifyPushCheck" checked={notifyPush} onChange={e => setNotifyPush(e.target.checked)} style={{ width: 'auto', cursor: 'pointer' }} />
                  <label htmlFor="notifyPushCheck" style={{ margin: 0, cursor: 'pointer', fontSize: '0.85rem' }}>Browser Push Notifications via Notification API</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input type="checkbox" id="notifySMSCheck" checked={notifySMS} onChange={e => setNotifySMS(e.target.checked)} style={{ width: 'auto', cursor: 'pointer' }} />
                  <label htmlFor="notifySMSCheck" style={{ margin: 0, cursor: 'pointer', fontSize: '0.85rem' }}>SMS Text Alerts for critical priority security warnings</label>
                </div>
              </div>

              <button onClick={() => alert('Delivery settings saved in client cache.')} className={styles.saveSettingsBtn} style={{ marginTop: '1.5rem' }}>Save Preferences</button>
            </div>
          </div>
        )}

        {/* 4. DEVELOPER API KEYS */}
        {settingsSubTab === 'api' && (
          <div>
            <h3 className={styles.chartTitle} style={{ fontSize: '1.15rem', marginBottom: '1.5rem', marginTop: 0 }}>API & Integration Credentials</h3>
            
            <form onSubmit={handleGenerateKey} style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', alignItems: 'flex-end' }}>
              <div className={styles.formGroup} style={{ flexGrow: 1, margin: 0 }}>
                <label>Generate API Token - Label Name</label>
                <input 
                  type="text" 
                  required 
                  value={newKeyName} 
                  onChange={e => setNewKeyName(e.target.value)} 
                  placeholder="e.g. Production Mobile SDK Integration" 
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff', padding: '0.5rem 0.75rem', outline: 'none' }}
                />
              </div>
              <button type="submit" className={styles.createLeadBtn} style={{ height: '38px', padding: '0 1.25rem' }}>+ Create Key</button>
            </form>

            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Token Label</th>
                  <th>API Key Token</th>
                  <th>Date Created</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map(k => (
                  <tr key={k.id}>
                    <td style={{ fontWeight: 700 }}>{k.name}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#cbd5e1' }}>
                      <code>{k.key}</code>
                    </td>
                    <td>{k.created}</td>
                    <td>
                      <span className={`${styles.statusPill} ${k.status === 'Active' ? styles.statusActive : styles.statusClosed}`}>
                        {k.status}
                      </span>
                    </td>
                    <td>
                      {k.status === 'Active' ? (
                        <button onClick={() => handleRevokeKey(k.id)} className={styles.actionBtn} style={{ color: '#f87171', borderColor: 'rgba(248,113,113,0.2)' }}>
                          Revoke
                        </button>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Revoked</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. BILLING & PLANS */}
        {settingsSubTab === 'billing' && (
          <div>
            <h3 className={styles.chartTitle} style={{ fontSize: '1.15rem', marginBottom: '1.5rem', marginTop: 0 }}>Billing & Subscription Ledger</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Active Platform tier</span>
                
                <div>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: 'var(--primary)' }}>{billingPlan}</h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Recurring payment: auto-renews via stripe on Aug 18, 2026</span>
                </div>

                <div className={styles.formGroup} style={{ margin: 0 }}>
                  <label>Billing Invoices Email Contact</label>
                  <input type="email" value={billingEmail} onChange={e => setBillingEmail(e.target.value)} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff', padding: '0.5rem 0.75rem', outline: 'none' }} />
                </div>

                <button onClick={() => alert('Billing details updated.')} className={styles.saveSettingsBtn} style={{ marginTop: '0.5rem', width: 'auto' }}>Update Billing Info</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ color: '#a5b4fc', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Billing Actions</h4>
                <button onClick={() => alert('Redirecting to Stripe Billing checkout Portal...')} className={styles.actionBtn} style={{ padding: '0.6rem', textAlign: 'center', display: 'block', width: '100%' }}>
                  💳 Open Stripe Portal
                </button>
                <button onClick={() => alert('Razorpay subscription link dispatched to billing email.')} className={styles.actionBtn} style={{ padding: '0.6rem', textAlign: 'center', display: 'block', width: '100%' }}>
                  🇮🇳 Change to Razorpay
                </button>
                <button onClick={() => alert('Cancellation request submitted to billing support.')} className={styles.actionBtn} style={{ padding: '0.6rem', color: '#fca5a5', borderColor: 'rgba(239,68,68,0.2)', textAlign: 'center', display: 'block', width: '100%' }}>
                  ✕ Cancel Subscription
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. ORG ROLES & PERMISSIONS */}
        {settingsSubTab === 'roles' && (
          <div>
            <h3 className={styles.chartTitle} style={{ fontSize: '1.15rem', marginBottom: '1.5rem', marginTop: 0 }}>Organization Settings & Role Management</h3>
            
            <div className={styles.formGroup} style={{ marginBottom: '2rem' }}>
              <label>Organization Name</label>
              <input type="text" value={orgName} onChange={e => setOrgName(e.target.value)} />
            </div>

            {/* Invite members block */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#a5b4fc', fontSize: '0.92rem', fontWeight: 700, marginBottom: '1rem', marginTop: 0 }}>Invite Team Members</h4>
              <form onSubmit={handleInviteMember} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'flex-end' }}>
                <div className={styles.formGroup} style={{ flex: 1.2, margin: 0 }}>
                  <label>Member Name</label>
                  <input type="text" required value={newMemberName} onChange={e => setNewMemberName(e.target.value)} placeholder="e.g. Rohit Patil" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff', padding: '0.5rem' }} />
                </div>
                <div className={styles.formGroup} style={{ flex: 1.5, margin: 0 }}>
                  <label>Member Email</label>
                  <input type="email" required value={newMemberEmail} onChange={e => setNewMemberEmail(e.target.value)} placeholder="rohit@academy.in" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff', padding: '0.5rem' }} />
                </div>
                <div className={styles.formGroup} style={{ flex: 1, margin: 0 }}>
                  <label>Staff Role</label>
                  <select value={newMemberRole} onChange={e => setNewMemberRole(e.target.value as any)} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff', padding: '0.5rem' }}>
                    <option value="Employee">Employee</option>
                    <option value="Admin">Admin</option>
                    <option value="Client">Client</option>
                  </select>
                </div>
                <button type="submit" className={styles.createLeadBtn} style={{ height: '36px', padding: '0 1rem' }}>+ Invite</button>
              </form>

              <div style={{ marginTop: '1.5rem', maxHeight: '180px', overflowY: 'auto' }}>
                <table className={styles.adminTable}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Assigned Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map(m => (
                      <tr key={m.id}>
                        <td style={{ fontWeight: 700 }}>{m.name}</td>
                        <td>{m.email}</td>
                        <td><span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.04)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>{m.role}</span></td>
                        <td>
                          <span className={`${styles.statusPill} ${m.status === 'Active' ? styles.statusActive : styles.statusPending}`}>
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Roles Matrix permissions grid */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
              <h4 style={{ color: '#a5b4fc', fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.5rem', marginTop: 0 }}>Role Permission Matrix</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Set platform capability mappings for system user roles. Enable/disable scopes dynamically.
              </p>

              <table className={styles.adminTable}>
                <thead>
                  <tr>
                    <th>Role Designation</th>
                    <th>Access Predictor</th>
                    <th>Edit Blog Content</th>
                    <th>Manage Billing</th>
                    <th>Configure System Settings</th>
                  </tr>
                </thead>
                <tbody>
                  {rolesPermissions.map(rp => (
                    <tr key={rp.role}>
                      <td style={{ fontWeight: 700, color: '#ffffff' }}>{rp.role}</td>
                      <td>
                        <input 
                          type="checkbox" 
                          checked={rp.accessPredictor} 
                          onChange={() => togglePermission(rp.role, 'accessPredictor')} 
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                      <td>
                        <input 
                          type="checkbox" 
                          checked={rp.editContent} 
                          onChange={() => togglePermission(rp.role, 'editContent')} 
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                      <td>
                        <input 
                          type="checkbox" 
                          checked={rp.manageBilling} 
                          onChange={() => togglePermission(rp.role, 'manageBilling')} 
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                      <td>
                        <input 
                          type="checkbox" 
                          checked={rp.configureSystem} 
                          onChange={() => togglePermission(rp.role, 'configureSystem')} 
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}



// ──────────────────────────────────────────
// 14. Project Management Module
// ──────────────────────────────────────────

interface ProjTask {
  id: string;
  title: string;
  desc: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'todo' | 'inprogress' | 'done';
  dueDate: string; // formatted as "YYYY-MM-DD" e.g. "2026-07-24"
}

interface ProjectFile {
  name: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
}

interface ProjectComment {
  author: string;
  text: string;
  timestamp: string;
}

interface ProjectMilestone {
  title: string;
  dueDate: string;
  completed: boolean;
}

interface ProjItem {
  id: string;
  name: string;
  client: string;
  deadline: string;
  status: 'Planning' | 'In Progress' | 'In Review' | 'Completed';
  assignees: string[];
  clientVisible: boolean;
  milestones: ProjectMilestone[];
  tasks: ProjTask[];
  files: ProjectFile[];
  comments: ProjectComment[];
}

function ProjectsTab() {
  // State for all projects
  const [projects, setProjects] = useState<ProjItem[]>([
    {
      id: 'PRJ-801',
      name: 'IIT Academy Counselor Bot',
      client: 'IIT Academy Pune',
      deadline: '2026-07-25',
      status: 'In Progress',
      assignees: ['Shubham Narute', 'Swapnil Shinde'],
      clientVisible: true,
      milestones: [
        { title: 'Database cutoff schema ingestion', dueDate: '2026-07-15', completed: true },
        { title: 'Edge middleware routing locks setup', dueDate: '2026-07-20', completed: true },
        { title: 'Beta deployment and client reviews sync', dueDate: '2026-07-25', completed: false }
      ],
      tasks: [
        { id: 'T-01', title: 'Tune percentile regression margins', desc: 'Recalculate model coefficients for DTE CAP round parameters.', priority: 'High', status: 'inprogress', dueDate: '2026-07-22' },
        { id: 'T-02', title: 'Write Razorpay webhook signatures', desc: 'Secure checkout webhook verify hooks inside backend.', priority: 'Medium', status: 'todo', dueDate: '2026-07-24' },
        { id: 'T-03', title: 'Configure CRM Deal pagination views', desc: 'Limit columns rendering index list to 5 items.', priority: 'Low', status: 'done', dueDate: '2026-07-18' }
      ],
      files: [
        { name: 'counselor_requirements.pdf', size: '2.4 MB', uploadedBy: 'Client Director', uploadedAt: 'Jul 10, 2026' },
        { name: 'logo_assets_glow.png', size: '820 KB', uploadedBy: 'Designer Amit', uploadedAt: 'Jul 12, 2026' }
      ],
      comments: [
        { author: 'Shubham Narute', text: 'Percentile coefficients loaded in preprocess helper. Verification builds green.', timestamp: 'Jul 16, 2026, 04:30 PM' },
        { author: 'Admin User', text: 'Please complete the Razorpay checkout endpoint by next session standup.', timestamp: 'Jul 17, 2026, 11:20 AM' }
      ]
    },
    {
      id: 'PRJ-802',
      name: 'Chate Classes SMM Campaign',
      client: 'Chate Group Maharashtra',
      deadline: '2026-08-10',
      status: 'Planning',
      assignees: ['Snehal Patil'],
      clientVisible: false,
      milestones: [
        { title: 'Video script outlines resolved', dueDate: '2026-08-02', completed: false },
        { title: 'Ad account validation sync', dueDate: '2026-08-10', completed: false }
      ],
      tasks: [
        { id: 'T-11', title: 'Outline Reels editing timelines', desc: 'Formulate video editing schedules for Pune reels.', priority: 'Medium', status: 'todo', dueDate: '2026-08-01' }
      ],
      files: [],
      comments: []
    }
  ]);

  // Selected project details
  const [selectedProjId, setSelectedProjId] = useState<string>('PRJ-801');
  const activeProject = projects.find(p => p.id === selectedProjId) || projects[0];

  // Tab switcher inside active project view
  const [projSubTab, setProjSubTab] = useState<'overview' | 'kanban' | 'calendar' | 'files' | 'comments'>('overview');

  // Modals state
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  // New Project Fields state
  const [newProjName, setNewProjName] = useState('');
  const [newProjClient, setNewProjClient] = useState('');
  const [newProjDeadline, setNewProjDeadline] = useState('');
  const [newProjAssignees, setNewProjAssignees] = useState<string[]>([]);
  const [newProjVisible, setNewProjVisible] = useState(true);

  // New Task Fields state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  // Comment input state
  const [commentInput, setCommentInput] = useState('');

  // File upload state mockup
  const [fileName, setFileName] = useState('');

  // Handlers
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim() || !newProjClient.trim() || !newProjDeadline.trim()) return;

    const newProject: ProjItem = {
      id: `PRJ-${Math.floor(Math.random() * 900) + 100}`,
      name: newProjName,
      client: newProjClient,
      deadline: newProjDeadline,
      status: 'Planning',
      assignees: newProjAssignees,
      clientVisible: newProjVisible,
      milestones: [],
      tasks: [],
      files: [],
      comments: []
    };

    setProjects([...projects, newProject]);
    setSelectedProjId(newProject.id);
    setShowAddProject(false);
    
    // Reset fields
    setNewProjName('');
    setNewProjClient('');
    setNewProjDeadline('');
    setNewProjAssignees([]);
    setNewProjVisible(true);
    alert('New project added successfully.');
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !newTaskDueDate.trim()) return;

    const newTask: ProjTask = {
      id: `T-${Math.floor(Math.random() * 900) + 100}`,
      title: newTaskTitle,
      desc: newTaskDesc,
      priority: newTaskPriority,
      status: 'todo',
      dueDate: newTaskDueDate
    };

    setProjects(projects.map(p => {
      if (p.id === selectedProjId) {
        return {
          ...p,
          tasks: [...p.tasks, newTask]
        };
      }
      return p;
    }));

    setShowAddTask(false);
    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskPriority('Low');
    setNewTaskDueDate('');
    alert('Task added to Kanban Board.');
  };

  const shiftTaskStatus = (taskId: string, direction: 'forward' | 'backward') => {
    const statusOrder: ProjTask['status'][] = ['todo', 'inprogress', 'done'];
    setProjects(projects.map(p => {
      if (p.id === selectedProjId) {
        return {
          ...p,
          tasks: p.tasks.map(t => {
            if (t.id === taskId) {
              const curIdx = statusOrder.indexOf(t.status);
              let nextIdx = curIdx + (direction === 'forward' ? 1 : -1);
              if (nextIdx >= 0 && nextIdx < statusOrder.length) {
                return { ...t, status: statusOrder[nextIdx] };
              }
            }
            return t;
          })
        };
      }
      return p;
    }));
  };

  const toggleClientVisibility = () => {
    setProjects(projects.map(p => {
      if (p.id === selectedProjId) {
        return { ...p, clientVisible: !p.clientVisible };
      }
      return p;
    }));
    alert('Client Visibility toggle resolved.');
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment: ProjectComment = {
      author: 'Admin User',
      text: commentInput,
      timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    setProjects(projects.map(p => {
      if (p.id === selectedProjId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));

    setCommentInput('');
  };

  const handleUploadFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    const newFile: ProjectFile = {
      name: fileName,
      size: '1.2 MB',
      uploadedBy: 'Admin User',
      uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setProjects(projects.map(p => {
      if (p.id === selectedProjId) {
        return {
          ...p,
          files: [...p.files, newFile]
        };
      }
      return p;
    }));

    setFileName('');
    alert('File asset uploaded successfully.');
  };

  const toggleAssignee = (name: string) => {
    if (newProjAssignees.includes(name)) {
      setNewProjAssignees(newProjAssignees.filter(n => n !== name));
    } else {
      setNewProjAssignees([...newProjAssignees, name]);
    }
  };

  return (
    <div>
      {/* Upper toolbar controls selector */}
      <div className={styles.projToolbar}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <select 
            value={selectedProjId}
            onChange={e => setSelectedProjId(e.target.value)}
            className={styles.crmFilterSelect}
            style={{ width: '220px' }}
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <button onClick={() => setShowAddProject(true)} className={styles.addLeadBtn}>
            + Create New Project
          </button>
        </div>

        {/* Client visibility and quick meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Client: <strong>{activeProject.client}</strong>
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.02)', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Client Visibility</span>
            <input 
              type="checkbox" 
              checked={activeProject.clientVisible} 
              onChange={toggleClientVisibility}
              style={{ width: 'auto', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      {/* Sub menu Navigation tabs inside project */}
      <div className={styles.projSubNav}>
        <button onClick={() => setProjSubTab('overview')} className={`${styles.projSubNavItem} ${projSubTab === 'overview' ? styles.projSubNavActive : ''}`}>
          Overview & Milestones
        </button>
        <button onClick={() => setProjSubTab('kanban')} className={`${styles.projSubNavItem} ${projSubTab === 'kanban' ? styles.projSubNavActive : ''}`}>
          Kanban Board
        </button>
        <button onClick={() => setProjSubTab('calendar')} className={`${styles.projSubNavItem} ${projSubTab === 'calendar' ? styles.projSubNavActive : ''}`}>
          Calendar View
        </button>
        <button onClick={() => setProjSubTab('files')} className={`${styles.projSubNavItem} ${projSubTab === 'files' ? styles.projSubNavActive : ''}`}>
          Files & Assets ({activeProject.files.length})
        </button>
        <button onClick={() => setProjSubTab('comments')} className={`${styles.projSubNavItem} ${projSubTab === 'comments' ? styles.projSubNavActive : ''}`}>
          Discussions ({activeProject.comments.length})
        </button>
      </div>

      {/* ──────────────────────────────────────────
          SUB-VIEWS ROUTER
      ────────────────────────────────────────── */}

      {/* A. OVERVIEW & TIMELINE */}
      {projSubTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
          {/* Milestones list */}
          <div className={`${styles.crmTableCard} glass-card`} style={{ border: 'none', padding: '0' }}>
            <h3 className={styles.tableTitle} style={{ padding: '1.5rem' }}>Project Milestones</h3>
            <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {activeProject.milestones.map((m, idx) => (
                <div key={idx} style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                  <div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: m.completed ? 'var(--text-muted)' : '#ffffff', textDecoration: m.completed ? 'line-through' : 'none' }}>
                      {m.title}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target: {m.dueDate}</span>
                  </div>
                  <span className={`${styles.statusPill} ${m.completed ? styles.statusPaid : styles.statusPending}`}>
                    {m.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
              ))}
              {activeProject.milestones.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No milestones set.</div>
              )}
            </div>
          </div>

          {/* Chronological Timeline & Assignees */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Quick Timeline */}
            <div className={`${styles.analyticsChartCard} glass-card`}>
              <h3 className={styles.chartTitle} style={{ fontSize: '1rem' }}>Project Timeline</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', alignSelf: 'center' }} />
                  <span style={{ fontSize: '0.82rem', color: '#10b981' }}>Project Initiated</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', alignSelf: 'center' }} />
                  <span style={{ fontSize: '0.82rem', color: '#ffffff' }}>Active In-progress builds</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', alignSelf: 'center' }} />
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Deadline Target: {activeProject.deadline}</span>
                </div>
              </div>
            </div>

            {/* Assignees */}
            <div className={`${styles.analyticsChartCard} glass-card`}>
              <h3 className={styles.chartTitle} style={{ fontSize: '1rem' }}>Assigned Staff</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                {activeProject.assignees.map((name, idx) => (
                  <span key={idx} className={styles.statusPill} style={{ background: 'rgba(124, 58, 237, 0.08)', color: '#c084fc', border: '1px solid rgba(124, 58, 237, 0.15)' }}>
                    👤 {name}
                  </span>
                ))}
                {activeProject.assignees.length === 0 && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No employees assigned yet.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* B. KANBAN BOARD */}
      {projSubTab === 'kanban' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Interactive Kanban tasks mapping:</span>
            <button onClick={() => setShowAddTask(true)} className={styles.addLeadBtn} style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}>
              + Add Task
            </button>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', overflowX: 'auto', paddingBottom: '1rem' }}>
            {(['todo', 'inprogress', 'done'] as const).map(col => {
              const colTasks = activeProject.tasks.filter(t => t.status === col);
              const colLabel = col === 'todo' ? 'To Do' : col === 'inprogress' ? 'In Progress' : 'Completed';
              return (
                <div key={col} className={styles.kanbanColumn}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase' }}>{colLabel}</span>
                    <span className={styles.itemBadge} style={{ background: 'rgba(255,255,255,0.04)' }}>{colTasks.length}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1 }}>
                    {colTasks.map(t => (
                      <div key={t.id} style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{t.title}</span>
                          <span style={{ fontSize: '0.65rem', padding: '0.15rem 0.35rem', borderRadius: '4px', background: t.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : t.priority === 'Medium' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(59, 130, 246, 0.1)', color: t.priority === 'High' ? '#fca5a5' : t.priority === 'Medium' ? '#fcd34d' : '#93c5fd' }}>
                            {t.priority}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: '0 0 0.85rem 0' }}>{t.desc}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          <span>Due: {t.dueDate}</span>
                          <div style={{ display: 'flex', gap: '0.25rem' }}>
                            {col !== 'todo' && (
                              <button onClick={() => shiftTaskStatus(t.id, 'backward')} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#fff', cursor: 'pointer', borderRadius: '3px', padding: '0.1rem 0.35rem' }}>◀</button>
                            )}
                            {col !== 'done' && (
                              <button onClick={() => shiftTaskStatus(t.id, 'forward')} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#fff', cursor: 'pointer', borderRadius: '3px', padding: '0.1rem 0.35rem' }}>▶</button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {colTasks.length === 0 && (
                      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.02)', borderRadius: '8px', minHeight: '120px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No Tasks</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* C. CALENDAR VIEW */}
      {projSubTab === 'calendar' && (
        <div className={`${styles.analyticsChartCard} glass-card`}>
          <h3 className={styles.chartTitle} style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Milestone & Task Deadlines - July 2026</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Visual representation of target scheduling calendars.</p>
          
          <div className={styles.calendarGrid}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className={styles.calendarHeaderCell}>{d}</div>
            ))}
            
            {/* Simulated Grid cells from July 1st to 28th */}
            {Array.from({ length: 28 }).map((_, idx) => {
              const dayNum = idx + 1;
              const formattedDate = `2026-07-${dayNum < 10 ? '0' + dayNum : dayNum}`;
              
              // Find matching milestones/tasks
              const dayMilestones = activeProject.milestones.filter(m => m.dueDate === formattedDate);
              const dayTasks = activeProject.tasks.filter(t => t.dueDate === formattedDate);
              const hasEvents = dayMilestones.length > 0 || dayTasks.length > 0;

              return (
                <div key={idx} className={`${styles.calendarCell} ${hasEvents ? styles.calendarCellActive : ''}`}>
                  <span className={styles.calendarDateNum}>{dayNum}</span>
                  <div>
                    {dayMilestones.map((m, i) => (
                      <div key={i} className={styles.calendarEvent} style={{ borderColor: 'rgba(16,185,129,0.3)', color: '#34d399', background: 'rgba(16,185,129,0.08)' }} title={m.title}>
                        🏳 {m.title}
                      </div>
                    ))}
                    {dayTasks.map((t, i) => (
                      <div key={i} className={styles.calendarEvent} title={t.title}>
                        ⚙ {t.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* D. FILES & ASSETS */}
      {projSubTab === 'files' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem' }}>
          {/* Files List */}
          <div className={`${styles.crmTableCard} glass-card`} style={{ border: 'none', padding: '0' }}>
            <h3 className={styles.tableTitle} style={{ padding: '1.5rem' }}>Project Directory Files</h3>
            <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
              {activeProject.files.map((file, idx) => (
                <div key={idx} className={styles.fileRow}>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: '0 0 0.2rem 0' }}>📄 {file.name}</h4>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Size: {file.size} • Uploaded by {file.uploadedBy} on {file.uploadedAt}
                    </span>
                  </div>
                  <button onClick={() => alert(`Mock downloading file: ${file.name}`)} className={styles.dlBtn} style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}>
                    Download
                  </button>
                </div>
              ))}
              {activeProject.files.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No files uploaded yet.</div>
              )}
            </div>
          </div>

          {/* Add file mockup */}
          <div className={`${styles.analyticsChartCard} glass-card`}>
            <h3 className={styles.chartTitle} style={{ fontSize: '1rem' }}>Upload Project Asset</h3>
            <form onSubmit={handleUploadFile} style={{ marginTop: '1.25rem' }}>
              <div className={styles.crmFormGroup}>
                <label>Mock File Name</label>
                <input 
                  type="text" 
                  required
                  value={fileName} 
                  onChange={e => setFileName(e.target.value)} 
                  placeholder="e.g. system_architecture_draft.docx"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff', padding: '0.5rem 0.75rem', outline: 'none' }}
                />
              </div>
              <button type="submit" className={styles.addLeadBtn} style={{ marginTop: '1.25rem' }}>
                Upload Mock File
              </button>
            </form>
          </div>
        </div>
      )}

      {/* E. DISCUSSIONS & COMMENTS */}
      {projSubTab === 'comments' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem' }}>
          {/* Comments Feed */}
          <div className={`${styles.crmTableCard} glass-card`} style={{ border: 'none', padding: '0' }}>
            <h3 className={styles.tableTitle} style={{ padding: '1.5rem' }}>Discussions Stream</h3>
            <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activeProject.comments.map((comment, idx) => (
                <div key={idx} className={styles.commentBubble}>
                  <div className={styles.commentHeader}>
                    <span style={{ fontWeight: 700, color: '#a5b4fc' }}>{comment.author}</span>
                    <span>{comment.timestamp}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5', margin: 0 }}>
                    {comment.text}
                  </p>
                </div>
              ))}
              {activeProject.comments.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No discussions logs yet. Start the thread!</div>
              )}
            </div>
          </div>

          {/* Post Comment form */}
          <div className={`${styles.analyticsChartCard} glass-card`}>
            <h3 className={styles.chartTitle} style={{ fontSize: '1rem' }}>Post Project Update</h3>
            <form onSubmit={handlePostComment} style={{ marginTop: '1.25rem' }}>
              <div className={styles.crmFormGroup}>
                <label>Comment Message</label>
                <textarea 
                  required
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                  placeholder="Post status logs update details..."
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff', padding: '0.5rem 0.75rem', outline: 'none', height: '100px', resize: 'vertical' }}
                />
              </div>
              <button type="submit" className={styles.addLeadBtn} style={{ marginTop: '1.25rem' }}>
                Post Comment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────
          INLINE DIALOG MODALS
      ────────────────────────────────────────── */}

      {/* 1. Add Project Modal */}
      {showAddProject && (
        <div className={styles.crmModalOverlay}>
          <div className={`${styles.crmModalContent} glass-card`}>
            <h3 className={styles.modalTitle}>Create New Project</h3>
            <form onSubmit={handleAddProject}>
              <div className={styles.crmFormRow}>
                <div className={styles.crmFormGroup}>
                  <label>Project Name *</label>
                  <input type="text" required value={newProjName} onChange={e => setNewProjName(e.target.value)} placeholder="e.g. Counselor chatbot" />
                </div>
                <div className={styles.crmFormGroup}>
                  <label>Client Name *</label>
                  <input type="text" required value={newProjClient} onChange={e => setNewProjClient(e.target.value)} placeholder="e.g. IIT Academy Pune" />
                </div>
              </div>

              <div className={styles.crmFormRow}>
                <div className={styles.crmFormGroup}>
                  <label>Target Deadline *</label>
                  <input type="date" required value={newProjDeadline} onChange={e => setNewProjDeadline(e.target.value)} />
                </div>
                <div className={styles.crmFormGroup} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem', marginTop: '1.75rem' }}>
                  <input type="checkbox" id="clientVisibleCheck" checked={newProjVisible} onChange={e => setNewProjVisible(e.target.checked)} style={{ width: 'auto', cursor: 'pointer' }} />
                  <label htmlFor="clientVisibleCheck" style={{ margin: 0, cursor: 'pointer' }}>Client Visibility Default</label>
                </div>
              </div>

              <div className={styles.crmFormGroup}>
                <label>Assign Core Staff</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.4rem' }}>
                  {['Shubham Narute', 'Snehal Patil', 'Swapnil Shinde'].map(name => {
                    const isChecked = newProjAssignees.includes(name);
                    return (
                      <button 
                        key={name}
                        type="button"
                        onClick={() => toggleAssignee(name)}
                        className={styles.statusPill}
                        style={{ 
                          cursor: 'pointer',
                          background: isChecked ? 'rgba(124, 58, 237, 0.15)' : 'rgba(255,255,255,0.02)', 
                          color: isChecked ? '#c084fc' : 'var(--text-muted)', 
                          border: isChecked ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(255,255,255,0.08)' 
                        }}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowAddProject(false)} className={styles.crmModalCancelBtn}>
                  Cancel
                </button>
                <button type="submit" className={styles.addLeadBtn}>
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Add Task Modal */}
      {showAddTask && (
        <div className={styles.crmModalOverlay}>
          <div className={`${styles.crmModalContent} glass-card`}>
            <h3 className={styles.modalTitle}>Add Kanban Task</h3>
            <form onSubmit={handleAddTask}>
              <div className={styles.crmFormGroup}>
                <label>Task Title *</label>
                <input type="text" required value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} placeholder="e.g. Optimize coefficients regression loop" />
              </div>
              <div className={styles.crmFormGroup}>
                <label>Task Description</label>
                <textarea value={newTaskDesc} onChange={e => setNewTaskDesc(e.target.value)} placeholder="Provide task detail logs..." />
              </div>

              <div className={styles.crmFormRow}>
                <div className={styles.crmFormGroup}>
                  <label>Priority Level</label>
                  <select value={newTaskPriority} onChange={e => setNewTaskPriority(e.target.value as any)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className={styles.crmFormGroup}>
                  <label>Task Deadline *</label>
                  <input type="date" required value={newTaskDueDate} onChange={e => setNewTaskDueDate(e.target.value)} />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowAddTask(false)} className={styles.crmModalCancelBtn}>
                  Cancel
                </button>
                <button type="submit" className={styles.addLeadBtn}>
                  Add Kanban Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

