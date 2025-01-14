import { useState } from "react";
import Selector from "@/components/Common/Selector";
import Image from "next/image";
import profileImgDefault from "@public/assets/icon_default_profile.svg";
import Button from "@/components/Common/Button";
import ImageModal from "@/components/Common/ImageModal";
import { useSignUp } from "@/stores/SignUpContext";
import userService from "@/services/userService";
import planData from "@/types/planData";

export default function ProfileDreamer() {
  const { userData, setProfileData } = useSignUp();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [profileImg, setProfileImg] = useState<string | null>(null);

  const handleImageSelect = (imageKey: string) => {
    setProfileImg(imageKey);
    setIsOpenImageModal(false);
  };

  const handleServiceSelection = (type: string) => {
    setSelectedServices((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleLocationSelection = (type: string) => {
    setSelectedLocations((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleSubmit = async () => {
    const profileData = {
      image: profileImg || undefined,
      tripTypes: selectedServices,
      serviceArea: selectedLocations,
    };

    setProfileData(profileData);

    try {
      const payload = { ...userData, ...profileData };
      await userService.signUp(payload);
      console.log("회원가입 성공");
    } catch (error) {
      console.error("회원가입 실패", error);
    }
  };

  const isButtonDisabled =
    selectedServices.length === 0 || selectedLocations.length === 0 || !profileImg || !userData;

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
            <div onClick={() => setIsOpenImageModal(true)} className="cursor-pointer w-30">
              {profileImg ? (
                <Image src={`/assets/img_avatar${profileImg.split("_")[1]}.svg`} alt="프로필 이미지" width={100} height={100} />
              ) : (
                <Image src={profileImgDefault} alt="프로필 이미지" width={100} height={100} />
              )}
            </div>
          </div>
          {isOpenImageModal && (
            <ImageModal
              onSelectImage={handleImageSelect}
              onClose={() => setIsOpenImageModal(false)}
            />
          )}
          <div className="h-0.5 bg-color-line-100 my-2"></div>

          <div>
            <p className="text-xl semibold mb-3 mobile-tablet:text-lg">이용 서비스</p>
            <p className="text-lg text-color-gray-400 mb-4 mobile-tablet:text-xs">
              *이용 서비스는 중복 선택 가능하며, 언제든 수정 가능해요!
            </p>
            <Selector
              category="services"
              selectedTypes={selectedServices.map(service => planData.services.find(ser => ser.mapping === service)?.name || service)}
              toggleSelection={handleServiceSelection}
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
              selectedTypes={selectedLocations.map(location => planData.locations.find(loc => loc.mapping === location)?.name || location)}
              toggleSelection={handleLocationSelection}
            />
          </div>
        </div>
        <Button
          label="시작하기"
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          type="submit"
          className="text-color-gray-50"
        />
      </div>
    </div>
  );
}
