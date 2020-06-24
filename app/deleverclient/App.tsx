import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { RootStackNavigation } from './src/navigation/RootStackNavigation';
import { persistor, store } from './src/reduxStore/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar backgroundColor="#0004" />
        <NavigationContainer>
          <RootStackNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
export default App;
