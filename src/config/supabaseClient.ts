import { createClient } from "@supabase/supabase-js";
import { IDatabase } from "../interfaces/database";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Supabase credentials are missing. Please check your environment variables.",
  );
}

export const supabase = createClient<IDatabase>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);

// npx supabase stop && npx supabase start
// npx supabase start
