import { Participation } from "../interface/Participation";
import { Users } from "../interface/Users";
import { supabase } from "./SupabaseClient";
import { Events } from "../interface/Events";

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

export async function getEvents(select: string = "*") {
  try {
    let { data } = await supabase.from("events").select(select);

    const events: Events[] = data as unknown as Events[];

    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function getEventDetailsFromId({
  select,
  event_id,
}: {
  select: string;
  event_id: number;
}) {
  try {
    let { data } = await supabase
      .from("events")
      .select(select)
      .eq("id", event_id);

    const events: Events[] = data as unknown as Events[];

    return data;
  } catch (e) {
    console.error(e);
  }
}

/* get the registered events of the user
 * @param select: the columns to be selected from the participation table
 */

export async function getRegisteredEvents({
  select = `id, team_name, team_member_0, team_member_1, team_member_2, team_member_3, team_member_4, team_member_5, transaction_id, transaction_verified, registration_cancelled, events(name, poster_image, fees)`,
}: {
  select?: string;
}) {
  try {
    const user = await getUser();
    if (user) {
      let { data, error } = await supabase
        .from("participation")
        .select(select)
        .eq("registered_by", user.email);

      const participationData: Participation[] =
        data as unknown as Participation[];

      return participationData;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
}

export async function getUserProfile(id: string, select: string = "*") {
  let { data, error } = await supabase
    .from("users")
    .select(select)
    .eq("id", id);

  if (error) {
    console.error(error);
  }

  const users: Users[] = data as unknown as Users[];
  return users;
}

export async function checkForUser(email: string) {
  let { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

  if (error) {
    console.error(error);
  }

  const users: Users[] = data as Users[];

  return users;
}

export async function isUserDetailsEmpty() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user !== null) {
    let data = await getUserProfile(user.id);

    if (data && (data[0]["name"] === null || data[0]["college"] === null)) {
      return true;
    }
  }
  return false;
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
