import Button from "./Button";

export default function ConfirmedPlan() {
  return (
    <>
      <div className="flex gap-2">
        <div>
          <Button label="새로운 여행 계획하기" className="text-color-gray-50" />
        </div>
        <div>
          <Button label="신청한 여행 보러가기" className="text-color-gray-50" />
        </div>
      </div>
    </>
  );
}
