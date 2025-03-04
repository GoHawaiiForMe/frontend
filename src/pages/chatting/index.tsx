import ChattingForm from "@/features/ChattingForm";
import withAuthAccess from "@/stores/withAuthAccess";

export function ChattingPage() {
  return <ChattingForm />;
}
export default withAuthAccess(ChattingPage);
