import { useRouter } from "next/router";
import MyPlanNav from "./MyPlanNav";
import Layout from "../Common/Layout";
import PlanCard from "./Cards/PlanCard";
import QuotationCardList from "./QuotationCardList";
import planService, { Plan } from "@/services/planService";
import Image from "next/image";
import loading from "@public/assets/icon_loading.gif";

interface PlanData {
  planDetail: Plan;
}

export default function MyPlanDetail({ planDetail }: PlanData) {
  const router = useRouter();

  async function handleDeletePlan() {
    try {
      await planService.deletePlan(planDetail.id);
      alert("플랜을 취소하였습니다.");
    } catch (error) {
      alert(`플랜 취소를 실패했습니다. 다시 시도해주세요. ${error}`);
    } finally {
      router.push("../");
    }
  }

  if (!planDetail) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Image src={loading} alt="로딩 중" />
      </div>
    );
  }

  return (
    <>
      <MyPlanNav />
      <Layout bodyClass="bg-gray">
        <div className="my-10 flex-col">
          <div className="my-10 rounded-2xl border-gray-300 bg-color-gray-50 p-5 shadow">
            <div className="flex justify-between">
              <div className="semibold mb-3 content-center text-2xl text-color-black-500 mobile-tablet:text-xl">
                {planDetail.title}
              </div>
              {planDetail.status === "PENDING" && (
                <button
                  className="semibold mb-3 text-nowrap rounded-lg border-[1px] border-solid border-color-blue-300 bg-color-blue-100 px-[16px] py-[11px] text-lg text-color-blue-300 mobile:text-md tablet:text-lg"
                  onClick={handleDeletePlan}
                >
                  플랜 취소
                </button>
              )}
            </div>
            <PlanCard planDetail={planDetail} />
          </div>
        </div>
        <QuotationCardList planDetail={planDetail} />
      </Layout>
    </>
  );
}
