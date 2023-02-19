import React from 'react'
import { View,Text,FlatList,StyleSheet,Animated,ActivityIndicator } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
// import { Dummy_Data } from '../../Data/dummy';
import WishItem from './WishItem';
import  { useState, useEffect } from 'react';


const WishList = ({contentInset,contentOffset,contentContainerStyle,bounces,onScroll,scrollEventThrottle,navbarTranslate,loading,category,orderby,order,filter,search}) => {

      // const [scrollY, setScrollY] = useState(0);

      // const onScroll = (event) => {
      //   const currentScrollY = event.nativeEvent.contentOffset.y;
      //   setScrollY(currentScrollY);
      // };

    const renderItem = ({item}) => {
        return <WishItem
         id={item.id}
         fruit_name={item.fruit_name}
         fruit_description={item.fruit_description}
         fruit_image={item.fruit_image}
         fruit_price = {item.fruit_price}
         fruit_category ={item.fruit_category}

         />
         
    }

    const [products, setProducts] = useState([]);

  
      const fetchProducts = async () => {

        let url = 'http://192.168.43.4:8000/api/wishlist/';
        if (category) {
          url += `?fruits_category=${category}`;
        }
        if (search) {
          url += `?search=${search}`;
        }
        if (order.name) {
          url += `?ordering=${order.name}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      }
      

    useEffect(() => {
      fetchProducts();
    }, [category, order,search]);

    // if (loading) return <ActivityIndicator size='large' marginVertical={30} />
   

    console.log(products)
    console.log(category,"dfsgdfjkl")

  return (
    <View>
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
            <RefreshControl
                refreshing={false}
                onRefresh = {() => console.log("refreshing")}
            />
        }
        showsVerticalScrollIndicator={false}
        
        />
     </View>
  )
}


const style = StyleSheet.create({
    eventlist:{
        padding:10,
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

export default WishList;