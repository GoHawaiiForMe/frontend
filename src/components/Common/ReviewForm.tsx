import Image from "next/image";
import { useState } from "react";
import StarRating from "../Receive/StarRating";
import { Plan } from "@/services/planService";
import { formatToDetailedDate } from "@/utils/formatDate";
import reviewService from "@/services/reviewService";

interface ReviewFormProps {
  planDetail: Plan;
  closeModal: () => void;
}

export default function ReviewForm({ planDetail, closeModal }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(0); // 별점을 상태로 관리
  const [review, setReview] = useState<string>("");

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };

  async function handleSubmit() {
    try {
      await reviewService.createReview({
        makerId: planDetail.quotes?.[0].maker.id || "",
        rating,
        content: review,
        planId: planDetail.id,
      });

      alert("리뷰가 등록되었습니다!");
      closeModal();
    } catch (error) {
      console.log(`리뷰 등록에 실패 하였습니다. ${error}`);
    }
  }

  const isButtonDisabled = review.length < 10 || rating === 0;

  return (
    <div>
      <div className="mb-4">
        <div className="border-color bg-body.bg-gray my-6 flex gap-6 rounded-md border-[1px] px-[18px] py-4 mobile-tablet:my-[14px] mobile-tablet:gap-3 mobile-tablet:px-[10px]">
          <div className="flex h-20 w-20 flex-shrink-0 items-center mobile-tablet:h-[46px] mobile-tablet:w-[46px]">
            <Image
              src={`/assets/img_avatar${planDetail.quotes?.[0].maker.image.split("_")[1]}.svg`}
              alt="프로필사진"
              width={80}
              height={80}
              className="rounded-full border-2 border-color-blue-400"
            />
          </div>
          <div className="flex w-full">
            <div className="w-full flex-col items-center justify-between text-xs text-color-black-500">
              <p className="semibold text-xl mobile-tablet:text-lg">
                {planDetail.quotes?.[0].maker.nickName}
              </p>
              <div className="flex items-center gap-4 mobile-tablet:gap-1">
                <div className="medium flex flex-shrink-0 gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                  <p>여행일</p>
                  <p className="text-color-gray-400">{formatToDetailedDate(planDetail.tripDate)}</p>
                </div>
                <p className="text-color-line-200">ㅣ</p>
                <div className="medium flex flex-shrink-0 gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                  <p>플랜가</p>
                  <p className="text-color-gray-400">{planDetail.quotes?.[0].price}원</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mb-2 font-medium">평점을 선택해주세요</p>
        <StarRating initialRating={rating} onRatingChange={handleRatingChange} />
      </div>
      <div className="mb-4">
        <label className="mb-2 block font-medium">상세 후기를 작성해주세요</label>
        <textarea
          className="w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-400"
          placeholder="최소 10자 이상 입력해주세요"
          rows={4}
          value={review}
          onChange={handleReviewChange}
        ></textarea>
      </div>
      <button
        className={`w-full rounded-xl py-2 text-white ${isButtonDisabled ? "bg-gray-300" : "bg-blue-500"}`}
        disabled={isButtonDisabled}
        onClick={handleSubmit}
      >
        리뷰 등록
      </button>
    </div>
  );
}
