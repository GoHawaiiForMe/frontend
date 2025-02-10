"use client";

import Image from "next/image";
import icon_like_red from "@public/assets/icon_like_red.png";
import icon_like_black from "@public/assets/icon_like_black.svg";
import icon_active_star from "@public/assets/icon_active_star.svg";
import { useEffect, useState } from "react";
import Label from "@/components/Common/Label";
import planData, { Service, Location } from "@/types/planData";
import Selector from "@/components/Common/Selector";
import icon_link from "@public/assets/icon_link.svg";
import StarRating from "@/components/Receive/StarRating";
import ReviewGraph from "@/components/Receive/ReviewGraph";
import Pagination from "@/components/Common/Pagination";
import userService from "@/services/userService";
import { useRouter } from "next/router";
import { useQuery, keepPreviousData, useQueryClient } from "@tanstack/react-query";
import avatarImages from "@/utils/formatImage";
import { formatToSimpleDate } from "@/utils/formatDate";
import clipshare from "@public/assets/icon_outline.png";
import facebook from "@public/assets/icon_facebook.png";
import kakao from "@public/assets/icon_kakao.png";
import { TripType } from "@/utils/formatTripType";
import Link from "next/link";

export default function RequestDetailDreamer() {
  const router = useRouter();
  const { id: makerId } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const itemsPerPage = 5;

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
    const currentUrl = window.location.href;
    if (typeof window !== "undefined" && window.Kakao) {
      const Kakao = window.Kakao;
      Kakao.Share.createDefaultButton({
        container: "#kakaotalk-sharing-btn",
        objectType: "feed",
        content: {
          title: makerProfileInfo?.nickName || "Maker님",
          description: makerProfileInfo?.description || "여행 플랜 상세내용보기",
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
  useEffect(() => {
    console.log("FB SDK 상태:", {
      exists: !!window.FB,
      initialized: window.FB?.getAuthResponse?.(),
      appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
    });
  }, []);

  const handleFacebookShare = () => {
    if (typeof window !== "undefined" && window.FB) {
      const shareUrl = `https://fs2-4-team2-go-for-me.vercel.app/maker-detail/${makerId}`;

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

  const sharePromptContent = (
    <div className="flex flex-col gap-4">
      <p className="semibold text-black-400 text-xl">나만 알기엔 아쉬운 기사님인가요?</p>
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
          id="facebook-sharing-btn"
          onClick={handleFacebookShare}
          className="cursor-pointer rounded-[16px] shadow-md mobile-tablet:h-[40px] mobile-tablet:w-[40px]"
          width={64}
          height={64}
        />
      </div>
    </div>
  );

  return (
    <div className="relative mt-20 grid w-full grid-cols-7 gap-16 mobile-tablet:flex mobile-tablet:flex-col">
      {/* 왼쪽 열 */}
      <div className="col-span-5 flex flex-col">
        <div className="flex h-72 gap-4 rounded-2xl border border-color-line-100 bg-color-gray-50 px-6 py-7 mobile-tablet:h-[200px] mobile-tablet:px-3 mobile-tablet:py-4">
          <div className="flex-grow">
            <div className="mobile-tablet:mt-[6px]">
              <div className="mb-3 flex gap-4">
                {makerProfileInfo?.serviceTypes.map((type) => (
                  <Label key={type} labelType={type as TripType} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-black-300 semibold text-2xl mobile-tablet:text-lg">
                {makerProfileInfo?.description}
              </p>
            </div>
            <div className="my-6 flex rounded-md border-[1px] border-color-line-100 px-[18px] py-4 mobile-tablet:my-[14px] mobile-tablet:gap-3 mobile-tablet:px-[10px] mobile-tablet:py-2">
              <div className="mr-4 flex mobile-tablet:h-[46px] mobile-tablet:w-[46px]">
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
                      src={icon_like_red}
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
                    <Link href={makerProfileInfo?.gallery || "#"}>
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

        <div className="flex flex-col gap-10 mobile-tablet:gap-12">
          <hr className="border-color-line-100 pc:hidden" />
          <div>
            <div className="pc:hidden">{sharePromptContent}</div>
          </div>
          <div className="mt-20 mobile-tablet:mt-0">
            <p className="bold mb-8 text-2xl text-color-black-400 mobile-tablet:text-lg">
              상세설명
            </p>
            <p className="regular text-2lg text-color-black-400 mobile-tablet:text-md">
              {makerProfileInfo?.detailDescription}
            </p>
          </div>
          <div>
            <p className="bold mb-8 text-2xl text-color-black-400 mobile-tablet:text-lg">
              제공 서비스
            </p>
            <Selector
              category="services"
              selectedTypes={makerProfileInfo?.serviceTypes ?? []}
              data={filteredServices}
              className="flex gap-4"
              itemClassName="!border-color-blue-300 bg-color-blue-50 text-color-blue-300"
            />
          </div>
          <div>
            <p className="bold mb-8 text-2xl text-color-black-400 mobile-tablet:text-lg">
              서비스 가능 지역
            </p>
            <Selector
              category="locations"
              selectedTypes={makerProfileInfo?.serviceArea ?? []}
              data={filteredLocations}
              className="flex gap-4"
            />
          </div>
          <div>
            <div>
              <p className="mb-8 text-lg font-bold">리뷰({makerProfileInfo?.totalReviews})</p>
              <div className="mb-10 flex items-center justify-center gap-10 mobile:flex-col">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex items-end gap-2">
                    <p className="text-[64px] font-bold leading-[76.38px]">
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
                <div className="rounded-[16px] bg-color-background-200 px-[22px] py-4 shadow-md">
                  <ReviewGraph reviewStats={reviewStats} />
                </div>
              </div>
            </div>

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
            <div className="my-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 열 */}
      <div className="col-span-2 flex">
        <div className="flex flex-col flex-nowrap gap-7 mobile-tablet:relative mobile-tablet:w-full mobile-tablet:flex-grow">
          <p className="semibold text-xl mobile-tablet:hidden">
            nickname Maker에게 지정 플랜을 요청해보세요!
          </p>
          <button className="semibold flex w-[354px] justify-center rounded-2xl border-[1px] p-2 py-4 text-xl mobile:text-md tablet:text-lg mobile-tablet:hidden mobile-tablet:px-4 mobile-tablet:py-[11px]">
            <Image src={icon_like_black} alt="좋아요" width={32} height={32} />
            <p> Maker 찜하기</p>
          </button>
          <div className="flex w-full mobile:px-6 tablet:px-[72px] mobile-tablet:fixed mobile-tablet:inset-x-0 mobile-tablet:bottom-0 mobile-tablet:flex-grow mobile-tablet:gap-2 mobile-tablet:bg-color-gray-50 mobile-tablet:py-7">
            <button className="flex rounded-2xl border-[1px] p-2 pc:hidden">
              <Image src={icon_like_black} alt="좋아요" width={32} height={32} />
            </button>
            <button className="semibold flex w-[354px] items-center justify-center rounded-2xl bg-color-blue-300 py-4 text-xl text-gray-50 mobile:text-md tablet:text-lg mobile-tablet:w-full mobile-tablet:max-w-full mobile-tablet:px-4 mobile-tablet:py-[11px]">
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
  );
}
