import React,{useEffect,useState,useLayoutEffect} from 'react'
import { View,Text,StyleSheet, Button } from 'react-native';
import WishList from '../Components/Home/Wishlist';
// import ProfileDetails from './ProfileDetails';
import { useNavigation , useRoute} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const WishListScreen = () => {

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
    <View style={style.screen}>
        <WishList 
        
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

const style = StyleSheet.create({

    screen:{

        padding:20,
        flex:1,

    },

})

export default WishListScreen 