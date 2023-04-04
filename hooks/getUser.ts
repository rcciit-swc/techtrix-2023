import { supabase } from "@/utils/SupabaseClient";
import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

const GetUser = () => {
  const [userObject, setUserObject] = useState<User | null>(null);

  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserObject(user as unknown as User);
      }
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.id) {
        setUserObject(session.user);
      }

      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  return {
    userObject,
    isLoading,
  };
};

export default GetUser;
