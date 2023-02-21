import { useEffect } from "react";
import Layout from "@/components/Layout";
import { useBasket } from "@/ProductsContext";
import axios from "axios";

export default function CheckoutPag() {
  const { selectedProducts } = useBasket();
  console.log(selectedProducts);

  useEffect(() => {}, []);

  return <Layout>{selectedProducts.join(",")}</Layout>;
}
