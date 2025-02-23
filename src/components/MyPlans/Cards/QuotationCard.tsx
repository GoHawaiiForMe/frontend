import Image from "next/image";
import Label from "@/components/Common/Label";
import icon_like_red from "@public/assets/icon_like_red.png";
import icon_active_star from "@public/assets/icon_active_star.svg";
import link from "@public/assets/icon_link.svg";
import Link from "next/link";
import { Plan } from "@/services/planService";
import { formatToDetailedDate } from "@/utils/formatDate";
import { QuotationServiceDreamer } from "@/services/quotationServiceDreamer";
import { convertRegionToKorean } from "@/utils/formatRegion";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ModalLayout from "@/components/Common/ModalLayout";

interface MakerInfo {
  nickName: string;
  image: string;
  gallery: string;
  serviceTypes: string[];
  isFollowed: boolean;
  averageRating: number;
  totalReviews: number;
  totalFollows: number;
  totalConfirms: number;
}
interface QuotationDetail {
  id: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  content: string;
  maker: MakerInfo;
  isConfirmed: false;
  isAssigned: false;
}

interface QuotationCardProps {
  planDetail: Plan;
  quotationDetail: QuotationDetail;
}

export default function QuotationCard({ quotationDetail, planDetail }: QuotationCardProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coconut, setCoconut] = useState(0);

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      try {
        const parsedData = JSON.parse(authData);
        setCoconut(parsedData.state?.coconut ?? 0);
      } catch (error) {
        console.error("로컬스토리지 데이터 파싱 오류:", error);
      }
    }
  }, []);

  async function handleConfirmButton() {
    try {
      await QuotationServiceDreamer.confirmQuotation({ isConfirmed: true }, quotationDetail.id);
      alert("견적이 확정되었습니다.");
      window.location.reload();
      router.push(`/mytrip-manage/ongoing-plan/detail/${planDetail.id}`);
    } catch (error: any) {
      if (error.status === 400) {
        setIsModalOpen(true);
      } else {
        alert(`견적 확정에 실패했습니다. 다시 시도해주세요. ${error.message}`);
      }
    }
  }

  return (
    <div>
      {isModalOpen && (
        <ModalLayout label="보유 코코넛이 부족합니다!" closeModal={() => setIsModalOpen(false)}>
          <div className="m-4 flex flex-col items-center gap-4">
            <div className="semibold flex-col gap-2 text-xl">
              <div className="flex justify-center gap-2">
                <p>보유 코코넛 :</p> <p className="medium text-color-red-200">{coconut}</p>{" "}
                <p>개</p>
              </div>
              <div className="flex justify-center gap-2">
                <p>필요 코코넛 :</p>
                <p className="medium text-color-red-200">
                  {quotationDetail.price.toLocaleString()}
                </p>
                <p>개</p>
              </div>
            </div>
          </div>
        </ModalLayout>
      )}

      <div className="mb-[32px] flex w-full flex-col rounded-2xl bg-color-gray-50 px-6 py-7 shadow mobile-tablet:px-3 mobile-tablet:py-4">
        <div className="justify-left flex items-center gap-[12px] mobile-tablet:mt-[6px]">
          {quotationDetail.isConfirmed !== false && (
            <Label labelType="CONFIRMED" customLabelContainerClass="rounded-lg" />
          )}
          <Label labelType={planDetail.tripType} customLabelContainerClass="rounded-lg" />
          {quotationDetail.isAssigned !== false && (
            <Label labelType="REQUEST" customLabelContainerClass="rounded-lg" />
          )}
        </div>
        <div className="border-color bg-body.bg-gray my-6 flex max-w-full gap-6 rounded-md border-[1px] px-[18px] py-4 mobile-tablet:my-[14px] mobile-tablet:gap-3 mobile-tablet:px-[10px]">
          <div className="flex h-20 w-20 flex-shrink-0 items-center mobile-tablet:h-[46px] mobile-tablet:w-[46px]">
            <Image
              src={`/assets/img_avatar${quotationDetail.maker.image.split("_")[1]}.svg`}
              alt="프로필사진"
              width={80}
              height={80}
              className="rounded-full border-2 border-color-blue-400"
            />
          </div>
          <div className="flex w-full">
            <div className="w-full flex-col items-center justify-between text-xs text-color-black-500">
              <p className="semibold text-xl mobile-tablet:text-lg">
                {quotationDetail.maker.nickName}
              </p>
              <div className="flex content-center items-center gap-3 mobile-tablet:gap-1">
                <div className="medium flex flex-shrink-0 items-center gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                  <Image
                    src={icon_active_star}
                    alt="별점"
                    className="color-red-200 h-6 w-6 mobile-tablet:h-[14px] mobile-tablet:w-[14px]"
                  />
                  <p>{quotationDetail.maker.averageRating}</p>
                  <p className="text-color-gray-400">({quotationDetail.maker.totalReviews})</p>
                </div>
                <p className="text-color-line-200">ㅣ</p>
                <div className="medium flex flex-shrink-0 items-center gap-[6px] object-center text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                  <Link
                    href={quotationDetail.maker.gallery}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <div className="flex mobile-tablet:h-[14px] mobile-tablet:w-[14px]">
                      <Image src={link} alt="링크이미지" width={25} height={25} />
                    </div>
                    <p className="content-center text-color-gray-400">SNS</p>
                  </Link>
                </div>
                <p className="text-color-line-200">ㅣ</p>
                <div className="medium flex flex-shrink-0 gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                  <p>{quotationDetail.maker.totalConfirms}건</p>
                  <p className="text-color-gray-400">확정</p>
                </div>
              </div>
            </div>
            <div className="medium flex-col text-2lg text-color-blue-400 mobile-tablet:text-sm">
              <div className="flex items-center">
                <Image
                  src={icon_like_red}
                  alt="좋아요"
                  width={24}
                  height={24}
                  className="color-red-200 h-[24px] w-[24px]"
                />
                <p>{quotationDetail.maker.totalFollows}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-[12px] mobile-tablet:grid mobile-tablet:grid-cols-3 mobile-tablet:gap-0">
            <div className="flex items-center gap-3 mobile-tablet:col-span-3 mobile-tablet:mb-3">
              <p className="medium whitespace-nowrap rounded-[4px] bg-color-background-400 px-[6px] py-[4px] text-2lg text-color-gray-500 mobile-tablet:text-md">
                여행일
              </p>
              <p className="medium whitespace-nowrap text-2lg text-color-black-300 mobile-tablet:text-md">
                {formatToDetailedDate(planDetail.tripDate)}
              </p>
            </div>
            <p className="text-color-line-200 mobile-tablet:hidden">ㅣ</p>
            <div className="flex items-center gap-3">
              <p className="medium whitespace-nowrap rounded-[4px] bg-color-background-400 px-[6px] py-[4px] text-2lg leading-[26px] text-color-gray-500 mobile-tablet:text-md">
                여행지
              </p>
              <p className="medium whitespace-nowrap text-2lg leading-[26px] text-color-black-300 mobile-tablet:text-md">
                {convertRegionToKorean(planDetail.serviceArea)}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-4 py-6">
            <p className="medium text-2lg mobile-tablet:text-md">견적 코코넛</p>
            <p className="bold text-2xl mobile-tablet:text-2lg">
              {quotationDetail.price.toLocaleString()} 개
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-[11px] mobile:flex-col">
          {planDetail.status !== "CONFIRMED" && (
            <button
              className="semibold w-full text-nowrap rounded-lg bg-color-blue-300 px-[32.5px] py-4 text-xl text-gray-50 mobile:text-md tablet:text-lg mobile-tablet:px-[16px] mobile-tablet:py-[11px]"
              onClick={handleConfirmButton}
            >
              견적 확정하기
            </button>
          )}
          <Link
            href={{
              pathname: `/mytrip-manage/quotationdetail-dreamer/${planDetail.id}`,
              query: { quotationId: quotationDetail.id },
            }}
            className="semibold w-full rounded-lg border-[1px] border-solid border-color-blue-300 object-center px-[32.5px] py-4 mobile-tablet:px-[16px] mobile-tablet:py-[11px]"
          >
            <button className="w-full text-nowrap text-xl text-color-blue-300 mobile:text-md tablet:text-lg">
              상세보기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
