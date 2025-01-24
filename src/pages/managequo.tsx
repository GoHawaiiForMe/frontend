import SendQuotation from "@/components/Receive/SendQuotation";

export default function ManageQuo() {
  return (
    <>
      <div className="relative flex items-center pb-4 pt-8">
        <p className="absolute bottom-0 left-0 cursor-pointer border-b-[3px] border-black pb-4 text-xl font-semibold">
          보낸 견적 조회
        </p>
        <p className="cursor-pointer pl-[170px] text-xl font-semibold text-color-gray-400">
          반려된 견적
        </p>
      </div>
      <div className="h-0.5 bg-color-line-200 mobile:-mx-[24px] tablet:-mx-[72px] pc:-mx-[260px]"></div>
      <div className="mobiel-tablet:felx mobiel-tablet:justify-center pt-10 pc:grid pc:grid-cols-2 pc:gap-2 mobile-tablet:grid-cols-none mobile-tablet:flex-col mobile-tablet:items-center">
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
