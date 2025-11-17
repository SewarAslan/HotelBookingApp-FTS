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
const loadCart = (): CartState => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : { items: [] };
  } catch {
    return { items: [] };
  }
};

const initialState: CartState = loadCart();

const saveCart = (state: CartState) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch {
    console.error("Failed to save cart");
  }
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      saveCart(state);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.roomId !== action.payload
      );
      saveCart(state);
    },

    clearCart: (state) => {
      state.items = [];
      saveCart(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
