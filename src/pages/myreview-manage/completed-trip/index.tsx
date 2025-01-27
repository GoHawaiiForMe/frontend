import Layout from "@/components/Common/Layout";
import Pagination from "@/components/Common/Pagination";
import MyCompletedTripList from "@/components/MyReviews/MyCompletedTripList";
import MyReviewNav from "@/components/MyReviews/MyReviewNav";
import { useState } from "react";

export default function CompletedTrip() {
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태
  const totalPages = 10; // 총 페이지 수

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`Changed to page: ${page}`); // 디버깅용
  };

  return (
    <>
      <MyReviewNav />
      <Layout bodyClass="bg-gray">
        <div className="my-10">
          <MyCompletedTripList />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </Layout>
    </>
  );
}
