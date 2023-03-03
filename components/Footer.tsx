import { useBasket } from "@/ProductsContext";
import Link from "next/link";
import { useRouter } from "next/router";

import { AiOutlineShoppingCart, AiOutlineHome } from "react-icons/ai";

export default function Footer() {
  const router = useRouter();
  const path = router.pathname;

  const { selectedProducts } = useBasket();

  return (
    <footer className="sticky bottom-0 mt-auto bg-white p-5 w-full flex border-t border-gray-200 text-gray-4 space-x-12 justify-center">
      <Link
        href={"/"}
        className={
          (path === "/" ? "text-emerald-600" : "") +
          "flex-col items-center justify-center items-center"
        }
      >
        <pre>{path}</pre>
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
        {" "}
        <AiOutlineShoppingCart />
        {selectedProducts.reduce((acc, item) => acc + item.quantity, 0)}
      </Link>
      <Link href={"/about"}> About</Link>
    </footer>
  );
}
