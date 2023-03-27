import { supabase } from "./SupabaseClient";

export async function cancelRegistration({
  participation_id,
  cancel = true,
}: {
  participation_id: string;
  cancel?: boolean;
}) {
  const { error } = await supabase
    .from("participation")
    .update({
      registration_cancelled: cancel,
    })
    .eq("id", participation_id);

  if (error) {
    console.error(error);
    return error;
  }
}
