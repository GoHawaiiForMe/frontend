import Image from "next/image";
import iconBox from "@public/assets/icon_boximg.png";
import iconDocument from "@public/assets/icon_document.png";
import icon_like_red from "@public/assets/icon_like_red.png";
import icon_like_black from "@public/assets/icon_like_black.svg";
import img_avatar1 from "@public/assets/img_avatar1.svg";
import icon_active_star from "@public/assets/icon_active_star.svg";
import icon_outline from "@public/assets/icon_outline.png";
import icon_kakao from "@public/assets/icon_kakao.png";
import icon_facebook from "@public/assets/icon_facebook.png";
import PlanCard from "@/components/MyPlans/Cards/PlanCard";

export default function requestDetail_dreamer() {
  const planData = {
    selectedPlanId: 2, // 기본으로 선택된 플랜의 ID
    plans: [
      {
        id: 1,
        name: "플랜이름몇자까지되나요",
        requestDate: "2025-01-01",
        tripType: "휴양지",
        serviceArea: "서울",
        tripPeriod: "2025-01-10 ~ 2025-01-15", // 여행 시작일 ~ 여행 종료일
        details: "특별 요청 사항 없음",
      },
      {
        id: 2,
        name: "플랜이름더더더더더더더길어져도되나요",
        requestDate: "2025-02-01",
        tripType: "액티비티",
        serviceArea: "부산",
        tripPeriod: "2025-02-10 ~ 2025-02-17", // 여행 시작일 ~ 여행 종료일
        details: "특별 요청 없음",
      },
      {
        id: 3,
        name: "안신나는 제주도 출장",
        requestDate: "2025-03-01",
        tripType: "비즈니스",
        serviceArea: "제주도",
        tripPeriod: "2025-03-05 ~ 2025-03-07", // 여행 시작일 ~ 여행 종료일
        details: "업무 일정 조정 필요",
      },
      {
        id: 4,
        name: "경주에도 바닷가가 있나요?",
        requestDate: "2025-04-01",
        tripType: "휴양지",
        serviceArea: "경주",
        tripPeriod: "2025-04-05 ~ 2025-04-10", // 여행 시작일 ~ 여행 종료일
        details: "해변 근처 숙소",
      },
      {
        id: 5,
        name: "경주에도 바닷가가 있나요?2",
        requestDate: "2025-05-01",
        tripType: "휴양지",
        serviceArea: "경주",
        tripPeriod: "2025-04-05 ~ 2025-04-10", // 여행 시작일 ~ 여행 종료일
        details: "해변 근처 숙소",
      },
      {
        id: 6,
        name: "드롭다운 스크롤 테스트",
        requestDate: "2025-06-01",
        tripType: "관광지",
        serviceArea: "전주",
        tripPeriod: "2025-07-05 ~ 2025-07-10", // 여행 시작일 ~ 여행 종료일
        details: "비빔밥 맛집을 들러주세요",
      },
    ],
  };

  // PlanCard 컴포넌트에 전달할 데이터
  const { selectedPlanId, plans } = planData;

  // 선택된 플랜을 찾는 함수
  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

  return (
    <div className="flex flex-col w-full relative">
      <div className="flex py-8 text-color-black-400 text-2xl semibold center">견적 상세</div>
      <div className="flex gap-24 mobile-tablet:flex-col">
        <div className="flex flex-col flex-grow">
          <div className="flex">
            <div className="flex flex-col w-full bg-color-gray-50 py-7 px-6 rounded-2xl mobile-tablet:px-3 mobile-tablet:py-4">
              <div className="flex justify-left items-center gap-[12px] mobile-tablet:mt-[6px]">
                <div className="flex items-center gap-[4px] bg-color-blue-100 rounded-[4px] p-[4px]">
                  <Image
                    src={iconBox}
                    alt="box"
                    width={24}
                    height={24}
                    className="w-[20px] h-[20px]"
                  />
                  <p className="text-2lg semibold text-color-blue-300 mobile:text-sm">소형 이사</p>
                </div>
                <div className="flex items-center gap-[4px] bg-color-red-100 rounded-[4px] p-[4px]">
                  <Image
                    src={iconDocument}
                    alt="document"
                    width={24}
                    height={24}
                    className="w-[20px] h-[20px]"
                  />
                  <p className="text-2lg semibold text-color-red-200 mobile:text-sm">
                    지정 견적 요청
                  </p>
                </div>
              </div>
              <div className="flex my-6 gap-6 border-color border-[1px] bg-body.bg-gray rounded-md py-4 px-[18px] mobile-tablet:gap-3 mobile-tablet:px-[10px] mobile-tablet:my-[14px]">
                <div className="flex items-center w-20 h-20 mobile-tablet:w-[46px] mobile-tablet:h-[46px]">
                  <Image
                    src={img_avatar1}
                    alt="프로필사진"
                    width={80}
                    height={80}
                    className="border-2 border-color-blue-400 rounded-full"
                  />
                </div>
                <div className="flex w-full">
                  <div className="w-full flex-col justify-between items-center text-xs text-color-black-500">
                    <p className="text-xl semibold mobile-tablet:text-lg">김코드 Maker</p>
                    <div className="flex items-center">
                      <div className="flex flex-shrink-0 gap-[6px] items-center text-lg medium mobile-tablet:text-sm mobile-tablet:gap-[5px]">
                        <Image
                          src={icon_active_star}
                          alt="별점"
                          className="color-red-200 w-6 h-6 mobile-tablet:w-[14px] mobile-tablet:h-[14px]"
                        />
                        <p>55</p>
                        <p className="text-color-gray-400">(178)</p>
                      </div>
                      <p className="text-color-line-200 mx-4 mobile-tablet:mx-1">ㅣ</p>
                      <div className="flex flex-shrink-0 gap-[6px] text-lg medium mobile-tablet:text-sm mobile-tablet:gap-[5px]">
                        <p className="text-color-gray-400">경력</p>
                        <p>7년</p>
                      </div>
                      <p className="text-color-line-200 mx-4 mobile-tablet:mx-1">ㅣ</p>
                      <div className="flex flex-shrink-0 gap-[6px] text-lg medium mobile-tablet:text-sm mobile-tablet:gap-[5px]">
                        <p>334건</p>
                        <p className="text-color-gray-400">확정</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex text-color-blue-400 medium text-2lg mobile-tablet:text-sm">
                    <Image
                      src={icon_like_red}
                      alt="좋아요"
                      width={24}
                      height={24}
                      className="color-red-200 w-[24px] h-[24px] "
                    />
                    136
                  </div>
                </div>
              </div>

              <div>
                <p className="text-black-300 text-2xl semibold mobile-tablet:text-lg">
                  고객님의 꿈을 행복하게 이루어 드립니다.
                </p>
              </div>
            </div>
          </div>
          <hr className="border-Line-100 my-10" />
          <div className="flex flex-col gap-8 mobile-tablet:gap-4">
            <p className="text-2xl semibold text-color-black-400 mobile-tablet:text-lg">견적가</p>
            <p className="text-3xl bold text-color-black-400 mobile-tablet:text-xl">180,000원</p>
          </div>
          <hr className="border-Line-100 my-10" />
          <div className="flex flex-col gap-[22px] pc:hidden">
            <p className="text-xl semibold text-black-400">플랜 공유하기</p>
            <div className="flex gap-4">
              <Image src={icon_outline} alt="링크복사" width={40} height={40} />
              <Image src={icon_kakao} alt="카카오톡 공유" width={40} height={40} />
              <Image src={icon_facebook} alt="페이스북 공유" width={40} height={40} />
            </div>
          </div>
          <hr className="border-Line-100 my-10 pc:hidden" />
          <div>
            <p className="text-2xl semibold text-color-black-400">플랜 정보</p>
            <PlanCard planData={{ selectedPlanId, plans }} />
          </div>
        </div>
        <div className="flex flex-col mobile-tablet:w-full mobile-tablet:relative mobile-tablet:flex-grow">
          <div className="flex mobile-tablet:flex-grow w-full mobile-tablet:py-[10px] mobile-tablet:gap-2 mobile-tablet:fixed mobile-tablet:bg-color-gray-50 mobile-tablet:bottom-0">
            <button className="flex flex-shrink-0 p-2 border-[1px] bg-body.bg-gray rounded-2xl pc:hidden">
              <Image src={icon_like_black} alt="좋아요" width={32} height={32} />
            </button>
            <button className="flex w-full py-4 justify-center items-center bg-color-blue-300 text-gray-50 semibold rounded-2xl text-xl tablet:text-lg mobile:text-md mobile-tablet:py-[11px] mobile-tablet:px-[16px] mobile-tablet:w-full mobile-tablet:max-w-full">
              견적 확정하기
            </button>
          </div>
          <hr className="border-Line-100 my-10 mobile-tablet:hidden" />
          <div className="flex flex-col gap-[22px] mobile-tablet:hidden">
            <p className="text-xl semibold text-black-400">플랜 공유하기</p>
            <div className="flex gap-4">
              <Image src={icon_outline} alt="링크복사" width={64} height={64} />
              <Image src={icon_kakao} alt="카카오톡 공유" width={64} height={64} />
              <Image src={icon_facebook} alt="페이스북 공유" width={64} height={64} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
