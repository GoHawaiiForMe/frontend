import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Common/Input";
import { editMakerSchema, EditMakerData } from "@/utils/validate";
import Button from "@/components/Common/Button";
import { useEffect, useState } from "react";
import userService from "@/services/userService";
import { useRouter } from "next/router";
import useAuthStore from "@/stores/useAuthStore";
import { useQuery, useMutation } from "@tanstack/react-query";
import authService from "@/services/authService";

const fetchUserInfo = async () => {
  const userData = await userService.getUserInfo();
  return userData;
};
const updateUserInfo = async (UpdateData: any): Promise<void> => {
  return userService.patchBasicInfo(UpdateData);
};
export default function InformEditMaker() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<EditMakerData>({
    resolver: zodResolver(editMakerSchema),
    mode: "onBlur",
  });

  const router = useRouter();
  const { setLogin } = useAuthStore();
  const [isNickNameValid, setIsNickNameValid] = useState(false);
  const [nickNameMessage, setNickNameMessage] = useState<string | null>(null);

  const {
    data: userInfo,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
  });

  const mutation = useMutation<void, Error, any>({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      alert("프로필이 성공적으로 수정되었습니다!");
      refetch();
    },
    onError: (error: any) => {
      alert(error.message);
    },
  });

  const isEmailExist = !!userInfo?.email;

  const handleCancel = () => {
    router.back();
  };

  const onSubmit = async (data: EditMakerData) => {
    if (isLoading || isError) {
      alert("사용자 정보를 불러오는 중입니다.");
      return;
    }

    const UpdateData = {
      nickName: userInfo?.nickName !== data.nickName ? data.nickName : userInfo?.nickName,
      phoneNumber:
        userInfo?.phoneNumber !== data.phoneNumber ? data.phoneNumber : userInfo?.phoneNumber,
      password: data.password ? data.password : undefined,
      newPassword: data.newPassword || undefined,
    };
    mutation.mutate(UpdateData);

    if (userInfo?.nickName !== data.nickName) {
      setLogin(
        data.nickName,
        userInfo?.role || "guest",
        userInfo?.coconut || 0,
        userInfo?.email,
        userInfo?.phoneNumber,
      );
    }
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
        if (userInfo?.nickName === nickName) {
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

  const watchFields = watch();
  const isFormValid = (() => {
    const { nickName, phoneNumber, password, newPassword, newConfirmPassword } = watchFields;

    const isPasswordValid = password?.trim() !== "" || !newPassword;
    const isNewPasswordValid = newPassword?.trim() !== "" && newPassword === newConfirmPassword;

    const isBasicInfoModified =
      userInfo?.nickName !== nickName || userInfo?.phoneNumber !== phoneNumber;

    const isPasswordEntered = !!watchFields.password?.trim();

    return isPasswordValid && (isBasicInfoModified || isPasswordEntered || isNewPasswordValid);
  })();

  const ErrorMessage = ({ message }: { message: string | undefined }) => (
    <p className="mt-2 text-color-red-200">{message}</p>
  );

  useEffect(() => {
    if (userInfo) {
      setValue("nickName", userInfo.nickName);
      setValue("email", userInfo.email);
      setValue("phoneNumber", userInfo.phoneNumber);
    }
  }, [userInfo, setValue]);

  return (
    <>
      <h1 className="semibold mt-16 text-3xl">기본정보 수정</h1>
      <div className="my-8 h-0.5 bg-color-line-100"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid w-full pc:grid-cols-2 pc:gap-16 mobile-tablet:flex mobile-tablet:flex-col mobile-tablet:gap-4">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Input
                type="text"
                label="닉네임"
                placeholder="기존 닉네임"
                {...register("nickName")}
                error={!!errors.nickName}
                className="border-0 bg-color-background-200"
              />
              <button
                type="button"
                onClick={checkNickName}
                className="bold absolute right-2 top-[60px] rounded-lg bg-color-blue-300 px-2 py-2 text-lg text-color-gray-50 mobile-tablet:top-[53px]"
              >
                닉네임 확인
              </button>
              {errors.nickName && <ErrorMessage message={errors.nickName.message} />}
              {nickNameMessage && <p className="text-color-blue-300">{nickNameMessage}</p>}
            </div>
            <div className="my-4 h-0.5 bg-color-line-100"></div>
            <div>
              <Input
                type="text"
                label="이메일"
                value={userInfo?.email}
                disabled={true}
                placeholder="[이메일과 비밀번호는 비활성화] 간편로그인 회원입니다. "
                className="border-0 bg-color-background-200 text-color-gray-300"
              />
            </div>
            <div className="my-4 h-0.5 bg-color-line-100"></div>
            <div className="mb-16 mobile-tablet:m-0">
              <Input
                type="text"
                label="전화번호"
                placeholder="숫자만 입력해주세요"
                {...register("phoneNumber")}
                error={!!errors.phoneNumber}
                className="border-0 bg-color-background-200"
              />
              {errors.phoneNumber && <ErrorMessage message={errors.phoneNumber.message} />}
            </div>
            <div className="h-0.5 bg-color-line-100 pc:hidden"></div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <Input
                type="password"
                label="현재 비밀번호"
                placeholder="현재 비밀번호를 입력해 주세요"
                className="overflow-hidden text-ellipsis whitespace-nowrap border-0 bg-color-background-200 pr-10"
                disabled={!!errors.password}
                {...register("password")}
              />
            </div>
            <div className="my-4 h-0.5 bg-color-line-100"></div>
            <div>
              <Input
                type="password"
                label="새 비밀번호"
                placeholder="비밀번호를 입력해 주세요"
                className="overflow-hidden text-ellipsis whitespace-nowrap border-0 bg-color-background-200 pr-10"
                disabled={!isEmailExist}
                {...register("newPassword")}
                error={!!errors.newPassword}
              />
              {errors.newPassword && <ErrorMessage message={errors.newPassword.message} />}
            </div>
            <div className="my-4 h-0.5 bg-color-line-100"></div>
            <div className="mb-16">
              <Input
                type="password"
                label="새 비밀번호 확인"
                placeholder="비밀번호를 다시 한번 입력해 주세요"
                className="overflow-hidden text-ellipsis whitespace-nowrap border-0 bg-color-background-200 pr-10"
                disabled={!isEmailExist}
                {...register("newConfirmPassword")}
                error={!!errors.newConfirmPassword}
              />
              {errors.newConfirmPassword && (
                <ErrorMessage message={errors.newConfirmPassword.message} />
              )}
            </div>
          </div>
        </div>
        <div className="grid gap-8 pb-16 pc:grid-cols-2 mobile-tablet:flex mobile-tablet:flex-col mobile-tablet:gap-4">
          <Button
            type="button"
            label="취소"
            onClick={handleCancel}
            className="bold border border-color-blue-300 bg-color-gray-50 text-color-blue-300 mobile-tablet:order-2"
          />
          <Button
            type="submit"
            label="수정하기"
            disabled={!isFormValid}
            className="text-white mobile-tablet:order-1"
          />
        </div>
      </form>
    </>
  );
}
