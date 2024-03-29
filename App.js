import { NavigationContainer } from '@react-navigation/native';
import { HomeStack } from './Navigation/Stack';
import 'react-native-gesture-handler';
import { MyDrawer } from './Navigation/Drawer';
import { StatusBar } from 'expo-status-bar';
import store from './Components/Home/ConfigureStore';

import React from 'react';
import { Provider } from 'react-redux';

export default function App() {



  return (
    <Provider store={store}>
      <NavigationContainer>
          <MyDrawer />
          <StatusBar style="light" />
      </NavigationContainer>
      </Provider>

  );
}
