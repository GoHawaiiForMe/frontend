import MyPlanNav from "@/components/MyPlans/MyPlanNav";
import Layout from "@/components/Common/Layout";
import PlanCard from "@/components/MyPlans/Cards/PlanCard";
import QuotationCardListCompleted from "@/components/MyPlans/QuotationCardListCompleted";
import { Plan } from "@/services/planService";
import Image from "next/image";
import loading from "@public/assets/icon_loading.gif";

interface PlanData {
  planDetail: Plan;
}

export default function MyPlanDetailCompleted({ planDetail }: PlanData) {
  if (!planDetail) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Image src={loading} alt="로딩 중" />
      </div>
    );
  }

  let title = "";

  if (planDetail.status === "COMPLETED") {
    title = "종료된";
  } else if (planDetail.status === "OVERDUE") {
    title = "만료된";
  }

  return (
    <>
      <MyPlanNav />
      <Layout bodyClass="bg-gray">
        <div className="my-16 rounded-2xl bg-color-gray-50 p-10">
          <p className="semibold text-2xl">{title} 플랜 정보</p>
          <div className="my-10 rounded-2xl border-gray-300 p-5 shadow">
            <div className="semibold mb-3 text-2xl text-color-black-500">{planDetail.title}</div>
            <PlanCard planDetail={planDetail} />
          </div>
          <div className="flex-col">
            <p className="semibold mb-10 text-2xl">견적 정보</p>
            <QuotationCardListCompleted planDetail={planDetail} />
          </div>
        </div>
      </Layout>
    </>
  );
}
