import {
  View,
  Text,
  SectionList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import RestaurentList from './RestaurentList';
import ExploreList from './ExploreList';
import {useStyles} from 'react-native-unistyles';
import {restaurantStyles} from '@unistyles/restuarantStyles';
import {useSharedState} from '@features/tabs/SharedContext';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import BackToTopButton from '@components/ui/BackToTopButton';
import SortingAndFilters from '@components/home/SortingAndFilters';
import {filtersOption} from '@utils/dummyData';
const sectionedData = [
  {
    title: 'Explore',
    data: [{}],
    renderItem: () => <ExploreList />,
  },
  {
    title: 'Restaurants',
    data: [{}],
    renderItem: () => <RestaurentList />,
  },
];

const MainList: FC = () => {
  const {styles} = useStyles(restaurantStyles);
  const {scrolly, scrollToTop, scrollyGlobal} = useSharedState();

  const previousScrollYTopButton = useRef<number>(0);
  const prevScrollY = useRef(0);
  const sectionListRef = useRef<SectionList>(null);

  const [isRestaurantVisible, setIsRestaurantsVisible] = useState(false);
  const [isNearEnd, setIsNearEnd] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event?.nativeEvent?.contentOffset?.y;
    const isScrollingDown = currentScrollY > prevScrollY?.current;

    scrolly.value = isScrollingDown
      ? withTiming(1, {duration: 300})
      : withTiming(0, {duration: 300});
    scrollyGlobal.value = currentScrollY;
    prevScrollY.current = currentScrollY;

    const containerHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event?.nativeEvent?.layoutMeasurement?.height;
    const offset = event?.nativeEvent?.contentOffset?.y;

    setIsNearEnd(offset + layoutHeight >= containerHeight - 500);
  };

  const handleScrollToTop = async () => {
    scrollToTop();
    sectionListRef.current?.scrollToLocation({
      sectionIndex: 0,
      itemIndex: 0,
      animated: true,
      viewPosition: 0,
    });
  };

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollyGlobal?.value < previousScrollYTopButton.current &&
      scrollyGlobal.value > 180;

    const opacity = withTiming(
      isScrollingUp && (isRestaurantVisible || isNearEnd) ? 1 : 0,
      {duration: 300},
    );

    const translateY = withTiming(
      isScrollingUp && (isRestaurantVisible || isNearEnd) ? 0 : 10,
      {duration: 300},
    );

    previousScrollYTopButton.current = scrollyGlobal.value;

    return {
      opacity,
      transform: [{translateY}],
    };
  });

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 80,
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    const restaurantVisible = viewableItems.some(
      item => item?.section?.title === 'Restaurants' && item?.isViewable,
    );
    setIsRestaurantsVisible(restaurantVisible);
  };

  return (
    <>
      <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
        <BackToTopButton onPress={handleScrollToTop} />
      </Animated.View>

      <SectionList
        overScrollMode="always"
        onScroll={handleScroll}
        ref={sectionListRef}
        scrollEventThrottle={16}
        sections={sectionedData}
        bounces={false}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        stickySectionHeadersEnabled={true}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        renderSectionHeader={({section}) => {
            if (section.title !== 'Restaurants') {
              return null;
            }
  
            return (
              <Animated.View
                style={[
                  isRestaurantVisible || isNearEnd ? styles.shadowBottom : null,
                ]}>
                <SortingAndFilters menuTitle="Sort" options={filtersOption} />
              </Animated.View>
            );
          }}
      />
    </>
  );
};

export default MainList;
