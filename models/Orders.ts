import { Order } from "@/types";
import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema<Order>({
  name: String,
  street: String,
  city: String,
  email: String,
  basketProducts: [],
});

const Order = models?.Order || model<Order>("Order", OrderSchema);

export default Order;
