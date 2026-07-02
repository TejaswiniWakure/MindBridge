import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if token exists and fetch user profile
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('mindwell_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to load user session:', error);
        localStorage.removeItem('mindwell_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login handler
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Demo mock bypass logic
      if (email.includes('@mindwell.com')) {
        let mockRole = 'teen';
        if (email.startsWith('parent')) mockRole = 'parent';
        if (email.startsWith('therapist')) mockRole = 'therapist';
        if (email.startsWith('admin')) mockRole = 'admin';

        const mockUser = {
          id: 'mock-id',
          name: email.split('@')[0].toUpperCase(),
          email,
          role: mockRole,
        };
        setUser(mockUser);
        localStorage.setItem('mindwell_token', 'mock-token-jwt');
        setLoading(false);
        return { success: true, user: mockUser };
      }

      const response = await api.post('/auth/login', { email, password });
      const { token, user: loggedUser } = response.data;
      
      localStorage.setItem('mindwell_token', token);
      setUser(loggedUser);
      return { success: true, user: loggedUser };
    } catch (error) {
      console.error('Login error:', error);
      throw error.response?.data?.message || 'Login failed. Please check credentials.';
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const register = async (name, email, password, role) => {
    setLoading(true);
    try {
      // Demo mock bypass logic
      if (email.includes('@mindwell.com')) {
        const mockUser = {
          id: 'mock-id',
          name,
          email,
          role,
        };
        setUser(mockUser);
        localStorage.setItem('mindwell_token', 'mock-token-jwt');
        setLoading(false);
        return { success: true, user: mockUser };
      }

      const response = await api.post('/auth/register', { name, email, password, role });
      const { token, user: registeredUser } = response.data;

      localStorage.setItem('mindwell_token', token);
      setUser(registeredUser);
      return { success: true, user: registeredUser };
    } catch (error) {
      console.error('Registration error:', error);
      throw error.response?.data?.message || 'Registration failed.';
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('mindwell_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
