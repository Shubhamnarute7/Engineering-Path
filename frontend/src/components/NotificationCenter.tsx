'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './NotificationCenter.module.css';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  channel: string;
  read: boolean;
  date: string;
}

export default function NotificationCenter() {
  const [notifs, setNotifs] = useState<NotificationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'ALL' | 'UNREAD'>('ALL');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifs = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/notifications`);
      const data = await res.json();
      if (res.ok && data.notifications) {
        setNotifs(data.notifications);
      }
    } catch (e) {
      console.warn("FastAPI offline, using mock notifications");
    }
  };

  // Real-time Updates (Polling every 20 seconds)
  useEffect(() => {
    fetchNotifs();
    const interval = setInterval(fetchNotifs, 20000);
    return () => clearInterval(interval);
  }, []);

  // Request browser push notification permissions on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, []);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      fetchNotifs();
    }
  };

  const handleMarkRead = async (id: string, read: boolean) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/notifications/${id}/read`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read })
      });
      if (res.ok) {
        setNotifs(notifs.map(n => n.id === id ? { ...n, read } : n));
      }
    } catch (e) {
      setNotifs(notifs.map(n => n.id === id ? { ...n, read } : n));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/notifications/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setNotifs(notifs.filter(n => n.id !== id));
      }
    } catch (e) {
      setNotifs(notifs.filter(n => n.id !== id));
    }
  };

  const handleMarkAllRead = async () => {
    const unread = notifs.filter(n => !n.read);
    for (const n of unread) {
      await handleMarkRead(n.id, true);
    }
  };

  // Browser Push API Mock helper
  const triggerBrowserPush = (title: string, body: string) => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/logo.jpg'
      });
    }
  };

  // Trigger test notification simulation
  const handleTriggerSimulation = async () => {
    const SIMULATED_EVENTS = [
      {
        title: "New Course Inquiry",
        message: "Chate Classes Pune inquired about WhatsApp Chatbot integration details.",
        type: "in-app",
        channel: "leads"
      },
      {
        title: "Admissions Predictor Hit",
        message: "Student Shubham Narute run CET rank model with percentile score 98.6%.",
        type: "push",
        channel: "admissions"
      },
      {
        title: "Invoice Generated",
        message: "Growth subscription invoice INV-2026-004 generated for IIT Prep (₹9,999).",
        type: "email",
        channel: "payments"
      },
      {
        title: "Resume Uploaded",
        message: "Ramesh Deshmukh submitted application for Frontend Developer opening.",
        type: "in-app",
        channel: "admissions"
      }
    ];

    const randomEvent = SIMULATED_EVENTS[Math.floor(Math.random() * SIMULATED_EVENTS.length)];

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(randomEvent)
      });
      const data = await res.json();
      if (res.ok && data.notification) {
        setNotifs([data.notification, ...notifs]);
        
        // 1. Browser Push Trigger
        triggerBrowserPush(data.notification.title, data.notification.message);
        
        // 2. Email log representation
        if (data.notification.type === 'email') {
          alert(`📧 [Simulation] Email Dispatch Complete:\nTo: Recruiter / Admin\nSubject: ${data.notification.title}\nBody: ${data.notification.message}`);
        } else if (data.notification.type === 'push') {
          alert(`🔔 [Simulation] Browser push notification triggered: "${data.notification.title}"`);
        }
      }
    } catch (e) {
      // Local fallback insertion
      const mockNotif: NotificationItem = {
        id: `notif_mock_${Date.now()}`,
        title: randomEvent.title,
        message: randomEvent.message,
        type: randomEvent.type,
        channel: randomEvent.channel,
        read: false,
        date: new Date().toLocaleTimeString()
      };
      setNotifs([mockNotif, ...notifs]);
      triggerBrowserPush(mockNotif.title, mockNotif.message);
      alert(`Local memory simulation fallback triggered: ${mockNotif.title}`);
    }
  };

  const getIconClass = (channel: string) => {
    switch (channel) {
      case 'admissions': return `${styles.iconWrapper} ${styles.iconAdmissions}`;
      case 'payments': return `${styles.iconWrapper} ${styles.iconPayments}`;
      case 'leads': return `${styles.iconWrapper} ${styles.iconLeads}`;
      default: return `${styles.iconWrapper} ${styles.iconSystem}`;
    }
  };

  const getIconSVG = (channel: string) => {
    switch (channel) {
      case 'admissions':
        return <svg style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
      case 'payments':
        return <svg style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'leads':
        return <svg style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>;
      default:
        return <svg style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    }
  };

  const unreadCount = notifs.filter(n => !n.read).length;
  const filteredNotifs = filter === 'ALL' ? notifs : notifs.filter(n => !n.read);

  return (
    <div className={styles.notificationCenterWrapper} ref={dropdownRef}>
      <button className={styles.bellBtn} onClick={handleToggleOpen} aria-label="Open Notifications Drawer">
        <svg className={styles.bellIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className={`${styles.dropdown} glass-card`}>
          <div className={styles.header}>
            <h4 className={styles.headerTitle}>Notifications</h4>
            {unreadCount > 0 && (
              <button className={styles.markAllBtn} onClick={handleMarkAllRead}>
                Mark all read
              </button>
            )}
          </div>

          <div className={styles.list}>
            {filteredNotifs.length > 0 ? (
              filteredNotifs.map(n => (
                <div key={n.id} className={`${styles.item} ${!n.read ? styles.unreadItem : ''}`}>
                  <div className={getIconClass(n.channel)}>
                    {getIconSVG(n.channel)}
                  </div>
                  
                  <div className={styles.itemContent} onClick={() => !n.read && handleMarkRead(n.id, true)}>
                    <div className={styles.itemTitle}>{n.title}</div>
                    <div className={styles.itemMessage}>{n.message}</div>
                    <div className={styles.itemMeta}>
                      <span className={styles.channelBadge}>{n.channel}</span>
                      <span>{n.date}</span>
                    </div>
                  </div>

                  <div className={styles.itemActions}>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(n.id)} title="Delete Notification">
                      <svg style={{ width: 14, height: 14 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noNotifs}>
                No notifications to display.
              </div>
            )}
          </div>

          <div className={styles.footer}>
            <div className={styles.filterRow}>
              <button 
                className={`${styles.filterBtn} ${filter === 'ALL' ? styles.filterBtnActive : ''}`}
                onClick={() => setFilter('ALL')}
              >
                All
              </button>
              <button 
                className={`${styles.filterBtn} ${filter === 'UNREAD' ? styles.filterBtnActive : ''}`}
                onClick={() => setFilter('UNREAD')}
              >
                Unread
              </button>
            </div>
            
            <button className={styles.simulationBtn} onClick={handleTriggerSimulation}>
              ⚡ Simulate Incoming Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
