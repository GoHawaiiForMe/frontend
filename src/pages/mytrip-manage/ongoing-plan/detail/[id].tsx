import MyPlanDetail from "@/components/MyPlans/MyPlanDetail";
import planService from "@/services/planService";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

export default function OngoingPlanDetail() {
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
      <MyPlanDetail planDetail={planDetail} />
    </>
  );
}
