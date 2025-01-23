import Image from "next/image";
import CustomerInput from "@/components/Receive/CustomerInput";
import CheckFilter from "../components/Receive/CheckFilter";
import FastDropdown from "@/components/Receive/FastDropdown";
import RequestDetails from "@/components/Receive/RequestDetails";
import writing from "@public/assets/icon_writing.png";
import mobilefilter from "@public/assets/icon_filterbutton.png";
import ModalFilter from "@/components/Receive/ModalFilter";
import { ChangeEvent, useState } from "react";
import Quotation from "@/components/Receive/Quotation";
import ReceiveModalLayout from "@/components/Receive/ReceiveModalLayout";
import Reject from "@/components/Receive/Reject";
import SearchBar from "@/components/Common/SearchBar";
import { useQuery } from "@tanstack/react-query";
import ReceiveRequest, { PlanResponse } from "@/services/RequestService";

export default function Receive() {
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);
  const [quotationIsOpen, setQuotationIsOpen] = useState<boolean>(false);
  const [rejectIsOpen, setRejectIsOpen] = useState<boolean>(false);
  const [orderBy, setOrderBy] = useState<"RECENT" | "SCHEDULE_FIRST">("SCHEDULE_FIRST");

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const { data, isLoading, error } = useQuery<PlanResponse>({
    queryKey: [
      "receiveRequest",
      { isAssigned: true, tripType: selectedTypes, keyword: searchTerm, orderBy },
    ],
    queryFn: () =>
      ReceiveRequest({
        isAssigned: true,
        tripType: selectedTypes.length > 0 ? selectedTypes : undefined,
        keyword: searchTerm || undefined,
        orderBy,
      }),
  });

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

  console.log("데이터", data);

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
        <CheckFilter
          data={data}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
        <div className="w-full">
          <SearchBar value={searchValue} onChange={handleSearchChange} onSearch={handleSearch} />
          <div className="mb-8 mt-4 flex w-[955px] items-center justify-between mobile:mx-[auto] mobile:w-[327px] tablet:mx-[auto] tablet:w-[600px]">
            <p>전체 {data?.totalCount || 0} 건</p>
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
            data?.list.map((item: any) => (
              <RequestDetails
                key={item.id}
                data={item}
                onSendQuotation={handleSendQuotation}
                onReject={handleReject}
              />
            ))
          )}
        </div>
      </div>
      {filterIsOpen && (
        <ModalFilter
          closeModal={() => setFilterIsOpen(false)}
          data={data}
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
