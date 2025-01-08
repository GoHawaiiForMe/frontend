import PlanCard from "@/components/Cards/PlanCard";

export default function ongoingTrip() {
  // 테스트용 데이터
  const planData = {
    selectedPlanId: 2, // 기본으로 선택된 플랜의 ID
    plans: [
      {
        id: 1,
        name: "플랜이름1",
        requestDate: "2025-01-01",
        travelType: "휴양지",
        travelSpot: "서울",
        specialRequests: "특별 요청 사항 없음",
      },
      {
        id: 2,
        name: "플랜이름2",
        requestDate: "2025-02-01",
        travelType: "모험 여행",
        travelSpot: "부산",
        specialRequests: "특별 요청 없음",
      },
      {
        id: 3,
        name: "플랜이름3",
        requestDate: "2025-03-01",
        travelType: "비즈니스",
        travelSpot: "제주도",
        specialRequests: "업무 일정 조정 필요",
      },
      {
        id: 4,
        name: "플랜이름4",
        requestDate: "2025-04-01",
        travelType: "휴양지",
        travelSpot: "경주",
        specialRequests: "해변 근처 숙소",
      },
    ],
  };
  return <PlanCard planData={planData} />;
}
