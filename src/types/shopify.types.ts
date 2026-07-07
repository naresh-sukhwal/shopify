/**
 * ─── Shopify Storefront API — Raw Response Types ─────────────────────────────
 *
 * Matches Shopify's `nodes` response format (2024-01+).
 * Do NOT use these in UI components — map them via product.service.ts first.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface ShopifyPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

/** Legacy edges/node style */
export interface ShopifyEdge<T> {
  cursor: string;
  node: T;
}
export interface ShopifyConnection<T> {
  edges: ShopifyEdge<T>[];
  pageInfo: ShopifyPageInfo;
}

/** Nodes style (current Shopify standard) */
export interface ShopifyNodesConnection<T> {
  nodes: T[];
  pageInfo: ShopifyPageInfo;
}

// ─── Money ────────────────────────────────────────────────────────────────────

export interface ShopifyMoneyV2 {
  amount: string;
  currencyCode: string;
}

// ─── Image ───────────────────────────────────────────────────────────────────

export interface ShopifyImage {
  id?: string;
  url: string;
  altText?: string | null;
  width?: number;
  height?: number;
}

// ─── Product Variant ─────────────────────────────────────────────────────────

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  sku?: string;
  availableForSale: boolean;
  quantityAvailable?: number;
  price: ShopifyMoneyV2;
  compareAtPrice?: ShopifyMoneyV2 | null;
  selectedOptions: ShopifySelectedOption[];
  image?: ShopifyImage | null;
}

// ─── Product ─────────────────────────────────────────────────────────────────

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  productType?: string;
  vendor?: string;
  tags?: string[];
  availableForSale: boolean;
  createdAt?: string;
  updatedAt?: string;
  featuredImage?: ShopifyImage | null;
  images?: ShopifyNodesConnection<ShopifyImage>;
  variants: ShopifyNodesConnection<ShopifyProductVariant>;
  priceRange: {
    minVariantPrice: ShopifyMoneyV2;
    maxVariantPrice: ShopifyMoneyV2;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoneyV2;
    maxVariantPrice: ShopifyMoneyV2;
  };
  options?: {
    id: string;
    name: string;
    values: string[];
  }[];
  seo?: {
    title?: string;
    description?: string;
  };
}

// ─── Collection ───────────────────────────────────────────────────────────────

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: ShopifyImage | null;
  products: ShopifyNodesConnection<ShopifyProduct>;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface ShopifyCartLineMerchandise {
  id: string;
  title: string;
  product: Pick<ShopifyProduct, 'id' | 'title' | 'handle' | 'featuredImage'>;
  price: ShopifyMoneyV2;
  compareAtPrice?: ShopifyMoneyV2 | null;
  selectedOptions: ShopifySelectedOption[];
  image?: ShopifyImage | null;
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: ShopifyCartLineMerchandise;
  cost: {
    totalAmount: ShopifyMoneyV2;
    subtotalAmount: ShopifyMoneyV2;
    amountPerQuantity: ShopifyMoneyV2;
    compareAtAmountPerQuantity?: ShopifyMoneyV2 | null;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: ShopifyMoneyV2;
    subtotalAmount: ShopifyMoneyV2;
    totalTaxAmount?: ShopifyMoneyV2 | null;
  };
  lines: ShopifyConnection<ShopifyCartLine>;
}

// ─── Customer / Auth ─────────────────────────────────────────────────────────

export interface ShopifyCustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

export interface ShopifyCustomerUserError {
  code?: string;
  field?: string[];
  message: string;
}

export interface ShopifyAddress {
  id?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}

export interface ShopifyOrder {
  id: string;
  name: string;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: ShopifyMoneyV2;
  statusUrl: string;
}

export interface ShopifyCustomer {
  id: string;
  firstName?: string;
  lastName?: string;
  displayName: string;
  email?: string;
  phone?: string;
  acceptsMarketing: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  defaultAddress?: ShopifyAddress | null;
  addresses: ShopifyConnection<ShopifyAddress>;
  orders: ShopifyConnection<ShopifyOrder>;
}

// ─── GraphQL Response Wrappers ────────────────────────────────────────────────

export interface GetProductsData {
  products: ShopifyNodesConnection<ShopifyProduct> & { pageInfo: ShopifyPageInfo };
}

export interface GetProductByHandleData {
  product: ShopifyProduct | null;
}

export interface GetCollectionsData {
  collections: ShopifyNodesConnection<ShopifyCollection> & { pageInfo: ShopifyPageInfo };
}

export interface GetCollectionByHandleData {
  collection: ShopifyCollection | null;
}

export interface SearchProductsData {
  search: {
    nodes: ShopifyProduct[];
    pageInfo: ShopifyPageInfo;
  };
}

export interface CartCreateData {
  cartCreate: {
    cart: ShopifyCart | null;
    userErrors: ShopifyCustomerUserError[];
  };
}

export interface CartLinesAddData {
  cartLinesAdd: {
    cart: ShopifyCart | null;
    userErrors: ShopifyCustomerUserError[];
  };
}

export interface CartLinesUpdateData {
  cartLinesUpdate: {
    cart: ShopifyCart | null;
    userErrors: ShopifyCustomerUserError[];
  };
}

export interface CartLinesRemoveData {
  cartLinesRemove: {
    cart: ShopifyCart | null;
    userErrors: ShopifyCustomerUserError[];
  };
}

export interface GetCartData {
  cart: ShopifyCart | null;
}

export interface CustomerAccessTokenCreateData {
  customerAccessTokenCreate: {
    customerAccessToken: ShopifyCustomerAccessToken | null;
    customerUserErrors: ShopifyCustomerUserError[];
  };
}

export interface CustomerAccessTokenDeleteData {
  customerAccessTokenDelete: {
    deletedAccessToken?: string | null;
    customerUserErrors: ShopifyCustomerUserError[];
  };
}

export interface CustomerCreateData {
  customerCreate: {
    customer: ShopifyCustomer | null;
    customerUserErrors: ShopifyCustomerUserError[];
  };
}

export interface GetCustomerData {
  customer: ShopifyCustomer | null;
}
