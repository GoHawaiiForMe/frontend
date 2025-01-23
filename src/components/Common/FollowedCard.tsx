import Image from "next/image";
import like from "@public/assets/icon_like_pink.svg";
import star from "@public/assets/icon_star_md.svg";
import default_img from "@public/assets/icon_default_profile.svg";
import Label from "./Label";
import link from "@public/assets/icon_link.svg";

export default function SavedCard() {
  return (
    <>
      <div className="flex flex-col gap-5 card:gap-0 rounded-2xl border border-color-line-100 p-5 w-full shadow-md ">
        <div className="flex flex-row gap-2">
          <Label type="SHOPPING" />
          <Label type="SHOPPING" />
        </div>
        <div className="flex rounded-md border border-color-line-100 p-4">
          <div className="flex items-center mr-5 min-w-20 min-h-20">
            <Image
              src={default_img}
              alt="maker 이미지"
              width={80}
              height={80}
              className="border-2 border-color-blue-400 rounded-full"
            />
          </div>
          <div className="flex flex-col w-full gap-4 py-1 ">
            <div className="w-full flex justify-between  flex-wrap">
              <p className="text-2lg semibold text-color-black-300">김코드 Maker</p>
              <div className="flex gap-1 items-center">
                <Image src={like} alt="heart" width={24} height={24} />
                <p className="text-2lg medium text-color-blue-400">136</p>
              </div>
            </div>
            <div className="flex gap-2 items-center max-w-[420px] flex-wrap">
              <div className="flex gap-2 items-center ">
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
    </>
  );
}
