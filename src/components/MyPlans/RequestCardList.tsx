import RequestCard from "./Cards/RequestCard";

export default function RequestCardList() {
  return (
    <>
      <div className="pc:grid pc:grid-cols-2 mobile-tablet:flex mobile-tablet:flex-col gap-4 justify-center items-center">
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
      </div>
    </>
  );
}
