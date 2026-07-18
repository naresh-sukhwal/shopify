import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@/utils/fontIcon.utils';
import { fontFamily, fontSize } from '@/utils/fontIcon.utils';
import type { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast';

export const SuccessToast = ({ toast }: { toast: ToastProps }) => {
  const insets = useSafeAreaInsets();
  const marginTop = toast.placement === 'top' ? insets.top + 10 : 0;
  const marginBottom = toast.placement === 'bottom' ? insets.bottom + 10 : 0;

  return (
    <View style={[styles.container, { marginTop, marginBottom }]}>
      <Ionicons name="checkmark-circle" size={24} color="#2E7D32" />
      <Text style={styles.message}>{toast.message}</Text>
      <TouchableOpacity onPress={() => toast.onHide()} style={styles.closeBtn}>
        <Ionicons name="close-outline" size={20} color="#81C784" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  message: {
    flex: 1,
    marginLeft: 12,
    fontSize: fontSize.f14,
    fontFamily: fontFamily.medium,
    color: '#2E7D32',
  },
  closeBtn: {
    padding: 4,
  },
});
