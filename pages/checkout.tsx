import { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Layout from "@/components/Layout";
import { useBasket } from "@/ProductsContext";
import axios from "axios";
import { IProduct } from "@/types";

type orderForm = {
  name: String;
  street: String;
  city: String;
  email: String;
};

export interface CartProductDB {
  productId: string;
  quantinty: number;
}

export interface CartProductNonDB {
  product: IProduct;
  quantity: number;
}

export default function CheckoutPag() {
  const { basketItems, increaseBasketQuantity, decreaseBasketQuantity } =
    useBasket();

  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const uniqueIds = basketItems.map((item) => item.id);
    axios
      .get("/api/products?ids=" + uniqueIds.join(","))
      .then(function (response) {
        const data = response.data;
        const result = data.map((item) => item._id);
        console.log(result);
        console.log(basketItems);
        console.log(data);
        setBasket(result);
      });
  }, [basketItems]);
  console.log(basket);
  // const basket2 = [
  //   {
  //     product1: {
  //       productID: "63f2188149a923df6c6e1d2e",
  //       quantity: 3,
  //     },
  //     product2: {
  //       productID: "63f235d349a923df6c6e1d2f",
  //       quantity: 4,
  //     },
  //     product3: {
  //       productID: "63f235f349a923df6c6e1d30",
  //       quantity: 4,
  //     },
  //   },
  // ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<orderForm>();
  const onSubmit: SubmitHandler<orderForm> = (data) => console.log(data);

  return (
    <Layout>
      <h2 className="text-center pb-24 text-2xl">Checkout</h2>
      {!basketItems.length && <div>your shopping cart is empty</div>}

      {basket.map((product: IProduct) => (
        <div className="flex mb-5">
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
                  onClick={() => decreaseBasketQuantity(product._id)}
                  className="border border-emerald-400 px-2 rounded-lg text-emerald "
                >
                  -
                </button>
                <span className="px-4"></span>
                <button
                  onClick={() => increaseBasketQuantity(product._id)}
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

      {!basketItems.length && (
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
          {/* <div className="mt-4">
            {" "}
            <div className="flex ">
              <h3 className="grow text-gray-400 font-bold ">subtotal:</h3>
              <h3>{subtotal}</h3>
            </div>
            <div className="flex pb-2">
              <h3 className="grow text-gray-400 font-bold ">delivery:</h3>
              <h3></h3>
            </div>
            <div className="flex border-t border-dashed border-emerald-400 pt-2">
              <h3 className="grow text-gray-400 font-bold ">total:</h3>
              <h3></h3>
            </div>
          </div> */}
        </form>
      )}
    </Layout>
  );
}
