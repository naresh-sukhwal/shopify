import React from 'react';
import { View } from 'react-native';
import { CustomTextInput, TextArea } from '@/components';
import { useTranslation } from 'react-i18next';

interface PersonalDetailsProps {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  styles: any;
}

const PersonalDetails = ({
  values,
  errors,
  touched,
  handleChange,
  styles,
}: PersonalDetailsProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <CustomTextInput
        label={t('kyc.full_name_label')}
        placeholder={t('kyc.full_name_placeholder')}
        value={values.fullName}
        onChangeText={handleChange('fullName')}
        errorMsg={
          touched.fullName && errors.fullName ? (errors.fullName as string) : ''
        }
        style={{ marginTop: 10 }}
      />
      <CustomTextInput
        label={t('kyc.phone_label')}
        placeholder={t('kyc.phone_placeholder')}
        value={values.phone}
        onChangeText={handleChange('phone')}
        keyboardType="phone-pad"
        errorMsg={touched.phone && errors.phone ? (errors.phone as string) : ''}
        maxLength={10}
        style={{ marginTop: 10 }}
      />
      <CustomTextInput
        label={t('kyc.email_label')}
        placeholder={t('kyc.email_placeholder')}
        value={values.email}
        onChangeText={handleChange('email')}
        keyboardType="email-address"
        errorMsg={touched.email && errors.email ? (errors.email as string) : ''}
        style={{ marginTop: 10 }}
      />
      <TextArea
        label={t('kyc.address_label')}
        placeholder={t('kyc.address_placeholder')}
        value={values.address}
        onChangeText={handleChange('address')}
        errorMsg={
          touched.address && errors.address ? (errors.address as string) : ''
        }
        style={{ marginTop: 10 }}
      />
    </View>
  );
};

export default PersonalDetails;
