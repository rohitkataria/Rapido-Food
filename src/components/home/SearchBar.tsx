import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import {useSharedState} from '@features/tabs/SharedContext';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Icon from '@components/global/Icon';
import {Colors} from '@unistyles/Constants';
import CustomText from '@components/global/CustomText';
import RollingContent from 'react-native-rolling-bar';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@states/reduxHook';
import { setVegMode } from '@states/reducers/userSlice';

const searchItems: string[] = [
  'Search "chai samosa"',
  'Search "Cake"',
  'Search "ice cream"',
  'Search "pizza"',
  'Search "Biryani"',
];

const SearchBar = () => {
    const dispatch  = useAppDispatch()
    const isVegMode = useSelector((state:any) => state.user.isVegMode)
  const {styles} = useStyles(homeStyles);
  const {scrollyGlobal} = useSharedState();

  const textColorAnimation = useAnimatedStyle(() => {
    const textColor = interpolate(scrollyGlobal.value, [0, 80], [255, 0]);
    return {
      color: `rgb(${textColor},${textColor},${textColor})`,
    };
  });

  return (
    <>
      <SafeAreaView />
      <View style={[styles.flexRowBetween, styles.padding]}>
        <TouchableOpacity
          style={styles.searchInputContainer}
          activeOpacity={0.8}>
          <Icon
            iconFamily="Ionicons"
            name="search"
            color={isVegMode ? Colors.active : Colors.primary}
            size={20}
          />
          <RollingContent
            interval={3000}
            defaultStyle={false}
            customStyle={styles.textContainer}>
            {searchItems?.map((item, index) => {
              return (
                <CustomText
                  fontSize={12}
                  fontFamily="Okra-Medium"
                  key={index}
                  style={styles.rollingText}>
                  {item}
                </CustomText>
              );
            })}
          </RollingContent>
          <Icon
            iconFamily="Ionicons"
            name="mic-outline"
            color={isVegMode ? Colors.active : Colors.primary}
            size={20}
          />
        </TouchableOpacity>
        <Pressable style={styles.vegMode} onPress={() => dispatch(setVegMode(!isVegMode))}>
          <Animated.Text style={[textColorAnimation, styles.animatedText]}>
            VEG
          </Animated.Text>

          <Animated.Text style={[textColorAnimation, styles.animatedSubText]}>
            MODE
          </Animated.Text>

          <Image
            source={
              isVegMode
                ? require('@assets/icons/switch_on.png')
                : require('@assets/icons/switch_off.png')
            }
            style={styles.switch}
          />
        </Pressable>
      </View>
    </>
  );
};

export default SearchBar;
