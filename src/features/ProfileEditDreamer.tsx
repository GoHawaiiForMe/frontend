import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Common/Input";
import Button from "@/components/Common/Button";
import ImageModal from "@/components/Common/ImageModal";
import { editDreamerSchema, EditDreamerData } from "@/utils/validate";
import Selector from "@/components/Common/Selector";
import profileImgDefault from "@public/assets/icon_default_profile.svg";
import planData from "@/types/planData";
import userService from "@/services/userService";
import useAuthStore from "@/stores/useAuthStore";

import DEFAULT_1 from "@public/assets/img_avatar1.svg";
import DEFAULT_2 from "@public/assets/img_avatar2.svg";
import DEFAULT_3 from "@public/assets/img_avatar3.svg";
import DEFAULT_4 from "@public/assets/img_avatar4.svg";

const avatarImages = [
  { key: "DEFAULT_1", src: DEFAULT_1 },
  { key: "DEFAULT_2", src: DEFAULT_2 },
  { key: "DEFAULT_3", src: DEFAULT_3 },
  { key: "DEFAULT_4", src: DEFAULT_4 },
];

export default function ProfileEditDreamer() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [profileInfo, setProfileInfo] = useState<any>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditDreamerData>({
    resolver: zodResolver(editDreamerSchema),
    mode: "onBlur",
  });

  const router = useRouter();
  const { setLogin } = useAuthStore();

  const handleImageSelect = (imageSrc: string) => {
    setProfileImg(imageSrc);
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

  const handleCancel = () => {
    router.push("/plan_request") //임시 url
  }
  const onSubmit = async (data: EditDreamerData) => {
    const UpdateData = {
      nickName: userInfo?.nickName !== data.nickName ? data.nickName : userInfo?.nickName,
      phoneNumber:
        userInfo?.phoneNumber !== data.phoneNumber ? data.phoneNumber : userInfo?.phoneNumber,
      password: data.password ? data.password : undefined,
      newPassword: data.newPassword || undefined,
    };

    const profileUpdateData = {
      image: profileImg || undefined,
      tripTypes: selectedServices.length > 0 ? selectedServices : undefined,
      serviceArea: selectedLocations.length > 0 ? selectedLocations : undefined,
    };
    try {
      // 기본 정보 업데이트
      const basicInfoUpdatePromise =
        UpdateData.nickName || UpdateData.phoneNumber || UpdateData.password
          ? userService.patchBasicInfo(UpdateData)
          : Promise.resolve();

      // 프로필 정보 업데이트
      const profileInfoUpdatePromise =
        profileUpdateData.image || profileUpdateData.tripTypes || profileUpdateData.serviceArea
          ? userService.patchProfileDreamer(profileUpdateData)
          : Promise.resolve();

      await Promise.all([basicInfoUpdatePromise, profileInfoUpdatePromise]);

      alert("프로필이 성공적으로 수정되었습니다!");
      if (userInfo?.nickName !== data.nickName) {
        setLogin(data.nickName, userInfo?.role || "guest", userInfo?.coconut || 0);
      }
      //임시 url
      // router.push("/plan_request")
    } catch (error) {
      console.error("프로필 수정 실패", error);
      alert("수정 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const watchFields = watch();

  const isFormValid = (() => {
    const { nickName, phoneNumber, password, newPassword, newConfirmPassword } = watchFields;
    const isPasswordValid = password?.trim() !== "" || !newPassword;
    const isNewPasswordValid = newPassword?.trim() !== "" && newPassword === newConfirmPassword;

    // 기본 정보 수정 여부
    const isBasicInfoModified =
      userInfo?.nickName !== nickName || userInfo?.phoneNumber !== phoneNumber;

    // 프로필 정보 수정 여부
    const isProfileInfoModified =
      profileImg !== profileInfo?.profileImg ||
      selectedServices.join(",") !== profileInfo?.selectedServices?.join(",") ||
      selectedLocations.join(",") !== profileInfo?.selectedLocations?.join(",");

    // 최종 검증
    return isPasswordValid && (isBasicInfoModified || isNewPasswordValid || isProfileInfoModified);
  })();

  const ErrorMessage = ({ message }: { message: string | undefined }) => (
    <p className="mt-2 text-color-red-200">{message}</p>
  );

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const fetchUserInfo = async () => {
        try {
          const userData = await userService.getUserInfo();
          const profileData = await userService.getProfileInfo();
          setUserInfo(userData);
          setProfileInfo(profileData);

          if (profileData.image) {
            setProfileImg(profileData.image);
          }

          setValue("nickName", userData.nickName);
          setValue("email", userData.email);
          setValue("phoneNumber", userData.phoneNumber);
          setSelectedServices(profileData.tripTypes || []);
          setSelectedLocations(profileData.serviceArea || []);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserInfo();
    }
  }, []);

  return (
    <>
      <h1 className="semibold mt-16 text-3xl">프로필 수정</h1>
      <div className="my-8 h-0.5 bg-color-line-100"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid w-full gap-16 pc:grid-cols-2 mobile-tablet:flex mobile-tablet:flex-col">
          <div className="flex flex-col gap-4">
            <div>
              <Input
                type="text"
                label="닉네임"
                placeholder="닉네임을 입력해주세요"
                {...register("nickName")}
                error={!!errors.nickName}
                className="border-0 bg-color-background-200"
              />
              {errors.nickName && <ErrorMessage message={errors.nickName.message} />}
            </div>
            <div className="my-4 h-0.5 bg-color-line-100"></div>

            <div>
              <Input
                type="text"
                label="이메일"
                value={userInfo?.email}
                disabled={true}
                placeholder="이메일을 입력해주세요"
                className="border-0 bg-color-background-200 text-color-gray-300"
              />
            </div>
            <div className="my-4 h-0.5 bg-color-line-100"></div>

            <div>
              <Input
                type="text"
                label="전화번호"
                defaultValue={userInfo?.phoneNumber || ""}
                placeholder="숫자만 입력해주세요"
                {...register("phoneNumber")}
                error={!!errors.phoneNumber}
                className="border-0 bg-color-background-200"
              />
              {errors.phoneNumber && <ErrorMessage message={errors.phoneNumber.message} />}
            </div>
            <div className="my-4 h-0.5 bg-color-line-100"></div>
            <div>
              <Input
                type="password"
                label="현재 비밀번호"
                placeholder="현재 비밀번호를 입력해 주세요"
                className="border-0 bg-color-background-200"
              />
            </div>
            <div className="my-4 h-0.5 bg-color-line-100"></div>
            <div>
              <Input
                type="password"
                label="새 비밀번호"
                placeholder="비밀번호를 입력해 주세요"
                className="border-0 bg-color-background-200"
                {...register("newPassword")}
                error={!!errors.newPassword}
              />
              {errors.newPassword && <ErrorMessage message={errors.newPassword.message} />}
            </div>
            <div className="my-4 h-0.5 bg-color-line-100"></div>
            <div>
              <Input
                type="password"
                label="새 비밀번호 확인"
                placeholder="비밀번호를 다시 한번 입력해 주세요"
                className="border-0 bg-color-background-200"
                {...register("newConfirmPassword")}
                error={!!errors.newConfirmPassword}
              />
            </div>
            <div className="mb-8">
              {errors.newConfirmPassword && (
                <ErrorMessage message={errors.newConfirmPassword.message} />
              )}
            </div>
          </div>

          {/* 오른쪽 폼 */}
          <div>
            <div className="flex flex-col gap-8">
              <div>
                <p className="semibold mb-3 text-xl mobile-tablet:text-lg">프로필 이미지</p>
                <div onClick={() => setIsOpenImageModal(true)} className="w-[160px] cursor-pointer">
                  {profileImg ? (
                    <Image
                      src={
                        avatarImages.find((avatar) => avatar.key === profileImg)?.src ||
                        profileImgDefault
                      }
                      alt="프로필 이미지"
                      width={160}
                      height={160}
                    />
                  ) : (
                    <Image src={profileImgDefault} alt="프로필 이미지" width={150} height={150} />
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
                <p className="mb-8 text-lg text-color-gray-400 mobile-tablet:text-xs">
                  * 플랜 요청 시 이용 서비스를 선택할 수 있어요.
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
                <p className="mb-8 text-lg text-color-gray-400 mobile-tablet:text-xs">
                  * 플랜 요청 시 지역을 설정할 수 있어요.
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
        </div>
        <div className="grid gap-8 pb-16 pc:grid-cols-2 mobile-tablet:flex mobile-tablet:flex-col mobile-tablet:gap-4">
          <Button
            type="button"
            label="취소"
            onClick={handleCancel}
            className="bold border border-color-gray-200 bg-color-gray-50 text-color-black-300 mobile-tablet:order-2"
          />
          <Button
            type="submit"
            label="수정하기"
            disabled={!isFormValid}
            className="text-color-gray-50 mobile-tablet:order-1"
          />
        </div>
      </form>
    </>
  );
}
