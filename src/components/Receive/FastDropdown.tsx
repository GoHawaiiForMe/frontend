import Image from "next/image";
import { useState } from "react";
import arrowDown from "@public/assets/icon_arrowdown.png";

interface FastDropdownProps {
  onSort: (orderBy: "RECENT" | "SCHEDULE_FIRST") => void;
  currentSort: "RECENT" | "SCHEDULE_FIRST";
}

export default function FastDropdown({ onSort, currentSort }: FastDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getSortText = (sort: "RECENT" | "SCHEDULE_FIRST") => {
    return sort === "RECENT" ? "최근 요청순" : "일정 빠른순";
  };

  const handleSort = (orderBy: "RECENT" | "SCHEDULE_FIRST") => {
    onSort(orderBy);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-[12px] rounded-lg px-4 py-2 font-semibold"
      >
        {getSortText(currentSort)}
        <Image src={arrowDown} alt="dropdown" width={20} height={20} />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white shadow">
          <li
            className="cursor-pointer font-semibold px-4 py-2 hover:bg-gray-100"
            onClick={() => handleSort("SCHEDULE_FIRST")}
          >
            일정 빠른순
          </li>
          <li
            className="cursor-pointer font-semibold px-4 py-2 hover:bg-gray-100"
            onClick={() => handleSort("RECENT")}
          >
            최근 요청순
          </li>
        </ul>
      )}
    </div>
  );
}
