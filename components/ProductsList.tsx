"use client";

import { Category, IProduct } from "@/types";
import { useMemo, useState } from "react";
import CategoryItems from "./CategoryItems";

interface ProductsListProps {
  products: IProduct[];
}

export const ProductsList = ({ products }: ProductsListProps) => {
  const [search, setSearch] = useState<string>("");
  const [displayedCat, setDisplayedCat] = useState<string>("all");

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const categoriesAndAll: Category[] = categories.map((category: string) => ({
    key: category,
    label: category,
  }));

  categoriesAndAll.unshift({
    key: null,
    label: "all",
  });

  const productsList = useMemo(() => {
    return products.filter((p) =>
      displayedCat === "all"
        ? p.name.toLowerCase().includes(search)
        : p.category === displayedCat && p.name.toLowerCase().includes(search)
    );
  }, [products, displayedCat, search]);

  return (
    <>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="search for products..."
        className="bg-gray-100 w-full py-2 px-4 rounded"
      ></input>
      {!products && <p>no products found</p>}
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
          products={productsList.filter((p) => p.category == key)}
        />
      ))}
    </>
  );
};
