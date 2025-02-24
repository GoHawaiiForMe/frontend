"use client";

import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import RequestDetails from "@/components/Receive/RequestDetails";
import Image from "next/image";
import { getPlanDetail } from "@/services/requestService";
import withAuthAccess from "@/stores/withAuthAccess";
import ReceiveModalLayout from "@/components/Receive/ReceiveModalLayout";
import Quotation from "@/components/Receive/Quotation";
import { useEffect, useState } from "react";
import writing from "@public/assets/icon_writing.png";
import { formatToDetailedDate } from "@/utils/formatDate";
import { convertRegionToKorean } from "@/utils/formatRegion";
import { formatTripType } from "@/utils/formatTripType";
import ShareSNS from "@/components/Common/UI/ShareSNS";
import loading from "@public/assets/icon_loading.gif";

export function PlanDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [quotationIsOpen, setQuotationIsOpen] = useState(false);

  const { data: planDetail, isLoading } = useQuery({
    queryKey: ["planDetail", id],
    queryFn: () => getPlanDetail(id as string),
    enabled: !!id,
  });

  const onSendQuotation = () => {
    setQuotationIsOpen(true);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("URL이 복사되었습니다.");
  };

  useEffect(() => {
    // 카카오 초기화 한 번만 실행
    if (typeof window !== "undefined" && !window.Kakao?.isInitialized()) {
      const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
      if (kakaoApiKey) {
        window.Kakao?.init(kakaoApiKey);
      }
    }
  }, []); // 빈 배열로 설정하여 마운트 시 한 번만 실행

  const handleKakaoShare = () => {
    if (typeof window === "undefined") return;

    const currentUrl = window.location.href;
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: planDetail?.title || "여행 플랜 ",
          description: planDetail?.details || "여행 플랜 상세내용보기",
          imageUrl: "https://ifh.cc/g/wvkbqP.png",
          imageWidth: 400, // 이미지 가로 크기 (픽셀)
          imageHeight: 200, // 이미지 세로 크기 (픽셀)
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      });
    }
  };

  const handleFacebookShare = () => {
    return window.open(`http://www.facebook.com/sharer/sharer.php?u=${location.href}`);
  };

  if (isLoading || !planDetail) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Image src={loading} alt="로딩 중" />
      </div>
    );
  }

  const writeDate = formatToDetailedDate(planDetail?.updatedAt);
  const tripDate = formatToDetailedDate(planDetail?.tripDate);
  const region = convertRegionToKorean(planDetail?.serviceArea);

  return (
    <>
      <p className="semibold mb-6 py-8 text-2xl">플랜 상세</p>
      <div className="flex justify-between mobile-tablet:flex-col mobile-tablet:gap-6">
        <div className="mr-[117px] w-full">
          {planDetail && (
            <RequestDetails
              data={planDetail}
              onSendQuotation={() => {}}
              onReject={() => {}}
              twoButton={true}
              oneButton={true}
            />
          )}
        </div>

        <div className="flex flex-col gap-4 mobile-tablet:mb-6 mobile-tablet:border-b mobile-tablet:border-color-line-100 mobile-tablet:pb-6">
          <button
            onClick={onSendQuotation}
            className="flex w-[270px] items-center justify-center gap-[10px] rounded-[16px] bg-color-blue-300 p-4 mobile-tablet:hidden"
          >
            <p className="semibold whitespace-nowrap text-xl text-white">견적 보내기</p>
            <Image src={writing} alt="send" width={24} height={24} />
          </button>
          <p className="semibold whitespace-nowrap text-xl mobile:text-md tablet:text-lg">
            견적서 공유하기
          </p>
          <div className="flex items-center gap-4">
            <ShareSNS
              onCopyUrl={handleCopyUrl}
              onKakaoShare={handleKakaoShare}
              onFacebookShare={handleFacebookShare}
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 hidden border-t border-color-line-100 bg-white p-4 mobile-tablet:block">
        <button
          onClick={onSendQuotation}
          className="flex w-full items-center justify-center gap-[10px] rounded-[16px] bg-color-blue-300 p-3"
        >
          <p className="semibold whitespace-nowrap text-lg text-white">견적 보내기</p>
          <Image src={writing} alt="send" width={20} height={20} />
        </button>
      </div>

      <div className="mb-[322px] flex flex-col gap-10 mobile:mb-[110px] tablet:mb-[72px] mobile-tablet:gap-6">
        <div className="flex flex-col gap-4 rounded-[16px] bg-color-line-100 px-10 py-8 shadow-md tablet:px-8 tablet:py-6 mobile-tablet:gap-[10px] mobile-tablet:px-5 mobile-tablet:py-4">
          <div className="flex items-center gap-8">
            <p className="w-[100px] text-2lg text-color-gray-300 mobile-tablet:text-md">
              견적 요청일
            </p>
            <p className="text-2lg mobile-tablet:text-md">{writeDate}</p>
          </div>
          <div className="flex items-center gap-8">
            <p className="w-[100px] text-2lg text-color-gray-300 mobile-tablet:text-md">서비스</p>
            <p className="text-2lg mobile-tablet:text-md">{formatTripType(planDetail?.tripType)}</p>
          </div>
          <div className="flex items-center gap-8">
            <p className="w-[100px] text-2lg text-color-gray-300 mobile-tablet:text-md">이용일</p>
            <p className="text-2lg mobile-tablet:text-md">{tripDate} </p>
          </div>
          <div className="flex items-center gap-8">
            <p className="w-[100px] text-2lg text-color-gray-300 mobile-tablet:text-md">여행지</p>
            <p className="text-2lg mobile-tablet:text-md">{region}</p>
          </div>
          <div className="flex items-center gap-5">
            <p className="w-[110px] text-2lg text-color-gray-300 mobile-tablet:text-md">
              세부요청사항
            </p>
            <p className="text-2lg mobile-tablet:text-md">{planDetail?.details}</p>
          </div>
        </div>
      </div>
      {quotationIsOpen && (
        <ReceiveModalLayout label="견적 보내기" closeModal={() => setQuotationIsOpen(false)}>
          <Quotation data={planDetail} closeModal={() => setQuotationIsOpen(false)} />
        </ReceiveModalLayout>
      )}
    </>
  );
}

export default withAuthAccess(PlanDetail);
