import React from 'react';
import Image from 'next/image';
import shoppingIcon from '@public/assets/label_shopping.svg';
import foodTourIcon from '@public/assets/label_food_tour.svg';
import activityIcon from '@public/assets/label_activity.svg';
import cultureIcon from '@public/assets/label_culture.svg';
import festivalIcon from '@public/assets/label_festival.svg';
import relaxationIcon from '@public/assets/label_relaxation.svg';
import fileIcon from '@public/assets/label_File_dock.svg';

interface LabelProps {
  type?: 'SHOPPING' | 'FOOD_TOUR' | 'ACTIVITY' | 'CULTURE' | 'FESTIVAL' | 'RELAXATION' | 'REQUEST' | 'PENDING' | 'CONFIRMED';
}

const Label: React.FC<LabelProps> = ({ type }) => {
  let labelSrc;
  let labelText;
  let containerClass = 'bg-color-blue-100';
  let textClass = 'text-color-blue-300';

  switch (type) {
    case 'SHOPPING':
      labelSrc = shoppingIcon;
      labelText = '기념품/쇼핑형';
      break;
    case 'FOOD_TOUR':
      labelSrc = foodTourIcon;
      labelText = '맛집 탐방형';
      break;
    case 'ACTIVITY':
      labelSrc = activityIcon;
      labelText = '액티비티/탐험형';
      break;
    case 'CULTURE':
      labelSrc = cultureIcon;
      labelText = '문화/역사탐방형';
      break;
    case 'FESTIVAL':
      labelSrc = festivalIcon;
      labelText = '축제참여형';
      break;
    case 'RELAXATION':
      labelSrc = relaxationIcon; 
      labelText = '휴양형';
      break;
    case 'REQUEST':
      labelSrc = fileIcon;
      labelText = '지정 견적';
      containerClass = 'bg-color-red-100';
      textClass = 'text-color-red-200';
      break;
    case 'PENDING':
      labelText = '견적 대기';
      containerClass = 'bg-color-gray-100 pr-2 pl-2';
      textClass = 'text-color-blue-400';
      break;
    case 'CONFIRMED':
      labelText = '견적 확정';
      containerClass = 'bg-color-gray-100 pr-2 pl-2';
      textClass = 'text-color-blue-400';
      break;
  
    default:
      labelText = '지정 라벨 없음';
      break;
  }

  return (
    <div className={`${containerClass} rounded-[4px] flex items-center pt-[4px] pr-[5px] pb-[4px] pl-[3px] mobile-tablet:pt-[2px] mobile-tablet:pr-[4px] mobile-tablet:pb-[2px] mobile-tablet:pl-[2px] gap-[4px] mobile-tablet:gap-[2px] `}>
      {labelSrc && <Image src={labelSrc} alt={`${type} label`} width={24} height={24} />}
      <p className={`${textClass} text-[16px] font-semibold leading-[24px] mobile-tablet:text-[13px] mobile-tablet:leading-[22px]`}>
        {labelText}
      </p>
    </div>
  );
};

export default Label;