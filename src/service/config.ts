import {
  BASE_URL_DEV,
  BUCKET_URL,
  BASE_URL_PROD,
  GOOGLE_MAP_API_KEY,
  SHOPIFY_STORE_DOMAIN,
  SHOPIFY_STOREFRONT_TOKEN,
  SHOPIFY_API_VERSION,
} from '@env';

let MODE: 'DEV' | 'PROD' = __DEV__ ? 'DEV' : 'PROD';

export const BASE_URL = MODE === 'DEV' ? `${BASE_URL_DEV}` : BASE_URL_PROD;
export const SOCKET_URL = BASE_URL;
export const API_URL = `${BASE_URL}/api/v1`;
export const ASSETS_URL = `${BUCKET_URL}`;
export const GOOGLE_API_KEY = GOOGLE_MAP_API_KEY;

// ─── Shopify Storefront GraphQL ──────────────────────────────────────────────
// SHOPIFY_STORE_DOMAIN can be either:
//   • Full URL: "https://store.myshopify.com/api/2025-01/graphql.json"
//   • Domain only: "store.myshopify.com"
const _rawDomain = SHOPIFY_STORE_DOMAIN || '';
const _apiVersion = SHOPIFY_API_VERSION || '2025-01';
export const SHOPIFY_GRAPHQL_URL = _rawDomain.startsWith('http')
  ? _rawDomain.replace(/\/$/, '') // already a full URL — use as-is
  : `https://${_rawDomain}/api/${_apiVersion}/graphql.json`; // domain only
export const SHOPIFY_TOKEN = SHOPIFY_STOREFRONT_TOKEN;
// ─────────────────────────────────────────────────────────────────────────────

export const ENDPOINTS = {
  AUTH: {
    LOGIN: 'auth/otp/send',
    OTP_VERIFY: 'auth/otp/verify',
    RESEND_OTP: 'auth/otp/resend',
    REFRESH_TOKEN: 'auth/token/refresh',
    LOGOUT: 'auth/logout',
  },
  ONBOARDING: {
    ONBOARDING_STATUS: 'onboarding/status',
  },
  USER: {
    USER: 'onboarding/profile',
  },
  COMMON: {
    CONFIG: 'config/all',
  },
};
