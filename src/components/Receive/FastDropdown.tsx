import Image from "next/image";
import { useState } from "react";
import arrowDown from "@public/assets/icon_arrowdown.png";

export default function FastDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-[12px] px-4 py-2 rounded-lg"
      >
        일정 빠른순
        <Image src={arrowDown} alt="dropdown" width={20} height={20} />
      </button>

      {isOpen && (
        <ul className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">일정 빠른순</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">최근 요청순</li>
        </ul>
      )}
    </div>
  );
}
