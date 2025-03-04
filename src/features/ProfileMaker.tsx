import { useState } from "react";
import Selector from "@/components/Common/UI/Selector";
import Image from "next/image";
import profileImgDefault from "@public/assets/icon_default_profile.svg";
import Button from "@/components/Common/UI/Button";
import ImageModal from "@/components/Common/Feature/ImageModal";
import { useSignUp } from "@/stores/SignUpContext";
import authService from "@/services/authService";
import planData from "@/types/planData";
import Input from "@/components/Common/Form/Input";
import router from "next/router";
import { removeOAuthToken } from "@/utils/tokenUtils";

export default function ProfileMaker() {
  const { userData, setMakerProfileData, oAuthUserData } = useSignUp();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [detailDescription, setDetailDescription] = useState<string>("");
  const [snsAddress, setSnsAddress] = useState<string>("");
  const [snsAddressError, setSnsAddressError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const handleDetailDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetailDescription(e.target.value);
  };

  const validateSnsUrl = (url: string): boolean => {
    if (!url) return true;
    const snsUrlPattern =
      /^@?(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\/[a-zA-Z0-9_.-]+\/?$/;
    return snsUrlPattern.test(url);
  };

  const handleSnsAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSnsAddress(value);
    setSnsAddressError("");
  };

  const handleSnsAddressBlur = () => {
    if (!snsAddress) {
      setSnsAddressError("SNS 주소를 입력해주세요.");
    } else if (!validateSnsUrl(snsAddress)) {
      setSnsAddressError("올바른 SNS 주소를 입력해주세요. (예: www.instagram.com/username)");
    } else {
      setSnsAddressError("");
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    const profileMakerData = {
      image: profileImg || undefined,
      serviceTypes: selectedServices,
      serviceArea: selectedLocations,
      gallery: snsAddress,
      description: description,
      detailDescription: detailDescription,
    };
    setMakerProfileData(profileMakerData);

    try {
      const oauthToken = localStorage.getItem("Token");
      const payload = {
        user: userData && userData.role ? { ...userData } : { ...oAuthUserData },
        profile: profileMakerData,
      };
      await authService.signUp(payload, oauthToken || undefined);
      alert("Maker님 가입을 축하드립니다!");
      removeOAuthToken();
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isButtonDisabled =
    selectedServices.length === 0 ||
    selectedLocations.length === 0 ||
    !profileImg ||
    !userData ||
    !description ||
    !detailDescription ||
    !snsAddress ||
    !!snsAddressError ||
    isSubmitting;

  return (
    <div className="mb-20 flex w-full justify-center">
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col">
          <p className="bold text-3xl mobile-tablet:text-2lg">Maker 프로필 등록</p>
          <p className="regular my-8 text-xl text-color-black-300 mobile-tablet:text-xs">
            추가 정보를 입력하여 회원가입을 완료해주세요.
          </p>
          <div className="mb-8 h-0.5 bg-color-line-100"></div>
        </div>
        <div className="flex gap-[72px] mobile-tablet:flex-col mobile-tablet:justify-center">
          <div className="w-full">
            <p className="semibold mb-3 text-xl mobile-tablet:text-lg">프로필 이미지</p>
            <div onClick={() => setIsOpenImageModal(true)} className="w-[160px] cursor-pointer">
              {profileImg ? (
                <Image
                  src={`/assets/img_avatar${profileImg.split("_")[1]}.svg`}
                  alt="프로필 이미지"
                  width={160}
                  height={160}
                />
              ) : (
                <Image src={profileImgDefault} alt="프로필 이미지" width={160} height={160} />
              )}
            </div>
            {isOpenImageModal && (
              <ImageModal
                onSelectImage={handleImageSelect}
                onClose={() => setIsOpenImageModal(false)}
              />
            )}
            <div className="my-8 h-0.5 bg-color-line-100"></div>
            <div>
              <Input
                label="SNS 주소"
                className="mb-8 overflow-hidden text-ellipsis border-none border-color-line-100 bg-color-background-200"
                type="text"
                placeholder="예시:www.instagram.com/username"
                value={snsAddress}
                onChange={handleSnsAddressChange}
                onBlur={handleSnsAddressBlur}
                error={snsAddressError}
              />
              <Input
                className="overflow-hidden text-ellipsis border-none bg-color-background-200"
                label="한 줄 소개"
                type="text"
                placeholder="한 줄 소개를 입력해주세요."
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
          </div>

          {/* 오른쪽 파트 */}
          <div className="w-full">
            <p className="semibold mb-4 text-xl mobile-tablet:text-lg">상세 소개</p>
            <textarea
              className="mb-4 h-40 w-full resize-none rounded-xl border border-none bg-color-background-200 p-4"
              placeholder="서비스를 제공 할 정보에 대해 상세 내용을 입력해주세요."
              value={detailDescription}
              onChange={handleDetailDescriptionChange}
            />
            <div>
              <p className="semibold mb-3 text-xl mobile-tablet:text-lg">제공 서비스</p>
              <p className="mb-4 text-lg text-color-gray-400 mobile-tablet:text-xs">
                *제공 서비스는 중복 선택 가능하며, 언제든 수정 가능해요!
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
            <div className="my-8 h-0.5 bg-color-line-100"></div>

            <div className="mb-12">
              <p className="semibold mb-3 text-xl mobile-tablet:text-lg">
                서비스를 제공 하고 싶은 지역
              </p>
              <p className="mb-4 text-lg text-color-gray-400 mobile-tablet:text-xs">
                *제공 서비스 지역은 언제든 수정 가능해요!
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
