import closeIcon from "@public/assets/icon_X.svg";
import Image from "next/image";
import { useState } from "react";

interface TypeCheckboxState {
  all: boolean;
  FOOD_TOUR: boolean;
  SHOPPING: boolean;
  RELAXATION: boolean;
  CULTURE: boolean;
  ACTIVITY: boolean;
  FESTIVAL: boolean;
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
    FOOD_TOUR: false,
    SHOPPING: false,
    RELAXATION: false,
    CULTURE: false,
    ACTIVITY: false,
    FESTIVAL: false,
  });

  const [filterCheckboxes, setFilterCheckboxes] = useState<FilterCheckboxState>({
    all: false,
    service_area: false,
    quote_request: false,
  });

  const handleTypeAllCheck = (checked: boolean): void => {
    setTypeCheckboxes({
      all: checked,
      FOOD_TOUR: checked,
      SHOPPING: checked,
      RELAXATION: checked,
      CULTURE: checked,
      ACTIVITY: checked,
      FESTIVAL: checked,
    });
  };

  const handleFilterAllCheck = (checked: boolean): void => {
    setFilterCheckboxes({
      all: checked,
      service_area: checked,
      quote_request: checked,
    });
  };

  const handleTypeSingleCheck = (
    id: keyof Omit<TypeCheckboxState, "all">,
    checked: boolean,
  ): void => {
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

  const handleFilterSingleCheck = (
    id: keyof Omit<FilterCheckboxState, "all">,
    checked: boolean,
  ): void => {
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

  const typeOptions = [
    { id: "FOOD_TOUR", label: "맛집 탐방형" },
    { id: "SHOPPING", label: "기념품/쇼핑형" },
    { id: "RELAXATION", label: "휴양형" },
    { id: "CULTURE", label: "문화/역사탐방형" },
    { id: "ACTIVITY", label: "액티비티/탐험형" },
    { id: "FESTIVAL", label: "축제 참여형" },
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
              {typeOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex justify-between items-center gap-2 border-b border-color-line-200 pb-[16px]"
                >
                  <label htmlFor={option.id}>{option.label} (count)</label>
                  <input
                    type="checkbox"
                    id={option.id}
                    checked={typeCheckboxes[option.id as keyof TypeCheckboxState]}
                    onChange={(e) =>
                      handleTypeSingleCheck(
                        option.id as keyof Omit<TypeCheckboxState, "all">,
                        e.target.checked,
                      )
                    }
                  />
                </div>
              ))}
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
