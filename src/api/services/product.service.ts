/**
 * ─── Product Service ──────────────────────────────────────────────────────────
 *
 * All product-related API calls using the Shopify Storefront GraphQL client.
 * Uses Shopify `nodes` response format (2024-01+ standard).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { shopifyRequest } from '@/api/graphql/shopifyClient';
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  GET_COLLECTIONS,
  GET_COLLECTION_BY_HANDLE,
  SEARCH_PRODUCTS,
  GET_RECOMMENDED_PRODUCTS,
  GET_SHOP_POLICIES,
} from '@/api/queries/product.queries';
import type {
  GetProductsData,
  GetProductByHandleData,
  GetCollectionsData,
  GetCollectionByHandleData,
  SearchProductsData,
  ShopifyProduct,
  ShopifyProductVariant,
  ShopifyImage,
  ShopifyMoneyV2,
  ShopifyCollection,
} from '@/types/shopify.types';
import type {
  Product,
  ProductVariant,
  AppImage,
  Money,
  Collection,
  PaginatedResult,
} from '@/types/app.types';

// ─── Data Mappers ─────────────────────────────────────────────────────────────

export const mapMoney = (
  money: ShopifyMoneyV2 | null | undefined,
): Money | null => {
  if (!money) return null;
  const amount = parseFloat(money.amount);
  return {
    amount,
    currencyCode: money.currencyCode,
    formatted: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: money.currencyCode,
    }).format(amount),
  };
};

export const mapMoneyRequired = (money: ShopifyMoneyV2): Money => {
  const amount = parseFloat(money.amount);
  return {
    amount,
    currencyCode: money.currencyCode,
    formatted: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: money.currencyCode,
    }).format(amount),
  };
};

export const mapImage = (
  image: ShopifyImage | null | undefined,
): AppImage | null => {
  if (!image) return null;
  return {
    url: image.url,
    altText: image.altText ?? '',
    width: image.width,
    height: image.height,
  };
};

const mapVariant = (variant: ShopifyProductVariant): ProductVariant => ({
  id: variant.id,
  title: variant.title,
  sku: variant.sku ?? '',
  availableForSale: variant.availableForSale,
  quantityAvailable: variant.quantityAvailable ?? 0,
  price: mapMoneyRequired(variant.price),
  compareAtPrice: mapMoney(variant.compareAtPrice),
  selectedOptions: variant.selectedOptions ?? [],
  image: mapImage(variant.image),
});

export const mapProduct = (raw: ShopifyProduct): Product => {
  const minPrice = mapMoneyRequired(raw.priceRange.minVariantPrice);
  const maxPrice = mapMoneyRequired(raw.priceRange.maxVariantPrice);
  const compareAtMin = raw.compareAtPriceRange?.minVariantPrice
    ? mapMoney(raw.compareAtPriceRange.minVariantPrice)
    : null;

  // Only show discount if compareAt > 0 and > current price
  let discountPercentage: number | null = null;
  if (
    compareAtMin &&
    compareAtMin.amount > 0 &&
    compareAtMin.amount > minPrice.amount
  ) {
    discountPercentage = Math.round(
      ((compareAtMin.amount - minPrice.amount) / compareAtMin.amount) * 100,
    );
  }

  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description ?? '',
    descriptionHtml: raw.descriptionHtml ?? '',
    productType: raw.productType ?? '',
    vendor: raw.vendor ?? '',
    tags: raw.tags ?? [],
    availableForSale: raw.availableForSale,
    featuredImage: mapImage(raw.featuredImage),
    images:
      (raw.images?.nodes
        ?.map(img => mapImage(img))
        .filter(Boolean) as AppImage[]) ?? [],
    variants: raw.variants?.nodes?.map(mapVariant) ?? [],
    options: raw.options ?? [],
    minPrice,
    maxPrice,
    compareAtMinPrice: compareAtMin,
    discountPercentage,
  };
};

export const mapCollection = (raw: ShopifyCollection): Collection => ({
  id: raw.id,
  handle: raw.handle,
  title: raw.title,
  description: raw.description,
  image: mapImage(raw.image),
  products: raw.products?.nodes?.map(mapProduct) ?? [],
});

// ─── Service Functions ────────────────────────────────────────────────────────

export interface GetProductsParams {
  first?: number;
  after?: string;
  sortKey?: string;
  reverse?: boolean;
  query?: string;
}

/**
 * Fetch a paginated list of products.
 */
export async function getProducts(
  params: GetProductsParams = {},
): Promise<PaginatedResult<Product>> {
  const { first = 20, after, sortKey, reverse, query } = params;

  const data = await shopifyRequest<GetProductsData>(GET_PRODUCTS, {
    first,
    after,
    sortKey,
    reverse,
    query,
  });

  return {
    items: data.products.nodes.map(mapProduct),
    pageInfo: {
      hasNextPage: data.products.pageInfo.hasNextPage,
      hasPreviousPage: data.products.pageInfo.hasPreviousPage,
      endCursor: data.products.pageInfo.endCursor ?? null,
      startCursor: data.products.pageInfo.startCursor ?? null,
    },
  };
}

/**
 * Fetch a single product by its handle (slug).
 */
export async function getProductByHandle(
  handle: string,
): Promise<Product | null> {
  const data = await shopifyRequest<GetProductByHandleData>(
    GET_PRODUCT_BY_HANDLE,
    {
      handle,
    },
  );
  if (!data.product) return null;
  return mapProduct(data.product);
}

/**
 * Fetch a paginated list of collections (without products).
 */
export async function getCollections(
  first = 20,
  after?: string,
): Promise<PaginatedResult<Omit<Collection, 'products'>>> {
  const data = await shopifyRequest<GetCollectionsData>(GET_COLLECTIONS, {
    first,
    after,
  });

  return {
    items: data.collections.nodes.map(node => ({
      id: node.id,
      handle: node.handle,
      title: node.title,
      description: node.description,
      image: mapImage(node.image),
    })),
    pageInfo: {
      hasNextPage: data.collections.pageInfo.hasNextPage,
      hasPreviousPage: data.collections.pageInfo.hasPreviousPage ?? false,
      endCursor: data.collections.pageInfo.endCursor ?? null,
      startCursor: data.collections.pageInfo.startCursor ?? null,
    },
  };
}

/**
 * Fetch a single collection with its products.
 */
export async function getCollectionByHandle(
  handle: string,
  productFirst = 20,
  after?: string,
  sortKey?: string,
  reverse?: boolean,
): Promise<Collection | null> {
  const data = await shopifyRequest<GetCollectionByHandleData>(
    GET_COLLECTION_BY_HANDLE,
    {
      handle,
      first: productFirst,
      after,
      sortKey,
      reverse,
    },
  );
  if (!data.collection) return null;
  return mapCollection(data.collection);
}

/**
 * Fetch a paginated list of products scoped to a specific collection.
 * Returns both the mapped products and the pageInfo for cursor-based pagination.
 */
export async function getCollectionProductsPaginated(
  handle: string,
  first = 20,
  after?: string,
  sortKey?: string,
  reverse?: boolean,
): Promise<
  | (PaginatedResult<Product> & {
      collectionTitle: string;
      collectionImage: import('@/types/app.types').AppImage | null;
    })
  | null
> {
  const data = await shopifyRequest<GetCollectionByHandleData>(
    GET_COLLECTION_BY_HANDLE,
    {
      handle,
      first,
      after,
      sortKey,
      reverse,
    },
  );

  if (!data.collection) return null;

  const raw = data.collection;
  const products = raw.products?.nodes?.map(mapProduct) ?? [];
  const pageInfo = raw.products?.pageInfo;

  return {
    items: products,
    pageInfo: {
      hasNextPage: pageInfo?.hasNextPage ?? false,
      hasPreviousPage: pageInfo?.hasPreviousPage ?? false,
      endCursor: pageInfo?.endCursor ?? null,
      startCursor: pageInfo?.startCursor ?? null,
    },
    collectionTitle: raw.title,
    collectionImage: mapImage(raw.image),
  };
}

/**
 * Search products by query string.
 */
export async function searchProducts(
  query: string,
  first = 20,
  after?: string,
): Promise<PaginatedResult<Product>> {
  const data = await shopifyRequest<SearchProductsData>(SEARCH_PRODUCTS, {
    query,
    first,
    after,
  });

  return {
    items: data.search.nodes.map(n => mapProduct(n as ShopifyProduct)),
    pageInfo: {
      hasNextPage: data.search.pageInfo.hasNextPage,
      hasPreviousPage: false,
      endCursor: data.search.pageInfo.endCursor ?? null,
      startCursor: null,
    },
  };
}

/**
 * Get recommended products for a given product ID.
 */
export async function getRecommendedProducts(
  productId: string,
): Promise<Product[]> {
  const data = await shopifyRequest<{
    productRecommendations: ShopifyProduct[];
  }>(GET_RECOMMENDED_PRODUCTS, { productId });
  return (data.productRecommendations ?? []).map(mapProduct);
}

// ─── Shop Policies ───────────────────────────────────────────────────────────

export interface ShopPolicy {
  title: string;
  body: string;
  url: string;
}

export interface ShopPolicies {
  refundPolicy: ShopPolicy | null;
  shippingPolicy: ShopPolicy | null;
}

interface GetShopPoliciesData {
  shop: {
    refundPolicy: ShopPolicy | null;
    shippingPolicy: ShopPolicy | null;
  };
}

/**
 * Fetch the store's written Return & Refund policy and Shipping policy.
 * These are configured in Shopify Admin → Settings → Policies.
 */
export async function getShopPolicies(): Promise<ShopPolicies> {
  const data = await shopifyRequest<GetShopPoliciesData>(GET_SHOP_POLICIES, {});
  return {
    refundPolicy: data.shop?.refundPolicy ?? null,
    shippingPolicy: data.shop?.shippingPolicy ?? null,
  };
}
