import ReviewCard from "@/components/MyReviews/Cards/ReviewCard";
import { Review } from "@/services/reviewService";
import { useEffect, useState } from "react";
interface MyReviewListProps {
  reviews: Review[];
}

export default function MyReviewList({ reviews }: MyReviewListProps) {
  //1440px이하부터 타블렛 디자인으로 변경
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1440);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className={`grid gap-4 ${isTablet ? "grid-cols-1" : "grid-cols-2"} pc:grid`}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} reviewDetail={review} />
        ))}
      </div>
    </>
  );
}
