import { useState, useEffect } from "react";

interface Plan {
  id: number;
  name: string;
  requestDate: string;
  tripType: string;
  tripPeriod: string;
  tripSpot: string;
  specialRequests: string;
}

interface PlanData {
  selectedPlanId: number;
  plans: Plan[];
}

interface PlanCardProps {
  planData: PlanData;
}

export default function PlanCard({ planData }: PlanCardProps) {
  // planData.plans가 비어있는 경우를 대비한 예외 처리
  if (!planData || !planData.plans || planData.plans.length === 0) {
    return <div>플랜 데이터가 없습니다.</div>;
  }

  // 플랜을 요청일 기준으로 내림차순으로 정렬
  const sortedPlans = [...planData.plans].sort((a, b) => {
    return new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime();
  });

  // 가장 최신의 플랜 선택
  const [selectedPlanId, setSelectedPlanId] = useState(sortedPlans[0].id);

  // 선택된 플랜 데이터를 찾는 함수
  const selectedPlan = sortedPlans.find((plan) => plan.id === selectedPlanId);

  useEffect(() => {
    // selectedPlanId가 변경될 때 콘솔에서 로그 확인
    console.log("selectedPlanId 변경됨:", selectedPlanId);
  }, [selectedPlanId]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 플랜 목록을 클릭할 때, 선택된 플랜을 업데이트하고 드롭다운을 닫기
  const handlePlanSelect = (planId: number) => {
    setSelectedPlanId(planId);
    setIsOpen(false); // 드롭다운을 닫는다
  };

  return (
    <div className="flex h-96 flex-col gap-y-[32px] my-[46px] mobile:gap-y-[16px]">
      <div className="flex place-content-between mobile:flex-col-reverse mobile:gap-y-[8px]">
        <div className="text-color-black-400 semibold text-2xl content-center mobile:text-lg">
          {selectedPlan ? selectedPlan.name : "플랜 선택"}
        </div>
        <div className="flex  content-between  gap-x-[16px] mobile:w-full mobile:whitespace-nowrap mobile: justify-end">
          <div className="flex content-between gap-[11px]">
            <button
              className="relative py-[16px] px-[32.5px] bg-color-blue-300 text-white semibold rounded-2xl  text-xl tablet:text-lg mobile:text-md mobile:py-[6px] mobile:px-[16px]"
              onClick={() => setIsOpen(!isOpen)}
            >
              플랜 목록
              {isOpen && (
                <ul className="absolute top-[75px] right-0 whitespace-nowrap text-left p-[16px] bg-gray-50  normal text-color-black-500 rounded-2xl mobile:top-[40px]">
                  {sortedPlans.map((plan) => (
                    <li
                      key={plan.id}
                      onClick={() => handlePlanSelect(plan.id)}
                      className="p-[16px]"
                    >
                      {plan.name}
                    </li>
                  ))}
                </ul>
              )}
            </button>

            <button className="py-[16px] px-[32.5px] bg-color-blue-50 border-color-blue-300 border-solid border-[1px]  text-color-blue-300 semibold rounded-2xl  text-xl tablet:text-lg  mobile:text-md mobile:py-[6px] mobile:px-[16px]">
              플랜 취소
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-fill px-[40px] py-[32px] flex-col gap-y-1 border-color border-[1px] bg-body.bg-gray rounded-2xl text-xl semibol mobile-tablet:text-md mobile:px-[16px] mobile:py-[16px]">
        <div className="flex">
          <label className="text-color-gray-300 w-[150px]" htmlFor="requestDate">
            플랜요청일
          </label>
          <div className="text-color-black-400">
            {selectedPlan ? selectedPlan.requestDate : "-"}
          </div>
        </div>
        <div className="flex">
          <label className="text-color-gray-300 w-[150px]" htmlFor="travelType">
            여행 유형
          </label>
          <div className="text-color-black-400">{selectedPlan ? selectedPlan.tripType : "-"}</div>
        </div>
        <div className="flex">
          <label className=" text-color-gray-300 w-[150px]" htmlFor="travelPeriod">
            여행 기간
          </label>
          <div className=" flex-1 flex-wrap text-color-black-400">
            {selectedPlan ? selectedPlan.tripPeriod : "-"}
          </div>
        </div>
        <div className="flex">
          <label className="text-color-gray-300 w-[150px] flex-shrink-0" htmlFor="travelSpot">
            여행지
          </label>
          <div className="text-color-black-400">{selectedPlan ? selectedPlan.tripSpot : "-"}</div>
        </div>
        <div className="flex">
          <label className="text-color-gray-300 w-[150px]" htmlFor="planTravelSpecialRequests">
            세부 요청 사항
          </label>
          <div className="text-color-black-400">
            {selectedPlan ? selectedPlan.specialRequests : "-"}
          </div>
        </div>
      </div>
    </div>
  );
}
