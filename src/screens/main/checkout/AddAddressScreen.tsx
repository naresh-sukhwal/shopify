import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { themeType } from '@/interface';
import {
  fontFamily,
  fontSize,
  Ionicons,
  Feather,
} from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { AppBackground } from '@/components';
import CustomTextInput from '@/components/inputs/TextInput/CustomTextInput';
import GoogleAutocomplete from '@/components/inputs/TextInput/GoogleAutocomplete';
import { useAddressStore } from '@/store/addressStore';
import SimpleHeader from '@/components/headers/SimpleHeader';
import FixedBottomButton from '@/components/buttons/FixedBottomButton';

export default function AddAddressScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const themeColor = useThemeColor();
  const styles = useThemedStyles(createStyles);
  const { bottom } = useSafeAreaInsets();
  const { addAddress } = useAddressStore();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(t('errors.required')),
    lastName: Yup.string().required(t('errors.required')),
    phone: Yup.string().required(t('errors.required')),
    email: Yup.string().email(t('errors.invalid_email')),
    addressLine1: Yup.string().required(t('errors.required')),
    addressLine2: Yup.string(),
    landmark: Yup.string(),
    city: Yup.string().required(t('errors.required')),
    state: Yup.string().required(t('errors.required')),
    postalCode: Yup.string().required(t('errors.required')),
    addressType: Yup.string().required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      addressLine1: '',
      addressLine2: '',
      landmark: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: 'Home',
    },
    validationSchema,
    onSubmit: values => {
      // Save address
      const newAddress = {
        id: Date.now().toString(),
        title:
          values.addressType === 'Home' ? 'checkout.home' : 'checkout.work',
        isDefault: false,
        firstName: values.firstName,
        lastName: values.lastName,
        name: `${values.firstName} ${values.lastName}`,
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        landmark: values.landmark,
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
        phone: values.phone,
        email: values.email,
        address: `${values.addressLine1}${
          values.addressLine2 ? ', ' + values.addressLine2 : ''
        }\n${values.city}, ${values.state} ${values.postalCode}`,
      };

      addAddress(newAddress);
      navigation.goBack();
    },
  });

  return (
    <AppBackground backgroundColor={themeColor.primary}>
      <View style={[styles.safeArea]}>
        <SimpleHeader title={t('checkout.add_address')} />

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.imageContainer}>
            <ImageBackground
              source={{
                uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop',
              }}
              style={styles.heroImage}
              imageStyle={{ borderRadius: wp('4%') }}
            >
              <View style={styles.imageOverlay}>
                <Text style={styles.heroTitle}>
                  {t('checkout.delivery_details')}
                </Text>
                <Text style={styles.heroSubtitle}>
                  {t('checkout.where_send')}
                </Text>
              </View>
            </ImageBackground>
          </View>

          {/* Contact Info Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="user" size={20} color={themeColor.textS1} />
              <Text style={[styles.sectionTitle, { color: themeColor.textS1 }]}>
                {t('checkout.contact_info')}
              </Text>
            </View>

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <CustomTextInput
                  placeholder={t('checkout.first_name')}
                  label={t('checkout.first_name')}
                  isRequired
                  value={formik.values.firstName}
                  onChangeText={formik.handleChange('firstName')}
                  errorMsg={
                    formik.touched.firstName && formik.errors.firstName
                      ? formik.errors.firstName
                      : ''
                  }
                />
              </View>
              <View style={styles.halfWidth}>
                <CustomTextInput
                  placeholder={t('checkout.last_name')}
                  label={t('checkout.last_name')}
                  isRequired
                  value={formik.values.lastName}
                  onChangeText={formik.handleChange('lastName')}
                  errorMsg={
                    formik.touched.lastName && formik.errors.lastName
                      ? formik.errors.lastName
                      : ''
                  }
                />
              </View>
            </View>

            <CustomTextInput
              placeholder="+1 555-0123"
              label={t('checkout.phone_number')}
              isRequired
              keyboardType="phone-pad"
              maxLength={10}
              value={formik.values.phone}
              onChangeText={formik.handleChange('phone')}
              errorMsg={
                formik.touched.phone && formik.errors.phone
                  ? formik.errors.phone
                  : ''
              }
              containerStyle={styles.inputSpacing}
            />

            <CustomTextInput
              placeholder="jane@example.com"
              label={t('checkout.email_address')}
              keyboardType="email-address"
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              errorMsg={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ''
              }
              containerStyle={styles.inputSpacing}
            />
          </View>

          {/* Address Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="map-pin" size={20} color={themeColor.textS1} />
              <Text style={[styles.sectionTitle, { color: themeColor.textS1 }]}>
                {t('checkout.address_section')}
              </Text>
            </View>

            <View style={styles.autocompleteContainer}>
              <Text style={[styles.inputLabel, { color: themeColor.text }]}>
                {t('checkout.address_line_1')}
                <Text style={{ color: themeColor.red }}>*</Text>
              </Text>
              <GoogleAutocomplete
                placeHolder="123 Boutique Blvd"
                onChangeText={text =>
                  formik.setFieldValue('addressLine1', text)
                }
                onPlaceSelected={place => {
                  if (place.addressLine1) {
                    formik.setFieldValue('addressLine1', place.addressLine1);
                  } else {
                    formik.setFieldValue('addressLine1', place.description);
                  }
                  if (place.addressLine2)
                    formik.setFieldValue('addressLine2', place.addressLine2);
                  if (place.pincode)
                    formik.setFieldValue('postalCode', place.pincode);
                  if (place.city) formik.setFieldValue('city', place.city);
                  if (place.state) formik.setFieldValue('state', place.state);
                }}
              />
              {formik.touched.addressLine1 && formik.errors.addressLine1 && (
                <Text style={styles.errorText}>
                  {formik.errors.addressLine1}
                </Text>
              )}
            </View>

            <CustomTextInput
              placeholder="Suite 404"
              label={t('checkout.address_line_2')}
              value={formik.values.addressLine2}
              onChangeText={formik.handleChange('addressLine2')}
              containerStyle={styles.inputSpacing}
            />

            <CustomTextInput
              placeholder="Near Central Park"
              label={t('checkout.landmark', 'Landmark (Optional)')}
              value={formik.values.landmark}
              onChangeText={formik.handleChange('landmark')}
              containerStyle={styles.inputSpacing}
            />

            <CustomTextInput
              placeholder="New York"
              label={t('checkout.city')}
              isRequired
              value={formik.values.city}
              onChangeText={formik.handleChange('city')}
              errorMsg={
                formik.touched.city && formik.errors.city
                  ? formik.errors.city
                  : ''
              }
              containerStyle={styles.inputSpacing}
            />

            <View style={[styles.row, styles.inputSpacing]}>
              <View style={styles.halfWidth}>
                <CustomTextInput
                  placeholder="Select State"
                  label={t('checkout.state')}
                  isRequired
                  value={formik.values.state}
                  onChangeText={formik.handleChange('state')}
                  errorMsg={
                    formik.touched.state && formik.errors.state
                      ? formik.errors.state
                      : ''
                  }
                />
              </View>
              <View style={styles.halfWidth}>
                <CustomTextInput
                  placeholder="10001"
                  label={t('checkout.postal_code')}
                  isRequired
                  value={formik.values.postalCode}
                  onChangeText={formik.handleChange('postalCode')}
                  errorMsg={
                    formik.touched.postalCode && formik.errors.postalCode
                      ? formik.errors.postalCode
                      : ''
                  }
                />
              </View>
            </View>

            {/* Address Type Selector */}
            <View style={styles.typeSelectorRow}>
              <TouchableOpacity
                style={[
                  styles.typeBox,
                  {
                    backgroundColor:
                      formik.values.addressType === 'Home'
                        ? themeColor.primaryS1
                        : themeColor.backgroundColorS1,
                    borderColor:
                      formik.values.addressType === 'Home'
                        ? themeColor.buttonBackground
                        : themeColor.borderColor,
                  },
                ]}
                onPress={() => formik.setFieldValue('addressType', 'Home')}
              >
                <Feather name="home" size={24} color={themeColor.textS1} />
                <Text style={[styles.typeText, { color: themeColor.textS1 }]}>
                  {t('checkout.home')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.typeBox,
                  {
                    backgroundColor:
                      formik.values.addressType === 'Work'
                        ? themeColor.primaryS1
                        : themeColor.backgroundColorS1,
                    borderColor:
                      formik.values.addressType === 'Work'
                        ? themeColor.buttonBackground
                        : themeColor.borderColor,
                  },
                ]}
                onPress={() => formik.setFieldValue('addressType', 'Work')}
              >
                <Feather name="briefcase" size={24} color={themeColor.textS1} />
                <Text style={[styles.typeText, { color: themeColor.textS1 }]}>
                  {t('checkout.work')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <FixedBottomButton
          title={t('checkout.save_address')}
          icon="save"
          onPress={() => formik.handleSubmit()}
        />
      </View>
    </AppBackground>
  );
}

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: wp('4%'),
      paddingBottom: hp('4%'),
    },
    imageContainer: {
      marginTop: hp('1%'),
      marginBottom: hp('3%'),
    },
    heroImage: {
      width: '100%',
      height: hp('20%'),
      justifyContent: 'flex-end',
    },
    imageOverlay: {
      padding: wp('4%'),
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderBottomLeftRadius: wp('4%'),
      borderBottomRightRadius: wp('4%'),
    },
    heroTitle: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f18,
      color: '#FFFFFF',
      marginBottom: hp('0.5%'),
    },
    heroSubtitle: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f14,
      color: '#FFFFFF',
    },
    section: {
      marginBottom: hp('4%'),
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp('2%'),
      marginBottom: hp('2%'),
    },
    sectionTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f18,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    halfWidth: {
      width: '48%',
    },
    inputSpacing: {
      marginTop: hp('2%'),
    },
    inputLabel: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f16,
      marginLeft: 4,
      marginBottom: 3,
    },
    autocompleteContainer: {
      marginTop: hp('0%'),
    },
    errorText: {
      color: theme.red,
      fontSize: fontSize.f12,
      fontFamily: fontFamily.regular,
      marginTop: 4,
      marginLeft: 4,
    },
    typeSelectorRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: hp('3%'),
    },
    typeBox: {
      width: '48%',
      borderWidth: 1,
      borderRadius: wp('4%'),
      paddingVertical: hp('2.5%'),
      alignItems: 'center',
      justifyContent: 'center',
      gap: hp('1%'),
    },
    typeText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f16,
    },
  });
