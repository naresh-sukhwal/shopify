import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaWrapper } from '@/components';
import { hp, wp } from '@/utils/responsive.utils';

export default function LibraryScreen() {
  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Text>LibraryScreen</Text>
        {/* <NeedHelpButton onPress={() => {}} style={styles.helpBtn} /> */}
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
  },
  helpBtn: {
    position: 'absolute',
    bottom: hp('2%'),
    right: wp('5%'),
  },
});
