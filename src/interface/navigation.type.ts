import {
  NavigatorScreenParams,
  CompositeScreenProps,
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { CMS_TYPE, ERoles, EStatusFeedbackType } from './general.type';

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
};

/* -------------------------------------------------------------------------- */
/*                                Bottom Tab Stack                            */
/* -------------------------------------------------------------------------- */

export type TBottomTabStack = {
  HomeScreen: undefined;
  InvestScreen: undefined;
  WalletScreen: undefined;
  RewardScreen: undefined;
  ProfileScreen: undefined;
};

export type THomeScreenProps = StackScreenProps<TBottomTabStack, 'HomeScreen'>;
export type TInvestScreenProps = StackScreenProps<
  TBottomTabStack,
  'InvestScreen'
>;
export type TWalletScreenProps = StackScreenProps<
  TBottomTabStack,
  'WalletScreen'
>;
export type TRewardScreenProps = StackScreenProps<
  TBottomTabStack,
  'RewardScreen'
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
