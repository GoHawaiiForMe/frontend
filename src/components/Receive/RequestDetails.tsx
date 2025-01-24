import Image from "next/image";
import writing from "@public/assets/icon_writing.png";
import Label from "../Common/label";
import { useQuery } from "@tanstack/react-query";
import userService, { UserInfo } from "@/services/userService";
import { formatRelativeTime, formatToDetailedDate } from "@/utils/formatDate";
import { convertRegionToKorean } from "@/utils/formatRegion";

interface RequestDetailsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  onSendQuotation: () => void;
  onReject: () => void;
}

export default function RequestDetails({ data, onSendQuotation, onReject }: RequestDetailsProps) {
  const { data: userInfo } = useQuery<UserInfo>({
    queryKey: ["userprofile"],
    queryFn: userService.getUserInfo,
  });

  const writeTime = formatRelativeTime(data.updatedAt);
  const tripDate = formatToDetailedDate(data.tripDate);
  const region = convertRegionToKorean(data.serviceArea);

  const specifyMaker = userInfo?.id === data.assignees[0]?.id ? <Label type="REQUEST" /> : "";

  return (
    <div className="mb-12 w-[955px] rounded-[16px] border border-color-line-100 px-4 pb-[12px] pt-[20px] shadow-md mobile:mx-[auto] mobile:mb-6 mobile:w-[328px] mobile:px-[14px] mobile:py-[16px] tablet:mx-[auto] tablet:mb-8 tablet:w-[600px]">
      <div className="flex flex-col">
        <div className="mb-4 flex items-center justify-between text-xs text-color-gray-500">
          <div className="flex items-center gap-2">
            <Label type={data.tripType} />
            {specifyMaker}
            {/* <Label type={data.status === "PENDING" ? "PENDING" : "CONFIRMED"} /> */}
          </div>

          <div className="">{writeTime}</div>
        </div>
        <div>
          <p className="text-xl font-semibold">{data.title}</p>
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
        <div className="mt-8 flex items-center justify-between gap-[11px] mobile:mt-5 mobile:flex-col mobile:justify-normal mobile-tablet:gap-[8px]">
          <button
            onClick={onSendQuotation}
            className="flex h-[64px] w-[448px] items-center justify-center gap-[10px] rounded-[16px] bg-color-blue-300 mobile:h-[48px] mobile:w-[300px] tablet:h-[48px] tablet:w-[280px]"
          >
            <p className="whitespace-nowrap text-xl font-semibold text-white">견적 보내기</p>
            <Image src={writing} alt="send" width={24} height={24} />
          </button>
          <button
            onClick={onReject}
            className="h-[64px] w-[448px] rounded-[16px] border border-color-blue-300 bg-white text-xl font-semibold text-color-blue-300 mobile:h-[48px] mobile:w-[300px] tablet:h-[48px] tablet:w-[280px]"
          >
            반려
          </button>
        </div>
      </div>
    </div>
  );
}
