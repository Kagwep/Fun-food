import { createStackNavigator } from '@react-navigation/stack';
import { NavOptions } from './Options';
import { useNavigation } from '@react-navigation/native';
import ProfileScreen from '../Screens/ProfileScreen';
import ProfileDetails from '../Screens/ProfileDetails';
import { HomeTabs } from './Tab';
import FoodDetails from '../Screens/FoodDetails';
// import AuctionDetails from '../Screens/AuctionDetails';
// import MarketDetails from '../Screens/MarketDetails';
import OrdersDetails from '../Screens/OrderDetails';
// import ProductForm from '../Components/Forms/ProductForm';
// import ShopProductsDetails from '../Screens/ShopProductDetails';
// import Login from '../Components/Forms/LogIn ';
// import MarketProductForm from '../Components/Forms/MarketProduct';
// import ShopProductForm from '../Components/Forms/ShopProduct';
// import MarketForm from '../Components/Forms/MarketForm';
// import ShopForm from '../Components/Forms/ShopForm';
import WishListDetails from '../Screens/WishListDetails';

const Stack = createStackNavigator();

export const HomeStack =() => {

  const navigation = useNavigation();

  return (
    <Stack.Navigator
    screenOptions={()=>NavOptions(navigation)}
    >
      <Stack.Screen name="Fun Food" component={HomeTabs}  />
      <Stack.Screen name="Food" component={FoodDetails} />
      <Stack.Screen name="WishList" component={WishListDetails} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
      {/* <Stack.Screen name="Shop" component={ShopDetails} />
      <Stack.Screen name="ShopProduct" component={ShopProductsDetails} />
      <Stack.Screen name="Market" component={MarketDetails} />
      <Stack.Screen name="LogIn" component={Login} />
      <Stack.Screen name="MarketProductForm" component={MarketProductForm} />
      <Stack.Screen name="ShopProductForm" component={ShopProductForm} />
      <Stack.Screen name="MarketForm" component={MarketForm} />
      <Stack.Screen name="ShopForm" component={ShopForm} />
       */}
    </Stack.Navigator>
  );
}

export const ProfileStack =() => {

  const navigation = useNavigation();

  return (
    <Stack.Navigator
    screenOptions={()=>NavOptions(navigation)}
    >
      <Stack.Screen name="Profiles" component={ProfileScreen} />
      <Stack.Screen name="Profile" component={ProfileDetails} />
    </Stack.Navigator>
  );
}


export const ShopStack= () => {

  const navigation = useNavigation();

  return (
    <Stack.Navigator
    screenOptions={()=>NavOptions(navigation)}
    >
      <Stack.Screen name="Shop" component={OrdersDetails} />
  
      </Stack.Navigator>
  );


}


export const MarketStack=() => {

  const navigation = useNavigation();
  
  return (
    <Stack.Navigator
    screenOptions={()=>NavOptions(navigation)}
    >
    <Stack.Screen name="Market" component={WishListDetails} />
  
  </Stack.Navigator>
  );



}