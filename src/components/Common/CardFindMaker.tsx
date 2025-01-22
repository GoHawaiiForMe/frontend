import Image from "next/image";
import Label from '@/components/Common/label';
import like from "@public/assets/icon_like_black.svg";
import star from "@public/assets/icon_star_md.svg";
import default_img from "@public/assets/img_avatar3.svg";
import link from "@public/assets/icon_link.svg";

interface CardFindMakerProps {
  cardWidth?: string;
  textSize?: string;
  innerboxWidth?: string;
}
const CardFindMaker = ({ cardWidth, innerboxWidth, textSize }: CardFindMakerProps) => {
  return (
    <div className={`w-full h-[230px] border border-color-line-100 rounded-lg py-5 px-6 shadow-[2px_2px_10px_rgba(220,220,220,0.14),-2px_-2px_10px_rgba(220,220,220,0.14)]
     ${cardWidth}`}>
      <div className="flex mb-2 gap-4">
        <Label type="SHOPPING" />
        <Label type="REQUEST" />
      </div>

      <h2 className={`text-2xl semibold text-color-black-300 ${textSize}`}>Dreamer의 여행을 행복하게 이루어 드립니다.</h2>

      <div className={`w-full h-23 flex items-center   rounded-md border-color-line-100 border py-4 px-[18px] shadow-sm 
        ${innerboxWidth}`}>
          <div className="flex items-center min-w-20 min-h-20">
            <Image
              src={default_img}
              alt="maker 이미지"
              width={56}
              height={56}
              className="border-2 border-color-blue-400 rounded-full"
            />
          </div>
          <div className="flex flex-col w-full gap-4 py-1">
            <div className="w-full flex justify-between ">
              <p className="text-2lg semibold text-color-black-300">김이팀 Maker</p>
              <div className="flex gap-1 items-center">
                <Image src={like} alt="heart" width={24} height={24} />
                <p className="text-2lg medium text-color-blue-400">136</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex gap-2 items-center">
                <Image
                  src={star}
                  alt="별이미지"
                  width={24}
                  height={24}
                  className="pc:block mobile-tablet:hidden"
                />
                <Image src={star} alt="별이미지" width={20} height={20} className="pc:hidden" />
                <p className="text-lg medium text-color-black-300">5.0</p>
                <p className="text-lg medium text-color-gray-300">(178)</p>
              </div>
              <div className="h-5 border border-line-200" />
              <div className="flex gap-1 items-center">
                <p className="text-lg medium text-color-gray-300">경력</p>
                <Image src={link} alt="링크이미지" width={30} height={30} />
              </div>
              <div className="h-5 border border-line-200" />
              <div className="flex gap-2 items-center">
                <p className="text-lg medium text-color-black-300">334건</p>
                <p className="text-lg medium text-color-gray-300">확정</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CardFindMaker;