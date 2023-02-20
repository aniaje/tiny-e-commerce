import { model, models, Schema } from "mongoose";

interface Product {
  name: String;
  description: String;
  price: String;
  category: String;
  image: String;
}

const ProductSchema = new Schema<Product>({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
});

const Product = models?.Product || model<Product>("Product", ProductSchema);

export default Product;
