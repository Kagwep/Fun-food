import React from 'react'
import { View,Text,FlatList,StyleSheet,Animated,ActivityIndicator } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import HomeFruitsItem from './HomeFruitsItems';
import  { useState, useEffect } from 'react';


const HomeFruitsList = ({contentInset,contentOffset,contentContainerStyle,bounces,onScroll,scrollEventThrottle,navbarTranslate,loading,category,orderby,order,filter,search}) => {

      // const [scrollY, setScrollY] = useState(0);

      // const onScroll = (event) => {
      //   const currentScrollY = event.nativeEvent.contentOffset.y;
      //   setScrollY(currentScrollY);
      // };

    const renderItem = ({item}) => {
        return <HomeFruitsItem
         id={item.id}
         name={item.name}
         description={item.description}
         image={item.image}
         price = {item.price}
         category ={item.category}

         />
         
    }

    const [products, setProducts] = useState([]);

  
      const fetchProducts = async () => {

        let url = 'https://funfood.vercel.app/api/all/home-fruits/';
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
        setProducts(data);
      }
      

    useEffect(() => {
      fetchProducts();
    }, [category, order,search]);

    // if (loading) return <ActivityIndicator size='large' marginVertical={30} />
   

    console.log("this products",products)
    console.log(category,"dfsgdfjkl")

  return (
    <View style={style.eventlist}>
        <Animated.FlatList 
        // contentInset={contentInset}
        // contentOffset={contentOffset}
        // contentContainerStyle={contentContainerStyle}
        // bounces={false}
        // scrollEventThrottle={scrollEventThrottle}
        // onScroll={onScroll}
        data = {products}
        keyExtractor = {item => item.id}
        // style={{  flexGrow:1,width: '100%' }}
        renderItem = {renderItem}
        refreshControl = {null}
        showsVerticalScrollIndicator={false}
        horizontal
        showsHorizontalScrollIndicator={false}
        
        />
     </View>
  )
}


const style = StyleSheet.create({
  eventlist:{
    backgroundColor:'#ffffff',
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
    paddingTop:15,
    paddingBottom:15,
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

export default HomeFruitsList;