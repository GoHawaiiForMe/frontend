import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { setAccessToken } from "@/utils/tokenUtils";
import Hero from "@/components/Landing/Hero";
import Features from "@/components/Landing/Features";
import MapMarker from "@/components/Landing/MapMarker";
import beachBackground7 from "@public/assets/Landing-img/img_07.jpg";
import userService from "@/services/userService";
import useAuthStore from "@/stores/useAuthStore";

const getUserInfo = async () => {
  const userData = await userService.getUserInfo();
  return userData;
};

const getProfileInfo = async () => {
  const profileData = await userService.getProfileInfo();
  return profileData;
};

export default function Home() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isRefreshed, setIsRefreshed] = useState(false);
  const { setLogin } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (router.isReady) {
          const accessToken = router.query.auth as string;
          if (accessToken) {
            setAccessToken(accessToken);

            const userInfo = await getUserInfo();
            const profileInfo = await getProfileInfo();

            setLogin(
              userInfo.nickName,
              userInfo.role as "DREAMER" | "MAKER",
              userInfo.coconut,
              userInfo.email,
              userInfo.phoneNumber,
              profileInfo.image,
            );
            setIsRefreshed(true);
            router.push("/");
          }
        }
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
      }
      finally{
        window.location.reload();
      }
    };
    fetchData();
  }, [router.isReady, router.query.auth, setLogin, isRefreshed]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

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
      <main className="from-color-gray-50 via-color-blue-100 to-color-blue-200 relative min-h-screen overflow-hidden bg-gradient-to-b">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${beachBackground7.src})` }}
        />
        <div className="relative container mx-auto px-4 py-12">
          <Hero />
          <Features />
          <MapMarker />
        </div>
      </main>
    </>
  );
}
