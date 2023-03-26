import Head from "next/head";
import localData from "../public/data.json";
import NavBar from "@/components/Navbar/NavBar";
import HeroSection from "@/components/HeroSection/HeroSection";
import Band from "@/components/Band/Band";
import AboutUs from "@/components/AboutUs/AboutUs";
import EventCategories from "@/components/EventCategories/EventCategories";
import { getData } from "@/utils/getData";

export async function getServerSideProps() {
  const data = await Promise.all([
    getData({
      table: "events",
    }),
    getData({
      table: "event_categories",
    }),
  ]);

  return {
    props: { data },
  };
}

/**
 * @param {JSON} event_categories - event categories from supabase
 * @category events
 */

export default function Home({ data }: { data: any }) {
  return (
    <>
      <Head>
        <title>{`${localData["title"]} ${localData["year"]}`}</title>
        <meta name="description" content="RCCIIT's Official Techfest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="h-full"
        style={{
          background:
            "linear-gradient(146deg, rgba(16,16,16,0.8800770308123249) 39%, rgba(0,0,0,0.9164915966386554) 88%)",
        }}
      >
        <NavBar />
        <HeroSection />
        <Band
          text="TechTrix"
          number={10}
          bgColor="black"
          textColor="white"
          outlineColor="white"
          angle="6deg"
          dir="left"
        />
        <Band
          text="TechTrix"
          number={10}
          bgColor="white"
          textColor="black"
          outlineColor="black"
          angle="6deg"
          dir="right"
        />
        <AboutUs />
        <Band
          text="Events"
          number={10}
          bgColor="black"
          textColor="white"
          outlineColor="white"
          angle="-6deg"
          dir="left"
        />
        <Band
          text="Events"
          number={10}
          bgColor="white"
          textColor="black"
          outlineColor="black"
          angle="-6deg"
          dir="right"
        />
        <EventCategories
          eventCategories={data[1]["event_categories"]}
        ></EventCategories>
        <Band
          text="Contact"
          number={10}
          bgColor="black"
          textColor="white"
          outlineColor="white"
          angle="6deg"
          dir="left"
        />
        <Band
          text="Contact"
          number={10}
          bgColor="white"
          textColor="black"
          outlineColor="black"
          angle="6deg"
          dir="right"
        />
      </main>
    </>
  );
}
