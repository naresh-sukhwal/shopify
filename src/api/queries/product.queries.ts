/**
 * ─── Product GraphQL Queries ──────────────────────────────────────────────────
 *
 * Uses Shopify's `nodes` syntax (2024-01+) for cleaner pagination.
 * Import these into product.service.ts only — never in UI components.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── GET_PRODUCTS ─────────────────────────────────────────────────────────────
/** Paginated product list — used on Home / Category screens */
export const GET_PRODUCTS = `
  query GetProducts(
    $first: Int!
    $after: String
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $query: String
  ) {
    products(
      first: $first
      after: $after
      sortKey: $sortKey
      reverse: $reverse
      query: $query
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        handle
        title
        description
        availableForSale
        productType
        vendor
        tags
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        compareAtPriceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        variants(first: 5) {
          nodes {
            id
            title
            availableForSale
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            selectedOptions { name value }
            image { url altText width height }
          }
        }
      }
    }
  }
`;

// ─── GET_PRODUCT_BY_HANDLE ────────────────────────────────────────────────────
/** Full product detail — used on Product Detail screen */
export const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      productType
      vendor
      tags
      availableForSale
      createdAt
      updatedAt
      featuredImage { url altText width height }
      images(first: 20) {
        nodes { url altText width height }
      }
      options {
        id
        name
        values
      }
      variants(first: 50) {
        nodes {
          id
          title
          sku
          availableForSale
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
          image { url altText width height }
        }
      }
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      compareAtPriceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      seo { title description }
    }
  }
`;

// ─── GET_COLLECTIONS ──────────────────────────────────────────────────────────
/** All collections list — used on Home / Category screens */
export const GET_COLLECTIONS = `
  query GetCollections($first: Int!, $after: String) {
    collections(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        handle
        title
        description
        image { url altText width height }
      }
    }
  }
`;

// ─── GET_COLLECTION_BY_HANDLE ─────────────────────────────────────────────────
/** Single collection with products — used on Collection Detail screen */
export const GET_COLLECTION_BY_HANDLE = `
  query GetCollectionByHandle(
    $handle: String!
    $first: Int!
    $after: String
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image { url altText width height }
      products(
        first: $first
        after: $after
        sortKey: $sortKey
        reverse: $reverse
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          handle
          title
          description
          availableForSale
          featuredImage { url altText width height }
          priceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
          compareAtPriceRange {
            minVariantPrice { amount currencyCode }
          }
          variants(first: 5) {
            nodes {
              id
              title
              availableForSale
              price { amount currencyCode }
              compareAtPrice { amount currencyCode }
            }
          }
        }
      }
    }
  }
`;

// ─── SEARCH_PRODUCTS ──────────────────────────────────────────────────────────
/** Full-text product search — used on Search screen */
export const SEARCH_PRODUCTS = `
  query SearchProducts(
    $query: String!
    $first: Int!
    $after: String
  ) {
    search(
      query: $query
      first: $first
      after: $after
      types: [PRODUCT]
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ... on Product {
          id
          handle
          title
          description
          availableForSale
          featuredImage { url altText width height }
          priceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
          compareAtPriceRange {
            minVariantPrice { amount currencyCode }
          }
          variants(first: 3) {
            nodes {
              id
              title
              availableForSale
              price { amount currencyCode }
            }
          }
        }
      }
    }
  }
`;

// ─── GET_RECOMMENDED_PRODUCTS ─────────────────────────────────────────────────
/** Product recommendations — used on Product Detail screen */
export const GET_RECOMMENDED_PRODUCTS = `
  query GetRecommendedProducts($productId: ID!) {
    productRecommendations(productId: $productId) {
      id
      handle
      title
      availableForSale
      featuredImage { url altText width height }
      priceRange {
        minVariantPrice { amount currencyCode }
      }
      variants(first: 1) {
        nodes {
          id
          price { amount currencyCode }
        }
      }
    }
  }
`;

// ─── GET_SHOP_POLICIES ────────────────────────────────────────────────────────
/** Fetches the store's return/refund policy and shipping policy — used on
 *  Product Detail screen's "Shipping & Returns" accordion. */
export const GET_SHOP_POLICIES = `
  query GetShopPolicies {
    shop {
      refundPolicy {
        title
        body
        url
      }
      shippingPolicy {
        title
        body
        url
      }
    }
  }
`;
