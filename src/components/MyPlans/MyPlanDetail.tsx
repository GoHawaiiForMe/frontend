import { useRouter } from "next/router";
import MyPlanNav from "@/components/MyPlans/MyPlanNav";
import Layout from "@/components/Common/Layout";
import PlanCard from "@/components/MyPlans/Cards/PlanCard";
import QuotationCardList from "@/components/MyPlans/QuotationCardList";
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
      router.push("/mytrip-manage/ongoing-plan");
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
        <div className="my-16 rounded-2xl bg-color-gray-50 p-10">
          <p className="semibold text-2xl">진행중인 플랜 정보</p>
          <div className="my-10 rounded-2xl border-gray-300 p-5 shadow">
            <div className="flex justify-between">
              <div className="semibold mb-3 content-center text-2xl text-color-black-500 mobile-tablet:text-xl">
                {planDetail.title}
              </div>
              {planDetail.status === "PENDING" && (
                <button
                  className="semibold mb-3 text-nowrap rounded-lg border-[1px] border-solid border-color-blue-300 bg-color-blue-100 px-[16px] py-[11px] text-lg text-color-blue-300 mobile:text-md tablet:text-lg mobile-tablet:p-2"
                  onClick={handleDeletePlan}
                >
                  플랜 삭제
                </button>
              )}
            </div>
            <PlanCard planDetail={planDetail} />
          </div>
          <div className="flex-col">
            <p className="semibold mb-10 text-2xl">견적 정보</p>
            <QuotationCardList planDetail={planDetail} />
          </div>
        </div>
      </Layout>
    </>
  );
}
