import { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Layout from "@/components/Layout";
import { useBasket } from "@/ProductsContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { IOrder, IProduct, IProductQuantity } from "@/types";

import router from "next/router";

export interface CartProductNonDB {
  product: IProduct;
  quantity: number;
}

const PRODUCTS = "PRODUCTS";
const ORDER = "ORDER";

export default function CheckoutPag() {
  const {
    basketItems,
    increaseQuantity,
    decreaseQuantity,
    basketFinal,
    setBasketFinal,
    delivery,
    subtotal,
    total,
  } = useBasket();
  const [basket, setBasket] = useState<IProduct[]>([]);
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] =
    useState<Boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IOrder>();

  const ids = basketItems.map((item) => item.id);

  function getProducts() {
    return axios.get("/api/products?ids=" + ids.join(","));
  }

  const {
    isLoading: isLoadingProducts,
    isError,
    data,
  } = useQuery(PRODUCTS, async () => {
    const { data } = await axios("/api/products?ids=" + ids.join(","));
    return data;
  });

  useEffect(() => setBasket(data), [basketItems]);

  console.log(data);

  if (isLoadingProducts) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching products</div>;
  }

  // useEffect(() => {
  //   if (basketItems.length) {
  //     setLoading(true);
  //     const ids = basketItems.map((item) => item.id);
  //     axios
  //       .get("/api/products?ids=" + ids.join(","))
  //       .then(function (response) {
  //         const data = response.data;
  //         setBasket(data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       })
  //       .finally(() => {
  //         console.log("success");
  //         setLoading(false);
  //       });
  //   } else {
  //     setLoading(false);
  //   }
  // }, [basketItems]);

  const basketProducts = useMemo(() => {
    const products = data.filter((item) =>
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
  }, [basket]);

  const onSubmit: SubmitHandler<IOrder> = (data) => {
    axios
      .post("/api/orders", data)

      .then((response) => {
        setIsSuccessfullySubmitted(true);

        setTimeout(() => router.push("/thankyou"), 1500);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
  // if (isLoading) return <Spinner />;

  return (
    <Layout>
      <h2 className="text-center pb-24 text-2xl">Checkout</h2>
      {!data.length && <div>your shopping cart is empty</div>}

      {data.map((product) => (
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
            {isSuccessfullySubmitted && (
              <p className="text-green-700">
                You've made an order! Redireting to payment...
              </p>
            )}
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
function setBasketFinal(basketProducts: IProductQuantity[]) {
  throw new Error("Function not implemented.");
}
