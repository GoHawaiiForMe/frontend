import useAuthStore from "@/stores/useAuthStore";
import Input from "@/components/Common/Input";
import Button from "@/components/Common/Button";
import Link from "next/link";
import Image from "next/image";
import logo from "@public/assets/icon_logo_img.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/utils/validate";
import google_icon from "@public/assets/icon_google.svg";
import kakao_icon from "@public/assets/icon_kakao.svg";
import naver_icon from "@public/assets/icon_naver.svg";
import userService from "@/services/userService";
import { useRouter } from "next/router";

export default function LoginForm() {
  const router = useRouter();
  const { setLogin } = useAuthStore();

  const handleLogin = async (data: LoginFormData) => {
    try {
      await userService.login(data);

      // 유저 정보 요청
      const userInfo = await userService.getUserInfo();
      setLogin(userInfo.nickName, userInfo.role as "DREAMER" | "MAKER", userInfo.coconut);

      router.push("/");

    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
      }
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: LoginFormData) => {
    handleLogin(data);
  };

  const watchFields = watch();
  const isFormValid = Object.values(watchFields).every((value) => value?.toString().trim() !== "");

  const ErrorMessage = ({ message }: { message: string | undefined }) => (
    <p className="text-color-red-200 mt-1 absolute right-0">{message}</p>
  );

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center gap-8 pc:w-[640px] mobile-tablet:w-[372px]">
        <Image src={logo} alt="로고" />
        <form className="w-full gap-8 flex flex-col relative" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <Input
              {...register("email")}
              placeholder="이메일을 입력해 주세요"
              type="text"
              label="이메일"
              error={!!errors.email}
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </div>
          <div className="mb-2">
            <Input
              {...register("password")}
              placeholder="비밀번호를 입력해 주세요"
              type="password"
              label="비밀번호"
              error={!!errors.password}
            />
            {errors.password && <ErrorMessage message={errors.password.message} />}
          </div>
          <div className="flex justify-center">
            <Button label="로그인" type="submit" disabled={!isFormValid} className="text-color-gray-50" />
          </div>
        </form>
        <div className="flex justify-center mb-10 pc:text-xl ">
          <p className="mr-2 text-lg mobile-tablet:text-xs">
            아직 니가가라하와이 회원이 아니신가요?
          </p>
          <Link
            href="/signup"
            className="text-color-blue-300 underline text-lg mobile-tablet:text-xs"
          >
            이메일로 회원가입하기
          </Link>
        </div>
        <div className="flex flex-col items-center gap-8">
          <h2 className="pc:text-xl tablet:text-xs">SNS 계정으로 간편 가입하기</h2>
          <div className="flex gap-4">
            <Image src={google_icon} alt="구글 아이콘" width={50} height={50} />
            <Image src={kakao_icon} alt="카카오 아이콘" width={50} height={50} />
            <Image src={naver_icon} alt="네이버 아이콘" width={50} height={50} />
          </div>
        </div>
      </div>
    </div>
  );
}
