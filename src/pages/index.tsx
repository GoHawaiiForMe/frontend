import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { setAccessToken } from "@/utils/tokenUtils";
import Hero from "@/components/Landing/Hero";
import Features from "@/components/Landing/Features";
import MapMarker from "@/components/Landing/MapMarker";
import beachBackground7 from "@public/assets/Landing-img/img_07.jpg";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const aceessToken = router.query.auth as string;
      if (aceessToken) {
        setAccessToken(aceessToken);
        router.push("/");
      }
    }
  }, [router.isReady, router.query.auth]);

  return (
    <>
      <style>
        {`
    @media (min-width: 200px) and (max-width: 2700px) {
      .main-container {
        padding: 0;
      }
    }
  `}
      </style>
      <Head>
        <title>니가가라하와이 - 당신의 특별한 여행 메이트</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-color-gray-50 via-color-blue-100 to-color-blue-200">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${beachBackground7.src})` }}
        />
        <div className="container relative mx-auto px-4 py-12">
          <Hero />
          <Features />
          <MapMarker />
        </div>
      </main>
    </>
  );
}
