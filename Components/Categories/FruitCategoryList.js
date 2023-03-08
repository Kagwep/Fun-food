import React,{useState,useEffect} from 'react'
import { View,Text,FlatList,StyleSheet } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import FruitCategoryItem from './FruitCategoryItem';
// import React, { useState, useEffect } from 'react';
// import { MainCategories } from '../../Data/MainCategory';

const FruitCatgoryList = ({setCategory,catFruitId,setFruitCatId}) => {
    const renderItem = ({item,index}) => {
        return <FruitCategoryItem id={item.id} name={item.category_name} setCategory={setCategory} index={index} active={item.id === catFruitId} setFruitCatId = {setFruitCatId}/>
    }

    const [fruit_categories, setFruitCategories] = useState([]);

   
    useEffect(() => {
        const fetchDrinkCategories = async () => {
          const response = await fetch('https://funfood.vercel.app/api/fruit_categories/');
          const data = await response.json();
          setFruitCategories(data);
        };
    
        fetchDrinkCategories();
      }, []);
    
      console.log(fruit_categories);

  return (
    <View style={style.ev}>
        <FlatList
        
        data = {fruit_categories}
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

export default FruitCatgoryList;