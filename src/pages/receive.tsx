import Image from "next/image";
import CheckFilter from "../components/Receive/CheckFilter";
import FastDropdown from "@/components/Receive/FastDropdown";
import RequestDetails from "@/components/Receive/RequestDetails";
import mobilefilter from "@public/assets/icon_filterbutton.png";
import ModalFilter from "@/components/Receive/ModalFilter";
import { ChangeEvent, useState, useEffect } from "react";
import Quotation from "@/components/Receive/Quotation";
import ReceiveModalLayout from "@/components/Receive/ReceiveModalLayout";
import Reject from "@/components/Receive/Reject";
import SearchBar from "@/components/Common/SearchBar";
import { useInfiniteQuery } from "@tanstack/react-query";
import ReceiveRequest from "@/services/RequestService";
import { useInView } from "react-intersection-observer";

export default function Receive() {
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);
  const [quotationIsOpen, setQuotationIsOpen] = useState<boolean>(false);
  const [rejectIsOpen, setRejectIsOpen] = useState<boolean>(false);
  const [orderBy, setOrderBy] = useState<"RECENT" | "SCHEDULE_FIRST">("SCHEDULE_FIRST");

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [
      "receiveRequest",
      { isAssigned: true, tripType: selectedTypes, keyword: searchTerm, orderBy },
    ],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      ReceiveRequest({
        isAssigned: true,
        tripType: selectedTypes.length > 0 ? selectedTypes : undefined,
        keyword: searchTerm || undefined,
        orderBy,
        page: pageParam,
        pageSize: 5,
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.list.length === 5 ? allPages.length + 1 : undefined;
    },
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

  const handleSendQuotation = () => {
    setQuotationIsOpen(true);
  };

  const handleReject = () => {
    setRejectIsOpen(true);
  };

  return (
    <div>
      <div className="mx-[auto] overflow-hidden mobile:mx-[auto] mobile:w-[327px] tablet:mx-[auto] tablet:w-[600px]">
        <p className="text-4 py-8 font-semibold">받은 요청</p>
      </div>
      <div className="flex gap-[107px]">
        <CheckFilter data={data?.pages[0]} setSelectedTypes={setSelectedTypes} />
        <div className="w-full">
          <SearchBar value={searchValue} onChange={handleSearchChange} onSearch={handleSearch} />
          <div className="mb-8 mt-4 flex w-[955px] items-center justify-between mobile:mx-[auto] mobile:w-[327px] tablet:mx-[auto] tablet:w-[600px]">
            <p>전체 {totalCount} 건</p>
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
            <div className="flex min-h-[200px] items-center justify-center">
              <span>Loading...</span>
            </div>
          ) : (
            <>
              {allItems.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (item: any, index: number) => (
                  <RequestDetails
                    key={`${item.id}-${index}`}
                    data={item}
                    onSendQuotation={handleSendQuotation}
                    onReject={handleReject}
                  />
                ),
              )}

              {/* 무한 스크롤 트리거 */}
              <div ref={ref} className="h-10">
                {isFetchingNextPage && (
                  <div className="flex items-center justify-center py-4">
                    <span>Loading more...</span>
                  </div>
                )}
              </div>
            </>
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
          <Quotation />
        </ReceiveModalLayout>
      )}
      {rejectIsOpen && (
        <ReceiveModalLayout label="요청 반려하기" closeModal={() => setRejectIsOpen(false)}>
          <Reject />
        </ReceiveModalLayout>
      )}
    </div>
  );
}
