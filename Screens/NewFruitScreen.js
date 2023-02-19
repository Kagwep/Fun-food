import React,{useEffect,useState,useLayoutEffect} from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { useNavigation , useRoute} from '@react-navigation/native';
import FruitsList from '../Components/Home/FruitsList';
import {HeaderBackButton} from "@react-navigation/elements";
import FruitsSearch from '../Components/Stand/FruitsSearch';


const NewFruitsScreen = () => {

    const route =  useRoute();
    const navigation = useNavigation();

    const [category, setCategory] = useState('');
    const [order, setOrder] = useState('');
    const [filter, setFilter] = useState({ price: '', product_name: '' });
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');


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
    <FruitsList
         loading={loading}
         category={category}
         order={order}
         search ={search}
         filter={filter}
    
    />
    
    {/* <Button title='some Details' onPress={() => navigation.navigate('Profile',{profileId:1})}/> */}
   </View>
  )
}


const styles = StyleSheet.create({
    screen:{

    },
})

export default NewFruitsScreen