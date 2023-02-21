import React, { createContext, useContext } from "react";
import useLocalStorageState from "use-local-storage-state";

interface IProductContext {
  selectedProducts: string[];
  addProduct: (id: string) => void;
  removeProduct: (id: string) => void;
}

export const ProductsContext = createContext<IProductContext>({
  selectedProducts: [],
  addProduct: (id: string) => {},
  removeProduct: (id: string) => {},
});

export function ProductsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedProducts, setSelectedProducts] = useLocalStorageState<
    string[]
  >("cart", { defaultValue: [] });

  function addProduct(id: string) {
    setSelectedProducts((prev) => [...prev, id]);
  }

  console.log(selectedProducts);

  function removeProduct(id: string) {
    setSelectedProducts((prev) =>
      prev.filter((item) => {
        return item !== id;
      })
    );
  }

  return (
    <ProductsContext.Provider
      value={{ selectedProducts, addProduct, removeProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useBasket = () => useContext(ProductsContext);
