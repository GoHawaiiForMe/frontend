import MyPlanDetail from "@/components/MyPlans/MyPlanDetail";

interface PlanDataProps {
  id: number;
}

export default function completedPlanDetail({ id }: PlanDataProps) {
  return (
    <>
      <MyPlanDetail PlanDataProps={{ id }} />
    </>
  );
}
