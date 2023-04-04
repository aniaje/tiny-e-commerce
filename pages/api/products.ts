import { NextApiRequest, NextApiResponse } from "next/types";
import { initMongoose } from "../../lib/mongoose";
import Product from "../../models/Product";

export async function findAllProducts() {
  return Product.find().exec();
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await initMongoose();
  const { ids } = req.query; //const ids = req.query.ids

  if (ids?.length) {
    const idsArray = ids?.split(",");
    res.json(await Product.find({ _id: { $in: idsArray } }).exec());
  }
}
