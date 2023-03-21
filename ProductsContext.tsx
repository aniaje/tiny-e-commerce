import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface BasketItem {
  id: string;
  quantity: number;
}

interface BasketProviderProps {
  children: ReactNode;
}

interface BasketContext {
  getItemQuantity: (id: string) => number;
  increaseBasketQuantity: (id: string) => void;
  decreaseBasketQuantity: (id: string) => void;
  removeFromBasket: (id: string) => void;
  basketQuantity: number;
  basketItems: BasketItem[];
}

const BasketContext = createContext({} as BasketContext);

export const useBasket = () => useContext(BasketContext);

export function BasketContextProvider({ children }: BasketProviderProps) {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

  useEffect(() => {
    setBasketItems(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const basketQuantity = basketItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: string) {
    return basketItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseBasketQuantity(id: string) {
    let cart: BasketItem[] = [...basketItems];

    if (!basketItems.find((item) => item.id === id)) {
      cart.push({ id, quantity: 1 });
    } else {
      cart = basketItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    }
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    setBasketItems(cart);
  }
  console.log(basketItems);

  function decreaseBasketQuantity(id: string) {
    setBasketItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromBasket(id: string) {
    setBasketItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <BasketContext.Provider
      value={{
        getItemQuantity,
        increaseBasketQuantity,
        decreaseBasketQuantity,
        removeFromBasket,
        basketItems,
        basketQuantity,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}
