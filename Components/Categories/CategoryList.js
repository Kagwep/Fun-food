import React,{useState,useEffect} from 'react'
import { View,Text,FlatList,StyleSheet } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import CategoryItem from './CategoryItem';
// import React, { useState, useEffect } from 'react';

const CatgoryList = ({setCategory}) => {
    const renderItem = ({item,index}) => {
        return <CategoryItem id={item.id} name={item.name} setCategory={setCategory} index={index} active={item.id === catId} handlePress = {() => setCatId(item.id)}/>
    }

    const [categories, setCategories] = useState([]);
    const [catId,setCatId] = useState(1);

    useEffect(() => {
        const fetchCategories = async () => {
          const response = await fetch('http://192.168.43.4:8000/api/categories/');
          const data = await response.json();
          setCategories(data);
        };
    
        fetchCategories();
      }, []);
    
      console.log(categories);

  return (
    <View>
        <FlatList
        
        data = {categories}
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
        padding:0,
    },

})

export default CatgoryList;