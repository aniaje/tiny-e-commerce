import { IProduct } from "@/types";
import Product from "./Product";

interface CategoryItemsProps {
  categoryName: string;
  products: IProduct[];
}

export default function CategoryItems({ products }: CategoryItemsProps) {
  return (
    <>
      <div className="flex flex-wrap mx-5 overflow-x-scroll justify-center">
        {products.map((product) => (
          <div key={product._id} className="p-5">
            <Product {...product} />
          </div>
        ))}
      </div>
    </>
  );
}
