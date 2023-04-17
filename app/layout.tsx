"use client";

"use client";

import { ContextProvider } from "@/app/ProductsContext";
import ReactQuery from "./react-query.component";
import "@/styles/globals.css";

type Props = {
  children: React.ReactNode;
};
const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <head>
        <title>tiny shop</title>
      </head>

      <body className="min-h-screen p-5 flex justify-center  ">
        <main>
          <ReactQuery>
            <ContextProvider>
              <main>{children}</main>
            </ContextProvider>
          </ReactQuery>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
