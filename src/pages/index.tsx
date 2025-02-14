import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { setAccessToken } from "@/utils/tokenUtils";
import Hero from "@/components/Landing/Hero";
import Features from "@/components/Landing/Features";
import CTAButton from "@/components/Landing/CTAButton";

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
 
      <Head>
        <title>니가가라하와이 - 당신의 특별한 여행 메이트</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-400 via-blue-400 to-blue-600">
      
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559494007-9f5847c49d94')] bg-cover bg-center opacity-10" />
        <div className="container relative mx-auto px-4 py-12">
          <Hero />
          <Features />
          <div className="flex justify-center">
            <CTAButton />
          </div>
        </div>
      </main>
    </>
  );
}
