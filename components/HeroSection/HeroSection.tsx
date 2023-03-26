import Image from "next/image";
import React from "react";
import data from "../../public/data.json";
import Button from "../Button";
const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src="https://i.imgur.com/3iFfGAP.png"
        alt="techtrix"
        className="mb-5 mt-10"
        width={300}
        height={300}
      />
      <h1 className="text-7xl font-semibold text-white my-1 ">
        {data["title"]}
      </h1>
      <h2 className="text-3xl font-bold text-white my-1">{data["date"]}</h2>
      <Button onClick={() => {}} text="Register Now" />
    </div>
  );
};

export default HeroSection;
