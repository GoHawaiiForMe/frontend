import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>니가가라하와이</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center py-2">
        안녕하세요. 랜딩페이지입니다.
        <div className="text-2xl">랜딩 테스트</div>
        <button className="text-md">버튼 테스트</button>
      </main>
    </>
  );
}
