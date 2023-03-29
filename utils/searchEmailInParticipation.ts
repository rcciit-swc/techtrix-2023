import { Participation } from "@/interface/Participation";
import { supabase } from "./SupabaseClient";

export async function searchEmailInParticipation(email: string) {
  if (email === "") {
    throw "email fetching error in getUser()";
  }

  const data = await supabase.rpc("search_email", {
    email: email,
  });

  const participationData: Participation[] =
    data.data as unknown as Participation[];

  return participationData;
}
