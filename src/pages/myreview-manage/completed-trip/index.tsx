import Layout from "@/components/Common/Layout";
import Pagination from "@/components/Common/Pagination";
import MyCompletedTripList from "@/components/MyReviews/MyCompletedTripList";
import MyReviewNav from "@/components/MyReviews/MyReviewNav";
import Image from "next/image";
import loading from "@public/assets/icon_loading.gif";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import planService from "@/services/planService";
import { useQuery } from "@tanstack/react-query";
import ReceiveModalLayout from "@/components/Receive/ReceiveModalLayout";
import icon_emptyfile from "@public/assets/icon_emptyfile.svg";

export default function CompletedTrip() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태
  const pageSize = 6;

  const handleConfirm = () => {
    setIsModalOpen(false);
    router.push("/login");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`Changed to page: ${page}`); // 디버깅용
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsModalOpen(true);
    } else {
      setAccessToken(token); // 토큰이 있으면 상태에 저장
    }
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["readyTocomplete", currentPage],
    queryFn: () => planService.getReadyToCompletePlan(),
    enabled: !!accessToken, // 토큰이 있을 때만 요청
  });

  const totalPages = Math.ceil((data?.totalCount || 1) / pageSize);
  const planData = data?.list.flat() || [];

  return (
    <>
      <MyReviewNav />
      <Layout bodyClass="bg-gray">
        <div className="my-10">
          {planData.length === 0 && (
            <div className="flex h-screen flex-col items-center justify-center gap-8">
              <Image src={icon_emptyfile} alt="비어있음" />
              <p className="regular text-2xl text-color-gray-400">
                아직 완료 가능한 여행이 없어요!
              </p>
            </div>
          )}
          {isLoading ? (
            <div className="flex h-screen items-center justify-center">
              <Image src={loading} alt="로딩 중" />
            </div>
          ) : (
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
          )}
        </div>
      </Layout>
      {isModalOpen && (
        <ReceiveModalLayout label="로그인 필요" closeModal={() => setIsModalOpen(false)}>
          <p className="text-lg">로그인이 필요한 서비스입니다.</p>
          <div className="mt-6 flex justify-end space-x-4">
            <button className="px-4 py-2 text-gray-500" onClick={handleCancel}>
              취소
            </button>
            <button className="rounded-lg bg-blue-500 px-4 py-2 text-white" onClick={handleConfirm}>
              확인
            </button>
          </div>
        </ReceiveModalLayout>
      )}
    </>
  );
}
