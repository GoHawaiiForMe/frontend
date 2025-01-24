import MyPlanNav from "./MyPlanNav";
import Layout from "../Common/Layout";
import PlanCard from "./Cards/PlanCard";
import RequestCardList from "./RequestCardList";

export default function MyPlanDetail() {
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
        <PlanCard planData={{ selectedPlanId, plans: sortedPlans }} />
        <RequestCardList />
      </Layout>
    </>
  );
}
