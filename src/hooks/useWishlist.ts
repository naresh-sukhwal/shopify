/**
 * ─── useWishlist Hook ──────────────────────────────────────────────────────────
 *
 * Thin wrapper around the Wishlist Zustand store.
 * Provides wishlistIds, toggleWishlist, isWishlisted helpers.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useCallback } from 'react';
import { useWishlistStore } from '@/store/wishlistStore';

export function useWishlist() {
  const wishlistIds = useWishlistStore(state => state.wishlistIds);
  const toggleWishlistStore = useWishlistStore(state => state.toggleWishlist);

  const isWishlisted = useCallback(
    (productId: string): boolean => wishlistIds.includes(productId),
    [wishlistIds],
  );

  const toggleWishlist = useCallback(
    (productId: string) => {
      toggleWishlistStore(productId);
    },
    [toggleWishlistStore],
  );

  return {
    wishlistIds,
    isWishlisted,
    toggleWishlist,
  };
}
