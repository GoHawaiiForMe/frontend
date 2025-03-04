import Layout from "@/components/Common/Layout/Layout";
import Pagination from "@/components/Common/UI/Pagination";
import MyCompletedTripList from "@/components/MyReviews/MyCompletedTripList";
import MyReviewNav from "@/components/MyReviews/MyReviewNav";
import Image from "next/image";
import loading from "@public/assets/icon_loading.gif";
import { useEffect, useState } from "react";
import planService from "@/services/planService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import icon_luggage_frown from "@public/assets/icon_luggage_frown.svg";
import withAuthAccess from "@/stores/withAuthAccess";

export function CompletedTrip() {
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
    queryFn: () => planService.getReadyToCompletePlan({ page: currentPage, pageSize }),
    placeholderData: keepPreviousData,
    enabled: !!accessToken, // 토큰이 있을 때만 요청
  });

  const totalPages = Math.ceil((data?.totalCount || 1) / pageSize);
  const planData = data?.list.flat() || [];

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
          {!isLoading && planData.length === 0 && (
            <div className="flex h-screen flex-col items-center justify-center gap-8">
              <Image src={icon_luggage_frown} alt="비어있음" />
              <p className="regular text-2xl text-color-gray-400">
                아직 완료 가능한 여행이 없어요!
              </p>
            </div>
          )}
          <>
            <MyCompletedTripList plans={planData} />
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

export default withAuthAccess(CompletedTrip, "DREAMER");
