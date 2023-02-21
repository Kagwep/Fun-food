import React from 'react'
import { View,Text,FlatList,StyleSheet,Animated,ActivityIndicator } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
// import { Dummy_Data } from '../../Data/dummy';
import OrderItem from './OrderItem';
import  { useState, useEffect } from 'react';


const OrderList = ({contentInset,contentOffset,contentContainerStyle,bounces,onScroll,scrollEventThrottle,navbarTranslate,loading,category,orderby,order,filter,search}) => {

      // const [scrollY, setScrollY] = useState(0);

      // const onScroll = (event) => {
      //   const currentScrollY = event.nativeEvent.contentOffset.y;
      //   setScrollY(currentScrollY);
      // };

      const [orders, setOrders] = useState([]);

    const renderItem = ({item}) => {
        return <OrderItem
         id={item.id}
         item_details={item.item_details}
         setOrders={setOrders}
         />
         
    }

    

  
      const fetchProducts = async () => {

        let url = 'http://192.168.43.4:8000/api/orders/';
        if (category) {
          url += `?category=${category}`;
        }
        if (search) {
          url += `?search=${search}`;
        }
        if (order.name) {
          url += `?ordering=${order.name}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setOrders(data);
      }
      

    useEffect(() => {
      fetchProducts();
    }, [category, order,search]);

    // if (loading) return <ActivityIndicator size='large' marginVertical={30} />
   

    console.log(orders)
    console.log(category,"dfsgdfjkl")

    const renderFooter = () => {
      return (
        <View style={{ backgroundColor: 'white', padding: 10 }}>
          <Text style={{textAlign:'center'}}>You have {orders.length} items in Orders List</Text>
        </View>
      );
    };

  return (
    <View style={style.orderlist}>
      <View style={style.inner}>
        <Animated.FlatList 
        // contentInset={contentInset}
        // contentOffset={contentOffset}
        contentContainerStyle={contentContainerStyle}
        bounces={false}
        scrollEventThrottle={scrollEventThrottle}
        onScroll={onScroll}
        data = {orders}
        keyExtractor = {item => item.id}
        style={{  flexGrow:1,width: '100%' }}
        renderItem = {renderItem}
        ListFooterComponent={renderFooter}
        refreshControl = {
            <RefreshControl
                refreshing={false}
                onRefresh = {() => console.log("refreshing")}
            />
        }
        showsVerticalScrollIndicator={false}
        
        />
        </View>
     </View>
  )
}


const style = StyleSheet.create({
    orderlist:{
        flex:1
    } ,
     header: {
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      zIndex: 10000
    },
    inner:{
      flex:1
    }

})

export default OrderList;