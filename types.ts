import React from "react";

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  quantity?: number;
}

export interface IProductQuantity extends IProduct {
  quantity: number;
}

export type IOrder = {
  name: string;
  street: string;
  city: string;
  email: string;
  basketProducts?: [];
  mutate?: () => void;
};

export type RootProps = {
  children: React.ReactNode;
};
