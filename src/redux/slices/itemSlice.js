import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  data: [],
  cart: [],
  totalPrice: 0,
};

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    addToCart(state, action) {
      const findItem = state.cart.find((item) => item.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.cart.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.cart.reduce((sum, item) => {
        return sum + item.count * item.price;
      }, 0);
    },
    plusItem(state, action) {
      const findItem = state.cart.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.count++;
      }

      state.totalPrice = state.cart.reduce((sum, item) => {
        return sum + item.count * item.price;
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.cart.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      if (findItem.count === 0) {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      }

      state.totalPrice = state.cart.reduce((sum, item) => {
        return sum + item.count * item.price;
      }, 0);
    },
    deleteItemFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.totalPrice = state.cart.reduce((sum, item) => {
        return sum + item.count * item.price;
      }, 0);
    },
    clearCart(state) {
      state.cart = [];
      state.totalPrice = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setData,
  addToCart,
  plusItem,
  minusItem,
  deleteItemFromCart,
  clearCart,
} = itemSlice.actions;

export default itemSlice.reducer;
