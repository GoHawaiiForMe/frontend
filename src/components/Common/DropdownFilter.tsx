import React, { useState } from 'react';
import downBlue from '@public/assets/dropdown_down_blue.svg';
import downGray from '@public/assets/dropdown_down_gray.svg';

const placeholder = '지역';
const items = ['전체','서울','인천','부산','제주도', '하와이', '태국', '베트남','호주', '뉴질랜드' ]

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
        className={`w-[328px] h-16 font-[18px] text-color-black-400 px-4 flex justify-between items-center border rounded-[16px] bg-white cursor-pointer transition duration-200 shadow-sm 
          ${isOpen ? 'border-color-blue-300 bg-color-blue-50 shadow-md' : ''} 
          ${selectedItem ? 'border-color-blue-300' : 'border-color-line-200'} `}
      >
        <span className={`text-[18px] font-medium text-color-black-400 ${selectedItem ? 'text-color-blue-300' : ''}`}>
          {selectedItem || placeholderText}
        </span>
        <img src={isOpen ? downBlue : downGray} alt="dropdown icon" className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className={`w-[328px] h-80 absolute top-full left-0 bg-white border border-gray-300 rounded-[16px] z-10 shadow-sm transition duration-200 ${isOpen ? 'z-50 shadow-md' : ''}`}>
          <div className={`${type === 'location' ? 'grid grid-cols-2  overflow-y-auto mt-2' : 'flex flex-col w-[328px] h-36 overflow-y-hidden mt-2'}`}>
            {itemsToDisplay.map(item => (
              <button
                key={item}
                onClick={() => {
                  setSelectedItem(item);
                  setIsOpen(false);
                }}
                className={`px-3.5 py-3.5 text-[18px] font-medium text-color-black-400 cursor-pointer transition duration-200 hover:bg-gray-100 ${type === 'service' ? 'text-left' : ''}`}
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
