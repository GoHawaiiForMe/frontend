import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/Gnb/NavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
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
