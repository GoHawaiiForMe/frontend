import Image from "next/image";
import Label from '@/components/Common/Label';
import like from "@public/assets/icon_like_black.svg";
import like_pink from "@public/assets/icon_like_pink.svg";
import star from "@public/assets/icon_star_md.svg";
import default_img from "@public/assets/img_avatar3.svg";


interface CardFindMakerProps {
  firstLabelType?: 'SHOPPING' | 'FOOD_TOUR' | 'ACTIVITY' | 'CULTURE' | 'FESTIVAL' | 'RELAXATION' | 'REQUEST' | 'PENDING' | 'CONFIRMED';
  secondLabelType?: 'SHOPPING' | 'FOOD_TOUR' | 'ACTIVITY' | 'CULTURE' | 'FESTIVAL' | 'RELAXATION' | 'REQUEST' | 'PENDING' | 'CONFIRMED';
  labelSize?: 'sm';
  cardSize?: 'sm';
  customLabelContainerClass?: string;
  customLabelTextClass?: string; 
  cardClassName?: string;
  titleSize?: string;
  innerboxClassName?: string;
  profileClassName?: string;
  photoSize?: string;
  nameSize?: string;
  otherText?: string;
  starSize?: string;
  heartNumberSize?: string;
  likeIcon?: 'pink';

}
const CardFindMaker = ({
  firstLabelType,
  secondLabelType,
  labelSize,
  cardSize,
  cardClassName,
  innerboxClassName,
  titleSize,
  profileClassName,
  photoSize = "56",
  starSize = "24",
  nameSize,
  otherText,
  heartNumberSize,
  customLabelContainerClass,
  customLabelTextClass,
  likeIcon
}: CardFindMakerProps) => {
  
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 1023; 
  const computedPhotoSize = cardSize === 'sm' || isSmallScreen ? "46" : photoSize;
  const computedStarSize = cardSize === 'sm' || isSmallScreen ? "20" : starSize;
  return (
    <div className={`w-full h-[230px] border border-color-line-100 rounded-lg py-5 px-6 shadow-[2px_2px_10px_rgba(220,220,220,0.14),-2px_-2px_10px_rgba(220,220,220,0.14)]
     ${cardClassName} ${cardSize === 'sm' ? 'w-[327px] h-[188px] py-4 px-[14px]' : ''} tablet:w-[600px] tablet:h-[188px] mobile:w-[327px] mobile:h-[188px]`}>
      <div className="flex mb-2 gap-4">
        <Label 
          labelType={firstLabelType}
          labelSize={labelSize}
          customLabelContainerClass={customLabelContainerClass}
          customLabelTextClass={customLabelTextClass}
        />
        <Label 
          labelType={secondLabelType}
          labelSize={labelSize}
          customLabelContainerClass={customLabelContainerClass}
          customLabelTextClass={customLabelTextClass}
        />
      </div>

      <h2 className={`mb-4 text-2xl semibold text-color-black-300 ${titleSize} ${cardSize === 'sm' ? 'text-sm mb-1' : ''}`}>Dreamer의 여행을 행복하게 이루어 드립니다.</h2>

      <div className={`w-full h-[92px] flex items-center   rounded-md border-color-line-100 border py-4 px-[18px] shadow-sm 
        ${innerboxClassName} ${cardSize === 'sm' ? 'h-[78px] !p-[10px] ' : ''} mobile-tablet:h-[78px] mobile-tablet:p-[10px]`}>
          <div className={`flex items-center w-20 h-20 ${profileClassName} ${cardSize === 'sm' ? 'min-w-12 min-h-12' : ''} mobile-tablet:min-w-12 mobile-tablet:min-h-12`}>
            <Image
              src={default_img}
              alt="maker 이미지"
              width={parseInt(computedPhotoSize)}
              height={parseInt(computedPhotoSize)}
              className="border-2 border-color-blue-400 rounded-full"
              
            />
          </div>
          <div className="flex flex-col w-full py-1">
            <div className="w-full flex justify-between ">
              <p className={`text-2lg semibold text-color-black-300 ${nameSize} ${cardSize === 'sm' ? 'text-md' : ''} mobile-tablet:text-md`}>김이팀 Maker</p>
              <div className="flex gap-1 items-center">
                <Image src={likeIcon === 'pink' ? like_pink : like} alt="heart" width={24} height={24} />
                <p className={`text-2lg medium text-color-blue-400 ${heartNumberSize} ${cardSize === 'sm' ? 'text-xs' : ''} mobile-tablet:text-xs`}>136</p>
              </div>
            </div>
            <div className={`flex gap-2 items-center text-lg medium ${otherText} ${cardSize === 'sm' ? 'text-[10px]' : ''} mobile-tablet:text-[10px]`}>
              <div className="flex gap-2 items-center">
                <Image
                  src={star}
                  alt="별이미지"
                  width={parseInt(computedStarSize)}
                  height={parseInt(computedStarSize)}
                />
                <Image src={star} alt="별이미지" width={20} height={20} className="pc:hidden" />
                <p className=" text-color-black-300">5.0</p>
                <p className=" text-color-gray-300">(178)</p>
              </div>
              <div className="h-5 border border-line-200" />
              <div className="flex gap-1 items-center">
                <p className=" text-color-gray-300">경력</p>
                <p className=" text-color-black-300">7년</p>
              </div>
              <div className="h-5 border border-line-200" />
              <div className="flex gap-2 items-center">
                <p className=" text-color-black-300">334건</p>
                <p className=" text-color-gray-300">확정</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CardFindMaker;