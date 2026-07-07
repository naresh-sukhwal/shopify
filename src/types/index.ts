/**
 * ─── Types Barrel Export ──────────────────────────────────────────────────────
 *
 * Central import point for all app and Shopify types.
 *
 * Usage:
 *   import type { Product, Cart, Customer } from '@/types';
 * ─────────────────────────────────────────────────────────────────────────────
 */

// App model types (use these in UI components)
export type {
  Money,
  AppImage,
  SelectedOption,
  ProductVariant,
  ProductOption,
  Product,
  Collection,
  CartItemMerchandise,
  CartItem,
  Cart,
  Address,
  CustomerOrder,
  Customer,
  CustomerToken,
  PaginatedResult,
  CartLineInput,
  CartLineUpdateInput,
  CustomerCreateInput,
} from './app.types';

// Shopify raw types (use in services / mappers only)
export type {
  ShopifyMoneyV2,
  ShopifyImage,
  ShopifyProduct,
  ShopifyProductVariant,
  ShopifyCollection,
  ShopifyCart,
  ShopifyCartLine,
  ShopifyCustomer,
  ShopifyCustomerAccessToken,
  ShopifyPageInfo,
  ShopifyEdge,
  ShopifyConnection,
  GetProductsData,
  GetProductByHandleData,
  GetCollectionsData,
  GetCollectionByHandleData,
  SearchProductsData,
  CartCreateData,
  CartLinesAddData,
  CartLinesUpdateData,
  CartLinesRemoveData,
  GetCartData,
  CustomerAccessTokenCreateData,
  CustomerAccessTokenDeleteData,
  CustomerCreateData,
  GetCustomerData,
} from './shopify.types';
