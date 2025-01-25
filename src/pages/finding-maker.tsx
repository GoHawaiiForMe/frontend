import Head from "next/head";
import Label from '../components/Common/Label';
import DreamerFilter from '../components/Common/DreamerFilter';
import DropdownSort from "@/components/Common/DropdownSort";
import CardFindMaker from "@/components/Common/CardFindMaker";
import SearchBar from "@/components/Common/SearchBar";

export default function FindingMaker() {
  return (
    <>
      <div className="mx-auto overflow-hidden mobile:mx-auto mobile:w-[327px] tablet:mx-auto tablet:w-[600px]">
        <p className="text-4 py-8 font-semibold">Maker 찾기</p>
      </div> 
      
      <div className="flex gap-8">
        <div className="w-1/4">
          <p className="text-4 py-8 font-semibold">필터</p>
          <DreamerFilter type="location" />
          <DreamerFilter type="service" />
          <CardFindMaker 
              firstLabelType="FOOD_TOUR"
              secondLabelType="REQUEST"
              labelSize="sm"
              cardSize="sm"
            />
        </div>
        
        <div className="w-3/4">
          <div className="flex justify-between items-center mb-4">
            <SearchBar placeholder="텍스트를 입력해 주세요." />
            <DropdownSort />
          </div>
          
          <div className="flex flex-col gap-4">
            
            <CardFindMaker
              firstLabelType="SHOPPING"
              secondLabelType="REQUEST"
            />
          </div>
          
          <div className="flex min-h-[200px] items-center justify-center">
            <span>Loading...</span>
          </div>
          <div className="h-10">
            <div className="flex items-center justify-center py-4">
              <span>Loading more...</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}