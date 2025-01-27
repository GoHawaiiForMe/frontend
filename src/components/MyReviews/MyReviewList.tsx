import ReviewCard from "./Cards/ReviewCard";

export default function MyReviewList() {
  return (
    <>
      <div className="items-center justify-center gap-4 pc:grid pc:grid-cols-2 mobile-tablet:flex mobile-tablet:flex-col">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </>
  );
}
