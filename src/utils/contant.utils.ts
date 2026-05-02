import { IMAGES, SVG } from '@/assets';

export const ASYNC_KEYS = Object.freeze({
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  IS_LOGGEDIN: 'IS_LOGGEDIN',
  LANGUAGE: 'LANGUAGE',
  FCM_TOKEN: 'FCM_TOKEN',
  IS_LANDING_COMPLETED: 'IS_LANDING_COMPLETED',
  IS_LANGAUGE_SELECTED: 'IS_LANGAUGE_SELECTED',
  IS_KYC_COMPLETED: 'IS_KYC_COMPLETED',
});

export const COMMON_KEYS = Object.freeze({
  LIGHT: 'LIGHT',
  DARK: 'DARK',
  APP_NAME: 'GlimpZik',
  PRESS_ID: 'PRESS_ID',
  CURRENCY: '$',
});

export const TabData = [
  {
    id: 1,
    name: 'Home',
    Icon: [SVG.HomeIcon, SVG.HomeIcon],
    width: 25,
    height: 25,
  },
  {
    id: 2,
    name: 'Invest',
    Icon: [SVG.InvestIcon, SVG.InvestIcon],
    width: 25,
    height: 25,
  },
  {
    id: 3,
    name: 'Wallet',
    Icon: [SVG.WalletIcon, SVG.WalletIcon],
    width: 25,
    height: 25,
  },
  {
    id: 4,
    name: 'Reward',
    Icon: [SVG.RewardIcon, SVG.RewardIcon],
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

export const languageList = [
  { name: 'Arabic', code: 'ar', flag: IMAGES.logoWithoutName },
  { name: 'Spanish', code: 'es', flag: IMAGES.logoWithoutName },
  { name: 'French', code: 'fr', flag: IMAGES.logoWithoutName },
  { name: 'Hindi', code: 'hi', flag: IMAGES.logoWithoutName },
  { name: 'Korean', code: 'ko', flag: IMAGES.logoWithoutName },
  { name: 'Vietnamese', code: 'vi', flag: IMAGES.logoWithoutName },
  { name: 'English', code: 'en', flag: IMAGES.logoWithoutName },
  { name: 'German', code: 'de', flag: IMAGES.logoWithoutName },
  { name: 'Italian', code: 'it', flag: IMAGES.logoWithoutName },
  { name: 'Japanese', code: 'ja', flag: IMAGES.logoWithoutName },
  { name: 'Chinese', code: 'zh', flag: IMAGES.logoWithoutName },
  { name: 'Russian', code: 'ru', flag: IMAGES.logoWithoutName },
];
