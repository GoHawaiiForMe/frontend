import MyPlanNav from "./MyPlanNav";
import Layout from "../Common/Layout";
import PlanCard from "./Cards/PlanCard";
import QuotationCardListCompleted from "./QuotationCardListCompleted";
import { useRouter } from "next/router";
import planService from "@/services/planService";
import { useQuery } from "@tanstack/react-query";

export default function MyPlanDetailCompleted() {
  const router = useRouter();
  const { id } = router.query;

  const { data: planDetail, isLoading } = useQuery({
    queryKey: ["planDetail", id],
    queryFn: () => planService.getPlanDetail(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!planDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MyPlanNav />
      <Layout bodyClass="bg-gray">
        <div className="my-16 rounded-2xl bg-color-gray-50 p-10">
          <p className="semibold text-2xl">플랜 정보</p>
          <div className="my-10 rounded-2xl border-gray-300 p-5 shadow">
            <div className="semibold mb-3 text-2xl text-color-black-500">{planDetail.title}</div>
            <PlanCard planDetail={planDetail} />
          </div>
          <div className="flex-col">
            <p className="semibold mb-10 text-2xl">견적 정보</p>
            <QuotationCardListCompleted />
          </div>
        </div>
      </Layout>
    </>
  );
}
