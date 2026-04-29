// src/utils/theme.utils.ts
import { themeType } from '@/interface/theme.type';

// === LIGHT THEME ===
export const LightThemeColors: themeType = {
  // Base
  backgroundColor: '#FFFFFF',
  backgroundColorS1: '#FFFFFF',
  backgroundColorS2: '#F8F9FF',

  // Primary Family
  primary: '#B02E82',
  primaryS1: '#E6E9FF',
  primaryS2: '#F2F1FD',
  primaryS3: '#F9F8FF',

  // Secondary / Tertiary
  secondary: '#A162F6',
  tertiary: '#9DB2CE',

  // Texts
  text: '#000000',
  textS1: '#333333',
  textS2: '#979797',
  descriptionText: '#4A739C',
  extraLightText: '#999696',
  lightTextBlack: '#979797',
  lightTextwhite: 'rgba(255, 255, 255, 0.7)',

  // Border / Placeholder
  borderColor: '#DEE0EC',
  placeHolderColor: '#8D8D8D',

  // Utility colors
  white: '#FFFFFF',
  black: '#000000',
  red: '#EF4444',
  redS1: '#FEE2E2',
  gray: '#8D8D8D',
  grayS1: '#C8C8C8',
  grayS2: '#E5E5E5',
  grayS3: '#F9F9FB',
  green: '#00AC47',
  greenS1: '#D3ECDE',
  brown: '#301230',
  yellow: '#FAB71D',
  yellowS1: '#FFF6E0',
  lightOrange: '#FFA432',
};

// === DARK THEME ===
// export const DarkThemeColors: themeType = {
//   // Base
//   backgroundColor: '#FFFFFF',
//   backgroundColorS1: '#F5F5F5',
//   backgroundColorS2: '#EEEEEE',

//   // Primary Family
//   primary: '#8070EF',
//   primaryS1: '#BEB6F6',
//   primaryS2: '#F2F1FD',
//   primaryS3: '#F9F8FF',

//   // Secondary / Tertiary
//   secondary: '#FFFFFF',
//   tertiary: '#9DB2CE',

//   // Texts
//   text: '#000000',
//   textS1: '#4A4A4A',
//   textS2: '#979797',
//   descriptionText: '#4A739C',
//   extraLightText: '#999696',
//   lightTextBlack: '#979797',
//   lightTextwhite: 'rgba(255, 255, 255, 0.7)',

//   // Border / Placeholder
//   borderColor: '#DEE0EC',
//   placeHolderColor: '#8D8D8D',

//   // Utility colors
//   white: '#FFFFFF',
//   black: '#000000',
//   red: '#EF4444',
//   redS1: '#FEE2E2',
//   gray: '#808080',
//   grayS1: '#C8C8C8',
//   grayS2: '#E5E5E5',
//   grayS3: '#F9F9FB',
//   green: '#249F58',
//   greenS1: '#D3ECDE',
//   brown: '#301230',
//   yellow: '#FFCC00',
//   yellowS1: '#FFF6E0',
//   lightOrange: '#FFA432',
// };

export const DarkThemeColors: themeType = {
  // === Base ===
  backgroundColor: '#0D0D0D', // Main app background
  backgroundColorS1: '#161616', // Secondary surface
  backgroundColorS2: '#1E1E1E', // Cards / section background

  // === Primary Family ===
  primary: '#6675FF', // Same brand color (works well on dark)
  primaryS1: 'rgba(102, 117, 255, 0.15)',
  primaryS2: 'rgba(102, 117, 255, 0.10)',
  primaryS3: 'rgba(102, 117, 255, 0.05)',

  // === Secondary / Tertiary ===
  secondary: '#1E1E1E', // Component secondary surfaces
  tertiary: '#7C8CA5', // Softer version of your light theme tertiary

  // === Texts ===
  text: '#FFFFFF', // Primary text
  textS1: '#E5E5E5', // Subheading
  textS2: '#A1A1A1', // Caption / secondary text
  descriptionText: '#8CB4D9', // Slightly lighter than light theme to pop on dark
  extraLightText: '#CCCCCC',
  lightTextBlack: '#B3B3B3', // Balanced light gray for icons
  lightTextwhite: 'rgba(255, 255, 255, 0.7)',

  // === Border / Placeholder ===
  borderColor: '#2A2A2A',
  placeHolderColor: '#7D7D7D',

  // === Utility colors ===
  white: '#FFFFFF',
  black: '#000000',

  red: '#FF5C5C',
  redS1: '#3A1F1F',

  gray: '#9A9A9A',
  grayS1: '#3A3A3A',
  grayS2: '#2C2C2C',
  grayS3: '#1A1A1A',

  green: '#28C76F',
  greenS1: '#1B3C2D',

  brown: '#5A2A5A',

  yellow: '#F4D03F',
  yellowS1: '#3A331A',

  lightOrange: '#FFAE48',
};
