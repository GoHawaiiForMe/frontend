import { useState } from "react";
import Selector from "@/components/Common/Selector";
import Image from "next/image";
import profileImg from "@public/assets/icon_default_profile.svg";
import Button from "@/components/Common/Button";

export default function ProfileDreamer() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleSelection = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };
  return (
    <div className="flex justify-center mb-20">
      <div className="flex flex-col gap-5 pc:w-[640px] mobile-tablet:w-[372px]">
        <div className="flex flex-col">
          <p className="text-3xl bold mobile-tablet:text-2lg">프로필 등록</p>
          <p className="text-xl regular text-color-black-300 my-8 mobile-tablet:text-xs">
            추가 정보를 입력하여 회원가입을 완료해주세요.
          </p>
          <div className="h-0.5 bg-color-line-100 mb-8"></div>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-xl semibold mb-3 mobile-tablet:text-lg">프로필 이미지</p>
            <Image src={profileImg} alt="프로필 이미지" width={100} height={100} />
          </div>
          <div className="h-0.5 bg-color-line-100 my-2"></div>

          <div>
            <p className="text-xl semibold mb-3 mobile-tablet:text-lg">이용 서비스</p>
            <p className="text-lg text-color-gray-400 mb-4 mobile-tablet:text-xs">
              *이용 서비스는 중복 선택 가능하며, 언제든 수정 가능해요!
            </p>
            <Selector
              category="services"
              selectedTypes={selectedTypes}
              toggleSelection={handleSelection}
            />
          </div>
          <div className="h-0.5 bg-color-line-100 my-2"></div>

          <div className="mb-12">
            <p className="text-xl semibold mb-3 mobile-tablet:text-lg">여행 하고 싶은 지역</p>
            <p className="text-lg text-color-gray-400 mb-4 mobile-tablet:text-xs">
              *여행하고 싶은 지역은 언제든 수정 가능해요!
            </p>
            <Selector
              category="locations"
              selectedTypes={selectedTypes}
              toggleSelection={handleSelection}
            />
          </div>
        </div>
        <Button
          label="시작하기"
          onClick={() => console.log("시작하기 클릭")}
          disabled={true}
          type="submit"
        />
      </div>
    </div>
  );
}
