"use client";

import Link from "next/link";
import Image from "next/image";
import icon_like_red from "@public/assets/icon_like_red.png";
import icon_like_black from "@public/assets/icon_like_black.svg";
import icon_active_star from "@public/assets/icon_active_star.svg";
import icon_link from "@public/assets/icon_link.svg";
import { useRouter } from "next/router";
import { useQuery, keepPreviousData, useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Label from "@/components/Common/Label";
import planData, { Service, Location } from "@/types/planData";
import Selector from "@/components/Common/Selector";
import StarRating from "@/components/Receive/StarRating";
import ReviewGraph from "@/components/Receive/ReviewGraph";
import Pagination from "@/components/Common/Pagination";
import userService from "@/services/userService";
import followService from "@/services/followService";
import planService from "@/services/planService";
import avatarImages from "@/utils/formatImage";
import { formatToSimpleDate } from "@/utils/formatDate";
import { TripType } from "@/utils/formatTripType";
import ModalLayout from "@/components/Common/ModalLayout";
import { getAccessToken } from "@/utils/tokenUtils";
import ShareSNS from "@/components/Common/ShareSNS";
const itemsPerPage = 5;

export default function RequestDetailDreamer() {
  const router = useRouter();
  const { id: makerId } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isRequestSuccessModalOpen, setIsRequestSuccessModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const queryClient = useQueryClient();
  const [pendingPlans, setPendingPlans] = useState<{ id: string; title: string }[]>([]);
  const [pendingPlanTitles, setPendingPlanTitles] = useState<string[]>([]);

  const { data: makerProfileInfo, isPlaceholderData } = useQuery({
    queryKey: ["makerProfileInfo", makerId],
    queryFn: () => userService.getMakerProfile(makerId as string),
    enabled: !!makerId && typeof makerId === "string",
  });

  const { data: findMakerReview } = useQuery({
    queryKey: ["findMakerReview", makerId, currentPage],
    queryFn: () =>
      userService.getMakerMypage(makerId as string, { page: currentPage, pageSize: itemsPerPage }),
    placeholderData: keepPreviousData,
    enabled: !!makerId && typeof makerId === "string",
  });

  const [isFollowed, setIsFollowed] = useState(makerProfileInfo?.isFollowed ?? false);

  const handleFollowToggle = async () => {
    const id = makerId as string;
    const accessToken = getAccessToken();
    if (!accessToken) {
      setIsLoginModalOpen(true);
      return;
    }
    if (!id) return;

    try {
      if (isFollowed) {
        await followService.deleteFollow(id);
        setIsFollowed(false);
        if (makerProfileInfo) {
          makerProfileInfo.totalFollows -= 1;
        }
      } else {
        await followService.postFollow(id);
        setIsFollowed(true);
        if (makerProfileInfo) {
          makerProfileInfo.totalFollows += 1;
        }
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handlePendingPlan = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setIsLoginModalOpen(true);
      return;
    }
    try {
      const titles = await planService.getPendingPlan();
      if (titles) {
        setPendingPlans(titles);
        setPendingPlanTitles(titles.map((plan) => plan.title));
      } else {
        setPendingPlanTitles([]);
      }
      setIsListModalOpen(true);
    } catch (error) {
      console.error("지정 플랜 조회 실패", error);
    }
  };

  const planRequestMutation = useMutation({
    mutationFn: (planId: string) => planService.postPlanRequest(planId, makerId as string),
    onSuccess: () => {
      setIsListModalOpen(false);
      setIsRequestSuccessModalOpen(true);
    },
    onError: (error: any) => {
      alert(error.message);
    },
  });

  const totalItems = findMakerReview?.totalCount ?? 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const filteredServices: Service[] = planData.services.filter((service) =>
    makerProfileInfo?.serviceTypes?.includes(service.mapping),
  );

  const filteredLocations: Location[] = planData.locations.filter((location) =>
    makerProfileInfo?.serviceArea?.includes(location.mapping),
  );

  const reviewStats = findMakerReview?.groupByCount.reduce(
    (acc, curr) => {
      acc[curr.rating] = curr.count;
      return acc;
    },
    {} as Record<string, number>,
  ) ?? {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("URL이 복사되었습니다.");
  };

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  useEffect(() => {
    const hasMore = currentPage * itemsPerPage < totalItems;

    if (!isPlaceholderData && hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["findMakerReview", makerId, currentPage + 1],
        queryFn: () =>
          userService.getMakerMypage(makerId as string, {
            page: currentPage + 1,
            pageSize: itemsPerPage,
          }),
      });
    }
  }, [isPlaceholderData, currentPage, itemsPerPage, totalItems, makerId, queryClient]);

  const handleKakaoShare = () => {
    if (typeof window === "undefined") return;

    const currentUrl = window.location.href;
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: makerProfileInfo?.nickName || "Maker님" + " Maker님",
          description: makerProfileInfo?.description || "Maker의 설명",
          imageUrl: "https://ifh.cc/g/wvkbqP.png",
          imageWidth: 400,
          imageHeight: 200,
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (makerProfileInfo) {
      setIsFollowed(makerProfileInfo.isFollowed);
    }
  }, [makerProfileInfo]);

  const handleFacebookShare = () => {
    return window.open(`http://www.facebook.com/sharer/sharer.php?u=${location.href}`);
  };

  const sharePromptContent = (
    <div className="flex flex-col gap-4">
      <p className="semibold text-black-400 text-xl">나만 알기엔 아쉬운 기사님인가요?</p>
      <div className="flex items-center gap-4">
        <ShareSNS
          onCopyUrl={handleCopyUrl}
          onKakaoShare={handleKakaoShare}
          onFacebookShare={handleFacebookShare}
        />
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
        @media (min-width: 744px) and (max-width: 2700px) {
        .main-container {
         padding: 0 60px;
        }
      }
    `}
      </style>
      <div className="relative mt-20 grid w-full grid-cols-7 gap-10 mobile-tablet:flex mobile-tablet:flex-col">
        {/* 왼쪽 열 */}
        <div className="col-span-5 flex flex-col">
          <div className="flex h-72 gap-4 rounded-2xl border border-color-line-100 bg-color-gray-50 px-6 py-7 mobile-tablet:h-[220px] mobile-tablet:px-3 mobile-tablet:py-4">
            <div className="flex-grow">
              <div className="mobile-tablet:mt-[6px]">
                <div className="custom-scrollbar mb-3 flex max-w-full gap-2 overflow-x-auto">
                  {makerProfileInfo?.serviceTypes.map((type, index) => (
                    <div key={index} className="mb-3 flex-shrink-0">
                      <Label key={type} labelType={type as TripType} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-black-300 semibold text-2xl mobile-tablet:text-lg">
                  {makerProfileInfo?.description}
                </p>
              </div>
              <div className="my-6 flex rounded-md border-[1px] border-color-line-100 px-[18px] py-4 mobile-tablet:my-[14px] mobile-tablet:gap-3 mobile-tablet:px-[10px] mobile-tablet:py-2">
                <div className="mr-4 h-[80px] w-[80px] mobile-tablet:h-[46px] mobile-tablet:w-[46px]">
                  <Image
                    src={avatarImages.find((avatar) => avatar.key === makerProfileInfo?.image)?.src}
                    alt="프로필사진"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-color-blue-400"
                  />
                </div>
                <div className="flex flex-grow flex-col gap-4 text-xs text-color-black-500">
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <p className="semibold text-xl mobile-tablet:text-lg">
                        {makerProfileInfo?.nickName} Maker
                      </p>
                    </div>
                    <div className="medium flex text-2lg text-color-blue-400 mobile-tablet:text-sm">
                      <Image
                        src={isFollowed ? icon_like_red : icon_like_black}
                        alt="좋아요"
                        width={24}
                        height={24}
                        className="color-red-200 h-6 w-6"
                      />
                      {makerProfileInfo?.totalFollows}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="medium flex items-center gap-1 text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                      <Image
                        src={icon_active_star}
                        alt="별점"
                        className="color-red-200 h-6 w-6 mobile-tablet:h-[14px] mobile-tablet:w-[14px]"
                      />
                      <p>{makerProfileInfo?.averageRating}</p>
                      <p className="text-color-gray-400">({makerProfileInfo?.totalReviews})</p>
                    </div>
                    <p className="mx-3 text-color-line-200 mobile-tablet:mx-1">ㅣ</p>
                    <div className="medium flex items-center gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                      <p className="text-color-gray-400">SNS</p>
                      <Link
                        href={
                          makerProfileInfo?.gallery.startsWith("http")
                            ? makerProfileInfo?.gallery
                            : "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (!makerProfileInfo?.gallery.startsWith("http")) {
                            e.preventDefault();
                            alert("경력이 없습니다!");
                          }
                        }}
                      >
                        <Image src={icon_link} alt="링크 이미지" width={30} height={30} />
                      </Link>
                    </div>
                    <p className="mx-3 text-color-line-200 mobile-tablet:mx-1">ㅣ</p>
                    <div className="medium flex gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                      <p>{makerProfileInfo?.totalConfirms}건</p>
                      <p className="text-color-gray-400">확정</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10 mobile-tablet:gap-10">
            <hr className="mt-10 border-color-line-100" />
            <div>
              <div className="pc:hidden">{sharePromptContent}</div>
            </div>
            <div>
              <p className="bold mb-8 text-2xl text-color-black-400 mobile-tablet:text-lg">
                상세설명
              </p>
              <p className="regular text-2lg text-color-black-400 mobile-tablet:text-md">
                {makerProfileInfo?.detailDescription}
              </p>
            </div>
            <div className="overflow-x-auto">
              <p className="bold mb-8 text-2xl text-color-black-400 mobile-tablet:text-lg">
                제공 서비스
              </p>
              <div className="custom-scrollbar flex gap-4 overflow-x-auto">
                <div className="mb-3 flex-shrink-0">
                  <Selector
                    category="services"
                    selectedTypes={makerProfileInfo?.serviceTypes ?? []}
                    data={filteredServices}
                    className="mt-4 flex gap-4"
                    itemClassName="!border-color-blue-300 bg-color-blue-50 text-color-blue-300"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="bold mb-8 text-2xl text-color-black-400 mobile-tablet:text-lg">
                서비스 가능 지역
              </p>
              <div className="custom-scrollbar flex gap-4 overflow-x-auto">
                <div className="mb-3 flex-shrink-0">
                  <Selector
                    category="locations"
                    selectedTypes={makerProfileInfo?.serviceArea ?? []}
                    data={filteredLocations}
                    className="mt-4 flex w-full gap-4 mobile-tablet:w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 열 */}
        <div className="col-span-2 flex">
          <div className="flex flex-col flex-nowrap gap-7 mobile-tablet:relative mobile-tablet:w-full mobile-tablet:flex-grow card:flex-grow">
            <p className="semibold text-xl mobile-tablet:hidden">
              {makerProfileInfo?.nickName} Maker에게 지정 플랜을 요청해보세요!
            </p>
            <button
              onClick={handleFollowToggle}
              className="semibold flex w-[354px] justify-center rounded-2xl border-[1px] p-2 py-4 text-xl hover:scale-105 mobile:text-md tablet:text-lg mobile-tablet:hidden mobile-tablet:px-4 mobile-tablet:py-[11px]"
            >
              <Image
                src={isFollowed ? icon_like_red : icon_like_black}
                alt="좋아요"
                width={32}
                height={32}
              />
              <p>{isFollowed ? " Maker 찜하기 취소" : " Maker 찜하기"}</p>
            </button>
            <div className="flex w-full mobile:px-6 tablet:px-[72px] mobile-tablet:fixed mobile-tablet:inset-x-0 mobile-tablet:bottom-0 mobile-tablet:flex-grow mobile-tablet:gap-2 mobile-tablet:bg-color-gray-50 mobile-tablet:py-7">
              <button
                onClick={handleFollowToggle}
                className="flex rounded-2xl border-[1px] p-2 pc:hidden"
              >
                <Image
                  src={isFollowed ? icon_like_red : icon_like_black}
                  alt="좋아요"
                  width={32}
                  height={32}
                />
              </button>
              <button
                onClick={handlePendingPlan}
                className="semibold flex w-[354px] items-center justify-center rounded-2xl bg-color-blue-300 py-4 text-xl text-gray-50 hover:scale-105 mobile:text-md tablet:text-lg mobile-tablet:w-full mobile-tablet:max-w-full mobile-tablet:px-4 mobile-tablet:py-[11px]"
              >
                지정 플랜 요청하기
              </button>
            </div>
            <div className="mobile-tablet:hidden">
              <hr className="my-5 border-color-line-100 mobile-tablet:hidden" />
              {sharePromptContent}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p className="bold mb-8 text-lg pc:mt-12">리뷰({makerProfileInfo?.totalReviews})</p>
          <div className="mb-10 flex items-center justify-center gap-10 mobile:flex-col">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex items-end gap-2">
                <p className="bold text-[64px] leading-[76.38px]">
                  {makerProfileInfo?.averageRating}
                </p>
                <p className="text-[38px] leading-[45.38px] text-color-gray-100">/5</p>
              </div>
              <div className="flex justify-end">
                <StarRating
                  initialRating={Number(makerProfileInfo?.averageRating)}
                  readonly={true}
                />
              </div>
            </div>
            <div className="rounded-[16px] bg-color-background-200 px-[22px] py-4 shadow-md mobile-tablet:mb-[104px]">
              <ReviewGraph reviewStats={reviewStats} />
            </div>
          </div>
        </div>
        {findMakerReview?.list && findMakerReview.list.length > 0 && (
          <>
            {findMakerReview?.list?.map((review, index) => (
              <div key={index} className="border-b border-color-line-100 py-8">
                <div className="flex items-center gap-3">
                  <p className="border-r border-color-line-200 pr-3 text-md">
                    {review.writer.nickName}
                  </p>
                  <p className="text-md text-color-gray-300">
                    {formatToSimpleDate(review.createdAt)}
                  </p>
                </div>
                <div className="mb-4 mt-2">
                  <StarRating type={true} initialRating={review.rating} readonly={true} />
                </div>
                <p className="text-2lg">{review.content}</p>
              </div>
            ))}
            <div className="my-8 mobile-tablet:mb-[104px]">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
      {isLoginModalOpen && (
        <div>
          <ModalLayout label="알림" closeModal={() => setIsLoginModalOpen(false)}>
            <div className="flex flex-col items-center gap-8">
              <p>로그인 후 이용해 주세요.</p>
              <Link href="/login">
                <button className="rounded-lg bg-color-blue-300 p-3 text-2lg text-color-gray-50">
                  로그인하러 가기
                </button>
              </Link>
            </div>
          </ModalLayout>
        </div>
      )}
      {isListModalOpen && (
        <div>
          <ModalLayout label="지정 플랜 요청하기" closeModal={() => setIsListModalOpen(false)}>
            <div className="flex flex-col items-center gap-8">
              {pendingPlanTitles.length > 0 ? (
                <div className="flex max-h-80 w-full flex-col gap-6 overflow-y-auto">
                  {pendingPlans.map((plan) => (
                    <>
                      <div
                        key={plan.id}
                        className={`cursor-pointer rounded-2xl border p-5 ${selectedPlan === plan.id ? "border-color-blue-300 bg-color-blue-100" : "border-color-gray-300"}`}
                      >
                        <label>
                          <div className="flex cursor-pointer gap-4">
                            <input
                              type="radio"
                              name="plan"
                              value={plan.title}
                              onChange={() => setSelectedPlan(plan.id)}
                            />
                            <p className="bold text-xl mobile-tablet:text-lg">{plan.title}</p>
                          </div>
                        </label>
                      </div>
                    </>
                  ))}
                </div>
              ) : (
                <p className="text-lg">일반 플랜 요청을 먼저 진행해주세요.</p>
              )}
              {pendingPlanTitles.length > 0 ? (
                <button
                  onClick={() => planRequestMutation.mutate(selectedPlan)}
                  disabled={selectedPlan === ""}
                  className={`mt-8 w-full rounded-2xl p-4 text-xl text-color-gray-50 mobile-tablet:text-lg ${selectedPlan !== "" ? "bg-color-blue-300" : "cursor-not-allowed bg-color-gray-300"}`}
                >
                  선택한 플랜 견적 요청하기
                </button>
              ) : (
                <button
                  className={
                    "mt-8 w-full rounded-2xl bg-color-blue-300 p-4 text-xl text-color-gray-50 mobile-tablet:text-lg"
                  }
                  onClick={() => {
                    router.push("/plan-request");
                  }}
                >
                  일반 플랜 요청하기
                </button>
              )}
            </div>
          </ModalLayout>
        </div>
      )}
      {isRequestSuccessModalOpen && (
        <div>
          <ModalLayout label="ㅤ" closeModal={() => setIsRequestSuccessModalOpen(false)}>
            <div className="flex flex-col items-center">
              <p className="mb-5 text-2xl mobile-tablet:text-2lg">⭐ 요청이 완료되었습니다! ⭐</p>
            </div>
          </ModalLayout>
        </div>
      )}
    </>
  );
}
