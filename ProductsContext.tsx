import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface BasketItem {
  id: string;
  quantity: number;
}

interface BasketProviderProps {
  children: ReactNode;
}

interface Context {
  getItemQuantity: (id: string) => number;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromBasket: (id: string) => void;
  basketQuantity: number;
  basketItems: BasketItem[];
}

const Context = createContext({} as Context);

export const useBasket = () => useContext(Context);

export function ContextProvider({ children }: BasketProviderProps) {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

  useEffect(() => {
    try {
      setBasketItems(JSON.parse(localStorage.getItem("cart") || "[]"));
    } catch {
      console.log(Error);
    }
  }, []);

  const basketQuantity = useMemo(() => {
    return basketItems.reduce((quantity, item) => item.quantity + quantity, 0);
  }, [basketItems]);

  function getItemQuantity(id: string) {
    return basketItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseQuantity(id: string) {
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

    localStorage.setItem("cart", JSON.stringify(cart));
    setBasketItems(cart);
  }
  console.log(basketItems);

  function decreaseQuantity(id: string) {
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
    <Context.Provider
      value={{
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromBasket,
        basketItems,
        basketQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
}
