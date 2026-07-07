/**
 * ─── Cart GraphQL Mutations ───────────────────────────────────────────────────
 *
 * All Shopify Storefront cart mutations.
 * Import these into cart.service.ts only — never in UI components.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const CART_FIELDS = `
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
`;

// ─── CART_CREATE ──────────────────────────────────────────────────────────────
/** Create a new cart, optionally with lines pre-added */
export const CART_CREATE = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

// ─── CART_LINES_ADD ───────────────────────────────────────────────────────────
/** Add one or more variant lines to an existing cart */
export const CART_LINES_ADD = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

// ─── CART_LINES_UPDATE ────────────────────────────────────────────────────────
/** Update quantity of existing cart lines */
export const CART_LINES_UPDATE = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

// ─── CART_LINES_REMOVE ────────────────────────────────────────────────────────
/** Remove one or more lines from an existing cart */
export const CART_LINES_REMOVE = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

// ─── CART_BUYER_IDENTITY_UPDATE ───────────────────────────────────────────────
/** Associate a logged-in customer with the cart */
export const CART_BUYER_IDENTITY_UPDATE = `
  mutation CartBuyerIdentityUpdate(
    $cartId: ID!
    $buyerIdentity: CartBuyerIdentityInput!
  ) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;
