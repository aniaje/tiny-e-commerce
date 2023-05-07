import { ProductsList } from "@/components/ProductsList";
import { findAllProducts } from "@/services/products";

export default async function Home() {
  const shopItems = await findAllProducts();
  return (
    <>
      <ProductsList products={shopItems} />
    </>
  );
}
