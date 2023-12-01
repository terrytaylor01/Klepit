import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY } from "./supabaseKeyImport.js";

const supabaseUrl = "https://hyxrbanxbwmqqsawvqin.supabase.co";

export const supabase = createClient(supabaseUrl, SUPABASE_ANON_KEY);
