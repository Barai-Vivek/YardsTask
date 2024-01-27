import React from 'react';
import HomeScreen from './HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux';

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
