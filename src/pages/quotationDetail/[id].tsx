import Image from "next/image";
import clipshare from "@public/assets/icon_outline.png";
import facebook from "@public/assets/icon_facebook.png";
import kakao from "@public/assets/icon_kakao.png";
import withAuthAccess from "@/stores/withAuthAccess";
import { useRouter } from "next/router";
import { getQuotationDetail } from "@/services/quotationService";
import { useQuery } from "@tanstack/react-query";
import QuotationDetailsContainer from "@/components/Receive/QuotationDetailsContainer";
import { convertRegionToKorean } from "@/utils/formatRegion";
import { formatToDetailedDate } from "@/utils/formatDate";
import { formatTripType } from "@/utils/formatTripType";
import { useEffect } from "react";

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
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  const handleKakaoShare = () => {
    let currentUrl = window.location.href;
    if (typeof window !== "undefined" && window.Kakao) {
      const Kakao = window.Kakao;
      Kakao.Share.createDefaultButton({
        container: "#kakaotalk-sharing-btn",
        objectType: "feed",
        content: {
          title: quotationDetail?.plan.title || "여행 플랜 ",
          description: quotationDetail?.plan.details || "여행 플랜 상세내용보기",
          imageUrl:
            "https://scontent-ssn1-1.cdninstagram.com/v/t51.29350-15/440535983_1166519591460822_7666710914928913519_n.jpg?stp=dst-jpg_e35_s1080x1080_tt6&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=CzF6FbL6gvEQ7kNvgHzHfiF&_nc_gid=947375cfb83d43c5abb8aeacb63ed59a&edm=ANTKIIoBAAAA&ccb=7-5&oh=00_AYDtqZ0h00aA8oATSGX48sg79D3ROGTLYUaZSjkcbYafCQ&oe=67A60D41&_nc_sid=d885a2",
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
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

  const writeTime = formatToDetailedDate(quotationDetail?.plan.createdAt ?? "");
  const tripDate = formatToDetailedDate(quotationDetail?.plan.tripDate ?? "");
  const region = convertRegionToKorean(quotationDetail?.plan.serviceArea ?? "SEOUL");
  const tripType = formatTripType(quotationDetail?.plan.tripType ?? "CULTURE");

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
            <Image
              src={clipshare}
              alt="clipshare"
              onClick={handleCopyUrl}
              className="cursor-pointer rounded-[16px] shadow-md mobile-tablet:h-[40px] mobile-tablet:w-[40px]"
              width={64}
              height={64}
            />

            <Image
              src={kakao}
              alt="kakao"
              id="kakaotalk-sharing-btn"
              onClick={handleKakaoShare}
              className="cursor-pointer rounded-[16px] shadow-md mobile-tablet:h-[40px] mobile-tablet:w-[40px]"
              width={64}
              height={64}
            />

            <Image
              src={facebook}
              alt="facebook"
              onClick={handleFacebookShare}
              className="cursor-pointer rounded-[16px] shadow-md mobile-tablet:h-[40px] mobile-tablet:w-[40px]"
              width={64}
              height={64}
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
