import Image from "next/image";
import profileImg from "@public/assets/icon_maskgroup.png";
import star_sm from "@public/assets/icon_star.svg";
import StarRating from "@/components/Receive/StarRating";
import ReviewGraph from "@/components/Receive/ReviewGraph";
import { useState } from "react";
import Pagination from "@/components/Common/Pagination";
import Link from "next/link";

export default function MyPage({ userId }: { userId: string }) {
  const reviewStats = {
    1: 0,
    2: 0,
    3: 0,
    4: 8,
    5: 170,
  };

  // 현재 페이지를 저장할 state (처음에는 1페이지)
  const [currentPage, setCurrentPage] = useState(1);

  // 한 페이지에 보여줄 리뷰 수
  const itemsPerPage = 5;

  // 전체 리뷰 수
  const totalItems = 63; // 전체 리뷰 수

  // 전체 페이지 수
  // 63 ÷ 5 = 12.6 → 올림해서 13페이지가 됨
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 페이지 번호 클릭했을 때 실행될 함수
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 클릭한 페이지로 현재 페이지 변경
    // 여기서 페이지 변경에 따른 데이터 fetch 로직 구현
  };

  return (
    <>
      <p className="mb-6 py-8 text-2xl font-semibold">마이페이지</p>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-12 w-full rounded-[16px] border border-color-gray-100 bg-color-background-200 p-6 pb-12 shadow-sm mobile-tablet:mb-6 mobile-tablet:pb-6">
          <div className="mb-6 flex items-center justify-between gap-2">
            {/* profile */}
            <div className="flex items-center gap-4">
              <Image
                className="shrink-0"
                src={profileImg}
                alt="프로필이미지"
                width={80}
                height={80}
              />
              <div className="flex flex-col">
                <p className="text-2xl font-semibold">김코드</p>
                <p className="flex text-xl text-color-gray-400 mobile:line-clamp-1">
                  Dreamer의 여행을 소중하고 아름답게 이루어 드립니다.
                </p>
              </div>
            </div>
            {/* button */}
          </div>
          <div className="mb-3 flex flex-col gap-4 rounded-[16px] border border-color-gray-100 bg-color-background-200 p-[26px]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-[6px] border-r border-color-gray-100 pr-4">
                <Image src={star_sm} alt="별이미지" width={24} height={24} />
                <p className="text-lg font-semibold">5.0</p>
                <p className="text-lg text-color-gray-300">리뷰수(179)</p>
              </div>
              <div className="flex items-center gap-[6px] border-r border-color-gray-100 pr-4">
                <p className="text-lg text-color-gray-300">경력</p>
                <p className="text-lg font-semibold">7년</p>
              </div>
              <div className="flex items-center gap-[6px]">
                <p className="text-lg font-semibold">344건</p>
                <p className="text-lg text-color-gray-300">확정</p>
              </div>
            </div>
            <div className="flex gap-4 mobile:flex-col">
              <div className="flex items-center gap-3 border-r border-color-line-200 pr-4 mobile:border-none">
                <p className="rounded-[4px] border border-color-line-200 bg-color-background-200 px-[6px] py-1 text-2lg text-color-gray-500">
                  제공서비스
                </p>
                <p className="text-2lg">축제참여형,맛집탐방형</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="rounded-[4px] border border-color-line-200 bg-color-background-200 px-[6px] py-1 text-2lg text-color-gray-500">
                  지역
                </p>
                <p className="text-2lg">서울,경기</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 mobile:flex-col">
            <button className="mobile: flex items-center gap-[6px] rounded-[16px] border border-color-gray-200 bg-color-background-200 px-[64px] py-4 mobile:px-[100px]">
              <p className="text-xl font-semibold text-color-gray-400 mobile-tablet:whitespace-nowrap">
                기본정보 수정
              </p>
              {/* <Image src={writing_gray} alt="기본정보 수정" width={24} height={24} /> */}
            </button>
            <Link href={`/profile/maker/edit/${userId}`}>
              <button className="flex items-center gap-[6px] rounded-[16px] bg-color-blue-300 px-[64px] py-4 mobile:px-[100px]">
                <p className="text-xl font-semibold text-white mobile-tablet:whitespace-nowrap">
                  내 프로필 수정
                </p>
                {/* <Image src={writing} alt="프로필수정" width={24} height={24} /> */}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <p className="mb-8 text-lg font-bold">리뷰(179)</p>
        <div className="mb-10 flex items-center justify-center gap-10 mobile:flex-col">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-end gap-2">
              <p className="text-[64px] font-bold leading-[76.38px]">5.0</p>
              <p className="text-[38px] leading-[45.38px] text-color-gray-100">/5</p>
            </div>
            <div className="flex justify-end">
              <StarRating initialRating={5} readonly={true} />
            </div>
          </div>
          <div className="rounded-[16px] bg-color-background-200 px-[22px] py-4 shadow-md">
            <ReviewGraph reviewStats={reviewStats} />
          </div>
        </div>
      </div>
      <div className="border-b border-color-line-100 py-8">
        <div className="flex items-center gap-3">
          <p className="border-r border-color-line-200 pr-3 text-md">kim***</p>
          <p className="text-md text-color-gray-300">2025.01.14</p>
        </div>
        <div className="mb-4 mt-2">
          <StarRating type={true} initialRating={5} readonly={true} />
        </div>
        <p className="text-2lg">
          듣던대로 정말 친절하시고 물건도 잘 전달해 주셨어요! 나중에 또 여행갈때 김코드 Maker님께
          부탁드릴 여행입니다.! 비오는데 꼼꼼히 잘 해주셔서 감사드립니다.!
        </p>
      </div>
      <div className="border-b border-color-line-100 py-8">
        <div className="flex items-center gap-3">
          <p className="border-r border-color-line-200 pr-3 text-md">kim***</p>
          <p className="text-md text-color-gray-300">2025.01.14</p>
        </div>
        <div className="mb-4 mt-2">
          <StarRating type={true} initialRating={5} readonly={true} />
        </div>
        <p className="text-2lg">
          듣던대로 정말 친절하시고 물건도 잘 전달해 주셨어요! 나중에 또 여행갈때 김코드 Maker님께
          부탁드릴 여행입니다.! 비오는데 꼼꼼히 잘 해주셔서 감사드립니다.!
        </p>
      </div>{" "}
      <div className="border-b border-color-line-100 py-8">
        <div className="flex items-center gap-3">
          <p className="border-r border-color-line-200 pr-3 text-md">kim***</p>
          <p className="text-md text-color-gray-300">2025.01.14</p>
        </div>
        <div className="mb-4 mt-2">
          <StarRating type={true} initialRating={5} readonly={true} />
        </div>
        <p className="text-2lg">
          듣던대로 정말 친절하시고 물건도 잘 전달해 주셨어요! 나중에 또 여행갈때 김코드 Maker님께
          부탁드릴 여행입니다.! 비오는데 꼼꼼히 잘 해주셔서 감사드립니다.!
        </p>
      </div>{" "}
      <div className="border-b border-color-line-100 py-8">
        <div className="flex items-center gap-3">
          <p className="border-r border-color-line-200 pr-3 text-md">kim***</p>
          <p className="text-md text-color-gray-300">2025.01.14</p>
        </div>
        <div className="mb-4 mt-2">
          <StarRating type={true} initialRating={5} readonly={true} />
        </div>
        <p className="text-2lg">
          듣던대로 정말 친절하시고 물건도 잘 전달해 주셨어요! 나중에 또 여행갈때 김코드 Maker님께
          부탁드릴 여행입니다.! 비오는데 꼼꼼히 잘 해주셔서 감사드립니다.!
        </p>
      </div>{" "}
      <div className="border-b border-color-line-100 py-8">
        <div className="flex items-center gap-3">
          <p className="border-r border-color-line-200 pr-3 text-md">kim***</p>
          <p className="text-md text-color-gray-300">2025.01.14</p>
        </div>
        <div className="mb-4 mt-2">
          <StarRating type={true} initialRating={5} readonly={true} />
        </div>
        <p className="text-2lg">
          듣던대로 정말 친절하시고 물건도 잘 전달해 주셨어요! 나중에 또 여행갈때 김코드 Maker님께
          부탁드릴 여행입니다.! 비오는데 꼼꼼히 잘 해주셔서 감사드립니다.!
        </p>
      </div>
      <div className="my-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
