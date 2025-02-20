import { forwardRef } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Plan } from "@/services/planService";
import { formatToSimpleDate } from "@/utils/formatDate";
import { convertRegionToKorean } from "@/utils/formatRegion";
import Label from "@/components/Common/Label";
import Image from "next/image";
import loading from "@public/assets/icon_loading.gif";

interface MyPlanListProps {
  visiblePlans: Plan[];
  title: string;
  status: string;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
}

const MyPlanList = forwardRef<HTMLDivElement, MyPlanListProps>(
  ({ visiblePlans, title, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading }, ref) => {
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
        <div className="semibold px-8 pt-8 text-2xl mobile-tablet:px-4 mobile-tablet:pt-4 mobile-tablet:text-xl">{`${title} 플랜 목록`}</div>
        <div className="flex-col p-8 mobile-tablet:p-4">
          {isLoading ? (
            <div className="flex h-screen items-center justify-center">
              <Image src={loading} alt="로딩 중" />
            </div>
          ) : (
            <>
              {visiblePlans.map((plan) => (
                <div
                  key={plan.id}
                  className="mb-3 flex justify-between rounded-2xl border-color-gray-300 bg-color-gray-50 p-2 shadow mobile-tablet:flex-col"
                >
                  <div>
                    <div className="semibold flex gap-2 px-2 pt-2 text-2lg">{plan.title}</div>
                    <div className="regular flex text-nowrap px-2 pt-2 text-lg mobile-tablet:flex-col mobile-tablet:text-md">
                      <div className="flex mobile-tablet:mb-2">
                        <p>{convertRegionToKorean(plan.serviceArea)}</p>
                        <p className="text-color-line-200">ㅣ</p>
                        <p>{formatToSimpleDate(plan.tripDate)}</p>
                      </div>
                      <p className="text-color-line-200 mobile-tablet:hidden">ㅣ</p>
                      <div className="inline-block max-w-max text-nowrap mobile-tablet:mb-2">
                        <Label
                          labelType={plan.tripType}
                          labelSize="sm"
                          customLabelContainerClass="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="semibold text-nowrap rounded-lg border-[1px] border-solid border-color-blue-300 bg-color-gray-50 px-5 py-4 text-lg text-color-blue-300 mobile-tablet:mt-1 mobile-tablet:px-4 mobile-tablet:py-1 mobile-tablet:text-md"
                    onClick={() => handleDetailClick(plan.id)}
                  >
                    플랜 상세
                  </button>
                </div>
              ))}
              {visiblePlans.length === 0 ? (
                <div className="flex h-12 items-center justify-center rounded-xl bg-gray-200 text-center">
                  아직 플랜이 없어요!
                </div>
              ) : !hasNextPage && visiblePlans.length > 0 ? (
                <div className="flex h-12 items-center justify-center rounded-xl bg-gray-200 text-center">
                  모든 플랜을 확인했어요!
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    );
  },
);

// displayName 설정
MyPlanList.displayName = "MyPlanList";

export default MyPlanList;
