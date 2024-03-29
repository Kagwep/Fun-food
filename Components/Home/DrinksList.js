import React from 'react'
import { View,Text,FlatList,StyleSheet,Animated,ActivityIndicator } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
// import { Dummy_Data } from '../../Data/dummy';
import DrinkItem from './DrinkItem';
import  { useState, useEffect } from 'react';



const DrinkList = ({contentInset,setSearch,contentOffset,contentContainerStyle,bounces,onScroll,scrollEventThrottle,navbarTranslate,loading,category,orderby,order,filter,search}) => {

      // const [scrollY, setScrollY] = useState(0);

      // const onScroll = (event) => {
      //   const currentScrollY = event.nativeEvent.contentOffset.y;
      //   setScrollY(currentScrollY);
      // };

    const renderItem = ({item}) => {
        return <DrinkItem
         id={item.id}
         name={item.name}
         description={item.description}
         image={item.image}
         price = {item.price}
         drink_category ={item.drink_category}
         category={item.category}

         />
         
    }

    const [products, setProducts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

  
      const fetchProducts = async () => {

        let url = 'https://funfood.vercel.app/api/drinks/';

        if (search && !category) {
          url += `?search=${search}`;
        } else if (category && !search) {
          url += `?drink_category=${category}`;
        } else if (category && search) {
          url += `?drink_category=${category}&search=${search}`;
          // setSearch(null);
        }
        
        if (order.name) {
          if (url.includes('?')) {
            url += `&ordering=${order.name}`;
          } else {
            url += `?ordering=${order.name}`;
          }
        }

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      }
      

    useEffect(() => {
      fetchProducts();
    }, [category, order,search]);

    // if (loading) return <ActivityIndicator size='large' marginVertical={30} />
   

    console.log(products)
    console.log(category,"dfsgdfjkl")

  return (
    <View style={style.eventlist}>
       {isLoading ? (<ActivityIndicator />) :(
       <View style={style.inner}>
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
        )}
     </View>
  )
}


const style = StyleSheet.create({
    eventlist:{
        padding:5,
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
    },

})

export default DrinkList;