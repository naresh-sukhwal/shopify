/**
 * ─── Address Store ────────────────────────────────────────────────────────────
 *
 * Zustand store for local address management.
 * - Works for both guest and logged-in users.
 * - Persists addresses and selected address to AsyncStorage.
 * - No dummy/seed data — starts empty and grows from user input.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Address = {
  id: string;
  title: string;
  isDefault: boolean;
  firstName: string;
  lastName: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  email?: string;
  address: string; // formatted full address string
};

type AddressStore = {
  addresses: Address[];
  /** ID of the address the user last selected in CheckoutAddressScreen */
  selectedAddressId: string | null;

  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  setSelectedAddressId: (id: string) => void;
  clearAddresses: () => void;
};

export const useAddressStore = create<AddressStore>()(
  persist(
    (set, get) => ({
      addresses: [],
      selectedAddressId: null,

      addAddress: (address: Address) =>
        set(state => {
          // If this is the first address or marked as default → make it default
          const isFirstAddress = state.addresses.length === 0;
          const shouldBeDefault = isFirstAddress || address.isDefault;

          const updatedAddresses = shouldBeDefault
            ? [
                { ...address, isDefault: true },
                ...state.addresses.map(a => ({ ...a, isDefault: false })),
              ]
            : [...state.addresses, address];

          return {
            addresses: updatedAddresses,
            // Auto-select new address when added
            selectedAddressId: address.id,
          };
        }),

      removeAddress: (id: string) =>
        set(state => {
          const remaining = state.addresses.filter(a => a.id !== id);
          // If removed address was selected, fall back to default or first
          const currentSelected = state.selectedAddressId;
          const newSelected =
            currentSelected === id
              ? remaining.find(a => a.isDefault)?.id ||
                remaining[0]?.id ||
                null
              : currentSelected;

          return {
            addresses: remaining,
            selectedAddressId: newSelected,
          };
        }),

      setDefaultAddress: (id: string) =>
        set(state => ({
          addresses: state.addresses.map(a => ({
            ...a,
            isDefault: a.id === id,
          })),
        })),

      setSelectedAddressId: (id: string) =>
        set({ selectedAddressId: id }),

      clearAddresses: () =>
        set({ addresses: [], selectedAddressId: null }),
    }),
    {
      name: 'address-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
