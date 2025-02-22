import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import downBlue from "@public/assets/dropdown_down_blue.svg";
import downGray from "@public/assets/dropdown_down_gray.svg";

const placeholder = "지역";
const items = ["전체", "서울", "경기", "인천", "강원", "충북", "충남", "세종", "대전", "전북"];
const placeholder2 = "서비스";
const items2 = [
  "전체",
  "기념품/쇼핑형",
  "맛집 탐방형",
  "액티비티/탐험형",
  "문화/역사탐방형",
  "축제참여형",
  "휴양형",
];

const serviceTypeMapping: Record<string, string> = {
  전체: "",
  "기념품/쇼핑형": "SHOPPING",
  "맛집 탐방형": "FOOD_TOUR",
  "액티비티/탐험형": "ACTIVITY",
  "문화/역사탐방형": "CULTURE",
  축제참여형: "FESTIVAL",
  휴양형: "RELAXATION",
};

const areaMapping: Record<string, string> = {
  전체: "",
  서울: "SEOUL",
  경기: "GYEONGGI",
  인천: "INCHEON",
  강원: "GANGWON",
  충북: "CHUNGBUK",
  충남: "CHUNGNAM",
  세종: "SEJONG",
  대전: "DAEJEON",
  전북: "JEONBUK",
};

interface DreamerFilterProps {
  type: "location" | "service";
  reset: boolean;
  onSelect: (selectedItem: string) => void;
}

const DreamerFilter = ({ type, reset, onSelect }: DreamerFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reset) {
      setSelectedItem(null);
    }
  }, [reset]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const itemsToDisplay = type === "location" ? items : items2;
  const placeholderText = type === "location" ? placeholder : placeholder2;

  const handleItemClick = (item: string) => {
    if (itemsToDisplay.includes(item)) {
      setSelectedItem(item);
      setIsOpen(false);
      const mappedValue = type === "service" ? serviceTypeMapping[item] : areaMapping[item];
      onSelect(mappedValue);
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        onClick={toggleDropdown}
        className={`flex h-16 w-[328px] cursor-pointer items-center justify-between rounded-[16px] border-[1px] px-6 py-4 shadow-sm transition duration-200 ${isOpen ? "border-color-blue-300 bg-color-blue-50 shadow-md" : ""} ${selectedItem ? "border-color-blue-300 bg-color-blue-50" : "border-color-line-200"} ${type === "service" ? "mobile-tablet:w-[150px]" : "mobile-tablet:w-[75px]"} pc:max-w-[328px] mobile-tablet:h-[36px] mobile-tablet:rounded-[8px] mobile-tablet:border-[1px] mobile-tablet:py-[6px] mobile-tablet:pl-[14px] mobile-tablet:pr-[10px]`}
      >
        <p
          className={`text-[18px] text-color-black-400 mobile-tablet:text-[14px] ${selectedItem ? "text-color-blue-300" : ""}`}
        >
          {selectedItem || placeholderText}
        </p>
        <Image
          src={isOpen ? downBlue : downGray}
          alt="dropdown icon"
          className={`transition-transform duration-200 pc:h-[36px] pc:w-[36px] mobile-tablet:h-[20px] mobile-tablet:w-[20px] ${isOpen ? "rotate-180 transform" : ""}`}
        />
      </button>
      {isOpen && (
        <div
          className={`absolute top-20 z-10 h-80 w-[328px] overflow-y-scroll rounded-[16px] border border-gray-300 bg-gray-50 shadow-sm transition-all duration-300 ease-in-out mobile-tablet:left-0 mobile-tablet:top-full mobile-tablet:rounded-[8px] mobile-tablet:border-[1px] ${type === "service" ? "mobile-tablet:h-[144px] mobile-tablet:w-full" : "mobile:h-[180px] tablet:h-[179px] mobile-tablet:w-[150px]"} ${isOpen ? "z-50 shadow-md" : "pointer-events-none opacity-0"} `}
        >
          <div
            className={`${type === "location" ? "mt-2 grid grid-cols-2" : "mt-2 flex w-full flex-col"}`}
          >
            {itemsToDisplay.map((item) => (
              <button
                key={item}
                onClick={() => handleItemClick(item)}
                className={`h-[64px] cursor-pointer justify-between px-[24px] py-[16px] font-medium text-color-black-400 transition duration-200 hover:bg-gray-100 mobile-tablet:h-auto mobile-tablet:w-full mobile-tablet:px-[14px] mobile-tablet:py-[8px] ${
                  type === "service"
                    ? "w-full text-left mobile-tablet:w-full mobile-tablet:text-[14px]"
                    : "border-l-[1px] border-r-[1px] mobile-tablet:text-[14px]"
                } `}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DreamerFilter;
