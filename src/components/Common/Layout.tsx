import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
  bodyClass?: string;
}

export default function Layout({ children, bodyClass }: LayoutProps) {
  useEffect(() => {
    if (bodyClass) document.body.classList.add(bodyClass);

    return () => {
      if (bodyClass) document.body.classList.remove(bodyClass);
    };
  }, [bodyClass]);

  return <>{children}</>;
}
