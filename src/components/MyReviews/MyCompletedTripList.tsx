import TripCard from "./Cards/TripCard";

export default function MyCompletedTripList() {
  return (
    <>
      <div className="items-center justify-center gap-4 pc:grid pc:grid-cols-2 mobile-tablet:flex mobile-tablet:flex-col">
        <TripCard />
        <TripCard />
        <TripCard />
        <TripCard />
        <TripCard />
        <TripCard />
      </div>
    </>
  );
}
