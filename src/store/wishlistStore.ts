import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WishlistStore = {
  wishlistIds: string[];
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (id: string) => void;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlistIds: [],
      addToWishlist: (id: string) => {
        const current = get().wishlistIds;
        if (!current.includes(id)) {
          set({ wishlistIds: [...current, id] });
        }
      },
      removeFromWishlist: (id: string) => {
        set({ wishlistIds: get().wishlistIds.filter(wId => wId !== id) });
      },
      toggleWishlist: (id: string) => {
        const current = get().wishlistIds;
        if (current.includes(id)) {
          set({ wishlistIds: current.filter(wId => wId !== id) });
        } else {
          set({ wishlistIds: [...current, id] });
        }
      },
      clearWishlist: () => set({ wishlistIds: [] }),
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
