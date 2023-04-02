import React from "react";

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

export type Order = {
  name: string;
  street: string;
  city: string;
  email: string;
  basketProducts?: [];
};

export type RootProps = {
  children: React.ReactNode;
};
