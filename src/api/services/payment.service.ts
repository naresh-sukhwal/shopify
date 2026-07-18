/**
 * ─── Payment Service ──────────────────────────────────────────────────────────
 *
 * Razorpay integration service.
 * - createRazorpayOrder: calls backend to create a Razorpay order
 * - verifyPayment: calls backend to verify signature & create Shopify order
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { API_URL, ENDPOINTS } from '@/service/config';
import { getAsyncStorage } from '@/utils/helper.utils';
import { ASYNC_KEYS } from '@/utils/contant.utils';

export interface RazorpayOrderResponse {
  razorpayOrderId: string;
  amount: number;        // in paise (e.g. 50000 = ₹500)
  currency: string;
  keyId: string;
}

export interface PaymentVerifyRequest {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  cartId?: string;
  shippingAddress?: ShippingAddress;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
}

export interface PaymentVerifyResponse {
  success: boolean;
  orderId: string;     // Shopify / backend order ID
  message?: string;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = await getAsyncStorage(ASYNC_KEYS.ACCESS_TOKEN);
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ─── Service Functions ────────────────────────────────────────────────────────

/**
 * Call backend to create a Razorpay order.
 * Backend should call Razorpay API and return order_id, amount, currency.
 */
export async function createRazorpayOrder(
  amountInRupees: number,
  currency: string = 'INR',
  cartId?: string,
): Promise<RazorpayOrderResponse> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/${ENDPOINTS.PAYMENT.CREATE_ORDER}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      amount: Math.round(amountInRupees * 100), // convert to paise
      currency,
      cartId,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.message || 'Failed to create payment order');
  }

  return response.json();
}

/**
 * Call backend to verify Razorpay payment signature.
 * Backend verifies HMAC signature and creates the Shopify order.
 */
export async function verifyPayment(
  payload: PaymentVerifyRequest,
): Promise<PaymentVerifyResponse> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/${ENDPOINTS.PAYMENT.VERIFY_PAYMENT}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.message || 'Payment verification failed');
  }

  return response.json();
}
