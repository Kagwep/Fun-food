import React , { useState } from 'react'
import { TouchableOpacity,Text,StyleSheet, View,Image,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrinkItem = ({
  id,name,description,
  image,price,
  drink_category,category
}) => {
    const navigation = useNavigation();
    const [color, setColor] = useState('white');
    const [unOrders, setUnorders] = useState([]);

    const handlePress = () => {
      setColor(color === 'white' ? 'red' : 'white');
    };
    const handleSubmit = async(e) => {

      const newItem = { id,name,image, category,price };
    
      setUnorders([...unOrders, newItem]);

    
      e.preventDefault();
      try {

     // Get the token from async storage
      const token = await AsyncStorage.getItem('token');
  
      if (!token) {
        // redirect the user to the login form
        console.log('no token');
        
      }
      
      const formData = new FormData();
    
      formData.append('item_id',id);
      formData.append('category',category);
    
      const delivery_location = 'Nakuru';
      const order_quantity = 2;
    
      formData.append('order_quantity',order_quantity);
      formData.append('delivery_location',delivery_location);
    
      console.log(formData)
      const response = await fetch('https://funfood.vercel.app/api/orders/', {
        method: 'POST',
    
        body: formData,
      });
    
      // Process the response from the backend API
      if (response.ok) {
        // Form was successfully submitted
        console.log('Order was successfully submitted');
        
    
        // ...
    
        Alert.alert(
          name,
          'Order placed successfully!',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed')
            }
          ],
          { cancelable: false }
        );
    
      } else {
        // There was an error with the request
        console.log('Error:', response.statusText);
      }
    } catch (error) {
    
      // if (error.response.status === 401) {
      //   // redirect the user to the login form
      //   return navigation.navigate('Login');
      // }
      // There was an error making the request
      console.error(error);
    }
    
    }
    
    const handleSubmitWish = async(e) => {
    
    
      const newItem = { id, category };
    
    
      e.preventDefault();

      try {
              // Get the token from async storage
      const token = await AsyncStorage.getItem('token');
  
      if (!token) {
        // redirect the user to the login form
        console.log('no token');

      }

      const formData = new FormData();
    
      formData.append('item_id',id);
      formData.append('category',category);
    
      const response = await fetch('https://funfood.vercel.app/api/wishlist/', {
        method: 'POST',
    
        body: formData,
      });
    
      // Process the response from the backend API
      if (response.ok) {
        // Form was successfully submitted
        console.log('item added to wishlist successfully');
        setColor(color === 'white' ? 'red' : 'white');
        
    
      } else {
        // There was an error with the request
        console.log('Error:', response.statusText);
      }
    } catch (error) {
    
      // if (error.response.status === 401) {
      //   // redirect the user to the login form
      //   return navigation.navigate('Login');
      // }
      // There was an error making the request
      console.error(error);
    }
    
    }
  return (
    <View style={style.container}>
        <TouchableOpacity
        activeOpacity={1}
        style={style.card}
        onPress={() => navigation.navigate('Drink', 
        {drinkId:id, name,description,image,drink_category,price,category
        })}
        >
            <View>
            <Image
              style={style.tinyLogo}
              source={{
                uri: image,
              }}
            />
              <TouchableOpacity onPress={handleSubmitWish}  style={{ position: 'absolute', top: 1, right: 1,backgroundColor:'#A7C7E7',borderRadius: 50, overflow: 'hidden', padding:2 }}>
                <Ionicons name="ios-heart" size={18} color={color} />
              </TouchableOpacity>
            </View>
            <View style={style.info}>
              <View style={style.des}>
            <Text style={style.text2}>ksh {price}</Text>
            <Text style={style.text}>{name}</Text>
            </View>
            <View style={style.car}>
                <TouchableOpacity
                style={style.ca}
                >
                  <Ionicons name="add-circle" size={22} color={'white'} />
                  
                </TouchableOpacity>
                <Text style={style.x}>1</Text>
                <TouchableOpacity
                style={style.ca}
                >
                  <Ionicons name="remove-circle" size={22} color={'white'} />
                  
                </TouchableOpacity>
            </View>
            <View style={style.cart}>
                <TouchableOpacity
                style={style.cas}
                onPress={handleSubmit}
                >
                  <Ionicons name="add" size={18} color={'white'} />
                  <Text style={{textAlign:"center",fontSize:14,fontWeight:'400'}}> Add to Order</Text>
                </TouchableOpacity>
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
        alignItems:"center",
        justifyContent: "center",
        paddingHorizontal: 3,

        
      },
      tinyLogo: {
        width: 100,
        height: 100,
        borderRadius:5,
      },
      text:{
        textAlign:"center",
      }
      ,
      text1:{
        textAlign:"center",
        color:'green'
      }
      ,
      text2:{
        textAlign:"center",
        color:'red'
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
        alignItems:'center',
        justifyContent:'center',
        padding:5
      },
      info:{
        flexDirection:'row',
        paddingLeft:7,
      },
      des:{
        alignItems:'center',
        justifyContent:'center'
      },
      ca:{

        flexDirection:'row',
        backgroundColor:'rgb(255,191,0)',
        padding:5,
        borderRadius:10

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
        
        
      }

});

export default DrinkItem;