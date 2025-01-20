import React, { useState } from 'react';
import Image from 'next/image';
import downBlue from '@public/assets/dropdown_down_blue.svg';
import downGray from '@public/assets/dropdown_down_gray.svg';

const placeholder = '지역';
const items = ['전체','태국','서울','호주','제주도', '하와이', '인천', '베트남','부산', '뉴질랜드', '울릉도', '뉴욕', '거제도', '스위스' ]
const placeholder2 = '서비스';
const items2 = ['기념품/쇼핑형', '맛집 탐방형', '액티비티/탐험형', '문화/역사탐방형', '축제참여형', '휴양형'];

interface DropdownProps {
  type: 'location' | 'service';
}

const Dropdown: React.FC<DropdownProps> = ({ type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const itemsToDisplay = type === 'location' ? items : items2;
  const placeholderText = type === 'location' ? placeholder : placeholder2;

  return (
    <div className="w-full relative mt-4">
      <button
        onClick={toggleDropdown}
        className={`w-full max-w-[328px] h-16 font-[18px] text-color-black-400 px-4 flex justify-between items-center border rounded-[16px] cursor-pointer transition duration-200 shadow-sm 
          ${isOpen ? 'border-color-blue-300 bg-color-blue-50 shadow-md' : ''} 
          ${selectedItem ? 'border-color-blue-300 bg-color-blue-50' : 'border-color-line-200'} 
          mobile:max-w-[280px] tablet:max-w-[300px] pc:max-w-[328px]`}
      >
        <span
          className={`text-[18px] font-medium text-color-black-400 ${selectedItem ? 'text-color-blue-300' : ''}`}
        >
          {selectedItem || placeholderText}
        </span>
        <Image
          src={isOpen ? downBlue : downGray}
          alt="dropdown icon"
        
          className={`transition-transform duration-200 mobile:w-[20px] mobile:h-[20px] tablet:w-[20px] tablet:h-[20px] pc:w-[36px] pc:h-[36px] ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className={`w-full max-w-[328px] h-80 absolute top-full left-0 bg-white border border-gray-300 rounded-[16px] z-10 shadow-sm transition-all duration-300 ease-in-out overflow-y-scroll ${isOpen ? 'z-50 shadow-md' : 'opacity-0 pointer-events-none'} 
          tablet:w-[150px] tablet:h-[179px] tablet:top-[114px] tablet:left-[72px] tablet:rounded-[8px] tablet:border-[1px]
          mobile:w-[150px] mobile:h-[180px] mobile:top-[112px] mobile:left-[25px] mobile:rounded-[8px] mobile:border-[1px]`}>
          <div className={`${type === 'location' ? 'grid grid-cols-2 mt-2' : 'flex flex-col w-[328px] h-42 mt-2'}`}>
            {itemsToDisplay.map(item => (
              <button
                key={item}
                onClick={() => {
                  setSelectedItem(item);
                  setIsOpen(false);
                }}
                className={`w-[164px] h-[64px] justify-between px-[24px] py-[16px] font-medium text-color-black-400 cursor-pointer transition duration-200 hover:bg-gray-100 
                  ${type === 'service' ? 'text-left w-[320px]' : 'border-r-[1px] border-l-[1px]'}
                  mobile:text-[14px] tablet:text-[14px]`}
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

export default Dropdown;
