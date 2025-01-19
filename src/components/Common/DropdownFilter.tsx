import React, { useState } from 'react';
import downBlue from '@public/assets/dropdown_down_blue.svg';
import downGray from '@public/assets/dropdown_down_gray.svg';
//기본 문자값 변수 정의, 
const placeholder = '지역';
const items = ['전체','서울','인천','부산','제주도', '하와이', '태국', '베트남','호주', '뉴질랜드' ]

const placeholder2 = '서비스';
const items2 = ['액티비티형','식도락형','쇼핑형','문화형','휴식형','요청형']

// 받아서 처리할 것  -> 범용 컴포넌트 만들기 위해 

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
    <div className="flex relative">
      <button
        onClick={toggleDropdown}
        className="shadow w-40"
      >
        {/* 지역 //지역이 아닌 선택된 데이터로 보여지게 , 지역선택 -> 지역 or 선택x ->지역 ,  // 앞에가 true -> 앞에 렌더링  if not region  command D 
        데이터를 받아서 사용할 수 있게 하는 것  , 지역과 서비스를 받아서 사용할 수 있게 하는 것 make available whatever data you get 
        1. without data what would be = region  기본 설정 문자값 
        2. 실제 선택할 수 있는 데이터들 
         받아서 처리
          //데이터가 있어서 데이터를 가지고 그 데이터를 통해서 버튼을 만들것
         */}
        {selectedItem || placeholderText}
      </button>
      {isOpen && (
        <div className="absolute mt-1 bg-white shadow-lg z-10 flex" style={{ top: '100%' }}>
          <div className="flex-1 p-2">
            {itemsToDisplay.map(item => (
              <button
                key={item}
                onClick={() => setSelectedItem(item)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
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
