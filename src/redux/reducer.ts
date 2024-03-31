import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { AddToCart, RemoveToCart } from "./action";
import { ICartItem, IProduct } from "../common/types";

export const fetchAllProducts = createAsyncThunk("products/all", async () => {
  const response = await (
    await fetch(`${process.env.REACT_APP_URL}/product`)
  ).json();
  return response.data;
});

const initialState = {
  products: [],
  cart: [],
  isLoading: false,
} as {
  products: IProduct[];
  cart: ICartItem[];
  isLoading: boolean;
};

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(AddToCart, (state, action) => {
      const isAlreadyExist = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (isAlreadyExist) {
        return {
          ...state,
          cart: state.cart.map((item) => {
            return item._id === action.payload._id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item;
          }),
        };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              ...action.payload,
              quantity: 1,
            },
          ],
        };
      }
    })
    .addCase(RemoveToCart, (state, action) => {
      const updatedItems = state.cart.map((item) => {
        return item._id === action.payload._id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item;
      });
      return {
        ...state,
        cart: updatedItems.filter((item) => item.quantity > 0),
      };
    })
    .addCase(fetchAllProducts.fulfilled, (state, action) => {
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    })
    .addCase(fetchAllProducts.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
});

export default cartReducer;
