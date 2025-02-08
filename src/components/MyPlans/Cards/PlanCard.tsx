interface Plan {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  tripDate: string;
  tripType: string;
  serviceArea: string;
  details: string;
  status: string;
  assignees: [];
  dreamer: {};
}

interface PlanData {
  planDetail: Plan;
}

export default function PlanCard({ planDetail }: PlanData) {
  return (
    <div className="flex flex-col gap-y-[32px] mobile:gap-y-4 mobile-tablet:my-8">
      <div className="w-fill border-color semibol flex flex-col gap-y-1 rounded-2xl border-[1px] bg-color-background-200 px-10 py-8 text-xl mobile:px-[16px] mobile:py-[16px] mobile-tablet:text-md">
        <div className="flex">
          <label className="w-[150px] text-color-gray-300" htmlFor="requestDate">
            플랜요청일
          </label>
          <div className="text-color-black-400">{planDetail ? planDetail.createdAt : "-"}</div>
        </div>
        <div className="flex">
          <label className="w-[150px] text-color-gray-300" htmlFor="travelType">
            여행 유형
          </label>
          <div className="text-color-black-400">{planDetail ? planDetail.tripType : "-"}</div>
        </div>
        <div className="flex">
          <label className="w-[150px] text-color-gray-300" htmlFor="travelPeriod">
            여행 날짜
          </label>
          <div className="flex-1 flex-wrap text-color-black-400">
            {planDetail ? planDetail.tripDate : "-"}
          </div>
        </div>
        <div className="flex">
          <label className="w-[150px] text-color-gray-300" htmlFor="travelSpot">
            여행지
          </label>
          <div className="text-color-black-400">{planDetail ? planDetail.serviceArea : "-"}</div>
        </div>
        <div className="flex">
          <label className="w-[150px] text-color-gray-300" htmlFor="planTravelSpecialRequests">
            세부 요청 사항
          </label>
          <div className="text-color-black-400">{planDetail ? planDetail.details : "-"}</div>
        </div>
      </div>
    </div>
  );
}
