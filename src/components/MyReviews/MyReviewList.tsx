import ReviewCard from "@/components/MyReviews/Cards/ReviewCard";
import { Review } from "@/services/reviewService";

interface MyReviewListProps {
  reviews: Review[];
}

export default function MyReviewList({ reviews }: MyReviewListProps) {
  return (
    <>
      <div className="items-center justify-center gap-4 pc:grid pc:grid-cols-2 mobile-tablet:flex mobile-tablet:flex-col">
        {reviews.map((review) => (
          <ReviewCard key={review.id} reviewDetail={review} />
        ))}
      </div>
    </>
  );
}
