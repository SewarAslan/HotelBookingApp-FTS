import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  roomId: number | undefined;
  hotelId: number;
  roomType: string | null | undefined;
  roomPhotoUrl?: string | null | undefined;
  price: number | undefined;
  capacityOfAdults: number | undefined;
  capacityOfChildren: number | undefined;
  checkInDate: string;
  checkOutDate: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.roomId !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
