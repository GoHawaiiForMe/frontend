import MyPlanNav from "@/components/MyPlans/MyPlanNav";
import Layout from "@/components/Common/Layout";
import MyPlanList from "@/components/MyPlans/MyPlanList";
import ReceiveModalLayout from "@/components/Receive/ReceiveModalLayout";
import planService from "@/services/planService";
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";

export default function OverduePlan() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { inView } = useInView();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsModalOpen(true);
    } else {
      setAccessToken(token);
    }
  }, []);

  const handleConfirm = () => {
    setIsModalOpen(false);
    router.push("/login");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["overduePlans", { status: ["OVERDUE"] }],
    initialPageParam: 1, // 처음 페이지는 1로 시작
    queryFn: ({ pageParam = 1 }) =>
      planService.getPlanList({
        status: ["OVERDUE"],
        page: pageParam,
        pageSize: 5,
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.list.length === 5 ? allPages.length + 1 : undefined;
    },
    enabled: !!accessToken, // 토큰이 있을 때만 요청
    placeholderData: keepPreviousData, // 이전 데이터 유지
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const planData = data?.pages.map((page) => page.list).flat() || [];

  return (
    <>
      <MyPlanNav />
      <Layout bodyClass="bg-gray">
        <MyPlanList
          title="만료된"
          status="overdue"
          visiblePlans={planData}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
        />
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
