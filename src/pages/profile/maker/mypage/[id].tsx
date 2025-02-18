import Image from "next/image";
import profileImg from "@public/assets/icon_maskgroup.png";
import star_sm from "@public/assets/icon_star.svg";
import StarRating from "@/components/Receive/StarRating";
import ReviewGraph from "@/components/Receive/ReviewGraph";
import { useEffect, useState } from "react";
import Pagination from "@/components/Common/Pagination";
import Link from "next/link";
import withAuthAccess from "@/stores/withAuthAccess";
import { useRouter } from "next/router";
import { useQuery, keepPreviousData, useQueryClient } from "@tanstack/react-query";
import userService from "@/services/userService";
import avatarImages from "@/utils/formatImage";
import { formatTripType, TripType } from "@/utils/formatTripType";
import { convertRegionToKorean, ServiceArea } from "@/utils/formatRegion";
import { formatToSimpleDate } from "@/utils/formatDate";
import link from "@public/assets/icon_link.svg";

export function MyPage() {
  const router = useRouter();
  const { id: userId } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const queryClient = useQueryClient();

  const { data: profileInfo, isPlaceholderData } = useQuery({
    queryKey: ["profileInfo", userId],
    queryFn: () => userService.getProfileInfo(userId as string),
    enabled: !!userId && typeof userId === "string",
  });

  const { data: makerMypage } = useQuery({
    queryKey: ["makerMypage", userId, currentPage],
    queryFn: () =>
      userService.getMakerMypage(userId as string, { page: currentPage, pageSize: itemsPerPage }),
    placeholderData: keepPreviousData,
    enabled: !!userId && typeof userId === "string",
  });

  const totalItems = makerMypage?.totalCount ?? 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const reviewStats = makerMypage?.groupByCount.reduce(
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

  useEffect(() => {
    const hasMore = currentPage * itemsPerPage < totalItems;

    if (!isPlaceholderData && hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["makerMypage", userId, currentPage + 1],
        queryFn: () =>
          userService.getMakerMypage(userId as string, {
            page: currentPage + 1,
            pageSize: itemsPerPage,
          }),
      });
    }
  }, [isPlaceholderData, currentPage, itemsPerPage, totalItems, userId, queryClient]);

  if (!userId || typeof userId !== "string") return null;

  return (
    <>
      <p className="mb-6 py-8 text-2xl semibold">마이페이지</p>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-12 w-full rounded-[16px] border border-color-gray-100 bg-color-background-200 p-6 pb-12 shadow-sm mobile-tablet:mb-6 mobile-tablet:pb-6">
          <div className="mb-6 flex items-center justify-between gap-2">
            {/* profile */}
            <div className="flex items-center gap-4">
              <Image
                className="shrink-0 rounded-full"
                src={
                  avatarImages.find((avatar) => avatar.key === profileInfo?.image)?.src ||
                  profileImg
                }
                alt="프로필이미지"
                width={80}
                height={80}
              />
              <div className="flex flex-col">
                <p className="text-2xl semibold">{profileInfo?.nickName}</p>
                <p className="flex text-xl text-color-gray-400 mobile:line-clamp-1">
                  {profileInfo?.detailDescription}
                </p>
              </div>
            </div>

            {/* button */}
          </div>
          <div className="mb-3 flex flex-col gap-4 rounded-[16px] border border-color-gray-100 bg-color-background-200 p-[26px]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-[6px] border-r border-color-gray-100 pr-4">
                <Image src={star_sm} alt="별이미지" width={24} height={24} />
                <p className="text-lg semibold">{profileInfo?.averageRating}</p>
                <p className="text-lg text-color-gray-300">리뷰수({totalItems})</p>
              </div>
              <div className="flex items-center gap-[6px] border-r border-color-gray-100 pr-4">
                <a
                  href={profileInfo?.gallery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 cursor-pointer text-lg text-color-gray-300 underline hover:text-color-blue-300"
                >
                  <Image src={link} alt="링크이미지" width={24} height={24} />
                  SNS
                </a>
              </div>
              <div className="flex items-center gap-[6px]">
                <p className="text-lg semibold">{profileInfo?.totalConfirms}건</p>
                <p className="text-lg text-color-gray-300">확정</p>
              </div>
            </div>

            <div className="flex gap-4 mobile:flex-col">
              <div className="flex items-center gap-3 border-r border-color-line-200 pr-4 mobile:border-none">
                <p className="rounded-[4px] border border-color-line-200 bg-color-background-200 px-[6px] py-1 text-2lg text-color-gray-500">
                  제공서비스
                </p>
                <p className="text-2lg">
                  {profileInfo?.serviceTypes
                    ?.map((type) => formatTripType(type as TripType))
                    .join(", ")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className="rounded-[4px] border border-color-line-200 bg-color-background-200 px-[6px] py-1 text-2lg text-color-gray-500">
                  지역
                </p>
                <p className="text-2lg">
                  {profileInfo?.serviceArea
                    ?.map((area) => convertRegionToKorean(area as ServiceArea))
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 mobile:flex-col">
            <Link href={`/profile/maker/edit/informEdit`}>
              <button className="mobile: flex items-center gap-[6px] rounded-[16px] border border-color-gray-200 bg-color-background-200 px-[64px] py-4 mobile:px-[100px]">
                <p className="text-xl semibold text-color-gray-400 mobile-tablet:whitespace-nowrap">
                  기본정보 수정
                </p>
              </button>
            </Link>
            <Link href={`/profile/maker/edit/profileEdit`}>
              <button className="flex items-center gap-[6px] rounded-[16px] bg-color-blue-300 px-[64px] py-4 mobile:px-[100px]">
                <p className="text-xl semibold text-white mobile-tablet:whitespace-nowrap">
                  내 프로필 수정
                </p>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <p className="mb-8 text-xl mobile-tablet:text-lg font-bold">리뷰({totalItems})</p>
        <div className="mb-10 flex items-center justify-center gap-10 mobile:flex-col">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-end gap-2">
              <p className="text-[64px] font-bold leading-[76.38px]">
                {profileInfo?.averageRating}
              </p>
              <p className="text-[38px] leading-[45.38px] text-color-gray-100">/5</p>
            </div>
            <div className="flex justify-end">
              <StarRating initialRating={Number(profileInfo?.averageRating)} readonly={true} />
            </div>
          </div>
          <div className="rounded-[16px] bg-color-background-200 px-[22px] py-4 shadow-md">
            <ReviewGraph reviewStats={reviewStats} />
          </div>
        </div>
      </div>
      {makerMypage?.list?.map((review, index) => (
        <div key={index} className="border-b border-color-line-100 py-8">
          <div className="flex items-center gap-3">
            <p className="border-r border-color-line-200 pr-3 text-md">{review.writer.nickName}</p>
            <p className="text-md text-color-gray-300">{formatToSimpleDate(review.createdAt)}</p>
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
    </>
  );
}

export default withAuthAccess(MyPage);
