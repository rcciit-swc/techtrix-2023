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
          <h1 className="text-6xl font-semibold text-white py-3 text-left"
          style={{
            letterSpacing: "1px",
            textShadow: "2px 5px 0px rgba(118,99,99,1)",
          }}
          >
            About Us
          </h1>
          <h2 className="text-xl  text-white py-2 text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            corporis, quaerat minima tempore ex tempora exercitationem
            reprehenderit rem, in veritatis molestiae sapiente esse aliquid
            alias. Accusantium rerum culpa esse minima!
          </h2>
          <Button text="Know More About RCCIIT !" 
          onClick={() => {}}
          />
        </div>
        <div className="my-8">
          <Image
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
