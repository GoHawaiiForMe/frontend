import React from 'react';
import Image from 'next/image';
import labelGift from '@public/assets/la_gift.png';
import labelFood from '@public/assets/la_food.png';
import labelActivity from '@public/assets/액티비티형.png';
interface LabelProps {
  type: 'gift' | 'food' | 'activity';
}

const Label: React.FC<LabelProps> = ({ type }) => {
  let labelSrc;

  switch (type) {
    case 'gift':
      labelSrc = labelGift;
      break;
    case 'food':
      labelSrc = labelFood;
      break;
    case 'activity':
      labelSrc = labelActivity;
      break;
    default:
      labelSrc = labelGift;
  }

  return (
    <Image src={labelSrc} alt={`${type} label`} width={32} height={32} />
  );
};

export default Label;