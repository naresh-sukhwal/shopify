/**
 * ─── Fashion Categories ───────────────────────────────────────────────────────
 *
 * Shared category type used by HomeScreen and SearchScreen.
 * Category data is fetched live from the Shopify Storefront via useCollections.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface FashionCategory {
  id: string;
  /** i18n key for the category title (derived from collection handle) */
  titleKey: string;
  /** Display title from Shopify collection */
  title: string;
  /** Shopify product query string — e.g. "collection:casual-wear" */
  query: string;
  sortKey: string;
  /** Collection image URL from Shopify, or fallback placeholder */
  image: string;
  /** Shopify collection handle for deep-linking */
  handle?: string;
}
