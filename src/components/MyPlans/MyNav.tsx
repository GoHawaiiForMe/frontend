export default function MyNav() {
  return (
    <div className="flex gap-[32px] text-color-gray-400 text-xl semibold mobile-tablet:gap-[24px]">
      <button>진행 중인 플랜</button>
      <button>종료된 플랜</button>
      <button>만료된 플랜</button>
    </div>
  );
}
