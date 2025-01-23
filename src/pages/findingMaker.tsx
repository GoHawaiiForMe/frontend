import Head from "next/head";
import Label from '../components/Common/Label';
import DreamerFilter from '../components/Common/DreamerFilter';
import DropdownSort from "@/components/Common/DropdownSort";
import CardFindMaker from "@/components/Common/CardFindMaker";

export default function findMaker() {
  return (
    <>
      <Head>
        <title>Maker 찾기 페이지 / 비회원</title>
        <meta name="description" content="Learn more about us." />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <>
        <div className="w-[955px]">
      <CardFindMaker
      firstLabelType="SHOPPING"
      secondLabelType="REQUEST"
      cardSize="sm"
      />
      <CardFindMaker 
      firstLabelType="FOOD_TOUR"
      secondLabelType="REQUEST"
      labelSize="sm"
      cardClassName="w-[327px] h-[188px] py-4 px-[14px]" 
      innerboxClassName=" h-[78px] !p-[10px] " 
      titleSize="text-sm mb-1" 
      profileClassName="min-w-12 min-h-12"
      photoSize="46"
      nameSize="text-md"
      otherText="text-[10px]"
      starSize="20"
      heartNumberSize="text-xs"
      
      />
    </div>
        <h1 className="text-4xl">Finding Maker As A Guest</h1>
        <p className="mt-4 text-lg">This is the &quot;Finding Maker As A Guest&quot; page of our website.</p>
        <div className="flex space-x-4 mt-4">
        
          <Label 
          type="SHOPPING"
          size="sm" />
          <Label type="FOOD_TOUR" />
          <Label type="ACTIVITY" />
          <Label type="CULTURE" />
          <Label type="FESTIVAL" />
          <Label type="RELAXATION" />
          <Label type="REQUEST" />
          <Label type="PENDING" />
          <Label type="CONFIRMED" />
        </div >
        <div className="flex space-x-4 mt-4">
        <DreamerFilter type="location" />
        <DreamerFilter type="service" />
        </div>
        <DropdownSort />
        </>
          </main>
    </>
  );
}
