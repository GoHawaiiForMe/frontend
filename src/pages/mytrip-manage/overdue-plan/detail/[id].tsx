import MyPlanDetailCompleted from "@/components/MyPlans/MyPlanDetailCompleted";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import planService from "@/services/planService";
import Image from "next/image";
import loading from "@public/assets/icon_loading.gif";
import withAuthAccess from "@/stores/withAuthAccess";

export function OverduePlanDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: planDetail } = useQuery({
    queryKey: ["planDetail", id],
    queryFn: () => planService.getPlanDetail(id as string),
    enabled: !!id,
  });

  if (!planDetail) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Image src={loading} alt="로딩 중" />
      </div>
    );
  }

  return (
    <>
      <MyPlanDetailCompleted planDetail={planDetail} />
    </>
  );
}

export default withAuthAccess(OverduePlanDetail, "DREAMER");
