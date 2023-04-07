import { Participation } from "@/interface/Participation";
import { supabase } from "./SupabaseClient";

export async function getParticipationInEvent({
  select = "*",
  match,
}: {
  select?: string;
  match: { [key: string]: any };
}) {
  const { data, error } = await supabase
    .from("participation")
    .select(select)
    .match(match)
    .order("time_stamp", { ascending: true });

  if (error) {
    throw error;
  }

  return data as unknown as Participation[];
}
