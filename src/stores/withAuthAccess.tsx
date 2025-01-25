import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuthStore from "./useAuthStore";

const withAuthAccess = (WrappedComponent: React.ComponentType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    useEffect(() => {
      if (!isLoggedIn) {
        router.push("/login");
      }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuthAccess;
