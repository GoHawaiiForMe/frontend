import Link from "next/link";
import { useRouter } from "next/router";

export default function MyPlanNav() {
  const router = useRouter();
  const activeTab = router.pathname.split("/").pop();

  return (
    <div className="flex gap-[32px]  text-color-gray-400 text-xl semibold mobile-tablet:gap-[24px] mobile-tablet:text-md">
      <Link href="./ongoingPlan">
        <button
          className={`py-[16px] ${
            activeTab === "ongoingPlan"
              ? "text-color-black-500 border-b-2 border-color-black-500"
              : ""
          }`}
        >
          진행 중인 플랜
        </button>
      </Link>
      <Link href="./completedPlan">
        <button
          className={`py-[16px] ${
            activeTab === "completedPlan" ? "text-color-black-500 border-b-2 border-black" : ""
          }`}
        >
          종료된 플랜
        </button>
      </Link>
      <Link href="expiredPlan">
        <button
          className={`py-[16px] ${
            activeTab === "expiredPlan" ? "text-color-black-500 border-b-2 border-black" : ""
          }`}
        >
          만료된 플랜
        </button>
      </Link>
    </div>
  );
}
