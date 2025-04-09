import {View, Text} from 'react-native';
import React, {FC, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '@features/auth/SplashScreen';
import LoginScreen from '@features/auth/LoginScreen';
import {navigationRef, resetAndNavigate} from '@utils/NavigationUtils';
import AnimatedTabs from '@features/tabs/Animatedtabs';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      resetAndNavigate('LoginScreen');
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          options={{
            animation: 'fade',
          }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            animation: 'fade',
          }}
          name="UserBottomTab"
          component={AnimatedTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
