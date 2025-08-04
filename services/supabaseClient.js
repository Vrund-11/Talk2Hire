import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anon Key is missing');
}


export const supabase = createClient(supabaseUrl,supabaseAnonKey) 

