"use client";

import { useMemo, useState } from "react";
import { initMongoose } from "@/lib/mongoose";
import { findAllProducts } from "@/app/api/products";
import Layout from "@/components/Layout";
import { IProduct } from "@/types";

import CategoryItems from "@/components/CategoryItems";

// interface HomeProps {
//   shopItems: IProduct[];
// }

interface Category {
  key: string | null;
  label: string;
}

async function fetchProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();
  return products;
}

//</IProduct>
export default async function Home() {
  const [search, setSearch] = useState<string>("");
  const [displayedCat, setDisplayedCat] = useState<string>("all");

  await initMongoose();
  const shopItems = await findAllProducts();
  console.log(shopItems);

  const categories = Array.from(new Set(shopItems.map((p) => p.category)));

  console.log(categories);

  const categoriesAndAll: Category[] = categories.map((category: string) => ({
    key: category,
    label: category,
  }));

  categoriesAndAll.unshift({
    key: null,
    label: "all",
  });

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
        {categoriesAndAll.map(({ key, label }) => (
          <p
            key={key}
            onClick={() => setDisplayedCat(label)}
            className={`${
              displayedCat === label ? "underline font-bold" : "font-normal"
            } cursor-pointer p-3`}
          >
            {label}
          </p>
        ))}
      </div>
      {categoriesAndAll.map(({ key, label }) => (
        <CategoryItems
          key={key}
          categoryName={label}
          products={products.filter((p) => p.category == key)}
        />
      ))}
    </Layout>
  );
}

// export async function getServerSideProps() {
//   await initMongoose();
//   const shopItems = await findAllProducts();
//   return {
//     props: { shopItems: JSON.parse(JSON.stringify(shopItems)) },
//   };
// }
