import Button from "./Button";
import { useRouter } from "next/router";

export default function ConfirmedPlan({ onReset }: { onReset: () => void }) {
  const router = useRouter();

  const handleNewPlanRequest = () => {
    onReset();
    router.push("/plan-request");
  };

  const handleGoToSeePlans = () => {
    onReset();
    console.log("이동할 페이지 넣기"); //임시
  };

  return (
    <>
      <div className="flex gap-2">
        <div>
          <Button
            label="새로운 여행 계획하기"
            className="text-color-gray-50"
            onClick={handleNewPlanRequest}
          />
        </div>
        <div>
          <Button
            label="신청한 여행 보러가기"
            className="text-color-gray-50"
            onClick={handleGoToSeePlans}
          />
        </div>
      </div>
    </>
  );
}
