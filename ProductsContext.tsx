import React, { createContext, useContext, useState } from "react";

interface BasketItem {
  id: string;
  quantity: number;
}

interface IProductContext {
  selectedProducts: BasketItem[];
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
  const [selectedProducts, setSelectedProducts] = useState<BasketItem[]>([]);

  console.log(selectedProducts);

  const saveToCart = () => {
    localStorage.setItem("cart", JSON.stringify(selectedProducts));
  };

  console.log("asd");

  function modifyProductsQuantity(id: string, type: "ADD" | "REMOVE") {
    if (selectedProducts.some((item) => item.id === id)) {
      const pos = selectedProducts.findIndex((item) => {
        return item.id === id;
      });
      console.log(selectedProducts);
      const selectedItems = [...selectedProducts];
      console.log(selectedItems);
      selectedItems[pos].quantity =
        type === "ADD"
          ? selectedItems[pos].quantity + 1
          : selectedItems[pos].quantity - 1;

      if (selectedItems[pos].quantity == 0) {
        selectedItems.splice(pos, 1);
        console.log(selectedItems);
      }
      console.log(selectedItems[pos]);

      setSelectedProducts(selectedItems);
      saveToCart();
    } else {
      if (type === "ADD") {
        setSelectedProducts([...selectedProducts, { id, quantity: 1 }]);
      }
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        selectedProducts,
        addProduct: (id: string) => {
          modifyProductsQuantity(id, "ADD");
        },
        removeProduct: (id: string) => {
          modifyProductsQuantity(id, "REMOVE");
        },
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useBasket = () => useContext(ProductsContext);
