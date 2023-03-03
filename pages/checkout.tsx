import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useBasket } from "@/ProductsContext";
import axios from "axios";
import { IProduct } from "@/types";

export default function CheckoutPag() {
  const { selectedProducts, addProduct, removeProduct } = useBasket();
  const [productsInfos, setProductsInfos] = useState([]);
  console.log(selectedProducts);

  useEffect(() => {
    const uniqueIds = selectedProducts.map((item) => item.id);

    axios
      .get("/api/products?ids=" + uniqueIds.join(","))
      .then(function (response) {
        console.log(response.data);
        setProductsInfos(response.data);
      });
  }, [selectedProducts]);

  return (
    <Layout>
      <h2 className="text-center pb-24 text-2xl">Checkout</h2>
      {!productsInfos.length && <div>your shopping cart is empty</div>}
      {console.log(productsInfos)}
      {productsInfos.map((productInfo: IProduct) => (
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
                  {selectedProducts.find((item) => item.id === productInfo._id)
                    ?.quantity || 0}
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
      ))}
    </Layout>
  );
}
