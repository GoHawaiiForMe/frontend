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
import avatarImages from "@/utils/formatImage";
import { getAccessToken } from "@/utils/tokenUtils";
import authService from "@/services/authService";

export default function ProfileEditDreamer() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [profileInfo, setProfileInfo] = useState<any>(null);
  const [isNickNameValid, setIsNickNameValid] = useState(false);
  const [nickNameMessage, setNickNameMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<EditDreamerData>({
    resolver: zodResolver(editDreamerSchema),
    mode: "onBlur",
  });

  const router = useRouter();
  const { setLogin } = useAuthStore();
  const isEmailExist = !!userInfo?.email;

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
    router.push("/signup");
  };

  const checkNickName = async () => {
    const nickName = watchFields.nickName;
    try {
      const response = await authService.checkNickName({ nickName });
      if (response) {
        setIsNickNameValid(true);
        setNickNameMessage("사용 가능한 닉네임입니다!");
      } else {
        setIsNickNameValid(false);
        if (userInfo.nickName === nickName) {
          setError("nickName", { message: "현재 닉네임과 동일합니다." });
        } else {
          setError("nickName", { message: "닉네임이 중복되었습니다!" });
        }
        setNickNameMessage("");
      }
    } catch (error: any) {
      setError("nickName", { message: "닉네임 체크 중 오류가 발생했습니다." });
      setIsNickNameValid(false);
      alert(error.message);
    }
  };

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
      const basicInfoUpdatePromise =
        UpdateData.nickName || UpdateData.phoneNumber || UpdateData.password
          ? userService.patchBasicInfo(UpdateData)
          : Promise.resolve();

      const profileInfoUpdatePromise =
        profileUpdateData.image || profileUpdateData.tripTypes || profileUpdateData.serviceArea
          ? userService.patchProfileDreamer(profileUpdateData)
          : Promise.resolve();

      await Promise.all([basicInfoUpdatePromise, profileInfoUpdatePromise]);

      alert("프로필이 성공적으로 수정되었습니다!");
      if (userInfo?.nickName !== data.nickName) {
        setLogin(data.nickName, userInfo?.role || "guest", userInfo?.coconut || 0);
      }
      router.reload();
    } catch (error: any) {
      alert(error.message);
      router.reload();
    }
  };

  const watchFields = watch();

  const isFormValid = (() => {
    const { nickName, phoneNumber, password, newPassword, newConfirmPassword } = watchFields;
    const isPasswordValid = password?.trim() !== "" || !newPassword;
    const isNewPasswordValid = newPassword?.trim() !== "" && newPassword === newConfirmPassword;

    const isBasicInfoModified =
      userInfo?.nickName !== nickName || userInfo?.phoneNumber !== phoneNumber;
    const isProfileInfoModified =
      profileImg !== profileInfo?.profileImg ||
      selectedServices.join(",") !== profileInfo?.selectedServices?.join(",") ||
      selectedLocations.join(",") !== profileInfo?.selectedLocations?.join(",");

    return isPasswordValid && (isBasicInfoModified || isNewPasswordValid || isProfileInfoModified);
  })();

  const ErrorMessage = ({ message }: { message: string | undefined }) => (
    <p className="text-color-red-200 mt-2">{message}</p>
  );

  useEffect(() => {
    const accessToken = getAccessToken();
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
      <div className="bg-color-line-100 my-8 h-0.5"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="pc:grid-cols-2 mobile-tablet:flex mobile-tablet:flex-col grid w-full gap-16">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Input
                type="text"
                label="닉네임"
                placeholder="닉네임을 입력해주세요"
                {...register("nickName")}
                error={!!errors.nickName}
                className="bg-color-background-200 border-0"
              />
              <button
                type="button"
                onClick={checkNickName}
                className="bold bg-color-blue-300 text-color-gray-50 mobile-tablet:top-[53px] absolute top-[60px] right-2 rounded-lg px-2 py-2 text-lg"
              >
                닉네임 확인
              </button>
              {errors.nickName && <ErrorMessage message={errors.nickName.message} />}
              {nickNameMessage && <p className="text-color-blue-300">{nickNameMessage}</p>}
            </div>
            <div className="bg-color-line-100 my-4 h-0.5"></div>
            <div>
              <Input
                type="text"
                label="이메일"
                value={userInfo?.email}
                disabled={true}
                placeholder="[이메일과 비밀번호는 비활성화] 간편로그인 회원입니다."
                className="bg-color-background-200 text-color-gray-300 border-0"
              />
            </div>
            <div className="bg-color-line-100 my-4 h-0.5"></div>
            <div>
              <Input
                type="text"
                label="전화번호"
                defaultValue={userInfo?.phoneNumber || ""}
                placeholder="숫자만 입력해주세요"
                {...register("phoneNumber")}
                error={!!errors.phoneNumber}
                className="bg-color-background-200 border-0"
              />
              {errors.phoneNumber && <ErrorMessage message={errors.phoneNumber.message} />}
            </div>
            <div className="bg-color-line-100 my-4 h-0.5"></div>

            <div>
              <Input
                type="password"
                label="현재 비밀번호"
                placeholder="현재 비밀번호 입력해 주세요"
                className="bg-color-background-200 overflow-hidden border-0 pr-10 text-ellipsis whitespace-nowrap"
                disabled={!isEmailExist}
                {...register("password")}
              />
            </div>
            <div className="bg-color-line-100 my-4 h-0.5"></div>
            <div>
              <Input
                type="password"
                label="새 비밀번호"
                placeholder="비밀번호를 입력해 주세요"
                className="bg-color-background-200 overflow-hidden border-0 pr-10 text-ellipsis whitespace-nowrap"
                disabled={!isEmailExist}
                {...register("newPassword")}
                error={!!errors.newPassword}
              />
              {errors.newPassword && <ErrorMessage message={errors.newPassword.message} />}
            </div>
            <div className="bg-color-line-100 my-4 h-0.5"></div>
            <div>
              <Input
                type="password"
                label="새 비밀번호 확인"
                placeholder="비밀번호를 다시 한번 입력해 주세요"
                className="bg-color-background-200 overflow-hidden border-0 pr-10 text-ellipsis whitespace-nowrap"
                disabled={!isEmailExist}
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
                <p className="semibold mobile-tablet:text-lg mb-3 text-xl">프로필 이미지</p>
                <div onClick={() => setIsOpenImageModal(true)} className="w-[160px] cursor-pointer">
                  {profileImg ? (
                    <Image
                      src={
                        avatarImages.find((avatar) => avatar.key === profileImg)?.src ||
                        profileImgDefault
                      }
                      alt="프로필 이미지"
                      width={130}
                      height={130}
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
              <div className="bg-color-line-100 my-2 h-0.5"></div>
              <div>
                <p className="semibold mobile-tablet:text-lg mb-3 text-xl">이용 서비스</p>
                <p className="text-color-gray-400 mobile-tablet:text-xs mb-8 text-lg">
                  * 플랜 요청 시 이용 서비스를 선택할 수 있어요.
                </p>
                <Selector
                  category="services"
                  selectedTypes={selectedServices.map(
                    (service) =>
                      planData.services.find((ser) => ser.mapping === service)?.name || service,
                  )}
                  toggleSelection={handleServiceSelection}
                  useWide={true}
                />
              </div>
              <div className="bg-color-line-100 my-2 h-0.5"></div>
              <div className="mb-12">
                <p className="semibold mobile-tablet:text-lg mb-3 text-xl">여행 하고 싶은 지역</p>
                <p className="text-color-gray-400 mobile-tablet:text-xs mb-8 text-lg">
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
        <div className="pc:grid-cols-2 mobile-tablet:flex mobile-tablet:flex-col mobile-tablet:gap-4 grid gap-8 pb-16">
          <Button
            type="button"
            label="취소"
            onClick={handleCancel}
            className="bold border-color-gray-200 bg-color-gray-50 text-color-black-300 mobile-tablet:order-2 border"
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
