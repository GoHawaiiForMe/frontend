import MyPlanNav from "@/components/MyPlans/MyPlanNav";
import Layout from "@/components/Common/Layout";
import MyPlanList from "@/components/MyPlans/MyPlanList";
import planService from "@/services/planService";
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";
import withAuthAccess from "@/stores/withAuthAccess";

export function CompletedPlan() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { inView } = useInView();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token); // 토큰이 있으면 상태에 저장
    }
  }, []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["completedPlans", { status: ["COMPLETED"] }],
    initialPageParam: 1, // 처음 페이지는 1로 시작
    queryFn: ({ pageParam = 1 }) =>
      planService.getPlanList({
        status: ["COMPLETED"],
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
          title="종료된"
          status="completed"
          visiblePlans={planData}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
        />
      </Layout>
    </>
  );
}

export default withAuthAccess(CompletedPlan);
