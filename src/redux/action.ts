import { createAction } from "@reduxjs/toolkit";
import { ICartItem, IProduct } from "../common/types";

export const AddToCart = createAction<IProduct>("ADD_TO_CART");
export const RemoveToCart = createAction<ICartItem>("REMOVE_TO_CART");
