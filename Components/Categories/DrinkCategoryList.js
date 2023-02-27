import React,{useState,useEffect} from 'react'
import { View,Text,FlatList,StyleSheet } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import DrinkCategoryItem from './DrinkCategoryItem';
// import React, { useState, useEffect } from 'react';
// import { MainCategories } from '../../Data/MainCategory';

const DrinkCatgoryList = ({setCategory}) => {
    const renderItem = ({item,index}) => {
        return <DrinkCategoryItem id={item.id} name={item.drink_name} setCategory={setCategory} index={index} active={item.id === catId} handlePress = {() => setCatId(item.id)}/>
    }

    const [drink_categories, setDrinkCategories] = useState([]);

    const [catId,setCatId] = useState(1);
    
    useEffect(() => {
        const fetchDrinkCategories = async () => {
          const response = await fetch('https://funfood.vercel.app/api/drink_categories/');
          const data = await response.json();
          setDrinkCategories(data);
        };
    
        fetchDrinkCategories();
      }, []);
    
      console.log(drink_categories);

  return (
    <View style={style.ev}>
        <FlatList
        
        data = {drink_categories}
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

export default DrinkCatgoryList;