import Image from "next/image";
import Label from "@/components/Common/UI/Label";
import like from "@public/assets/icon_like_black.svg";
import like_pink from "@public/assets/icon_like_pink.svg";
import star from "@public/assets/icon_star_md.svg";
import avatarImages from "@/utils/formatImage";
import Link from "next/link";
import link from "@public/assets/icon_link.svg";
import { ServiceType } from "@/services/userService";
import React, { useState, useEffect, useRef } from "react";
import moreIcon from "@public/assets/label_more.svg";

interface CardFindMakerProps {
  labelSize?: "sm";
  cardSize?: "sm";
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
  likeIcon?: "pink";
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

const serviceTypeOrder: ServiceType[] = [
  "SHOPPING",
  "FOOD_TOUR",
  "ACTIVITY",
  "CULTURE",
  "FESTIVAL",
  "RELAXATION",
  "REQUEST",
  "PENDING",
  "CONFIRMED",
];

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
  const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 1023;
  const computedPhotoSize = cardSize === "sm" || isSmallScreen ? "46" : photoSize;
  const computedStarSize = cardSize === "sm" || isSmallScreen ? "20" : starSize;
  const computedLinkSize = cardSize === "sm" || isSmallScreen ? "20" : "30";
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState<number>(0);

  useEffect(() => {
    const updateCardWidth = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);

    return () => {
      window.removeEventListener("resize", updateCardWidth);
    };
  }, []);

  const sortedServiceTypes = [...serviceTypes].sort(
    (a, b) => serviceTypeOrder.indexOf(a) - serviceTypeOrder.indexOf(b),
  );

  return (
    <div
      ref={cardRef}
      className={`h-[230px] w-full rounded-lg border border-color-line-100 px-6 py-5 shadow-[2px_2px_10px_rgba(220,220,220,0.14),-2px_-2px_10px_rgba(220,220,220,0.14)] ${cardClassName} ${cardSize === "sm" ? "!h-[188px] !w-[327px] px-[14px] py-4" : ""} mobile:h-[188px] mobile:w-full tablet:h-[188px] tablet:w-full`}
    >
      <div className="mb-2 flex gap-4">
        {sortedServiceTypes
          .slice(
            0,
            cardWidth < 467
              ? 2
              : cardWidth < 650
                ? 3
                : cardWidth < 778
                  ? 4
                  : cardWidth < 840
                    ? 5
                    : sortedServiceTypes.length,
          )
          .map((type, index) => (
            <Label
              key={`${type}-${index}`}
              labelType={type}
              labelSize={labelSize}
              customLabelContainerClass={customLabelContainerClass}
              customLabelTextClass={customLabelTextClass}
            />
          ))}
        {sortedServiceTypes.length >
          (cardWidth < 467
            ? 2
            : cardWidth < 650
              ? 3
              : cardWidth < 778
                ? 4
                : cardWidth < 840
                  ? 5
                  : sortedServiceTypes.length) && (
          <Image src={moreIcon} alt="더 있음" width={24} height={24} />
        )}
      </div>

      <h2
        className={`semibold mb-4 text-2xl text-color-black-300 ${titleSize} ${cardSize === "sm" ? "!mb-1 text-md" : ""} mobile-tablet:text-sm`}
      >
        {description}
      </h2>

      <div
        className={`flex h-[92px] w-full items-center rounded-md border border-color-line-100 px-[18px] py-4 shadow-sm ${innerboxClassName} ${cardSize === "sm" ? "h-[78px] !p-[10px]" : ""} mobile-tablet:h-[78px] mobile-tablet:p-[10px]`}
      >
        <div
          className={`flex h-20 w-20 items-center ${profileClassName} ${cardSize === "sm" ? "min-h-12 min-w-12" : ""} mobile-tablet:min-h-12 mobile-tablet:min-w-12`}
        >
          <Image
            src={avatarImage ? avatarImage.src : image}
            alt="maker 이미지"
            width={parseInt(computedPhotoSize)}
            height={parseInt(computedPhotoSize)}
            className="rounded-full border-2 border-color-blue-400 mobile-tablet:hidden"
          />
          <Image
            src={avatarImage ? avatarImage.src : image}
            alt="파일이미지"
            width={46}
            height={46}
            className="rounded-full border-2 border-color-blue-400 pc:hidden"
          />
        </div>
        <div className="flex w-full flex-col py-1">
          <div className="flex w-full justify-between">
            <p
              className={`semibold text-2lg text-color-black-300 ${nameSize} ${cardSize === "sm" ? "text-md" : ""} mobile-tablet:text-md`}
            >
              {nickName}
            </p>
            <div className="flex items-center gap-1">
              <div className="transition-all duration-300">
                <Image
                  src={isFollowed || likeIcon === "pink" ? like_pink : like}
                  alt="heart"
                  width={24}
                  height={24}
                />
              </div>
              <p
                className={`medium text-2lg text-color-blue-400 ${heartNumberSize} ${cardSize === "sm" ? "text-xs" : ""} mobile-tablet:text-xs`}
              >
                {totalFollows}
              </p>
            </div>
          </div>
          <div
            className={`medium flex items-center gap-4 text-lg ${otherText} ${cardSize === "sm" ? "!gap-2 !text-[10px]" : ""} mobile-tablet:gap-2 mobile-tablet:text-[10px]`}
          >
            <div className="flex items-center gap-2">
              <Image
                src={star}
                alt="별이미지"
                width={parseInt(computedStarSize)}
                height={parseInt(computedStarSize)}
                className="mobile-tablet:hidden"
              />
              <Image src={star} alt="별이미지" width={20} height={20} className="pc:hidden" />
              <p className="text-color-black-300">{averageRating}</p>
              <p className="text-color-gray-300">({totalReviews})</p>
            </div>
            <div className="border-line-200 h-5 border" />
            <div className="flex items-center gap-1">
              <Link href={gallery} target="_blank" rel="noopener noreferrer" className="flex">
                <Image
                  src={link}
                  alt="링크이미지"
                  width={computedLinkSize}
                  height={computedLinkSize}
                  className="mobile-tablet:hidden"
                />
                <p className="text-color-gray-400">SNS</p>
              </Link>
            </div>
            <div className="border-line-200 h-5 border" />
            <div className="flex items-center gap-2">
              <p className="text-color-black-300">{totalConfirms}건</p>
              <p className="text-color-gray-300">확정</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFindMaker;
