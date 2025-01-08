import Head from "next/head";

export default function findingMakerAsGuest() {
  return (
    <>
      <Head>
        <title>Maker 찾기 페이지 / 비회원</title>
        <meta name="description" content="Learn more about us." />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">Finding Maker As A Guest</h1>
        <p className="mt-4 text-lg">This is the &quot;Finding Maker As A Guest&quot; page of our website.</p>
      </main>
    </>
  );
}
