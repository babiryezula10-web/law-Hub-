import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  VITE_GOOGLE_CLIENT_ID: process.env.VITE_GOOGLE_CLIENT_ID || '',
  SUPABASE_URL: process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '',
  DATA_DIR: path.join(process.cwd(), 'data'),
  DB_FILE: path.join(process.cwd(), 'data', 'lawhub_store.json'),
  RATE_LIMIT_MAX_ATTEMPTS: 5,
  RATE_LIMIT_LOCK_MINUTES: 5,
  SESSION_EXPIRY_HOURS: 24,
};
