import React from 'react';
import { View,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  return (
    <View style={style.screen}>
    <Text> Home Screen</Text>
    
    {/* <Button title='some Details' onPress={() => navigation.navigate('Profile',{profileId:1})}/> */}
   </View>
  )
}

export default ProfileScreen