import Image from "next/image";
import CheckFilter from "@/components/Receive/CheckFilter";
import FastDropdown from "@/components/Receive/FastDropdown";
import RequestDetails from "@/components/Receive/RequestDetails";
import mobilefilter from "@public/assets/icon_filterbutton.png";
import ModalFilter from "@/components/Receive/ModalFilter";
import { ChangeEvent, useState, useEffect } from "react";
import Quotation from "@/components/Receive/Quotation";
import ReceiveModalLayout from "@/components/Receive/ReceiveModalLayout";
import Reject from "@/components/Receive/Reject";
import SearchBar from "@/components/Common/Form/SearchBar";
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import ReceiveRequest from "@/services/requestService";
import { useInView } from "react-intersection-observer";
import request_empty from "@public/assets/icon_luggage_frown.svg";
import Link from "next/link";
import withAuthAccess from "@/stores/withAuthAccess";
import { PlanItem } from "@/services/requestService";
import loading from "@public/assets/icon_loading.gif";

export function AllReceivePlan() {
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);
  const [quotationIsOpen, setQuotationIsOpen] = useState<boolean>(false);
  const [rejectIsOpen, setRejectIsOpen] = useState<boolean>(false);
  const [orderBy, setOrderBy] = useState<"RECENT" | "SCHEDULE_FIRST">("SCHEDULE_FIRST");

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: [
        "receiveRequest",
        { isAssigned: false, tripType: selectedTypes, keyword: searchTerm, orderBy },
      ],
      initialPageParam: 1,
      queryFn: ({ pageParam = 1 }) =>
        ReceiveRequest({
          isAssigned: false,
          tripType: selectedTypes.length > 0 ? selectedTypes : undefined,
          keyword: searchTerm || undefined,
          orderBy,
          page: pageParam,
          pageSize: 5,
        }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.list.length === 5 ? allPages.length + 1 : undefined;
      },
      placeholderData: keepPreviousData,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // 전체 아이템 수를 계산
  const totalCount = data?.pages[0]?.totalCount || 0;

  // 모든 페이지의 리스트를 하나로 합치기
  const allItems = data?.pages.flatMap((page) => page.list) || [];

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setSearchTerm(value);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      setSearchTerm("");
    }
  };

  const handleSendQuotation = (requestId: string) => {
    setSelectedRequestId(requestId);
    setQuotationIsOpen(true);
  };

  const handleReject = () => {
    setRejectIsOpen(true);
  };

  return (
    <div>
      <div className="mx-[auto] w-full mobile:mx-[auto] tablet:mx-[auto]">
        <div className="mb-8 flex items-center gap-8 border-b border-color-line-200">
          <Link href="/receive">
            <p className="text-4 semibold cursor-pointer">받은 견적 요청</p>
          </Link>
          <Link href="/all-receive-plan">
            <p className="text-4 semibold cursor-pointer border-b-[3px] border-black py-6">
              전체 플랜
            </p>
          </Link>
        </div>
      </div>
      <div className="flex gap-[107px]">
        <CheckFilter data={data?.pages[0]} setSelectedTypes={setSelectedTypes} />
        <div className="w-full">
          <SearchBar value={searchValue} onChange={handleSearchChange} onSearch={handleSearch} />
          <div className="mb-8 mt-4 flex w-full items-center justify-between mobile:mx-[auto] tablet:mx-[auto]">
            <div className="flex items-center gap-2">
              <p className="semibold">전체 {totalCount} 건</p>
              {isFetching && !isLoading && (
                <div className="flex items-center gap-2 text-blue-500">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
                  <span className="text-sm">필터링 중...</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-[4px]">
              <FastDropdown onSort={setOrderBy} currentSort={orderBy} />
              <Image
                src={mobilefilter}
                className="pc:hidden mobile-tablet:block"
                alt="filter"
                width={32}
                height={32}
                onClick={() => setFilterIsOpen(true)}
              />
            </div>
          </div>
          {isLoading ? (
            <div className="flex h-screen items-center justify-center">
              <Image src={loading} alt="로딩 중" />
            </div>
          ) : (
            <div
              className={`transition-opacity duration-300 ${isFetching ? "opacity-60" : "opacity-100"}`}
            >
              {allItems.length > 0 ? (
                allItems.map((item: PlanItem, index: number) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="transform transition-all duration-300 hover:scale-[1.01]"
                  >
                    <RequestDetails
                      data={item}
                      onSendQuotation={() => handleSendQuotation(item.id)}
                      onReject={handleReject}
                      oneButton={true}
                    />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Image src={request_empty} alt="request_empty" width={300} height={300} />
                  <p className="semibold text-xl text-color-gray-300">아직 받은 요청이 없어요!</p>
                </div>
              )}

              <div ref={ref} className="h-10">
                {isFetchingNextPage && (
                  <div className="flex items-center justify-center py-4">
                    <span>더 불러오는 중...</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {filterIsOpen && (
        <ModalFilter
          closeModal={() => setFilterIsOpen(false)}
          data={data?.pages[0]}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
      )}
      {quotationIsOpen && (
        <ReceiveModalLayout label="견적 보내기" closeModal={() => setQuotationIsOpen(false)}>
          <Quotation
            data={allItems.find((item) => item.id === selectedRequestId)}
            closeModal={() => setQuotationIsOpen(false)}
          />
        </ReceiveModalLayout>
      )}
      {rejectIsOpen && (
        <ReceiveModalLayout label="요청 반려하기" closeModal={() => setRejectIsOpen(false)}>
          <Reject
            data={allItems.find((item) => item.id === selectedRequestId)}
            closeModal={() => setRejectIsOpen(false)}
          />
        </ReceiveModalLayout>
      )}
    </div>
  );
}

export default withAuthAccess(AllReceivePlan, "MAKER");
