import Link from "next/link";
import { useRouter } from "next/router";

export default function MyReviewNav() {
  const router = useRouter();
  const activeTab = router.pathname.split("/").pop();

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 bg-color-background-100 px-[260px] mobile:px-0 tablet:px-[72px]">
      <div className="max-w-screen-xl semibold mx-auto flex gap-[32px] px-[16px] text-xl text-color-gray-400 mobile-tablet:gap-[24px] mobile-tablet:text-md">
        <Link href="/myreview-manage/completed-trip">
          <button
            className={`py-[16px] ${
              activeTab === "completed-trip"
                ? "border-b-2 border-color-black-500 text-color-black-500"
                : ""
            }`}
          >
            <p className="text-nowrap">완료 가능한 여행</p>
          </button>
        </Link>
        <Link href="/myreview-manage/reviewable-trip">
          <button
            className={`py-[16px] ${
              activeTab === "reviewable-trip" ? "border-b-2 border-black text-color-black-500" : ""
            }`}
          >
            <p className="text-nowrap">작성 가능한 리뷰</p>
          </button>
        </Link>
        <Link href="/myreview-manage/reviewed-trip">
          <button
            className={`py-[16px] ${
              activeTab === "reviewed-trip" ? "border-b-2 border-black text-color-black-500" : ""
            }`}
          >
            <p className="text-nowrap">내가 작성한 리뷰</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
