import Image from "next/image";
import google_icon from "@public/assets/icon_google.svg";
import kakao_icon from "@public/assets/icon_kakao.svg";
import naver_icon from "@public/assets/icon_naver.svg";
import authService from "@/services/authService";

const SocialLogin = () => {
  const handleSocialLogin = async (platform: "google" | "kakao" | "naver") => {
    try {
      let redirectUrl: string;

      switch (platform) {
        case "google":
          redirectUrl = await authService.googleLogin();
          break;
        case "kakao":
          redirectUrl = await authService.kakaoLogin();
          break;
        case "naver":
          redirectUrl = await authService.naverLogin();
          break;
        default:
          throw new Error("지원하지 않는 로그인 방식입니다.");
      }

      window.location.href = redirectUrl;
    } catch (error) {
      console.error(`${platform} 로그인 중 오류 발생`, error);
      alert(`${platform} 로그인에 실패했습니다. 다시 시도해주세요.`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-color-black-200 tablet:text-xs pc:text-xl">SNS 계정으로 간편 가입하기</h2>
      <div className="flex gap-4">
        <div onClick={() => handleSocialLogin("google")} className="cursor-pointer">
          <Image
            src={google_icon}
            alt="구글 아이콘"
            width={50}
            height={50}
            className="hover:scale-110"
          />
        </div>
        <div onClick={() => handleSocialLogin("kakao")} className="cursor-pointer">
          <Image
            src={kakao_icon}
            alt="카카오 아이콘"
            width={50}
            height={50}
            className="hover:scale-110"
          />
        </div>
        <div onClick={() => handleSocialLogin("naver")} className="cursor-pointer">
          <Image
            src={naver_icon}
            alt="네이버 아이콘"
            width={50}
            height={50}
            className="hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
