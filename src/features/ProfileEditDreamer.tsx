import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Common/Input";
import React, { useEffect } from "react";
import { editDreamerSchema, EditDreamerData } from "@/utils/validate";
import Image from "next/image";
import Button from "@/components/Common/Button";
import Selector from "@/components/Common/Selector";
import { useState } from "react";
import profileImgDefault from "@public/assets/icon_default_profile.svg";
import ImageModal from "@/components/Common/ImageModal";
import planData from "@/types/planData";
import userService from "@/services/userService";

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
            let imgMapping = "default";
            if (profileData.image === "DEFAULT_1") {
              imgMapping = "1";
            } else if (profileData.image === "DEFAULT_2") {
              imgMapping = "2";
            } else if (profileData.image === "DEFAULT_3") {
              imgMapping = "3";
            } else if (profileData.image === "DEFAULT_4") {
              imgMapping = "4";
            }
            setProfileImg(`/assets/img_avatar${imgMapping}.svg`);
          } else {
            setProfileImg(null);
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

  const onSubmit = (data: EditDreamerData) => {
    console.log(data); // 테스트용
  };

  const watchFields = watch();
  const isFormValid = Object.values(watchFields).every((value) => value?.toString().trim() !== "");

  const ErrorMessage = ({ message }: { message: string | undefined }) => (
    <p className="text-color-red-200 mt-2">{message}</p>
  );

  return (
    <>
      <h1 className="text-3xl semibold mt-16">프로필 수정</h1>
      <div className="h-0.5 bg-color-line-100 my-8"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid pc:grid-cols-2 gap-16 w-full mobile-tablet:flex mobile-tablet:flex-col">
          <div className="flex flex-col gap-4">
            <div>
              <Input
                type="text"
                label="닉네임"
                placeholder="닉네임을 입력해주세요"
                {...register("nickName")}
                error={!!errors.nickName}
                className="bg-color-background-200 border-0 "
              />
              {errors.nickName && <ErrorMessage message={errors.nickName.message} />}
            </div>
            <div className="h-0.5 bg-color-line-100 my-4"></div>

            <div>
              <Input
                type="text"
                label="이메일"
                value={userInfo?.email}
                disabled={true}
                placeholder="이메일을 입력해주세요"
                className="bg-color-background-200 border-0 text-color-gray-300"
              />
            </div>
            <div className="h-0.5 bg-color-line-100 my-4"></div>

            <div>
              <Input
                type="text"
                label="전화번호"
                defaultValue={userInfo?.phoneNumber || ""}
                placeholder="숫자만 입력해주세요"
                {...register("phoneNumber")}
                error={!!errors.phoneNumber}
                className="bg-color-background-200 border-0 "
              />
              {errors.phoneNumber && <ErrorMessage message={errors.phoneNumber.message} />}
            </div>
            <div className="h-0.5 bg-color-line-100 my-4"></div>
            <div>
              <Input
                type="password"
                label="현재 비밀번호"
                placeholder="현재 비밀번호를 입력해 주세요"
                className="bg-color-background-200 border-0 "
              />
            </div>
            <div className="h-0.5 bg-color-line-100 my-4"></div>
            <div>
              <Input
                type="password"
                label="새 비밀번호"
                placeholder="비밀번호를 입력해 주세요"
                className="bg-color-background-200 border-0 "
                {...register("newPassword")}
                error={!!errors.newPassword}
              />
              {errors.newPassword && <ErrorMessage message={errors.newPassword.message} />}
            </div>
            <div className="h-0.5 bg-color-line-100 my-4"></div>
            <div >
              <Input
                type="password"
                label="새 비밀번호 확인"
                placeholder="비밀번호를 다시 한번 입력해 주세요"
                className="bg-color-background-200 border-0 text-color-gray-300"
                {...register("newConfirmPassword")}
                error={!!errors.newConfirmPassword}
              />
            </div>
            <div className="mb-8">
              {errors.newConfirmPassword && <ErrorMessage message={errors.newConfirmPassword.message} />}
            </div>
          </div>

          {/* 오른쪽 폼 */}
          <div>
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xl semibold mb-3 mobile-tablet:text-lg">프로필 이미지</p>
                <div onClick={() => setIsOpenImageModal(true)} className="cursor-pointer w-30">
                  {profileImg ? (
                    <Image src={profileImg} alt="프로필 이미지" width={100} height={100} />
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
              <div className="h-0.5 bg-color-line-100 my-2"></div>
              <div>
                <p className="text-xl semibold mb-3 mobile-tablet:text-lg">이용 서비스</p>
                <p className="text-lg text-color-gray-400 mb-8 mobile-tablet:text-xs">
                  * 플랜 요청 시 이용 서비스를 선택할 수 있어요.
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
                <p className="text-lg text-color-gray-400 mb-8 mobile-tablet:text-xs">
                  * 플랜 요청 시 지역을 설정할 수 있어요.
                </p>
                <Selector
                  category="locations"
                  selectedTypes={selectedLocations.map(location => planData.locations.find(loc => loc.mapping === location)?.name || location)}
                  toggleSelection={handleLocationSelection}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid pc:grid-cols-2 gap-8 pb-16 mobile-tablet:flex mobile-tablet:flex-col mobile-tablet:gap-4">
          <Button
            type="button"
            label="취소"
            className="bg-color-gray-50 border border-color-gray-200 text-color-black-300 bold mobile-tablet:order-2"
          />
          <Button
            type="submit"
            label="수정하기"
            disabled={!isFormValid}
            className="mobile-tablet:order-1 text-color-gray-50"
          />
        </div>
      </form>
    </>
  );
}
