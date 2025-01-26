export default function CompleteTrip() {
  return (
    <div>
      <div className="mb-12 w-64">
        <p className="semibold mobile-tablet:medium text-2lg">여행을 완료하시겠습니까?</p>
      </div>
      <button className="semibold px-21 w-full rounded-xl bg-blue-500 py-3 text-lg text-white">
        여행 완료 확정
      </button>
    </div>
  );
}
