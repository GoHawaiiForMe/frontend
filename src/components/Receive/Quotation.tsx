import { useState } from "react";
import Label from "../Common/Label";
import { PlanItem } from "@/services/requestService";
import { UserInfo } from "@/services/userService";
import userService from "@/services/userService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatToDetailedDate } from "@/utils/formatDate";
import { convertRegionToKorean } from "@/utils/formatRegion";
import { submitQuote } from "@/services/requestService";

interface QuotationProps {
  data: PlanItem | undefined; // 선택된 하나의 아이템만 받도록 수정
  closeModal: () => void; // closeModal prop 추가
}

export default function Quotation({ data, closeModal }: QuotationProps) {
  const [price, setPrice] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: userInfo } = useQuery<UserInfo>({
    queryKey: ["userprofile"],
    queryFn: userService.getUserInfo,
  });

  const quoteMutation = useMutation({
    mutationFn: () => submitQuote(data!.id, { price, content: comment }),
    onSuccess: (response) => {
      if (response.success) {
        alert(response.message);
        setPrice(0);
        setComment("");
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
  const isButtonEnabled = price !== 0 && comment.length >= 10;

  const handleSubmit = () => {
    if (!isButtonEnabled) return;
    quoteMutation.mutate();
  };

  return (
    <>
      <div>
        <div className="flex items-center gap-[12px]">
          <Label labelType={data.tripType} />
          {specifyMaker}
        </div>
        <div className="mb-[32px] mt-[24px] w-[560px] rounded-[8px] border border-color-line-200 py-[24px] mobile:mt-[24px] mobile:w-[327px] mobile:border-none mobile:py-[10px] tablet:mt-[24px] tablet:w-[327px] tablet:border-none tablet:py-[10px]">
          <p className="mb-[8px] px-[18px] text-2xl font-semibold mobile:px-0 mobile:text-2lg tablet:pl-0 tablet:text-2lg">
            {data.title}
          </p>
          <p className="mb-[18px] border-b border-color-line-200 pb-[18px] pl-[18px] text-md font-medium text-color-gray-500 mobile:px-0 mobile:text-sm tablet:pl-0 tablet:text-sm">
            {data.dreamer?.nickName} 고객님
          </p>
          <div className="grid grid-cols-2 gap-[0px]">
            <div className="col-span-2 mb-2 flex items-center gap-1 pl-[18px] mobile:pl-0 mobile:text-sm tablet:gap-[8px] tablet:pl-0">
              <p className="whitespace-nowrap rounded-[4px] bg-color-background-400 px-[6px] py-1 text-2lg text-color-gray-500 mobile:text-md tablet:text-md">
                여행일
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
      </div>
      <div className="mb-[64px] mobile:mb-[40px] tablet:mb-[40px]">
        <p className="text-2xl font-semibold">견적가를 입력해 주세요</p>
        <input
          type="number"
          placeholder="견적가 입력"
          value={price || ""}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="mt-[16px] h-[64x] w-[560px] rounded-[16px] bg-color-background-200 p-[14px] text-xl mobile:h-[48px] mobile:w-[327px] mobile:text-lg tablet:h-[54px] tablet:w-[327px] tablet:text-lg"
        />
      </div>
      <div className="mb-[40px] mobile:mb-[24px] tablet:mb-[24px]">
        <p className="text-2xl font-semibold mobile:text-2lg tablet:text-2lg">
          코멘트를 입력해 주세요
        </p>
        <textarea
          placeholder="최소 10글자 이상 입력해 주세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-[16px] h-[160px] w-[560px] resize-none rounded-[16px] bg-color-background-200 p-[14px] text-xl mobile:h-[160px] mobile:w-[327px] mobile:text-lg tablet:h-[160px] tablet:w-[327px] tablet:text-lg"
        />
      </div>
      <button
        className={`h-[64px] w-[560px] rounded-[16px] text-[20px] font-semibold leading-[32px] text-white ${
          isButtonEnabled ? "bg-color-blue-300" : "cursor-not-allowed bg-color-gray-100"
        } mobile:h-[48px] mobile:w-[327px] mobile:text-lg tablet:h-[54px] tablet:w-[327px] tablet:text-lg`}
        disabled={!isButtonEnabled || quoteMutation.isPending}
        onClick={handleSubmit}
      >
        {quoteMutation.isPending ? "보내는 중..." : "견적 보내기"}
      </button>
    </>
  );
}
