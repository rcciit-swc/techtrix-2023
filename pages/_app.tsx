import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import GetUser from "@/hooks/getUser";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  const { isLoading, userObject } = GetUser();

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      {loading ? (
        <span className="flex flex-col justify-center items-center h-screen w-screen">
          <LoadingSpinner />
        </span>
      ) : (
        <Component {...pageProps} user={userObject} isLoading={isLoading} />
      )}
    </>
  );
}
