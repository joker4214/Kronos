// Icon Auto Repair & Collision — Supabase connection
const SUPABASE_URL = "https://xwmmfczprjvldrsljqdw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3bW1mY3pwcmp2bGRyc2xqcWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNjk1NTYsImV4cCI6MjEwMjc0NTU1Nn0._1WwrfzxOSi9ByyK-mgh6U3cSxpJO7otNRtCahycsTA";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
