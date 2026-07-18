/**
 * ─── useCollections Hook ──────────────────────────────────────────────────────
 *
 * Fetches Shopify Storefront collections and maps them to the FashionCategory
 * shape used across HomeScreen and SearchScreen.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useCallback, useEffect } from 'react';
import { getCollections } from '@/api/services/product.service';
import type { FashionCategory } from '@/utils/categories.utils';

interface UseCollectionsState {
  categories: FashionCategory[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
}

interface UseCollectionsReturn extends UseCollectionsState {
  refresh: () => Promise<void>;
}

/**
 * Maps a Shopify collection handle to a Shopify product query string.
 * Falls back to a tag/vendor search if no special mapping exists.
 */
function buildQueryFromHandle(handle: string): string {
  return `collection:${handle}`;
}

export function useCollections(first = 20): UseCollectionsReturn {
  const [state, setState] = useState<UseCollectionsState>({
    categories: [],
    loading: false,
    refreshing: false,
    error: null,
  });

  const fetchCollections = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setState(prev => ({ ...prev, refreshing: true, error: null }));
    } else {
      setState(prev => ({ ...prev, loading: true, categories: [], error: null }));
    }

    try {
      const result = await getCollections(first);

      const mapped: FashionCategory[] = result.items.map((col, index) => ({
        id: col.id,
        titleKey: `collection.${col.handle.replace(/-/g, '_')}`,
        title: col.title,
        query: buildQueryFromHandle(col.handle),
        sortKey: 'BEST_SELLING',
        image: col.image?.url ?? '',
        handle: col.handle,
      }));

      setState({
        categories: mapped,
        loading: false,
        refreshing: false,
        error: null,
      });
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        refreshing: false,
        error: err?.message ?? 'Failed to fetch collections',
      }));
    }
  }, [first]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const refresh = useCallback(async () => {
    await fetchCollections(true);
  }, [fetchCollections]);

  return { ...state, refresh };
}
