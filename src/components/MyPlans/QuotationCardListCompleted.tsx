import { QuotationServiceDreamer } from "@/services/quotationServiceDreamer";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Plan } from "@/services/planService";
import QuotationCardCompleted from "./Cards/QuotationCardCompleted";
import Image from "next/image";
import loading from "@public/assets/icon_loading.gif";

interface PlanData {
  planDetail: Plan;
}

export default function QuotationCardListCompleted({ planDetail }: PlanData) {
  const router = useRouter();
  const { id } = router.query;

  const { data: quotations, isLoading } = useQuery({
    queryKey: ["Quotations", id],
    queryFn: () => QuotationServiceDreamer.getQuotations({ planId: id as string }),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Image src={loading} alt="로딩 중" />
      </div>
    );
  }

  if (!quotations?.list || quotations.list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-xl text-color-gray-500">
        <p>아직 받은 견적이 없어요!</p>
        <br />
        <p>지정견적요청을 해보세요!</p>
      </div>
    );
  }

  return (
    <div className="lg:grid-cols-2 grid w-full grid-cols-1 items-center justify-center gap-4 mobile-tablet:flex mobile-tablet:flex-col">
      {quotations.list.map((quotation) => (
        <QuotationCardCompleted
          key={quotation.id}
          quotationDetail={quotation}
          planDetail={planDetail}
        />
      ))}
    </div>
  );
}
