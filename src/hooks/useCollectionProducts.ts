/**
 * ─── useCollectionProducts Hook ───────────────────────────────────────────────
 *
 * Fetches products that belong to a specific Shopify collection by its handle.
 * Uses `getCollectionProductsPaginated` (collection-scoped query) instead of
 * the general `getProducts` endpoint, which does NOT support `collection:`
 * filter queries on the Storefront API.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useCallback, useEffect } from 'react';
import { getCollectionProductsPaginated } from '@/api/services/product.service';
import type { Product } from '@/types/app.types';

interface UseCollectionProductsState {
  products: Product[];
  loading: boolean;
  loadingMore: boolean;
  refreshing: boolean;
  error: string | null;
  hasNextPage: boolean;
  endCursor: string | null;
}

interface UseCollectionProductsReturn extends UseCollectionProductsState {
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
}

export function useCollectionProducts(
  handle: string,
  sortKey = 'BEST_SELLING',
  pageSize = 20,
): UseCollectionProductsReturn {
  const [state, setState] = useState<UseCollectionProductsState>({
    products: [],
    loading: false,
    loadingMore: false,
    refreshing: false,
    error: null,
    hasNextPage: false,
    endCursor: null,
  });

  const fetchProducts = useCallback(
    async (cursor?: string, isRefresh = false) => {
      // Do not fetch if no handle is provided (hook called as fallback)
      if (!handle) return;

      if (isRefresh) {
        setState(prev => ({ ...prev, refreshing: true, error: null }));
      } else if (!cursor) {
        setState(prev => ({
          ...prev,
          loading: true,
          products: [],
          error: null,
        }));
      } else {
        setState(prev => ({ ...prev, loadingMore: true, error: null }));
      }

      try {
        const result = await getCollectionProductsPaginated(
          handle,
          pageSize,
          cursor,
          sortKey,
        );

        if (!result) {
          setState(prev => ({
            ...prev,
            loading: false,
            refreshing: false,
            loadingMore: false,
            error: 'Collection not found',
          }));
          return;
        }

        setState(prev => {
          const newItems = result.items;
          let updatedProducts = newItems;

          if (cursor) {
            // Append and deduplicate on pagination
            const existingIds = new Set(prev.products.map(p => p.id));
            const uniqueNew = newItems.filter(p => !existingIds.has(p.id));
            updatedProducts = [...prev.products, ...uniqueNew];
          }

          return {
            ...prev,
            products: updatedProducts,
            hasNextPage: result.pageInfo.hasNextPage,
            endCursor: result.pageInfo.endCursor,
            loading: false,
            refreshing: false,
            loadingMore: false,
            error: null,
          };
        });
      } catch (err: any) {
        setState(prev => ({
          ...prev,
          loading: false,
          refreshing: false,
          loadingMore: false,
          error: err?.message ?? 'Failed to fetch collection products',
        }));
      }
    },
    [handle, sortKey, pageSize],
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refresh = useCallback(async () => {
    await fetchProducts(undefined, true);
  }, [fetchProducts]);

  const loadMore = useCallback(async () => {
    if (
      !state.hasNextPage ||
      state.loadingMore ||
      state.loading ||
      state.refreshing
    ) {
      return;
    }
    await fetchProducts(state.endCursor ?? undefined);
  }, [
    fetchProducts,
    state.hasNextPage,
    state.loadingMore,
    state.loading,
    state.refreshing,
    state.endCursor,
  ]);

  return { ...state, refresh, loadMore };
}
