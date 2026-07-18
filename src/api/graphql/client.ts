/**
 * ─── Shopify Storefront GraphQL Core Client ──────────────────────────────────
 *
 * A lightweight, native fetch-based GraphQL client for the Shopify Storefront
 * API. No Apollo, no urql — zero extra native dependencies.
 *
 * Usage:
 *   import { shopifyGraphQLRequest } from './client';
 *   const data = await shopifyGraphQLRequest<MyType>(MY_QUERY, { id: '123' });
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { SHOPIFY_GRAPHQL_URL, SHOPIFY_TOKEN } from '@/service/config';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
  extensions?: Record<string, unknown>;
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
  extensions?: Record<string, unknown>;
}

export interface ShopifyRequestOptions {
  /** Shopify Customer Access Token — pass for authenticated requests */
  customerToken?: string | null;
  /** Abort signal for request cancellation */
  signal?: AbortSignal;
}

export class ShopifyGraphQLError extends Error {
  public readonly errors: GraphQLError[];

  constructor(errors: GraphQLError[]) {
    super(errors.map(e => e.message).join(' | '));
    this.name = 'ShopifyGraphQLError';
    this.errors = errors;
  }
}

export class ShopifyNetworkError extends Error {
  public readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ShopifyNetworkError';
    this.status = status;
  }
}

// ─── Core Request Function ────────────────────────────────────────────────────

/**
 * Executes a Shopify Storefront GraphQL request.
 *
 * @param query     - GraphQL query or mutation string
 * @param variables - Optional GraphQL variables (typed)
 * @param options   - Optional: customerToken, abortSignal
 * @returns         - Typed `data` from the GraphQL response
 * @throws          - ShopifyGraphQLError | ShopifyNetworkError
 */
export async function shopifyGraphQLRequest<
  TData,
  TVariables = Record<string, unknown>,
>(
  query: string,
  variables?: TVariables,
  options?: ShopifyRequestOptions,
): Promise<TData> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
  };
  // console.log('SHOPIFY_TOKEN--->', SHOPIFY_TOKEN);

  // Inject customer token for authenticated queries (e.g. getCustomer, orders)
  if (options?.customerToken) {
    headers['X-Shopify-Customer-Access-Token'] = options.customerToken;
  }

  // Dev-mode request logging
  if (__DEV__) {
    console.log('\n[Shopify GQL] ▶----->', variables);
  }

  let response: Response;

  try {
    response = await fetch(SHOPIFY_GRAPHQL_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      signal: options?.signal,
    });
  } catch (networkError: any) {
    throw new ShopifyNetworkError(
      networkError?.message ?? 'Network request failed',
    );
  }

  if (!response.ok) {
    throw new ShopifyNetworkError(
      `HTTP ${response.status}: ${response.statusText}`,
      response.status,
    );
  }
  const json: GraphQLResponse<TData> = await response.json();

  // Dev-mode response logging
  if (__DEV__) {
    console.log('[Shopify GQL] ◀--->', json.data);
  }

  if (json.errors && json.errors.length > 0) {
    if (__DEV__) {
      console.warn('[Shopify GQL] ⚠ Errors:', json.errors);
    }
    throw new ShopifyGraphQLError(json.errors);
  }

  if (json.data === undefined) {
    throw new ShopifyNetworkError('Empty response from Shopify API');
  }

  return json.data;
}
