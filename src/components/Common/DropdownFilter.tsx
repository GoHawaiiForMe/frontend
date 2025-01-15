import React, { useState } from 'react';
import downBlue from '@public/assets/dropdown_down_blue.svg';
import downGray from '@public/assets/dropdown_down_gray.svg';

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex relative">
      <button
        onClick={toggleDropdown}
        className="shadow w-40"
      >
        지역
      </button>
      {isOpen && (
        <div className="absolute mt-1 bg-white shadow-lg z-10 flex" style={{ top: '100%' }}>
          <div className="flex-1 p-2">
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">전체</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">서울</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">제주도</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">인천</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">부산</a>
          </div>
          <div className="flex-1 p-2">
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">하와이</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">태국</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">베트남</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">호주</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">뉴질랜드</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
