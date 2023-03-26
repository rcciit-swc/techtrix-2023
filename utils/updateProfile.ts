import { supabase } from "./SupabaseClient";

export async function updateProfile({
  id,
  name,
  phone,
  college,
  year,
}: {
  id: string;
  name: string;
  phone: string;
  college: string;
  year: string;
}) {
  const { error } = await supabase
    .from("users")
    .update({ name: name, phone: phone, college: college, year: year })
    .eq("id", id);

  if (error) {
    return error;
  }
}
