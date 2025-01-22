import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/Gnb/NavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <NavBar />
        <main className="main-container">
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </>
  );
}
