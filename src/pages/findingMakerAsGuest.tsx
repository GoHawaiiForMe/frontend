import Head from "next/head";
import Label from '../components/Common/label';

export default function findingMakerAsGuest() {
  return (
    <>
      <Head>
        <title>Maker 찾기 페이지 / 비회원</title>
        <meta name="description" content="Learn more about us." />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <>
        <h1 className="text-4xl">Finding Maker As A Guest</h1>
        <p className="mt-4 text-lg">This is the &quot;Finding Maker As A Guest&quot; page of our website.</p>
        <div className="flex space-x-4 mt-4">
          <Label type="gift" />
          <Label type="food" />
          <Label type="activity" />
          <Label type="box" />
          <Label type="home" />
          <Label type="relaxation" />
        </div>
        </>
      </main>
    </>
  );
}
