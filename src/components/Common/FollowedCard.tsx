import Image from "next/image";
import like from "@public/assets/icon_like_pink.svg";
import star from "@public/assets/icon_star_md.svg";
import default_img from "@public/assets/icon_default_profile.svg";
import Label from "./Label";
import link from "@public/assets/icon_link.svg";
import Link from "next/link";
import DEFAULT_1 from "@public/assets/img_avatar1.svg";
import DEFAULT_2 from "@public/assets/img_avatar2.svg";
import DEFAULT_3 from "@public/assets/img_avatar3.svg";
import DEFAULT_4 from "@public/assets/img_avatar4.svg";

const avatarImages = [
  { key: "DEFAULT_1", src: DEFAULT_1 },
  { key: "DEFAULT_2", src: DEFAULT_2 },
  { key: "DEFAULT_3", src: DEFAULT_3 },
  { key: "DEFAULT_4", src: DEFAULT_4 },
];

export interface FollowedCardProps {
  image: string;
  nickName: string;
  gallery: string;
  averageRating: number;
  totalReviews: number;
  totalFollows: number;
  totalConfirms: number;
  serviceTypes: string[];
}

const validLabelTypes = [
  "SHOPPING",
  "FOOD_TOUR",
  "RELAXATION",
  "CULTURE",
  "ACTIVITY",
  "FESTIVAL",
  "REQUEST",
  "PENDING",
  "CONFIRMED",
] as const;

export default function FollowedCard({
  image,
  nickName,
  gallery,
  averageRating,
  totalReviews,
  totalFollows,
  totalConfirms,
  serviceTypes,
}: FollowedCardProps) {
  const avatarImage = avatarImages.find((avatar) => avatar.key === image);

  return (
    <>
      <div className="flex w-full flex-col gap-5 rounded-2xl border border-color-line-100 p-5 shadow-md card:gap-0">
        <div className="flex flex-row gap-2">
          {serviceTypes.map((serviceType, index) => (
            <Label key={index} type={serviceType as (typeof validLabelTypes)[number]} />
          ))}
        </div>
        <div className="flex rounded-md border border-color-line-100 p-4">
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
              <div className="flex items-center gap-1">
                <p className="medium text-lg text-color-gray-300">경력</p>
                <Link href={gallery} target="_blank" rel="noopener noreferrer">
                  <Image src={link} alt="링크이미지" width={30} height={30} />
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
