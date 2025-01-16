import PlanCard from "@/components/MyPlans/Cards/PlanCard";
import MyPlanNav from "@/components/MyPlans/MyPlanNav";
import Layout from "@/components/Common/Layout";
import RequestCardList from "@/components/MyPlans/RequestCardList";
import { useState, useEffect } from "react";

export default function ongoingPlan() {
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
  }

  // 테스트용 데이터
  const planData = {
    selectedPlanId: 2, // 기본으로 선택된 플랜의 ID
    plans: [
      {
        id: 1,
        name: "플랜이름몇자까지되나요",
        requestDate: "2025-01-01",
        tripType: "휴양지",
        serviceArea: "서울",
        tripPeriod: "2025-01-10 ~ 2025-01-15", // 여행 시작일 ~ 여행 종료일
        details: "특별 요청 사항 없음",
      },
      {
        id: 2,
        name: "플랜이름더더더더더더더길어져도되나요",
        requestDate: "2025-02-01",
        tripType: "액티비티",
        serviceArea: "부산",
        tripPeriod: "2025-02-10 ~ 2025-02-17", // 여행 시작일 ~ 여행 종료일
        details: "특별 요청 없음",
      },
      {
        id: 3,
        name: "안신나는 제주도 출장",
        requestDate: "2025-03-01",
        tripType: "비즈니스",
        serviceArea: "제주도",
        tripPeriod: "2025-03-05 ~ 2025-03-07", // 여행 시작일 ~ 여행 종료일
        details: "업무 일정 조정 필요",
      },
      {
        id: 4,
        name: "경주에도 바닷가가 있나요?",
        requestDate: "2025-04-01",
        tripType: "휴양지",
        serviceArea: "경주",
        tripPeriod: "2025-04-05 ~ 2025-04-10", // 여행 시작일 ~ 여행 종료일
        details: "해변 근처 숙소",
      },
      {
        id: 5,
        name: "경주에도 바닷가가 있나요?2",
        requestDate: "2025-05-01",
        tripType: "휴양지",
        serviceArea: "경주",
        tripPeriod: "2025-04-05 ~ 2025-04-10", // 여행 시작일 ~ 여행 종료일
        details: "해변 근처 숙소",
      },
      {
        id: 6,
        name: "드롭다운 스크롤 테스트",
        requestDate: "2025-06-01",
        tripType: "관광지",
        serviceArea: "전주",
        tripPeriod: "2025-07-05 ~ 2025-07-10", // 여행 시작일 ~ 여행 종료일
        details: "비빔밥 맛집을 들러주세요",
      },
    ],
  };

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
    <>
      <MyPlanNav />
      <Layout bodyClass="bg-gray">
        <div className="flex place-content-between mobile-tablet:flex-col-reverse mobile-tablet:gap-y-2">
          <div className="text-color-black-400 word-break semibold text-2xl content-center mobile:text-lg">
            {selectedPlan ? selectedPlan.name : "플랜 선택"}
          </div>
          <div className="flex content-between gap-x-4 mobile:w-full mobile:whitespace-nowrap mobile-tablet:justify-end">
            <div className="flex content-between gap-[11px]">
              <button
                className="relative text-nowrap min-w-38 py-4 px-[32.5px] bg-color-blue-300 text-gray-50 semibold rounded-2xl  text-xl tablet:text-lg mobile:text-md mobile-tablet:py-[6px] mobile-tablet:px-[16px]"
                onClick={() => setIsOpen(!isOpen)}
              >
                플랜 목록
                {isOpen && (
                  <ul className="absolute top-[75px] right-0 text-left p-4 max-h-50 overflow-y-auto overflow-x-hidden bg-gray-50 normal text-color-black-500 rounded-2xl sm:w-auto mobile-tablet:top-[40px] mobile-tablet:p-[16px] mobile-tablet:max-w-[95%]">
                    {sortedPlans.map((plan) => (
                      <li
                        key={plan.id}
                        onClick={() => handlePlanSelect(plan.id)}
                        className="p-2 pointer hover:bg-color-blue-100 px-2 py-1 rounded-lg mobile:truncate"
                      >
                        {plan.name}
                      </li>
                    ))}
                  </ul>
                )}
              </button>
              <button className="py-4 px-[32.5px] text-nowrap min-w-38 bg-color-blue-50 border-color-blue-300 border-solid border-[1px]  text-color-blue-300 semibold rounded-2xl  text-xl tablet:text-lg  mobile:text-md mobile-tablet:py-[6px] mobile-tablet:px-[16px]">
                플랜 취소
              </button>
            </div>
          </div>
        </div>
        <PlanCard planData={{ selectedPlanId, plans: sortedPlans }} />
        <RequestCardList />
      </Layout>
    </>
  );
}
