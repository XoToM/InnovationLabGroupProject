// utils/supabase.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vjhazdcohumvexuluuxb.supabase.co'; // 🔁 replace this
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqaGF6ZGNvaHVtdmV4dWx1dXhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1ODIxODUsImV4cCI6MjA2MjE1ODE4NX0.uf4-CaBicJqxw1wiCUhDTlcSSAqQnKlndCLqCgJTUbU'; // 🔁 replace this

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
