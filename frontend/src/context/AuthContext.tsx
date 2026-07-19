'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Client-side secure cookie utilities
export function setCookie(name: string, value: string, days = 7) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  let domainStr = '';
  if (typeof window !== 'undefined' && window.location.hostname.endsWith('engineeringpathai.in')) {
    domainStr = '; domain=.engineeringpathai.in';
  }
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/${domainStr}; SameSite=Lax; Secure`;
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export function deleteCookie(name: string) {
  setCookie(name, '', -1);
}

// Custom JWT Decoder
function decodeJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export interface UserSession {
  name: string;
  email: string;
  role: 'Admin' | 'Client' | 'Student' | 'Employee';
}

interface AuthContextType {
  user: UserSession | null;
  role: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, userData: UserSession) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for cookie token on init
    const token = getCookie('token');
    if (token) {
      const decoded = decodeJwt(token);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setUser({
          name: decoded.name || 'User',
          email: decoded.sub || '',
          role: decoded.role || 'Student'
        });
      } else {
        deleteCookie('token');
      }
    }
    setLoading(false);

    // Global fetch interceptor to automatically append JWT bearer token
    if (typeof window !== 'undefined') {
      const originalFetch = window.fetch;
      window.fetch = async function (input, init) {
        const token = getCookie('token');
        if (token) {
          const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
          const inputStr = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
          if (inputStr.startsWith(apiURL)) {
            init = init || {};
            const headers = new Headers(init.headers || {});
            if (!headers.has('Authorization')) {
              headers.set('Authorization', `Bearer ${token}`);
            }
            init.headers = headers;
          }
        }
        return originalFetch.call(this, input, init);
      };
    }
  }, []);

  const login = (token: string, userData: UserSession) => {
    setCookie('token', token, 7);
    setUser(userData);
  };

  const logout = () => {
    deleteCookie('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isAuthenticated: !!user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
