import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomTextInput, CustomImagePicker } from '@/components';
import { useTranslation } from 'react-i18next';
import {
  fontFamily,
  fontSize,
  MaterialDesignIcons,
  Ionicons,
} from '@/utils/fontIcon.utils';
import FastImage from 'react-native-fast-image';
import { useThemeColor } from '@/hooks/useThemeColor';

interface DocumentVerificationProps {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  setFieldValue: any;
  styles: any;
}

const DocumentVerification = ({
  values,
  errors,
  touched,
  handleChange,
  setFieldValue,
  styles,
}: DocumentVerificationProps) => {
  const { t } = useTranslation();
  const themeColor = useThemeColor();

  return (
    <View>
      <View style={styles.card}>
        <View style={styles.aadhaarRow}>
          <View style={{ flex: 1 }}>
            <CustomTextInput
              label={t('kyc.aadhaar_number')}
              placeholder="XXXX XXXX XXXX"
              value={values.aadhaarNumber}
              onChangeText={handleChange('aadhaarNumber')}
              keyboardType="number-pad"
              maxLength={12}
              errorMsg={touched.aadhaarNumber && errors.aadhaarNumber ? (errors.aadhaarNumber as string) : ''}
              containerStyle={{ marginBottom: 0 }} // Ensure no extra margin
            />
          </View>
          <View style={styles.verifyBtnContainer}>
             <TouchableOpacity
                style={[styles.verifyBtn, { backgroundColor: themeColor.yellow }]}
                activeOpacity={0.7}
              >
                <Text style={styles.verifyBtnText}>{t('kyc.verify')}</Text>
              </TouchableOpacity>
          </View>
        </View>
        <Text style={[styles.infoText, { color: themeColor.textS2 }]}>
          {t('kyc.verification_link_info')}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={[styles.cardSubTitle, { color: themeColor.textS2 }]}>
          {t('kyc.id_proof')}
        </Text>
        <Text style={[styles.idTypes, { color: themeColor.secondary }]}>
          {t('kyc.id_proof_types')}
        </Text>

        <View style={styles.pickerContainer}>
          <View style={styles.pickerHeader}>
            <View style={[styles.uploadIconBox, { backgroundColor: themeColor.yellow }]}>
              <Ionicons name="cloud-upload-outline" size={24} color="#FFF" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.uploadTitle, { color: themeColor.secondary }]}>
                {t('kyc.upload_front_back')}
              </Text>
              <Text style={[styles.uploadInfo, { color: themeColor.textS2 }]}>
                {t('kyc.upload_info')}
              </Text>
            </View>
            <CustomImagePicker
              type="CUSTOM"
              onSelectImage={(data) => {
                if (!values.frontId) setFieldValue('frontId', data.uri);
                else setFieldValue('backId', data.uri);
              }}
            >
              <View style={[styles.chooseBtn, { backgroundColor: themeColor.secondary }]}>
                <Text style={styles.chooseText}>{t('kyc.choose')}</Text>
              </View>
            </CustomImagePicker>
          </View>

          <View style={styles.previewRow}>
            <PreviewBox
              label={t('kyc.preview')}
              uri={values.frontId}
              onDelete={() => setFieldValue('frontId', '')}
              themeColor={themeColor}
              styles={styles}
              errorMsg={touched.frontId && errors.frontId ? (errors.frontId as string) : ''}
            />
            <PreviewBox
              label={t('kyc.preview')}
              uri={values.backId}
              onDelete={() => setFieldValue('backId', '')}
              themeColor={themeColor}
              styles={styles}
              errorMsg={touched.backId && errors.backId ? (errors.backId as string) : ''}
            />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <CustomTextInput
          label={t('kyc.bank_account_number')}
          placeholder="•••• •••• ••••"
          value={values.bankAccountNumber}
          onChangeText={handleChange('bankAccountNumber')}
          keyboardType="number-pad"
          errorMsg={touched.bankAccountNumber && errors.bankAccountNumber ? (errors.bankAccountNumber as string) : ''}
        />
        <CustomTextInput
          label={t('kyc.ifsc_code')}
          placeholder="BANK0123456"
          value={values.ifscCode}
          onChangeText={handleChange('ifscCode')}
          autoCapitalize="characters"
          errorMsg={touched.ifscCode && errors.ifscCode ? (errors.ifscCode as string) : ''}
        />
      </View>

      <View style={[styles.secureBox, { backgroundColor: themeColor.secondary }]}>
        <View style={styles.secureHeader}>
          <View style={styles.shieldIconBox}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#FFF" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.secureTitle}>{t('kyc.secure_processing')}</Text>
            <Text style={styles.secureDesc}>{t('kyc.secure_processing_desc')}</Text>
          </View>
        </View>
        <View style={styles.pillsRow}>
          <Pill icon="lock-closed-outline" text={t('kyc.aes_256')} />
          <Pill icon="database-outline" text={t('kyc.secure_vault')} isMDI />
          <Pill icon="file-check-outline" text={t('kyc.compliance_ready')} isMDI />
        </View>
      </View>
    </View>
  );
};

const PreviewBox = ({ label, uri, onDelete, themeColor, styles, errorMsg }: any) => {
  const { t } = useTranslation();
  return (
    <View style={styles.previewBox}>
      <Text style={[styles.previewLabel, { color: themeColor.textS2 }]}>{label}</Text>
      <View style={[styles.imagePlaceholder, errorMsg ? { borderColor: themeColor.red } : {}]}>
        {uri ? (
          <>
            <FastImage source={{ uri }} style={styles.previewImage} resizeMode="cover" />
            <TouchableOpacity style={styles.deleteIcon} onPress={onDelete} activeOpacity={0.8}>
              <Ionicons name="close" size={16} color="#FFF" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <MaterialDesignIcons name="image-outline" size={24} color={themeColor.textS2} />
            <Text style={[styles.notAdded, { color: themeColor.textS2 }]}>{t('kyc.not_added')}</Text>
          </>
        )}
      </View>
      {errorMsg ? <Text style={styles.miniError}>{errorMsg}</Text> : null}
    </View>
  );
};

const Pill = ({ icon, text, isMDI = false }: any) => (
  <View style={localStyles.pill}>
    {isMDI ? (
      <MaterialDesignIcons name={icon} size={14} color="#FFF" />
    ) : (
      <Ionicons name={icon} size={14} color="#FFF" />
    )}
    <Text style={localStyles.pillText}>{text}</Text>
  </View>
);

const localStyles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  pillText: {
    color: '#FFF',
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.f11,
    marginLeft: 6,
  },
});

export default DocumentVerification;
