import Image from "next/image";
import clipshare from "@public/assets/icon_outline.png";
import facebook from "@public/assets/icon_facebook.png";
import kakao from "@public/assets/icon_kakao.png";

interface ShareSNSProps {
  onCopyUrl: () => void;
  onKakaoShare: () => void;
  onFacebookShare: () => void;
}

export default function ShareSNS({ onCopyUrl, onKakaoShare, onFacebookShare }: ShareSNSProps) {
  return (
    <>
      <Image
        src={clipshare}
        alt="clipshare"
        onClick={onCopyUrl}
        className="cursor-pointer rounded-[16px] shadow-md mobile-tablet:h-[40px] mobile-tablet:w-[40px]"
        width={64}
        height={64}
      />
      <Image
        src={kakao}
        alt="kakao"
        id="kakaotalk-sharing-btn"
        onClick={onKakaoShare}
        className="cursor-pointer rounded-[16px] shadow-md mobile-tablet:h-[40px] mobile-tablet:w-[40px]"
        width={64}
        height={64}
      />
      <Image
        src={facebook}
        alt="facebook"
        id="facebook-sharing-btn"
        onClick={onFacebookShare}
        className="cursor-pointer rounded-[16px] shadow-md mobile-tablet:h-[40px] mobile-tablet:w-[40px]"
        width={64}
        height={64}
      />
    </>
  );
}
