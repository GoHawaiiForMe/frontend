import { forwardRef } from "react";
import { useRouter } from "next/router";

interface Plan {
  id: number;
  name: string;
  requestDate: string;
  tripType: string;
  tripPeriod: string;
  serviceArea: string;
  details: string;
}

interface MyPlanListProps {
  visiblePlans: Plan[];
  loadedCount: number;
  totalPlans: number;
  title: string; //불러온 페이지 이름(진행중, 종료된, 만료된)
  status: string; //플랜의 상태 값 (ongoing, completed, expired)
}

const MyPlanList = forwardRef<HTMLDivElement, MyPlanListProps>(
  ({ visiblePlans, loadedCount, totalPlans, title }, ref) => {
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
                <div className="semibold px-2 pt-2 text-2lg">{plan.name}</div>
                <div className="semibold px-2 pt-2 text-lg">{plan.serviceArea}</div>
              </div>
              <button className="min-w-38 semibold text-nowrap rounded-lg border-[1px] border-solid border-color-blue-300 bg-color-gray-50 px-[32.5px] py-4 text-xl text-color-blue-300 mobile:text-md tablet:text-lg mobile-tablet:px-[16px] mobile-tablet:py-[6px]">
                플랜 상세
              </button>
            </div>
          ))}
          {loadedCount < totalPlans && (
            <div ref={ref} className="h-12 content-center rounded-xl bg-gray-200 text-center">
              로딩 중...
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
