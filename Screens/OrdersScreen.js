import React from 'react'
import { View,Text,StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OrderList from '../Components/Home/OrderList';

// import ProfileDetails from './ProfileDetails';

const OrdersScreen = () => {

  const navigation = useNavigation();
 
  return (
    <View style={style.screen}>
      <OrderList />
    </View>
  )
}

const style = StyleSheet.create({

    screen:{

        padding:20,

    },

})

export default OrdersScreen