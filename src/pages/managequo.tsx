import Layout from "@/components/Common/Layout";
import SendQuotation from "@/components/Receive/SendQuotation";

export default function ManageQuo() {
  return (
    <>
      <div className="flex items-center pt-8 pb-4 relative">
        <p className="cursor-pointer text-xl font-semibold border-b-[3px] absolute border-black pb-4 bottom-0 left-0">
          보낸 견적 조회
        </p>
        <p className="cursor-pointer pl-[170px] text-xl font-semibold text-color-gray-400">반려된 견적</p>
      </div>
      <div className="h-0.5 pc:-mx-[260px] tablet:-mx-[72px] mobile:-mx-[24px] bg-color-line-200"></div>
      <div className="pc:grid pc:grid-cols-2 pc:gap-2 pt-10 mobile-tablet:grid-cols-none mobiel-tablet:felx mobile-tablet:flex-col mobiel-tablet:justify-center mobile-tablet:items-center ">
        <SendQuotation />
        <SendQuotation />
        <SendQuotation />
        <SendQuotation />
        <SendQuotation />
        <SendQuotation />
      </div>
    </>
  );
}
