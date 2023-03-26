import Band from "@/components/Band/Band";
import Button from "@/components/Button";
import NavBar from "@/components/Navbar/NavBar";
import { supabase } from "@/utils/SupabaseClient";
import Head from "next/head";
import Image from "next/image";
import localData from "../../public/data.json";

export async function getServerSideProps({
  params,
}: {
  params: { [slug: string]: string[] };
}) {
  if (params.slug === undefined) {
    let { data } = await supabase.from("events").select("*");
    return {
      props: { data },
    };
  } else {
    let { data } = await supabase
      .from("events")
      .select("*")
      .eq("category", params.slug[0].toUpperCase());
    return {
      props: { data: data, category: params.slug[0].toUpperCase() },
    };
  }
}

const Events = ({ data, category }: { data: any[]; category: string }) => {
  return (
    <>
      <Head>
        <title>{`${localData["title"]} Events`}</title>
        <meta name="description" content="RCCIIT's Official Techfest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          background:
            "linear-gradient(146deg, rgba(16,16,16,0.8800770308123249) 39%, rgba(0,0,0,0.9164915966386554) 88%)",
        }}
        className="h-full"
      >
        <div className="h-full flex flex-col w-full justify-center items-center">
          <NavBar />
          <div className="flex flex-row w-full justify-evenly items-center py-16 flex-wrap">
            <div className="flex flex-col items-center justify-center h-full w-full md:w-1/2 xl:w-1/2 px-16">
              <h1 className="text-6xl font-semibold text-white py-3 text-right">
                {category ? category : "All Events"}
              </h1>
              <h2 className="text-xl  text-white py-2 text-right">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam corporis, quaerat minima tempore ex tempora
                exercitationem reprehenderit rem, in veritatis molestiae
                sapiente esse aliquid alias. Accusantium rerum culpa esse
                minima!
              </h2>
              <Button text="Register Now" />
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
        </div>
        <Band
          text={category ? category : "Events"}
          number={10}
          bgColor="black"
          textColor="white"
          outlineColor="white"
          angle="6deg"
          dir="right"
        />
        <Band
          text={category ? category : "Events"}
          number={10}
          bgColor="white"
          textColor="black"
          outlineColor="black"
          angle="6deg"
          dir="left"
        />
        <section>
          {data.map((event) => {
            return (
              <div
                key={`events__${event.id}`}
                className="h-full flex flex-row w-full justify-center items-center"
              >
                <div className="flex flex-row w-full justify-evenly items-center py-16 flex-wrap">
                  <div className="flex flex-col items-center justify-center h-full w-full md:w-1/2 xl:w-1/2 px-16">
                    <h1 className="text-6xl font-semibold text-white py-3 text-left">
                      {event.name}
                    </h1>
                    {/* TODO: details
                     <span className="text-xl  text-white py-2 text-left">
                      {event.details}
                    </span> */}
                    {/* TODO: Add a button to register for the event */}
                    {/* <span>{event.rules_regulations}</span> */}
                    <Button text="Register Now" />
                  </div>
                  <div className="my-8"></div>
                </div>
              </div>
            );
          })}
        </section>
        <Band
          text={category ? category : "Events"}
          number={10}
          bgColor="black"
          textColor="white"
          outlineColor="white"
          angle="6deg"
          dir="right"
        />
        <Band
          text={category ? category : "Events"}
          number={10}
          bgColor="white"
          textColor="black"
          outlineColor="black"
          angle="6deg"
          dir="left"
        />
      </main>
    </>
  );
};

export default Events;
