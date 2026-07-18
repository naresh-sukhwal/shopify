/**
 * Type declarations for react-native-razorpay
 *
 * No official @types package exists for this module. These types are
 * hand-crafted to match the Razorpay Checkout SDK options and response
 * shape used in this project.
 *
 * Reference: https://razorpay.com/docs/payments/payment-gateway/react-native-integration/
 */

declare module 'react-native-razorpay' {
  // ─── Options ──────────────────────────────────────────────────────────────

  export interface RazorpayPrefill {
    /** Customer name */
    name?: string;
    /** Customer email */
    email?: string;
    /** Customer phone number */
    contact?: string;
  }

  export interface RazorpayTheme {
    /** Hex color for the checkout header background */
    color?: string;
    /** Hide the top bar */
    hide_topbar?: boolean;
    /** Backdrop color (hex) */
    backdrop_color?: string;
  }

  export interface RazorpayModal {
    /** Confirm close on back-press */
    confirm_close?: boolean;
    /** Called when the modal is closed without payment */
    ondismiss?: () => void;
    /** Allow SDK to animate on dismiss */
    animation?: boolean;
    /** Allow escape key to close modal (web) */
    escape?: boolean;
  }

  export interface RazorpayOptions {
    /** Your Razorpay API key (test or live) */
    key: string;
    /** Payment amount in smallest currency unit (paise for INR) */
    amount: string | number;
    /** ISO 4217 currency code, e.g. 'INR' */
    currency: string;
    /** Your business / app name shown in the checkout */
    name?: string;
    /** Short description shown in checkout */
    description?: string;
    /** URL of the logo shown in checkout */
    image?: string;
    /** Razorpay Order ID from your backend */
    order_id?: string;
    /** Prefill customer details */
    prefill?: RazorpayPrefill;
    /** Theme customisation */
    theme?: RazorpayTheme;
    /** Modal behaviour options */
    modal?: RazorpayModal;
    /** Any custom notes (key-value pairs) */
    notes?: Record<string, string>;
    /** Retry configuration */
    retry?: { enabled: boolean; max_count?: number };
    /** Timeout in seconds for the checkout (web) */
    timeout?: number;
    /** Callback URL for server-to-server payment capture */
    callback_url?: string;
    /** Redirect to callback_url instead of calling JS callback */
    redirect?: boolean;
    /** Customer-facing receipt number */
    receipt?: string;
  }

  // ─── Payment Success Response ────────────────────────────────────────────

  export interface RazorpaySuccessResponse {
    /** Razorpay Payment ID */
    razorpay_payment_id: string;
    /** Razorpay Order ID (present when order_id is passed in options) */
    razorpay_order_id: string;
    /** HMAC-SHA256 signature for payment verification */
    razorpay_signature: string;
  }

  // ─── Payment Error Response ──────────────────────────────────────────────

  export interface RazorpayErrorResponse {
    /** Error code. Code 0 = user cancelled the checkout */
    code: number;
    /** Human-readable error description */
    description?: string;
    /** Internal source of the error */
    source?: string;
    /** Step at which the error occurred */
    step?: string;
    /** Reason for the error */
    reason?: string;
    /** Nested error metadata */
    metadata?: {
      payment_id?: string;
      order_id?: string;
    };
  }

  // ─── Checkout ─────────────────────────────────────────────────────────────

  interface RazorpayCheckoutStatic {
    /**
     * Opens the Razorpay checkout UI.
     * Resolves with payment details on success, rejects with an error object on
     * failure / cancellation (error.code === 0 means user cancelled).
     */
    open(options: RazorpayOptions): Promise<RazorpaySuccessResponse>;
  }

  const RazorpayCheckout: RazorpayCheckoutStatic;
  export default RazorpayCheckout;
}
