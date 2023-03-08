import React , { useState } from 'react'
import { TouchableOpacity,Text,StyleSheet, View,Image ,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeOrder } from './OrdersReducer';
import { useDispatch } from 'react-redux';

const OrderItem = ({
  id,item_details,setOrders
}) => {
    const navigation = useNavigation();
    const [color, setColor] = useState('white');
    

    const dispatch = useDispatch();

    const handlePress = () => {
      setColor(color === 'white' ? 'red' : 'white');
    };
    const deleteOrder = async () => {
      try {
          // Get the token from async storage
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    // redirect the user to the login form
    console.log('no token');

    setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
    
    dispatch(removeOrder(id));
    
   

    Alert.alert(
      item_details.name,
      'Order deleted successfully!',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed')
        }
      ],
      { cancelable: false }
    );
    
    
  } else{
      const response = await fetch(`https://funfood.vercel.app/api/orders/${id}/`, {
        method: 'DELETE',
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${token}`
        // }
      });
      if (response.ok) {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
        Alert.alert(
          item_details.name,
          'Order deleted successfully!',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed')
            }
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert('Error', 'Failed to delete order');
      }}}catch (error) {
    
        console.error(error);
      }


    }
  return (
    <View style={[style.container, style.shadowProp]}>
        <TouchableOpacity
        activeOpacity={1}
        style={[style.card,style.shadowProp]}
        onPress={() => navigation.navigate('Food', 
        {itemId:id, name:item_details.name,description:item_details.description,image:item_details.image,category:item_details.category,price:item_details.price
        })}
        >
            <View>
            <Image
              style={style.tinyLogo}
              source={{
                uri: item_details.image,
              }}
            />
              <TouchableOpacity onPress={handlePress}  style={{ position: 'absolute', top: 1, right: 1,backgroundColor:'#A7C7E7',borderRadius: 50, overflow: 'hidden', padding:2 }}>
                <Ionicons name="ios-heart" size={18} color={color} />
              </TouchableOpacity>
            </View>
            
            <View style={style.info}>
              <View style={style.des}>
              <Text style={style.text2}>ksh {item_details.price}</Text>
              <Text style={style.text}>{item_details.name}</Text>
              </View>
              <View style={style.cart}>
                <TouchableOpacity
                style={style.cas}
                onPress={deleteOrder}
                >
                  <Ionicons name="trash" size={18} color={'white'} />
          
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
        elevation: 40,
        
        
        
        
        
    },
    container: {
        flex: 1,
        // alignItems:"center",
        // justifyContent: "center",
        paddingHorizontal: 3,

        
      },
      des:{
        alignItems:'center',
        justifyContent:'center'
      },
      tinyLogo: {
        width: 100,
        height: 100,
        borderRadius:5,
      },
      text:{
        textAlign:"center",
        fontSize:18,
      }
      ,
      text1:{
        textAlign:"center",
        color:'green'
      }
      ,
      text2:{
        textAlign:"center",
        color:'red',
        fontSize:18,
      },
      text4:{
        textAlign:"center",
        color:"blue"
      },
      cas:{
        flexDirection:'row',
        backgroundColor:'rgb(255,191,0)',
        padding:15,
        borderRadius:10
      },
      cart:{
        alignItems:'center',
        justifyContent:'center',
        padding:10
      },
      info:{
        flexDirection:'row',
        paddingLeft:15,
      },
      shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },

});

export default OrderItem;