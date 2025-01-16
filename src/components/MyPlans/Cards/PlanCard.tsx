import { useState, useEffect } from "react";

// interface Plan {
//   id: number;
//   name: string;
//   requestDate: string;
//   tripType: string;
//   tripPeriod: string;
//   serviceArea: string;
//   details: string;
// }

// interface PlanData {
//   selectedPlanId: number;
//   plans: Plan[];
// }

// interface PlanCardProps {
//   planData: PlanData;
// }

export default function PlanCard({ planData }: PlanCardProps) {
  // planData.plans가 비어있는 경우를 대비한 예외 처리
  if (!planData || !planData.plans || planData.plans.length === 0) {
    return (
      <div className="flex w-full justify-center text-center text-2xl bold">
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

  // ongoing에서 보내주는 selectedPlanId를 받아옴
  const { selectedPlanId } = planData;

  // 선택된 플랜 데이터를 찾는 함수
  const selectedPlan = sortedPlans.find((plan) => plan.id === selectedPlanId);

  useEffect(() => {
    // selectedPlanId가 변경될 때 콘솔에서 로그 확인
    console.log("selectedPlanId 변경됨:", selectedPlanId);
  }, [selectedPlanId]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 플랜 목록을 클릭할 때, 선택된 플랜을 업데이트하고 드롭다운을 닫기

  return (
    <div className="flex h-96 flex-col gap-y-[32px] my-[46px] mobile:gap-y-4">
      <div className="flex w-fill px-10 py-8 flex-col gap-y-1 border-color border-[1px] bg-body.bg-gray rounded-2xl text-xl semibol mobile-tablet:text-md mobile:px-[16px] mobile:py-[16px]">
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
          <div className="text-color-black-400">
            {selectedPlan ? selectedPlan.serviceArea : "-"}
          </div>
        </div>
        <div className="flex">
          <label className="text-color-gray-300 w-[150px]" htmlFor="planTravelSpecialRequests">
            세부 요청 사항
          </label>
          <div className="text-color-black-400">{selectedPlan ? selectedPlan.details : "-"}</div>
        </div>
      </div>
    </div>
  );
}
