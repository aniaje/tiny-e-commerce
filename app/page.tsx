import Footer from "@/components/Footer";
import HeaderImg from "@/components/HeaderImg";
import { ProductsList } from "@/components/ProductsList";
import { findAllProducts } from "@/services/products";

export default async function Home() {
  const shopItems = await findAllProducts();
  return (
    <>
      <HeaderImg />
      <ProductsList products={shopItems} />
      <Footer />
    </>
  );
}
