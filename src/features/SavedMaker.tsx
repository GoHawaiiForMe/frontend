import SavedCard from "@/components/Common/SavedCard";

export default function SavedMaker() {
  return (
    <>
      <div className="py-6 ">
        <p className="text-xl font-semibold">찜한 Maker</p>
      </div>
      <div className="h-0.5 pc:-mx-[260px] tablet:-mx-[72px] mobile:-mx-[24px] bg-color-line-200 mb-8"></div>
      <div className="pc:grid pc:grid-cols-2 mobile-tablet:flex mobile-tablet:flex-col gap-4 justify-center items-center">
        <SavedCard />
        <SavedCard />
        <SavedCard />
        <SavedCard />
      </div>
    </>
  );
}
