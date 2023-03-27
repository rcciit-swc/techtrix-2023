import Image from "next/image";
import Button from "../Button";

const AboutUs = () => {
  return (
    <main
      className="h-full flex flex-row w-full justify-center items-center"
      id="about"
      style={
        {
          // background:
          //   "linear-gradient(146deg, rgba(16,16,16,0.8800770308123249) 39%, rgba(0,0,0,0.9164915966386554) 88%)",
        }
      }
    >
      <div className="flex flex-row w-full justify-evenly items-center py-16 flex-wrap">
        <div className="flex flex-col items-center justify-center h-full w-full md:w-1/2 xl:w-1/2 px-16">
          <h1
            className="text-6xl font-semibold text-white py-3 text-left"
            style={{
              letterSpacing: "1px",
              textShadow: "2px 5px 0px rgba(118,99,99,1)",
            }}
          >
            About Us
          </h1>
          <h2 className="text-lg  text-white py-2 text-justify">
            TECHTRIX is the highly successful annual techno-management of RCC
            Institute of Information Technology with a footfall of 5,000+
            participants from across Kolkata and even other states! The
            highlights of the fest include Robotics (list of events) and Gaming
            (list of events). And this year, we have yet another wonderous
            addition- a state-level hackathon for both college and school
            students. Find more information about{" "}
            <a
              className="neon"
              href="https://sbh.rcciit.org.in/"
              target="_blank"
              rel="noreferrer"
            >
              ‘Smart Bengal Hackathon 2023’
            </a>
            .
          </h2>
          <a
            className="button mt-6"
            href="https://www.rcciit.org/"
            target="_blank"
            rel="noreferrer"
          >
            Know More About RCCIIT !
          </a>
        </div>
        <div className="my-8">
          <Image
            className="event_logo"
            src="https://i.imgur.com/3iFfGAP.png"
            alt="techTrix"
            width={300}
            height={300}
          />
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
