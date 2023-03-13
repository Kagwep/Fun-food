import React,{useEffect,useState,useLayoutEffect} from 'react'
import { View,Text,StyleSheet, Button,TouchableOpacity } from 'react-native';
import OrderList from '../Components/Home/OrderList';
import {HeaderBackButton} from "@react-navigation/elements";
import { useNavigation , useRoute} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import OrderedList from '../Components/Home/OrderedList';

const OrderedItemsScreen = () => {

  
    const route =  useRoute();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle:'Your Order Items',
          headerLeft: () => (
            <HeaderBackButton 
              tintColor='white'
              onPress={() => navigation.goBack()}
            
            />
          )
        })
       },[])

       const {ids} = route.params;

       const [category, setCategory] = useState('');
       const [order, setOrder] = useState('');
       const [filter, setFilter] = useState({ price: '', product_name: '' });
       const [loading, setLoading] = useState(false);
       const [search, setSearch] = useState('');

  return (
    <View style={styles.container}> 
     <Text style={{textAlign:'center',color:'green',padding:10}}> Orders </Text>

    
     <OrderedList  
        ids={ids}
        loading={loading}
        category={category}
        order={order}
        search ={search}
        filter={filter}
      />
     
 

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default OrderedItemsScreen