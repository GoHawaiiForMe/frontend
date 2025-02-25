import planService, { Plan } from "@/services/planService";

interface CompleteTripProps {
  planDetail: Plan;
  closeModal: () => void;
}

export default function CompleteTrip({ planDetail, closeModal }: CompleteTripProps) {
  async function handleSubmit() {
    try {
      await planService.completePlan(planDetail.id);
      alert("여행이 완료되었습니다!");
      window.location.reload();
      closeModal();
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <div>
      <div className="mb-12 w-64">
        <p className="semibold mobile-tablet:medium text-2lg">여행을 완료하시겠습니까?</p>
      </div>
      <button
        className="semibold px-21 w-full rounded-xl bg-blue-500 py-3 text-lg text-white"
        onClick={handleSubmit}
      >
        여행 완료 확정
      </button>
    </div>
  );
}
