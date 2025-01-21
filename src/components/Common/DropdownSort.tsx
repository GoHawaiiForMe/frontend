import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import downBlue from '@public/assets/dropdown_down_blue.svg';
import downGray from '@public/assets/dropdown_down_gray.svg';

const placeholder = '리뷰 많은순';
const items = ['리뷰 많은순','평점 높은순', '경력 높은순', '확정 많은순'];

const DropdownSort: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={dropdownRef} className="w-full relative mt-4">
      <button
        onClick={toggleDropdown}
        className={`w-[328px] h-16 px-6 py-4 flex justify-between items-center border-[1px] rounded-[16px] cursor-pointer transition duration-200 shadow-sm 
          ${isOpen ? 'border-color-blue-300 bg-color-blue-50 shadow-md' : ''} 
          ${selectedItem ? 'border-color-blue-300 bg-color-blue-50' : 'border-color-line-200'} 
          mobile-tablet:w-[150px] mobile-tablet:h-[36px] mobile-tablet:rounded-[8px] mobile-tablet:border-[1px] mobile-tablet:pl-[14px] mobile-tablet:pr-[10px] mobile-tablet:py-[6px]
          pc:max-w-[328px]
          `}
      >
        <p
          className={` text-color-black-400 text-[18px] mobile-tablet:text-[14px]
            ${selectedItem ? 'text-color-blue-300' : ''}`}
        >
          {selectedItem || placeholder}
        </p>
        <Image
          src={isOpen ? downBlue : downGray}
          alt="dropdown icon"
          className={`transition-transform duration-200 mobile-tablet:w-[20px] mobile-tablet:h-[20px] pc:w-[36px] pc:h-[36px] ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className={`
          w-[328px] h-80 absolute top-full border border-gray-300 rounded-[16px] z-10 shadow-sm transition-all duration-300 ease-in-out overflow-y-scroll 
          mobile-tablet:top-full mobile-tablet:left-0 mobile-tablet:rounded-[8px] mobile-tablet:border-[1px] 
          mobile-tablet:w-full mobile-tablet:h-[144px] 
          ${isOpen ? 'z-50 shadow-md' : 'opacity-0 pointer-events-none'} 
          `}>
          <div className="flex flex-col w-full mt-2">
            {items.map(item => (
              <button
                key={item}
                onClick={() => {
                  setSelectedItem(item);
                  setIsOpen(false);
                }}
                className={`h-[64px] justify-between px-[24px] py-[16px] font-medium text-color-black-400 cursor-pointer transition duration-200 hover:bg-gray-100
                  mobile-tablet:w-full mobile-tablet:h-auto mobile-tablet:px-[14px] mobile-tablet:py-[8px]
                  text-left w-full mobile-tablet:text-[14px] mobile-tablet:w-full
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

export default DropdownSort;