export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}
export interface ICartItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}
