import { IProduct } from "@/types";
import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema<IProduct>({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
});

const Product = models?.Product || model<IProduct>("Product", ProductSchema);

export default Product;
