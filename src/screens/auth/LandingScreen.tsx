import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { IMAGES } from '@/assets';
import CustomButton from '@/components/buttons/CustomButton';
import { fontFamily, fontSize } from '@/utils/fontIcon.utils';
import { hp, width, wp } from '@/utils/responsive.utils';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TAuthStack } from '@/interface/navigation.type';
import { onboardingData } from '@/utils/contant.utils';
import { themeType } from '@/interface';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';


export default function LandingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<TAuthStack>>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  const renderItem = ({ item }: { item: (typeof onboardingData)[0] }) => {
    return (
      <View style={styles.slide}>
        <View>
          <View style={styles.imageContainer}>
            {item.type === 'logo' ? (
              <View style={styles.logoCircle}>
                <Image
                  source={item.image}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.logoText}>Logo</Text>
              </View>
            ) : (
              <Image
                source={item.image}
                style={styles.illustration}
                resizeMode="contain"
              />
            )}
          </View>
          {item.type !== 'logo' && (
            <View style={styles.contentContainer}>
              {item.title ? (
                <Text style={[styles.title, { color: themeColor.secondary }]}>
                  {item.title}
                </Text>
              ) : null}
              {item.description ? (
                <Text style={[styles.description, { color: themeColor.textS2 }]}>
                  {item.description}
                </Text>
              ) : null}
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title={`${item.buttonText}  →`}
            onPress={handleNext}
            style={[styles.button, { backgroundColor: themeColor.secondary }]}
            textStyle={styles.buttonText}
          />
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={IMAGES.landingScreenBg}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        scrollEnabled={false}
        keyExtractor={item => item.id}
      />
    </ImageBackground>
  );
}

const createStyle = (themeColor: themeType) => StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: width,
    paddingHorizontal: wp('8%'),
    justifyContent: 'space-between',
    paddingVertical: hp('5%'),
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('10%')
  },
  logoCircle: {
    width: wp('40%'),
    height: wp('40%'),
    borderRadius: wp('20%'),
    backgroundColor: themeColor.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('20%')
  },
  logo: {
    width: '50%',
    height: '50%',
  },
  logoText: {
    color: 'white',
    fontFamily: fontFamily.medium,
    fontSize: fontSize.f16,
    marginTop: 5,
  },
  illustration: {
    width: wp('80%'),
    height: wp('80%'),
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('5%'),
  },
  title: {
    fontFamily: fontFamily.extraBold,
    fontSize: fontSize.f32,
    textAlign: 'center',
    marginBottom: hp('2%'),
    lineHeight: fontSize.f34,
  },
  description: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.f16,
    textAlign: 'center',
    paddingHorizontal: wp('2%'),
    lineHeight: fontSize.f24,
  },
  buttonContainer: {
    width: '100%',
    paddingBottom: hp('2%'),
  },
  button: {
    width: '100%',
    height: 60,
    borderRadius: 20,
    marginTop: 0,
  },
  buttonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.f18,
    textTransform: 'none',
  },
});

