import Image from "next/image";
import logo from "@public/assets/icon_logo_img_remove.png";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-20">
      <Image
        src={logo}
        width={400}
        height={400}
        alt="로고"
        className="mb-8 drop-shadow-2xl transition-transform duration-300 hover:scale-105"
      />

      <h1 className="md:text-7xl text-center text-5xl font-bold tracking-tight text-black drop-shadow-lg">
        시간이 없어도 괜찮아요
      </h1>

      <p className="md:text-3xl max-w-3xl text-center text-xl font-light leading-relaxed text-black drop-shadow-md">
        당신을 대신해 여행하고,
        <br />
        특별한 순간들을 공유해드립니다
      </p>
    </div>
  );
}
