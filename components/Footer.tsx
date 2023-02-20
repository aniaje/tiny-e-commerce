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
    <footer className="sticky bottom-0 bg-white p-5 w-full flex">
      <Link href={"/"}>
        <AiOutlineHome />
        <span>Home</span>
      </Link>
      <Link href={"/checkout"} className="pl-6">
        <AiOutlineShoppingCart /> <span>Cart {selectedProducts.length}</span>
      </Link>
    </footer>
  );
}
