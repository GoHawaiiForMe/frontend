import Image from "next/image";
import like from "@public/assets/icon_like_pink.svg";
import star from "@public/assets/icon_star_md.svg";
import default_img from "@public/assets/icon_default_profile.svg";
import Label from "./Label";
import link from "@public/assets/icon_link.svg";
import Link from "next/link";
import avatarImages from "@/utils/formatImage";

export interface FollowedCardProps {
  image: string;
  nickName: string;
  gallery: string;
  averageRating: number;
  totalReviews: number;
  totalFollows: number;
  totalConfirms: number;
  serviceTypes: string[];
  makerId: string;
  onClick?: () => void;
}

export type LabelTypes =
  | "SHOPPING"
  | "FOOD_TOUR"
  | "RELAXATION"
  | "CULTURE"
  | "ACTIVITY"
  | "FESTIVAL"
  | "REQUEST"
  | "PENDING"
  | "CONFIRMED";

export default function FollowedCard({
  image,
  nickName,
  gallery,
  averageRating,
  totalReviews,
  totalFollows,
  totalConfirms,
  serviceTypes,
  makerId,
  onClick,
}: FollowedCardProps) {
  const avatarImage = avatarImages.find((avatar) => avatar.key === image);

  return (
    <>
      <div
        className="flex w-full flex-col gap-5 rounded-2xl border border-color-line-100 bg-color-gray-50 p-5 shadow-md hover:scale-[1.01]"
        onClick={onClick}
      >
        <div className="flex flex-row gap-2 overflow-hidden">
          {serviceTypes.map((serviceType, index) => (
            <div className="flex-shrink-0 overflow-hidden whitespace-nowrap">
              <Label key={index} labelType={serviceType as LabelTypes} />
            </div>
          ))}
        </div>
        <div key={makerId} className="flex rounded-md border border-color-line-100 p-4">
          <div className="mr-5 flex min-h-20 min-w-20 items-center">
            <Image
              src={avatarImage ? avatarImage.src : default_img}
              alt="maker 이미지"
              width={80}
              height={80}
              className="rounded-full border-2 border-color-blue-400"
            />
          </div>
          <div className="flex w-full flex-col gap-4 py-1">
            <div className="flex w-full flex-wrap justify-between">
              <p className="semibold text-2lg text-color-black-300">{nickName} Maker</p>
              <div className="flex items-center gap-1">
                <Image src={like} alt="heart" width={24} height={24} />
                <p className="medium text-2lg text-color-blue-400">{totalFollows}</p>
              </div>
            </div>
            <div className="flex max-w-[420px] flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <Image
                  src={star}
                  alt="별이미지"
                  width={24}
                  height={24}
                  className="pc:block mobile-tablet:hidden"
                />
                <Image src={star} alt="별이미지" width={20} height={20} className="pc:hidden" />
                <p className="medium text-lg text-color-black-300">{averageRating}</p>
                <p className="medium text-lg text-color-gray-300">({totalReviews})</p>
              </div>
              <div className="border-line-200 h-5 border" />
              <div>
                <Link href={gallery} target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center">
                    <Image src={link} alt="링크이미지" width={30} height={30} />
                    <p className="medium text-lg text-color-gray-300">SNS</p>
                  </div>
                </Link>
              </div>
              <div className="border-line-200 h-5 border" />
              <div className="flex items-center gap-2">
                <p className="medium text-lg text-color-black-300">{totalConfirms}건</p>
                <p className="medium text-lg text-color-gray-300">확정</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
