import React, { useState } from 'react';
import downBlue from '@public/assets/dropdown_down_blue.svg';
import downGray from '@public/assets/dropdown_down_gray.svg';

interface Props { 
	placeholder: string
	items: string[] 

}

const Dropdown: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null); //선택된 초기 데이터 없음 



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex relative">
      <button
        onClick={toggleDropdown}
        className="shadow w-40"
      >
        {selectedItem || props.placeholder } 
      </button>
      {isOpen && ( 
        <div className="absolute mt-1 bg-white shadow-lg z-10 flex" style={{ top: '100%' }}>
          <div className="flex-1 p-2">
            
           {props.items.map(item=>{
           	return  <button onClick={() => setSelectedItem(item)}  className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{item}</button>
           	})}

          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
