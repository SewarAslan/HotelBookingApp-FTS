import { act } from "@testing-library/react";
import { renderHookWithStore } from "../utils/renderWithStore";
import { useCart } from "../../../src/features/checkout/hooks/useCart";
import type { CartItem } from "../../../src/store/cartSlice";

const mockItem: CartItem = {
  roomId: 10,
  hotelId: 99,
  roomType: "Deluxe",
  roomPhotoUrl: "https://example.com/photo.jpg",
  price: 200,
  capacityOfAdults: 2,
  capacityOfChildren: 1,
  checkInDate: "2025-12-10",
  checkOutDate: "2025-12-12",
};

describe("useCart Hook", () => {
  test("returns empty cart initially", () => {
    const { result } = renderHookWithStore(() => useCart());

    expect(result.current.items).toEqual([]);
    expect(result.current.count).toBe(0);
  });

  test("removes item from cart", () => {
    const { result } = renderHookWithStore(() => useCart());

    act(() => {
      result.current.addToCart(mockItem);
    });

    act(() => {
      result.current.removeFromCart(mockItem.roomId!);
    });

    expect(result.current.items.length).toBe(0);
    expect(result.current.count).toBe(0);
  });

  test("clears the cart", () => {
    const { result } = renderHookWithStore(() => useCart());

    act(() => {
      result.current.addToCart(mockItem);
      result.current.addToCart({ ...mockItem, roomId: 20 });
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items.length).toBe(0);
    expect(result.current.count).toBe(0);
  });

  test("returns correct cart count", () => {
    const { result } = renderHookWithStore(() => useCart());

    act(() => {
      result.current.addToCart(mockItem);
    });

    expect(result.current.count).toBe(1);

    act(() => {
      result.current.addToCart({ ...mockItem, roomId: 22 });
    });

    expect(result.current.count).toBe(2);
  });
});
