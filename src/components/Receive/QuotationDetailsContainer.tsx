import Image from "next/image";
import writing from "@public/assets/icon_writing.png";
import Label from "../Common/Label";
import { formatRelativeTime, formatToDetailedDate } from "@/utils/formatDate";
import { convertRegionToKorean } from "@/utils/formatRegion";
import Link from "next/link";
import { QuotationItem } from "@/services/quotationService";

interface QuotationDetailsProps {
  data: QuotationItem;
  onSendQuotation: () => void;
  onReject: () => void;
  oneButton?: boolean;
  twoButton?: boolean;
}

export default function QuotationDetailsContainer({
  data,
  onSendQuotation,
  onReject,
  oneButton = false,
  twoButton = false,
}: QuotationDetailsProps) {
  const writeTime = formatRelativeTime(data.updatedAt);
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
      <div className="mb-12 mr-[117px] w-full rounded-[16px] border border-color-line-100 px-4 pb-[12px] pt-[20px] shadow-md mobile:mx-[auto] mobile:mb-6 mobile:px-[14px] mobile:py-[16px] tablet:mx-[auto] tablet:mb-8 mobile-tablet:mr-0">
        <div className="flex flex-col">
          <Link href={`/plan-detail/${data.id}`}>
            <div className="mb-4 flex items-center justify-between text-xs text-color-gray-500">
              <div className="flex items-center gap-2">
                {waitingQuotation()}
                <Label labelType={data.tripType} />
                {specifyMaker}
              </div>
              <div className="">{writeTime}</div>
            </div>
            <div>
              <p className="text-xl semibold">{data.plan.title}</p>
              <p className="mb-[18px] border-b border-color-line-200 pb-[18px] text-md font-medium">
                {data.dreamer.nickName} 님
              </p>

              <div className="flex items-center gap-1 mobile:grid mobile:grid-cols-2 mobile:gap-[0px]">
                <div className="flex items-center gap-1 mobile:col-span-2 mobile:mb-2">
                  <p className="rounded-1 whitespace-nowrap bg-color-background-400 px-[6px] py-1 text-2lg font-normal text-color-gray-500 mobile:text-md">
                    여행일
                  </p>
                  <p className="medium text-2lg text-color-black-300 mobile:text-md">{tripDate}</p>
                </div>
                <p className="text-color-line-200 mobile:hidden">ㅣ</p>
                <div className="flex items-center gap-3">
                  <p className="rounded-1 whitespace-nowrap bg-color-background-400 px-[6px] py-1 text-2lg font-normal text-color-gray-500 mobile:text-md">
                    여행지
                  </p>
                  <p className="whitespace-nowrap text-2lg font-medium text-color-black-300 mobile:text-md">
                    {region}
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <div className="mt-8 flex items-center justify-between gap-[11px] mobile:mt-5 mobile:flex-col mobile-tablet:gap-[8px]">
            <button
              onClick={onSendQuotation}
              className={`flex w-full items-center justify-center gap-[10px] rounded-[16px] bg-color-blue-300 p-4 mobile:p-3 tablet:p-3 ${
                twoButton ? "hidden" : ""
              }`}
            >
              <p className="whitespace-nowrap text-xl semibold text-white">견적 보내기</p>
              <Image src={writing} alt="send" width={24} height={24} />
            </button>
            <button
              onClick={onReject}
              className={`w-full items-center justify-center rounded-[16px] border border-color-blue-300 bg-white p-4 text-xl semibold text-color-blue-300 mobile:p-3 tablet:p-3 ${oneButton ? "hidden" : ""} `}
            >
              반려
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
