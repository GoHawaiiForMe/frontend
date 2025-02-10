import QuotationCard from "./Cards/QuotationCard";
import { QuotationServiceDreamer } from "@/services/quotationServiceDreamer";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

export default function QuotationCardList() {
  const router = useRouter();
  const { id } = router.query;

  const { data: quotations } = useQuery({
    queryKey: ["Quotations", id],
    queryFn: () => QuotationServiceDreamer.getQuotations({ planId: id as string }),
    enabled: !!id,
  });

  return (
    <>
      <div className="items-center justify-center gap-4 pc:grid pc:grid-cols-2 mobile-tablet:flex mobile-tablet:flex-col">
        {quotations?.list && quotations.list.length > 0 ? (
          quotations.list.map((quotation) => (
            <QuotationCard key={quotation.id} quotationDetail={quotation} />
          ))
        ) : (
          <div className="text-center text-xl text-color-gray-500">
            아직 견적이 없어요! 지정견적요청을 해보세요!
          </div>
        )}
      </div>
    </>
  );
}
