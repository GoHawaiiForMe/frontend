import PlanRequest from "@/features/PlanRequest";
import Layout from "@/components/Common/Layout";
import ConfirmedPlan from "@/components/Common/ConfirmedPlan";
import { useState } from "react";

export default function ProRequestPage() {
  const [isPlanConfirmed, setIsPlanConfirmed] = useState(false);

  return (
    <>
      <Layout bodyClass="bg-gray">
        {isPlanConfirmed ? (
          <ConfirmedPlan />
        ) : (
          <PlanRequest onConfirm={() => setIsPlanConfirmed(true)} />
        )}
      </Layout>
    </>
  );
}
