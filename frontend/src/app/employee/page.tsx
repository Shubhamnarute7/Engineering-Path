'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './employee.module.css';

interface SidebarItem {
  id: string;
  label: string;
  badge?: number;
  icon: React.ReactNode;
}

interface AssignedProject {
  id: string;
  name: string;
  role: string;
  dueDate: string;
  progress: number;
}

interface EmployeeTask {
  id: string;
  title: string;
  desc: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'todo' | 'inprogress' | 'done';
}

interface AttendanceLog {
  date: string;
  clockIn: string;
  clockOut: string;
  status: 'Present' | 'Late' | 'Absent';
}

interface LeaveRequest {
  id: string;
  category: string;
  dates: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface Payslip {
  month: string;
  amount: string;
  deductions: string;
  netPay: string;
  status: string;
}

interface SyncMeeting {
  id: string;
  title: string;
  time: string;
  duration: string;
  link: string;
}

export default function EmployeeDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // ──────────────────────────────────────────
  // SIDEBAR ITEMS DEFINITIONS
  // ──────────────────────────────────────────
  const SIDEBAR_ITEMS: SidebarItem[] = [
    {
      id: 'overview',
      label: 'Overview & Projects',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    },
    {
      id: 'tasks',
      label: 'Tasks Manager',
      badge: 2,
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
    },
    {
      id: 'attendance',
      label: 'Attendance & KPIs',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      id: 'salary',
      label: 'Salary & Payslips',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      id: 'leaves',
      label: 'Leaves Planner',
      badge: 1,
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    },
    {
      id: 'meetings',
      label: 'Meetings Sync',
      icon: <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
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

  // ──────────────────────────────────────────
  // DYNAMIC COMPONENT STATES
  // ──────────────────────────────────────────
  const [tasksList, setTasksList] = useState<EmployeeTask[]>([
    { id: 'TSK-101', title: 'Optimize Cutoff prediction loop', desc: 'Refactor uvicorn endpoints data preprocessing vectors.', priority: 'High', status: 'todo' },
    { id: 'TSK-102', title: 'Write Meta Ads copy variations', desc: 'Create 5 ad copy files for Pune NEET coaching clients.', priority: 'Medium', status: 'inprogress' },
    { id: 'TSK-103', title: 'Configure checkout failure screens', desc: 'Implement error diagnostic display code templates.', priority: 'Low', status: 'done' }
  ]);

  const [attendance, setAttendance] = useState<AttendanceLog[]>([
    { date: 'Jul 15, 2026', clockIn: '09:12 AM', clockOut: '06:05 PM', status: 'Present' },
    { date: 'Jul 16, 2026', clockIn: '09:05 AM', clockOut: '06:10 PM', status: 'Present' },
    { date: 'Jul 17, 2026', clockIn: '09:40 AM', clockOut: '06:02 PM', status: 'Late' }
  ]);

  const [leaves, setLeaves] = useState<LeaveRequest[]>([
    { id: 'LV-482', category: 'Medical Leave', dates: 'Aug 10 - Aug 12', reason: 'Routine health checkup cycle.', status: 'Approved' }
  ]);

  const [checkedIn, setCheckedIn] = useState(false);
  const [punchTime, setPunchTime] = useState('');

  const handlePunchToggle = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (!checkedIn) {
      setCheckedIn(true);
      setPunchTime(timeStr);
      // Appends log
      const newLog: AttendanceLog = {
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        clockIn: timeStr,
        clockOut: '--:--',
        status: 'Present'
      };
      setAttendance([newLog, ...attendance]);
    } else {
      setCheckedIn(false);
      // Updates checkout time
      setAttendance(attendance.map((a, idx) => idx === 0 ? { ...a, clockOut: timeStr } : a));
    }
  };

  return (
    <div className={styles.employeeLayout}>
      
      {/* Sidebar Navigation */}
      <aside className={`${styles.sidebar} ${mobileSidebarOpen ? styles.sidebarOpen : ''}`}>
        
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogoText}>
            <img src="/logo.jpg" alt="Logo" style={{ width: 28, height: 28, borderRadius: '50%' }} />
            Staff Portal
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
          <div className={styles.employeeProfileInfo}>
            <div className={styles.avatar}>E</div>
            <div className={styles.employeeMeta}>
              <h5>{user?.name || 'Employee Staff'}</h5>
              <span>{user?.role || 'Team Developer'}</span>
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
            💼 Employee Sync • Work Console
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
          <div className={styles.avatar} style={{ width: 32, height: 32 }}>E</div>
        </div>

        {/* Tab Router Switch */}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'tasks' && <TasksTab tasks={tasksList} setTasks={setTasksList} />}
        {activeTab === 'attendance' && (
          <AttendanceTab 
            checkedIn={checkedIn} 
            punchTime={punchTime} 
            handlePunchToggle={handlePunchToggle} 
            attendance={attendance} 
          />
        )}
        {activeTab === 'salary' && <SalaryTab />}
        {activeTab === 'leaves' && <LeavesTab leaves={leaves} setLeaves={setLeaves} />}
        {activeTab === 'meetings' && <MeetingsTab />}
        {activeTab === 'notifications' && <NotificationsTab />}
        {activeTab === 'settings' && <SettingsTab />}

      </main>

    </div>
  );
}

// ──────────────────────────────────────────
// TAB CONTENT MODULE DETAILS
// ──────────────────────────────────────────

// 1. Overview & Projects Tab
function OverviewTab() {
  const PROJECTS: AssignedProject[] = [
    { id: 'PRJ-001', name: 'IIT Academy Counselor Bot', role: 'Lead Integration Architect', dueDate: 'Jul 24, 2026', progress: 85 },
    { id: 'PRJ-002', name: 'Next.js Website Cutoffs predictive grid', role: 'Software Engineer', dueDate: 'Aug 12, 2026', progress: 42 }
  ];

  const MILESTONES = [
    { time: 'Jul 15, 2026', text: 'Verified merit list regression database accuracy values.' },
    { time: 'Jul 12, 2026', text: 'Configured security Edge Middleware guards for dashboards.' },
    { time: 'Jun 28, 2026', text: 'Joined EngineeringPath AI team as Associate Developer.' }
  ];

  return (
    <div>
      <h2 style={{ fontSize: '1.1rem', color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>Assigned Core Projects</h2>
      <div className={styles.employeeGrid}>
        {PROJECTS.map((p) => (
          <div key={p.id} className={`${styles.dashboardCard} glass-card`}>
            <div className={styles.cardGlow} style={{ background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.08) 0%, transparent 65%)' }} />
            <div className={styles.cardHeader}>
              <span className={styles.statusPill} style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#c084fc', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
                {p.id}
              </span>
            </div>
            <h3 className={styles.cardTitle}>{p.name}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.5rem 0' }}>Role: <strong>{p.role}</strong></p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Due: {p.dueDate}</p>
            
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                <span>Completion progress</span>
                <span>{p.progress}%</span>
              </div>
              <div style={{ height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                <div style={{ height: '100%', width: `${p.progress}%`, background: 'linear-gradient(90deg, var(--primary), var(--secondary))', borderRadius: '10px' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline Section */}
      <div className={`${styles.dashboardCard} glass-card`} style={{ marginTop: '2.5rem' }}>
        <h3 className={styles.cardTitle}>Activity Timeline</h3>
        <div className={styles.timelineWrapper}>
          {MILESTONES.map((m, idx) => (
            <div key={idx} className={styles.timelineNode}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineTime}>{m.time}</div>
              <div className={styles.timelineText}>{m.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 2. Tasks Manager Tab (Kanban board)
function TasksTab({ 
  tasks, 
  setTasks 
}: { 
  tasks: EmployeeTask[]; 
  setTasks: React.Dispatch<React.SetStateAction<EmployeeTask[]>>; 
}) {

  const moveTask = (taskId: string, direction: 'forward' | 'backward') => {
    const statuses: EmployeeTask['status'][] = ['todo', 'inprogress', 'done'];
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        const curIdx = statuses.indexOf(t.status);
        let nextIdx = curIdx + (direction === 'forward' ? 1 : -1);
        if (nextIdx >= 0 && nextIdx < statuses.length) {
          return { ...t, status: statuses[nextIdx] };
        }
      }
      return t;
    }));
  };

  return (
    <div className={styles.taskWrapper}>
      <div className={styles.taskBoard}>
        {(['todo', 'inprogress', 'done'] as const).map(col => {
          const colTasks = tasks.filter(t => t.status === col);
          const colLabel = col === 'todo' ? 'To Do' : col === 'inprogress' ? 'In Progress' : 'Done';
          return (
            <div key={col} className={styles.taskColumn}>
              <div className={styles.columnHeader}>
                <h4>{colLabel}</h4>
                <span className={styles.itemBadge}>{colTasks.length}</span>
              </div>

              <div className={styles.taskList}>
                {colTasks.map(t => (
                  <div key={t.id} className={styles.taskCard}>
                    <div className={styles.taskTitle}>{t.title}</div>
                    <p className={styles.taskDesc}>{t.desc}</p>
                    
                    <div className={styles.taskFooter}>
                      <span className={`${styles.priorityBadge} ${
                        t.priority === 'High' ? styles.prioHigh : 
                        t.priority === 'Medium' ? styles.prioMed : styles.prioLow
                      }`}>
                        {t.priority}
                      </span>
                      
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        {col !== 'todo' && (
                          <button onClick={() => moveTask(t.id, 'backward')} className={styles.actionBtn}>◀</button>
                        )}
                        {col !== 'done' && (
                          <button onClick={() => moveTask(t.id, 'forward')} className={styles.actionBtn}>▶</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {colTasks.length === 0 && (
                  <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.03)', borderRadius: '8px', padding: '2rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>No Tasks</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 3. Attendance & KPIs Tab
function AttendanceTab({
  checkedIn,
  punchTime,
  handlePunchToggle,
  attendance
}: {
  checkedIn: boolean;
  punchTime: string;
  handlePunchToggle: () => void;
  attendance: AttendanceLog[];
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem' }}>
      
      {/* Attendance log lists */}
      <div className={styles.salaryTableCard}>
        <h3 className={styles.cardTitle} style={{ marginBottom: '1.5rem' }}>Attendance Register</h3>
        <table className={styles.salaryTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((log, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 700 }}>{log.date}</td>
                <td>{log.clockIn}</td>
                <td>{log.clockOut}</td>
                <td>
                  <span className={`${styles.statusPill} ${
                    log.status === 'Present' ? styles.statusPresent : styles.statusLate
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Punch Card Toggles & KPIs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Toggle punch button */}
        <div className={`${styles.dashboardCard} ${styles.punchCard} glass-card`}>
          <button 
            onClick={handlePunchToggle}
            className={`${styles.punchBtn} ${checkedIn ? styles.punchOut : styles.punchIn}`}
          >
            {checkedIn ? (
              <>
                <span>Clock Out</span>
                <span className={styles.punchTime}>Active: {punchTime}</span>
              </>
            ) : (
              <span>Clock In</span>
            )}
          </button>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            {checkedIn ? 'Your shift is active. Click to end shift.' : 'Tap button to log check-in timestamp.'}
          </p>
        </div>

        {/* KPIs score */}
        <div className={`${styles.dashboardCard} glass-card`}>
          <h3 className={styles.cardTitle}>Performance Indicator (KPI)</h3>
          <div className={styles.kpiValue}>9.4 / 10</div>
          <span className={styles.kpiLabel}>Based on task completions and timely delivery weights.</span>
        </div>

      </div>

    </div>
  );
}

// 4. Salary & Payslips Tab
function SalaryTab() {
  const PAYSLIPS: Payslip[] = [
    { month: 'June 2026', amount: '₹62,500', deductions: '₹2,500', netPay: '₹60,000', status: 'Deposited' },
    { month: 'May 2026', amount: '₹62,500', deductions: '₹2,500', netPay: '₹60,000', status: 'Deposited' },
    { month: 'April 2026', amount: '₹62,500', deductions: '₹2,500', netPay: '₹60,000', status: 'Deposited' }
  ];

  return (
    <div className={styles.salaryTableCard}>
      <h3 className={styles.cardTitle} style={{ marginBottom: '1.5rem' }}>Payslips History Ledger</h3>
      <table className={styles.salaryTable}>
        <thead>
          <tr>
            <th>Billing Month</th>
            <th>Gross Salary</th>
            <th>Tax Deduct</th>
            <th>Net Paid Amount</th>
            <th>Payment Status</th>
            <th>Payslip Receipt</th>
          </tr>
        </thead>
        <tbody>
          {PAYSLIPS.map((slip, idx) => (
            <tr key={idx}>
              <td style={{ fontWeight: 700 }}>{slip.month}</td>
              <td>{slip.amount}</td>
              <td style={{ color: 'var(--text-muted)' }}>{slip.deductions}</td>
              <td style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{slip.netPay}</td>
              <td>
                <span className={`${styles.statusPill} ${styles.statusPresent}`}>{slip.status}</span>
              </td>
              <td>
                <button onClick={() => alert(`Downloading Payslip PDF: ${slip.month}`)} className={styles.dlBtn}>
                  Download Payslip
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 5. Leaves Planner Tab
function LeavesTab({ 
  leaves, 
  setLeaves 
}: { 
  leaves: LeaveRequest[]; 
  setLeaves: React.Dispatch<React.SetStateAction<LeaveRequest[]>>; 
}) {
  const [category, setCategory] = useState('Casual Leave');
  const [dates, setDates] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dates.trim() || !reason.trim()) return;

    const newReq: LeaveRequest = {
      id: `LV-${Math.floor(Math.random() * 900) + 100}`,
      category,
      dates,
      reason,
      status: 'Pending'
    };

    setLeaves([newReq, ...leaves]);
    setDates('');
    setReason('');
    alert('Leave request filed. Pending admin review approval.');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem' }}>
      
      {/* File Leave Request Form */}
      <div className={`${styles.dashboardCard} glass-card`}>
        <h3 className={styles.cardTitle}>Submit Leave Request</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
          <div className={styles.formGroup}>
            <label>Leave Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="Casual Leave">Casual Leave (Short time off)</option>
              <option value="Medical Leave">Medical Leave (Sick support)</option>
              <option value="Earned Leave">Earned Leave (Vacation cycle)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Target Dates *</label>
            <input type="text" required value={dates} onChange={e => setDates(e.target.value)} placeholder="e.g. Aug 15 - Aug 18" />
          </div>

          <div className={styles.formGroup}>
            <label>Leave Reason *</label>
            <textarea required value={reason} onChange={e => setReason(e.target.value)} placeholder="Write description explaining leave request..." />
          </div>

          <button type="submit" className={styles.submitBtn}>
            File Leave Request
          </button>
        </form>
      </div>

      {/* Leave Status History */}
      <div className={styles.salaryTableCard}>
        <h3 className={styles.cardTitle} style={{ marginBottom: '1.5rem' }}>Leaves History logs</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {leaves.map((l) => (
            <div key={l.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{l.id}</span>
                <span className={`${styles.statusPill} ${
                  l.status === 'Approved' ? styles.statusApproved : 
                  l.status === 'Pending' ? styles.statusPending : styles.statusRejected
                }`}>
                  {l.status}
                </span>
              </div>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>{l.category}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 0.5rem 0' }}>Dates: {l.dates}</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, fontStyle: 'italic' }}>Reason: {l.reason}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// 6. Meetings Sync Tab
function MeetingsTab() {
  const MEETINGS: SyncMeeting[] = [
    { id: '1', title: 'Daily Engineering Standup', time: '10:00 AM', duration: '30 mins', link: 'https://meet.google.com/abc-defg-hij' },
    { id: '2', title: 'Admissions data schema reviews sync', time: '02:00 PM', duration: '45 mins', link: 'https://meet.google.com/xyz-qprs-tuv' }
  ];

  return (
    <div className={styles.salaryTableCard}>
      <h3 className={styles.cardTitle} style={{ marginBottom: '1.5rem' }}>Today&apos;s Sync Schedule</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {MEETINGS.map((m) => (
          <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.25rem', borderRadius: '14px' }}>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.35rem 0', color: '#fff' }}>{m.title}</h4>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                ⏰ {m.time} ({m.duration})
              </div>
            </div>
            <a href={m.link} target="_blank" rel="noreferrer" className={styles.dlBtn} style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', border: 'none' }}>
              Join meeting
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

// 7. Notifications Tab
function NotificationsTab() {
  const ALERTS = [
    { title: 'Project priority shift: PRJ-001', desc: 'Tech Lead Shubham Narute advanced chatbot timeline requirements schedule.', time: '1 hour ago' },
    { title: 'Attendance checked verification: Jul 17', desc: 'SysAdmin accepted Late excuse details logs check.', time: '1 day ago' },
    { title: 'Payslip generated: June 2026 cycle', desc: 'Accounts department processed basic salaries net transactions.', time: '2 days ago' }
  ];

  return (
    <div className={styles.salaryTableCard}>
      <h3 className={styles.cardTitle} style={{ marginBottom: '1.5rem' }}>Alerts notifications log</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
    <div className={`${styles.dashboardCard} glass-card`}>
      <h3 className={styles.cardTitle}>Staff Profile Settings</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginTop: '1.5rem', marginBottom: '2rem' }}>
        <div className={styles.formGroup}>
          <label>Employee Designation</label>
          <input type="text" defaultValue="Associate Software Developer" readOnly style={{ opacity: 0.6, cursor: 'not-allowed' }} />
        </div>

        <div className={styles.formGroup}>
          <label>Core Skills Tags</label>
          <input type="text" defaultValue="Next.js, FastAPI, Python ML, PostgreSQL" />
        </div>

        <div className={styles.formGroup}>
          <label>Shift Timings</label>
          <input type="text" defaultValue="09:00 AM - 06:00 PM" readOnly style={{ opacity: 0.6, cursor: 'not-allowed' }} />
        </div>

        <div className={styles.formGroup}>
          <label>Work Email</label>
          <input type="email" defaultValue="developer@engineeringpath.ai" readOnly style={{ opacity: 0.6, cursor: 'not-allowed' }} />
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

      <button className={styles.submitBtn} onClick={() => alert('Staff credentials settings successfully saved.')}>
        Save Profile changes
      </button>
    </div>
  );
}
