import React,{useEffect,useState,useLayoutEffect} from 'react'
import { View,Text,StyleSheet, Button ,Alert} from 'react-native';
import WishList from '../Components/Home/Wishlist';
// import ProfileDetails from './ProfileDetails';
import { useNavigation , useRoute} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

     useEffect(() => {
      const checkLoggedIn = async () => {
        const token = await AsyncStorage.getItem('token');
  
        if (!token) {
          Alert.alert(
            'Not logged in',
            'Please log in to access your saved orders and continue your shopping experience.',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              {
                text: 'Log in',
                onPress: () => navigation.navigate('Login')
              }
            ]
          );
        }
      };
  
      checkLoggedIn();
    }, []);


  //     // Check if the user is logged in
  // const checkLoggedIn = async () => {
  //   // Get the token from AsyncStorage
  //   const token = await AsyncStorage.getItem('token');

  //   if (token) {
  //     // Make a request to the backend to get the user's information
  //     const response = await fetch('https://yourbackend.com/api/user/', {
  //       headers: {
  //         Authorization: `Token ${token}`
  //       }
  //     });

  //     if (response.ok) {
  //       // User is logged in
  //       const user = await response.json();
  //       return user;
  //     } else {
  //       // User is not logged in
  //       return null;
  //     }
  //   } else {
  //     // User is not logged in
  //     return null;
  //   }
  // };
 
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