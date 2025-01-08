import closeIcon from "@public/assets/icon_X.svg";
import Image from "next/image";
import { useState } from "react";

interface TypeCheckboxState {
  all: boolean;
  taste: boolean;
  shopping: boolean;
  rest: boolean;
  culture: boolean;
  activity: boolean;
  festival: boolean;
}

interface FilterCheckboxState {
  all: boolean;
  service_area: boolean;
  quote_request: boolean;
}

interface ModalFilterProps {
  closeModal: () => void;
}

export default function ModalFilter({ closeModal }: ModalFilterProps) {
  const [activeTab, setActiveTab] = useState<"type" | "filter">("type");
  const [typeCheckboxes, setTypeCheckboxes] = useState<TypeCheckboxState>({
    all: false,
    taste: false,
    shopping: false,
    rest: false,
    culture: false,
    activity: false,
    festival: false,
  });

  const [filterCheckboxes, setFilterCheckboxes] = useState<FilterCheckboxState>({
    all: false,
    service_area: false,
    quote_request: false,
  });

  const handleTypeAllCheck = (checked: boolean): void => {
    setTypeCheckboxes({
      all: checked,
      taste: checked,
      shopping: checked,
      rest: checked,
      culture: checked,
      activity: checked,
      festival: checked,
    });
  };

  const handleFilterAllCheck = (checked: boolean): void => {
    setFilterCheckboxes({
      all: checked,
      service_area: checked,
      quote_request: checked,
    });
  };

  const handleTypeSingleCheck = (id: keyof Omit<TypeCheckboxState, "all">, checked: boolean): void => {
    const newCheckboxes = {
      ...typeCheckboxes,
      [id]: checked,
    };

    const allChecked = Object.keys(newCheckboxes)
      .filter((key): key is keyof Omit<TypeCheckboxState, "all"> => key !== "all")
      .every((key) => newCheckboxes[key]);

    setTypeCheckboxes({
      ...newCheckboxes,
      all: allChecked,
    });
  };

  const handleFilterSingleCheck = (id: keyof Omit<FilterCheckboxState, "all">, checked: boolean): void => {
    const newCheckboxes = {
      ...filterCheckboxes,
      [id]: checked,
    };

    const allChecked = Object.keys(newCheckboxes)
      .filter((key): key is keyof Omit<FilterCheckboxState, "all"> => key !== "all")
      .every((key) => newCheckboxes[key]);

    setFilterCheckboxes({
      ...newCheckboxes,
      all: allChecked,
    });
  };

  const mainTabs = [
    { id: "type", label: "여행 유형" },
    { id: "filter", label: "필터" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center mobile:items-end ">
      <div className="bg-white rounded-2xl px-[24px] py-[16px] w-[375px] mobile:rounded-b-none mobile:pb-[32px]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "type" | "filter")}
                className={`text-lg font-medium px-4 py-2 ${
                  activeTab === tab.id
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <Image
            src={closeIcon}
            alt="닫기"
            width={36}
            height={36}
            onClick={closeModal}
            className="cursor-pointer"
          />
        </div>
        <div className="mt-[12px]">
          {activeTab === "type" ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center gap-2 border-b border-color-line-200 pb-[16px]">
                <label htmlFor="all">전체선택 (totalCount)</label>
                <input
                  type="checkbox"
                  id="all"
                  checked={typeCheckboxes.all}
                  onChange={(e) => handleTypeAllCheck(e.target.checked)}
                />
              </div>
              <div className="flex justify-between items-center gap-2 border-b border-color-line-200 pb-[16px]">
                <label htmlFor="taste">맛집 탐방형 (count)</label>
                <input
                  type="checkbox"
                  id="taste"
                  checked={typeCheckboxes.taste}
                  onChange={(e) => handleTypeSingleCheck("taste", e.target.checked)}
                />
              </div>
              <div className="flex justify-between  items-center gap-2 border-b border-color-line-200 pb-[16px]">
                <label htmlFor="shopping">기념품/쇼핑형 (count)</label>
                <input
                  type="checkbox"
                  id="shopping"
                  checked={typeCheckboxes.shopping}
                  onChange={(e) => handleTypeSingleCheck("shopping", e.target.checked)}
                />
              </div>
              <div className="flex justify-between items-center gap-2 border-b border-color-line-200 pb-[16px]">
                <label htmlFor="rest">휴양형 (count)</label>
                <input
                  type="checkbox"
                  id="rest"
                  checked={typeCheckboxes.rest}
                  onChange={(e) => handleTypeSingleCheck("rest", e.target.checked)}
                />
              </div>
              <div className="flex justify-between items-center gap-2 border-b border-color-line-200 pb-[16px]">
                <label htmlFor="culture">문화/역사탐방형 (count)</label>
                <input
                  type="checkbox"
                  id="culture"
                  checked={typeCheckboxes.culture}
                  onChange={(e) => handleTypeSingleCheck("culture", e.target.checked)}
                />
              </div>
              <div className="flex justify-between items-center gap-2 border-b border-color-line-200 pb-[16px]  ">
                <label htmlFor="activity">액티비티/탐험형 (count)</label>
                <input
                  type="checkbox"
                  id="activity"
                  checked={typeCheckboxes.activity}
                  onChange={(e) => handleTypeSingleCheck("activity", e.target.checked)}
                />
              </div>
              <div className="flex justify-between items-center gap-2 border-b border-color-line-200 pb-[16px]  ">
                <label htmlFor="festival">축제 참여형 (count)</label>
                <input
                  type="checkbox"
                  id="festival"
                  checked={typeCheckboxes.festival}
                  onChange={(e) => handleTypeSingleCheck("festival", e.target.checked)}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between items-center gap-2 border-b border-color-line-200 pb-[16px]">
                <label htmlFor="filter-all">전체선택 (totalCount)</label>
                <input
                  type="checkbox"
                  id="filter-all"
                  checked={filterCheckboxes.all}
                  onChange={(e) => handleFilterAllCheck(e.target.checked)}
                />
              </div>
              <div className="flex justify-between items-center gap-2 border-b border-color-line-200 pb-[16px]">
                <label htmlFor="service_area">서비스 가능 지역 (count)</label>
                <input
                  type="checkbox"
                  id="service_area"
                  checked={filterCheckboxes.service_area}
                  onChange={(e) => handleFilterSingleCheck("service_area", e.target.checked)}
                />
              </div>
              <div className="flex justify-between items-center gap-2 border-b border-color-line-200 pb-[16px]">
                <label htmlFor="quote_request">지정 견적 요청 (count)</label>
                <input
                  type="checkbox"
                  id="quote_request"
                  checked={filterCheckboxes.quote_request}
                  onChange={(e) => handleFilterSingleCheck("quote_request", e.target.checked)}
                />
              </div>
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-center">
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg w-full">조회하기</button>
        </div>
      </div>
    </div>
  );
}
