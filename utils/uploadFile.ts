import { supabase } from "./SupabaseClient";

export async function uploadFile({
  file,
  path,
}: {
  file: File | undefined;
  path: string;
}) {
  if (file === undefined) {
    throw "file undefined while uploading";
  }

  const { data, error } = await supabase.storage
    .from("techtrix-storage")
    .upload(path, file);

  if (error) {
    throw error;
  }

  return data;
}
