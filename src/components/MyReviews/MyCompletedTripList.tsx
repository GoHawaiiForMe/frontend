import TripCard from "@/components/MyReviews/Cards/TripCard";
import { Plan } from "@/services/planService";
import { useEffect, useState } from "react";

interface CompletedPlanListProps {
  plans: Plan[];
}

export default function MyCompletedTripList({ plans }: CompletedPlanListProps) {
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
        {plans.map((plan) => (
          <TripCard key={plan.id} planDetail={plan} />
        ))}
      </div>
    </>
  );
}
