import { useMemo, useState } from "react";
import { initMongoose } from "@/lib/mongoose";
import { findAllProducts } from "./api/products";
import Layout from "@/components/Layout";
import { IProduct } from "@/types";

import CategoryItems from "@/components/CategoryItems";

interface HomeProps {
  shopItems: IProduct[];
}

//</IProduct>
export default function Home({ shopItems }: HomeProps) {
  const [search, setSearch] = useState<string>("");
  const [displayedCat, setDisplayedCat] = useState<string>("all");
  const categories = Array.from(new Set(shopItems.map((p) => p.category)));

  const products = useMemo(() => {
    return shopItems.filter((p) =>
      displayedCat === "all"
        ? p.name.toLowerCase().includes(search)
        : p.category === displayedCat && p.name.toLowerCase().includes(search)
    );
  }, [search, shopItems, displayedCat]);

  return (
    <Layout>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="search for products..."
        className="bg-gray-100 w-full py-2 px-4 rounded"
      ></input>
      <div className="flex ">
        <p className="p-3" onClick={() => setDisplayedCat("all")}>
          All
        </p>
        {categories.map((categoryName) => (
          <p
            key={categoryName}
            onClick={() => setDisplayedCat(categoryName)}
            className={`${
              displayedCat === categoryName
                ? "underline font-bold"
                : "font-normal"
            } cursor-pointer p-3`}
          >
            {" "}
            {categoryName}
          </p>
        ))}
      </div>
      {categories.map((categoryName) => (
        <CategoryItems
          key={categoryName}
          categoryName={categoryName}
          products={products.filter((p) => p.category === categoryName)}
        />
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  await initMongoose(); //conecting to the db
  const shopItems = await findAllProducts();
  return {
    props: { shopItems: JSON.parse(JSON.stringify(shopItems)) },
  };
}
