// ============================================================
// ⚠️  LEGACY REST COMMON API — COMMENTED OUT
//     Shopify data is now fetched via services in:
//     src/api/services/
//
//     This file is kept for reference / future legacy endpoints.
//     Uncomment and use only when needed.
// ============================================================

// import { ENDPOINTS } from '../config';
// import {
//   _makeAxiosGetRequest,
//   _makeAxiosPostRequest,
//   _makeAxiosPutRequest,
// } from './index';
// import { getAsyncStorage } from '@/utils/helper.utils';
// import { ASYNC_KEYS } from '@/utils/contant.utils';
// import { useAuthStore } from '@/store/authStore';
// import { useGeneralStore } from '@/store/generalStore';

// export const getProfile = async () => {
//   const token = useAuthStore.getState().token;
//   try {
//     const response: any = await _makeAxiosGetRequest(
//       `${ENDPOINTS.USER.USER}`,
//       {},
//     );
//     console.log('getProfile response', response);
//     if (response?.code)
//       useAuthStore.setState({ token: token, user: response?.user });
//   } catch (error) {
//     console.log('getProfile error', error);
//   }
// };

// export const getConfig = async () => {
//   try {
//     const response = await _makeAxiosGetRequest(
//       `${ENDPOINTS.COMMON.CONFIG}`,
//       {},
//     );
//     if (response?.status === 200) {
//       useGeneralStore.setState({ configData: response?.data });
//     }
//   } catch (error: any) {
//     console.log('getConfig error', error?.response?.data);
//   }
// };

// export const getOnboardingStatus = async () => {
//   try {
//     const response = await _makeAxiosGetRequest(
//       `${ENDPOINTS.ONBOARDING.ONBOARDING_STATUS}`,
//       {},
//     );
//     console.log('getOnboardingStatus response', response);
//     // if (response?.status === 200) {
//     // useAuthStore.setState({ onBoardingStatus: response });
//     // }
//   } catch (error: any) {
//     console.log('getConfig error', error?.response?.data);
//   }
// };

// export const refreshTokenRequest = async () => {
//   const refreshToken = await getAsyncStorage(ASYNC_KEYS.ACCESS_TOKEN);
//   if (!refreshToken) throw new Error('No refresh token');

//   const response = await _makeAxiosPostRequest(
//     `${ENDPOINTS.AUTH.REFRESH_TOKEN}`,
//     {
//       refreshToken,
//     },
//   );

//   console.log('refreshTokenRequest: ', response);

//   return response.data?.accessToken;
// };

export {}; // keep this file as a valid TS module
