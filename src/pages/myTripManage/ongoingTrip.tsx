import PlanCard from "@/components/Cards/PlanCard";
import Layout from "@/components/Common/Layout";

export default function ongoingTrip() {
  // 테스트용 데이터
  const planData = {
    selectedPlanId: 2, // 기본으로 선택된 플랜의 ID
    plans: [
      {
        id: 1,
        name: "플랜이름몇자까지되나요",
        requestDate: "2025-01-01",
        tripType: "휴양지",
        tripSpot: "서울",
        tripPeriod: "2025-01-10 ~ 2025-01-15", // 여행 시작일 ~ 여행 종료일
        specialRequests: "특별 요청 사항 없음",
      },
      {
        id: 2,
        name: "플랜이름더더더더더더더길어져도되나요",
        requestDate: "2025-02-01",
        tripType: "모험 여행",
        tripSpot: "부산",
        tripPeriod: "2025-02-10 ~ 2025-02-17", // 여행 시작일 ~ 여행 종료일
        specialRequests: "특별 요청 없음",
      },
      {
        id: 3,
        name: "안신나는 제주도 출장",
        requestDate: "2025-03-01",
        tripType: "비즈니스",
        tripSpot: "제주도",
        tripPeriod: "2025-03-05 ~ 2025-03-07", // 여행 시작일 ~ 여행 종료일
        specialRequests: "업무 일정 조정 필요",
      },
      {
        id: 4,
        name: "경주에도 바닷가가 있나요?",
        requestDate: "2025-04-01",
        tripType: "휴양지",
        tripSpot: "경주",
        tripPeriod: "2025-04-05 ~ 2025-04-10", // 여행 시작일 ~ 여행 종료일
        specialRequests: "해변 근처 숙소",
      },
    ],
  };

  return (
    <Layout bodyClass="bg-gray">
      <PlanCard planData={planData} />
    </Layout>
  );
}
