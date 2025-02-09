import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/Gnb/NavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) return null

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="sticky top-0 z-50">
          <NavBar />
        </div>
        <main className="main-container">
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </>
  );
}
