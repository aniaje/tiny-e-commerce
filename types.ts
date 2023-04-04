export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

export interface IProductQuantity extends IProduct {
  quantity: number;
}
