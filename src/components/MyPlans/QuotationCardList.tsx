import QuotationCard from "@/components/MyPlans/Cards/QuotationCard";
import { QuotationServiceDreamer } from "@/services/quotationServiceDreamer";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Plan } from "@/services/planService";
import Link from "next/link";
import Image from "next/image";
import loading from "@public/assets/icon_loading.gif";

interface PlanData {
  planDetail: Plan;
}

export default function QuotationCardList({ planDetail }: PlanData) {
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
        <Link href="" className="text-blue-500 underline"></Link>
      </div>
    );
  }

  return (
    <>
      <div className="items-center justify-center gap-4 pc:grid pc:grid-cols-2 mobile-tablet:flex mobile-tablet:flex-col">
        {quotations.list.map((quotation) => (
          <QuotationCard key={quotation.id} quotationDetail={quotation} planDetail={planDetail} />
        ))}
      </div>
    </>
  );
}
