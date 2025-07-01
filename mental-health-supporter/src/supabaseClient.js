import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xefixsbzpcneaxgnqsav.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlZml4c2J6cGNuZWF4Z25xc2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NTQzNDUsImV4cCI6MjA2NTIzMDM0NX0.B_rpU_JBiy8YGnvX-DeBid08VVTlUZqFxd1CQNFYcgg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
