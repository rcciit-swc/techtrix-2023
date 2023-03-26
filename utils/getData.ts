import { Participation } from "../interface/Participation";
import { Users } from "../interface/Users";
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

export async function getRegisteredEvents({
  select = "*",
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

export async function getUserProfile(id: string) {
  let { data, error } = await supabase.from("users").select("*").eq("id", id);

  if (error) {
    console.error(error);
  }

  const users: Users[] = data as Users[];
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
