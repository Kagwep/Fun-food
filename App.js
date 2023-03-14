import { NavigationContainer } from '@react-navigation/native';
import { HomeStack } from './Navigation/Stack';
import 'react-native-gesture-handler';
import { MyDrawer } from './Navigation/Drawer';
import { StatusBar } from 'expo-status-bar';
import store from './Components/Home/ConfigureStore';
import SplashScreen from './Components/SplashScreen';
import { useState,useEffect } from 'react';
import React from 'react';
import { Provider } from 'react-redux';

export default function App() {

  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // set the loading time
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
      {isLoading ? (
          <SplashScreen />
        ) : (
          <>
          <MyDrawer />
          <StatusBar style="light" />
          </>
        )}

      </NavigationContainer>
      </Provider>

  );
}
