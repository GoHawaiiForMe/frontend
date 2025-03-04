import { PlanItem } from "@/services/requestService";
import Label from "../Common/UI/Label";
import { convertRegionToKorean } from "@/utils/formatRegion";
import { formatToDetailedDate } from "@/utils/formatDate";
import userService from "@/services/userService";
import { UserInfo } from "@/services/userService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectRequest } from "@/services/requestService";

interface RejectProps {
  data: PlanItem | undefined;
  closeModal: () => void;
}

export default function Reject({ data, closeModal }: RejectProps) {
  const queryClient = useQueryClient();
  const { data: userInfo } = useQuery<UserInfo>({
    queryKey: ["userprofile"],
    queryFn: userService.getUserInfo,
  });

  const rejectMutation = useMutation({
    mutationFn: () => rejectRequest(data!.id),
    onSuccess: (response) => {
      if (response.success) {
        alert("반려가 완료되었습니다.");
        queryClient.invalidateQueries({ queryKey: ["receiveRequest"] });
      } else {
        alert(response.message);
      }
      closeModal();
    },
  });

  if (!data) return null;

  const tripDate = formatToDetailedDate(data.tripDate);
  const region = convertRegionToKorean(data.serviceArea);

  const specifyMaker = userInfo?.id === data.assignees[0]?.id ? <Label labelType="REQUEST" /> : "";

  const handleReject = () => {
    rejectMutation.mutate();
  };

  return (
    <div>
      <div className="flex items-center gap-[12px]">
        <Label labelType={data.tripType} />
        {specifyMaker}
      </div>
      <div className="mb-[32px] mt-[24px] w-[560px] rounded-[8px] border border-color-line-200 py-[24px] mobile:mt-[24px] mobile:w-[327px] mobile:border-none mobile:py-[10px] tablet:mt-[24px] tablet:w-[327px] tablet:border-none tablet:py-[10px]">
        <p className="semibold mb-[8px] px-[18px] text-2xl mobile:px-0 mobile:text-2lg tablet:pl-0 tablet:text-2lg">
          {data.title}
        </p>
        <p className="mb-[18px] border-b border-color-line-200 pb-[18px] pl-[18px] text-md font-medium text-color-gray-500 mobile:px-0 mobile:text-sm tablet:pl-0 tablet:text-sm">
          {data.dreamer.nickName} 고객님
        </p>
        <div className="grid grid-cols-2 gap-[0px]">
          <div className="col-span-2 mb-2 flex items-center gap-[4px] pl-[18px] mobile:pl-0 mobile:text-sm tablet:gap-[8px] tablet:pl-0">
            <p className="whitespace-nowrap rounded-[4px] bg-color-background-400 px-[6px] py-[4px] text-[18px] font-normal leading-[26px] text-color-gray-500 mobile:text-md tablet:text-md">
              이사일
            </p>
            <p className="medium text-[18px] leading-[26px] text-color-black-300 mobile:text-md tablet:text-md">
              {tripDate}
            </p>
          </div>
          <div className="mobile-tablet:gap2 flex items-center gap-[12px] pl-[14px] mobile-tablet:pl-0">
            <p className="whitespace-nowrap rounded-[4px] bg-color-background-400 px-[6px] py-1 text-2lg text-color-gray-500 mobile:text-md tablet:text-md">
              여행지
            </p>
            <p className="whitespace-nowrap text-2lg font-medium text-color-black-300 mobile:text-md tablet:text-md">
              {region}
            </p>
          </div>
        </div>
      </div>
      <button
        className={`semibold h-[64px] w-[560px] rounded-[16px] bg-color-blue-300 text-[20px] leading-[32px] text-white mobile:h-[48px] mobile:w-[327px] mobile:text-lg tablet:h-[54px] tablet:w-[327px] tablet:text-lg`}
        onClick={handleReject}
        disabled={rejectMutation.isPending}
      >
        {rejectMutation.isPending ? "반려 중..." : "반려 하기"}
      </button>
    </div>
  );
}
