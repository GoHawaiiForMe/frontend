"use client";

import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import RequestDetails from "@/components/Receive/RequestDetails";
import Image from "next/image";
import clipshare from "@public/assets/icon_outline.png";
import facebook from "@public/assets/icon_facebook.png";
import kakao from "@public/assets/icon_kakao.png";
import { getPlanDetail } from "@/services/requestService";
import withAuthAccess from "@/stores/withAuthAccess";
import ReceiveModalLayout from "@/components/Receive/ReceiveModalLayout";
import Quotation from "@/components/Receive/Quotation";
import { useEffect, useState } from "react";
import writing from "@public/assets/icon_writing.png";
import { formatToDetailedDate } from "@/utils/formatDate";
import { convertRegionToKorean } from "@/utils/formatRegion";
import { formatTripType } from "@/utils/formatTripType";

export function PlanDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [quotationIsOpen, setQuotationIsOpen] = useState(false);

  console.log("아이디 ", id);

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
    if (typeof window !== "undefined" && window.Kakao) {
      const Kakao = window.Kakao;
      if (!Kakao.isInitialized()) {
        Kakao.init("5e3eefd6a319ccc0a53dfef858a5ffc8");
      }
    }
  }, []);

  const handleKakaoShare = () => {
    if (typeof window !== "undefined" && window.Kakao) {
      const Kakao = window.Kakao;
      Kakao.Share.createDefaultButton({
        container: "#kakaotalk-sharing-btn",
        objectType: "text",
        text: "니가가라 하와이 공유하기 입니다. 현재는 테스트 버전입니다.!",
        link: {
          mobileWebUrl: "https://developers.kakao.com",
          webUrl: "https://developers.kakao.com",
        },
      });
    }
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    );
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  console.log("플랜데이터", planDetail);

  const writeDate = formatToDetailedDate(planDetail?.updatedAt ?? "");
  const tripDate = formatToDetailedDate(planDetail?.tripDate ?? "");
  const region = convertRegionToKorean(planDetail?.serviceArea ?? "SEOUL");

  return (
    <>
      <p className="mb-6 py-8 text-2xl font-semibold">플랜 상세</p>
      <div className="flex justify-between mobile-tablet:flex-col mobile-tablet:gap-6">
        <div className="mr-[117px]">
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
            <p className="whitespace-nowrap text-xl font-semibold text-white">견적 보내기</p>
            <Image src={writing} alt="send" width={24} height={24} />
          </button>
          <p className="whitespace-nowrap text-xl font-semibold mobile:text-md tablet:text-lg">
            견적서 공유하기
          </p>
          <div className="flex items-center gap-4">
            <Image
              src={clipshare}
              alt="clipshare"
              className="cursor-pointer rounded-[16px] shadow-md mobile-tablet:h-[40px] mobile-tablet:w-[40px]"
              width={64}
              height={64}
              onClick={handleCopyUrl}
            />
            <Image
              src={kakao}
              alt="kakao"
              id="kakaotalk-sharing-btn"
              className="cursor-pointer rounded-[16px] shadow-md mobile-tablet:h-[40px] mobile-tablet:w-[40px]"
              width={64}
              height={64}
              onClick={handleKakaoShare}
            />
            <Image
              src={facebook}
              alt="facebook"
              className="cursor-pointer rounded-[16px] shadow-md mobile-tablet:h-[40px] mobile-tablet:w-[40px]"
              width={64}
              height={64}
              onClick={handleFacebookShare}
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 hidden border-t border-color-line-100 bg-white p-4 mobile-tablet:block">
        <button
          onClick={onSendQuotation}
          className="flex w-full items-center justify-center gap-[10px] rounded-[16px] bg-color-blue-300 p-3"
        >
          <p className="whitespace-nowrap text-lg font-semibold text-white">견적 보내기</p>
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
