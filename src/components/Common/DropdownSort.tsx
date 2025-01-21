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
        className={`w-[114px] h-10 px-[10px] py-2  flex justify-between items-center rounded-2 cursor-pointer transition duration-200 
          
          mobile-tablet:w-[150px] mobile-tablet:h-[36px] mobile-tablet:rounded-[8px] mobile-tablet:border-[1px] mobile-tablet:pl-[14px] mobile-tablet:pr-[10px] mobile-tablet:py-[6px]
          pc:max-w-[328px]
          `}
      >
        <p
          className={` text-color-black-400 text-md mobile-tablet:text-[14px] font-semibold
            `}
        >
          {selectedItem || placeholder}
        </p>
        <Image
          src={downGray}
          alt="dropdown icon"
          className={`transition-transform duration-200 mobile-tablet:w-[20px] mobile-tablet:h-[20px] pc:w-5 pc:h-5 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className={`
          w-[91px] h-[127px] rounded-[8px] border-[1px] top-full absolute  border-color-line-100 transition-all duration-300 ease-in-out overflow-y-scroll 
          mobile-tablet:top-full mobile-tablet:left-0 mobile-tablet:rounded-[8px] mobile-tablet:border-[1px] 
          mobile-tablet:w-full mobile-tablet:h-[144px] 
          ${isOpen ? 'z-50 shadow-sm' : 'opacity-0 pointer-events-none'} 
          `}>
          <div className="flex flex-col w-full h-8">
            {items.map(item => (
              <button
                key={item}
                onClick={() => {
                  setSelectedItem(item);
                  setIsOpen(false);
                }}
                className={`text-xs border border-color-gray-50 pr-1.5 pl-2 py-1.5 h-16 justify-between font-normal text-color-black-400 cursor-pointer transition duration-200 hover:bg-gray-100
                  mobile-tablet:w-full mobile-tablet:h-auto mobile-tablet:px-[14px] mobile-tablet:py-[8px]
                  text-left w-full mobile-tablet:text-[14px] 
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