import { View, Text, Platform } from 'react-native'
import React, { FC } from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useStyles } from 'react-native-unistyles';
import { homeStyles } from '@unistyles/homeStyles';
import { useSharedState } from '@features/tabs/SharedContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Graphics from '@components/home/Graphics';
import HeaderSection from '@components/home/HeaderSection';
import MainList from '@components/lists/MainList';

const DeliveryScreen:FC = () => {
    const insets = useSafeAreaInsets()
    const { styles } = useStyles(homeStyles);
    const { scrollyGlobal } = useSharedState();
  
    const backgroundColorChanges = useAnimatedStyle(() => {
      const opacity = interpolate(scrollyGlobal.value, [1, 50], [0, 1]);
      return {
        backgroundColor: `rgba(255,255,255,${opacity})`
      };
    });

      
      const moveUpStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollyGlobal.value,
          [0, 50],
          [0, -50],
          Extrapolate.CLAMP
        );
        return {
          transform: [{ translateY }]
        };
      });
      const moveUpStyleNotExtrapolate = useAnimatedStyle(() => {
        const translateY = interpolate(scrollyGlobal.value, [0, 50], [0, -50]);
        return {
          transform: [{ translateY: translateY }],
        };
      });
      

      
  return (
    <View style={styles.container}>
    <View style={{ height: Platform.OS === 'android' ? insets.top : 0 }} />
  
    <Animated.View style={moveUpStyle}>
      <Animated.View style={moveUpStyleNotExtrapolate}>
        {/* Inner content */}
        <Graphics />
      </Animated.View>
  
      <Animated.View style={[backgroundColorChanges, styles.topHeader]}>
        {/* Inner content */}
        <HeaderSection />
      </Animated.View>
    </Animated.View>
  
    <Animated.View style={moveUpStyle}>
      {/* Inner content */}
      <MainList />
    </Animated.View>
  </View>
  
  )
}

export default DeliveryScreen