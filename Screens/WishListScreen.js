import React from 'react'
import { View,Text,StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WishList from '../Components/Home/Wishlist';
// import ProfileDetails from './ProfileDetails';

const WishListScreen = () => {

  const navigation = useNavigation();
 
  return (
    <View style={style.screen}>
        <WishList /> 
        
        {/* <Button title='some Details' onPress={() => navigation.navigate('Profile',{profileId:1})}/> */}
    </View>
  )
}

const style = StyleSheet.create({

    screen:{

        padding:20,

    },

})

export default WishListScreen 