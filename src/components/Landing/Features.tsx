import FeatureCard from "./FeatureCard";
import img4 from "@public/assets/Landing-img/img_featuer_04.jpg";
import img_sp2 from "@public/assets/Landing-img/img_sp_02.jpg";


const featureData = [
  {
    imageUrl: "https://images.unsplash.com/photo-1542259009477-d625272157b7",
    title: "완벽한 대리 여행",
    description: "원하시는 모든 여행의 아름다운 순간을 담아드립니다",
  },
  {
    imageUrl: img4,
    title: "실시간 공유",
    description: "특별한 순간을 실시간으로 전달받아 현장의 감동을 느껴보세요",
  },
  {
    imageUrl: img_sp2,
    title: "특별한 경험",
    description: "현지에서만 경험할 수 있는 특별한 순간을 선사해드립니다",
  },
];

export default function Features() {
  return (
    <div className="container mx-auto px-4 w-full max-w-[1200px]">
      <div className="flex justify-center gap-6 mobile-tablet:flex-col mobile-tablet:items-center">
        {featureData.map((feature, index) => (
          <div key={index} className="w-full">
            <FeatureCard {...feature} />
          </div>
        ))}
      </div>
    </div>
  );
}
