import Button from "./Button";
import { useRouter } from "next/router";
import Image from "next/image";
import luggage from "@public/assets/icon_luggage.svg";
import Layout from "./Layout";

export default function ConfirmedPlan({ onReset }: { onReset: () => void }) {
  const router = useRouter();

  const handleNewPlanRequest = () => {
    onReset();
    router.push("/plan-request");
  };

  const handleGoToSeePlans = () => {
    onReset();
    router.push("/mytrip-manage/ongoing-plan");
  };

  return (
    <>
      <Layout bodyClass="bg-gray">
        <div className="flex flex-col items-center justify-center h-screen text-center">
        <Image src={luggage} alt="캐리어 아이콘" width={500} />
        <div className="flex gap-4">
          <div>
            <Button
              label="새로운 여행 계획하기"
              className="px-5 text-color-gray-50"
              onClick={handleNewPlanRequest}
            />
          </div>
          <div>
            <Button
              label="신청한 여행 보러가기"
              className="px-5 text-color-gray-50"
              onClick={handleGoToSeePlans}
            />
          </div>
        </div>
        </div>
      </Layout>
    </>
  );
}
