import React, { useState, ChangeEvent } from 'react';
import DreamerFilter from '../components/Common/DreamerFilter';
import DropdownSort from "@/components/Common/DropdownSort";
import CardFindMaker from "@/components/Common/CardFindMaker";
import SearchBar from "@/components/Common/SearchBar";
import Link from 'next/link';

export default function FindingMaker() {
  const [searchValue, setSearchValue] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [resetFilters, setResetFilters] = useState(false);
  const isLoggedIn = true;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setResetFilters(true);
    setTimeout(() => {
      setIsButtonClicked(false);
      setResetFilters(false);
    }, 300);
  };

  return (
   <>
   <style>
    {`
      @media (min-width: 1024px) and (max-width: 1800px) {
        .main-container {
          padding: 0 72px;
        }
      }
      .flash {
        animation: flash-animation 0.3s ease-in-out;
      }
      @keyframes flash-animation {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
    `}
   </style>
      <div className="mx-auto overflow-hidden mobile:mx-auto mobile:w-[327px] tablet:mx-auto tablet:w-[600px]">
        <p className="text-2xl py-8 semibold mobile-tablet:hidden pc:block">Maker 찾기</p>
      </div> 
      
      <div className="flex gap-[107px]">
        <div className="w-1/4 gap-[10px] h-[872px] top-[208px] pr-[10px] pb-[10px] mobile-tablet:hidden">
          <div className="flex flex-col gap-[46px]">
            <div className="flex flex-col gap-[32px]">
              <div className="w-[328px] flex justify-between items-center border-b border-color-line-200 py-4 px-[10px]">
                <p className="text-xl medium">필터</p>
                <button 
                  className={`text-gray-500 ${isButtonClicked ? 'flash' : ''}`} 
                  onClick={handleButtonClick}
                >
                  초기화
                </button>
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <p className="text-2lg semibold">지역을 선택해 주세요</p>
                  <DreamerFilter type="location" reset={resetFilters} />
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-2lg semibold">어떤 서비스가 필요하세요?</p>
                  <DreamerFilter type="service" reset={resetFilters} />
                </div>
              </div>
            </div>

            {isLoggedIn && (
              <div className="flex flex-col gap-4 ">
                <p className="text-xl semibold">최근에 찜한 Maker</p>
                <CardFindMaker 
                  firstLabelType="FOOD_TOUR"
                  secondLabelType="REQUEST"
                  labelSize="sm"
                  cardSize="sm"
                />
                <CardFindMaker 
                  firstLabelType="SHOPPING"
                  secondLabelType="REQUEST"
                  labelSize="sm"
                  cardSize="sm"
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-3/4 flex flex-col gap-[32px] mobile-tablet:w-full mobile:mx-[auto] mobile:w-[327px] tablet:mx-[auto] tablet:w-[600px] tablet:px-[10px] tablet:py-[12px]">
          <div className="gap-6">
            <div className="pc:ml-auto pc:flex pc:justify-between mobile-tablet:flex mobile-tablet:justify-between">
              <div className="pc:hidden mobile-tablet:flex mobile-tablet:gap-4">
                <DreamerFilter type="service" reset={resetFilters} />
                <DreamerFilter type="location" reset={resetFilters} />
              </div>
              <div className="pc:ml-auto">
                <DropdownSort />
              </div>
            </div>
            <SearchBar 
              placeholder="텍스트를 입력해 주세요."
              className="w-full mobile-tablet:w-full" 
              value={searchValue}
              onChange={handleSearchChange}
            
            />
            
          </div>
          
          <div className="w-full flex flex-col gap-4">
            <Link href="/maker-detail">
              <CardFindMaker
                firstLabelType="SHOPPING"
                secondLabelType="REQUEST"
              />
            </Link>
            <Link href="/maker-detail">
              <CardFindMaker
                firstLabelType="SHOPPING"
                secondLabelType="REQUEST"
              />
            </Link>
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
