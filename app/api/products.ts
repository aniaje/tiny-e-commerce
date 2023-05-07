import { findAllProducts, findAllProductsByIds } from "@/services/products";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ids } = req.query as { ids: string }; //const ids = req.query.ids

  if (ids?.length) {
    const idsArray = ids?.split(",");
    const products = findAllProductsByIds(idsArray)
    return res.json(products);
  }
  const products = await findAllProducts();
  return res.json(products);
}
