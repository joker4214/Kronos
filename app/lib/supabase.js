import { createClient } from "@supabase/supabase-js";

let _client;

function getClient() {
  if (!_client) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        "Supabase credentials are not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)."
      );
    }
    _client = createClient(supabaseUrl, supabaseKey);
  }
  return _client;
}

// Proxy keeps `supabase.from(...)` working everywhere it's already used,
// but defers actual client creation (and the credential check) until
// the first real call, instead of at module import time.
export const supabase = new Proxy(
  {},
  {
    get(_target, prop) {
      return getClient()[prop];
    },
  }
);
