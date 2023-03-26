import Head from "next/head";
import localData from "../public/data.json";

const Profile = () => {
  return (
    <>
      <Head>
        <title>{`${localData["title"]} Profile`}</title>
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
      ></main>
    </>
  );
};

export default Profile;
