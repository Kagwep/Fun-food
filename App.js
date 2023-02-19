import { NavigationContainer } from '@react-navigation/native';
import { HomeStack } from './Navigation/Stack';
import 'react-native-gesture-handler';
import { MyDrawer } from './Navigation/Drawer';
import { StatusBar } from 'expo-status-bar';
import { ShopStack } from './Navigation/Stack';

export default function App() {

  return (
  
      <NavigationContainer>
        <MyDrawer />
        
        <StatusBar style='light'/>

      </NavigationContainer>


  );
}
