import React from 'react';
import HomeScreen from './src/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
