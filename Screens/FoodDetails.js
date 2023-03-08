import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { View,Text,StyleSheet,Image,Button,ScrollView,TouchableOpacity,Dimensions} from 'react-native'
import {HeaderBackButton} from "@react-navigation/elements";
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const deviceWidth = Dimensions.get('window').width;


const FoodDetails = () => {
   const route =  useRoute();
   const navigation = useNavigation();
   const [Result, SetResult] = useState('');

   const {itemId, name,description,image,price} = route.params;
   useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:'Item Details',
      headerLeft: () => (
        <HeaderBackButton 
          tintColor='white'
          onPress={() => navigation.goBack()}
        
        />
      )
    })
   },[])
  //  const p = parseInt(price)-parseInt(product_discount);
  const [color, setColor] = useState('white');

  const handlePress = () => {
    setColor(color === 'white' ? 'red' : 'white');
  };
  const handlePress1 = () => {
    setColor(color === 'orange');
  };
  return (
    <ScrollView style={style.cont}>
          <View style={style.screen}>
            <View style={{backgroundColor:'white'}}>
              <Image 
              style={style.tinyLogo}
              source={{uri: image}}
              />
              <TouchableOpacity onPress={handlePress}  style={{ position: 'absolute', top: 7, right: 1,backgroundColor:'#A7C7E7',borderRadius: 50, overflow: 'hidden', padding:2 }}>
                <Ionicons name="ios-heart" size={22} color={color} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePress1}  style={{ position: 'absolute', bottom: 7, left: 7,backgroundColor:'#A7C7E7',borderRadius: 50, overflow: 'hidden', padding:2,flexDirection:'row' }}>
                <Ionicons name="star" size={22} color={'orange'} />
                <Text> 4.6 </Text>
              </TouchableOpacity>
              </View>
              <View style={style.pdetails}>
                <View style ={style.pdet}>
                  <View>
                    <Text style={style.text1}> {name}</Text>
                    <Text style ={style.pdes}> {description}</Text>
                  </View>
                    <View style={style.pricedes}>
                    {/* <Text style={style.np}>ksh {price-product_discount} </Text> */}
                    {/* <Text style={style.text3}> {(((product_discount)/price)*100).toFixed(2)} % Discount</Text> */}
                    <Text style={style.p}>ksh {price}</Text>
                    </View>
                    {/* <View style={{flexDirection:'row',justifyContent:"space-around"}}>
                      <Text style={{color:'red'}}>{product_stock_alert}</Text>
                      <Text style={{textAlign:'center'}}> {product_availability}</Text>
                    </View> */}
                    <View style={style.pri}>
                      <Text style={style.pr}>ksh {price}</Text>
                    </View>
              </View>
              
              {/* <ProductImagesList selectedProduct={productId}/> */}
              </View>
 
              <View style={style.btn}>
              
              <TouchableOpacity
               style={style.order}
              >
                <Ionicons name="basket" size={22} color={'white'} />
                <Text style={style.ordertext}> Add To Order</Text>
               </TouchableOpacity>

                {/* <TouchableOpacity
                style={style.rev}
                >
                  <Text style={{textAlign:'center',fontWeight:'bold',padding:5,color:'#fff'}}> Write review</Text> 
                </TouchableOpacity>

                <TouchableOpacity
                style={style.fla}
                >
                  <Text style={{textAlign:'center',fontWeight:'bold',padding:5,color:'#fff'}}> Flag Seller </Text> 
                </TouchableOpacity> */}
              
              </View>
               {/* <View style={style.review}>
                <Text style={{textAlign:'center',color:"green",fontWeight:'bold',backgroundColor:'#D4D0D2',fontSize:18,marginBottom:5}}> Reviews </Text>
                 <View>
                  <RatingsList selectedProduct={productId} />
                 </View>
               </View> */}

          </View>

         
    </ScrollView>
  )
}

const style = StyleSheet.create({

  cont:{
    backgroundColor:'rgb(255, 255, 255)',
  },

    screen:{

       
        textAlign:"center",
        marginBottom:10,
        marginHorizontal:10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,

    },
    tinyLogo: {
      width: deviceWidth,
      maxWidth:"100%",
      height: deviceWidth,
      margin:5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 0,
      borderRadius:10
    },
    text1:{
      textAlign:"center",
      fontSize:20,
      fontWeight:"bold",
      padding:10,
      color:"green"
    },
    text3:{

      color:'orange',
      padding:3,
      textAlign:'center',

      },
      p:{
        textDecorationLine: 'line-through',
        padding:3,
        textAlign:'center'
      },
      np:{
        color:'green',
        padding:3,
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center',
        

      },
      prod:{
        flex:1,
        flexDirection:'row',
        height:30,
        
      },
      pdetails:{
        backgroundColor:'rgb(255,255,255)',
        zIndex:2, 
      },
      pdet:{
        backgroundColor:"white",
        paddingTop:10,
        marginHorizontal:5,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        zIndex:10,
        marginBottom:10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,

      },
      pdes:{
        textAlign:'center',
        padding:5,
      },
      pricedes:{
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        backgroundColor:'rgb(224,224,224)',
        padding:5,
       
      },
      btn:{
        backgroundColor:"#ffff",
        padding:10,
        marginHorizontal:5,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
      },
      review:{
        marginTop:10
      },
      rev:{
        backgroundColor:'#eefeff',
        margin:2,
      },
      fla:{
        backgroundColor:'red',
        margin:2,
      },
      pri:{
        alignItems:'flex-end',
        justifyContent:'flex-end',
        padding:10,

      },
      pr:{
        color:'rgb(255, 172, 28)',
        fontSize:18,
        fontWeight:'bold',
      },
      order:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',

        padding:10,
        backgroundColor:'rgb(255, 172, 28)',
        borderRadius:10,
      },
      ordertext:{
        textAlign:'center',
        fontWeight:'bold',
      },

    

})

export default FoodDetails;