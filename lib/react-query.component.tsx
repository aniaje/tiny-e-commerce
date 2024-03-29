import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClientOptions = {
  defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: false } },
};

const queryClient = new QueryClient(queryClientOptions);

// queryClientOptions
//      {
//    defaultOptions: { queries: { retry: false, staleTime: Infinity, refetchOnMount: } },

const ReactQuery = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};

export default ReactQuery;
