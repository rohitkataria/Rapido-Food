import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SequenceGame from './src/components/SequenceGame';
import { HomeScreen } from './src/screens';
import SequenceGameScreen from './src/screens/SequecneGameScreen';
import SplashScreen from './src/screens/SplashScreen';
import ReactionTestScreen from './src/screens/ReactionTestScreen';
import SudokoGameScreen from './src/screens/SudokoGameScreen';
import NumberOrderScreen from './src/screens/NumberOrderScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SequenceGameScreen" component={SequenceGameScreen} />
        <Stack.Screen name="ReactionTestScreen" component={ReactionTestScreen} />
        <Stack.Screen name="SudokoGameScreen" component={SudokoGameScreen} />
        <Stack.Screen name="NumberOrderScreen" component={NumberOrderScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
