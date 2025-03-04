import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAccessToken } from "@/utils/tokenUtils";
import loading from "@public/assets/icon_loading.gif";
import Image from "next/image";
import useAuthStore from "./useAuthStore";

type AllowedRoles = "DREAMER" | "MAKER" | ("DREAMER" | "MAKER")[] | undefined;

const withAuthAccess = (WrappedComponent: React.ComponentType, allowedRoles?: AllowedRoles) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { role } = useAuthStore();

    useEffect(() => {
      if (typeof window === "undefined") return;

      const accessToken = getAccessToken();
      if (accessToken) {
        if (router.pathname === "/login" || router.pathname === "/signup") {
          router.push("/");
          return;
        }

        if (allowedRoles) {
          const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
          if (role !== "guest" && !roles.includes(role as "DREAMER" | "MAKER")) {
            router.push("/");
            return;
          }
        }

        setAccessToken(accessToken);
      } else {
        if (router.pathname !== "/login" && router.pathname !== "/signup") {
          router.push("/login");
        }
      }
      setIsLoading(false);
    }, [router, role, allowedRoles]);

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
