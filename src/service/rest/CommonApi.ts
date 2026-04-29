import { store } from '@/store';
import { ENDPOINTS } from '../config';
import {
  _makeAxiosGetRequest,
  _makeAxiosPostRequest,
  _makeAxiosPutRequest,
} from './index';
import { setOnBoardingStatus, setUserData } from '@/store/AuthSlice';
import { setConfigData } from '@/store/GeneralSlice';
import { getAsyncStorage } from '@/utils/helper.utils';
import { ASYNC_KEYS } from '@/utils/contant.utils';

export const getProfile = async () => {
  const token = store.getState().AuthManager.token;
  try {
    const response: any = await _makeAxiosGetRequest(
      `${ENDPOINTS.USER.USER}`,
      {},
    );
    console.log('getProfile response', response);
    if (response?.code)
      store.dispatch(setUserData({ token: token, user: response?.user }));
  } catch (error) {
    console.log('getProfile error', error);
  }
};

export const getConfig = async () => {
  try {
    const response = await _makeAxiosGetRequest(
      `${ENDPOINTS.COMMON.CONFIG}`,
      {},
    );
    if (response?.status === 200) {
      store.dispatch(setConfigData(response?.data));
    }
  } catch (error: any) {
    console.log('getConfig error', error?.response?.data);
  }
};
export const getOnboardingStatus = async () => {
  try {
    const response = await _makeAxiosGetRequest(
      `${ENDPOINTS.ONBOARDING.ONBOARDING_STATUS}`,
      {},
    );
    console.log('getOnboardingStatus response', response);
    // if (response?.status === 200) {
    store.dispatch(setOnBoardingStatus(response));
    // }
  } catch (error: any) {
    console.log('getConfig error', error?.response?.data);
  }
};

export const refreshTokenRequest = async () => {
  const refreshToken = await getAsyncStorage(ASYNC_KEYS.ACCESS_TOKEN);
  if (!refreshToken) throw new Error('No refresh token');

  const response = await _makeAxiosPostRequest(
    `${ENDPOINTS.AUTH.REFRESH_TOKEN}`,
    {
      refreshToken,
    },
  );

  console.log('refreshTokenRequest: ', response);

  return response.data?.accessToken;
};
