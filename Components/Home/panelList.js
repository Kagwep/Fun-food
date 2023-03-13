import React from 'react'
import { View,Text,FlatList,StyleSheet,Animated,ActivityIndicator } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
// import { Dummy_Data } from '../../Data/dummy';
// import FruitsItem from './FruitsItem';
import  { useState, useEffect } from 'react';
// import OrderCheckoutsItem from './OrdersCheckoutsItems';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PanelsItem from './PanelItem';

const PanelsList = ({contentInset,contentOffset,priceCategory,contentContainerStyle,bounces,onScroll,scrollEventThrottle,navbarTranslate,loading,category,orderby,order,filter,search}) => {

      // const [scrollY, setScrollY] = useState(0);

      // const onScroll = (event) => {
      //   const currentScrollY = event.nativeEvent.contentOffset.y;
      //   setScrollY(currentScrollY);
      // };

    const renderItem = ({item}) => {
        return <PanelsItem
         id={item.id}
         orderer =  {item.orderer}
         ordered_items = {item.ordered_items}
         order_total_price = {item.order_total_price}
         order_placed_at = {item.order_placed_at}
         latitide = {item.latitide}
         longitude = {item.longitude}
         order_status = {item.order_status}
         

         />
         
    }

    

    const [products, setProducts] = useState([]);
    const uncheckouts = useSelector(state => state.checkouts);
  
      const fetchProducts = async (user) => {



        let url = 'http://192.168.237.72:8000/api/checkout/order-comp/';

        // url +=  `?orderer=${user}`;

        console.log('called')

        if (search && !category && !priceCategory) {
          url += `?search=${search}`;
        } else if (category && !search && !priceCategory) {
          url += `?in_category=${category}`;
        } else if (category && search && !priceCategory) {
          url += `?in_category=${category}&search=${search}`;
          // setSearch(null);
        }
        else if (!category && !search && priceCategory) {
          url += `?price_category=${priceCategory}`;
          // setSearch(null);
        }
        else if (category && search && priceCategory) {
          url += `?in_category=${category}&search=${search}&price_category=${priceCategory}`;
          // setSearch(null);
        }
        else if (category && priceCategory && !search) {
          url += `?in_category=${category}&price_category=${priceCategory}`;
          
          // setSearch(null);
        }
        else if (!category && priceCategory && search) {
          url += `?search=${search}&price_category=${priceCategory}`;
          
          // setSearch(null);
        }

        if (order.name) {
          url += `?ordering=${order.name}`;
        }
        console.log('als',url)
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      }
      

    // useEffect(() => {
    //   fetchProducts();
    // }, [category, order,search,priceCategory]);

    // if (loading) return <ActivityIndicator size='large' marginVertical={30} />
    useFocusEffect(
        React.useCallback(() => {
          
       
          AsyncStorage.getItem('token')
          .then(async token => {
            // If the token exists, fetch the products
            if (token) {
              console.log(token);
            //   const user = await AsyncStorage.getItem('user');
            //   const myUser = JSON.parse(user);
            //   fetchProducts(myUser.id);
              fetchProducts();
            } else {
              // If the token does not exist, set the orders state variable to the default value
              setProducts(uncheckouts.checkouts);
              // console.log("c")
            }
          })
          .catch(error => {
            // If there is an error, set the orders state variable to the default value
            console.log(error)
            // setOrders(unorders.orders);
          });
          let isActive = true;
          return () => {
            isActive = false;
          };
        }, [category, order, search,uncheckouts])
      );

    console.log("this",products)
    console.log(category,"dfsgdfjkl")
    console.log(priceCategory)

  return (
    <View style={style.eventlist}>
        <Animated.FlatList 
        // contentInset={contentInset}
        // contentOffset={contentOffset}
        contentContainerStyle={contentContainerStyle}
        bounces={false}
        scrollEventThrottle={scrollEventThrottle}
        onScroll={onScroll}
        data = {products}
        keyExtractor = {item => item.id}
        style={{  flexGrow:1,width: '100%' }}
        renderItem = {renderItem}
        refreshControl = {
null
        }
        showsVerticalScrollIndicator={false}
        
        />
     </View>
  )
}


const style = StyleSheet.create({
    eventlist:{
        backgroundColor:' #EAEAEA',
        padding:5,
        overflow:'scroll',
        margin:2,
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

})

export default PanelsList;