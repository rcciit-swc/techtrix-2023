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
      transaction_verified: false,
    })
    .or(
      "phone_number.is.null, upi_id.is.null, transaction_screenshot_file_name.is.null, transaction_id.is.null"
    );

  if (error) {
    throw error;
  }
}
