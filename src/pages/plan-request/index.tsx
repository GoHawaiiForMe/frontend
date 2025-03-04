import PlanRequest from "@/features/PlanRequest";
import Layout from "@/components/Common/Layout/Layout";
import ConfirmedPlan from "@/components/Common/Feature/ConfirmedPlan";
import { useState } from "react";
import withAuthAccess from "@/stores/withAuthAccess";

export function PlanRequestPage() {
  const [isPlanConfirmed, setIsPlanConfirmed] = useState(false);

  const handleResetPlan = () => {
    setIsPlanConfirmed(false);
  };

  return (
    <>
      <Layout bodyClass="bg-gray">
        {isPlanConfirmed ? (
          <ConfirmedPlan onReset={handleResetPlan} />
        ) : (
          <PlanRequest onConfirm={() => setIsPlanConfirmed(true)} />
        )}
      </Layout>
    </>
  );
}

export default withAuthAccess(PlanRequestPage, "DREAMER");
