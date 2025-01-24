import Link from "next/link";
import { useRouter } from "next/router";

export default function MyPlanNav() {
  const router = useRouter();
  const activeTab = router.pathname.split("/").pop();

  return (
    <div className="relative px-[260px] bg-color-background-100 w-screen left-1/2 -translate-x-1/2 mobile:px-6 tablet:px-[72px]">
      <div className="flex max-w-screen-xl mx-auto gap-[32px] px-[16px] text-color-gray-400 text-xl semibold mobile-tablet:gap-[24px] mobile-tablet:text-md">
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
    </div>
  );
}
