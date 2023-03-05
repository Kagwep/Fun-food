import React,{useEffect,useState,useLayoutEffect} from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { useNavigation , useRoute} from '@react-navigation/native';
import FruitsList from '../Components/Home/FruitsList';
import {HeaderBackButton} from "@react-navigation/elements";
import FruitsSearch from '../Components/Stand/FruitsSearch';
import FruitCatgoryList from '../Components/Categories/FruitCategoryList';
import PriceCatgoryList from '../Components/Categories/PriceCategoryList';

const NewFruitsScreen = () => {

    const route =  useRoute();
    const navigation = useNavigation();

    const [category, setCategory] = useState('');
    const [order, setOrder] = useState('');
    const [filter, setFilter] = useState({ price: '', product_name: '' });
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [priceCategory, setPriceCategory] = useState('');


    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle:'Fruits Available',
          headerLeft: () => (
            <HeaderBackButton 
              tintColor='white'
              onPress={() => navigation.goBack()}
            
            />
          )
        })
       },[])
  
  return (
    <View >
    <FruitsSearch />
    <FruitCatgoryList setCategory={setCategory}/>
    {category && (
        <>
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
        <PriceCatgoryList setPriceCategory={setPriceCategory} />
        </>
      )}
    <FruitsList
         loading={loading}
         category={category}
         order={order}
         search ={search}
         filter={filter}
         priceCategory={priceCategory}
    
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

export default NewFruitsScreen