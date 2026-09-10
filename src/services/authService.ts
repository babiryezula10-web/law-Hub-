import { UserProfile, UserRole } from '../types';

const TOKEN_KEY = 'lawhub_auth_token';
const PROFILE_KEY = 'lawhub_student_profile';

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: any;
  error?: string;
  message?: string;
}

export const authService = {
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setToken(token: string) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {}
  },

  removeToken() {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {}
  },

  getStoredUser(): UserProfile | null {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  setStoredUser(user: UserProfile) {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(user));
    } catch {}
  },

  getAuthHeaders(): HeadersInit {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password })
      });

      const data = await res.json();
      if (res.ok && data.token && data.user) {
        this.setToken(data.token);
        return { success: true, token: data.token, user: data.user, message: data.message };
      }
      return { success: false, error: data.error || 'Authentication failed. Please check your credentials.' };
    } catch (err: any) {
      return { success: false, error: 'Network error communicating with authentication service.' };
    }
  },

  async loginWithGoogle(payload: { credential?: string; profile?: any }): Promise<AuthResponse> {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.token && data.user) {
        this.setToken(data.token);
        return { success: true, token: data.token, user: data.user, message: data.message };
      }
      return { success: false, error: data.error || 'Google Sign-In failed.' };
    } catch (err: any) {
      return { success: false, error: 'Network error during Google Sign-In.' };
    }
  },

  async register(data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    institution?: string;
    securityCode?: string;
  }): Promise<AuthResponse> {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const resData = await res.json();
      if (res.ok && resData.token && resData.user) {
        this.setToken(resData.token);
        return { success: true, token: resData.token, user: resData.user, message: resData.message };
      }
      return { success: false, error: resData.error || 'Registration failed.' };
    } catch (err: any) {
      return { success: false, error: 'Network error during account registration.' };
    }
  },

  async logout(): Promise<void> {
    try {
      const token = this.getToken();
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).catch(() => {});
      }
    } finally {
      this.removeToken();
    }
  }
};
