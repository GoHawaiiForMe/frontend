import { useInfiniteQuery } from "@tanstack/react-query";
import SendQuotation from "@/components/Receive/SendQuotation";
import { getQuotations } from "@/services/quotationService";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import withAuthAccess from "@/stores/withAuthAccess";
import Image from "next/image";
import loading from "@public/assets/icon_loading.gif";
import request_empty from "@public/assets/icon_luggage_frown.svg";

export function ManageQuo() {
  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["quotations", "sent"],
    queryFn: ({ pageParam = 1 }) => getQuotations({ isSent: true, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.list.length === 0 ? undefined : nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Image src={loading} alt="로딩 중" />
      </div>
    );
  }

  const allItems = data?.pages.flatMap((page) => page.list) ?? [];

  return (
    <>
      <div className="mx-[auto] w-full mobile:mx-[auto] tablet:mx-[auto]">
        <div className="flex items-center gap-8 border-b border-color-line-200">
          <Link href="/managequo">
            <p className="text-4 semibold cursor-pointer border-b-[3px] border-black py-6">
              보낸 견적 조회
            </p>
          </Link>
          <Link href="/reject-list">
            <p className="text-4 semibold cursor-pointer">반려된 견적</p>
          </Link>
        </div>
      </div>
      {allItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-10">
          <Image src={request_empty} alt="request_empty" width={300} height={300} />
          <p className="semibold text-xl text-color-gray-300">아직 보낸 견적이 없어요!</p>
        </div>
      ) : (
        <>
          <div className="mobiel-tablet:felx pt-10 pc:grid pc:grid-cols-2 pc:gap-2 mobile-tablet:grid-cols-none mobile-tablet:flex-col mobile-tablet:items-center mobile-tablet:justify-center">
            {allItems.map((item) => (
              <SendQuotation key={item.id} data={item} />
            ))}
          </div>
          <div ref={ref} className="h-10">
            {isFetchingNextPage && (
              <div className="flex items-center justify-center py-4">
                <span>더 불러오는 중...</span>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default withAuthAccess(ManageQuo, "MAKER");
