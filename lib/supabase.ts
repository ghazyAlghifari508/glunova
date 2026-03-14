import { createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

const getSupabaseConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, anonKey };
};

// Client for Browser/Client-side use (Cookies) - lazily initialized
export const getSupabase = () => {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) return null; // Safe for build analysis
  return createBrowserClient(url, anonKey);
};

// Admin client for server-side operations (bypasses RLS)
export const getSupabaseAdmin = () => {
  const { url } = getSupabaseConfig();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error('Supabase admin config is missing');
  }
  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};
