import { ProductsContext, useBasket } from "@/ProductsContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AiOutlineShoppingCart, AiOutlineHome } from "react-icons/ai";

export default function Footer() {
  const router = useRouter();
  const path = router.pathname;

  const { selectedProducts } = useBasket();

  return (
    <footer className="sticky bottom-0 bg-white p-5 w-full flex border-t border-gray-200 text-gray-4 space-x-12 justify-center">
      <Link
        href={"/"}
        className={
          (path === "/" ? "text-emerald-600" : "") +
          "flex-col items-center justify-center items-center"
        }
      >
        <AiOutlineHome />
        <span>Home</span>
      </Link>
      <Link
        href={"/checkout"}
        className={
          (path === "/checkout" ? "text-emerald-600" : "") +
          "flex-col items-center justify-center items-center"
        }
      >
        <AiOutlineShoppingCart /> <span>Cart {selectedProducts.length}</span>
      </Link>
    </footer>
  );
}
