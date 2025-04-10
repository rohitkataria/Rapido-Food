import React, {useEffect, useRef} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Animated} from 'react-native';

const SplashScreen = ({navigation}: any) => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Run scale and opacity animations in parallel
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after delay
    const timeout = setTimeout(() => {
      navigation?.navigate('HomeScreen');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appLogoContainer}>
        <Animated.Text
          style={[styles.iconText, {transform: [{scale: scaleAnim}]}]}>
          🧠
        </Animated.Text>

        <Animated.Text style={[styles.headingText, {opacity: opacityAnim}]}>
          Cognitive Health{'\n'}Management
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  appLogoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  iconText: {
    fontSize: 100,
    color: '#38bdf8',
  },
  headingText: {
    fontSize: 28,
    color: '#facc15',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 36,
    marginTop: 10,
  },
});

export default SplashScreen;
