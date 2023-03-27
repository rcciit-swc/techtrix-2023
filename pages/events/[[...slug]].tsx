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
    let { data: categoryData } = await supabase
      .from("event_categories")
      .select("*")
      .eq("name", params.slug[0].toUpperCase());

    let { data } = await supabase
      .from("events")
      .select("*")
      .eq("category", params.slug[0].toUpperCase());
    return {
      props: {
        data: data,
        categoryData: categoryData,
        category: params.slug[0].toUpperCase(),
      },
    };
  }
}

const Events = ({
  data,
  category,
  categoryData,
}: {
  data: any[];
  category: string;
  categoryData: any[];
}) => {
  console.log(categoryData);
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
        <NavBar />
        <div className="h-full flex flex-col w-full justify-center items-center">
          <div className="flex flex-row w-full justify-evenly items-center py-16 flex-wrap">
            <div className="flex flex-col items-center justify-center h-full w-full md:w-1/2 xl:w-1/2 px-16">
              <h1 className="text-6xl font-semibold text-white py-3 text-right">
                {category ? category : "All Events"}
              </h1>
              <h2 className="text-xl  text-white py-2 text-right">
                {categoryData
                  ? categoryData[0].description
                  : "TECHTRIX is the highly successful annual techno-management of RCC Institute of Information Technology with a footfall of 5,000+ participants from across Kolkata and even other states! The highlights of the fest include Robotics (list of events) and Gaming (list of events)."}
              </h2>
            </div>
            <div className="my-8">
              <Image
                className="event_logo"
                src={`${
                  categoryData
                    ? categoryData[0].picture
                    : "https://i.imgur.com/3iFfGAP"
                }.png`}
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
                    <div className="w-60 h-60 relative">
                      <Image
                        className="event_logo"
                        src={`${event.poster_image}.png`}
                        alt={event.name}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <h1 className="text-6xl font-semibold text-white py-3 text-left">
                      {event.name}
                    </h1>
                    {/* TODO: details
                     <span className="text-xl  text-white py-2 text-left">
                      {event.details}
                    </span> */}
                    {/* TODO: Add a button to register for the event */}
                    <span className="text-base text-white py-2 text-left">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Deserunt sed porro adipisci, sapiente maiores est
                      similique aliquam aliquid exercitationem provident, nulla
                      aut molestiae magni, earum totam. Natus labore a eos.
                    </span>
                    <Button onClick={() => {}} text="Register Now" />
                  </div>
                  <div className="my-8"></div>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default Events;
