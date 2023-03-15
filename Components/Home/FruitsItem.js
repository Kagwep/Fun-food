import React , { useState } from 'react'
import { TouchableOpacity,Text,StyleSheet, View,Image,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addOrder } from './OrdersReducer';
import { useDispatch } from 'react-redux';
import { addWish } from './WishReducer';
import uuid from "uuid";
import Spinner from 'react-native-loading-spinner-overlay';

const FruitsItem = ({
  id,name,description,
  image,price,
  category
}) => {
    const navigation = useNavigation();
    const [color, setColor] = useState('white');
    const [unOrders, setUnorders] = useState([]);
    const dispatch = useDispatch();
    const[orderCount, setOrderCount]  = useState(1)
    const [loading,setLoading] = useState(false);

    const handlePress = () => {
      setColor(color === 'white' ? 'red' : 'white');
    };

    const handleSubmit = async(e) => {
      const ids = uuid();
      setLoading(true);

      const order_count = orderCount;
      const order_price = order_count*price;


      const newItem = { id,name,image, category,price };
      const order = { id:ids,item_details: {
        "category": category,
        "description": description,
        "image": image,
        "name": name,
        "price": price,
      },order_count ,order_price };
    
      setUnorders([...unOrders, newItem]);
    
      e.preventDefault();
      try {



  // Get the token from async storage
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    // redirect the user to the login form
    console.log('no token');

    dispatch(addOrder(order));
    setLoading(false);

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
    
    
  }else{

      const user = await AsyncStorage.getItem('user');
      const myUser = JSON.parse(user);

      const formData = new FormData();
    
      formData.append('item_id',id);
      formData.append('category',category);
    
      const order_count = orderCount;
      const order_price = order_count*price;
    
      formData.append('order_count',order_count);
      formData.append('order_price',order_price);
      formData.append('order_made_by',myUser.id)
    
      console.log(formData)
      const response = await fetch('https://funfood.vercel.app/api/orders/', {
        method: 'POST',
    
        body: formData,
      });
    
      // Process the response from the backend API
      if (response.ok) {
        // Form was successfully submitted
        console.log('Order was successfully submitted');
        setLoading(false);
        
    
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
      }}
    } catch (error) {
    
      // if (error.response.status === 401) {
      //   // redirect the user to the login form
      //   return navigation.navigate('Login');
      // }
      // There was an error making the request
      console.error(error);
      setLoading(false);
    }
    
    }
    
    const handleSubmitWish = async(e) => {

      const ids = uuid();
    
    
      const newItem = { id, category };
      const wish = { id:ids,item_details: {
        "category": category,
        "description": description,
        "image": image,
        "name": name,
        "price": price,
      } };
    
    
      e.preventDefault();
      try {
        
        const token = await AsyncStorage.getItem('token');
          
        if (!token) {
          // redirect the user to the login form
          console.log('no token');
      
          dispatch(addWish(wish));
          setColor(color === 'white' ? 'red' : 'white');
          
          
        } else {

      const user = await AsyncStorage.getItem('user');
      const myUser = JSON.parse(user);

      const formData = new FormData();
    
      formData.append('item_id',id);
      formData.append('category',category);
      formData.append('user',myUser.id);
    
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
      }}
    } catch (error) {
    
      // if (error.response.status === 401) {
      //   // redirect the user to the login form
      //   return navigation.navigate('Login');
      // }
      // There was an error making the request
      console.error(error);
    }
    
    }

    const addOrderCount = () =>{
      const current = orderCount;
      const newCurrent = current + 1 ;

      setOrderCount(newCurrent)

    }

    const removeOrderCount = () =>{

      const current = orderCount;

      if (current > 1){
        const newCurrent = current - 1 ;
        setOrderCount(newCurrent)
      }
      

      
      
    }

  return (
    <View style={style.container}>
            {loading ? ( 
      <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={'Adding order...'}
          //Text style of the Spinner Text
          textStyle={style.spinnerTextStyle}
        />):(
          <></>
        )}
        <TouchableOpacity
        activeOpacity={1}
        style={style.card}
        onPress={() => navigation.navigate('Food', 
        {id, name,description,image,category,price
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
              <Text style={style.text}>{name}</Text>
              <Text style={style.text2}>ksh {price}</Text>
              </View>
              <View style={style.ico}>
              <View style={style.car}>
                
                <TouchableOpacity
                style={style.ca}
                onPress={addOrderCount}
                >
                  <Ionicons name="add-circle" size={22} color={'white'} />
                  
                </TouchableOpacity>
                <Text style={style.x}>{orderCount}</Text>
                <TouchableOpacity
                style={style.ca}
                onPress={removeOrderCount}
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
      spinnerTextStyle: {
        color: '#FFF',
      },


});

export default FruitsItem;