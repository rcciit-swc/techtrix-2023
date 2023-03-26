import { Users } from './../interface/User';
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
    // console.log(data)
    return { [table]: data };
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
  // console.log(users)

  return users;
}

export async function checkForUser(email:string)
{
  let { data, error } = await supabase.from("users").select("*").eq("email", email);

  if (error) {
    console.error(error);
  }

  const users: Users[] = data as Users[];
  // console.log(users)

  return users;
}

export async function isUserEmpty() {
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
