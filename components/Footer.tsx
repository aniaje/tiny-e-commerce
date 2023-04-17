"use client";
import { useBasket } from "@/app/ProductsContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AiOutlineShoppingCart, AiOutlineHome } from "react-icons/ai";

export default function Footer() {
  const { asPath } = useRouter();

  const { basketQuantity } = useBasket();

  return (
    <footer className="sticky bottom-0 mt-auto bg-white p-5 w-full flex border-t border-gray-200 text-gray-4 space-x-12 justify-center">
      <Link
        href={"/"}
        className={
          (asPath === "/" ? "text-emerald-600" : "") +
          "flex-col items-center justify-center items-center"
        }
      >
        <pre>{asPath}</pre>
        <AiOutlineHome />
        Home
      </Link>
      <Link
        href={"/checkout"}
        className={
          (asPath === "/checkout" ? "text-emerald-600" : "") +
          "flex-col items-center justify-center items-center"
        }
      >
        {" "}
        <AiOutlineShoppingCart />
        {basketQuantity}
      </Link>
      <Link href={"/about"}> About</Link>
    </footer>
  );
}
