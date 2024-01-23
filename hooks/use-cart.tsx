import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

import { Products } from "@/types/types";

interface CartItem extends Products {
  quantity: number;
}

interface CartStore {
  cart: Products[];
  quantity: () => number;
  addItem: (data: Products) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string, maxQuantity: number) => void;
  decreaseQuantity: (id: string) => void;
  removeAll: () => void;
  totalPrice: () => number;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cart: [],
      quantity: (): number => {
        const { cart } = get();
        if (cart.length) {
          return cart
            .map((item) => Number(item.quantity))
            .reduce((a, b) => a + b);
        }
        return 0;
      },
      addItem: (product: Products) => {
        const { cart } = get();
        const updatedCart = addToCart(cart, product);
        set({ cart: updatedCart });
        toast.success("Item has been added to cart", {
          position: "top-center",
        });
      },
      increaseQuantity: (id: string, maxQuantity: number) => {
        const { cart } = get();
        const updatedCart = incrementInCart(cart, id, maxQuantity);
        set({ cart: updatedCart });
      },
      decreaseQuantity: (id: string) => {
        const { cart } = get();
        const updatedCart = decrementInCart(cart, id);
        set({ cart: updatedCart });
      },
      removeItem: (id: string) => {
        set({ cart: [...get().cart.filter((item) => item.id !== id)] });
      },
      totalPrice: () => {
        const { cart } = get();
        if (cart.length) {
          return cart
            .map((item) => item.quantity * Number(item.price))
            .reduce((a, b) => a + b);
        }
        return 0;
      },
      removeAll: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

const addToCart = (cart: CartItem[], product: Products): CartItem[] => {
  const item = cart.find((item) => item.id === product.id);

  if (item) {
    return cart.map((item) => {
      if (item.id === product.id) {
        const itemQuantity = item.quantity >= 1 ? item.quantity : 1;
        return { ...item, quantity: itemQuantity };
      }
      return item;
    });
  }

  return [...cart, { ...product, quantity: 1 }];
};

const incrementInCart = (
  cart: CartItem[],
  id: string,
  maxQuantity: number
): CartItem[] => {
  const item = cart.find((item) => item.id === id);
  if (item) {
    return cart.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + 1;
        const incrementedQuantity =
          newQuantity <= maxQuantity ? newQuantity : maxQuantity;
        return { ...item, quantity: incrementedQuantity };
      }
      return item;
    });
  }
  return cart;
};

const decrementInCart = (cart: CartItem[], id: string): CartItem[] => {
  const item = cart.find((item) => item.id === id);
  if (item) {
    return cart.map((item) => {
      if (item.id === id) {
        const itemQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
        return { ...item, quantity: itemQuantity };
      }
      return item;
    });
  }
  return cart;
};

export default useCart;
