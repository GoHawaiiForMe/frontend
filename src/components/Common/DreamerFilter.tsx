import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import downBlue from '@public/assets/dropdown_down_blue.svg';
import downGray from '@public/assets/dropdown_down_gray.svg';

const placeholder = '지역';
const items = ['전체', '서울', '경기', '인천', '강원', '충북', '충남', '세종', '대전', '전북'];
const placeholder2 = '서비스';
const items2 = ['기념품/쇼핑형', '맛집 탐방형', '액티비티/탐험형', '문화/역사탐방형', '축제참여형', '휴양형'];

interface DreamerFilterProps {
  type: 'location' | 'service';
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const itemsToDisplay = type === 'location' ? items : items2;
  const placeholderText = type === 'location' ? placeholder : placeholder2;

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <div ref={dropdownRef} className="w-full relative">
      <button
        onClick={toggleDropdown}
        className={`w-[328px] h-16 px-6 py-4 flex justify-between items-center border-[1px] rounded-[16px] cursor-pointer transition duration-200 shadow-sm 
          ${isOpen ? 'border-color-blue-300 bg-color-blue-50 shadow-md' : ''} 
          ${selectedItem ? 'border-color-blue-300 bg-color-blue-50' : 'border-color-line-200'} 
          ${type === 'service' ? 'mobile-tablet:w-[150px]' : 'mobile-tablet:w-[75px]'}
            mobile-tablet:h-[36px] mobile-tablet:rounded-[8px] mobile-tablet:border-[1px] mobile-tablet:pl-[14px] mobile-tablet:pr-[10px] mobile-tablet:py-[6px]
          pc:max-w-[328px]
          `}
      >
        <p
          className={` text-color-black-400 text-[18px] mobile-tablet:text-[14px]
            ${selectedItem ? 'text-color-blue-300' : ''}`}
        >
          {selectedItem || placeholderText}
        </p>
        <Image
          src={isOpen ? downBlue : downGray}
          alt="dropdown icon"
          className={`transition-transform duration-200 mobile-tablet:w-[20px] mobile-tablet:h-[20px] pc:w-[36px] pc:h-[36px] ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className={`
          w-[328px] h-80 absolute top-20 border border-gray-300 bg-gray-50 rounded-[16px] z-10 shadow-sm transition-all duration-300 ease-in-out overflow-y-scroll 
          mobile-tablet:top-full mobile-tablet:left-0 mobile-tablet:rounded-[8px] mobile-tablet:border-[1px] 
          ${type === 'service' ? 'mobile-tablet:w-full mobile-tablet:h-[144px]' : 'mobile-tablet:w-[150px] tablet:h-[179px] mobile:h-[180px]'} 
          ${isOpen ? 'z-50 shadow-md' : 'opacity-0 pointer-events-none'} 
          `}>
          <div className={`${type === 'location' ? 'grid grid-cols-2 mt-2' : 'flex flex-col w-full mt-2'}`}>
            {itemsToDisplay.map(item => (
              <button
                key={item}
                onClick={() => handleItemClick(item)}
                className={`h-[64px] justify-between px-[24px] py-[16px] font-medium text-color-black-400 cursor-pointer transition duration-200 hover:bg-gray-100
                  mobile-tablet:w-full mobile-tablet:h-auto mobile-tablet:px-[14px] mobile-tablet:py-[8px]
  
                  ${type === 'service' ? 
                    'text-left w-full mobile-tablet:text-[14px] mobile-tablet:w-full'
                    : 'border-r-[1px] border-l-[1px] mobile-tablet:text-[14px]'}
                  `}
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