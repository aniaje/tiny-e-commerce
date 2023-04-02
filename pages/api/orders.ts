import { NextApiRequest, NextApiResponse } from "next/types";
import { initMongoose } from "../../lib/mongoose";
import Order from "../../models/Orders";

export default async function addOrder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, street, city, email, basketProducts } = req.body;
  await initMongoose();

  const order = await Order.create(req.body);
  res.json({ order });
}
