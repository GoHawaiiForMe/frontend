"use client";

import Image from "next/image";
import icon_like_red from "@public/assets/icon_like_red.png";
import icon_like_black from "@public/assets/icon_like_black.svg";
import img_avatar1 from "@public/assets/img_avatar1.svg";
import icon_active_star from "@public/assets/icon_active_star.svg";
import icon_outline from "@public/assets/icon_outline.png";
import icon_kakao from "@public/assets/icon_kakao.png";
import icon_facebook from "@public/assets/icon_facebook.png";
import PlanCard from "@/components/MyPlans/Cards/PlanCard";
import { useEffect } from "react";
import ClipboardCopy from "@/components/Common/ClipboardCopy";
import Label from "@/components/Common/label";
import planData from "@/types/planData";
import Selector from "@/components/Common/Selector";
import icon_link from "@public/assets/icon_link.svg";

export default function RequestDetailDreamer() {
  /*eslint-disable*/
  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao) {
      const Kakao = window.Kakao;
      Kakao.init("0337a68dec8e9d5ebea78113c3b9fc62");
    }
  }, []);
  //init괄호 안에는 카카오디벨로퍼스에서 받은 javascript키 입력

  const shareMessage = () => {
    if (typeof window !== "undefined" && window.Kakao) {
      const Kakao = window.Kakao;
      Kakao.Share.sendScrap({
        requestUrl: "http://localhost:3000",
      });
    }
  };
  //requestUrl부분에 사용할 도메인 입력(현재 테스트중으로 로컬도메인)

  const btnShareFb = () => {
    const pageUrl = "http://localhost:3000";
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${pageUrl}`);
  };

  const filteredServices = planData.services.filter((service) =>
    ["맛집 탐방형", "휴양형"].includes(service.name),
  );

  const filteredLocations = planData.locations.filter((location) =>
    ["전북", "경기"].includes(location.name),
  );

  return (
    <div className="relative mt-20 grid grid-cols-7 gap-16 mobile-tablet:flex mobile-tablet:flex-col">
      {/* 왼쪽 열 */}

      <div className="col-span-5 flex flex-col">
        {/* 카드 */}
        <div className="flex h-72 gap-4 rounded-2xl border border-color-line-100 bg-color-gray-50 px-6 py-7 mobile-tablet:h-[200px] mobile-tablet:px-3 mobile-tablet:py-4">
          <div>
            <div className="mobile-tablet:mt-[6px]">
              <div className="flex gap-4">
                <Label type="SHOPPING" />
                <Label type="CONFIRMED" />
              </div>
            </div>
            <div>
              <p className="text-black-300 semibold text-2xl mobile-tablet:text-lg">
                고객님의 꿈을 행복하게 이루어 드립니다.
              </p>
            </div>
            <div className="border-color my-6 flex gap-6 rounded-md border-[1px] px-[18px] py-4 mobile-tablet:my-[14px] mobile-tablet:gap-3 mobile-tablet:px-[10px]">
              <div className="flex mobile-tablet:h-[46px] mobile-tablet:w-[46px]">
                <Image
                  src={img_avatar1}
                  alt="프로필사진"
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-color-blue-400"
                />
              </div>

              <div className="flex w-full flex-col text-xs text-color-black-500">
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <p className="semibold text-xl mobile-tablet:text-lg">김코드 Maker</p>
                  </div>
                  <div className="medium flex text-2lg text-color-blue-400 mobile-tablet:text-sm">
                    <Image
                      src={icon_like_red}
                      alt="좋아요"
                      width={24}
                      height={24}
                      className="color-red-200 h-6 w-6"
                    />
                    136
                  </div>
                </div>
                <div className="flex w-full items-center justify-start">
                  <div className="medium flex items-center gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                    <Image
                      src={icon_active_star}
                      alt="별점"
                      className="color-red-200 h-6 w-6 mobile-tablet:h-[14px] mobile-tablet:w-[14px]"
                    />
                    <p>55</p>
                    <p className="text-color-gray-400">(178)</p>
                  </div>
                  <p className="mx-4 text-color-line-200 mobile-tablet:mx-1">ㅣ</p>
                  <div className="medium flex flex-shrink-0 gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                    <p className="text-color-gray-400">경력</p>
                    <Image src={icon_link} alt="링크 이미지" width={30} height={30} />
                  </div>
                  <p className="mx-4 text-color-line-200 mobile-tablet:mx-1">ㅣ</p>
                  <div className="medium flex flex-shrink-0 gap-[6px] text-lg mobile-tablet:gap-[5px] mobile-tablet:text-sm">
                    <p>334건</p>
                    <p className="text-color-gray-400">확정</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-20">
          <hr className="border-color-line-100 pc:hidden" />
          <div className="flex flex-col gap-[22px] pc:hidden">
            <p className="semibold text-black-400 text-xl">나만 알기엔 아쉬운 기사님인가요?</p>
            <div className="flex gap-4">
              <div className="my-6 h-10 w-10">
                <ClipboardCopy icon={icon_outline} /> {/*링크 복사 버튼*/}
              </div>
              <button onClick={shareMessage}>
                <Image src={icon_kakao} alt="카카오톡 공유" width={40} height={40} />
              </button>
              <button onClick={btnShareFb}>
                <Image src={icon_facebook} alt="페이스북 공유" width={40} height={40} />
              </button>
            </div>
          </div>
          {/* maekr 정보 */}
          <div>
            <p className="bold mb-8 text-2xl text-color-black-400 mobile-tablet:text-lg">
              상세설명
            </p>
            <p className="regular text-2lg text-color-black-400 mobile-tablet:text-md">
              {" "}
              안녕하세요. 니가가라하와이 업계 경력 7년으로 행복한 여행을 도와드리는 김코드입니다.
              고객님의 꿈을 소중하고 행복하게 이루어 드립니다. 기념품형 및 액티비티형 서비스를
              제공하며 서비스 가능 지역은 서울과 경기입니다.
            </p>
          </div>
          <div>
            <p className="bold mb-8 text-2xl text-color-black-400 mobile-tablet:text-lg">
              제공 서비스
            </p>
            <Selector
              category="services"
              selectedTypes={["FOOD_TOUR", "RELAXATION"]}
              data={filteredServices}
              className="flex gap-4"
              itemClassName="!border-color-blue-300 bg-color-blue-50 text-color-blue-300"
            />
          </div>
          <div>
            <p className="bold mb-8 text-2xl text-color-black-400 mobile-tablet:text-lg">
              서비스 가능 지역
            </p>
            <Selector
              category="locations"
              selectedTypes={["GYEONGGI", "JEONBUK"]}
              data={filteredLocations}
              className="flex gap-4"
            />
          </div>

          {/* 리뷰폼 */}
          <div></div>
        </div>
      </div>

      {/* 오른쪽 열 */}
      <div className="col-span-2 flex">
        <div className="flex flex-col flex-nowrap gap-7 mobile-tablet:relative mobile-tablet:w-full mobile-tablet:flex-grow">
          <p className="semibold text-xl mobile-tablet:hidden">
            nickname Maker에게 지정 플랜을 요청해보세요!
          </p>
          <button className="semibold flex w-[354px] justify-center rounded-2xl border-[1px] p-2 py-4 text-xl mobile:text-md tablet:text-lg mobile-tablet:hidden mobile-tablet:px-4 mobile-tablet:py-[11px]">
            <Image src={icon_like_black} alt="좋아요" width={32} height={32} />
            <p> Maker 찜하기</p>
          </button>
          <div className="flex w-full mobile:px-6 tablet:px-[72px] mobile-tablet:fixed mobile-tablet:inset-x-0 mobile-tablet:bottom-0 mobile-tablet:flex-grow mobile-tablet:gap-2 mobile-tablet:bg-color-gray-50 mobile-tablet:py-[10px]">
            <button className="flex rounded-2xl border-[1px] p-2 pc:hidden">
              <Image src={icon_like_black} alt="좋아요" width={32} height={32} />
            </button>
            <button className="semibold flex w-[354px] items-center justify-center rounded-2xl bg-color-blue-300 py-4 text-xl text-gray-50 mobile:text-md tablet:text-lg mobile-tablet:w-full mobile-tablet:max-w-full mobile-tablet:px-4 mobile-tablet:py-[11px]">
              지정 플랜 요청하기
            </button>
          </div>
          <hr className="border-Line-100 my-5 mobile-tablet:hidden" />
          <div className="flex flex-col gap-[22px] mobile-tablet:hidden">
            <p className="semibold text-black-400 flex text-xl">나만 알기엔 아쉬운 Maker인가요?</p>
            <div className="flex gap-4">
              <div className="my-6">
                <ClipboardCopy icon={icon_outline} /> {/*링크 복사 버튼*/}
              </div>
              <button onClick={shareMessage}>
                <Image src={icon_kakao} alt="카카오톡 공유" width={64} height={64} />
              </button>
              <button onClick={btnShareFb}>
                <Image src={icon_facebook} alt="페이스북 공유" width={64} height={64} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
