export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

export interface IProductQ extends IProduct {
  quantity: number;
}
