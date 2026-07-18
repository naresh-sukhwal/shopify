declare module '@env' {
  export const BASE_URL_DEV: string;
  export const BASE_URL_PROD: string;
  export const SOCKET_URL_DEV: string;
  export const SOCKET_URL_PROD: string;
  export const BUCKET_URL: string;
  export const GOOGLE_MAP_API_KEY: string;

  // ─── Shopify Storefront API ───────────────────────────────────────────────────
  export const SHOPIFY_STORE_DOMAIN: string;        // e.g. your-store.myshopify.com
  export const SHOPIFY_STOREFRONT_TOKEN: string;    // Public Storefront API access token
  export const SHOPIFY_API_VERSION: string;          // e.g. 2025-01

  // ─── Razorpay ─────────────────────────────────────────────────────────────────
  export const RAZORPAY_KEY_ID: string;              // Razorpay key ID (test/live)
}
