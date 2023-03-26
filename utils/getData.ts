import { supabase } from "./SupabaseClient";

export async function getData({
  table,
  select = "*",
}: {
  table: string;
  select?: string;
}) {
  try {
    let { data } = await supabase.from(table).select(select);
    return { [table]: data };
  } catch (e) {
    console.error(e);
  }
}
