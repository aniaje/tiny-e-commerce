import { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Layout from "@/components/Layout";
import { useBasket } from "@/ProductsContext";
import axios from "axios";
import { IProduct, IProductQuantity } from "@/types";

type OrderForm = {
  name: string;
  street: string;
  city: string;
  email: string;
};

export interface CartProductNonDB {
  product: IProduct;
  quantity: number;
}

export default function CheckoutPag() {
  const { basketItems, increaseQuantity, decreaseQuantity } = useBasket();

  const [basket, setBasket] = useState<IProduct[]>([]);

  useEffect(() => {
    const uniqueIds = basketItems.map((item) => item.id);
    //FIXME: if ids in basketItems
    //loading state react-query use Query
    axios
      .get("/api/products?ids=" + uniqueIds.join(","))
      .then(function (response) {
        const data = response.data;
        setBasket(data);
      });
  }, [basketItems]);

  const basketProducts = useMemo<IProductQuantity[]>(() => {
    const products = basket.filter((item) =>
      basketItems.find((product) => item._id === product.id)
    );
    return products.map((item) => ({
      ...item,
      quantity:
        basketItems.find((product) => product.id === item._id)?.quantity || 0,
    }));
  }, [basket, basketItems]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrderForm>();
  const onSubmit: SubmitHandler<OrderForm> = (data) => console.log(data);

  return (
    <Layout>
      <h2 className="text-center pb-24 text-2xl">Checkout</h2>
      {!basketItems.length && <div>your shopping cart is empty</div>}

      {basketProducts.map((product) => (
        <div key={product._id} className="flex mb-5">
          <div className="bg-gray-100 p-3 w-64 rounded-xl">
            <img src={product.image} alt="" />
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
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="mt-8 mb-3 text-center">order here!</h3>
          <input
            {...register("name", { required: true })}
            className="bg-gray-100 w-full py-2 px-4 rounded mb-2 "
            type="text"
            defaultValue=""
            placeholder="Your Name"
          />
          {errors.name && <span>This field is required</span>}
          <input
            {...register("street")}
            className="bg-gray-100 w-full py-2 px-4 rounded mb-2"
            type="text"
            defaultValue=""
            placeholder="Street adress, number"
          />
          <input
            {...register("city")}
            className="bg-gray-100 w-full py-2 px-4 rounded mb-2"
            type="text"
            defaultValue=""
            placeholder="City and postal code"
          />
          <input
            {...register("email")}
            className="bg-gray-100 w-full py-2 px-4 rounded mb-2"
            type="text"
            defaultValue=""
            placeholder="E-mail address"
          />
          <input className="bg-emerald-400 py-2 px-4 rounded" type="submit" />
          <div className="mt-4">
            {" "}
            <div className="flex ">
              <h3 className="grow text-gray-400 font-bold ">subtotal:</h3>
              <h3></h3>
            </div>
            <div className="flex pb-2">
              <h3 className="grow text-gray-400 font-bold ">delivery:</h3>
              <h3></h3>
            </div>
            <div className="flex border-t border-dashed border-emerald-400 pt-2">
              <h3 className="grow text-gray-400 font-bold ">total:</h3>
              <h3></h3>
            </div>
          </div>
        </form>
      )}
    </Layout>
  );
}
