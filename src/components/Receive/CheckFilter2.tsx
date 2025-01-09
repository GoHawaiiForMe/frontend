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
export default function CheckFilter() {
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

  const filterOptions = [
    { id: "service_area", label: "서비스 가능 지역" },
    { id: "quote_request", label: "지정 견적 요청" },
  ];

  return (
    <>
      <div className="mt-[12px] hidden pc:block">
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b border-color-line-200 px-[13.5px] py-[16px] my-[24px]">
            <p className="text-[20px] font-medium leading-8 whitespace-nowrap">여행 유형</p>
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
          <div className="flex flex-col justify-between items-center gap-2 border-b border-color-line-200 pb-[16px]">
            {filterOptions.map((option) => (
              <div
                key={option.id}
                className="flex  justify-between items-center gap-2 border-b border-color-line-200 pb-[16px]"
              >
                <label htmlFor={option.id}>{option.label} (count)</label>
                <input
                  type="checkbox"
                  id={option.id}
                  checked={filterCheckboxes[option.id as keyof FilterCheckboxState]}
                  onChange={(e) =>
                    handleFilterSingleCheck(
                      option.id as keyof Omit<FilterCheckboxState, "all">,
                      e.target.checked,
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
