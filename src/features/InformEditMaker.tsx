import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Common/Input";
import React from "react";
import { editDreamerSchema, EditDreamerData } from "@/utils/validate";
import Button from "@/components/Common/Button";
// import useAuthStore from "@/stores/useAuthStore";

export default function InformEditMaker() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditDreamerData>({
    resolver: zodResolver(editDreamerSchema),
    mode: "onBlur",
  });
  // zustand로 가져오기
  // const { isLoggedIn, nickName, role } = useAuthStore();
  // const [userData, setUserData] = useState(null);

  // useEffect(() => {
  // if (isLoggedIn) {
  // 로그인된 사용자 정보로 API 호출
  //   fetch(`/api/user/${id}`)
  //   }
  // }, [isLoggedIn]);

  const onSubmit = (data: EditDreamerData) => {
    console.log(data); // 테스트용
  };

  const watchFields = watch();
  const isFormValid = Object.values(watchFields).every((value) => value?.toString().trim() !== "");

  const ErrorMessage = ({ message }: { message: string | undefined }) => (
    <p className="text-color-red-200 mt-1 absolute right-0">{message}</p>
  );

  return (
    <>
      <h1 className="text-3xl semibold mt-16">기본정보 수정</h1>
      <div className="h-0.5 bg-color-line-100 my-8"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid pc:grid-cols-2 pc:gap-16  w-full mobile-tablet:flex mobile-tablet:flex-col mobile-tablet:gap-4">
          <div className="flex flex-col gap-4">
            <div>
              <Input
                type="text"
                label="닉네임"
                placeholder="기존 닉네임"
                {...register("nickName")}
                error={!!errors.nickName}
                className="bg-color-background-200 border-0 text-color-gray-300"
              />
              {errors.nickName && <ErrorMessage message={errors.nickName.message} />}
            </div>
            <div className="h-0.5 bg-color-line-100 my-4"></div>

            <div>
              <Input
                type="text"
                label="이메일"
                placeholder="저장된 이메일 들어가야함"
                className="bg-color-background-200 border-0 text-color-gray-300"
              />
            </div>
            <div className="h-0.5 bg-color-line-100 my-4"></div>

            <div className="mb-16 mobile-tablet:m-0">
              <Input
                type="text"
                label="전화번호"
                placeholder="숫자만 입력해주세요"
                {...register("phoneNumber")}
                error={!!errors.phoneNumber}
                className="bg-color-background-200 border-0 text-color-gray-300"
              />
              {errors.phoneNumber && <ErrorMessage message={errors.phoneNumber.message} />}
            </div>
            <div className="h-0.5 bg-color-line-100"></div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <Input
                type="password"
                label="현재 비밀번호"
                placeholder="현재 비밀번호를 입력해 주세요"
                className="bg-color-background-200 border-0 text-color-gray-300"
              />
            </div>
            <div className="h-0.5 bg-color-line-100 my-4"></div>
            <div>
              <Input
                type="password"
                label="새 비밀번호"
                placeholder="비밀번호를 입력해 주세요"
                className="bg-color-background-200 border-0 text-color-gray-300"
                {...register("password")}
                error={!!errors.password}
              />
              {errors.password && <ErrorMessage message={errors.password.message} />}
            </div>
            <div className="h-0.5 bg-color-line-100 my-4"></div>
            <div className="mb-16">
              <Input
                type="password"
                label="새 비밀번호 확인"
                placeholder="비밀번호를 다시 한번 입력해 주세요"
                className="bg-color-background-200 border-0 text-color-gray-300 "
                {...register("newConfirmPassword")}
                error={!!errors.newConfirmPassword}
              />
            </div>
            {errors.newConfirmPassword && <ErrorMessage message={errors.newConfirmPassword.message} />}
          </div>
        </div>
        <div className="grid pc:grid-cols-2 gap-8 pb-16 mobile-tablet:flex mobile-tablet:flex-col mobile-tablet:gap-4">
          <Button
            type="button"
            label="취소"
            className="bg-color-gray-50 border border-color-blue-300 text-color-blue-300 bold mobile-tablet:order-2"
          />
          <Button
            type="submit"
            label="수정하기"
            disabled={!isFormValid}
            className="mobile-tablet:order-1 text-white"
          />
        </div>
      </form>
    </>
  );
}
