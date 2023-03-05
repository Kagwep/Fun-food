import React,{useEffect,useState,useLayoutEffect} from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation , useRoute} from '@react-navigation/native';
import DrinkList from '../Components/Home/DrinksList';
import {HeaderBackButton} from "@react-navigation/elements";
import DrinksSearch from '../Components/Stand/DrinksSearch';
import DrinkCatgoryList from '../Components/Categories/DrinkCategoryList';
import { Ionicons } from '@expo/vector-icons';


const DrinkScreen = () => {

    const route =  useRoute();
    const navigation = useNavigation();

    const [category, setCategory] = useState('');
    const [order, setOrder] = useState('');
    const [filter, setFilter] = useState({ price: '', product_name: '' });
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');


    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle:'Drinks Available',
          headerLeft: () => (
            <HeaderBackButton 
              tintColor='white'
              onPress={() => navigation.goBack()}
            
            />
          )
        })
       },[])
  
  return (
    <View style={styles.screen}>
    <DrinksSearch setSearch={setSearch}/>
    <DrinkCatgoryList setCategory={setCategory}/>
    {category && (
        <TouchableOpacity
        style={styles.catbac}
        onPress={() => {
          setCategory(null);
          setSearch(null);
        }}
        
        >

          <Ionicons name="arrow-back-circle" size={24} color="black" />
          <Text style={styles.catbactext}>Back to All Categories</Text>

        </TouchableOpacity>
      )}
    <DrinkList
         loading={loading}
         category={category}
         order={order}
         search ={search}
         filter={filter}
         setSearch={setSearch}
    
    />
    
    {/* <Button title='some Details' onPress={() => navigation.navigate('Profile',{profileId:1})}/> */}
   </View>
  )
}


const styles = StyleSheet.create({
    screen:{
      flex:1
    },
    catbac:{
      flexDirection:'row',
      paddingBottom:10,
      marginLeft:20
    },
    catbactext:{
      paddingTop:5
      
    },
})

export default DrinkScreen