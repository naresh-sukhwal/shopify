/**
 * ─── Shopify Auth Store ───────────────────────────────────────────────────────
 *
 * Zustand store for Shopify Customer authentication state.
 * Persists customer access token and profile to AsyncStorage.
 *
 * NOTE: This is separate from authStore.ts which handles the non-Shopify
 * backend (OTP login). This store is exclusively for Shopify Customer tokens.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Customer, CustomerToken } from '@/types/app.types';

type ShopifyAuthStore = {
  /** Shopify Customer Access Token */
  customerAccessToken: string | null;
  /** ISO 8601 expiry date string */
  customerTokenExpiresAt: string | null;
  /** Logged-in customer profile */
  customer: Customer | null;
  /** Whether the customer is logged in to Shopify */
  isCustomerLoggedIn: boolean;

  setCustomerToken: (token: CustomerToken) => void;
  setCustomer: (customer: Customer) => void;
  clearCustomerSession: () => void;
};

export const useShopifyAuthStore = create<ShopifyAuthStore>()(
  persist(
    set => ({
      customerAccessToken: null,
      customerTokenExpiresAt: null,
      customer: null,
      isCustomerLoggedIn: false,

      setCustomerToken: (token: CustomerToken) =>
        set({
          customerAccessToken: token.accessToken,
          customerTokenExpiresAt: token.expiresAt,
          isCustomerLoggedIn: true,
        }),

      setCustomer: (customer: Customer) => set({ customer }),

      clearCustomerSession: () =>
        set({
          customerAccessToken: null,
          customerTokenExpiresAt: null,
          customer: null,
          isCustomerLoggedIn: false,
        }),
    }),
    {
      name: 'shopify-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

// ─── Selectors ────────────────────────────────────────────────────────────────

/** Returns true if the stored token is not yet expired */
export function isCustomerTokenValid(store: ShopifyAuthStore): boolean {
  if (!store.customerAccessToken || !store.customerTokenExpiresAt) return false;
  return new Date(store.customerTokenExpiresAt) > new Date();
}
