import React , { useState } from 'react'
import { TouchableOpacity,Text,StyleSheet, View,Image,Alert ,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addOrder } from './OrdersReducer';
import { useDispatch } from 'react-redux';
import { addWish } from './WishReducer';
import uuid from "uuid";


const PanelItem = ({
  id,
  orderer,
  ordered_items ,
  order_total_price,
  order_placed_at,
  latitide ,
  longitude ,
  order_status ,
  status,
  order_number,
}) => {
  const navigation = useNavigation();
  


return (
  <TouchableOpacity
    style={styles.container}
    onPress={() => navigation.navigate('PanelOrderComps', {ids:ordered_items})}
  >

    <View style={styles.info}>
      <Text style={styles.orderNumber}>Order Number: {order_number}</Text>
      <Text style={styles.status}>Status: {status}</Text>
      <Text style={styles.total}>Total Amount : {order_total_price}</Text>
      <Text style={styles.date}>placed at: {order_placed_at}</Text>
    </View>
    <View style={styles.icon}>
      {/* Add any icons or buttons here */}
    </View>
  </TouchableOpacity>

);
}

const styles = StyleSheet.create({

container: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
  paddingVertical: 15,
  backgroundColor: '#fff',
  borderRadius: 10,
  marginHorizontal: 10,
  marginVertical: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 2,
},
info: {
  flex: 1,
},
orderNumber: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 5,
},
status: {
  fontSize: 16,
  color: '#888',
  marginBottom: 5,
},
total: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 5,
},


});


export default PanelItem