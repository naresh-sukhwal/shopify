import {
  BASE_URL_DEV,
  GOOGLE_CLIENT_ID,
  GOOGLE_MAP_API_KEY,
  IOS_CLIENT_ID,
  BUCKET_URL,
  AGORA_CERTIFICATE,
  AGORA_ID,
  STRIPE_PAYMENT_KEY,
  BASE_URL_PROD,
  SOCKET_URL_DEV,
  SOCKET_URL_PROD,
} from '@env';

let MODE: 'DEV' | 'PROD' = __DEV__ ? 'DEV' : 'PROD';

export const BASE_URL = MODE === 'DEV' ? `${BASE_URL_DEV}` : BASE_URL_PROD;
export const SOCKET_URL = BASE_URL; //MODE === 'DEV' ? BASE_URL_DEV : SOCKET_URL_PROD;
export const API_URL = `${BASE_URL}/api/v1`;
export const ASSETS_URL = `${BUCKET_URL}`;
export const CLIENT_ID = GOOGLE_CLIENT_ID;
export const APPLE_CLIENT_ID = IOS_CLIENT_ID;
export const GOOGLE_API_KEY = GOOGLE_MAP_API_KEY;
export const AGORA_APP_ID = AGORA_ID;
export const AGORA_APP_CERTIFICATE = AGORA_CERTIFICATE;
export const STRIPE_KEY = STRIPE_PAYMENT_KEY;

export const ENDPOINTS = {
  AUTH: {
    LOGIN: 'auth/otp/send',
    OTP_VERIFY: 'auth/otp/verify',
    RESEND_OTP: 'auth/otp/resend',
    REFRESH_TOKEN: 'auth/token/refresh',
    LOGOUT: 'auth/logout',
    GOOGLE_LOGIN: 'auth/google',
    APPLE_LOGIN: 'auth/apple',
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
