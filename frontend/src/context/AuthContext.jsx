import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, { token, ...options } = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || 'Something went wrong. Please try again.');
  return result.data;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('sweety_token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    request('/auth/me', { token }).then(({ user: current }) => setUser(current)).catch(() => {
      localStorage.removeItem('sweety_token'); setToken(null); setUser(null);
    }).finally(() => setLoading(false));
  }, [token]);

  const value = useMemo(() => ({
    user, token, loading,
    async signIn(path, details) {
      const data = await request(path, { method: 'POST', body: JSON.stringify(details) });
      localStorage.setItem('sweety_token', data.token); setToken(data.token); setUser(data.user); return data.user;
    },
    signOut() { localStorage.removeItem('sweety_token'); setToken(null); setUser(null); },
    api: (path, options = {}) => request(path, { ...options, token }),
  }), [user, token, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
