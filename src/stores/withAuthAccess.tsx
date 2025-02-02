import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const withAuthAccess = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        if (router.pathname === "/login" || router.pathname === "/signup") {
          router.push("/");
          return;
        }
        setAccessToken(token);
      } else {
        router.push("/login");
      }
    }, [router]);

    if (!accessToken && !(router.pathname === "/login" || router.pathname === "/signup")) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
};
export default withAuthAccess;
