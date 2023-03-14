import React from 'react'
import { View,Text,FlatList,StyleSheet,Animated,ActivityIndicator } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
// import { Dummy_Data } from '../../Data/dummy';
import PanelOrderedItem from './PanelOrderItems';
import  { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PanelOrderedList = ({contentInset,contentOffset,contentContainerStyle,bounces,onScroll,scrollEventThrottle,navbarTranslate,loading,category,orderby,order,filter,search,ids}) => {

      // const [scrollY, setScrollY] = useState(0);

      // const onScroll = (event) => {
      //   const currentScrollY = event.nativeEvent.contentOffset.y;
      //   setScrollY(currentScrollY);
      // };
      const [isLoading, setIsLoading] = useState(true);
      const [orders, setOrders] = useState([]);
      const [tot, setTotal] = useState('');
      const unorders = useSelector(state => state.orders);
    
    const fetchOrders = () => {
      
      
    }

    const renderItem = ({item}) => {
        return <PanelOrderedItem
         id={item.id}
         item_details={item.item_details}
         order_amount={item.order_amount} 
         order_price={item.order_price}
         setOrders={setOrders}
         />
         
    }

    

  
      const fetchProducts = async () => {

        let url = 'https://funfood.vercel.app/api/checkout/order-checks/';

        const ids_s = JSON.parse(ids);
        const str_ids = ids_s.join(',');
        url += `?ids=${str_ids}`
        console.log('called',url)
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
        console.log(data)

        setOrders(data);
        const total = data.reduce((acc, dat) => acc + dat.order_price, 0);

        setTotal(total);
        setIsLoading(false);
      }
      

    // useEffect(() => {
    //   fetchProducts();
    // }, [category, order,search]);


    useFocusEffect(
      React.useCallback(() => {
        
     
        // AsyncStorage.getItem('token')
        // .then(async token => {
        //   // If the token exists, fetch the products
        //   if (token) {
        //     console.log(token);
        //     const user = await AsyncStorage.getItem('user');
        //     const myUser = JSON.parse(user);
           
        //   } else {
        //     // If the token does not exist, set the orders state variable to the default value
        //     setOrders(unorders.orders);
        //     // console.log("c")
        //   }
        // })
        // .catch(error => {
        //   // If there is an error, set the orders state variable to the default value
        //   console.log(error)
        //   // setOrders(unorders.orders);
        // });
        fetchProducts();
        let isActive = true;
        return () => {
          isActive = false;
        };
      }, [category, order, search,unorders,ids])
    );
    
    // if (loading) return <ActivityIndicator size='large' marginVertical={30} />
   

    console.log(orders)
    console.log(category,"dfsgdfjkl")

    const renderFooter = () => {
      return (
        <View style={{ backgroundColor: 'white', padding: 10 }}>
          <Text style={{textAlign:'center'}}>{orders.length} items in Ordered List</Text>
          <Text style={{textAlign:'center',color:'green'}}>Total: Ksh {tot}</Text>
        </View>
      );
    };
  

  return (
    <View style={style.orderlist}>
    {isLoading ? (
        <ActivityIndicator />
      ) : (
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
           )}
     </View>
  )
}


const style = StyleSheet.create({
    orderlist:{
        flex:1,
        margin:5
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

export default PanelOrderedList;