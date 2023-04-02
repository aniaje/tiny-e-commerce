// import ReactQuery from "@/lib/react-query.component";
import { ContextProvider } from "@/ProductsContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <ReactQuery>
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
    /* </ReactQuery> */
  );
}
