import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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
        className="w-[114px] h-[40px] px-[10px] py-2 flex justify-between items-center rounded-[8px] cursor-pointer transition duration-200 bg-color-gray-50"
      >
        <p className="text-color-black-400 text-md font-semibold mobile-tablet:text-xs">
          {selectedItem || placeholder}
        </p>
        <Image
          src={downGray}
          alt="dropdown icon"
          className={`transition-transform duration-200 w-5 h-5 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="w-[114px] h-[160px] rounded-[8px] border border-color-line-100 absolute top-full z-50 shadow-sm overflow-y-scroll transition-all duration-300 ease-in-out bg-white
        mobile-tablet:w-[91px] mobile-tablet:h-[127px] 
        ">
          <div className="flex flex-col w-full">
            {items.map(item => (
              <button
                key={item}
                onClick={() => {
                  setSelectedItem(item);
                  setIsOpen(false);
                }}
                className="text-md border-b border-color-gray-50 px-[10px] py-2 font-normal text-color-black-400 cursor-pointer transition duration-200 hover:bg-gray-100 
                mobile-tablet:py-1.5 mobile-tablet:pr-1.5 mobile-tablet:pl-2 mobile-tablet:text-xs"
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