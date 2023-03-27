import { getUser } from "@/utils/getData";
import { login } from "@/utils/login";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import data from "../../public/data.json";
import Button from "../Button";

const HeroSection = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = React.useState(false);

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        setLoggedIn(true);
      }
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src="https://i.imgur.com/3iFfGAP.png"
        alt="techtrix"
        className="mb-5 mt-10 event_logo"
        width={300}
        height={300}
      />
      <h1 className="text-7xl font-semibold text-white my-1 ">
        {data["title"]}
      </h1>
      <h2 className="text-3xl font-bold text-white my-1">{data["date"]}</h2>
      <Button
        onClick={async () => {
          const user = await getUser();
          if (user) {
            router.push("/dashboard");
          } else {
            login();
          }
        }}
        text={loggedIn ? "View Dashboard!" : "Register Now!"}
      />
    </div>
  );
};

export default HeroSection;
