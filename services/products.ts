import { NextApiRequest, NextApiResponse } from "next/types";
import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/Product";
import { IProduct } from "@/types";

export async function findAllProducts(): Promise<IProduct[]> {
  //await initMongoose()
  //TODO: przywrocić mongoose
  return [{
    _id: '1',
    category: "cat1",
    description: 'Desc1',
    name: 'Product 1 ',
    price: "1",
    image: ''
  }]
  return Product.find().exec() as unknown as IProduct[];
}

export async function findAllProductsByIds(idsArray: string[]) {
  await initMongoose()
  return Product.find({ _id: { $in: idsArray } }).exec();
}

