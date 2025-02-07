import Head from "next/head";
import Image from "next/image";
import logo from "@public/assets/icon_logo_img.svg";

export default function Home() {
  return (
    <>
      <Head>
        <title>니가가라하와이</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center py-2">
        <Image src={logo} width={400} height={400} alt="로고" />
        안녕하세요. 임시 랜딩페이지입니다.
      </main>
    </>
  );
}
