/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import HomeScreen from './src/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <HomeScreen />
    </NavigationContainer>
  );
};

export default App;
