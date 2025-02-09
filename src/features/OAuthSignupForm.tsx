import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Common/Input";
import { useEffect, useState } from "react";
import { SignUpOAuthData, signUpOAuthSchema } from "@/utils/validate";
import logo from "@public/assets/icon_logo_img.svg";
import Image from "next/image";
import Button from "@/components/Common/Button";
import Link from "next/link";
import { useSignUp } from "@/stores/SignUpContext";
import { useRouter } from "next/router";
import authService from "@/services/authService";

interface CheckResponse {
  data: boolean;
}

export default function OAuthSignUpForm() {
  const { setOAuthUserData } = useSignUp();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignUpOAuthData>({
    resolver: zodResolver(signUpOAuthSchema),
    mode: "onBlur",
  });
  const [nickNameMessage, setNickNameMessage] = useState<string | null>(null);
  const [isNickNameValid, setIsNickNameValid] = useState(false);
  const [authCode, setAuthCode] = useState<string | null>(null);

  const router = useRouter();

  const onSubmit = (data: SignUpOAuthData) => {
    setOAuthUserData({
      role: data.role,
      nickName: data.nickName,
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
    isNickNameValid;

  const ErrorMessage = ({ message }: { message: string | undefined }) => {
    return <p className="absolute right-0 mt-1 text-color-red-200">{message}</p>;
  };

  const checkNickName = async () => {
    const nickName = watchFields.nickName;
    try {
      const response = (await authService.checkNickName({ nickName })) as CheckResponse;
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

  useEffect(() => {
    if (router.isReady) {
      const codeFromQuery = router.query.auth as string;
      if (codeFromQuery) {
        setAuthCode(codeFromQuery);
        localStorage.setItem("Token", codeFromQuery);
      }
    }
  }, [router.isReady, router.query.code]);

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
          <p className="mr-2">니가가라하와이 전용회원이신가요?</p>
          <Link href="/login" className="text-color-blue-300 underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
