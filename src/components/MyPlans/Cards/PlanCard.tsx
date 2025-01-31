interface Plan {
  id: number;
  name: string;
  requestDate: string;
  tripType: string;
  tripPeriod: string;
  serviceArea: string;
  details: string;
}

interface PlanData {
  selectedPlanId: number;
  plans: Plan[];
}

interface PlanCardProps {
  planData: PlanData;
  planId: number;
}

export default function PlanCard({ planData, planId }: PlanCardProps) {
  // planData.plans가 비어있는 경우를 대비한 예외 처리
  if (!planData || !planData.plans || planData.plans.length === 0) {
    return (
      <div className="bold flex w-full justify-center text-center text-2xl">
        플랜 데이터가 없습니다.
        <br />
        새로운 꿈을 찾아 가보세요!
      </div>
    );
  }

  // 플랜을 요청일 기준으로 내림차순으로 정렬
  const sortedPlans = [...planData.plans].sort((a, b) => {
    return new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime();
  });

  // 선택된 플랜 데이터를 찾는 함수
  const selectedPlan = sortedPlans.find((plan) => plan.id === planId);

  return (
    <div className="flex flex-col gap-y-[32px] mobile:gap-y-4 mobile-tablet:my-8">
      <div className="w-fill border-color semibol flex flex-col gap-y-1 rounded-2xl border-[1px] bg-color-background-200 px-10 py-8 text-xl mobile:px-[16px] mobile:py-[16px] mobile-tablet:text-md">
        <div className="flex">
          <label className="w-[150px] text-color-gray-300" htmlFor="requestDate">
            플랜요청일
          </label>
          <div className="text-color-black-400">
            {selectedPlan ? selectedPlan.requestDate : "-"}
          </div>
        </div>
        <div className="flex">
          <label className="w-[150px] text-color-gray-300" htmlFor="travelType">
            여행 유형
          </label>
          <div className="text-color-black-400">{selectedPlan ? selectedPlan.tripType : "-"}</div>
        </div>
        <div className="flex">
          <label className="w-[150px] text-color-gray-300" htmlFor="travelPeriod">
            여행 기간
          </label>
          <div className="flex-1 flex-wrap text-color-black-400">
            {selectedPlan ? selectedPlan.tripPeriod : "-"}
          </div>
        </div>
        <div className="flex">
          <label className="w-[150px] text-color-gray-300" htmlFor="travelSpot">
            여행지
          </label>
          <div className="text-color-black-400">
            {selectedPlan ? selectedPlan.serviceArea : "-"}
          </div>
        </div>
        <div className="flex">
          <label className="w-[150px] text-color-gray-300" htmlFor="planTravelSpecialRequests">
            세부 요청 사항
          </label>
          <div className="text-color-black-400">{selectedPlan ? selectedPlan.details : "-"}</div>
        </div>
      </div>
    </div>
  );
}
