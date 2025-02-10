import Label from "@/components/Common/Label";
import { QuotationItem } from "@/services/quotationService";
import { formatToDetailedDate } from "@/utils/formatDate";
import { convertRegionToKorean } from "@/utils/formatRegion";
import Link from "next/link";

interface SendQuotationProps {
  data: QuotationItem;
}

export default function SendQuotation({ data }: SendQuotationProps) {
  const tripDate = formatToDetailedDate(data.plan.tripDate);
  const region = convertRegionToKorean(data.plan.serviceArea);

  const specifyMaker = data.isAssigned ? <Label labelType="REQUEST" /> : "";

  const waitingQuotation = () => {
    if (data.plan.status === "PENDING") {
      return <Label labelType="PENDING" />;
    }
    if (data.plan.status === "CONFIRMED") {
      return <Label labelType="CONFIRMED" />;
    }
  };

  return (
    <>
      <div className="relative mb-8 flex flex-col rounded-[16px] border border-color-line-100 px-6 pb-3 pt-5 shadow-md">
        <div className="mb-4 flex items-center justify-between text-xs text-color-gray-500">
          <div className="flex items-center gap-3">
            {waitingQuotation()}
            <Label labelType={data.plan.tripType} />
            {specifyMaker}
          </div>
        </div>
        <Link href={`/quotationDetail/${data.id}`}>
          <div>
            <p className="text-xl font-semibold">{data.plan.title}</p>
            <p className="mb-[18px] border-b border-color-line-200 pb-[18px] text-md font-medium">
              {data.dreamer.nickName} 고객님
            </p>
            <div className="flex flex-col gap-1 mobile:grid mobile:grid-cols-2 mobile:gap-0 tablet:flex-row">
              <div className="flex items-center gap-1 mobile:col-span-2 mobile:mb-2">
                <p className="whitespace-nowrap rounded-[4px] bg-color-background-400 px-[6px] py-1 text-2lg font-normal text-color-gray-500 mobile:text-md">
                  여행일
                </p>
                <p className="medium text-2lg text-color-black-300 mobile:text-md">{tripDate}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="whitespace-nowrap rounded-[4px] bg-color-background-400 px-[6px] py-1 text-2lg font-normal text-color-gray-500 mobile:text-md">
                  여행지
                </p>
                <p className="whitespace-nowrap text-2lg font-medium text-color-black-300 mobile:text-md">
                  {region}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
              <p className="medium text-2lg">견적 코코넛</p>
              <p className="text-2xl font-bold">{data.price.toLocaleString()}개</p>
            </div>
          </div>
        </Link>
        {data.plan.status !== "PENDING" && data.isConfirmed === false && (
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-[16px] bg-color-black-400 bg-opacity-50 text-white">
            <p>반려된 견적입니다.</p>
          </div>
        )}

        {data.plan.status === "COMPLETED" && data.isConfirmed === true && (
          <>
            <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-[16px] bg-color-black-400 bg-opacity-50 text-white">
              <p>여행 완료된 플랜입니다.</p>
              <Link href={`/quotationDetail/${data.id}`}>
                <button className="z-40 rounded-[16px] border border-color-blue-200 bg-color-blue-100 px-[18px] py-[10px] text-lg font-semibold text-color-blue-300">
                  견적 상세 보기
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
