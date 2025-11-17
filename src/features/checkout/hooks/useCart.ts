import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import {
  addToCart,
  removeFromCart,
  clearCart,
  type CartItem,
} from "../../../store/cartSlice";

export function useCart() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const count = items.length;

  return {
    items,
    count,
    addToCart: (item: CartItem) => dispatch(addToCart(item)),
    removeFromCart: (id: number) => dispatch(removeFromCart(id)),
    clearCart: () => dispatch(clearCart()),
  };
}
