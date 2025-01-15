import { useMemo } from "react";

interface ReviewGraphProps {
  reviewStats: {
    [key: number]: number;
  };
}

export default function ReviewGraph({ reviewStats }: ReviewGraphProps) {
  const totalReviews = useMemo(() => {
    return Object.values(reviewStats).reduce((acc, curr) => acc + curr, 0);
  }, [reviewStats]);

  return (
    <div className="flex flex-col gap-2 w-[400px]">
      {[5, 4, 3, 2, 1].map((score) => (
        <div key={score} className="flex items-center gap-[30px]">
          <span className="w-8 text-xl font-bold">{score}점</span>
          <div className="flex-1 h-[8px] bg-color-background-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-color-yellow-100 rounded-full transition-all duration-300"
              style={{
                width: `${(reviewStats[score] / totalReviews) * 100}%`
              }}
            />
          </div>
          <span className="w-8 text-right text-xl font-bold text-color-gray-300">{reviewStats[score]}</span>
        </div>
      ))}
    </div>
  );
}