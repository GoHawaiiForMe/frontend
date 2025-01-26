import React, { useState, useEffect } from "react";
import { PlanResponse } from "@/services/RequestService";
import { useQueryClient } from "@tanstack/react-query";

interface TypeCheckboxState {
  all: boolean;
  FOOD_TOUR: boolean;
  SHOPPING: boolean;
  RELAXATION: boolean;
  CULTURE: boolean;
  ACTIVITY: boolean;
  FESTIVAL: boolean;
}

interface CheckFilterProps {
  data: PlanResponse | undefined;
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  onFilterChange?: (selectedTypes: string[]) => void;
}

const CheckFilter: React.FC<CheckFilterProps> = ({ data, setSelectedTypes, onFilterChange }) => {
  const queryClient = useQueryClient();

  const [typeCheckboxes, setTypeCheckboxes] = useState<TypeCheckboxState>({
    all: true,
    FOOD_TOUR: true,
    SHOPPING: true,
    RELAXATION: true,
    CULTURE: true,
    ACTIVITY: true,
    FESTIVAL: true,
  });

  useEffect(() => {
    const allTypes = ["FOOD_TOUR", "SHOPPING", "RELAXATION", "CULTURE", "ACTIVITY", "FESTIVAL"];
    setSelectedTypes(allTypes);
    if (onFilterChange) {
      onFilterChange(allTypes);
    }
  }, [setSelectedTypes, onFilterChange]);

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

    setSelectedTypes(newSelectedTypes);
    setTypeCheckboxes(newCheckboxes);

    queryClient.invalidateQueries({
      queryKey: ["receiveRequest", { isAssigned: true, tripType: newSelectedTypes }],
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

    const newSelectedTypes = Object.entries(newCheckboxes)
      .filter(([key, value]) => key !== "all" && value)
      .map(([key]) => key);

    setSelectedTypes(newSelectedTypes);
    setTypeCheckboxes({
      ...newCheckboxes,
      all: Object.values(newCheckboxes).every((value) => value),
    });

    queryClient.invalidateQueries({
      queryKey: ["receiveRequest", { isAssigned: true, tripType: newSelectedTypes }],
    });
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
    <div className="hidden w-[328px] pc:block">
      <div className="mb-[24px]">
        <div className="my-[24px] flex items-center justify-between border-b border-color-line-200 px-[13.5px] py-[16px]">
          <p className="whitespace-nowrap text-[20px] font-medium leading-8">여행 유형</p>
          <div className="flex items-center gap-[12px]">
            <input
              className="h-[20px] w-[20px]"
              type="checkbox"
              id="all"
              checked={typeCheckboxes.all}
              onChange={(e) => handleTypeAllCheck(e.target.checked)}
            />
            <p className="whitespace-nowrap text-[18px] font-normal leading-[26px]">전체 선택</p>
          </div>
        </div>
        {typeOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-center justify-between border-b border-color-line-200 px-[16px] py-[21px]"
          >
            <label
              className="whitespace-nowrap text-[18px] font-medium leading-[26px]"
              htmlFor={option.id}
            >
              {`${option.label} (${data?.groupByCount.find((count) => count.tripType === option.id)?.count || "0"})`}
            </label>
            <input
              className="h-[20px] w-[20px]"
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
  );
};

export default CheckFilter;
