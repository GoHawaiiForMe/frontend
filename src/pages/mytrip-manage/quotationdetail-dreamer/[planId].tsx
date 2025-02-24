"use client";

import Image from "next/image";
import icon_blueinfo from "@public/assets/icon_blueinfo.svg";
import Label from "@/components/Common/UI/Label";
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
<<<<<<< HEAD
import ShareSNS from "@/components/Common/UI/ShareSNS";
=======
import ShareSNS from "@/components/Common/ShareSNS";
import ModalLayout from "@/components/Common/ModalLayout";
>>>>>>> 40cc2b5aa4d8bb4c6eba7428ea26fdbe1580bf42

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
  const router = useRouter();
  const { planId, quotationId } = router.query;
  const [planDetail, setPlanDetail] = useState<Plan | null>(null);
  const [quotationDetail, setQuotationDetail] = useState<QuotationDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coconut, setCoconut] = useState(0);

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

  //1440px이하부터 타블렛 디자인으로 변경
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1440);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function handleConfirmButton() {
    try {
      if (quotationDetail)
        await QuotationServiceDreamer.confirmQuotation({ isConfirmed: true }, quotationDetail.id);
      alert("견적이 확정되었습니다.");
      window.location.reload();
      router.push(`/mytrip-manage/ongoing-plan/detail/${planId}`);
    } catch (error: any) {
      if (error.status === 400) {
        setIsModalOpen(true);
      } else {
        alert(`견적 확정에 실패했습니다. 다시 시도해주세요. ${error.message}`);
      }
    }
  }

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      try {
        const parsedData = JSON.parse(authData);
        setCoconut(parsedData.state?.coconut ?? 0);
      } catch (error) {
        console.error("로컬스토리지 데이터 파싱 오류:", error);
      }
    }
  }, []);

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
    <div>
      <div
        className={`relative flex w-full flex-col mobile:mb-20 ${isTablet ? "mb-[72px]" : "mb-0"}`}
      >
        <div className="semibold center flex py-8 text-2xl text-color-black-400 mobile-tablet:text-2lg">
          견적 상세
        </div>
        <div className="mb:flex-col flex gap-24 mobile-tablet:flex-col mobile-tablet:gap-0">
          <div className="flex flex-grow flex-col">
            <div className="flex">
              <div className="flex w-full flex-col rounded-2xl bg-color-gray-50 px-6 py-7 shadow mobile-tablet:px-3 mobile-tablet:py-4">
                <div className="justify-left flex items-center gap-[12px] mobile-tablet:mt-[6px]">
                  {quotationDetail.isConfirmed !== false && (
                    <Label labelType="CONFIRMED" customLabelContainerClass="rounded-lg" />
                  )}
                  <Label labelType={planDetail.tripType} customLabelContainerClass="rounded-lg" />
                  {quotationDetail.isAssigned !== false && (
                    <Label labelType="REQUEST" customLabelContainerClass="rounded-lg" />
                  )}
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
                            ({quotationDetail.maker.totalReviews})
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
                      <p>{quotationDetail.maker.totalFollows}</p>
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
            <hr className={`border-Line-100 ${isTablet ? "my-6" : "my-10"}`} />
            <div className="flex flex-col gap-8 mobile-tablet:gap-4">
              <p className="semibold text-2xl text-color-black-400 mobile-tablet:text-lg">
                견적 코코넛
              </p>
              <p className="bold text-3xl text-color-black-400 mobile-tablet:text-xl">
                {quotationDetail.price} 개
              </p>
            </div>
            <hr className={`border-Line-100 ${isTablet ? "my-6" : "my-10"}`} />
            <div className={`${isTablet ? `flex flex-col gap-[22px]` : "hidden"}`}>
              <p className="semibold text-black-400 text-xl">플랜 공유하기</p>
              <div className="flex gap-4">{sharePromptContent}</div>
            </div>
            <hr className={`${isTablet ? "border-Line-100 my-6" : "hidden"}`} />
            <div>
              <p className="semibold mb-8 text-2xl text-color-black-400 mobile-tablet:text-lg">
                플랜 정보
              </p>
              <PlanCard planDetail={planDetail} />
              {planDetail.status === "PENDING" && (
                <div className="mb-28 mt-5 rounded-xl border-[1px] border-solid border-color-blue-300 bg-color-blue-100 mobile-tablet:mt-2">
                  <div className="semibold flex gap-2 p-6 text-lg text-color-blue-300 mobile-tablet:p-3 mobile-tablet:text-sm">
                    <Image src={icon_blueinfo} alt="알림" /> 확정하지 않은 플랜이에요!
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-nowrap mobile-tablet:relative mobile-tablet:w-full mobile-tablet:flex-grow">
            {planDetail.status === "PENDING" && (
              <div
                className={`${isTablet ? "fixed inset-x-0 bottom-0 flex-grow gap-2 bg-color-gray-50 px-40 py-[10px]" : "relative w-full"} flex mobile:px-6`}
              >
                <button
                  className={`${isTablet ? "bg-body.bg-gray flex items-center rounded-2xl border-[1px] p-3" : "hidden"}`}
                >
                  <Image src={icon_like_black} alt="좋아요" width={32} height={32} />
                </button>

                <button
                  className="semibold flex w-full items-center justify-center text-nowrap rounded-2xl bg-color-blue-300 px-28 py-3 text-xl text-gray-50 shadow mobile:text-md tablet:text-lg mobile-tablet:w-full mobile-tablet:max-w-full mobile-tablet:px-4 mobile-tablet:py-[11px]"
                  onClick={handleConfirmButton}
                >
                  견적 확정하기
                </button>
              </div>
            )}
            {planDetail.status === "PENDING" && (
              <hr className="border-Line-100 my-10 mobile-tablet:hidden" />
            )}
            <div className={`flex flex-col gap-[22px] ${isTablet ? "hidden" : ""}`}>
              <p className="semibold text-black-400 flex text-xl">플랜 공유하기</p>
              <div className="flex gap-4">{sharePromptContent}</div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalLayout label="보유 코코넛이 부족합니다!" closeModal={() => setIsModalOpen(false)}>
          <div className="m-4 flex flex-col items-center gap-4">
            <div className="semibold flex-col gap-2 text-xl">
              <div className="flex justify-center gap-2">
                <p>보유 코코넛 :</p> <p className="medium text-color-red-200">{coconut}</p>{" "}
                <p>개</p>
              </div>
              <div className="flex justify-center gap-2">
                <p>필요 코코넛 :</p>
                <p className="medium text-color-red-200">
                  {quotationDetail.price.toLocaleString()}
                </p>
                <p>개</p>
              </div>
            </div>
          </div>
        </ModalLayout>
      )}
    </div>
  );
}

export default withAuthAccess(QuotationDetailDreamer, "DREAMER");
