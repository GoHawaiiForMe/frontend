import React from 'react';
import Image from 'next/image';
import shoppingIcon from '@public/assets/label_shopping.svg';
import foodTourIcon from '@public/assets/label_food_tour.svg';
import activityIcon from '@public/assets/activity.svg';
import cultureIcon from '@public/assets/label_culture.svg';
import festivalIcon from '@public/assets/label_festival.svg';
import relaxationIcon from '@public/assets/label_relaxation.svg';

interface LabelProps {
  type: 'SHOPPING' | 'FOOD_TOUR' | 'ACTIVITY' | 'CULTURE' | 'FESTIVAL' | 'RELAXATION';
}

const Label: React.FC<LabelProps> = ({ type }) => {
  let labelSrc;
  let labelText;

  switch (type) {
    case 'SHOPPING':
      labelSrc = shoppingIcon;
      labelText = '기념품/쇼핑형';
      break;
    case 'FOOD_TOUR':
      labelSrc = foodTourIcon;
      labelText = '맛집탐방형';
      break;
    case 'ACTIVITY':
      labelSrc = activityIcon;
      labelText = '액티비티형';
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
    default:
      labelSrc = shoppingIcon;
      labelText = '기념품/쇼핑형';
  }

  return (
    <div className='bg-color-blue-100 rounded-[4px] flex items-center pt-[4px] pr-[5px] pb-[4px] pl-[3px] mobile-tablet:pt-[2px] mobile-tablet:pr-[4px] mobile-tablet:pb-[2px] mobile-tablet:pl-[2px] gap-[4px] mobile-tablet:gap-[2px]'
    >
      <Image src={labelSrc} alt={`${type} label`} width={24} height={24} />
      <p className='text-color-blue-300 text-[16px] font-semibold leading-[24px] mobile-tablet:text-[13px] mobile-tablet:leading-[22px]'
       
      >{labelText}</p>
    </div>
  );
};

export default Label;