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

  const saveToCart = () => {
    localStorage.setItem("cart", JSON.stringify(selectedProducts));
  };

  console.log(selectedProducts);

  function modifyProductsQuantity(id: string, type: "ADD" | "REMOVE") {
    if (selectedProducts.some((item) => item.id === id)) {
      const pos = selectedProducts.findIndex((item) => {
        return item.id === id;
      });
      const selectedItems = [...selectedProducts];
      selectedItems[pos].quantity =
        type === "ADD"
          ? selectedItems[pos].quantity + 1
          : selectedItems[pos].quantity - 1;
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
