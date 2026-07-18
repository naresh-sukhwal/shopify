/**
 * ─── useShopPolicies Hook ─────────────────────────────────────────────────────
 *
 * Fetches the store's Return & Refund policy and Shipping policy from the
 * Shopify Storefront API.  Configured in:
 *   Shopify Admin → Settings → Policies
 *
 * The result is cached in module scope so the API is only called once per
 * app session, regardless of how many times the hook is mounted.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react';
import { getShopPolicies } from '@/api/services/product.service';
import type { ShopPolicies } from '@/api/services/product.service';

// Module-level cache — avoids repeated API calls across screen mounts
let _cachedPolicies: ShopPolicies | null = null;
let _fetchPromise: Promise<ShopPolicies> | null = null;

async function fetchWithCache(): Promise<ShopPolicies> {
  if (_cachedPolicies) return _cachedPolicies;
  if (_fetchPromise) return _fetchPromise;

  _fetchPromise = getShopPolicies().then(policies => {
    _cachedPolicies = policies;
    _fetchPromise = null;
    return policies;
  });

  return _fetchPromise;
}

interface UseShopPoliciesReturn {
  policies: ShopPolicies | null;
  loading: boolean;
  error: string | null;
}

export function useShopPolicies(): UseShopPoliciesReturn {
  const [policies, setPolicies] = useState<ShopPolicies | null>(
    _cachedPolicies,
  );
  const [loading, setLoading] = useState(!_cachedPolicies);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (_cachedPolicies) return; // Already have data — no fetch needed

    let mounted = true;
    setLoading(true);

    fetchWithCache()
      .then(result => {
        if (mounted) {
          setPolicies(result);
          setError(null);
        }
      })
      .catch(err => {
        if (mounted) {
          setError(err?.message ?? 'Failed to load policies');
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { policies, loading, error };
}
