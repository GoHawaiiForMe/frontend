import { useState, useEffect } from "react";

interface Plan {
  id: number;
  name: string;
  requestDate: string;
  travelType: string;
  travelSpot: string;
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

  return (
    <div className="planCard">
      <div className="planCardHeader">
        <div className="planTitle">{selectedPlan ? selectedPlan.name : "플랜 선택"}</div>
        <button>플랜 취소</button>
        <ul
          className="planDropdownList"
          value={selectedPlanId}
          onChange={(e) => setSelectedPlanId(Number(e.target.value))}
        >
          {sortedPlans.map((plan) => (
            <li key={plan.id}>{plan.name}</li>
          ))}
        </ul>
      </div>
      <div className="planCardDetails">
        <div className="planRequestDate">
          <label htmlFor="requestDate">플랜요청일</label>
          <div>{selectedPlan ? selectedPlan.requestDate : "-"}</div>
        </div>
        <div className="planTravelType">
          <label htmlFor="travelType">여행 유형</label>
          <div>{selectedPlan ? selectedPlan.travelType : "-"}</div>
        </div>
        <div className="planTravelSpot">
          <label htmlFor="travelSpot">여행지</label>
          <div>{selectedPlan ? selectedPlan.travelSpot : "-"}</div>
        </div>
        <div className="planTravelSpecialRequests">
          <label htmlFor="planTravelSpecialRequests">세부 요청 사항</label>
          <div>{selectedPlan ? selectedPlan.specialRequests : "-"}</div>
        </div>
      </div>
    </div>
  );
}
