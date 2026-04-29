import { SVG } from '@/assets';

export const ASYNC_KEYS = Object.freeze({
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  IS_LOGGEDIN: 'IS_LOGGEDIN',
  FIRST_ON_APP: 'FRIST_ON_APP',
  LANGUAGE: 'LANGUAGE',
  FCM_TOKEN: 'FCM_TOKEN',
});

export const COMMON_KEYS = Object.freeze({
  LIGHT: 'LIGHT',
  DARK: 'DARK',
  APP_NAME: 'GlimpZik',
  PRESS_ID: 'PRESS_ID',
  CURRENCY: '$',
});

export const SeekerTabData = [
  {
    id: 1,
    name: 'Home',
    Icon: [SVG.PlayIcon, SVG.PlayIcon],
    width: 25,
    height: 25,
  },
  {
    id: 2,
    name: 'Search',
    Icon: [SVG.SearchIcon, SVG.SearchIcon],
    width: 25,
    height: 25,
  },
  {
    id: 3,
    name: 'Library',
    Icon: [SVG.VideoIcon, SVG.VideoIcon],
    width: 25,
    height: 25,
  },
  {
    id: 4,
    name: 'Store',
    Icon: [SVG.HomeIcon, SVG.HomeIcon],
    width: 25,
    height: 25,
  },
  {
    id: 5,
    name: 'Profile',
    Icon: [SVG.ProfileIcon, SVG.ProfileIcon],
    width: 25,
    height: 25,
  },
];
