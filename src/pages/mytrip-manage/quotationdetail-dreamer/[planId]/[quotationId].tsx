"use client";

import Image from "next/image";
import icon_blueinfo from "@public/assets/icon_blueinfo.svg";
import Label from "@/components/Common/Label";
import icon_like_red from "@public/assets/icon_like_red.png";
import icon_like_black from "@public/assets/icon_like_black.svg";
import icon_active_star from "@public/assets/icon_active_star.svg";
import link from "@public/assets/icon_link.svg";
import loading from "@public/assets/icon_loading.gif";
import Link from "next/link";
import PlanCard from "@/components/MyPlans/Cards/PlanCard";
import { useEffect } from "react";
import { useRouter } from "next/router";
import planService from "@/services/planService";
import { QuotationServiceDreamer } from "@/services/quotationServiceDreamer";
import { Plan } from "@/services/planService";
import { useState } from "react";
import withAuthAccess from "@/stores/withAuthAccess";
import ShareSNS from "@/components/Common/ShareSNS";

interface MakerInfo {
  nickName: string;
  image: string;
  gallery: string;
  serviceTypes: string[];
  isFollowed: boolean;
  averageRating: number;
  totalReviews: number;
  totalFollows: number;
  totalConfirms: number;
}
interface QuotationDetail {
  id: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  content: string;
  maker: MakerInfo;
  isConfirmed: false;
  isAssigned: false;
}

export function QuotationDetailDreamer() {
  // useEffect(() => {
  //   if (typeof window !== "undefined" && window.Kakao) {
  //     const Kakao = window.Kakao;
  //     if (!Kakao.isInitialized()) {
  //       Kakao.init("0337a68dec8e9d5ebea78113c3b9fc62");
  //     }
  //   }
  // }, []);
  // //init괄호 안에는 카카오디벨로퍼스에서 받은 javascript키 입력

  // const shareMessage = () => {
  //   if (typeof window !== "undefined" && window.Kakao) {
  //     const Kakao = window.Kakao;
  //     Kakao.Share.sendScrap({
  //       requestUrl: "http://localhost:3000",
  //     });
  //   }
  // };
  // //requestUrl부분에 사용할 도메인 입력(현재 테스트중으로 로컬도메인)

  // const btnShareFb = () => {
  //   const pageUrl = "http://localhost:3000";
  //   window.open(`http://www.facebook.com/sharer/sharer.php?u=${pageUrl}`);
  // };

  const router = useRouter();
  const { planId, quotationId } = router.query;
  const [planDetail, setPlanDetail] = useState<Plan | null>(null);
  const [quotationDetail, setQuotationDetail] = useState<QuotationDetail | null>(null);
  const fetchQuotations = async (planId: string) => {
    try {
      const response = await QuotationServiceDreamer.getQuotations({ planId });
      return response.list; // 견적 리스트 반환
    } catch (error) {
      console.error("견적 목록 조회 실패", error);
      return [];
    }
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("planId:", planId, "quotationId:", quotationId);
    if (planId && quotationId) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const planResponse = await planService.getPlanDetail(planId as string);
          setPlanDetail(planResponse);
          const quotations = await fetchQuotations(planId as string);
          const selectedQuotation = quotations.find((quotation) => quotation.id === quotationId);
          setQuotationDetail(selectedQuotation || null);
        } catch (error) {
          console.error("데이터 로드 실패:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [planId, quotationId]);

  async function handleConfirmButton() {
    try {
      if (quotationDetail)
        await QuotationServiceDreamer.confirmQuotation({ isConfirmed: true }, quotationDetail.id);
      alert("플랜이 확정되었습니다.");
    } catch (error) {
      alert(`플랜 확정에 실패했습니다. 다시 시도해주세요. ${error}`);
    }
  }

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  const handleKakaoShare = () => {
    const currentUrl = window.location.href;
    if (typeof window !== "undefined" && window.Kakao) {
      const Kakao = window.Kakao;
      Kakao.Share.createDefaultButton({
        container: "#kakaotalk-sharing-btn",
        objectType: "feed",
        content: {
          title: quotationDetail?.maker.nickName || "Maker님",
          description: quotationDetail?.content || "여행 플랜 상세내용보기",
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
    if (typeof window !== "undefined" && window.FB) {
      const shareUrl = `https://go-for-me.kro.kr/mytrip-manage/quotationdetail-dreamer/${planId}/${quotationId}`;

      window.FB.ui(
        {
          method: "share",
          href: shareUrl,
        },
        (response) => {
          if (response) {
            alert("공유를 성공했습니다!");
          } else {
            console.error("공유 실패 - URL:", shareUrl);
          }
        },
      );
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("URL이 복사되었습니다.");
  };

  const sharePromptContent = (
    <div className="flex flex-col gap-4">
      <p className="regular text-black-400 text-lg">나만 알기엔 아쉬운 기사님인가요?</p>
      <div className="flex items-center gap-4">
        <ShareSNS
          onCopyUrl={handleCopyUrl}
          onKakaoShare={handleKakaoShare}
          onFacebookShare={handleFacebookShare}
        />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Image src={loading} alt="로딩 중" />
      </div>
    );
  }

  if (!planDetail || !quotationDetail) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Image src={loading} alt="로딩 중" />
      </div>
    );
  }

  if (!planDetail) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Image src={loading} alt="로딩 중" />
      </div>
    );
  }
  return (
    <div className="relative flex w-full flex-col mobile:mb-20 tablet:mb-[72px]">
      <div className="semibold center flex py-8 text-2xl text-color-black-400 mobile-tablet:text-2lg">
        견적 상세
      </div>
      <div className="mb:flex-col flex gap-24 mobile-tablet:flex-col mobile-tablet:gap-0">
        <div className="flex flex-grow flex-col">
          <div className="flex">
            <div className="flex w-full flex-col rounded-2xl bg-color-gray-50 px-6 py-7 shadow mobile-tablet:px-3 mobile-tablet:py-4">
              <div className="justify-left flex items-center gap-[12px] mobile-tablet:mt-[6px]">
                <Label labelType={planDetail.tripType} customLabelContainerClass="rounded-lg" />
              </div>
              <div className="border-color bg-body.bg-gray my-6 flex gap-6 rounded-md border-[1px] px-[18px] py-4 mobile-tablet:my-[14px] mobile-tablet:gap-3 mobile-tablet:px-[10px]">
                <div className="flex h-20 w-20 items-center mobile-tablet:h-[46px] mobile-tablet:w-[46px]">
                  <Image
                    src={`/assets/img_avatar${quotationDetail.maker.image.split("_")[1]}.svg`}
                    alt="프로필사진"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-color-blue-400"
                  />
                </div>
                <div className="flex w-full">
                  <div className="w-full flex-col items-center justify-between text-xs text-color-black-500">
                    <p className="semibold text-xl mobile-tablet:text-lg">
                      {quotationDetail.maker.nickName}
                    </p>
                    <div className="flex items-center">
                      <div className="medium flex flex-shrink-0 items-center gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                        <Image
                          src={icon_active_star}
                          alt="별점"
                          className="color-red-200 h-6 w-6 mobile-tablet:h-[14px] mobile-tablet:w-[14px]"
                        />
                        <p>{quotationDetail.maker.averageRating}</p>
                        <p className="text-color-gray-400">
                          (${quotationDetail.maker.totalReviews})
                        </p>
                      </div>
                      <p className="mx-4 text-color-line-200 mobile-tablet:mx-1">ㅣ</p>
                      <div className="medium flex flex-shrink-0 gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                        <Link
                          href={quotationDetail.maker.gallery}
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
                        <p>{quotationDetail.maker.totalConfirms}</p>
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
                  {quotationDetail.content}
                </p>
              </div>
            </div>
          </div>
          <hr className="border-Line-100 my-10 mobile-tablet:my-6" />
          <div className="flex flex-col gap-8 mobile-tablet:gap-4">
            <p className="semibold text-2xl text-color-black-400 mobile-tablet:text-lg">견적가</p>
            <p className="bold text-3xl text-color-black-400 mobile-tablet:text-xl">
              {quotationDetail.price} 원
            </p>
          </div>
          <hr className="border-Line-100 my-10 mobile-tablet:my-6" />
          <div className="flex flex-col gap-[22px] pc:hidden">
            <p className="semibold text-black-400 text-xl">플랜 공유하기</p>
            <div className="flex gap-4">{sharePromptContent}</div>
          </div>
          <hr className="border-Line-100 my-6 pc:hidden" />
          <div>
            <p className="semibold mb-8 text-2xl text-color-black-400 mobile-tablet:text-lg">
              플랜 정보
            </p>
            <PlanCard planDetail={planDetail} />
            {planDetail.status === "PENDING" && (
              <div className="mt-5 rounded-xl border-[1px] border-solid border-color-blue-300 bg-color-blue-100 mobile-tablet:mt-2">
                <div className="semibold flex gap-2 p-6 text-lg text-color-blue-300 mobile-tablet:p-3 mobile-tablet:text-sm">
                  <Image src={icon_blueinfo} alt="알림" /> 확정하지 않은 플랜이에요!
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-nowrap mobile-tablet:relative mobile-tablet:w-full mobile-tablet:flex-grow">
          <div className="flex w-full mobile:px-6 tablet:px-[72px] mobile-tablet:fixed mobile-tablet:inset-x-0 mobile-tablet:bottom-0 mobile-tablet:flex-grow mobile-tablet:gap-2 mobile-tablet:bg-color-gray-50 mobile-tablet:py-[10px]">
            <button className="bg-body.bg-gray flex rounded-2xl border-[1px] p-2 pc:hidden">
              <Image src={icon_like_black} alt="좋아요" width={32} height={32} />
            </button>
            <button
              className="semibold flex w-full items-center justify-center text-nowrap rounded-2xl bg-color-blue-300 px-28 py-4 text-xl text-gray-50 shadow mobile:text-md tablet:text-lg mobile-tablet:w-full mobile-tablet:max-w-full mobile-tablet:px-4 mobile-tablet:py-[11px]"
              onClick={handleConfirmButton}
            >
              견적 확정하기
            </button>
          </div>
          <hr className="border-Line-100 my-10 mobile-tablet:hidden" />
          <div className="flex flex-col gap-[22px] mobile-tablet:hidden">
            <p className="semibold text-black-400 flex text-xl">플랜 공유하기</p>
            <div className="flex gap-4">{sharePromptContent}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthAccess(QuotationDetailDreamer);
