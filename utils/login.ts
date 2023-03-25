import { supabase } from "./SupabaseClient";

export async function login() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
}
