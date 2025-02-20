import MyPlanNav from "@/components/MyPlans/MyPlanNav";
import Layout from "@/components/Common/Layout";
import MyPlanList from "@/components/MyPlans/MyPlanList";
import planService from "@/services/planService";
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import loading from "@public/assets/icon_loading.gif";
import withAuthAccess from "@/stores/withAuthAccess";

export function OngoingPlan() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { ref, inView } = useInView();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["ongoingPlans", { status: ["PENDING", "CONFIRMED"] }],
    initialPageParam: 1, // 처음 페이지는 1로 시작
    queryFn: ({ pageParam = 1 }) =>
      planService.getPlanList({
        status: ["PENDING", "CONFIRMED"],
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
          title="🛫 진행 중인"
          status="ongoing"
          visiblePlans={planData}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
        />
      </Layout>
      <div ref={ref} className="h-10">
        {isFetchingNextPage && (
          <div className="flex h-screen items-center justify-center">
            <Image src={loading} alt="로딩 중" />
          </div>
        )}
      </div>
    </>
  );
}

export default withAuthAccess(OngoingPlan, "DREAMER");
