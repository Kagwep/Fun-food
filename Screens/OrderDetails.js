import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { View,Text,StyleSheet } from 'react-native'
import {HeaderBackButton} from "@react-navigation/elements"


const OrdersDetails = () => {
   const route =  useRoute();
   const navigation = useNavigation();

   const {profileId} = route.params;
   useLayoutEffect(() => {
    navigation.setOptions({
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
        <Text> profile {profileId}</Text>
    </View>
  )
}

const style = StyleSheet.create({

    screen:{

        padding:20,

    },

})

export default OrdersDetails;