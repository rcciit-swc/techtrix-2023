import { supabase } from "./SupabaseClient";

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error(error);
    return null;
  }

  if (data.session == null) {
    return null;
  }

  return data;
}
