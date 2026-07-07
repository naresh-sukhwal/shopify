/**
 * ─── Cart Service ─────────────────────────────────────────────────────────────
 *
 * All cart-related API calls using the Shopify Storefront GraphQL client.
 * Converts raw Shopify cart responses into clean Cart app models.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { shopifyRequest } from '@/api/graphql/shopifyClient';
import {
  CART_CREATE,
  CART_LINES_ADD,
  CART_LINES_UPDATE,
  CART_LINES_REMOVE,
  CART_BUYER_IDENTITY_UPDATE,
} from '@/api/mutations/cart.mutations';
import { GET_CART } from '@/api/queries/customer.queries';
import type {
  CartCreateData,
  CartLinesAddData,
  CartLinesUpdateData,
  CartLinesRemoveData,
  GetCartData,
  ShopifyCart,
  ShopifyCartLine,
} from '@/types/shopify.types';
import type {
  Cart,
  CartItem,
  CartLineInput,
  CartLineUpdateInput,
  Money,
  AppImage,
} from '@/types/app.types';
import { mapMoney, mapMoneyRequired, mapImage } from './product.service';

// ─── Data Mapper ──────────────────────────────────────────────────────────────

const mapCartLine = (line: ShopifyCartLine): CartItem => ({
  lineId: line.id,
  quantity: line.quantity,
  merchandise: {
    variantId: line.merchandise.id,
    variantTitle: line.merchandise.title,
    productId: line.merchandise.product.id,
    productTitle: line.merchandise.product.title,
    productHandle: line.merchandise.product.handle,
    image: mapImage(line.merchandise.image ?? line.merchandise.product.featuredImage),
    price: mapMoneyRequired(line.merchandise.price),
    compareAtPrice: mapMoney(line.merchandise.compareAtPrice),
    selectedOptions: line.merchandise.selectedOptions,
  },
  totalAmount: mapMoneyRequired(line.cost.totalAmount),
  subtotalAmount: mapMoneyRequired(line.cost.subtotalAmount),
});

export const mapCart = (raw: ShopifyCart): Cart => ({
  id: raw.id,
  checkoutUrl: raw.checkoutUrl,
  totalQuantity: raw.totalQuantity,
  totalAmount: mapMoneyRequired(raw.cost.totalAmount),
  subtotalAmount: mapMoneyRequired(raw.cost.subtotalAmount),
  totalTaxAmount: mapMoney(raw.cost.totalTaxAmount),
  items: raw.lines.edges.map(e => mapCartLine(e.node)),
});

// ─── Helper: extract cart or throw user errors ────────────────────────────────

function extractCart(
  cart: ShopifyCart | null,
  userErrors: { field?: string[] | string; message: string }[],
): Cart {
  if (userErrors.length > 0) {
    throw new Error(userErrors.map(e => e.message).join(' | '));
  }
  if (!cart) {
    throw new Error('Shopify returned an empty cart response');
  }
  return mapCart(cart);
}

// ─── Service Functions ────────────────────────────────────────────────────────

/**
 * Create a new Shopify cart (optionally with initial line items).
 */
export async function createCart(lines: CartLineInput[] = []): Promise<Cart> {
  const data = await shopifyRequest<CartCreateData>(CART_CREATE, {
    input: { lines },
  });

  return extractCart(
    data.cartCreate.cart,
    data.cartCreate.userErrors,
  );
}

/**
 * Fetch an existing cart by its ID.
 */
export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyRequest<GetCartData>(GET_CART, { cartId });
  if (!data.cart) return null;
  return mapCart(data.cart);
}

/**
 * Add one or more variant lines to an existing cart.
 */
export async function addCartLines(
  cartId: string,
  lines: CartLineInput[],
): Promise<Cart> {
  const data = await shopifyRequest<CartLinesAddData>(CART_LINES_ADD, {
    cartId,
    lines,
  });

  return extractCart(
    data.cartLinesAdd.cart,
    data.cartLinesAdd.userErrors,
  );
}

/**
 * Update the quantity of one or more existing cart lines.
 */
export async function updateCartLines(
  cartId: string,
  lines: CartLineUpdateInput[],
): Promise<Cart> {
  const data = await shopifyRequest<CartLinesUpdateData>(CART_LINES_UPDATE, {
    cartId,
    lines,
  });

  return extractCart(
    data.cartLinesUpdate.cart,
    data.cartLinesUpdate.userErrors,
  );
}

/**
 * Remove one or more lines from an existing cart.
 */
export async function removeCartLines(
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  const data = await shopifyRequest<CartLinesRemoveData>(CART_LINES_REMOVE, {
    cartId,
    lineIds,
  });

  return extractCart(
    data.cartLinesRemove.cart,
    data.cartLinesRemove.userErrors,
  );
}

/**
 * Associate a logged-in Shopify customer with the cart.
 * Call this after successful customer login.
 */
export async function associateCustomerWithCart(
  cartId: string,
  customerAccessToken: string,
): Promise<Cart> {
  const data = await shopifyRequest<{ cartBuyerIdentityUpdate: { cart: ShopifyCart | null; userErrors: { message: string }[] } }>(
    CART_BUYER_IDENTITY_UPDATE,
    {
      cartId,
      buyerIdentity: { customerAccessToken },
    },
  );

  return extractCart(
    data.cartBuyerIdentityUpdate.cart,
    data.cartBuyerIdentityUpdate.userErrors,
  );
}
