import { useEffect, useMemo, useState } from "react";
import Product from "@/components/Product";
import { initMongoose } from "@/lib/mongoose";
import { findAllProducts } from "./api/products";
import Layout from "@/components/Layout";
import { IProduct } from "@/types";

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
          <p className="p-3" onClick={() => setDisplayedCat(categoryName)}>
            {" "}
            {categoryName}
          </p>
        ))}
      </div>
      <div></div>
      {categories.map((categoryName) => (
        <div className="grow p-3" key={categoryName}>
          {products.find((p) => p.category === categoryName) && (
            <>
              <h2 className="py-4 text-2xl p-3 capitalize">{categoryName}</h2>
              <div className="flex flex-wrap -mx-5 overflow-x-scroll  justify-center">
                {products
                  .filter((p) => p.category === categoryName)
                  .map((product) => (
                    <div key={product._id} className="p-5">
                      <Product {...product} />
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
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
