import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useThemeColor } from '@/hooks/useThemeColor';
import { hp, wp } from '@/utils/responsive.utils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface BannerItem {
  id: string;
  image: string;
}

interface BannerCarouselProps {
  data: BannerItem[];
  autoPlay?: boolean;
  showPagination?: boolean;
  onPress?: (item: BannerItem) => void;
}

export default function BannerCarousel({
  data,
  autoPlay = false,
  showPagination = true,
  onPress,
}: BannerCarouselProps) {
  const themeColor = useThemeColor();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (autoPlay && data.length > 1) {
      const interval = setInterval(() => {
        let nextIndex = activeIndex + 1;
        if (nextIndex >= data.length) {
          nextIndex = 0;
        }
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        setActiveIndex(nextIndex);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeIndex, autoPlay, data.length]);

  const onScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (roundIndex !== activeIndex) {
      setActiveIndex(roundIndex);
    }
  };

  const renderItem = ({ item }: { item: BannerItem }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress && onPress(item)}
      style={styles.bannerContainer}
    >
      <FastImage
        source={{ uri: item.image }}
        style={styles.bannerImage}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
      {showPagination && data.length > 1 && (
        <View style={styles.paginationContainer}>
          {data.map((_, index) => (
            <View
              key={index.toString()}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    activeIndex === index
                      ? themeColor.buttonBackground
                      : themeColor.grayS1,
                  width: activeIndex === index ? 12 : 6,
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: hp('2%'),
    alignItems: 'center',
  },
  bannerContainer: {
    width: SCREEN_WIDTH - wp('8%'),
    height: hp('22%'),
    marginHorizontal: wp('4%'),
    borderRadius: 20,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('1.5%'),
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
});
