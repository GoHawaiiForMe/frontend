import useAuthStore from "@/stores/useAuthStore";
import Input from "@/components/Common/Input";
import Button from "@/components/Common/Button";
import Link from "next/link";
import Image from "next/image";
import logo from "@public/assets/icon_logo_img.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/utils/validate";
import userService from "@/services/userService";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/authService";
import SocialLogin from "@/components/Common/SocialLogin";

interface LoginProps {
  email: string;
  password: string;
}

const getUserInfo = async () => {
  const userData = await userService.getUserInfo();
  return userData;
};

const getProfileInfo = async () => {
  const profileData = await userService.getProfileInfo();
  return profileData;
};

const postLogin = async (LoginData: LoginProps) => {
  return authService.login(LoginData);
};

export default function LoginForm() {
  const router = useRouter();
  const { setLogin } = useAuthStore();

  const mutation = useMutation({
    mutationFn: postLogin,
    onSuccess: async () => {
      try {
        const userInfo = await getUserInfo();
        const profileInfo = await getProfileInfo();

        setLogin(
          userInfo.nickName,
          userInfo.role as "DREAMER" | "MAKER",
          userInfo.coconut,
          userInfo.email,
          userInfo.phoneNumber,
          profileInfo.image,
        );
        router.reload();
        router.replace("/");
      } catch (error) {
        console.error("유저 정보 가져오기 실패", error);
      }
    },
    onError: (error: any) => {
      if (error.response) {
        alert(error.message);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error(error.message);
      }
    },
  });

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
    mutation.mutate(data);
  };

  const watchFields = watch();
  const isFormValid = Object.values(watchFields).every((value) => value?.toString().trim() !== "");

  const ErrorMessage = ({ message }: { message: string | undefined }) => (
    <p className="absolute right-0 mt-1 text-color-red-200">{message}</p>
  );

  return (
    <div className="my-24 flex justify-center">
      <div className="flex flex-col items-center gap-8 pc:w-[640px] mobile-tablet:w-[372px]">
        <Image src={logo} width={400} height={400} alt="로고" />
        <form className="relative flex w-full flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
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
            <Button
              label="로그인"
              type="submit"
              disabled={!isFormValid}
              className="text-color-gray-50"
            />
          </div>
        </form>
        <div className="mb-10 flex justify-center pc:text-xl">
          <p className="mr-2 text-lg mobile-tablet:text-xs">
            아직 니가가라하와이 회원이 아니신가요?
          </p>
          <Link
            href="/signup"
            className="text-lg text-color-blue-300 underline mobile-tablet:text-xs"
          >
            이메일로 회원가입하기
          </Link>
        </div>
        <SocialLogin />
      </div>
    </div>
  );
}
