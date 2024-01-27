import React from 'react';
import HomeScreen from './src/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
