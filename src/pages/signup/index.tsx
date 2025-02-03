import SignUpForm from "@/features/SignupForm";
import withAuthAccess from "@/stores/withAuthAccess";

export function SignupPage() {
  return <SignUpForm />;
}

export default withAuthAccess(SignupPage);
