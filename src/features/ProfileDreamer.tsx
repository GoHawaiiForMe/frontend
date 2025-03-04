import { useState } from "react";
import Selector from "@/components/Common/UI/Selector";
import Image from "next/image";
import profileImgDefault from "@public/assets/icon_default_profile.svg";
import Button from "@/components/Common/UI/Button";
import ImageModal from "@/components/Common/Feature/ImageModal";
import { useSignUp } from "@/stores/SignUpContext";
import authService from "@/services/authService";
import planData from "@/types/planData";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { getOAuthToken, removeOAuthToken } from "@/utils/tokenUtils";

export default function ProfileDreamer() {
  const { userData, setProfileData, oAuthUserData } = useSignUp();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

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

  const profileDreamerMutation = useMutation({
    mutationFn: (data: any) => {
      const oauthToken = getOAuthToken();
      return authService.signUp(data, oauthToken || undefined);
    },
    onSuccess: () => {
      removeOAuthToken();
      alert("Dreamer님 가입을 축하드립니다!");
      router.push("/login");
    },
    onError: (error: any) => {
      alert(error.message);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    const profileData = {
      image: profileImg || undefined,
      tripTypes: selectedServices,
      serviceArea: selectedLocations,
    };

    setProfileData(profileData);
    const payload = {
      user: userData && userData.role ? { ...userData } : { ...oAuthUserData },
      profile: profileData,
    };
    profileDreamerMutation.mutate(payload);
  };

  const isButtonDisabled =
    selectedServices.length === 0 ||
    selectedLocations.length === 0 ||
    !profileImg ||
    !userData ||
    isSubmitting;

  return (
    <div className="mb-20 flex justify-center">
      <div className="flex flex-col gap-5 pc:w-[640px] mobile-tablet:w-[372px]">
        <div className="flex flex-col">
          <p className="bold text-3xl mobile-tablet:text-2lg">프로필 등록</p>
          <p className="regular my-8 text-xl text-color-black-300 mobile-tablet:text-xs">
            추가 정보를 입력하여 회원가입을 완료해주세요.
          </p>
          <div className="mb-8 h-0.5 bg-color-line-100"></div>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <p className="semibold mb-3 text-xl mobile-tablet:text-lg">프로필 이미지</p>
            <div onClick={() => setIsOpenImageModal(true)} className="w-[100px] cursor-pointer">
              {profileImg ? (
                <Image
                  src={`/assets/img_avatar${profileImg.split("_")[1]}.svg`}
                  alt="프로필 이미지"
                  width={100}
                  height={100}
                />
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
          <div className="my-2 h-0.5 bg-color-line-100"></div>

          <div>
            <p className="semibold mb-3 text-xl mobile-tablet:text-lg">이용 서비스</p>
            <p className="mb-4 text-lg text-color-gray-400 mobile-tablet:text-xs">
              *이용 서비스는 중복 선택 가능하며, 언제든 수정 가능해요!
            </p>
            <Selector
              category="services"
              selectedTypes={selectedServices.map(
                (service) =>
                  planData.services.find((ser) => ser.mapping === service)?.name || service,
              )}
              toggleSelection={handleServiceSelection}
            />
          </div>
          <div className="my-2 h-0.5 bg-color-line-100"></div>

          <div className="mb-12">
            <p className="semibold mb-3 text-xl mobile-tablet:text-lg">여행 하고 싶은 지역</p>
            <p className="mb-4 text-lg text-color-gray-400 mobile-tablet:text-xs">
              *여행하고 싶은 지역은 언제든 수정 가능해요!
            </p>
            <Selector
              category="locations"
              selectedTypes={selectedLocations.map(
                (location) =>
                  planData.locations.find((loc) => loc.mapping === location)?.name || location,
              )}
              toggleSelection={handleLocationSelection}
            />
          </div>
        </div>
        <Button
          label={isSubmitting ? "처리중..." : "시작하기"}
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          type="submit"
          className="text-color-gray-50"
        />
      </div>
    </div>
  );
}
