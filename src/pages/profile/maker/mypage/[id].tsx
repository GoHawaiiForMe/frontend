import Image from "next/image";
import writing from "@public/assets/icon_writing.png";
import writing_gray from "@public/assets/icon_writing_gray.png";
import profileImg from "@public/assets/icon_maskgroup.png";
import star_sm from "@public/assets/icon_star.svg";
import StarRating from "@/components/Receive/StarRating";
import ReviewGraph from "@/components/Receive/ReviewGraph";

export default function MyPage() {
  const reviewStats = {
    1: 0,
    2: 0,
    3: 0,
    4: 8,
    5: 170,
  };

  const totalReviews = Object.values(reviewStats).reduce((acc, curr) => acc + curr, 0);

  return (
    <>
      <p className="text-2xl font-semibold py-8 mb-6">마이페이지</p>
      <div className="flex flex-col justify-center items-center ">
        <div className="w-full bg-color-background-200 rounded-[16px] border border-color-gray-100 p-6 shadow-sm pb-12 mb-12 mobile-tablet:mb-6 mobile-tablet:pb-6 ">
          <div className="flex items-center justify-between gap-2 mb-6">
            {/* profile */}
            <div className="flex items-center gap-4">
              <Image
                className="shrink-0"
                src={profileImg}
                alt="프로필이미지"
                width={80}
                height={80}
              />
              <div className="flex flex-col  ">
                <p className="text-2xl font-semibold">김코드</p>
                <p className="flex text-color-gray-400 text-xl mobile:line-clamp-1 ">
                  Dreamer의 여행을 소중하고 아름답게 이루어 드립니다.
                </p>
              </div>
            </div>
            {/* button */}
          </div>
          <div className="flex flex-col gap-4 bg-color-background-200 border border-color-gray-100 rounded-[16px] p-[26px] mb-3">
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
            <div className="flex gap-4 mobile:flex-col ">
              <div className="flex items-center gap-3 pr-4 border-r border-color-line-200 mobile:border-none">
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

          <div className="flex justify-end items-center gap-4 mobile:flex-col">
            <button className="flex gap-[6px] items-center mobile: bg-color-background-200 border border-color-gray-200 rounded-[16px] px-[64px]  py-4 mobile:px-[100px]">
              <p className="text-color-gray-400 text-xl mobile-tablet:whitespace-nowrap font-semibold">
                기본정보 수정
              </p>
              {/* <Image src={writing_gray} alt="기본정보 수정" width={24} height={24} /> */}
            </button>
            <button className="flex gap-[6px] items-center bg-color-blue-300 rounded-[16px] px-[64px]  py-4 mobile:px-[100px]">
              <p className="text-white text-xl mobile-tablet:whitespace-nowrap font-semibold">
                내 프로필 수정
              </p>
              {/* <Image src={writing} alt="프로필수정" width={24} height={24} /> */}
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className="text-lg font-bold mb-8">리뷰(179)</p>
        <div className="flex items-center justify-center gap-10 mb-10 mobile:flex-col">
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="flex items-end gap-2">
              <p className="text-[64px] leading-[76.38px] font-bold">5.0</p>
              <p className="text-[38px] leading-[45.38px] text-color-gray-100">/5</p>
            </div>
            <div className="flex justify-end">
              <StarRating initialRating={5} readonly={true} />
            </div>
          </div>
          <div className="px-[22px] py-4 bg-color-background-200 rounded-[16px] shadow-md ">
            <ReviewGraph reviewStats={reviewStats} />
          </div>
        </div>
      </div>
      <div className="py-8 border-b border-color-line-100">
        <div className="flex items-center gap-3">
          <p className="text-md pr-3 border-r border-color-line-200">kim***</p>
          <p className="text-md text-color-gray-300">2025.01.14</p>
        </div>
        <div className="mt-2 mb-4">
          <StarRating type={true} initialRating={5} readonly={true} />
        </div>
        <p className="text-2lg">
          듣던대로 정말 친절하시고 물건도 잘 전달해 주셨어요! 나중에 또 여행갈때 김코드 Maker님께
          부탁드릴 여행입니다.! 비오는데 꼼꼼히 잘 해주셔서 감사드립니다.!
        </p>
      </div>
      <div className="py-8 border-b border-color-line-100">
        <div className="flex items-center gap-3">
          <p className="text-md pr-3 border-r border-color-line-200">kim***</p>
          <p className="text-md text-color-gray-300">2025.01.14</p>
        </div>
        <div className="mt-2 mb-4">
          <StarRating type={true} initialRating={5} readonly={true} />
        </div>
        <p className="text-2lg">
          듣던대로 정말 친절하시고 물건도 잘 전달해 주셨어요! 나중에 또 여행갈때 김코드 Maker님께
          부탁드릴 여행입니다.! 비오는데 꼼꼼히 잘 해주셔서 감사드립니다.!
        </p>
      </div>   <div className="py-8 border-b border-color-line-100">
        <div className="flex items-center gap-3">
          <p className="text-md pr-3 border-r border-color-line-200">kim***</p>
          <p className="text-md text-color-gray-300">2025.01.14</p>
        </div>
        <div className="mt-2 mb-4">
          <StarRating type={true} initialRating={5} readonly={true} />
        </div>
        <p className="text-2lg">
          듣던대로 정말 친절하시고 물건도 잘 전달해 주셨어요! 나중에 또 여행갈때 김코드 Maker님께
          부탁드릴 여행입니다.! 비오는데 꼼꼼히 잘 해주셔서 감사드립니다.!
        </p>
      </div>   <div className="py-8 border-b border-color-line-100">
        <div className="flex items-center gap-3">
          <p className="text-md pr-3 border-r border-color-line-200">kim***</p>
          <p className="text-md text-color-gray-300">2025.01.14</p>
        </div>
        <div className="mt-2 mb-4">
          <StarRating type={true} initialRating={5} readonly={true} />
        </div>
        <p className="text-2lg">
          듣던대로 정말 친절하시고 물건도 잘 전달해 주셨어요! 나중에 또 여행갈때 김코드 Maker님께
          부탁드릴 여행입니다.! 비오는데 꼼꼼히 잘 해주셔서 감사드립니다.!
        </p>
      </div>   <div className="py-8 border-b border-color-line-100">
        <div className="flex items-center gap-3">
          <p className="text-md pr-3 border-r border-color-line-200">kim***</p>
          <p className="text-md text-color-gray-300">2025.01.14</p>
        </div>
        <div className="mt-2 mb-4">
          <StarRating type={true} initialRating={5} readonly={true} />
        </div>
        <p className="text-2lg">
          듣던대로 정말 친절하시고 물건도 잘 전달해 주셨어요! 나중에 또 여행갈때 김코드 Maker님께
          부탁드릴 여행입니다.! 비오는데 꼼꼼히 잘 해주셔서 감사드립니다.!
        </p>
      </div>   <div className="py-8 border-b border-color-line-100">
        <div className="flex items-center gap-3">
          <p className="text-md pr-3 border-r border-color-line-200">kim***</p>
          <p className="text-md text-color-gray-300">2025.01.14</p>
        </div>
        <div className="mt-2 mb-4">
          <StarRating type={true} initialRating={5} readonly={true} />
        </div>
        <p className="text-2lg">
          듣던대로 정말 친절하시고 물건도 잘 전달해 주셨어요! 나중에 또 여행갈때 김코드 Maker님께
          부탁드릴 여행입니다.! 비오는데 꼼꼼히 잘 해주셔서 감사드립니다.!
        </p>
      </div>   <div className="py-8 border-b border-color-line-100">
        <div className="flex items-center gap-3">
          <p className="text-md pr-3 border-r border-color-line-200">kim***</p>
          <p className="text-md text-color-gray-300">2025.01.14</p>
        </div>
        <div className="mt-2 mb-4">
          <StarRating type={true} initialRating={5} readonly={true} />
        </div>
        <p className="text-2lg">
          듣던대로 정말 친절하시고 물건도 잘 전달해 주셨어요! 나중에 또 여행갈때 김코드 Maker님께
          부탁드릴 여행입니다.! 비오는데 꼼꼼히 잘 해주셔서 감사드립니다.!
        </p>
      </div>   <div className="py-8 border-b border-color-line-100">
        <div className="flex items-center gap-3">
          <p className="text-md pr-3 border-r border-color-line-200">kim***</p>
          <p className="text-md text-color-gray-300">2025.01.14</p>
        </div>
        <div className="mt-2 mb-4">
          <StarRating type={true} initialRating={5} readonly={true} />
        </div>
        <p className="text-2lg">
          듣던대로 정말 친절하시고 물건도 잘 전달해 주셨어요! 나중에 또 여행갈때 김코드 Maker님께
          부탁드릴 여행입니다.! 비오는데 꼼꼼히 잘 해주셔서 감사드립니다.!
        </p>
      </div>   <div className="py-8 border-b border-color-line-100">
        <div className="flex items-center gap-3">
          <p className="text-md pr-3 border-r border-color-line-200">kim***</p>
          <p className="text-md text-color-gray-300">2025.01.14</p>
        </div>
        <div className="mt-2 mb-4">
          <StarRating type={true} initialRating={5} readonly={true} />
        </div>
        <p className="text-2lg">
          듣던대로 정말 친절하시고 물건도 잘 전달해 주셨어요! 나중에 또 여행갈때 김코드 Maker님께
          부탁드릴 여행입니다.! 비오는데 꼼꼼히 잘 해주셔서 감사드립니다.!
        </p>
      </div>   <div className="py-8 border-b border-color-line-100">
        <div className="flex items-center gap-3">
          <p className="text-md pr-3 border-r border-color-line-200">kim***</p>
          <p className="text-md text-color-gray-300">2025.01.14</p>
        </div>
        <div className="mt-2 mb-4">
          <StarRating type={true} initialRating={5} readonly={true} />
        </div>
        <p className="text-2lg">
          듣던대로 정말 친절하시고 물건도 잘 전달해 주셨어요! 나중에 또 여행갈때 김코드 Maker님께
          부탁드릴 여행입니다.! 비오는데 꼼꼼히 잘 해주셔서 감사드립니다.!
        </p>
      </div>   <div className="py-8 border-b border-color-line-100">
        <div className="flex items-center gap-3">
          <p className="text-md pr-3 border-r border-color-line-200">kim***</p>
          <p className="text-md text-color-gray-300">2025.01.14</p>
        </div>
        <div className="mt-2 mb-4">
          <StarRating type={true} initialRating={5} readonly={true} />
        </div>
        <p className="text-2lg">
          듣던대로 정말 친절하시고 물건도 잘 전달해 주셨어요! 나중에 또 여행갈때 김코드 Maker님께
          부탁드릴 여행입니다.! 비오는데 꼼꼼히 잘 해주셔서 감사드립니다.!
        </p>
      </div>   <div className="py-8 border-b border-color-line-100">
        <div className="flex items-center gap-3">
          <p className="text-md pr-3 border-r border-color-line-200">kim***</p>
          <p className="text-md text-color-gray-300">2025.01.14</p>
        </div>
        <div className="mt-2 mb-4">
          <StarRating type={true} initialRating={5} readonly={true} />
        </div>
        <p className="text-2lg">
          듣던대로 정말 친절하시고 물건도 잘 전달해 주셨어요! 나중에 또 여행갈때 김코드 Maker님께
          부탁드릴 여행입니다.! 비오는데 꼼꼼히 잘 해주셔서 감사드립니다.!
        </p>
      </div>
    </>
  );
}
