import Image from "next/image";
import img_avatar1 from "@public/assets/img_avatar1.svg";
import Label from "@/components/Common/Label";
import StarRating from "@/components/Receive/StarRating";

export default function ReviewCard() {
  return (
    <div className="mb-[32px] flex flex-col rounded-2xl bg-color-gray-50 px-6 py-7 mobile-tablet:px-3 mobile-tablet:py-4">
      <div className="flex justify-between">
        <div className="justify-left flex items-center gap-[12px] mobile-tablet:mt-[6px]">
          <Label labelType="SHOPPING" customLabelContainerClass="rounded-lg" />
        </div>
        <p className="regular text-2lg text-color-gray-300 mobile-tablet:hidden">
          작성일 2024.07.02
        </p>
      </div>
      <div className="border-color bg-body.bg-gray mobile-tablet:px-[10px]mobile-tablet:border-color my-6 flex gap-6 rounded-md border-[1px] px-[18px] py-4 mobile-tablet:my-[14px] mobile-tablet:gap-3 mobile-tablet:rounded-none mobile-tablet:border-b-[1px] mobile-tablet:px-[10px]">
        <div className="flex h-20 w-20 flex-shrink-0 items-center mobile-tablet:h-[46px] mobile-tablet:w-[46px]">
          <Image
            src={img_avatar1}
            alt="프로필사진"
            width={80}
            height={80}
            className="rounded-full border-2 border-color-blue-400"
          />
        </div>
        <div className="flex w-full">
          <div className="w-full flex-col items-center justify-between gap-2 text-xs text-color-black-500">
            <p className="semibold text-xl mobile-tablet:text-lg">김코드 Maker</p>
            <div className="flex items-center gap-4 mobile-tablet:gap-1">
              <div className="medium flex flex-shrink-0 gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                <p>여행일</p>
                <p className="text-color-gray-400">2024.07.01(월)</p>
              </div>
              <p className="text-color-line-200">ㅣ</p>
              <div className="medium flex flex-shrink-0 gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                <p>플랜가</p>
                <p className="text-color-gray-400">210,000원</p>
              </div>
            </div>
            <div className="mobile-tablet:hidden">
              <StarRating type={true} initialRating={5} readonly={true} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="regular p-2 text-xl text-color-gray-500 mobile-tablet:text-md">
          처음 플랜 받아봤는데, 엄청 친절하시고 꼼꼼하세요! 귀찮게 이것저것 물어봤는데 잘
          알려주셨습니다. 국내 여행은 믿고 맡기세요!
        </p>
      </div>
      <div>
        <p className="regular text-right text-md text-color-gray-300 pc:hidden">
          작성일 2024.07.02
        </p>
      </div>
    </div>
  );
}
