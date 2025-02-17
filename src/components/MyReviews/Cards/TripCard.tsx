import Image from "next/image";
import loading from "@public/assets/icon_loading.gif";
import Label from "@/components/Common/Label";
import ReceiveModalLayout from "@/components/Receive/ReceiveModalLayout";
import ReviewForm from "@/components/Common/ReviewForm";
import { formatToDetailedDate } from "@/utils/formatDate";
import { useRouter } from "next/router";
import { useState } from "react";
import CompleteTrip from "@/components/Common/CompleteTrip";
import { Plan } from "@/services/planService";

interface TripCardProps {
  planDetail: Plan;
}

export default function TripCard({ planDetail }: TripCardProps) {
  const router = useRouter();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState<boolean>(false);

  const isCompletedTrip = router.asPath.includes("completed-trip");
  const isReviewableTrip = router.asPath.includes("reviewable-trip");

  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);

  const openCompleteModal = () => setIsCompleteModalOpen(true);
  const closeCompleteModal = () => setIsCompleteModalOpen(false);

  if (!planDetail) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Image src={loading} alt="로딩 중" />
      </div>
    );
  }

  return (
    <div className="mb-[32px] flex flex-col rounded-2xl bg-color-gray-50 px-6 py-7 mobile-tablet:px-3 mobile-tablet:py-4">
      <div className="justify-left flex items-center gap-[12px] mobile-tablet:mt-[6px]">
        <Label labelType="SHOPPING" customLabelContainerClass="rounded-lg" />
      </div>
      <div className="border-color bg-body.bg-gray my-6 flex gap-6 rounded-md border-[1px] px-[18px] py-4 mobile-tablet:my-[14px] mobile-tablet:gap-3 mobile-tablet:px-[10px]">
        <div className="flex h-20 w-20 flex-shrink-0 items-center mobile-tablet:h-[46px] mobile-tablet:w-[46px]">
          <Image
            src={`/assets/img_avatar${planDetail.quotes?.[0]?.maker.image.split("_")[1]}.svg`}
            alt="프로필사진"
            width={80}
            height={80}
            className="rounded-full border-2 border-color-blue-400"
          />
        </div>
        <div className="flex w-full">
          <div className="w-full flex-col items-center justify-between text-xs text-color-black-500">
            <p className="semibold text-xl mobile-tablet:text-lg">
              {planDetail ? planDetail.quotes?.[0]?.maker.nickName : "-"}
            </p>
            <div className="flex items-center gap-2 mobile-tablet:gap-1">
              <div className="medium flex flex-shrink-0 gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                <p>여행일</p>
                <p className="text-color-gray-400">
                  {planDetail ? formatToDetailedDate(planDetail.tripDate) : "-"}
                </p>
              </div>
              <p className="text-color-line-200">ㅣ</p>
              <div className="medium flex flex-shrink-0 gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                <p>플랜가</p>
                <p className="text-color-gray-400">
                  {planDetail ? planDetail.quotes?.[0]?.price : "-"}원
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-[11px] mobile:flex-col">
        {isCompletedTrip && (
          <button
            className="semibold w-full text-nowrap rounded-lg bg-color-blue-300 px-[32.5px] py-4 text-xl text-gray-50 mobile:text-md tablet:text-lg mobile-tablet:px-[16px] mobile-tablet:py-[11px]"
            onClick={openCompleteModal}
          >
            여행 완료하기
          </button>
        )}
        {isReviewableTrip && (
          <button
            className="semibold w-full text-nowrap rounded-lg bg-color-blue-300 px-[32.5px] py-4 text-xl text-gray-50 mobile:text-md tablet:text-lg mobile-tablet:px-[16px] mobile-tablet:py-[11px]"
            onClick={openReviewModal}
          >
            리뷰 작성하기
          </button>
        )}
      </div>
      {isCompleteModalOpen && (
        <ReceiveModalLayout label="여행 완료" closeModal={closeCompleteModal}>
          <CompleteTrip />
        </ReceiveModalLayout>
      )}
      {isReviewModalOpen && (
        <ReceiveModalLayout label="리뷰 작성" closeModal={closeReviewModal}>
          <ReviewForm planDetail={planDetail} closeModal={closeReviewModal} />
        </ReceiveModalLayout>
      )}
    </div>
  );
}
