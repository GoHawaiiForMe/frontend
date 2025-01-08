export default function CheckFilter() {
  return (
    <div className="w-[328px]  hidden pc:block">
      <div className="flex justify-between items-center border-b border-color-line-200 px-[13.5px] py-[16px] my-[24px]">
        <p className="text-[20px] font-medium leading-8 whitespace-nowrap">이사 유형</p>
        <div className="flex items-center gap-[12px]">
          <input className="w-[20px] h-[20px]" type="checkbox" />
          <p className="text-[18px] font-normal leading-[26px] whitespace-nowrap">전체 선택</p>
        </div>
      </div>
      <div className="flex justify-between items-center border-b border-color-line-200 px-[16px] py-[21px] ">
        <p className="text-[18px] font-medium leading-[26px] whitespace-nowrap">소형이사 (totalCount)</p>
        <input className="w-[20px] h-[20px]" type="checkbox" />
      </div>
      <div className="flex justify-between items-center border-b border-color-line-200 px-[16px] py-[21px] ">
        <p className="text-[18px] font-medium leading-[26px] whitespace-nowrap">가정이사 (totalCount)</p>
        <input className="w-[20px] h-[20px]" type="checkbox" />
      </div>
      <div className="flex justify-between items-center border-b border-color-line-200 px-[16px] py-[21px] mb-[24px] ">
        <p className="text-[18px] font-medium leading-[26px] whitespace-nowrap">사무실이사 (totalCount)</p>
        <input className="w-[20px] h-[20px]" type="checkbox" />
      </div>
      <div className="flex justify-between items-center border-b border-color-line-200 px-[13.5px] py-[16px] mb-[24px] ">
        <p className="text-[20px] font-medium leading-8 whitespace-nowrap">필터</p>
        <div className="flex items-center gap-[12px]">
          <input className="w-[20px] h-[20px]" type="checkbox" />
          <p className="text-[18px] font-normal leading-[26px] whitespace-nowrap">전체 선택</p>
        </div>
      </div>
      <div className="flex justify-between items-center border-b border-color-line-200 px-[16px] py-[21px] ">
        <p className="text-[18px] font-medium leading-[26px] whitespace-nowrap">서비스 가능 지역 (totalCount)</p>
        <input className="w-[20px] h-[20px]" type="checkbox" />
      </div>
      <div className="flex justify-between items-center border-b border-color-line-200 px-[16px] py-[21px] ">
        <p className="text-[18px] font-medium leading-[26px] whitespace-nowrap">지정 견적 요청 (totalCount)</p>
        <input className="w-[20px] h-[20px]" type="checkbox" />
      </div>
    </div>
  );
}
