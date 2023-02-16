import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStack } from './Stack';
import { ProfileStack } from './Stack';
import { ShopStack } from './Stack';


const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
  return (

      <Drawer.Navigator 
      
      screenOptions={{headerShown: false}}>
        <Drawer.Screen name="HomeStack" component={HomeStack} options={{title:'Home'}}/>
        <Drawer.Screen name="ProfileStack" component={ProfileStack} options={{title:'Profiles'}}/>
        <Drawer.Screen name="ShopStack" component={ShopStack} options={{title:'Shops'}}/>
      </Drawer.Navigator>

  );
}