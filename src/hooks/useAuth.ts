import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (name: string, password: string) => Promise<void>;
  register: (name: string, email: string) => Promise<string>;
  logout: () => void;
}

const generatePassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 12 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
};

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  currentUser: null,
  login: async (name: string, password: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password })
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      if (data.success) {
        set({
          isAuthenticated: true,
          currentUser: data.user
        });
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  },
  register: async (name: string, email: string) => {
    const password = generatePassword();

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Registration failed');
      }

      const data = await response.json();
      if (data.success) {
        return password;
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (error) {
      throw error instanceof Error ? error : new Error('Registration failed. Please try again.');
    }
  },
  logout: () => {
    set({ isAuthenticated: false, currentUser: null });
  }
}));