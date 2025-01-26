import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

//상위 컴포넌트에서 props로 currentPage, totalPages, onPageChange를 받아와서 사용
//currentPage: 현재 페이지
//totalPages: 총 페이지 수
//onPageChange: 페이지 변경 함수
//자세한 props 설명은 상위 컴포넌트(profile/maker/mypage/[id]페이지 컴포넌트)에서 작성

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // 5페이지 이하일 경우 모든 페이지 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`flex h-8 w-8 items-center justify-center ${
              currentPage === i ? "font-bold text-blue-500" : "text-gray-500"
            }`}
          >
            {i}
          </button>,
        );
      }
    } else {
      // 5페이지 초과일 경우
      if (currentPage <= 3) {
        // 현재 페이지가 1~3일 때: 1 2 3 4 5 ... lastPage
        // 앞에서 5개 숫자 보여주고 ... 찍고 마지막 숫자
        // 예: 1 2 3 4 5 ... 13
        for (let i = 1; i <= 5; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`flex h-8 w-8 items-center justify-center ${
                currentPage === i ? "font-bold text-blue-500" : "text-gray-500"
              }`}
            >
              {i}
            </button>,
          );
        }
        pages.push(
          <span key="ellipsis" className="px-1">
            ...
          </span>,
        );
        pages.push(
          <button
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            className="flex h-8 w-8 items-center justify-center text-gray-500"
          >
            {totalPages}
          </button>,
        );
      } else if (currentPage >= totalPages - 2) {
        // 현재 페이지가 끝에서 3페이지 이내일 때: 1 ... lastPage-4 lastPage-3 lastPage-2 lastPage-1 lastPage
        // 첫 번호, ... 찍고, 마지막 5개 숫자
        // 예: 1 ... 9 10 11 12 13
        pages.push(
          <button
            key={1}
            onClick={() => onPageChange(1)}
            className="flex h-8 w-8 items-center justify-center text-gray-500"
          >
            1
          </button>,
        );
        pages.push(
          <span key="ellipsis" className="px-1">
            ...
          </span>,
        );
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`flex h-8 w-8 items-center justify-center ${
                currentPage === i ? "font-bold text-blue-500" : "text-gray-500"
              }`}
            >
              {i}
            </button>,
          );
        }
      } else {
        // 중간 페이지일 때: 1 ... currentPage-1 currentPage currentPage+1 currentPage+2 ... lastPage
        // 첫 번호, ... 찍고, 현재 페이지 앞뒤 2개씩 보여주고 ... 찍고 마지막 숫자
        // 예: 1 ... 4 5 6 7 8 ... 13
        pages.push(
          <button
            key={1}
            onClick={() => onPageChange(1)}
            className="flex h-8 w-8 items-center justify-center text-gray-500"
          >
            1
          </button>,
        );
        pages.push(
          <span key="ellipsis1" className="px-1">
            ...
          </span>,
        );

        for (let i = currentPage - 1; i <= currentPage + 2; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`flex h-8 w-8 items-center justify-center ${
                currentPage === i ? "font-bold text-blue-500" : "text-gray-500"
              }`}
            >
              {i}
            </button>,
          );
        }

        pages.push(
          <span key="ellipsis2" className="px-1">
            ...
          </span>,
        );
        pages.push(
          <button
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            className="flex h-8 w-8 items-center justify-center text-gray-500"
          >
            {totalPages}
          </button>,
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-8 w-8 items-center justify-center text-gray-500 disabled:opacity-50"
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-8 w-8 items-center justify-center text-gray-500 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
