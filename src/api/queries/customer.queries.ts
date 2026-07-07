/**
 * ─── Customer GraphQL Queries ─────────────────────────────────────────────────
 *
 * All Shopify Storefront customer-related queries.
 * Import these into customer.service.ts only — never in UI components.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── GET_CUSTOMER ─────────────────────────────────────────────────────────────
/** Fetch authenticated customer profile — requires customerAccessToken */
export const GET_CUSTOMER = `
  query GetCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      displayName
      email
      phone
      acceptsMarketing
      createdAt
      updatedAt
      tags
      defaultAddress {
        id
        address1
        address2
        city
        province
        country
        zip
        phone
        firstName
        lastName
      }
      addresses(first: 10) {
        edges {
          node {
            id
            address1
            address2
            city
            province
            country
            zip
            phone
            firstName
            lastName
          }
        }
      }
      orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            name
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice { amount currencyCode }
            statusUrl
          }
        }
      }
    }
  }
`;

// ─── GET_CART ─────────────────────────────────────────────────────────────────
/** Fetch an existing cart by ID */
export const GET_CART = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost {
        totalAmount { amount currencyCode }
        subtotalAmount { amount currencyCode }
        totalTaxAmount { amount currencyCode }
      }
      lines(first: 100) {
        pageInfo { hasNextPage endCursor }
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                image { url altText width height }
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
                selectedOptions { name value }
                product {
                  id
                  title
                  handle
                  featuredImage { url altText }
                }
              }
            }
            cost {
              totalAmount { amount currencyCode }
              subtotalAmount { amount currencyCode }
              amountPerQuantity { amount currencyCode }
              compareAtAmountPerQuantity { amount currencyCode }
            }
          }
        }
      }
    }
  }
`;
