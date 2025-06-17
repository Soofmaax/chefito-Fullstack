import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate URL format
const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

if (!supabaseUrl || !isValidUrl(supabaseUrl)) {
  throw new Error('SUPABASE_URL is missing or invalid. Please set a valid Supabase project URL in your .env file (e.g., https://your-project-ref.supabase.co)');
}

if (!supabaseAnonKey) {
  throw new Error('SUPABASE_ANON_KEY is missing. Please set your Supabase anonymous key in your .env file');
}

if (!supabaseServiceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing. Please set your Supabase service role key in your .env file');
}

// Client for general operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for service role operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export const supabaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  serviceRoleKey: supabaseServiceRoleKey,
};