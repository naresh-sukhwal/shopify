import {
  NavigatorScreenParams,
  CompositeScreenProps,
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { CMS_TYPE, ERoles, EStatusFeedbackType } from './general.type';
import type { Product } from '@/types/app.types';

/* -------------------------------------------------------------------------- */
/*                                 Root Stack                                 */
/* -------------------------------------------------------------------------- */

export type TRootStack = {
  SplashScreen: undefined;
  LandingScreen: undefined;
  // These must wrap child stacks in NavigatorScreenParams
  MainStack: NavigatorScreenParams<TMainStack>;
  AuthStack: NavigatorScreenParams<TAuthStack>;
  LanguageScreen: undefined;
};

/* -------------------------------------------------------------------------- */
/*                                 Auth Stack                                 */
/* -------------------------------------------------------------------------- */

export type TAuthStack = {
  Login: undefined;
  Signup: {
    role: ERoles;
  };
  OtpVerification: {
    countryCode: string;
    phoneNumber: string;
  };
};

/* -------------------------------------------------------------------------- */
/*                                Drawer Stack                                */
/* -------------------------------------------------------------------------- */

export type TDrawerStack = {
  TabStack: NavigatorScreenParams<TBottomTabStack>;
};

/* -------------------------------------------------------------------------- */
/*                                 Main Stack                                 */
/* -------------------------------------------------------------------------- */

export type TAddressObj = {
  place_id: string;
  description: string;
  title: string;
  subtitle: string;
  location: {
    latitude: number;
    longitude: number;
  };
  photo_url?: string;
};

export type TMainStack = {
  TabStack: NavigatorScreenParams<TBottomTabStack>;
  DrawerStack: NavigatorScreenParams<TDrawerStack>;
  KycDetails: undefined;
  AddMoneyInitial: undefined;
  AddMoney: undefined;
  Withdraw: undefined;
  ProductDetail: { product: Product };
  CategoryProducts: {
    categoryTitle: string;
    sortKey?: string;
    query?: string;
  };
};

/* -------------------------------------------------------------------------- */
/*                                Bottom Tab Stack                            */
/* -------------------------------------------------------------------------- */

export type TBottomTabStack = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  WishlistScreen: undefined;
  ProfileScreen: undefined;
};

export type THomeScreenProps = StackScreenProps<TBottomTabStack, 'HomeScreen'>;
export type TSearchScreenProps = StackScreenProps<
  TBottomTabStack,
  'SearchScreen'
>;
export type TWishlistScreenProps = StackScreenProps<
  TBottomTabStack,
  'WishlistScreen'
>;
export type TProfileScreenProps = StackScreenProps<
  TBottomTabStack,
  'ProfileScreen'
>;


/* -------------------------------------------------------------------------- */
/*                                 Screen Props                               */
/* -------------------------------------------------------------------------- */

export type TRootStackProps = StackScreenProps<TRootStack, 'MainStack'>;

export type TSplashStackProps = StackScreenProps<TRootStack, 'SplashScreen'>;
export type TLanguageScreenProps = StackScreenProps<
  TRootStack,
  'LanguageScreen'
>;

/* ---------------------- Auth Stacks ------------------------------ */

export type TLandingScreenStackProps = StackScreenProps<
  TRootStack,
  'LandingScreen'
>;

export type TLoginStackProps = StackScreenProps<TAuthStack, 'Login'>;

export type TSignupStackProps = StackScreenProps<TAuthStack, 'Signup'>;

export type TOtpVerificationStackProps = StackScreenProps<
  TAuthStack,
  'OtpVerification'
>;

export type TWithdrawProps = StackScreenProps<TMainStack, 'Withdraw'>;
export type TAddMoneyProps = StackScreenProps<TMainStack, 'AddMoney'>;
export type TAddMoneyInitialProps = StackScreenProps<
  TMainStack,
  'AddMoneyInitial'
>;

/* -------------------------------------------------------------------------- */
/*                             Composite Props Example                         */
/* -------------------------------------------------------------------------- */

export type SigninProps = CompositeScreenProps<
  StackScreenProps<TAuthStack, 'Login'>,
  CompositeScreenProps<
    StackScreenProps<TRootStack, 'MainStack'>,
    StackScreenProps<TMainStack>
  >
>;

