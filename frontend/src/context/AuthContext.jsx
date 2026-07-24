import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

function isTokenExpired(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch (e) {
    return true;
  }
}

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // If token appears expired, clear it immediately to force re-login
      if (isTokenExpired(token)) {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        delete axios.defaults.headers.common.Authorization;
      } else {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password, rememberMe) => {
    const response = await axios.post('/api/auth/login', { email, password });
    const { token: authToken, user: authUser } = response.data;
    setToken(authToken);
    setUser(authUser);
    if (rememberMe) {
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(authUser));
    } else {
      sessionStorage.setItem('token', authToken);
      sessionStorage.setItem('user', JSON.stringify(authUser));
    }
    return response.data;
  };

  const logout = async () => {
    await axios.post('/api/auth/logout');
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  };

  const value = useMemo(() => ({ user, token, loading, login, logout }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
