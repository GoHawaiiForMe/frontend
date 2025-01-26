import RequestCard from "./Cards/RequestCard";

export default function RequestCardList() {
  return (
    <>
      <div className="items-center justify-center gap-4 pc:grid pc:grid-cols-2 mobile-tablet:flex mobile-tablet:flex-col">
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
      </div>
    </>
  );
}
