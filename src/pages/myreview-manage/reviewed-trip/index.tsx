import Layout from "@/components/Common/Layout/Layout";
import Pagination from "@/components/Common/UI/Pagination";
import MyReviewList from "@/components/MyReviews/MyReviewList";
import MyReviewNav from "@/components/MyReviews/MyReviewNav";
import reviewService from "@/services/reviewService";
import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import loading from "@public/assets/icon_loading.gif";
import icon_luggage_frown from "@public/assets/icon_luggage_frown.svg";
import Link from "next/link";
import withAuthAccess from "@/stores/withAuthAccess";

export function ReviewedTrip() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태
  const pageSize = 6;

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token); // 토큰이 있으면 상태에 저장
    }
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["readyTocomplete", currentPage],
    queryFn: () => reviewService.getMyReviews({ page: currentPage, pageSize }),
    placeholderData: keepPreviousData,
    enabled: !!accessToken, // 토큰이 있을 때만 요청
  });

  const totalPages = Math.max(1, Math.ceil((data?.totalCount || 1) / pageSize));
  const reviewData = data?.list.flat() || [];

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Image src={loading} alt="로딩 중" />
      </div>
    );
  }

  return (
    <>
      <MyReviewNav />
      <Layout bodyClass="bg-gray">
        <div className="my-10">
          {!isLoading && reviewData.length === 0 && (
            <div className="flex h-screen flex-col items-center justify-center gap-8">
              <Image src={icon_luggage_frown} alt="비어있음" />
              <p className="regular text-2xl text-color-gray-400">아직 등록된 리뷰가 없어요!</p>
              <Link href="/myreview-manage/reviewable-trip">
                <button className="semibold w-full text-nowrap rounded-lg bg-color-blue-300 px-[32.5px] py-4 text-xl text-gray-50 mobile:text-md tablet:text-lg mobile-tablet:px-[16px] mobile-tablet:py-[11px]">
                  리뷰 작성하러 가기
                </button>
              </Link>
            </div>
          )}
          <>
            <MyReviewList reviews={reviewData} />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        </div>
      </Layout>
    </>
  );
}

export default withAuthAccess(ReviewedTrip, "DREAMER");
