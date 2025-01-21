import React from 'react';
import Label from '@/components/Common/label';

const CardFindMaker = () => {
  return (
    <div className="w-[955px] h-[230px] border border-gray-200 rounded-lg p-4 shadow-md">
      <div className="flex mb-2 gap-4">
        <Label type="SHOPPING" />
        <Label type="REQUEST" />
      </div>
      <h2 className="text-2xl semibold text-color-black-300 mb-4">Dreamer의 여행을 행복하게 이루어 드립니다.</h2>
      <div className="border border-gray-200 flex items-center w-[907px] h-[92px]  rounded-lg py-4 px-[18px]">
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
        <div>
          <span className="font-bold">김코드 Maker</span>
          <div className="text-yellow-500 text-sm">
            ★ 5.0 (178) | 경력 7년 | 334건 확정
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFindMaker;