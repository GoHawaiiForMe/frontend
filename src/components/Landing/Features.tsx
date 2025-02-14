import FeatureCard from "./FeatureCard";

const featureData = [
  {
    imageUrl: "https://images.unsplash.com/photo-1542259009477-d625272157b7",
    title: "완벽한 대리 여행",
    description: "원하시는 모든 하와이의 아름다운 순간을 담아드립니다",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f",
    title: "실시간 공유",
    description: "특별한 순간을 실시간으로 전달받아 현장의 감동을 느껴보세요",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1598135753163-6167c1a1ad65",
    title: "특별한 경험",
    description: "현지에서만 경험할 수 있는 특별한 순간을 선사해드립니다",
  },
];

export default function Features() {
  return (
    <div className="md:grid-cols-3 mt-20 grid grid-cols-1 gap-10 px-4">
      {featureData.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
}
