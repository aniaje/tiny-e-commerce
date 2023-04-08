import { IOrder } from "@/types";
import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema<IOrder>({
  name: String,
  street: String,
  city: String,
  email: String,
  basketProducts: [],
});

const Order = models?.Order || model<IOrder>("Order", OrderSchema);

export default Order;
