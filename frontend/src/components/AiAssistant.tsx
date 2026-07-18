'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ai-assistant.module.css';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  fileAttached?: string;
}

const PRESETS = [
  { text: 'MHT-CET ML Predictor details?', query: 'How do I predict my MHT-CET College recommendation?' },
  { text: 'B2B subscription charges?', query: 'What are your B2B marketing setup charges?' },
  { text: 'How to request a refund?', query: 'How do I request a service refund?' },
  { text: 'Where to upload files?', query: 'Where can I upload project requirements?' }
];

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [fileAttached, setFileAttached] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const feedEndRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('assistant_chat_history');
    if (history) {
      try {
        setMessages(JSON.parse(history));
      } catch (e) {
        initializeDefault();
      }
    } else {
      initializeDefault();
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (updated: Message[]) => {
    setMessages(updated);
    localStorage.setItem('assistant_chat_history', JSON.stringify(updated));
  };

  const initializeDefault = () => {
    const welcome: Message = {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hello! I am your EngineeringPath AI virtual support assistant. Ask me about college cutoff rank predictions, campaign pricing plans, invoice refunds, or project uploads.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    saveHistory([welcome]);
  };

  // Scroll to bottom
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() && !fileAttached) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp,
      fileAttached: fileAttached || undefined
    };

    const newHistory = [...messages, userMsg];
    saveHistory(newHistory);
    
    // Clear input panel states
    setInput('');
    const attachedFileName = fileAttached;
    setFileAttached(null);

    // AI typing animation trigger
    setIsTyping(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          file_attached: attachedFileName
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Chat failed');

      const botMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      saveHistory([...newHistory, botMsg]);
    } catch (err: any) {
      // Offline fallback mock responses
      const offlineMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: `Network check complete: Simulated offline response. I received your prompt "${textToSend}". Connect FastAPI backend to resolve dynamic replies!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      saveHistory([...newHistory, offlineMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePresetClick = (query: string) => {
    handleSendMessage(query);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileAttached(file.name);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeAttachment = () => {
    setFileAttached(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Simulating Voice Recording Input
  const toggleVoiceRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Wait 3 seconds, mock speech translation text
      setTimeout(() => {
        setIsRecording(false);
        setInput('Show me engineering college recommendations details');
        alert('Voice Input Transcribed: "Show me engineering college recommendations details"');
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const clearChatHistory = () => {
    if (confirm('Clear assistant conversation history?')) {
      localStorage.removeItem('assistant_chat_history');
      initializeDefault();
    }
  };

  return (
    <div className={styles.assistantWrapper}>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.floatingBtn} ${isOpen ? styles.floatingBtnActive : ''}`}
        title="Open AI Assistant"
      >
        {isOpen ? (
          <svg style={{ width: 26, height: 26 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg style={{ width: 28, height: 28 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat window drawer */}
      {isOpen && (
        <div className={`${styles.chatDrawer} glass-card`}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.04) 0%, transparent 70%)' }} />
          
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerTitleRow}>
              <div className={styles.onlineIndicator} />
              <div className={styles.headerText}>
                <h4>AI Support Agent</h4>
                <span>Online • MHT-CET Assistant</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button onClick={clearChatHistory} className={styles.closeBtn} title="Clear Conversations">
                <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button onClick={() => setIsOpen(false)} className={styles.closeBtn} title="Minimize">
                <svg style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Message Stream Area */}
          <div className={styles.messageFeed}>
            {messages.map((m) => (
              <div key={m.id} className={`${styles.bubbleRow} ${m.sender === 'user' ? styles.rowUser : styles.rowAgent}`}>
                <div className={`${styles.messageBubble} ${m.sender === 'user' ? styles.userBubble : styles.agentBubble}`}>
                  {m.fileAttached && (
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.35rem 0.5rem', borderRadius: '6px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.4rem' }}>
                      📁 <span>Attached Asset: {m.fileAttached}</span>
                    </div>
                  )}
                  <div>{m.text}</div>
                  <span className={styles.bubbleMeta}>{m.timestamp}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className={`${styles.bubbleRow} ${styles.rowAgent}`}>
                <div className={`${styles.messageBubble} ${styles.agentBubble}`}>
                  <div className={styles.typingIndicator}>
                    <div className={styles.dot} />
                    <div className={styles.dot} />
                    <div className={styles.dot} />
                  </div>
                </div>
              </div>
            )}
            <div ref={feedEndRef} />
          </div>

          {/* Preset Chips */}
          <div className={styles.suggestionsContainer}>
            <span className={styles.suggestionsTitle}>Suggested Inquiries</span>
            <div className={styles.suggestionsWrapper}>
              {PRESETS.map((p, idx) => (
                <button key={idx} onClick={() => handlePresetClick(p.query)} className={styles.suggestionChip}>
                  {p.text}
                </button>
              ))}
            </div>
          </div>

          {/* Attachment display banner */}
          {fileAttached && (
            <div className={styles.attachmentBanner}>
              <span>📁 File Attached: <strong>{fileAttached}</strong></span>
              <button onClick={removeAttachment} className={styles.removeAttachmentBtn} title="Remove File">
                ✕
              </button>
            </div>
          )}

          {/* Chat input footer form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }} 
            className={styles.chatInputForm}
          >
            <div className={styles.inputControls}>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
              />
              <button type="button" onClick={triggerFileInput} className={styles.controlBtn} title="Attach Document / PDF">
                <svg style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <button 
                type="button" 
                onClick={toggleVoiceRecording} 
                className={`${styles.controlBtn} ${isRecording ? styles.micActive : ''}`} 
                title={isRecording ? 'Listening...' : 'Use Voice Input'}
              >
                <svg style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
            </div>

            <input 
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything..."
              className={styles.textInput}
            />

            <button type="submit" className={styles.sendBtn} title="Send Message">
              <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
