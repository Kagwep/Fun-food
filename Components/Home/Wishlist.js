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
         item_id={item.item_name}
         item_details={item.item_details}
         category={item.category}
         setWishes ={setWishes}

         />
         
    }

    const [wishes, setWishes] = useState([]);

  
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
        setWishes(data);
      }
      

    useEffect(() => {
      fetchProducts();
    }, [category, order,search]);

    // if (loading) return <ActivityIndicator size='large' marginVertical={30} />
   

    console.log(wishes)
    console.log(category,"dfsgdfjkl")

    const renderFooter = () => {
      return (
        <View style={{ backgroundColor: 'white', padding: 10 }}>
          <Text style={{textAlign:'center'}}>You have {wishes.length} items in Wish List</Text>
        </View>
      );
    };

    const renderHeader = () => {
      return (
        <View style={{ backgroundColor: 'white', padding: 10 }}>
          <Text style={{textAlign:'center',fontWeight:'bold'}}>Your  Wish List</Text>
        </View>
      );
    };

  return (
    <View>
        <Animated.FlatList 
        // contentInset={contentInset}
        // contentOffset={contentOffset}
        contentContainerStyle={contentContainerStyle}
        bounces={false}
        scrollEventThrottle={scrollEventThrottle}
        onScroll={onScroll}
        data = {wishes}
        keyExtractor = {item => item.id}
        style={{  flexGrow:1,width: '100%' }}
        renderItem = {renderItem}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={renderHeader}
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