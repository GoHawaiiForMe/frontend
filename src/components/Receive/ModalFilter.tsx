import React, { useState } from "react";
import Image from "next/image";
import closeIcon from "@public/assets/icon_X.svg";
import { PlanResponse } from "@/services/RequestService";

interface ModalFilterProps {
  closeModal: () => void;
  data: PlanResponse | undefined;
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

interface TypeCheckboxState {
  all: boolean;
  FOOD_TOUR: boolean;
  SHOPPING: boolean;
  RELAXATION: boolean;
  CULTURE: boolean;
  ACTIVITY: boolean;
  FESTIVAL: boolean;
}

export default function ModalFilter({
  closeModal,
  data,
  selectedTypes,
  setSelectedTypes,
}: ModalFilterProps) {
  const [tempSelectedTypes, setTempSelectedTypes] = useState<string[]>(selectedTypes);
  const [typeCheckboxes, setTypeCheckboxes] = useState<TypeCheckboxState>({
    all: selectedTypes.length === 6,
    FOOD_TOUR: selectedTypes.includes("FOOD_TOUR"),
    SHOPPING: selectedTypes.includes("SHOPPING"),
    RELAXATION: selectedTypes.includes("RELAXATION"),
    CULTURE: selectedTypes.includes("CULTURE"),
    ACTIVITY: selectedTypes.includes("ACTIVITY"),
    FESTIVAL: selectedTypes.includes("FESTIVAL"),
  });

  const handleTypeAllCheck = (checked: boolean): void => {
    const newCheckboxes = {
      all: checked,
      FOOD_TOUR: checked,
      SHOPPING: checked,
      RELAXATION: checked,
      CULTURE: checked,
      ACTIVITY: checked,
      FESTIVAL: checked,
    };

    const newSelectedTypes = checked
      ? Object.keys(newCheckboxes).filter((key) => key !== "all")
      : [];

    setTempSelectedTypes(newSelectedTypes);
    setTypeCheckboxes(newCheckboxes);
  };

  const handleTypeSingleCheck = (
    id: keyof Omit<TypeCheckboxState, "all">,
    checked: boolean,
  ): void => {
    const newCheckboxes = {
      ...typeCheckboxes,
      [id]: checked,
    };

    const newSelectedTypes = Object.entries(newCheckboxes)
      .filter(([key, value]) => key !== "all" && value)
      .map(([key]) => key);

    setTempSelectedTypes(newSelectedTypes);
    setTypeCheckboxes({
      ...newCheckboxes,
      all: Object.values(newCheckboxes).every((value) => value),
    });
  };

  const handleApplyFilter = () => {
    setSelectedTypes(tempSelectedTypes);
    closeModal();
  };

  const typeOptions = [
    { id: "FOOD_TOUR", label: "맛집 탐방형" },
    { id: "SHOPPING", label: "기념품/쇼핑형" },
    { id: "RELAXATION", label: "휴양형" },
    { id: "CULTURE", label: "문화/역사탐방형" },
    { id: "ACTIVITY", label: "액티비티/탐험형" },
    { id: "FESTIVAL", label: "축제 참여형" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mobile:items-end">
      <div className="w-[375px] rounded-2xl bg-white px-[24px] py-[16px] mobile:rounded-b-none mobile:pb-[32px]">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-4">
            <button className="border-b-2 border-blue-500 px-4 py-2 text-lg font-medium text-blue-500">
              여행 유형
            </button>
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
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 border-b border-color-line-200 pb-[16px]">
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
                className="flex items-center justify-between gap-2 border-b border-color-line-200 pb-[16px]"
              >
                <label htmlFor={option.id}>
                  {option.label} (
                  {data?.groupByCount.find((count) => count.tripType === option.id)?.count || "0"})
                </label>
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
        </div>
        <div className="mt-6 flex justify-center">
          <button
            className="w-full rounded-lg bg-blue-500 px-8 py-3 text-white"
            onClick={handleApplyFilter}
          >
            조회하기
          </button>
        </div>
      </div>
    </div>
  );
}
