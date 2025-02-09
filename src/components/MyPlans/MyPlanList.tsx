import { forwardRef } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Plan } from "@/services/planService";

interface MyPlanListProps {
  visiblePlans: Plan[];
  title: string;
  status: string;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const MyPlanList = forwardRef<HTMLDivElement, MyPlanListProps>(
  ({ visiblePlans, title, fetchNextPage, hasNextPage, isFetchingNextPage }, ref) => {
    const router = useRouter();

    const handleDetailClick = (planId: string) => {
      const currentPath = router.pathname;
      let basePath = "/";

      if (currentPath.includes("ongoing-plan")) {
        basePath = "/mytrip-manage/ongoing-plan/detail";
      } else if (currentPath.includes("completed-plan")) {
        basePath = "/mytrip-manage/completed-plan/detail";
      } else if (currentPath.includes("overdue-plan")) {
        basePath = "/mytrip-manage/overdue-plan/detail";
      }
      const targetPath = `${basePath}/${planId}`;
      // console.log("Navigating to:", targetPath); // 경로 디버깅
      router.push(targetPath);
    };

    useEffect(() => {
      if (!ref || !("current" in ref) || !ref.current || !hasNextPage) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 1.0 },
      );

      observer.observe(ref.current);
      return () => observer.disconnect();
    }, [ref, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
      <div className="my-12 flex flex-col rounded-2xl border-color-gray-300 bg-color-gray-50 shadow">
        <div className="semibold px-8 pt-8 text-2xl">{`${title} 플랜 목록`}</div>
        <div className="flex-col p-8">
          {visiblePlans.map((plan) => (
            <div
              key={plan.id}
              className="mb-3 flex justify-between rounded-2xl border-color-gray-300 bg-color-gray-50 p-2 shadow"
            >
              <div>
                <div className="semibold px-2 pt-2 text-2lg">{plan.title}</div>
                <div className="semibold px-2 pt-2 text-lg">{plan.serviceArea}</div>
              </div>
              <button
                className="min-w-38 semibold text-nowrap rounded-lg border-[1px] border-solid border-color-blue-300 bg-color-gray-50 px-[32.5px] py-4 text-xl text-color-blue-300 mobile:text-md tablet:text-lg mobile-tablet:px-[16px] mobile-tablet:py-[6px]"
                onClick={() => handleDetailClick(plan.id)}
              >
                플랜 상세
              </button>
            </div>
          ))}
          {hasNextPage && !isFetchingNextPage && (
            <div ref={ref} className="h-12 content-center rounded-xl bg-gray-200 text-center">
              아래로 내려서 더 보기
            </div>
          )}
        </div>
      </div>
    );
  },
);

// displayName 설정
MyPlanList.displayName = "MyPlanList";

export default MyPlanList;
