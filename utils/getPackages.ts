import { Packages } from "@/interface/Packages";
import { supabase } from "./SupabaseClient";

export async function getPackages({ select = "*" }: { select?: string }) {
  const { data, error } = await supabase.from("packages").select(select);

  if (error) {
    throw error;
  }

  return data as unknown as Packages[];
}
