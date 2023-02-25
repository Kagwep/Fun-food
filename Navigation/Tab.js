import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';

import ProfileScreen from '../Screens/ProfileScreen';
import WishListScreen from '../Screens/WishListScreen';
import OrdersScreen from '../Screens/OrdersScreen';

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  return (
    <Tab.Navigator
    screenOptions={({route})=>({
        headerShown:false,
        tabBarStyle:{
            backgroundColor:"#D2B04C",
            

        },
        tabBarActiveTintColor:"yellow",
        tabBarInactiveTintColor: "#fff",
        tabBarIcon:({focused,color,size}) => {
            let iconName;
            if(route.name === "HomeTab"){
                iconName = focused? 'home' :'home'
            }
            else if(route.name === "WishListTab"){
                iconName = focused? 'heart' :'heart'
            }
            else if(route.name === "OrdersTab"){
                iconName = focused? 'basket' :'basket'
            }
            else if(route.name === "ProfileTab"){
              iconName = focused? 'person' :'person'
          }

            return <Ionicons name={iconName} size={focused? 35 :size} color={color} />
        }
    })}
    >
      <Tab.Screen
       name="HomeTab"
    component={HomeScreen} 
        options={{
            title:"Home"
        }}
       />
      <Tab.Screen name="WishListTab" component={WishListScreen} 
              options={{
                title:"Wish List"
            }}
      />
      <Tab.Screen name="OrdersTab" component={OrdersScreen} 
      
      options={{
        title:"Orders"
    }}
      />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} 
      
      options={{
        title:"Profiles"
    }}
      />

    </Tab.Navigator>
  );
}