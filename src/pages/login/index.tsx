import LoginForm from "@/features/LoginForm";
import withAuthAccess from "@/stores/withAuthAccess";

export function LoginPage() {
  return <LoginForm />;
}

export default withAuthAccess(LoginPage);
