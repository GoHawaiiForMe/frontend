import Layout from "@/components/Common/Layout";
import Bubble from "@/components/Common/Bubble";
import Selector from "@/components/Common/Selector";
import Input from "@/components/Common/Input";
import { useState } from "react";

export default function PlanRequest() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceSelection = (type: string) => {
    setSelectedServices((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  return (
    <>
      <Layout bodyClass="bg-gray">
        <Bubble type="left">
          몇 가지 정보만 알려주시면 최대 5개의 플랜을 받을 수 있어요 &#59;&#41;
        </Bubble>
        <Bubble type="left">여행 종류를 선택해 주세요.</Bubble>
        {/* <Bubble type="right">오른쪽</Bubble> */}
        <Bubble type="right_select">
          <Input type="textarea" placeholder="Maker에게 부탁할 일을 자세하게 작성해주세요." />
          <p className="mb-4">복수 선택 가능합니다!</p>

          <Selector
            category="services"
            selectedTypes={selectedServices}
            toggleSelection={handleServiceSelection}
          />
          {selectedServices.includes("기념품형") && (
            <div className="mt-4">
              <button className="border w-full h-16 py-4 border-color-blue-300 text-color-blue-300 bold rounded-2xl">
                기념품 받을 도착지 선택하기
              </button>
            </div>
          )}
        </Bubble>
      </Layout>
    </>
  );
}
