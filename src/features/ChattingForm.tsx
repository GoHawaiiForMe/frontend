import Layout from "@/components/Common/Layout";
import Image from "next/image";
import user from "@public/assets/icon_default_profile.svg";

export default function ChattingForm() {
  return (
    <>
      <div className="-mx-[260px] bg-color-gray-50 py-6 mobile-tablet:mb-5 card:mb-5">
        <p className="semibold pl-[260px] text-xl">메시지</p>
      </div>
      <Layout bodyClass="bg-gray">
        <div className="gap-4 overflow-x-auto rounded-xl border border-color-line-200 bg-color-gray-50 p-4 pc:hidden mobile-tablet:flex card:flex">
          <Image src={user} alt="유저" className="border" width={100} />
        </div>
        <div className="grid h-[920px] grid-cols-7 gap-10 pt-4 mobile-tablet:pt-5">
          {/* 채팅방 목록 */}
          <div className="col-span-2 flex flex-col gap-4 overflow-y-auto rounded-xl bg-color-gray-50 p-8 mobile-tablet:hidden card:hidden">
            <div className="flex gap-4 rounded-xl border border-color-line-100 p-4">
              <Image src={user} alt="유저" width={70} />
              <div className="flex flex-col gap-3">
                <p>김코드</p>
                <p className="line-clamp-2">안녕하세요, 저는 김코드입니다.</p>
              </div>
            </div>
          </div>
          {/* 채팅창 */}
          <div className="col-span-5 rounded-xl bg-color-gray-50 p-8 mobile-tablet:col-span-7 card:col-span-7">
            <div className="rounded-lg border border-color-line-100 p-3">
              <p className="semibold text-2xl text-color-black-300 mobile-tablet:text-xl">제목</p>
              <div className="flex gap-4">
                <p className="regular text-xl text-color-gray-500 mobile-tablet:text-2lg">여행일</p>
                <p className="medium text-color-balck-400 text-xl mobile-tablet:text-2lg">
                  2024.07.01
                </p>
                <p className="regular text-xl text-color-gray-500 mobile-tablet:text-2lg">플랜가</p>
                <p className="medium text-color-balck-400 text-xl mobile-tablet:text-2lg">
                  210,000원
                </p>
              </div>
            </div>
            <div className="h-[600px] mobile-tablet:h-[650px]">{/* 실제 채팅 들어가는 부분 */}</div>
            <div className="flex flex-col gap-5">
              <input
                className="h-16 w-full rounded-xl bg-color-background-200 indent-5 text-color-gray-400 outline-none mobile-tablet:h-10"
                placeholder="텍스트를 입력해 주세요."
              />
              <div className="flex justify-between">
                <button className="rounded-xl border border-color-blue-300 bg-color-blue-100 px-6 py-3 text-lg text-color-blue-300 mobile-tablet:px-4 mobile-tablet:py-1">
                  첨부파일
                </button>
                <button className="rounded-xl bg-color-blue-300 px-6 py-3 text-lg text-color-gray-50 mobile-tablet:px-4 mobile-tablet:py-1">
                  전송
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
