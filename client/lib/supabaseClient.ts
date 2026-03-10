import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://oqabmjgcrykdowffsshf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xYWJtamdjcnlrZG93ZmZzc2hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NzY1NDQsImV4cCI6MjA4ODM1MjU0NH0.7zom-_tDal7vppkVkT13aWEMnunZnB5AI_N9i7r2Llo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);