// utils/supabase.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ssbjudrizasyltmnxfxy.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzYmp1ZHJpemFzeWx0bW54Znh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2NTU0NDMsImV4cCI6MjA2MjIzMTQ0M30.pFh9fjDVm7lMJ8uSuEhvEkAebqrqwb0BUt92N5aSVw8'; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
