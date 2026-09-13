import { supabase } from './supabase';

// DED's row in the pre-existing, multi-tenant Kronos CRM schema
// (agencies/clients/leads/posts/etc). This app only ever acts as one
// agency, so the id is fixed here rather than looked up every call.
export const DED_AGENCY_ID = '6751ecd2-e27c-4b34-a3e6-34764493657d';

// Records a pre-purchase lead (a scan or checklist opt-in). Dedupes on
// (agency_id, email, source) so repeat scans from the same person don't
// spam the leads list with one row per capture.
export async function recordLead({ email, source, message = null, name = null }) {
  const { data: existing, error: selectError } = await supabase
    .from('leads')
    .select('id')
    .eq('agency_id', DED_AGENCY_ID)
    .eq('email', email)
    .eq('source', source)
    .maybeSingle();

  if (selectError) throw selectError;
  if (existing) return existing.id;

  const { data: created, error: insertError } = await supabase
    .from('leads')
    .insert({ agency_id: DED_AGENCY_ID, email, source, message, name })
    .select('id')
    .single();

  if (insertError) throw insertError;
  return created.id;
}

// Records (or updates) a client from a real order. Dedupes on
// (agency_id, email) -- a repeat buyer updates the same client row
// instead of creating a duplicate.
export async function recordClient({ email, name, notes }) {
  const { data: existing, error: selectError } = await supabase
    .from('clients')
    .select('id')
    .eq('agency_id', DED_AGENCY_ID)
    .eq('email', email)
    .maybeSingle();

  if (selectError) throw selectError;
  if (existing) {
    await supabase.from('clients').update({ notes, updated_at: new Date().toISOString() }).eq('id', existing.id);
    return existing.id;
  }

  const { data: created, error: insertError } = await supabase
    .from('clients')
    .insert({ agency_id: DED_AGENCY_ID, email, name, notes })
    .select('id')
    .single();

  if (insertError) throw insertError;
  return created.id;
}
