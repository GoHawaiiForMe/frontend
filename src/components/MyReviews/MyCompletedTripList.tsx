import TripCard from "./Cards/TripCard";
import { Plan } from "@/services/planService";

interface CompletedPlanListProps {
  plans: Plan[];
}

export default function MyCompletedTripList({ plans }: CompletedPlanListProps) {
  return (
    <>
      <div className="items-center justify-center gap-4 pc:grid pc:grid-cols-2 mobile-tablet:flex mobile-tablet:flex-col">
        {plans.map((plan) => (
          <TripCard key={plan.id} planDetail={plan} />
        ))}
      </div>
    </>
  );
}
