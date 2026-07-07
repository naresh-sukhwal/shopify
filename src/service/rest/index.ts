// ============================================================
// ⚠️  LEGACY AXIOS REST CLIENT — COMMENTED OUT
//     Shopify data is now fetched via the GraphQL client at:
//     src/api/graphql/shopifyClient.ts
//
//     This file is kept for reference / future non-Shopify APIs.
//     Uncomment and use only when needed for legacy endpoints.
// ============================================================

// import axios from 'axios';
// import { API_URL } from '../config';
// import { ASYNC_KEYS } from '@/utils/contant.utils';
// import { getAsyncStorage } from '@/utils/helper.utils';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { refreshTokenRequest } from './CommonApi';
// import { useGeneralStore } from '@/store/generalStore';

// // ------------------ CREATE CLIENT ------------------
// export const client = axios.create({
//   baseURL: API_URL,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// // ------------------ TOKEN CACHE ------------------
// let cachedToken: string | null = null;

// const getToken = async () => {
//   if (cachedToken) return cachedToken;
//   cachedToken = await getAsyncStorage(ASYNC_KEYS.ACCESS_TOKEN);
//   return cachedToken;
// };

// const setToken = async (token: string) => {
//   cachedToken = token;
//   await AsyncStorage.setItem(ASYNC_KEYS.ACCESS_TOKEN, token);
// };

// export const clearTokens = async () => {
//   cachedToken = null;
//   await AsyncStorage.removeItem(ASYNC_KEYS.ACCESS_TOKEN);
// };

// // ------------------ REFRESH TOKEN CLIENT ------------------
// const refreshClient = axios.create({
//   baseURL: API_URL,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// // ------------------ REQUEST INTERCEPTOR ------------------
// client.interceptors.request.use(
//   async config => {
//     const token = await getToken();
//     // console.log('token---->', token);

//     console.log(
//       'url: ',
//       '\n',
//       config.baseURL + '/' + config.url,
//       '\nparams: ',
//       config.params,
//     );

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     if (config.data instanceof FormData) {
//       config.headers['Content-Type'] = 'multipart/form-data';
//     }

//     return config;
//   },
//   error => Promise.reject(error),
// );

// // ------------------ REFRESH QUEUE ------------------
// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach(prom => {
//     error ? prom.reject(error) : prom.resolve(token);
//   });
//   failedQueue = [];
// };

// // ------------------ RESPONSE INTERCEPTOR ------------------
// client.interceptors.response.use(
//   response => response.data,

//   async error => {
//     const originalRequest = error.config;
//     const status = error?.response?.status;

//     // ---------- HANDLE 401 WITH REFRESH ----------
//     if (status === 401 && !originalRequest?._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(token => {
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return client(originalRequest);
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const newAccessToken = await refreshTokenRequest();
//         await setToken(newAccessToken);

//         client.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
//         processQueue(null, newAccessToken);

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return client(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         await clearTokens();
//         useGeneralStore.getState().setIsUnAutharized(true);
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject({
//       status,
//       message:
//         error?.response?.data?.message ||
//         error?.message ||
//         'Something went wrong',
//       data: error?.response?.data,
//     });
//   },
// );

// // ------------------ API WRAPPERS ------------------
// export const _makeAxiosGetRequest = (url: string, params = {}) =>
//   client.get(url, { params });

// export const _makeAxiosPostRequest = (url: string, payload = {}, config = {}) =>
//   client.post(url, payload, config);

// export const _makeAxiosPutRequest = (url: string, payload = {}) =>
//   client.put(url, payload);

// export const _makeAxiosDeleteRequest = (url: string, payload = {}) =>
//   client.delete(url, { data: payload });

// // ------------------ MULTIPART WRAPPER ------------------
// export const axiosMultipart = (endpoint: string, payload: FormData) =>
//   client.post(endpoint, payload);

export {}; // keep this file as a valid TS module
