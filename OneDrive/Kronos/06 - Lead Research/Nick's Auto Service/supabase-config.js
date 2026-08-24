// Nick's Auto Service & Tire — Supabase connection
const SUPABASE_URL = "https://dyfqblpwkuxeaedmwiyb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5ZnFibHB3a3V4ZWFlZG13aXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMzQ2NjMsImV4cCI6MjEwMjkxMDY2M30.CXvJSJbFDLjNZEt44Uzckj3_tHzUCXKeeLLJu4W4kn4";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
