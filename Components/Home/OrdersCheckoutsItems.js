import React , { useState } from 'react'
import { TouchableOpacity,Text,StyleSheet, View,Image,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addOrder } from './OrdersReducer';
import { useDispatch } from 'react-redux';
import { addWish } from './WishReducer';
import uuid from "uuid";

const OrderCheckoutsItem= ({
    id,
    orderer,
    ordered_items ,
    order_total_price,
    order_placed_at,
    latitide ,
    longitude ,
    order_status ,
}) => {
    const navigation = useNavigation();


  return (
    <View style={style.container}>
        <TouchableOpacity
        activeOpacity={1}
        style={style.card}
        // onPress={() => navigation.navigate('Food', 
        // {itemId:id, name,description,image,category,price
        // })}
        >
            {/* <View>
            <Image
              style={style.tinyLogo}
              source={{
                uri: image,
              }}
            />
              <TouchableOpacity onPress={handleSubmitWish}  style={{ position: 'absolute', top: 1, right: 1,backgroundColor:'#A7C7E7',borderRadius: 50, overflow: 'hidden', padding:2 }}>
                <Ionicons name="ios-heart" size={18} color={color} />
              </TouchableOpacity>
            </View> */}
            
            <View style={style.info}>
              <View style={style.des}>
              <Text style={style.text}>Order Number: {id}</Text>
              <Text style={style.text2}>items:{ordered_items}</Text>
              <Text style={style.text}>Order Number: {orderer}</Text>
              <Text style={style.text}>{order_status}</Text>
              <Text style={style.text}>{order_total_price}</Text>
              </View>
              <View style={style.ico}>
              </View>
            </View>

            


        </TouchableOpacity>
    </View>

  );
}

const style = StyleSheet.create({

    card:{
        marginVertical:5,
        backgroundColor:'white',
        borderRadius:5,
        flexDirection:'row',
        
        
        
        
    },
    container: {
        flex: 1,
        // alignItems:"center",
        // justifyContent: "center",
        paddingHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        backgroundColor:'white',
        borderRadius:10
        

        
      },
      des:{
        // alignItems:'center',
        // justifyContent:'center'
      },
      tinyLogo: {
        width: 100,
        height: 100,
        borderRadius:5,
      },
      text:{
        paddingLeft:5,
        fontSize:16,
        fontWeight:'bold'
      }
      ,
      text1:{
        textAlign:"center",
        color:'green'
      }
      ,
      text2:{
        paddingLeft:5,
        color:'red',
        fontSize:16,
      },
      text4:{
        textAlign:"center",
        color:"blue"
      },
      cas:{
        flexDirection:'row',
        backgroundColor:'rgb(255,191,0)',
        padding:5,
        borderRadius:10
      },
      cart:{
        padding:5
      },
      info:{
        flexDirection:'column',
        paddingLeft:5,
      },
      ca:{

        flexDirection:'row',
        backgroundColor:'rgb(255,191,0)',
        padding:5,
        borderRadius:10,
        marginHorizontal:10

      },
      car:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding:5,
        
      },
      x:{
        fontSize:18,
        fontWeight:'300',
        padding:3,
        
        
      },
      ico:{
        
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        
      },


});

export default OrderCheckoutsItem;