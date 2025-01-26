import { useQuery } from "@tanstack/react-query";
import SendQuotation from "@/components/Receive/SendQuotation";
import { getQuotations } from "@/services/quotationService";
import Link from "next/link";

export default function ManageQuo() {
  const { data, isLoading } = useQuery({
    queryKey: ["quotations"],
    queryFn: () => getQuotations({ isSent: true }),
  });

  if (isLoading) {
    return <div>견적 목록 로딩 중...</div>;
  }

  return (
    <>
      <div className="relative flex items-center pb-4 pt-8">
        <Link href="/managequo">
          <p className="absolute bottom-0 left-0 cursor-pointer border-b-[3px] border-black pb-4 text-xl font-semibold">
            보낸 견적 조회
          </p>
        </Link>
        <Link href="/rejectlist">
          <p className="cursor-pointer pl-[170px] text-xl font-semibold text-color-gray-400">
            반려된 견적
          </p>
        </Link>
      </div>
      <div className="h-0.5 bg-color-line-200 mobile:-mx-[24px] tablet:-mx-[72px] pc:-mx-[260px]"></div>
      <div className="mobiel-tablet:felx mobiel-tablet:justify-center pt-10 pc:grid pc:grid-cols-2 pc:gap-2 mobile-tablet:grid-cols-none mobile-tablet:flex-col mobile-tablet:items-center">
        {data?.list.map((item) => <SendQuotation key={item.id} data={item} />)}
      </div>
    </>
  );
}
