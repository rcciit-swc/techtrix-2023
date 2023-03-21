import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import data from "../public/data.json";
import LandingPage from "@/components/LandingPage/LandingPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>{data["title"]}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;700&display=swap');
        </style>
      </Head>
      <main>
      <LandingPage />
      </main>
    </>
  );
}
