import NavBar from "@/components/Navbar/NavBar";
import { getUser, getUserProfile } from "@/utils/getData";
import { searchCollege } from "@/utils/searchCollege";
import { updateProfile } from "@/utils/updateProfile";
import { User } from "@supabase/supabase-js";
import { debounce } from "lodash";
import Head from "next/head";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import localData from "../public/data.json";

const Profile = () => {
  const [user, setUser] = useState<User>();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    college: "",
    year: "",
  });

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        setUser(user);
        getUserProfile(user.id).then((profile) => {
          setFormData({
            name: profile?.name,
            phone: profile?.phone,
            college: profile?.college,
            year: profile?.year || "",
          });
        });
      } else {
        redirect("/");
      }
    });
  }, []);

  const [suggestions, setSuggestions] = useState<Array<any>>([]);

  const debouncer = debounce((value, setSuggestions) => {
    searchCollege({
      collegeInput: value,
      setSuggestions: setSuggestions,
    });
  }, 1000);

  function editProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user) {
      updateProfile({
        id: user.id,
        name: formData.name,
        phone: formData.phone,
        college: formData.college,
        year: formData.year,
      });
    }
  }

  return (
    <>
      <Head>
        <title>{`${localData["title"]} Profile`}</title>
        <meta name="description" content="RCCIIT's Official Techfest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="h-full">
        <div className="flex flex-col w-full justify-center items-center">
          <form onSubmit={editProfile}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="Name"
                        required={true}
                        id="Name"
                        autoComplete="off"
                        className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Name"
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Contact No.
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Phone number"
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="College"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      College
                    </label>
                    <div className="mt-2">
                      <input
                        id="College"
                        name="College"
                        className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        required={true}
                        placeholder="College"
                        onChange={(e) => {
                          setFormData({ ...formData, college: e.target.value });
                          debouncer(e.target.value, setSuggestions);
                        }}
                      />
                      <div className="listGroup">
                        {suggestions &&
                          suggestions.length > 0 &&
                          suggestions.map((college, pos) => {
                            return (
                              <div key={pos}>
                                <span
                                  key={pos}
                                  onClick={(e) => {
                                    setFormData({
                                      ...formData,
                                      college: college,
                                    });
                                    setSuggestions([]);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  {college}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Year"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Year
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="Year"
                        required={true}
                        id="Year"
                        autoComplete="off"
                        className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Year"
                        onChange={(e) =>
                          setFormData({ ...formData, year: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Profile;
