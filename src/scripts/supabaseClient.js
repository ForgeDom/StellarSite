import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lcxxsncqvkkvefzybdeb.supabase.co';
const supabaseKey = 'sb_publishable_8QPmg_Ug09JVDS_Za0ugjA_4wBJ6JMP';

export const supabase = createClient(supabaseUrl, supabaseKey);