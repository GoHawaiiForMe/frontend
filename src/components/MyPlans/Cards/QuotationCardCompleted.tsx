import Image from "next/image";
import Label from "@/components/Common/UI/Label";
import icon_like_red from "@public/assets/icon_like_red.png";
import icon_active_star from "@public/assets/icon_active_star.svg";
import link from "@public/assets/icon_link.svg";
import Link from "next/link";
import { Plan } from "@/services/planService";
import { formatToDetailedDate } from "@/utils/formatDate";
import { convertRegionToKorean } from "@/utils/formatRegion";

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

export default function QuotationCardCompleted({
  quotationDetail,
  planDetail,
}: QuotationCardProps) {
  return (
    <div className="mb-[32px] flex flex-col rounded-2xl bg-color-gray-50 px-6 py-7 shadow mobile-tablet:px-3 mobile-tablet:py-4">
      <div className="justify-left flex items-center gap-[12px] mobile-tablet:mt-[6px]">
        {quotationDetail.isConfirmed !== false && (
          <Label labelType="CONFIRMED" customLabelContainerClass="rounded-lg" />
        )}
        <Label labelType={planDetail.tripType} customLabelContainerClass="rounded-lg" />
        {quotationDetail.isAssigned !== false && (
          <Label labelType="REQUEST" customLabelContainerClass="rounded-lg" />
        )}
      </div>
      <div className="my-6 flex gap-6 rounded-md border-[1px] px-[18px] py-4 mobile-tablet:my-[14px] mobile-tablet:gap-3 mobile-tablet:px-[10px]">
        <div className="md:w-24 md:h-24 flex h-20 w-20 content-center items-center mobile:h-12 mobile:w-12">
          <Image
            src={`/assets/img_avatar${quotationDetail.maker.image.split("_")[1]}.svg`}
            alt="프로필사진"
            width={80}
            height={80}
            className="rounded-full border-2 border-color-blue-400 mobile-tablet:border-[1px]"
          />
        </div>
        <div className="flex w-full">
          <div className="w-full flex-col content-around items-center justify-between text-xs text-color-black-500">
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
          <div className="medium flex-col text-2lg text-color-blue-400 mobile-tablet:mr-[10px] mobile-tablet:text-sm">
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
            <p className="regular whitespace-nowrap rounded-[4px] bg-color-background-400 px-[6px] py-[4px] text-2lg text-color-gray-500 mobile-tablet:text-md">
              여행일
            </p>
            <p className="medium text-2lg text-color-black-300 mobile-tablet:text-md">
              {formatToDetailedDate(planDetail.tripDate)}
            </p>
          </div>
          <p className="text-color-line-200 mobile-tablet:hidden">ㅣ</p>
          <div className="flex items-center gap-3">
            <p className="whitespace-nowrap rounded-[4px] bg-color-background-400 px-[6px] py-[4px] text-2lg font-normal leading-[26px] text-color-gray-500 mobile-tablet:text-md">
              여행지
            </p>
            <p className="whitespace-nowrap text-2lg font-medium leading-[26px] text-color-black-300 mobile-tablet:text-md">
              {convertRegionToKorean(planDetail.serviceArea)}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 py-6">
          <p className="medium text-2lg mobile-tablet:text-md">견적 코코넛</p>
          <p className="bold text-2xl mobile-tablet:text-2lg">
            {quotationDetail.price.toLocaleString()}개
          </p>
        </div>
      </div>
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
  );
}
