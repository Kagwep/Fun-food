import React,{useEffect,useState,useLayoutEffect} from 'react'
import { View,Text,StyleSheet, Button,TouchableOpacity } from 'react-native';
import OrderList from '../Components/Home/OrderList';
import {HeaderBackButton} from "@react-navigation/elements";
import { useNavigation , useRoute} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
// import ProfileDetails from './ProfileDetails';

const OrdersScreen = () => {

 
  const route =  useRoute();
  const navigation = useNavigation();

  const [category, setCategory] = useState('');
  const [order, setOrder] = useState('');
  const [filter, setFilter] = useState({ price: '', product_name: '' });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');


  useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle:'Food Available',
        headerLeft: () => (
          <HeaderBackButton 
            tintColor='white'
            onPress={() => navigation.goBack()}
          
          />
        )
      })
     },[])
  return (
    <View style={style.screen}>
      <View style={style.header}>
        <Text style={style.headerText}> Your Order Items List</Text>
      </View>
      <OrderList 
        loading={loading}
        category={category}
        order={order}
        search ={search}
        filter={filter}
      />
      <View style={style.checkout}>
        <View style={style.check}>
         
          <TouchableOpacity
          style={style.ord}
          onPress={() => navigation.navigate("Checkout")}
          >
          <Text style={style.checkText}> Place Order</Text>
          <Ionicons name="arrow-forward-circle" size={24} color={'#FFC000'} />
          </TouchableOpacity>
          

        </View>

      </View>
    </View>
  )
}

const style = StyleSheet.create({

    screen:{

        padding:20,
        flex:1

    },
    header:{
      padding:10,

    },
    headerText:{
      textAlign:'center',
      fontSize:20,
      fontStyle:'italic',
      fontWeight:'bold'
    },
    checkout:{
      paddingTop:5,
      borderTopEndRadius:10,
      borderTopStartRadius:10,
      borderTopWidth:2,
      borderLeftWidth:2,
      borderRightWidth:2,
      borderColor:'#FFC000',
    },
    check:{
      padding:5,
    },
    checkText:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20,
    },
   ord:{padding:5,alignItems:'center',justifyContent:'center'}


})

export default OrdersScreen