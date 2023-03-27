import React,{useEffect,useState,useLayoutEffect} from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation , useRoute} from '@react-navigation/native';
import FoodList from '../Components/Home/FoodList';
import {HeaderBackButton} from "@react-navigation/elements";
import FoodSearch from '../Components/Stand/FoodSearch';
import { Ionicons } from '@expo/vector-icons';


const FoodScreen = () => {

    const route =  useRoute();
    const navigation = useNavigation();

    const [category, setCategory] = useState('');
    const [order, setOrder] = useState('');
    const [filter, setFilter] = useState({ price: '', product_name: '' });
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');


    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle:'Food Available',
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
    <FoodSearch setSearch={setSearch}/>
    {search && (
        <TouchableOpacity
        style={styles.catbac}
        onPress={() => {
          setSearch(null);
        }}
        
        >

          <Ionicons name="arrow-back-circle" size={24} color="black" />
          <Text style={styles.catbactext}>Back</Text>

        </TouchableOpacity>
      )}
    <FoodList
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
    catbac:{
      flexDirection:'row',
      paddingBottom:10,
      justifyContent:'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor: 'white',
      margin:5,
      borderRadius:10,
    },
    catbactext:{
      paddingTop:5
      
    },
})

export default FoodScreen