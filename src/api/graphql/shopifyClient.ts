/**
 * ─── Shopify Client Singleton ─────────────────────────────────────────────────
 *
 * Re-exports `shopifyGraphQLRequest` as `shopifyRequest` for convenience.
 * All API services should import from this file, not from `client.ts` directly.
 *
 * Usage:
 *   import { shopifyRequest } from '@/api/graphql/shopifyClient';
 *   const data = await shopifyRequest<GetProductsData>(GET_PRODUCTS, { first: 20 });
 * ─────────────────────────────────────────────────────────────────────────────
 */

export {
  shopifyGraphQLRequest as shopifyRequest,
  ShopifyGraphQLError,
  ShopifyNetworkError,
} from './client';

export type {
  GraphQLError,
  GraphQLResponse,
  ShopifyRequestOptions,
} from './client';
