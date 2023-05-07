import { useBasket } from "@/components/ProductsContext";
import { IProduct } from "@/types";

let formatCurrency = new Intl.NumberFormat("en-US", {
  // The formatting style to use
  style: "currency",

  // The currency to use when "style" is set to "currency" (required)
  // An ISO 4217 currency codes
  currency: "USD",
});

export default function Product({
  _id,
  name,
  price,
  description,
  image,
}: IProduct) {
  const { increaseQuantity } = useBasket();

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-md justify-center
    "
    >
      <div className="">
        <img
          className=" object-scale-down h-48 w-96 "
          src={image}
          alt="Sunset in the mountains"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex">
        <span className="px-3 py-1 text-large font-semibold text-gray-700 mr-2 mb-2 grow">
          {price}
        </span>

        <button
          onClick={() => increaseQuantity(_id)}
          className=" bg-lime-200 hover:bg-lime-300 rounded-full px-3 py-1 text-2xl  text-gray-700 mr-2 mb-2 "
        >
          +
        </button>
      </div>
    </div>
  );
}
