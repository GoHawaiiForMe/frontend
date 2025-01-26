"use client";
//useEffect, useState등을 사용할 수 있게 함(CSR로 전환)

interface KakaoSDK {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendScrap: (options: { requestUrl: string }) => void;
  };
}

declare global {
  interface Window {
    Kakao: KakaoSDK;
  }
}

import Image from "next/image";
import Label from "@/components/Common/Label";
import icon_like_red from "@public/assets/icon_like_red.png";
import icon_like_black from "@public/assets/icon_like_black.svg";
import img_avatar1 from "@public/assets/img_avatar1.svg";
import icon_active_star from "@public/assets/icon_active_star.svg";
import icon_outline from "@public/assets/icon_outline.png";
import icon_kakao from "@public/assets/icon_kakao.png";
import icon_facebook from "@public/assets/icon_facebook.png";
import link from "@public/assets/icon_link.svg";
import Link from "next/link";
import PlanCard from "@/components/MyPlans/Cards/PlanCard";
import { useEffect } from "react";
import ClipboardCopy from "@/components/Common/ClipboardCopy";
import { useRouter } from "next/router";

export default function RequestDetailDreamer() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao) {
      const Kakao = window.Kakao;
      if (!Kakao.isInitialized()) {
        Kakao.init("0337a68dec8e9d5ebea78113c3b9fc62");
      }
    }
  }, []);
  //init괄호 안에는 카카오디벨로퍼스에서 받은 javascript키 입력

  const shareMessage = () => {
    if (typeof window !== "undefined" && window.Kakao) {
      const Kakao = window.Kakao;
      Kakao.Share.sendScrap({
        requestUrl: "http://localhost:3000",
      });
    }
  };
  //requestUrl부분에 사용할 도메인 입력(현재 테스트중으로 로컬도메인)

  const btnShareFb = () => {
    const pageUrl = "http://localhost:3000";
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${pageUrl}`);
  };

  const planData = {
    selectedPlanId: 2, // 기본으로 선택된 플랜의 ID
    plans: [
      {
        id: 1,
        name: "플랜이름몇자까지되나요",
        requestDate: "2025-01-01",
        tripType: "휴양지",
        serviceArea: "서울",
        tripPeriod: "2025-01-10 ~ 2025-01-15", // 여행 시작일 ~ 여행 종료일
        details: "특별 요청 사항 없음",
      },
      {
        id: 2,
        name: "플랜이름더더더더더더더길어져도되나요",
        requestDate: "2025-02-01",
        tripType: "액티비티",
        serviceArea: "부산",
        tripPeriod: "2025-02-10 ~ 2025-02-17", // 여행 시작일 ~ 여행 종료일
        details: "특별 요청 없음",
      },
      {
        id: 3,
        name: "안신나는 제주도 출장",
        requestDate: "2025-03-01",
        tripType: "비즈니스",
        serviceArea: "제주도",
        tripPeriod: "2025-03-05 ~ 2025-03-07", // 여행 시작일 ~ 여행 종료일
        details: "업무 일정 조정 필요",
      },
      {
        id: 4,
        name: "경주에도 바닷가가 있나요?",
        requestDate: "2025-04-01",
        tripType: "휴양지",
        serviceArea: "경주",
        tripPeriod: "2025-04-05 ~ 2025-04-10", // 여행 시작일 ~ 여행 종료일
        details: "해변 근처 숙소",
      },
      {
        id: 5,
        name: "경주에도 바닷가가 있나요?2",
        requestDate: "2025-05-01",
        tripType: "휴양지",
        serviceArea: "경주",
        tripPeriod: "2025-04-05 ~ 2025-04-10", // 여행 시작일 ~ 여행 종료일
        details: "해변 근처 숙소",
      },
      {
        id: 6,
        name: "드롭다운 스크롤 테스트",
        requestDate: "2025-06-01",
        tripType: "관광지",
        serviceArea: "전주",
        tripPeriod: "2025-07-05 ~ 2025-07-10", // 여행 시작일 ~ 여행 종료일
        details: "비빔밥 맛집을 들러주세요",
      },
    ],
  };

  // PlanCard 컴포넌트에 전달할 데이터
  const router = useRouter();
  const { id } = router.query;
  const selectedPlan = id
    ? planData.plans.find((plan) => plan.id === Number(id))
    : planData.plans.find((plan) => plan.id === 1);

  if (!selectedPlan) {
    return <div>Loading...</div>;
  }

  const planDataForCard = {
    selectedPlanId: selectedPlan.id,
    plans: planData.plans, // 모든 플랜 데이터를 전달
  };

  return (
    <div className="relative flex w-full flex-col">
      <div className="semibold center flex py-8 text-2xl text-color-black-400 mobile-tablet:text-2lg">
        견적 상세
      </div>
      <div className="mb:flex-col flex gap-24 mobile-tablet:flex-col mobile-tablet:gap-0">
        <div className="flex flex-grow flex-col">
          <div className="flex">
            <div className="flex w-full flex-col rounded-2xl bg-color-gray-50 px-6 py-7 mobile-tablet:px-3 mobile-tablet:py-4">
              <div className="justify-left flex items-center gap-[12px] mobile-tablet:mt-[6px]">
                <Label labelType="RELAXATION" customLabelContainerClass="rounded-lg" />
                <Label labelType="REQUEST" customLabelContainerClass="rounded-lg" />
              </div>
              <div className="border-color bg-body.bg-gray my-6 flex gap-6 rounded-md border-[1px] px-[18px] py-4 mobile-tablet:my-[14px] mobile-tablet:gap-3 mobile-tablet:px-[10px]">
                <div className="flex h-20 w-20 items-center mobile-tablet:h-[46px] mobile-tablet:w-[46px]">
                  <Image
                    src={img_avatar1}
                    alt="프로필사진"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-color-blue-400"
                  />
                </div>
                <div className="flex w-full">
                  <div className="w-full flex-col items-center justify-between text-xs text-color-black-500">
                    <p className="semibold text-xl mobile-tablet:text-lg">김코드 Maker</p>
                    <div className="flex items-center">
                      <div className="medium flex flex-shrink-0 items-center gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                        <Image
                          src={icon_active_star}
                          alt="별점"
                          className="color-red-200 h-6 w-6 mobile-tablet:h-[14px] mobile-tablet:w-[14px]"
                        />
                        <p>55</p>
                        <p className="text-color-gray-400">(178)</p>
                      </div>
                      <p className="mx-4 text-color-line-200 mobile-tablet:mx-1">ㅣ</p>
                      <div className="medium flex flex-shrink-0 gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                        <Link
                          href="https://www.instagram.com/codeit_kr/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex"
                        >
                          <Image src={link} alt="링크이미지" width={30} height={30} />
                          <p className="text-color-gray-400">SNS</p>
                        </Link>
                      </div>
                      <p className="mx-4 text-color-line-200 mobile-tablet:mx-1">ㅣ</p>
                      <div className="medium flex flex-shrink-0 gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                        <p>334건</p>
                        <p className="text-color-gray-400">확정</p>
                      </div>
                    </div>
                  </div>
                  <div className="medium flex text-2lg text-color-blue-400 mobile-tablet:text-sm">
                    <Image
                      src={icon_like_red}
                      alt="좋아요"
                      width={24}
                      height={24}
                      className="color-red-200 h-[24px] w-[24px]"
                    />
                    136
                  </div>
                </div>
              </div>
              <div>
                <p className="text-black-300 semibold text-2xl mobile-tablet:text-lg">
                  고객님의 꿈을 행복하게 이루어 드립니다.
                </p>
              </div>
            </div>
          </div>
          <hr className="border-Line-100 my-10 mobile-tablet:my-6" />
          <div className="flex flex-col gap-8 mobile-tablet:gap-4">
            <p className="semibold text-2xl text-color-black-400 mobile-tablet:text-lg">견적가</p>
            <p className="bold text-3xl text-color-black-400 mobile-tablet:text-xl">180,000원</p>
          </div>
          <hr className="border-Line-100 my-10 mobile-tablet:my-6" />
          <div className="flex flex-col gap-[22px] pc:hidden">
            <p className="semibold text-black-400 text-xl">플랜 공유하기</p>
            <div className="flex gap-4">
              <div className="my-6 h-10 w-10">
                <ClipboardCopy icon={icon_outline} /> {/*링크 복사 버튼*/}
              </div>
              <button onClick={shareMessage}>
                <Image src={icon_kakao} alt="카카오톡 공유" width={40} height={40} />
              </button>
              <button onClick={btnShareFb}>
                <Image src={icon_facebook} alt="페이스북 공유" width={40} height={40} />
              </button>
            </div>
          </div>
          <hr className="border-Line-100 my-6 pc:hidden" />
          <div>
            <p className="semibold mb-8 text-2xl text-color-black-400">플랜 정보</p>
            <PlanCard planData={planDataForCard} planId={selectedPlan.id} />
          </div>
        </div>
        <div className="flex flex-col flex-nowrap mobile-tablet:relative mobile-tablet:w-full mobile-tablet:flex-grow">
          <div className="flex w-full mobile:px-6 tablet:px-[72px] mobile-tablet:fixed mobile-tablet:inset-x-0 mobile-tablet:bottom-0 mobile-tablet:flex-grow mobile-tablet:gap-2 mobile-tablet:bg-color-gray-50 mobile-tablet:py-[10px]">
            <button className="bg-body.bg-gray flex rounded-2xl border-[1px] p-2 pc:hidden">
              <Image src={icon_like_black} alt="좋아요" width={32} height={32} />
            </button>
            <button className="semibold flex w-full items-center justify-center text-nowrap rounded-2xl bg-color-blue-300 px-28 py-4 text-xl text-gray-50 mobile:text-md tablet:text-lg mobile-tablet:w-full mobile-tablet:max-w-full mobile-tablet:px-4 mobile-tablet:py-[11px]">
              견적 확정하기
            </button>
          </div>
          <hr className="border-Line-100 my-10 mobile-tablet:hidden" />
          <div className="flex flex-col gap-[22px] mobile-tablet:hidden">
            <p className="semibold text-black-400 flex text-xl">플랜 공유하기</p>
            <div className="flex gap-4">
              <div className="my-6">
                <ClipboardCopy icon={icon_outline} /> {/*링크 복사 버튼*/}
              </div>
              <button onClick={shareMessage}>
                <Image src={icon_kakao} alt="카카오톡 공유" width={64} height={64} />
              </button>
              <button onClick={btnShareFb}>
                <Image src={icon_facebook} alt="페이스북 공유" width={64} height={64} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
