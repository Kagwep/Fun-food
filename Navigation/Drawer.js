import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStack } from './Stack';
import { ProfileStack } from './Stack';
import { ShopStack } from './Stack';
import { PanelStack } from './Stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {

  const isFocused = useIsFocused();

  const [loggedIn, setLoggedIn] = useState(true);
  const [admin,setAdmin] = useState(true);
  const [shouldDisplayPanelStack, setShouldDisplayPanelStack] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      const myUser = JSON.parse(user);

      if (!token) {
        setLoggedIn(false);
        setAdmin(false);
      } else {
        if (myUser.is_superuser) {
          setAdmin(true);
          console.log(myUser.id);
          setShouldDisplayPanelStack(true);
        } else {
          setAdmin(false);
        }
      }
    };

    checkLoggedIn();
  }, [isFocused]);

  return (
      <Drawer.Navigator 
        screenOptions={{headerShown: false}}>
        <Drawer.Screen name="HomeStack" component={HomeStack} options={{title:'Home'}}/>
        {admin && shouldDisplayPanelStack && (
          <>
            <Drawer.Screen name="PanelStack" component={PanelStack} options={{title:'Ordered Items'}}/>
            <Drawer.Screen name="ProfileStack" component={ProfileStack} options={{title:'Profiles'}}/>
          </>
        )}
        {!admin && (
           <Drawer.Screen name="ProfileStack" component={ProfileStack} options={{title:'Profiles'}}/>
        )}
      </Drawer.Navigator>
  );
};

