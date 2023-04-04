import { Participation } from "@/interface/Participation";
import { supabase } from "./SupabaseClient";

export async function getParticipationInEvent({
  select,
  match = {
    event_id: "",
    user_id: "",
  },
  or = "phone_number.is.null, upi_id.is.null, transaction_screenshot_file_name.is.null, transaction_id.is.null",
}: {
  select?: string;
  match?: { event_id: string; user_id: string };
  or?: string;
}) {
  const { data, error } = await supabase
    .from("participation")
    .select(select)
    .match(match)
    .or(or);

  if (error) {
    throw error;
  }

  return data as unknown as Participation[];
}
