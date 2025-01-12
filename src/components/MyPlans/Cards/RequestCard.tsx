import Image from "next/image";
import iconBox from "@public/assets/icon_boximg.png";
import iconDocument from "@public/assets/icon_document.png";
import icon_like_red from "@public/assets/icon_like_red.png";
import img_avatar1 from "@public/assets/img_avatar1.svg";
import icon_active_star from "@public/assets/icon_active_star.svg";

export default function RequestCard() {
  return (
    <div className="flex flex-col mb-[32px] bg-color-gray-50 py-7 px-6 rounded-2xl mobile-tablet:px-3 mobile-tablet:py-4">
      <div className="flex justify-left items-center gap-[12px] mobile-tablet:mt-[6px]">
        <div className="flex items-center gap-[4px] bg-color-blue-100 rounded-[4px] p-[4px]">
          <Image src={iconBox} alt="box" width={24} height={24} className="w-[20px] h-[20px]" />
          <p className="text-[16px] font-semibold leading-[26px] text-color-blue-300 mobile:text-sm">
            소형 이사
          </p>
        </div>
        <div className="flex items-center gap-[4px] bg-color-red-100 rounded-[4px] p-[4px]">
          <Image
            src={iconDocument}
            alt="document"
            width={24}
            height={24}
            className="w-[20px] h-[20px]"
          />
          <p className="text-[16px] semibold leading-[26px] text-color-red-200 mobile:text-sm">
            지정 견적 요청
          </p>
        </div>
      </div>
      <div className="flex my-6 gap-6 border-color border-[1px] bg-body.bg-gray rounded-md py-4 px-[18px] mobile-tablet:gap-3 mobile-tablet:px-[10px] mobile-tablet:my-[14px]">
        <div className="w-14 h-14 border-2 border-color-blue-400 rounded-full overflow-hidden mobile-tablet:w-11 mobile-tablet:h-11">
          <div className="relative w-full h-full aspect-square">
            <Image src={img_avatar1} alt="프로필사진" layout="fill" objectFit="cover" />
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-full flex-col justify-between items-center text-xs text-color-black-500">
            <p className="text-xl semibold mobile-tablet:text-lg">김코드 Maker</p>
            <div className="flex items-center gap-4 mobile-tablet:gap-1">
              <div className="flex flex-shrink-0 gap-[6px] items-center text-lg medium mobile-tablet:text-sm mobile-tablet:gap-[5px]">
                <Image
                  src={icon_active_star}
                  alt="별점"
                  className="color-red-200 w-6 h-6 mobile-tablet:w-[14px] mobile-tablet:h-[14px]"
                />
                <p>55</p>
                <p className="text-color-gray-400">(178)</p>
              </div>
              <p className="text-color-line-200">ㅣ</p>
              <div className="flex flex-shrink-0 gap-[6px] text-lg medium mobile-tablet:text-sm mobile-tablet:gap-[5px]">
                <p className="text-color-gray-400">경력</p>
                <p>7년</p>
              </div>
              <p className="text-color-line-200">ㅣ</p>
              <div className="flex flex-shrink-0 gap-[6px] text-lg medium mobile-tablet:text-sm mobile-tablet:gap-[5px]">
                <p>334건</p>
                <p className="text-color-gray-400">확정</p>
              </div>
            </div>
          </div>
          <div className="flex text-color-blue-400 medium text-2lg mobile-tablet:text-sm">
            <Image
              src={icon_like_red}
              alt="좋아요"
              width={24}
              height={24}
              className="color-red-200 w-[24px] h-[24px] "
            />
            136
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-[12px] mobile-tablet:grid mobile-tablet:grid-cols-3 mobile-tablet:gap-0">
          <div className="flex items-center gap-3 mobile-tablet:col-span-3 mobile-tablet:mb-3">
            <p className="text-2lg regular text-color-gray-500 bg-color-background-400 rounded-[4px] px-[6px] py-[4px] whitespace-nowrap mobile-tablet:text-md">
              여행일
            </p>
            <p className="text-2lg medium  text-color-black-300 mobile-tablet:text-md">
              2024.07.01(월)
            </p>
          </div>
          <p className="text-color-line-200 mobile-tablet:hidden">ㅣ</p>
          <div className="flex items-center gap-3 ">
            <p className="text-[18px] font-normal leading-[26px] text-color-gray-500 bg-color-background-400 rounded-[4px] px-[6px] py-[4px] whitespace-nowrap mobile-tablet:text-md">
              여행지
            </p>
            <p className="text-[18px] font-medium leading-[26px] whitespace-nowrap text-color-black-300 mobile-tablet:text-md">
              서울 강남구
            </p>
          </div>
          {/* <p className="text-color-line-200 mobile-tablet:hidden">ㅣ</p>
          <div className="flex items-center gap-3 mobile-tablet:pl-2">
            <p className="text-[18px] font-normal leading-[26px] text-color-gray-500 bg-color-background-400 rounded-[4px] px-[6px] py-[4px] whitespace-nowrap mobile:text-md">
              도착
            </p>
            <p className="text-[18px] font-medium leading-[26px] whitespace-nowrap text-color-black-300 mobile-tablet:text-md">
              경기도 수원시
            </p>
          </div> */}
        </div>
        <div className="flex items-center justify-end gap-4 py-6">
          <p className="text-2lg medium mobile-tablet:text-md">견적 금액</p>
          <p className="text-2xl bold mobile-tablet:text-2lg"> 180,000원</p>
        </div>
      </div>
      <div className="flex gap-[11px] justify-between mobile:flex-col">
        <button className="text-nowrap w-full py-4 px-[32.5px] bg-color-blue-300 text-gray-50 semibold rounded-lg text-xl tablet:text-lg mobile:text-md mobile-tablet:py-[11px] mobile-tablet:px-[16px]">
          플랜 확정하기
        </button>
        <button className="text-nowrap w-full py-4 px-[32.5px] border-color-blue-300 border-solid border-[1px] text-color-blue-300 semibold rounded-lg  text-xl tablet:text-lg  mobile:text-md mobile-tablet:py-[11px] mobile-tablet:px-[16px]">
          상세보기
        </button>
      </div>
    </div>
  );
}
