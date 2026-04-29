import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaWrapper } from '@/components';
import { hp, wp } from '@/utils/responsive.utils';

export default function StoreScreen() {
  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Text>StoreScreen</Text>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: 'black',
  },
  helpBtn: {
    position: 'absolute',
    bottom: hp('2%'),
    right: wp('5%'),
  },
});
