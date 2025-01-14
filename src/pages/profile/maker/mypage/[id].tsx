import Image from "next/image";
import writing from "@public/assets/icon_writing.png";
import writing_gray from "@public/assets/icon_writing_gray.png";
import profileImg from "@public/assets/icon_maskgroup.png";
import star_sm from "@public/assets/icon_star.svg";

export default function MyPage() {
  return (
    <>
      <p className="text-2xl font-semibold py-8 mb-6">마이페이지</p>
      <div className=" bg-color-background-200 rounded-[16px] border border-color-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-6">
          {/* profile */}
          <div className="flex items-center gap-4  ">
            <Image src={profileImg} alt="프로필이미지" width={80} height={80} />
            <div className="flex flex-col ">
              <p className="text-2xl font-semibold">김코드</p>
              <p className="flex flex-wrap w-[500px] text-color-gray-400 text-xl  mobile:overflow-hidden mobile:text-ellipsis whitespace-nowrap mobile:w-[237px]">
                Dreamer의 여행을 소중하고 아름답게 이루어 드립니다.
              </p>
            </div>
          </div>
          {/* button */}
          <div className="pc:flex items-center gap-4 hidden">
            <button className="flex gap-[6px] items-center mobile: bg-color-background-200 border border-color-gray-200 rounded-[16px] px-[64px]  py-4">
              <p className="text-color-gray-400 text-xl whitespace-nowrap font-semibold">
                기본정보 수정
              </p>
              <Image src={writing_gray} alt="기본정보 수정" width={24} height={24} />
            </button>
            <button className="flex gap-[6px] items-center bg-color-blue-300 rounded-[16px] px-[64px]  py-4">
              <p className="text-white text-xl whitespace-nowrap font-semibold">내 프로필 수정</p>
              <Image src={writing} alt="프로필수정" width={24} height={24} />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-color-background-200 border border-color-gray-100 rounded-[16px] p-[26px]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-[6px] pr-4 border-r border-color-gray-100">
              <Image src={star_sm} alt="별이미지" width={24} height={24} />
              <p className="text-lg font-semibold">5.0</p>
              <p className="text-lg text-color-gray-300">리뷰수(179)</p>
            </div>
            <div className="flex items-center gap-[6px] pr-4 border-r border-color-gray-100">
              <p className="text-lg text-color-gray-300">경력</p>
              <p className="text-lg font-semibold">7년</p>
            </div>
            <div className="flex items-center gap-[6px]">
              <p className="text-lg font-semibold">344건</p>
              <p className="text-lg text-color-gray-300">확정</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-3 pr-4 border-r border-color-line-200">
              <p className="bg-color-background-200 border border-color-line-200 rounded-[4px] px-[6px] py-1 text-2lg text-color-gray-500 ">
                제공서비스
              </p>
              <p className="text-2lg ">축제참여형,맛집탐방형</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="bg-color-background-200 border border-color-line-200 rounded-[4px] px-[6px] py-1 text-2lg text-color-gray-500 ">
                지역
              </p>
              <p className="text-2lg ">서울,경기</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
