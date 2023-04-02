import { ReactNode } from "react";
import Footer from "./Footer";

import HeaderImg from "./HeaderImg";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div>
        <HeaderImg />
      </div>

      <div className="flex flex-col h-screen justify-between">
        <div className="p-5 ">{children}</div>
        <Footer />
      </div>
    </>
  );
}
