import Image from "next/image";
import Label from '@/components/Common/Label';
import like from "@public/assets/icon_like_black.svg";
import like_pink from "@public/assets/icon_like_pink.svg";
import star from "@public/assets/icon_star_md.svg";
import avatarImages from "@/utils/formatImage";
import Link from "next/link";
import link from "@public/assets/icon_link.svg";
import { ServiceType } from "@/services/findMakerService";
interface CardFindMakerProps {
  
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
  nickName: string;
  image: string;
  description: string;
  averageRating: number;
  totalReviews: number;
  totalFollows: number;
  totalConfirms: number;
  gallery: string;
  isFollowed?: boolean;
  serviceTypes: ServiceType[];
}
const CardFindMaker = ({
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
  likeIcon,
  nickName,
  image,
  description,
  averageRating,
  totalReviews,
  totalFollows,
  totalConfirms,
  isFollowed,
  serviceTypes,
  gallery,
}: CardFindMakerProps) => {
  const avatarImage = avatarImages.find((avatar) => avatar.key === image);
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 1023; 
  const computedPhotoSize = cardSize === 'sm' || isSmallScreen ? "46" : photoSize;
  const computedStarSize = cardSize === 'sm' || isSmallScreen ? "20" : starSize;
  return (
    <div className={`w-full h-[230px] border border-color-line-100 rounded-lg py-5 px-6 shadow-[2px_2px_10px_rgba(220,220,220,0.14),-2px_-2px_10px_rgba(220,220,220,0.14)]
     ${cardClassName} ${cardSize === 'sm' ? '!w-[327px] !h-[188px] py-4 px-[14px]' : ''} tablet:w-full tablet:h-[188px] mobile:w-full mobile:h-[188px]`}>
      <div className="flex mb-2 gap-4">
        
      
      {(serviceTypes || []).map((type, index) => (
        <Label 
          key={`${type}-${index}`}
          labelType={type}
          labelSize={labelSize}
          customLabelContainerClass={customLabelContainerClass}
          customLabelTextClass={customLabelTextClass}
        />
      ))}
      </div>

      <h2 className={`mb-4 text-2xl semibold text-color-black-300 ${titleSize} ${cardSize === 'sm' ? 'text-md !mb-1' : ''} mobile-tablet:text-sm`}>
        {description}
      </h2>

      <div className={`w-full h-[92px] flex items-center rounded-md border-color-line-100 border py-4 px-[18px] shadow-sm 
        ${innerboxClassName} ${cardSize === 'sm' ? 'h-[78px] !p-[10px] ' : ''} mobile-tablet:h-[78px] mobile-tablet:p-[10px]`}>
          <div className={`flex items-center w-20 h-20 ${profileClassName} ${cardSize === 'sm' ? 'min-w-12 min-h-12' : ''} mobile-tablet:min-w-12 mobile-tablet:min-h-12`}>
            <Image
              src={avatarImage ? avatarImage.src : image}
              alt="maker 이미지"
              width={parseInt(computedPhotoSize)}
              height={parseInt(computedPhotoSize)}
              className="border-2 border-color-blue-400 rounded-full mobile-tablet:hidden"
            />
            <Image 
              src={avatarImage ? avatarImage.src : image}
              alt="파일이미지" 
              width={46} 
              height={46} 
              className="border-2 border-color-blue-400 rounded-full pc:hidden" 
            />
          </div>
          <div className="flex flex-col w-full py-1">
            <div className="w-full flex justify-between ">
              <p className={`text-2lg semibold text-color-black-300 ${nameSize} ${cardSize === 'sm' ? 'text-md' : ''} mobile-tablet:text-md`}>{nickName}</p>
              <div className="flex gap-1 items-center">
                <div className=" transition-all duration-300">
                  <Image
                    src={isFollowed || likeIcon === 'pink' ? like_pink : like}
                    alt="heart"
                    width={24}
                    height={24}
                    
                  />
                </div>
                <p className={`text-2lg medium text-color-blue-400 ${heartNumberSize} ${cardSize === 'sm' ? 'text-xs' : ''} mobile-tablet:text-xs`}>{totalFollows}</p>
              </div>
            </div>
            <div className={`flex gap-4 items-center text-lg medium ${otherText} ${cardSize === 'sm' ? '!text-[10px] !gap-2' : ''} mobile-tablet:text-[10px] mobile-tablet:gap-2`}>
              <div className="flex gap-2 items-center">
                <Image
                  src={star}
                  alt="별이미지"
                  width={parseInt(computedStarSize)}
                  height={parseInt(computedStarSize)}
                  className="mobile-tablet:hidden"
                />
                <Image src={star} alt="별이미지" width={20} height={20} className="pc:hidden" />
                <p className=" text-color-black-300">{averageRating}</p>
                <p className=" text-color-gray-300">({totalReviews})</p>
              </div>
              <div className="h-5 border border-line-200" />
              <div className="flex gap-1 items-center">
              <Link
                  href={gallery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex"
                >
                  <Image src={link} alt="링크이미지" width={30} height={30} />
                  <p className="text-color-gray-400">SNS</p>
                </Link>
              </div>
              <div className="h-5 border border-line-200" />
              <div className="flex gap-2 items-center">
                <p className=" text-color-black-300">{totalConfirms}건</p>
                <p className=" text-color-gray-300">확정</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CardFindMaker;