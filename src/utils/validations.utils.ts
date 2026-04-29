import i18n from '@/localizations';
import * as Yup from 'yup';
import { EMissingChannel } from '@/interface/user.type';

// Common validation patterns
const PHONE_REGEX = /^[0-9]{10}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const BUSINESS_EMAIL_REGEX =
  /^[A-Z0-9._%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!.*\.com)[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const ACCOUNT_NUMBER_REGEX = /^[0-9]{9,18}$/;
const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const PRICE_REGEX = /^[0-9]+$/; // only whole numbers
const LICENSE_REGEX = /^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/;
export const IMAGE_MAX_SIZE = 10;

// Reusable field validations
export const ValidationFields = {
  email: Yup.string()
    .test(
      'trimmed',
      i18n.t('errors.emailRequired'),
      (value: any) => value?.trim().length > 0,
    )
    .matches(EMAIL_REGEX, i18n.t('errors.emailInvalid'))
    .email(i18n.t('errors.emailInvalid'))
    .required(i18n.t('errors.emailRequired')),

  password: Yup.string()
    .test(
      'trimmed',
      i18n.t('errors.passwordRequired'),
      (value: any) => value?.trim().length > 0,
    )
    .matches(PASSWORD_REGEX, i18n.t('errors.passwordMin'))
    .required(i18n.t('errors.passwordRequired')),

  confirmPassword: (fieldName: string = 'password') =>
    Yup.string()
      .test(
        'trimmed',
        i18n.t('errors.passwordRequired'),
        (value: any) => value?.trim().length > 0,
      )
      .oneOf([Yup.ref(fieldName)], i18n.t('errors.passwordMatch'))
      .required(i18n.t('errors.passwordRequired')),

  phone: Yup.string()
    .test(
      'trimmed',
      i18n.t('errors.phoneRequired'),
      (value: any) => value?.trim().length > 0,
    )
    .matches(PHONE_REGEX, i18n.t('errors.invalidPhone'))
    .required(i18n.t('errors.phoneRequired')),

  email_phone: Yup.string()
    .required(i18n.t('errors.emailOrPhoneRequired'))
    .test(
      'email-or-phone',
      i18n.t('errors.invalidEmailOrPhone'),
      function (value) {
        if (!value) return false;

        const isValidEmail = EMAIL_REGEX.test(value);
        const isValidPhone = PHONE_REGEX.test(value);

        if (isValidEmail || isValidPhone) {
          return true;
        }

        // Custom error message
        return this.createError({
          message: value.includes('@')
            ? i18n.t('errors.invalidEmailOrPhone')
            : i18n.t('errors.invalidEmailOrPhone'),
        });
      },
    ),

  name: Yup.string().test(
    'trimmed',
    i18n.t('errors.nameRequired'),
    (value: any) => value?.trim().length > 0,
  ),
  referralCode: Yup.string().test(
    'trimmed',
    i18n.t('errors.referralCodeRequired'),
    (value: any) => value?.trim().length > 0,
  ),

  description: Yup.string()
    .test(
      'trimmed',
      i18n.t('errors.descriptionRequired'),
      (value: any) => value?.trim().length > 0,
    )
    // .min(2, 'Name too short')
    .max(500, i18n.t('errors.descriptionMaxLength'))
    .required(i18n.t('errors.descriptionRequired')),
  user_type: Yup.string().required(i18n.t('errors.selectUserType')),
  image: Yup.object()
    .shape({
      url: Yup.string().required(i18n.t('errors.imageRequired')),
    })
    .required(i18n.t('errors.imageRequired')),
};

// Schemas using reusable fields
export const LoginSchema = Yup.object({
  email: ValidationFields.email,
  password: ValidationFields.password,
});

export const PhoneLoginSchema = Yup.object({
  phone: Yup.string()
    .required(i18n.t('errors.phoneRequired'))
    .test('phone-validation', i18n.t('errors.invalidPhone'), function (value) {
      const { country } = this.parent;
      if (!country?.regex) return true;
      return !value || country.regex.test(value);
    }),
  country: Yup.object().required(),
});
export const ReferralSchema = Yup.object({
  referralCode: ValidationFields.referralCode,
});

export const RegisterSchema = Yup.object().shape({
  name: ValidationFields.name,
  email: ValidationFields.email,
  // phone: ValidationFields.phone,
  password: ValidationFields.password,
  confirmPassword: ValidationFields.confirmPassword(),
});
export const ForgotPasswordSchema = Yup.object().shape({
  email: ValidationFields.email,
});

export const ResetPasswordSchema = Yup.object().shape({
  password: ValidationFields.password,
  confirmPassword: ValidationFields.confirmPassword(),
});

export const ProfileUpdateSchema = Yup.object().shape({
  fullName: ValidationFields.name,
  mobile: ValidationFields.phone,
});

export const SeekerDetailsSchema = Yup.object().shape({
  firstName: Yup.string().required(i18n.t('errors.firstNameRequired')),
  lastName: Yup.string().required(i18n.t('errors.lastNameRequired')),
  location: Yup.object()
    .nullable()
    .shape({
      description: Yup.string().required(i18n.t('errors.locationRequired')),
      city: Yup.string().required(),
      state: Yup.string().required(),
      country: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
    })
    .required(i18n.t('errors.locationRequired')),
  missingChannel: Yup.string().nullable(),
  phone: Yup.string().when('missingChannel', {
    is: (val: string) => val === EMissingChannel.MOBILE || !val,
    then: schema => schema.required(i18n.t('errors.phoneRequired')),
    otherwise: schema => schema.notRequired(),
  }),
  email: Yup.string().when('missingChannel', {
    is: EMissingChannel.EMAIL,
    then: schema =>
      schema
        .required(i18n.t('errors.emailRequired'))
        .email(i18n.t('errors.emailInvalid')),
    otherwise: schema => schema.notRequired(),
  }),
  country: Yup.object().required(i18n.t('errors.countryRequired')),
});

export const EyesDetailsSchema = Yup.object().shape({
  name: ValidationFields.name,
  rate: Yup.number()
    .required(i18n.t('errors.rateRequired'))
    .typeError(i18n.t('errors.rateMustBeNumber')),
  currency: Yup.string().required(i18n.t('errors.currencyRequired')),
});

export const CommunityDetailsSchema = Yup.object().shape({
  ownerName: ValidationFields.name,
  email: ValidationFields.email,
  phone: ValidationFields.phone,
  businessName: Yup.string().required(i18n.t('errors.businessNameRequired')),
  businessType: Yup.string().required(i18n.t('errors.businessTypeRequired')),
  document: Yup.object().required(i18n.t('errors.documentRequired')),
});

export const BankDetailSchema = Yup.object().shape({
  accountName: ValidationFields.name,
  accountNumber: Yup.string()
    .matches(ACCOUNT_NUMBER_REGEX, i18n.t('errors.invalidAccountNumber'))
    .required(i18n.t('errors.accountNumberRequired')),
  bank: Yup.string().required(i18n.t('errors.bankRequired')),
});

export const VIPMembershipSchema = [
  // Step 1: Personal Information
  Yup.object().shape({
    firstName: Yup.string().required(i18n.t('errors.nameRequired')),
    lastName: Yup.string().required(i18n.t('errors.nameRequired')),
    phone: ValidationFields.phone,
    email: ValidationFields.email,
    goldMemberId: Yup.string().required(i18n.t('errors.referralCodeRequired')),
    goldDuration: Yup.string().required(i18n.t('errors.descriptionRequired')),
  }),
  // Step 2: Lifestyle & Preferences
  Yup.object().shape({
    executiveEfficiency: Yup.boolean().oneOf(
      [true],
      i18n.t('errors.selectUserType'),
    ),
    socialiteAccess: Yup.boolean().oneOf(
      [true],
      i18n.t('errors.selectUserType'),
    ),
    contactMethod: Yup.string().required(i18n.t('errors.selectUserType')),
    celebrations: Yup.string().required(i18n.t('errors.selectUserType')),
  }),
  // Step 3: Impact & Legacy
  Yup.object().shape({
    visionaryGoal: Yup.string().required(i18n.t('errors.descriptionRequired')),
    philanthropicAlignment: Yup.string().required(
      i18n.t('errors.descriptionRequired'),
    ),
    collaborativeAccess: Yup.string().required(
      i18n.t('errors.descriptionRequired'),
    ),
  }),
];

export const PartnerApplicationSchema = Yup.object().shape({
  firstName: Yup.string().required(i18n.t('errors.nameRequired')),
  lastName: Yup.string().required(i18n.t('errors.nameRequired')),
  companyName: Yup.string().required(i18n.t('errors.businessNameRequired')),
  companyCategory: Yup.string().required(i18n.t('errors.selectUserType')),
  email: ValidationFields.email,
  phone: ValidationFields.phone,
  orgDescription: Yup.string().required(i18n.t('errors.descriptionRequired')),
  keyGoals: Yup.string().required(i18n.t('errors.descriptionRequired')),
  philanthropicAlignment: Yup.string().required(
    i18n.t('errors.descriptionRequired'),
  ),
  collaborativeAccess: Yup.string().required(
    i18n.t('errors.descriptionRequired'),
  ),
});

export const AddEyeSchema = Yup.object().shape({
  username: ValidationFields.name,
  password: ValidationFields.password,
  rate: Yup.number()
    .required(i18n.t('errors.rateRequired'))
    .typeError(i18n.t('errors.rateMustBeNumber')),
  passport: Yup.object().required(i18n.t('errors.imageRequired')),
  nationalId: Yup.object().required(i18n.t('errors.imageRequired')),
  driversLicense: Yup.object().required(i18n.t('errors.imageRequired')),
});
