import MyPlanNav from "./MyPlanNav";
import Layout from "../Common/Layout";
import PlanCard from "./Cards/PlanCard";
import RequestCardList from "./RequestCardList";
import { useRouter } from "next/router";

export default function MyPlanDetail() {
  const planData = {
    plans: [
      {
        id: 1,
        name: "플랜이름몇자까지되나요",
        requestDate: "2025-01-01",
        tripType: "휴양지",
        serviceArea: "서울",
        tripPeriod: "2025-01-10 ~ 2025-01-15",
        details: "특별 요청 사항 없음",
      },
      {
        id: 2,
        name: "플랜이름더더더더더더더길어져도되나요",
        requestDate: "2025-02-01",
        tripType: "액티비티",
        serviceArea: "부산",
        tripPeriod: "2025-02-10 ~ 2025-02-17",
        details: "특별 요청 없음",
      },
      {
        id: 3,
        name: "안신나는 제주도 출장",
        requestDate: "2025-03-01",
        tripType: "비즈니스",
        serviceArea: "제주도",
        tripPeriod: "2025-03-05 ~ 2025-03-07",
        details: "업무 일정 조정 필요",
      },
      {
        id: 4,
        name: "경주에도 바닷가가 있나요?",
        requestDate: "2025-04-01",
        tripType: "휴양지",
        serviceArea: "경주",
        tripPeriod: "2025-04-05 ~ 2025-04-10",
        details: "해변 근처 숙소",
      },
      {
        id: 5,
        name: "경주에도 바닷가가 있나요?2",
        requestDate: "2025-05-01",
        tripType: "휴양지",
        serviceArea: "경주",
        tripPeriod: "2025-04-05 ~ 2025-04-10",
        details: "해변 근처 숙소",
      },
      {
        id: 6,
        name: "드롭다운 스크롤 테스트",
        requestDate: "2025-06-01",
        tripType: "관광지",
        serviceArea: "전주",
        tripPeriod: "2025-07-05 ~ 2025-07-10",
        details: "비빔밥 맛집을 들러주세요",
      },
      {
        id: 7,
        name: "스크롤 테스트 1",
        requestDate: "2025-07-01",
        tripType: "관광지",
        serviceArea: "전주",
        tripPeriod: "2025-07-05 ~ 2025-07-10",
        details: "비빔밥 맛집을 들러주세요",
      },
      {
        id: 8,
        name: "스크롤 테스트 2",
        requestDate: "2025-08-01",
        tripType: "관광지",
        serviceArea: "전주",
        tripPeriod: "2025-08-05 ~ 2025-08-10",
        details: "비빔밥 맛집을 들러주세요",
      },
      {
        id: 9,
        name: "스크롤 테스트 3",
        requestDate: "2025-09-01",
        tripType: "관광지",
        serviceArea: "전주",
        tripPeriod: "2025-09-05 ~ 2025-09-10",
        details: "비빔밥 맛집을 들러주세요",
      },
      {
        id: 10,
        name: "스크롤 테스트 4",
        requestDate: "2025-10-01",
        tripType: "관광지",
        serviceArea: "전주",
        tripPeriod: "2025-10-05 ~ 2025-10-10",
        details: "비빔밥 맛집을 들러주세요",
      },
    ],
  };

  const router = useRouter();
  const { id } = router.query;
  const selectedPlan = id ? planData.plans.find((plan) => plan.id === Number(id)) : null;

  if (!selectedPlan) {
    return <div>Loading...</div>;
  }

  const planDataForCard = {
    selectedPlanId: selectedPlan.id,
    plans: planData.plans, // 모든 플랜 데이터를 전달
  };

  return (
    <>
      <MyPlanNav />
      <Layout bodyClass="bg-gray">
        <PlanCard planData={planDataForCard} planId={selectedPlan.id} />
        <RequestCardList />
      </Layout>
    </>
  );
}
