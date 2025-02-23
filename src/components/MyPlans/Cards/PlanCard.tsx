import { Plan } from "@/services/planService";
import { formatToDetailedDate } from "@/utils/formatDate";
import { convertRegionToKorean } from "@/utils/formatRegion";
import Label from "@/components/Common/Label";

interface PlanData {
  planDetail: Plan;
}

export default function PlanCard({ planDetail }: PlanData) {
  return (
    <div className="flex flex-col gap-y-8 mobile:gap-y-4">
      <div className="w-fill border-color semibol flex flex-col gap-y-1 rounded-2xl border-[1px] bg-color-background-200 px-10 py-8 text-xl mobile:px-4 mobile:py-4 mobile-tablet:text-md">
        <div className="flex">
          <label
            className="w-40 flex-shrink-0 whitespace-nowrap text-color-gray-300 mobile-tablet:w-28"
            htmlFor="createdAt"
          >
            플랜요청일
          </label>
          <div className="text-color-black-400">
            {planDetail ? formatToDetailedDate(planDetail.createdAt) : "-"}
          </div>
        </div>
        <div className="flex">
          <label
            className="w-40 flex-shrink-0 whitespace-nowrap text-color-gray-300 mobile-tablet:w-28"
            htmlFor="tripType"
          >
            여행 유형
          </label>
          <div className="text-nowrap text-color-black-400">
            <Label labelType={planDetail?.tripType || "-"} customLabelContainerClass="rounded-lg" />
          </div>
        </div>
        <div className="flex">
          <label
            className="w-40 flex-shrink-0 whitespace-nowrap text-color-gray-300 mobile-tablet:w-28"
            htmlFor="tripDate"
          >
            여행 날짜
          </label>
          <div className="flex-1 flex-wrap text-color-black-400">
            {planDetail ? formatToDetailedDate(planDetail.tripDate) : "-"}
          </div>
        </div>
        <div className="flex">
          <label
            className="w-40 flex-shrink-0 whitespace-nowrap text-color-gray-300 mobile-tablet:w-28"
            htmlFor="serviceArea"
          >
            여행지
          </label>
          <div className="text-color-black-400">
            {planDetail ? convertRegionToKorean(planDetail.serviceArea) : "-"}
          </div>
        </div>
        <div className="flex">
          <label
            className="w-40 flex-shrink-0 whitespace-nowrap text-color-gray-300 mobile-tablet:w-28"
            htmlFor="details"
          >
            세부 요청 사항
          </label>
          <div className="text-color-black-400">{planDetail ? planDetail.details : "-"}</div>
        </div>
      </div>
    </div>
  );
}
