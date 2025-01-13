import React, { useState } from 'react';

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="bg-blue-100 border border-blue-500 text-blue-700 py-2 px-4 rounded w-full text-left"
      >
        지역
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white shadow-lg z-10 flex">
          <div className="flex-1 p-2">
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">전체</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">경기</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">강원</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">충남</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">대전</a>
          </div>
          <div className="flex-1 p-2">
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">서울</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">인천</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">충북</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">세종</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">전북</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
