import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hyxrbanxbwmqqsawvqin.supabase.co";

export const supabase = createClient(
  supabaseUrl,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
