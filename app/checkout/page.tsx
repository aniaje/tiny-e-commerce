"use client"

import { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Layout from "@/components/Layout";
import { useBasket } from "@/components/ProductsContext";
import axios from "axios";
import { IOrder, IProduct } from "@/types";
import router from "next/router";
import { useQuery, useMutation } from "react-query";

export interface CartProductNonDB {
  product: IProduct;
  quantity: number;
}

interface IOrderResponse extends IOrder {
  id: number;
}

interface State {
  orderNumber: string;
}

const PRODUCTS = "PRODUCTS";
const ORDER = "ORDER";

export default function CheckoutPage() {
  const {
    basketItems,
    increaseQuantity,
    decreaseQuantity,
    setBasketFinal,
    delivery,
    subtotal,
    total,
  } = useBasket();

  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] =
    useState<Boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IOrder>();

  const ids = basketItems.map((item) => item.id);

  const {
    isLoading: isLoadingProducts,
    data: basket = [],
  } = useQuery(PRODUCTS, async () => {
    if (!ids.length) {
      return []
    }
    const { data } = await axios<IProduct[]>(
      "/api/products?ids=" + ids.join(",")
    );
    return data;
  });

  const basketProducts = useMemo(() => {
    const products = basket.filter((item) =>
      basketItems.find((product) => item._id === product.id)
    );
    return products.map((item) => ({
      ...item,
      quantity:
        basketItems.find((product) => product.id === item._id)?.quantity || 0,
    }));
  }, [basket, basketItems]);

  useEffect(() => {
    setBasketFinal(basketProducts);
  }, [basket, basketProducts, setBasketFinal]);

  const { mutate: confirmOrder } = useMutation(
    ORDER,
    async (data: IOrder) => await axios.post("/api/orders", data),
    {
      onSuccess: (response) => {
        setIsSuccessfullySubmitted(true);
        setIsOpen(true);
        localStorage.removeItem("cart");
        setBasketFinal([]);
        const orderNumber = response.data.order._id;
        setTimeout(() => {
          router.push({
            pathname: "/thankyou",
            query: { total: total, orderNumber: orderNumber },
          });
        }, 1000);
      },
    }
  );

  const onSubmit: SubmitHandler<IOrder> = (data): void => {
    confirmOrder(data);
  };

  function handleClose(): void {
    setIsOpen(false);
  }

  return (
    <Layout>
      <h2 className="text-center pb-24 text-2xl">Checkout</h2>
      {isLoadingProducts && <div>Loading your cart...</div>}
      {!basketItems.length && <div>your shopping cart is empty</div>}

      {basketProducts.map((product) => (
        <div key={product._id} className="flex mb-5">
          <div className="bg-gray-100 p-3 w-64 rounded-xl">
            <img src={product.image} alt={product.name} />
          </div>
          <div
            className="pl-4
     "
          >
            <h3 className="text-lg font-semi-bold">{product.name} </h3>
            <p className="text-sm leading-4 text-gray-600">
              {product.description}
            </p>
            <div className="flex">
              <div className="grow">${product.price}</div>
              <div className="">
                <button
                  onClick={() => decreaseQuantity(product._id)}
                  className="border border-emerald-400 px-2 rounded-lg text-emerald "
                >
                  -
                </button>
                <span className="px-4">{product.quantity}</span>
                <button
                  onClick={() => increaseQuantity(product._id)}
                  className="bg-emerald-400 border  px-2 mr-3 rounded-lg text-emerald "
                >
                  +
                </button>
                {/* //item/s depending on q */}
              </div>
            </div>
          </div>
        </div>
      ))}
      {basketItems.length && (
        <>
          <div className="mt-4">
            {" "}
            <div className="flex ">
              <h3 className="grow text-gray-400 font-bold ">subtotal:</h3>
              <h3>{subtotal}</h3>
            </div>
            <div className="flex pb-2">
              <h3 className="grow text-gray-400 font-bold ">delivery:</h3>
              <h3>{delivery}</h3>
            </div>
            <div className="flex border-t border-dashed border-emerald-400 pt-2">
              <h3 className="grow text-gray-400 font-bold ">total:</h3>
              <h3>{total}</h3>
            </div>
          </div>
        </>
      )}
      {basketItems.length && (
        <>
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-8 mb-3 text-center font-emerald font-bold">
              ORDER DATA
            </h3>
            <input
              type="hidden"
              {...register("basketProducts")}
              value={JSON.stringify(basketItems)}
            />

            <input
              {...register("name", { required: true })}
              className="bg-gray-100 w-full py-2 px-4 rounded mb-2 "
              type="text"
              autoComplete="name"
              placeholder="Your Name"
            />
            {errors.name && <span>This field is required</span>}
            <input
              {...register("street")}
              className="bg-gray-100 w-full py-2 px-4 rounded mb-2"
              type="text"
              placeholder="Street adress, number"
            />
            <input
              {...register("city")}
              className="bg-gray-100 w-full py-2 px-4 rounded mb-2"
              type="text"
              placeholder="City and postal code"
            />
            <input
              {...register("email")}
              className="bg-gray-100 w-full py-2 px-4 rounded mb-2"
              type="text"
              autoComplete="email"
              placeholder="E-mail address"
            />

            <div className="flex justify-end p-4">
              <input
                className="bg-emerald-400 py-2 px-4 rounded mx-auto"
                type="submit"
                value="Order now"
                disabled={isSubmitting}
              />
            </div>
          </form>
        </>
      )}
    </Layout>
  );
}
