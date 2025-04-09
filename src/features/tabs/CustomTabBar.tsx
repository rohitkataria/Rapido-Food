import {View, Text, TouchableOpacity, Alert, Image} from 'react-native';
import React, {FC} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useStyles} from 'react-native-unistyles';
import {tabStyles} from '@unistyles/tabStyles';
import {useSharedState} from './SharedContext';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {Colors, screenWidth} from '@unistyles/Constants';
import {
  DeliveryTabIcon,
  DiningTabIcon,
  LiveTabIcon,
  ReorderTabIcon,
} from './TabIcon';
import ScalePress from '@components/ui/ScalePress';
import {useSelector} from 'react-redux';

const CustomTabBar: FC<BottomTabBarProps> = props => {
  const isVegMode = useSelector((state: any) => state.user.isVegMode);
  const {scrolly} = useSharedState();

  const {state, navigation} = props;
  const bottom = useSafeAreaInsets();

  const {styles} = useStyles(tabStyles);

  const isLiveTabFocused = state.routes[state.index]?.name === 'Live';
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY:
            scrolly.value === 1
              ? withTiming(100, {duration: 300})
              : withTiming(0, {duration: 300}),
        },
      ],
    };
  });
  const indicatorStyle = useAnimatedStyle(() => {
    const baseLeft = 10;
    let slideValue = state.index === 3 ? 0.23 : 0.24;
    return {
      left: withTiming(baseLeft + state.index * screenWidth * slideValue),
    };
  });

  return (
    <>
      <Animated.View
        style={[
          styles.tabBarContainer,
          animatedStyle,
          {
            paddingBottom: bottom.bottom,
            backgroundColor: isLiveTabFocused ? Colors.dark : Colors.background,
          },
        ]}>
        <View style={styles.tabContainer}>
          {state?.routes?.map((route, index) => {
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route?.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route?.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <ScalePress
                onPress={onPress}
                onLongPress={onLongPress}
                key={index}
                style={[
                  styles.tabItem,
                  isFocused ? styles.focusedTabItem : {},
                ]}>
                {route?.name === 'Delivery' && (
                  <DeliveryTabIcon focused={isFocused} />
                )}
                {route?.name === 'Reorder' && (
                  <ReorderTabIcon focused={isFocused} />
                )}
                {route?.name === 'Dining' && (
                  <DiningTabIcon focused={isFocused} />
                )}
                {route?.name === 'Live' && <LiveTabIcon focused={isFocused} />}
              </ScalePress>
            );
          })}
          <View style={styles.verticalLine}/>
        </View>
        <Animated.View
  style={[
    styles.slidingIndicator,
    indicatorStyle,
    {
      backgroundColor: isLiveTabFocused
        ? isVegMode
          ? Colors.active
          : Colors.primary
        : '#fff',
    },
  ]}
/>
<TouchableOpacity
  activeOpacity={0.9}
  style={styles.groceryLogoContainer}
  onPress={() => {
    Alert.alert('Please like and subscribe!');
  }}
>
  <Image
    source={require('@assets/icons/grocery.png')}
    style={styles.groceryLogo}
  />
</TouchableOpacity>


      </Animated.View>
    </>
  );
};

export default CustomTabBar;
