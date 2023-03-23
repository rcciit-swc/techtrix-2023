import React from "react";
import data from "../../public/data.json";
import Button from "../Button";
const HeroSection = () => {
  return (
    <section
      style={{
        background:
          "linear-gradient(146deg, rgba(16,16,16,0.8800770308123249) 39%, rgba(0,0,0,0.9164915966386554) 88%)",
      }}
    >
        <div className="flex flex-col items-center justify-center h-screen">
          <img src="https://i.imgur.com/3iFfGAP.png" alt="techtrix" 
          className="w-80 h-80 mb-5 mt-10"
          />
          <h1 className="text-7xl font-semibold text-white my-1 ">{data["title"]}</h1>
          <h2 className="text-3xl font-bold text-white my-1">{data["date"]}</h2>
          <Button 
            text="Register Now"
          />
        </div>
    </section>
  );
};

export default HeroSection;
