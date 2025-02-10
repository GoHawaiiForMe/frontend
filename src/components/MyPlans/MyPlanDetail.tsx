import MyPlanNav from "./MyPlanNav";
import Layout from "../Common/Layout";
import PlanCard from "./Cards/PlanCard";
import QuotationCardList from "./QuotationCardList";
import { Plan } from "@/services/planService";

interface PlanData {
  planDetail: Plan;
}

export default function MyPlanDetail({ planDetail }: PlanData) {
  if (!planDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MyPlanNav />
      <Layout bodyClass="bg-gray">
        <div className="my-10 flex-col">
          <div className="my-10 rounded-2xl border-gray-300 bg-color-gray-50 p-5 shadow">
            <div className="semibold mb-3 text-2xl text-color-black-500">{planDetail.title}</div>
            <PlanCard planDetail={planDetail} />
          </div>
        </div>
        <QuotationCardList />
      </Layout>
    </>
  );
}
