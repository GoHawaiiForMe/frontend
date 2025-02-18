import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAccessToken } from "@/utils/tokenUtils";
import loading from "@public/assets/icon_loading.gif";
import Image from "next/image";

const withAuthAccess = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (typeof window === "undefined") return;

      const accessToken = getAccessToken();
      if (accessToken) {
        if (router.pathname === "/login" || router.pathname === "/signup") {
          router.push("/");
          return;
        }
        setAccessToken(accessToken);
      } else {
        if (router.pathname !== "/login" && router.pathname !== "/signup") {
          router.push("/login");
        }
      }
      setIsLoading(false);
    }, [router]);

    if (isLoading) {
      return (
        <div className="flex h-screen items-center justify-center">
          <Image src={loading} alt="로딩 중" />
        </div>
      );
    }

    if (!accessToken && !(router.pathname === "/login" || router.pathname === "/signup")) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
};
export default withAuthAccess;
