import QuotationCard from "@/components/MyPlans/Cards/QuotationCard";
import { QuotationServiceDreamer } from "@/services/quotationServiceDreamer";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Plan } from "@/services/planService";
import Link from "next/link";
import Image from "next/image";
import loading from "@public/assets/icon_loading.gif";
import { useEffect, useState } from "react";

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

  //1440px이하부터 타블렛 디자인으로 변경
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1440);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <div className="w-full rounded-2xl bg-color-gray-50 p-8 shadow">
          <p>아직 받은 견적이 없어요!</p>
          <br />
          <p>지정견적요청을 해보세요!</p>
          <br />
          <button className="border-1 rounded-lg bg-color-blue-200 p-2">
            <Link href="/finding-maker" className="text-gray-100">
              {" "}
              Maker 찾기
            </Link>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`grid gap-4 ${isTablet ? "grid-cols-1" : "grid-cols-2"} pc:grid`}>
        {quotations.list.map((quotation) => (
          <QuotationCard key={quotation.id} quotationDetail={quotation} planDetail={planDetail} />
        ))}
      </div>
    </>
  );
}
