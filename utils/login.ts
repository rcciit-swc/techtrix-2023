import { supabase } from "./SupabaseClient";

export async function login() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
    },
  });
}
