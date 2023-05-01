import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
//import { User } from "firebase/auth";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import * as SecureStore from "expo-secure-store";
//import { string } from "prop-types";

export interface CartItem {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  rating: [];
  country: string;
  category: string;
  quantity: number;
  userId: string;
}

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  count: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  count: 0,
};

const getUid = async () => {
  try {
    const rawUid = await SecureStore.getItemAsync("userId");
    const uid = rawUid;
    //console.log(uid);
    return uid;
  } catch (error) {
    console.log(error);
    return null;
  }
};
//const userId = getValueFor("userId");

let userId: string | null;
getUid()
  .then((uid) => {
    userId = uid; // This will log the value of uid retrieved from AsyncStorage
    // You can use the value of uid here or pass it to another function
    // For example:
    // doSomethingWithUid(uid);
  })
  .catch((error) => {
    console.log(error);
  });

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const { item, quantity } = action.payload;
      state.totalPrice += Number(item.price) * quantity;
      const existingItem = state.items.find(
        (cartItem) => cartItem.id === item.id
      );
      state.count += 1;
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...item, quantity, userId });
      }
    },

    subtractItem(state, action) {
      const { item, quantity } = action.payload;
      const existingItem = state.items.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem?.quantity === 1) {
        return;
      }
      if (existingItem) {
        existingItem.quantity -= quantity;
      } else {
        return;
        //state.items.push({ ...item, quantity });
      }
      state.totalPrice -= Number(item.price) * quantity;
      state.count -= 1;
    },

    removeItem: (state, action) => {
      const { item, quantity } = action.payload;
      const index = state.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      //console.log("index:", index);

      if (index !== -1) {
        const price =
          Number(state.items[index].price) * state.items[index].quantity;
        const quantity = state.items[index].quantity;
        state.items.splice(index, 1);
        state.count -= quantity;
        state.totalPrice -= price;
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((cartItem) => cartItem.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    clearCart: (state) => initialState,
  },
});

export const { addItem, subtractItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
