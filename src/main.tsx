import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { authService } from './services/authService';

// Automatic security interceptor: Attach session bearer token & user context to all /api/ requests
const originalFetch = window.fetch;
window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;

  if (url.startsWith('/api') || url.includes('/api/')) {
    const token = authService.getToken();
    const storedUser = authService.getStoredUser();

    const headers = new Headers(init?.headers || {});
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    if (storedUser?.email && !headers.has('x-user-email')) {
      headers.set('x-user-email', storedUser.email);
    }
    if (storedUser?.role && !headers.has('x-user-role')) {
      headers.set('x-user-role', storedUser.role);
    }

    return originalFetch(input, {
      ...init,
      headers
    });
  }

  return originalFetch(input, init);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
