import HeaderImg from "@/components/HeaderImg";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="min-h-screen p-5 flex justify-center  ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
