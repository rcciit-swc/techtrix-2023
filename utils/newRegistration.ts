import { getUser } from "./getData";
import { supabase } from "./SupabaseClient";

export async function newTeamRegistration({
  team_name,
  team_members,
  event_id,
}: {
  team_name: string;
  team_members: string[];
  event_id: string;
}) {
  const members: { [key: string]: string } = {};

  team_members.forEach((member_email, index) => {
    members[`team_member_${index}`] = member_email;
  });

  const user = await getUser();

  if (user) {
    const { error } = await supabase.from("participation").insert({
      team_name: team_name,
      ...members,
      registered_by: user.email,
      event_id: event_id,
    });
    if (error) {
      console.error(error);
      throw error;
    }
    return null;
  } else {
    console.error("id not retrieved from client");
    throw "id not retrieved from client";
  }
}

export async function newSoloRegistration({ event_id }: { event_id: string }) {
  const user = await getUser();

  if (user) {
    const { error } = await supabase.from("participation").insert({
      registered_by: user.email,
      event_id: event_id,
    });
    if (error) {
      console.error(error);
      return error;
    }
    return null;
  } else {
    console.error("id not retrieved from client");
    throw "id not retrieved from client";
  }
}
