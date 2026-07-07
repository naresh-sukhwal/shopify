/**
 * ─── App Model Types ─────────────────────────────────────────────────────────
 *
 * Clean, UI-friendly application models mapped from Shopify raw responses.
 * Use these types in screens, components, hooks, and Zustand stores.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Money ────────────────────────────────────────────────────────────────────

export interface Money {
  amount: number;
  currencyCode: string;
  /** Pre-formatted string e.g. "$12.99" */
  formatted: string;
}

// ─── Image ───────────────────────────────────────────────────────────────────

export interface AppImage {
  url: string;
  altText: string;
  width?: number;
  height?: number;
}

// ─── Product Variant ─────────────────────────────────────────────────────────

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  availableForSale: boolean;
  quantityAvailable: number;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: SelectedOption[];
  image: AppImage | null;
}

// ─── Product ─────────────────────────────────────────────────────────────────

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  vendor: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage: AppImage | null;
  images: AppImage[];
  variants: ProductVariant[];
  options: ProductOption[];
  minPrice: Money;
  maxPrice: Money;
  compareAtMinPrice: Money | null;
  /** Discount percentage (0-100), null if no compareAtPrice */
  discountPercentage: number | null;
}

// ─── Collection ───────────────────────────────────────────────────────────────

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: AppImage | null;
  products: Product[];
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartItemMerchandise {
  variantId: string;
  variantTitle: string;
  productId: string;
  productTitle: string;
  productHandle: string;
  image: AppImage | null;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: SelectedOption[];
}

export interface CartItem {
  lineId: string;
  quantity: number;
  merchandise: CartItemMerchandise;
  totalAmount: Money;
  subtotalAmount: Money;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  totalAmount: Money;
  subtotalAmount: Money;
  totalTaxAmount: Money | null;
  items: CartItem[];
}

// ─── Customer ────────────────────────────────────────────────────────────────

export interface Address {
  id?: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
  firstName: string;
  lastName: string;
}

export interface CustomerOrder {
  id: string;
  name: string;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: Money;
  statusUrl: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone: string;
  acceptsMarketing: boolean;
  defaultAddress: Address | null;
  addresses: Address[];
  orders: CustomerOrder[];
}

export interface CustomerToken {
  accessToken: string;
  expiresAt: string;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginatedResult<T> {
  items: T[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    endCursor: string | null;
    startCursor: string | null;
  };
}

// ─── Cart Input Types ─────────────────────────────────────────────────────────

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
  attributes?: { key: string; value: string }[];
}

export interface CartLineUpdateInput {
  id: string;
  quantity: number;
}

// ─── Customer Input Types ─────────────────────────────────────────────────────

export interface CustomerCreateInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptsMarketing?: boolean;
  phone?: string;
}
