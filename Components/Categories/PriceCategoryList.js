import React,{useState,useEffect} from 'react'
import { View,Text,FlatList,StyleSheet } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import PriceCategoryItem from './PriceCategorlyItem';
// import React, { useState, useEffect } from 'react';
// import { MainCategories } from '../../Data/MainCategory';

const PriceCatgoryList = ({setPriceCategory}) => {
    const renderItem = ({item,index}) => {
        return <PriceCategoryItem id={item.id} name={item.p_name} setPriceCategory={setPriceCategory} index={index} active={item.id === priceCatId} setPriceCatId={setPriceCatId}/>
    }

    const [price_categories, setPriceCategories] = useState([]);

    const [priceCatId,setPriceCatId] = useState('');
    
    useEffect(() => {
        const fetchDrinkCategories = async () => {
          const response = await fetch('https://funfood.vercel.app/api/prices_categories/');
          const data = await response.json();
          setPriceCategories(data);
        };
    
        fetchDrinkCategories();
      }, []);
    
      console.log(price_categories);

  return (
    <View style={style.ev}>
        <FlatList
        
        data = {price_categories}
        keyExtractor = {item => item.id}
        renderItem = {renderItem}
        refreshControl = {
            <RefreshControl
                refreshing={false}
                onRefresh = {() => console.log("refreshing")}
            />
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        />
        
     </View>
  )
}


const style = StyleSheet.create({
    eventlist:{
        
    },

    ev:{
        alignItems:'center',
        justifyContent:'center',
        paddingLeft:10,
    }

})

export default PriceCatgoryList;