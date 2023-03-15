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
export default function CheckoutPag() {
  const { selectedProducts, addProduct, removeProduct } = useBasket();
  const [productsInfos, setProductsInfos] = useState([]);

  useEffect(() => {
    const uniqueIds = selectedProducts.map((item) => item.id);
    if (selectedProducts.length === 0) {
      setProductsInfos([]);
    }
    console.log(selectedProducts);
    axios
      .get("/api/products?ids=" + uniqueIds.join(","))
      .then(function (response) {
        console.log(response.data);
        setProductsInfos(response.data);
      });
  }, [selectedProducts]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<orderForm>();
  const onSubmit: SubmitHandler<orderForm> = (data) => console.log(data);

  let delivery = 5;

  let subtotal = useMemo(() => {
    return productsInfos
      .filter((item) =>
        selectedProducts.find((product) => item._id === product.id)
      )
      .reduce((acc, item) => {
        const quantity =
          selectedProducts.find((product) => product.id === item._id)
            ?.quantity || 0;

        return acc + item.price * quantity;
      }, 0);
  }, [selectedProducts, productsInfos]);

  // for (let id of selectedProducts) {
  //   const price = productsInfos.find((p) => p._id === id)?.price;
  //   subtotal = subtotal + price;
  // }

  const total = subtotal + delivery;
  return (
    <Layout>
      <h2 className="text-center pb-24 text-2xl">Checkout</h2>
      {!productsInfos.length && <div>your shopping cart is empty</div>}

      {productsInfos.length
        ? productsInfos.map((productInfo: IProduct) => (
            <div className="flex mb-5">
              <div className="bg-gray-100 p-3 w-64 rounded-xl">
                <img src={productInfo.image} alt="" />
              </div>
              <div
                className="pl-4
            "
              >
                <h3 className="text-lg font-semi-bold">{productInfo.name} </h3>
                <p className="text-sm leading-4 text-gray-600">
                  {productInfo.description}
                </p>
                <div className="flex">
                  <div className="grow">${productInfo.price}</div>
                  <div className="">
                    <button
                      onClick={() => removeProduct(productInfo._id)}
                      className="border border-emerald-400 px-2 rounded-lg text-emerald "
                    >
                      -
                    </button>
                    <span className="px-4">
                      {selectedProducts.find(
                        (item) => item.id === productInfo._id
                      )?.quantity || 0}
                    </span>
                    <button
                      onClick={() => addProduct(productInfo._id)}
                      className="bg-emerald-400 border  px-2 mr-3 rounded-lg text-emerald "
                    >
                      +
                    </button>
                    {/* //item/s depending on q */}
                  </div>
                </div>
              </div>
            </div>
          ))
        : ""}
      {productsInfos.length ? (
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
          </div>
        </form>
      ) : (
        ""
      )}
    </Layout>
  );
}
