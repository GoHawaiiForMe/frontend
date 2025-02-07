import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Common/Input";
import { useState } from "react";
import { signUpSchema, SignUpFormData } from "@/utils/validate";
import logo from "@public/assets/icon_logo_img.svg";
import Image from "next/image";
import google_icon from "@public/assets/icon_google.svg";
import kakao_icon from "@public/assets/icon_kakao.svg";
import naver_icon from "@public/assets/icon_naver.svg";
import Button from "@/components/Common/Button";
import Link from "next/link";
import { useSignUp } from "@/stores/SignUpContext";
import { useRouter } from "next/router";
import userService from "@/services/userService";
import authService from "@/services/authService";
import { access } from "fs";

interface CheckResponse {
  data: boolean;
}

export default function SignUpForm() {
  const { setUserData } = useSignUp();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });
  const [nickNameMessage, setNickNameMessage] = useState<string | null>(null);
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [isNickNameValid, setIsNickNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const router = useRouter();

  const onSubmit = (data: SignUpFormData) => {
    setUserData({
      role: data.role,
      nickName: data.nickName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
    });
    if (data.role === "DREAMER") {
      router.push("/profile/dreamer");
    }
    if (data.role === "MAKER") {
      router.push("/profile/maker");
    }
  };

  const watchFields = watch();
  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(watchFields).every((value) => value?.toString().trim() !== "") &&
    isNickNameValid &&
    isEmailValid;

  const ErrorMessage = ({ message }: { message: string | undefined }) => {
    return <p className="absolute right-0 mt-1 text-color-red-200">{message}</p>;
  };

  const checkNickName = async () => {
    const nickName = watchFields.nickName;
    try {
      const response = (await userService.checkNickName({ nickName })) as CheckResponse;
      if (response) {
        setIsNickNameValid(true);
        setNickNameMessage("사용 가능한 닉네임입니다!");
      } else {
        setIsNickNameValid(false);
        setError("nickName", { message: "닉네임이 중복되었습니다!" });
        setNickNameMessage("");
      }
    } catch {
      setError("nickName", { message: "닉네임 체크 중 오류가 발생했습니다." });
      setIsNickNameValid(false);
    }
  };

  const checkEmail = async () => {
    const email = watchFields.email;
    try {
      const response = (await userService.checkEmail({ email })) as CheckResponse;
      if (response) {
        setEmailMessage("사용 가능한 이메일입니다!");
        setIsEmailValid(true);
      } else {
        setError("email", { message: "이메일이 중복되었습니다!" });
        setEmailMessage("");
        setIsEmailValid(false);
      }
    } catch {
      setError("email", { message: "이메일 체크 중 오류가 발생했습니다." });
      setIsEmailValid(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const googleData = await authService.googleLogin();
      console.log(googleData);
    } catch (error) {
      console.error("구글 로그인 중 오류 발생", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center gap-8 pc:w-[640px] mobile-tablet:w-[372px]">
        <Image src={logo} width={400} height={400} alt="로고" />

        <form onSubmit={handleSubmit(onSubmit)} className="relative flex w-full flex-col gap-8">
          <div className="relative">
            <Input
              type="text"
              label="닉네임"
              placeholder="닉네임을 입력해주세요"
              {...register("nickName")}
              error={!!errors.nickName}
              className="pr-16"
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

          <div className="relative">
            <Input
              type="text"
              label="이메일"
              placeholder="이메일을 입력해 주세요"
              {...register("email")}
              error={!!errors.email}
              className="pr-16"
            />
            <button
              type="button"
              onClick={checkEmail}
              className="bold absolute right-2 top-[60px] rounded-lg bg-color-blue-300 px-2 py-2 text-lg text-color-gray-50 mobile-tablet:top-[53px]"
            >
              이메일 확인
            </button>
            {errors.email && <ErrorMessage message={errors.email.message} />}
            {emailMessage && <p className="text-color-blue-300">{emailMessage}</p>}
          </div>

          <div>
            <Input
              type="text"
              label="전화번호"
              placeholder="숫자만 입력해주세요"
              {...register("phoneNumber")}
              error={!!errors.phoneNumber}
            />
            {errors.phoneNumber && <ErrorMessage message={errors.phoneNumber.message} />}
          </div>

          <div>
            <Input
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해 주세요"
              {...register("password")}
              error={!!errors.password}
            />
            {errors.password && <ErrorMessage message={errors.password.message} />}
          </div>

          <div>
            <Input
              type="password"
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 한번 입력해 주세요"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
            />
            {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword.message} />}
          </div>
          <div className="mb-2">
            <p className="pc:text-xl">역할</p>
            <div className="flex justify-around">
              <label htmlFor="DREAMER" className="flex gap-2 pc:text-xl">
                <input type="radio" value="DREAMER" {...register("role")} />
                Dreamer
              </label>
              <label htmlFor="MAEKR" className="flex gap-2 pc:text-xl">
                <input type="radio" value="MAKER" {...register("role")} />
                Maker
              </label>
            </div>
            {errors.role && <ErrorMessage message={errors.role.message} />}
          </div>
          <Button
            type="submit"
            label="회원가입"
            disabled={!isFormValid}
            className="text-color-gray-50"
          />
        </form>
        <div className="mb-4 flex justify-center">
          <p className="mr-2">이미 니가가라하와이 회원이신가요?</p>
          <Link href="/login" className="text-color-blue-300 underline">
            로그인
          </Link>
        </div>

        <div className="mb-40 flex flex-col items-center gap-8">
          <h2 className="pc:text-xl mobile-tablet:text-xs">SNS 계정으로 간편 가입하기</h2>
          <div className="flex gap-4">
            <div onClick={handleGoogleLogin} className="cursor-pointer">
              <Image src={google_icon} alt="구글 아이콘" width={50} height={50} />
            </div>
            <div className="cursor-pointer">
              <Image src={kakao_icon} alt="카카오 아이콘" width={50} height={50} />
            </div>
            <div className="cursor-pointer">
              <Image src={naver_icon} alt="네이버 아이콘" width={50} height={50} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
