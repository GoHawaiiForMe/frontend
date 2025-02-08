import React, { useState, useEffect, ChangeEvent } from 'react';
import DreamerFilter from '../components/Common/DreamerFilter';
import DropdownSort from "@/components/Common/DropdownSort";
import CardFindMaker from "@/components/Common/CardFindMaker";
import SearchBar from "@/components/Common/SearchBar";
import Link from 'next/link';
import useAuthStore from "@/stores/useAuthStore";
import { getMakers } from '@/services/findMaker';
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

export default function FindingMaker() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [resetFilters, setResetFilters] = useState(false);
  const [makers, setMakers] = useState([]);
  const { isLoggedIn, setLogin } = useAuthStore();
  const [orderBy, setOrderBy] = useState<string>('');
  const [serviceArea, setServiceArea] = useState<string>(''); 
  const [serviceType, setServiceType] = useState<string>(''); 
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["makers", { orderBy, serviceArea, serviceType, searchTerm }],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      getMakers(orderBy, serviceArea, serviceType, searchTerm || undefined, pageParam, 5),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.list.length === 5 ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const allMakers = data?.pages.flatMap((page) => page.list) || [];
const handleOrderByChange = (selectedOrder: string) => {
  setOrderBy(selectedOrder);
};

  const handleServiceAreaChange = (selectedArea: string) => {
    
      setServiceArea(selectedArea);
    
  };

  const handleServiceTypeChange = (selectedType: string) => {
    
      setServiceType(selectedType);
    
  };


  useEffect(() => {
    const fetchMakers = async () => {
      try {
        const data = await getMakers(orderBy, serviceArea, serviceType, searchTerm || undefined);
        setMakers(data.list);
      } catch (error) {
        console.error('Failed to fetch makers:', error);
      }
    };

    fetchMakers();
  }, [searchTerm, orderBy, serviceArea, serviceType]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      setSearchTerm("");
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setSearchTerm(value);
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
                  className={`text-gray-500 hover:text-blue-500 ${isButtonClicked ? 'flash' : ''}`} 
                  onClick={handleButtonClick}
                >
                  초기화
                </button>
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <p className="text-2lg semibold">지역을 선택해 주세요</p>
                  <DreamerFilter type="location" reset={resetFilters} onSelect={handleServiceAreaChange} />
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-2lg semibold">어떤 서비스가 필요하세요?</p>
                  <DreamerFilter type="service" reset={resetFilters} onSelect={handleServiceTypeChange} />
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
                <DropdownSort onSort={handleOrderByChange} />
              </div>
            </div>
            <SearchBar 
              placeholder="텍스트를 입력해 주세요."
              className="w-full mobile-tablet:w-full" 
              value={searchValue}
              onChange={handleSearchChange}
              onSearch={handleSearch}
            />
          </div>
          
          <div className="w-full flex flex-col gap-4">
            {isLoading ? (
              <div className="flex min-h-[200px] items-center justify-center">
                <span>Loading...</span>
              </div>
            ) : (
              allMakers.map((maker) => (
                <Link href={`/maker-detail/${maker.id}`} key={maker.id}>
                  <CardFindMaker
                    key={maker.id}
                    firstLabelType={maker.serviceTypes[0]}
                    secondLabelType={maker.serviceTypes[1]}
                    nickName={maker.nickName}
                    image={maker.image}
                    description={maker.description}
                    averageRating={maker.averageRating}
                    totalReviews={maker.totalReviews}
                    totalFollows={maker.totalFollows}
                    totalConfirms={maker.totalConfirms}
                  />
                </Link>
              ))
            )}
            <div ref={ref} className="h-10">
              {isFetchingNextPage && (
                <div className="flex items-center justify-center py-4">
                  <span>Loading more...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
