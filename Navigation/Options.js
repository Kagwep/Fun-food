import { Ionicons } from '@expo/vector-icons'
import React from 'react';
import { Text,TouchableOpacity,Image,StyleSheet } from 'react-native';


export const NavOptions = (nav) => {
  return {
    headerTintColor: '#ffffff',
    headerStyle:{
        backgroundColor:'#FFC000',
    },
    headerLeft: () =>(
        // <Ionicons name = 'person-circle' style={{paddingLeft:5}} size={32} color="white" onPress={() => nav.toggleDrawer()}/>
        <TouchableOpacity
        onPress={() => nav.toggleDrawer()}
        style={styles.headertext}
        >
        <Image
              style={styles.tinyLogo}
              source={
                require('../Screens/funfood.png')
              }
            />
        </TouchableOpacity>
    ),
    // headerLeft:() => {
    //     <Text style={{color:'white',fontSize:20,paddingLeft:5}}>logo</Text>
    // }
}
}


const styles = StyleSheet.create(
    {
        tinyLogo: {
            width: 30,
            height: 30,
          },  
          headertext:{
            paddingLeft:10
          },
    }
)