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
  const selectedPlan = planData.plans.find((plan) => plan.id === Number(id));

  return (
    <>
      <MyPlanNav />
      <Layout bodyClass="bg-gray">
        {/* <div className="my-[46px] flex place-content-between mobile-tablet:my-8 mobile-tablet:flex-col-reverse mobile-tablet:gap-y-2">
              <div className="word-break semibold content-center text-2xl text-color-black-400 mobile:text-lg">
                {selectedPlan ? selectedPlan.name : "플랜 선택"}
              </div>
              <div className="flex content-between gap-x-4 mobile:w-full mobile:whitespace-nowrap mobile-tablet:justify-end">
                <div className="flex content-between gap-[11px]">
                  <button
                    className="min-w-38 semibold relative text-nowrap rounded-2xl bg-color-blue-300 px-[32.5px] py-4 text-xl text-gray-50 mobile:text-md tablet:text-lg mobile-tablet:px-[16px] mobile-tablet:py-[6px]"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    플랜 목록
                    {isOpen && (
                      <ul className="max-h-50 normal sm:w-auto absolute right-0 top-[75px] overflow-y-auto overflow-x-hidden rounded-2xl bg-gray-50 p-4 text-left text-color-black-500 mobile-tablet:top-[40px] mobile-tablet:max-w-[95%] mobile-tablet:p-[16px]">
                        {sortedPlans.map((plan) => (
                          <li
                            key={plan.id}
                            onClick={() => handlePlanSelect(plan.id)}
                            className="pointer rounded-lg p-2 px-2 py-1 hover:bg-color-blue-100 mobile:truncate"
                          >
                            {plan.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </button>
                  <button className="min-w-38 semibold text-nowrap rounded-2xl border-[1px] border-solid border-color-blue-300 bg-color-blue-50 px-[32.5px] py-4 text-xl text-color-blue-300 mobile:text-md tablet:text-lg mobile-tablet:px-[16px] mobile-tablet:py-[6px]">
                    플랜 취소
                  </button>
                </div>
              </div>
            </div> */}
        <PlanCard planData={selectedPlan} />
        <RequestCardList />
      </Layout>
    </>
  );
}
