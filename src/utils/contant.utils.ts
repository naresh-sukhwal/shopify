import { IMAGES, SVG } from '@/assets';

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

export const onboardingData = [
  {
    id: '1',
    type: 'logo',
    title: '',
    description: '',
    buttonText: 'Get Started',
    image: IMAGES.logoWithoutName,
  },
  {
    id: '2',
    type: 'content',
    title: '“Buy Gold in Just a Few Taps”',
    description:
      'Add money, buy gold instantly, and watch its value grow over time.',
    buttonText: 'Next',
    image: IMAGES.landImg1,
  },
  {
    id: '3',
    type: 'content',
    title: 'Invest in Digital Gold.\nGrow Your Wealth.',
    description:
      'Buy gold anytime, track its value, and earn profit as prices rise.',
    buttonText: 'Next',
    image: IMAGES.landImg1,
  },
  {
    id: '4',
    type: 'content',
    title: '“Buy Gold. Watch It Grow.”',
    description:
      'Invest in digital gold and benefit as prices increase over time.',
    buttonText: 'Next',
    image: IMAGES.landImg1,
  },
];
