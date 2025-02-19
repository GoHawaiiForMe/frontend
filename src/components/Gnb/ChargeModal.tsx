import ReceiveModalLayout from "../Receive/ReceiveModalLayout";
import Image from "next/image";
import coconut_icon from "@public/assets/icon_coconut.svg";
import * as PortOne from "@portone/browser-sdk/v2";
import { FormEventHandler, useState } from "react";
import { randomId } from "@/utils/random";
import chargeService from "@/services/chargeService";
import useAuthStore from "@/stores/useAuthStore";

export type Item = {
  name: string;
  amount: number;
  currency: string;
};

export type PaymentFormProps = {
  storeId: string;
  channelKey: string;
  completePaymentAction: (paymentId: string) => Promise<PaymentStatus>;
};

export type PaymentStatus = {
  status: string;
  message?: string;
};

export default function ChargeModal({
  coconut,
  setIsChargeModalOpen,
}: {
  coconut: number;
  setIsChargeModalOpen: (isOpen: boolean) => void;
}) {
  const { nickName, email, phoneNumber } = useAuthStore();
  const [amount, setAmount] = useState<number | "">("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    status: "IDLE",
  });

  const handleClose = () => {
    setPaymentStatus({
      status: "IDLE",
    });
    if (paymentStatus.status === "PAID") {
      setIsChargeModalOpen(false);
    }
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (Number(amount) < 10) {
      setPaymentStatus({
        status: "FAILED",
        message: "최소 10개 이상부터 충전 가능합니다.",
      });
      return;
    }
    if (Number(amount) <= 0) {
      setPaymentStatus({
        status: "FAILED",
        message: "충전 금액을 입력해주세요.",
      });
      return;
    }
    const paymentId = randomId();
    const payId = await chargeService.createPayment(Number(amount) * 100, paymentId);

    setPaymentStatus({
      status: "PENDING",
    });

    const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID;
    const CHANNEL_KEY = process.env.NEXT_PUBLIC_CHANNEL_KEY;

    if (!STORE_ID || !CHANNEL_KEY) {
      throw new Error("Missing store ID or channel key");
    }

    const payment = await PortOne.requestPayment({
      storeId: STORE_ID,
      channelKey: CHANNEL_KEY,
      paymentId,
      orderName: "포인트 충전",
      totalAmount: Number(amount) * 100,
      currency: "CURRENCY_KRW",
      payMethod: "CARD",
      customer: {
        fullName: nickName,
        email: email || "user@example.com",
        phoneNumber: phoneNumber || "01012341234",
      },
      customData: {
        amount: amount,
      },
    });

    if (payment == null || payment?.code != null) {
      setPaymentStatus({
        status: "FAILED",
        message: payment?.message,
      });
      return;
    }

    try {
      const res: { status: string } = await chargeService.completePayment(payId);
      setPaymentStatus({
        status: res.status,
        message: "결제가 완료되었습니다.",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const isWaitingPayment = paymentStatus.status !== "IDLE";
  console.log('상태메세지',paymentStatus);
  return (
    <>
      <ReceiveModalLayout label="코코넛 충전" closeModal={() => setIsChargeModalOpen(false)}>
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-8 p-4">
          <div className="flex flex-col gap-4">
            <p className="semibold text-lg">현재 보유중인 코코넛</p>
            <div className="flex items-center gap-2">
              <Image src={coconut_icon} alt="코코넛" width={32} height={32} />
              <p className="text-2xl bold">{coconut}개</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="semibold text-lg">충전할 코코넛</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => {
                    const value = e.target.value === "" ? "" : Number(e.target.value);
                    if (value === "" || Number(value) >= 0) {
                      if (Number(value) > 10000) {
                        setAmount(10000);
                        setShowError(true);
                        setErrorMessage("최대 10,000개까지만 충전 가능합니다.");
                        setTimeout(() => {
                          setShowError(false);
                        }, 2000);
                        return;
                      }
                      setAmount(value);
                      setShowError(false);
                    }
                  }}
                  onBlur={() => {
                    if (amount !== "" && Number(amount) < 10) {
                      setShowError(true);
                      setErrorMessage("최소 10개 이상부터 충전 가능합니다.");
                    } else {
                      setShowError(false);
                    }
                  }}
                  min="10"
                  max="10000"
                  placeholder="코코넛 갯수 입력 (10~10,000개)"
                  className={`w-[288px] rounded-lg border ${
                    showError ? "border-red-500" : "border-color-gray-200"
                  } px-4 py-3 text-lg focus:border-color-blue-300 focus:outline-none mobile:w-full`}
                />
                <span className="text-lg">개</span>
              </div>
              {showError && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="semibold text-lg">충전 갯수</p>
            <div className="flex items-center gap-2">
              <p className="semibold text-md">{amount ? amount.toLocaleString() : 0}개 /</p>
              <p className="text-xl bold text-color-blue-300">
                {amount ? (amount * 100).toLocaleString() : 0}원
              </p>
            </div>
          </div>
          <button
            type="submit"
            aria-busy={isWaitingPayment}
            disabled={isWaitingPayment}
            className="semibold w-full rounded-lg bg-color-blue-300 py-4 text-lg text-white hover:bg-color-blue-200"
          >
            충전하기
          </button>
        </form>

        {(paymentStatus.status === "FAILED" || paymentStatus.status === "PAID") && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-80 rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl bold">
                {paymentStatus.status === "FAILED" ? "결제 실패" : "결제 성공"}
              </h2>
              <p className="mb-6 text-gray-600">
                {paymentStatus.status === "FAILED" ? paymentStatus.message : "결제에 성공했습니다."}
              </p>
              <button
                onClick={handleClose}
                className="w-full rounded-lg bg-color-blue-300 py-2 text-white hover:bg-color-blue-200"
              >
                확인
              </button>
            </div>
          </div>
        )}
      </ReceiveModalLayout>
    </>
  );
}
