import React from "react";

const Contact = () => {
  return (
    <main className=" h-full flex flex-row justify-evenly items-center flex-wrap w-full ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.53055520462!2d88.39410862476483!3d22.55925167160071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02768400b479b1%3A0x5ad44b718c770205!2sRCC%20INSTITUTE%20OF%20INFORMATION%20TECHNOLOGY%20(New%20Campus)!5e0!3m2!1sen!2sin!4v1679851205279!5m2!1sen!2sin"
          width="400"
          height="300"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-96 h-96 rounded-3xl mt-8 mx-5 my-8 md:w-1/2"
        />
        <div
          className="flex flex-col gap-5 justify-center items-start w-1//2 h-64 rounded-3xl shadow-2xl p-5 
          mx-5 my-8
          "
          id="contact"
        >
          <h1
            className="text-5xl font-extralight text-white "
            style={{
              letterSpacing: "1px",
              textShadow: "2px 5px 0px rgba(118,99,99,1)",
            }}
          >
            For Event Queries
          </h1>
          <div
            className="text-white flex flex-row justify-between w-full mt-5 flex-wrap"
            style={{
              letterSpacing: "1px",
              textShadow: "2px 5px 0px rgba(118,99,99,1)",
            }}
          >
            <p className="mt-2">
              <span className="text-3xl font-semibold">Aniket Dey</span>
              <br />
              <a className="text-xl neon" href="tel:+9163735171">
                +9163735171
              </a>
            </p>
            <p className="mt-2">
              <span className="text-3xl font-semibold">Tamaghna Das</span>
              <br />
              <a className="text-xl neon" href="tel:+91 90513 95542">
                +91 90513 95542
              </a>
            </p>
          </div>
        </div>
    </main>
  );
};

export default Contact;
