import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const withAuthAccess = (WrappedComponent: React.ComponentType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/login");
      } else {
        setAccessToken(token);
      }
    }, [router]);

    if (!accessToken) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
};
export default withAuthAccess;
