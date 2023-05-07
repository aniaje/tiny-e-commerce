import { ProductsProvider } from "@/components/ProductsContext";
import { ReactQueryWrapper } from "@/components/ReactQueryWrapper";
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
          <ReactQueryWrapper>
            <ProductsProvider>
              <main>{children}</main>
            </ProductsProvider>
          </ReactQueryWrapper>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
