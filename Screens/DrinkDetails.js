import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { View,Text,StyleSheet,Image,Button,ScrollView,TouchableOpacity,Dimensions} from 'react-native'
import {HeaderBackButton} from "@react-navigation/elements";
import { useState } from 'react';
// import ProductImagesList from '../Components/Home/ProductImagesList';
// import RatingsList from '../Components/Home/RatingsList';

const deviceWidth = Dimensions.get('window').width;


const DrinkDetails = () => {
   const route =  useRoute();
   const navigation = useNavigation();
   const [Result, SetResult] = useState('');

   const {drinkId, name,description,image,price} = route.params;
   useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:{category},
      headerLeft: () => (
        <HeaderBackButton 
          tintColor='white'
          onPress={() => navigation.goBack()}
        
        />
      )
    })
   },[])
//    const p = parseInt(price)-parseInt(product_discount);
   
  return (
    <ScrollView>
          <View style={style.screen}>
            <View style={{backgroundColor:'white'}}>
              <Image 
              style={style.tinyLogo}
              source={{uri: image}}
              />
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
              </View>
              {/* <ProductImagesList selectedProduct={productId}/> */}
              </View>
 
              <View style={style.btn}>
                <TouchableOpacity
                >
                  <Text style={{textAlign:'center',fontWeight:'bold',padding:5}}> Add To Cart </Text> 
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

    screen:{

        paddingTop:5,
        textAlign:"center",
        marginBottom:10,
        marginHorizontal:10,


    },
    tinyLogo: {
      width: deviceWidth,
      maxWidth:"100%",
      height: deviceWidth,
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
        backgroundColor:"#eeff"
      },
      pdet:{
        backgroundColor:"#ffff",
        borderBottomEndRadius:10,
        borderBottomStartRadius:10,
      },
      pdes:{
        textAlign:'center'
      },
      pricedes:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#efff'
      },
      btn:{
        backgroundColor:"#ffff",
        paddingTop:5,
        paddingBottom:5,
        flexDirection:'row',
        justifyContent:'flex-end'
      },
      review:{
        marginTop:10
      },
      rev:{
        backgroundColor:'green',
        margin:2,
      },
      fla:{
        backgroundColor:'red',
        margin:2,
      }
    

})

export default DrinkDetails;