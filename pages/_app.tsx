import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GameProvider } from "./context/GameContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </QueryClientProvider>
  );
}

// export default api.withTRPC(App);
