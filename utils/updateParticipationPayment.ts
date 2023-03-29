import { supabase } from "./SupabaseClient";

export async function updateParticipationPayment({
  participation_id,
  phone_number,
  upi_id,
  transaction_screenshot_file_name,
  transaction_id,
}: {
  participation_id: string;
  phone_number: string;
  upi_id: string;
  transaction_screenshot_file_name: string;
  transaction_id: string;
}) {
  console.log(
    participation_id,
    phone_number,
    upi_id,
    transaction_screenshot_file_name,
    transaction_id
  );
  const { data, error } = await supabase
    .from("participation")
    .update({
      phone_number: phone_number,
      upi_id: upi_id,
      transaction_screenshot_file_name: transaction_screenshot_file_name,
      transaction_id: transaction_id,
    })
    .match({
      id: participation_id,
      //   phone_number: null,
      //   upi_id: null,
      //   transaction_screenshot_file_name: null,
      //   transaction_id: null,
      //   transaction_verified: false,
    })
    .select("*");

  console.log(data);

  if (error) {
    return error;
  }
}
