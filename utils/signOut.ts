import { supabase } from "./SupabaseClient";

export async function signOut() {
  await supabase.auth.signOut();
}
