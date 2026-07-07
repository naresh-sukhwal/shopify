/**
 * ─── Cart Store ───────────────────────────────────────────────────────────────
 *
 * Zustand store for Shopify cart state.
 * Persists cartId to AsyncStorage so the cart survives app restarts.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Cart, CartItem } from '@/types/app.types';

type CartStore = {
  /** Full cart object — populated after createCart / addCartLines etc. */
  cart: Cart | null;
  /** Persisted Shopify cart ID — used to restore the cart on next launch */
  cartId: string | null;
  /** Total item count badge */
  totalQuantity: number;

  setCart: (cart: Cart) => void;
  clearCart: () => void;
  setCartId: (id: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    set => ({
      cart: null,
      cartId: null,
      totalQuantity: 0,

      setCart: (cart: Cart) =>
        set({
          cart,
          cartId: cart.id,
          totalQuantity: cart.totalQuantity,
        }),

      clearCart: () =>
        set({
          cart: null,
          cartId: null,
          totalQuantity: 0,
        }),

      setCartId: (id: string) => set({ cartId: id }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist the cartId — we re-fetch the full cart on app launch
      partialize: state => ({ cartId: state.cartId }),
    },
  ),
);
