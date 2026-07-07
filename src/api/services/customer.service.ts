/**
 * ─── Customer Service ─────────────────────────────────────────────────────────
 *
 * All customer auth and profile API calls using the Shopify Storefront GraphQL.
 * Converts raw Shopify customer responses into clean Customer app models.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { shopifyRequest } from '@/api/graphql/shopifyClient';
import {
  CUSTOMER_ACCESS_TOKEN_CREATE,
  CUSTOMER_ACCESS_TOKEN_DELETE,
  CUSTOMER_ACCESS_TOKEN_RENEW,
  CUSTOMER_CREATE,
  CUSTOMER_UPDATE,
  CUSTOMER_RECOVER,
} from '@/api/mutations/customer.mutations';
import { GET_CUSTOMER } from '@/api/queries/customer.queries';
import type {
  CustomerAccessTokenCreateData,
  CustomerAccessTokenDeleteData,
  CustomerCreateData,
  GetCustomerData,
  ShopifyCustomer,
  ShopifyAddress,
  ShopifyOrder,
} from '@/types/shopify.types';
import type {
  Customer,
  CustomerToken,
  Address,
  CustomerOrder,
  CustomerCreateInput,
  Money,
} from '@/types/app.types';
import { mapMoneyRequired } from './product.service';

// ─── Data Mappers ─────────────────────────────────────────────────────────────

const mapAddress = (raw: ShopifyAddress): Address => ({
  id: raw.id,
  address1: raw.address1 ?? '',
  address2: raw.address2 ?? '',
  city: raw.city ?? '',
  province: raw.province ?? '',
  country: raw.country ?? '',
  zip: raw.zip ?? '',
  phone: raw.phone ?? '',
  firstName: raw.firstName ?? '',
  lastName: raw.lastName ?? '',
});

const mapOrder = (raw: ShopifyOrder): CustomerOrder => ({
  id: raw.id,
  name: raw.name,
  processedAt: raw.processedAt,
  financialStatus: raw.financialStatus,
  fulfillmentStatus: raw.fulfillmentStatus,
  totalPrice: mapMoneyRequired(raw.totalPrice),
  statusUrl: raw.statusUrl,
});

const mapCustomer = (raw: ShopifyCustomer): Customer => ({
  id: raw.id,
  firstName: raw.firstName ?? '',
  lastName: raw.lastName ?? '',
  displayName: raw.displayName,
  email: raw.email ?? '',
  phone: raw.phone ?? '',
  acceptsMarketing: raw.acceptsMarketing,
  defaultAddress: raw.defaultAddress ? mapAddress(raw.defaultAddress) : null,
  addresses: raw.addresses?.edges?.map(e => mapAddress(e.node)) ?? [],
  orders: raw.orders?.edges?.map(e => mapOrder(e.node)) ?? [],
});

// ─── Helper: extract token or throw user errors ───────────────────────────────

function assertNoUserErrors(
  errors: { message: string }[],
  prefix = '',
): void {
  if (errors.length > 0) {
    throw new Error(
      `${prefix}${errors.map(e => e.message).join(' | ')}`,
    );
  }
}

// ─── Service Functions ────────────────────────────────────────────────────────

/**
 * Login with Shopify email + password.
 * Returns a CustomerToken { accessToken, expiresAt }.
 */
export async function customerLogin(
  email: string,
  password: string,
): Promise<CustomerToken> {
  const data = await shopifyRequest<CustomerAccessTokenCreateData>(
    CUSTOMER_ACCESS_TOKEN_CREATE,
    { input: { email, password } },
  );

  assertNoUserErrors(
    data.customerAccessTokenCreate.customerUserErrors,
    'Login failed: ',
  );

  const token = data.customerAccessTokenCreate.customerAccessToken;
  if (!token) {
    throw new Error('Login failed: No access token returned');
  }

  return {
    accessToken: token.accessToken,
    expiresAt: token.expiresAt,
  };
}

/**
 * Logout — invalidate the customer access token on Shopify's side.
 */
export async function customerLogout(accessToken: string): Promise<void> {
  const data = await shopifyRequest<CustomerAccessTokenDeleteData>(
    CUSTOMER_ACCESS_TOKEN_DELETE,
    { customerAccessToken: accessToken },
  );

  assertNoUserErrors(
    data.customerAccessTokenDelete.customerUserErrors,
    'Logout failed: ',
  );
}

/**
 * Renew a customer access token before it expires.
 */
export async function renewCustomerToken(accessToken: string): Promise<CustomerToken> {
  const data = await shopifyRequest<{
    customerAccessTokenRenew: {
      customerAccessToken: { accessToken: string; expiresAt: string } | null;
      userErrors: { message: string }[];
    };
  }>(CUSTOMER_ACCESS_TOKEN_RENEW, { customerAccessToken: accessToken });

  assertNoUserErrors(
    data.customerAccessTokenRenew.userErrors,
    'Token renewal failed: ',
  );

  const token = data.customerAccessTokenRenew.customerAccessToken;
  if (!token) {
    throw new Error('Token renewal failed: No token returned');
  }

  return {
    accessToken: token.accessToken,
    expiresAt: token.expiresAt,
  };
}

/**
 * Register a new Shopify customer account.
 */
export async function customerRegister(
  input: CustomerCreateInput,
): Promise<Customer> {
  const data = await shopifyRequest<CustomerCreateData>(CUSTOMER_CREATE, {
    input,
  });

  assertNoUserErrors(
    data.customerCreate.customerUserErrors,
    'Registration failed: ',
  );

  if (!data.customerCreate.customer) {
    throw new Error('Registration failed: No customer returned');
  }

  return mapCustomer(data.customerCreate.customer as ShopifyCustomer);
}

/**
 * Fetch the authenticated customer profile.
 */
export async function getCustomer(accessToken: string): Promise<Customer | null> {
  const data = await shopifyRequest<GetCustomerData>(GET_CUSTOMER, {
    customerAccessToken: accessToken,
  });

  if (!data.customer) return null;
  return mapCustomer(data.customer);
}

/**
 * Update customer profile fields.
 */
export async function updateCustomer(
  accessToken: string,
  fields: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    acceptsMarketing: boolean;
  }>,
): Promise<void> {
  const data = await shopifyRequest<{
    customerUpdate: {
      customer: ShopifyCustomer | null;
      customerUserErrors: { message: string }[];
    };
  }>(CUSTOMER_UPDATE, {
    customerAccessToken: accessToken,
    customer: fields,
  });

  assertNoUserErrors(
    data.customerUpdate.customerUserErrors,
    'Profile update failed: ',
  );
}

/**
 * Send a password recovery email.
 */
export async function recoverCustomerPassword(email: string): Promise<void> {
  const data = await shopifyRequest<{
    customerRecover: { customerUserErrors: { message: string }[] };
  }>(CUSTOMER_RECOVER, { email });

  assertNoUserErrors(
    data.customerRecover.customerUserErrors,
    'Password recovery failed: ',
  );
}
