import React from 'react'
import { View,Text,FlatList,StyleSheet } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { Banners } from '../../Data/dummy';
import BannerItem from './BannerItem';


const BannersList = ({selectedMarket}) => {
    const renderItem = ({item}) => {
        return <BannerItem
         id={item.id}
         image={item.image}
         />
         
    }

 

  return (
    <View style={style.eventlist}>
        <FlatList
        
        data = {Banners }
        keyExtractor = {item => item.id}
        renderItem = {renderItem}
        refreshControl = {
            <RefreshControl
                refreshing={false}
                onRefresh = {() => console.log("refreshing")}
            />
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        />
     </View>
  )
}


const style = StyleSheet.create({
    eventlist:{
        borderRadius:10,
    },

})

export default BannersList;