/**
 * ─── API Barrel Export ────────────────────────────────────────────────────────
 *
 * Central import point for all Shopify API services.
 *
 * Usage:
 *   import { getProducts, createCart, customerLogin } from '@/api';
 * ─────────────────────────────────────────────────────────────────────────────
 */

// GraphQL Client
export { shopifyRequest, ShopifyGraphQLError, ShopifyNetworkError } from './graphql/shopifyClient';

// Product Service
export {
  getProducts,
  getProductByHandle,
  getCollections,
  getCollectionByHandle,
  getCollectionProductsPaginated,
  searchProducts,
  getRecommendedProducts,
  getShopPolicies,
  // Mappers (exported for reuse)
  mapProduct,
  mapMoney,
  mapMoneyRequired,
  mapImage,
} from './services/product.service';

export type { ShopPolicy, ShopPolicies } from './services/product.service';

// Cart Service
export {
  createCart,
  getCart,
  addCartLines,
  updateCartLines,
  removeCartLines,
  associateCustomerWithCart,
  mapCart,
} from './services/cart.service';

// Customer Service
export {
  customerLogin,
  customerLogout,
  renewCustomerToken,
  customerRegister,
  getCustomer,
  updateCustomer,
  recoverCustomerPassword,
} from './services/customer.service';
