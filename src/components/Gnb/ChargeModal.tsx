import ReceiveModalLayout from "../Receive/ReceiveModalLayout";
import Image from "next/image";
import coconut_icon from "@public/assets/icon_coconut.svg";
import { useState } from "react";

export default function ChargeModal({
  coconut,
  isChargeModalOpen,
  setIsChargeModalOpen,
}: {
  coconut: number;
  isChargeModalOpen: boolean;
  setIsChargeModalOpen: (isOpen: boolean) => void;
}) {
  const [amount, setAmount] = useState<number | "">("");

  return (
    <>
      <ReceiveModalLayout label="코코넛 충전" closeModal={() => setIsChargeModalOpen(false)}>
        <div className="mt-3 flex flex-col gap-8 p-4">
          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold">현재 보유중인 코코넛</p>
            <div className="flex items-center gap-2">
              <Image src={coconut_icon} alt="코코넛" width={32} height={32} />
              <p className="text-2xl font-bold">{coconut}개</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold">충전할 코코넛</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                min="1"
                placeholder="코코넛 갯수 입력"
                className="w-[288px] mobile:w-full rounded-lg border border-color-gray-200 px-4 py-3 text-lg focus:border-color-blue-300 focus:outline-none"
              />
              <span className="text-lg">개</span>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <p className="text-lg font-semibold">충전 갯수</p>
            <p className="text-lg font-semibold">{amount ? amount.toLocaleString() : 0}개</p>
          </div>
          <button className="w-full rounded-lg bg-color-blue-300 py-4 text-lg font-semibold text-white hover:bg-color-blue-200">
            충전하기
          </button>
        </div>
      </ReceiveModalLayout>
    </>
  );
}
