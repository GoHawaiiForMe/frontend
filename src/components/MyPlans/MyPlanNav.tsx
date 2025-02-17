import Link from "next/link";
import { useRouter } from "next/router";

export default function MyPlanNav() {
  const router = useRouter();
  const activeTab = router.pathname.split("/").pop();

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 bg-color-background-100 px-[260px] mobile:px-6 tablet:px-[72px]">
      <div className="max-w-screen-xl semibold mx-auto flex gap-[32px] px-[16px] text-xl text-color-gray-400 mobile-tablet:gap-[24px] mobile-tablet:text-md">
        <Link href="/mytrip-manage/ongoing-plan">
          <button
            className={`py-[16px] ${
              activeTab === "ongoing-plan"
                ? "border-b-2 border-color-black-500 text-color-black-500"
                : ""
            }`}
          >
            진행 중인 플랜
          </button>
        </Link>
        <Link href="/mytrip-manage/completed-plan">
          <button
            className={`py-[16px] ${
              activeTab === "completed-plan" ? "border-b-2 border-black text-color-black-500" : ""
            }`}
          >
            종료된 플랜
          </button>
        </Link>
        <Link href="/mytrip-manage/overdue-plan">
          <button
            className={`py-[16px] ${
              activeTab === "overdue-plan" ? "border-b-2 border-black text-color-black-500" : ""
            }`}
          >
            만료된 플랜
          </button>
        </Link>
      </div>
    </div>
  );
}
