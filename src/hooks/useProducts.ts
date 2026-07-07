import { useState, useCallback, useEffect, useRef } from 'react';
import { searchProducts, getProducts, GetProductsParams } from '@/api/services/product.service';
import type { Product, PaginatedResult } from '@/types/app.types';
interface UseSearchProductsState {
  products: Product[];
  loading: boolean;
  refreshing: boolean;
  loadingMore: boolean;
  error: string | null;
  hasNextPage: boolean;
  endCursor: string | null;
}
interface UseSearchProductsReturn extends UseSearchProductsState {
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}
export function useSearchProducts(initialQuery = ''): UseSearchProductsReturn {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [state, setState] = useState<UseSearchProductsState>({
    products: [],
    loading: false,
    refreshing: false,
    loadingMore: false,
    error: null,
    hasNextPage: false,
    endCursor: null,
  });
  const queryRef = useRef(searchQuery);
  queryRef.current = searchQuery;
  const fetchProducts = useCallback(
    async (cursor?: string, isRefresh = false) => {
      const currentQuery = queryRef.current.trim();
      if (!currentQuery) {
        setState({
          products: [],
          loading: false,
          refreshing: false,
          loadingMore: false,
          error: null,
          hasNextPage: false,
          endCursor: null,
        });
        return;
      }
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
        const result: PaginatedResult<Product> = await searchProducts(
          currentQuery,
          20,
          cursor,
        );
        if (queryRef.current.trim() !== currentQuery) {
          return;
        }
        setState(prev => ({
          ...prev,
          products: cursor ? [...prev.products, ...result.items] : result.items,
          hasNextPage: result.pageInfo.hasNextPage,
          endCursor: result.pageInfo.endCursor,
          loading: false,
          refreshing: false,
          loadingMore: false,
          error: null,
        }));
      } catch (err: any) {
        if (queryRef.current.trim() !== currentQuery) {
          return;
        }
        setState(prev => ({
          ...prev,
          loading: false,
          refreshing: false,
          loadingMore: false,
          error: err?.message ?? 'Failed to search products',
        }));
      }
    },
    [],
  );
  useEffect(() => {
    fetchProducts();
  }, [searchQuery, fetchProducts]);
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
  return { ...state, refresh, loadMore, searchQuery, setSearchQuery };
}

interface UseProductsState {
  products: Product[];
  loading: boolean;
  loadingMore: boolean;
  refreshing: boolean;
  error: string | null;
  hasNextPage: boolean;
  endCursor: string | null;
}

export function useProducts(params: GetProductsParams = {}) {
  const [state, setState] = useState<UseProductsState>({
    products: [],
    loading: false,
    loadingMore: false,
    refreshing: false,
    error: null,
    hasNextPage: false,
    endCursor: null,
  });

  const paramsKey = JSON.stringify(params);

  const fetchProducts = useCallback(
    async (cursor?: string, isRefresh = false) => {
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
        const parsedParams = JSON.parse(paramsKey);
        const result = await getProducts({ ...parsedParams, after: cursor });
        
        setState(prev => {
          const newItems = result.items;
          let updatedProducts = newItems;

          if (cursor) {
            // Prevent duplicate products while appending
            const existingIds = new Set(prev.products.map(p => p.id));
            const uniqueNewItems = newItems.filter(p => !existingIds.has(p.id));
            updatedProducts = [...prev.products, ...uniqueNewItems];
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
          error: err?.message ?? 'Failed to fetch products',
        }));
      }
    },
    [paramsKey],
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
