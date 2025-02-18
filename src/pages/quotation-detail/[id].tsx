import withAuthAccess from "@/stores/withAuthAccess";
import { useRouter } from "next/router";
import { getQuotationDetail } from "@/services/quotationService";
import { useQuery } from "@tanstack/react-query";
import QuotationDetailsContainer from "@/components/Receive/QuotationDetailsContainer";
import { convertRegionToKorean } from "@/utils/formatRegion";
import { formatToDetailedDate } from "@/utils/formatDate";
import { formatTripType } from "@/utils/formatTripType";
import { useEffect } from "react";
import ShareSNS from "@/components/Common/ShareSNS";
import loading from "@public/assets/icon_loading.gif";
import Image from "next/image";

// Facebook SDK 타입 정의

export function QuotationDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: quotationDetail, isLoading } = useQuery({
    queryKey: ["quotationDetail", id],
    queryFn: () => getQuotationDetail(id as string),
    enabled: !!id,
  });

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
        console.log("카카오 초기화 성공");
      }
    }
  }, []); // 빈 배열로 설정하여 마운트 시 한 번만 실행

  const handleKakaoShare = () => {
    if (typeof window === "undefined") return;

    const currentUrl = window.location.href;
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        // createDefaultButton 대신 sendDefault 사용
        objectType: "feed",
        content: {
          title: quotationDetail?.plan.title || "여행 플랜 ",
          description: quotationDetail?.plan.details || "여행 플랜 상세내용보기",
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

  if (isLoading || !quotationDetail) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Image src={loading} alt="로딩 중" />
      </div>
    );
  }

  const writeTime = formatToDetailedDate(quotationDetail.plan.createdAt);
  const tripDate = formatToDetailedDate(quotationDetail.plan.tripDate);
  const region = convertRegionToKorean(quotationDetail.plan.serviceArea);
  const tripType = formatTripType(quotationDetail.plan.tripType);

  return (
    <>
      <p className="mb-6 py-8 text-2xl font-semibold">견적 상세</p>

      <div className="flex justify-between mobile-tablet:flex-col mobile-tablet:gap-6">
        {quotationDetail && (
          <QuotationDetailsContainer
            data={quotationDetail}
            onSendQuotation={() => {}}
            onReject={() => {}}
            twoButton={true}
            oneButton={true}
          />
        )}

        <div className="flex flex-col gap-4 mobile-tablet:mb-6 mobile-tablet:border-b mobile-tablet:border-color-line-100 mobile-tablet:pb-6">
          <p className="whitespace-nowrap text-xl font-semibold mobile:text-md tablet:text-lg">
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
      <div className="mb-10 mt-10 flex flex-col gap-4 border-b border-color-line-100 pb-10 mobile-tablet:mb-6 mobile-tablet:mt-0 mobile-tablet:gap-2 mobile-tablet:pb-6">
        <p className="text-2xl font-semibold mobile-tablet:text-lg">Maker의 코멘트</p>
        <p className="medium text-xl mobile-tablet:text-xl">{quotationDetail?.content}</p>
      </div>
      <div className="mb-10 mt-10 flex flex-col gap-8 border-b border-color-line-100 pb-10 mobile-tablet:mb-6 mobile-tablet:mt-0 mobile-tablet:gap-4 mobile-tablet:pb-6">
        <p className="text-2xl font-semibold mobile-tablet:text-lg">견적 코코넛</p>
        <p className="text-3xl font-bold mobile-tablet:text-xl">{quotationDetail?.price}개</p>
      </div>
      <div className="mb-[322px] flex flex-col gap-10 mobile:mb-[110px] tablet:mb-[72px] mobile-tablet:gap-6">
        <p className="text-2xl font-semibold mobile-tablet:text-lg">플랜 정보</p>
        <div className="flex flex-col gap-4 rounded-[16px] bg-color-line-100 px-10 py-8 shadow-md tablet:px-8 tablet:py-6 mobile-tablet:gap-[10px] mobile-tablet:px-5 mobile-tablet:py-4">
          <div className="flex items-center gap-8">
            <p className="w-[100px] text-2lg text-color-gray-300 mobile-tablet:text-md">
              견적 요청일
            </p>
            <p className="text-2lg mobile-tablet:text-md">{writeTime}</p>
          </div>
          <div className="flex items-center gap-8">
            <p className="w-[100px] text-2lg text-color-gray-300 mobile-tablet:text-md">서비스</p>
            <p className="text-2lg mobile-tablet:text-md">{tripType}</p>
          </div>
          <div className="flex items-center gap-8">
            <p className="w-[100px] text-2lg text-color-gray-300 mobile-tablet:text-md">이용일</p>
            <p className="text-2lg mobile-tablet:text-md">{tripDate}</p>
          </div>
          <div className="flex items-center gap-8">
            <p className="w-[100px] text-2lg text-color-gray-300 mobile-tablet:text-md">여행지</p>
            <p className="text-2lg mobile-tablet:text-md">{region}</p>
          </div>
          <div className="flex items-center gap-5">
            <p className="w-[110px] text-2lg text-color-gray-300 mobile-tablet:text-md">
              세부요청사항
            </p>
            <p className="text-2lg mobile-tablet:text-md">{quotationDetail?.plan.details}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthAccess(QuotationDetail);
