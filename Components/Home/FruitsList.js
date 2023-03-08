import React from 'react'
import { View,Text,FlatList,StyleSheet,Animated,ActivityIndicator } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
// import { Dummy_Data } from '../../Data/dummy';
import FruitsItem from './FruitsItem';
import  { useState, useEffect } from 'react';


const FruitsList = ({contentInset,contentOffset,priceCategory,contentContainerStyle,bounces,onScroll,scrollEventThrottle,navbarTranslate,loading,category,orderby,order,filter,search}) => {

      // const [scrollY, setScrollY] = useState(0);

      // const onScroll = (event) => {
      //   const currentScrollY = event.nativeEvent.contentOffset.y;
      //   setScrollY(currentScrollY);
      // };

    const renderItem = ({item}) => {
        return <FruitsItem
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



        let url = 'https://funfood.vercel.app/api/fruits/';

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
      

    useEffect(() => {
      fetchProducts();
    }, [category, order,search,priceCategory]);

    // if (loading) return <ActivityIndicator size='large' marginVertical={30} />
   

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
        backgroundColor:' #EAEAEA',
        padding:5,
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

export default FruitsList;