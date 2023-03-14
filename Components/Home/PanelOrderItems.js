import React , { useState } from 'react'
import { TouchableOpacity,Text,StyleSheet, View,Image ,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeOrder } from './OrdersReducer';
import { useDispatch } from 'react-redux';

const PanelOrderedItem = ({
  id,item_details,setOrders,order_amount, order_price
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
        {id, name:item_details.name,description:item_details.description,image:item_details.image,category:item_details.category,price:item_details.price
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
              <Text style={style.text2}>Quantity: {order_amount}</Text>
              <Text style={style.price}>{order_amount} x {item_details.price} = {order_price}</Text>
              <Text style={style.text}>{item_details.name}</Text>
              </View>
              {/* <View style={style.cart}>
                <TouchableOpacity
                style={style.cas}
                onPress={deleteOrder}
                >
                  <Ionicons name="trash" size={18} color={'white'} />
          
                </TouchableOpacity>
              </View> */}
            </View>

            


        </TouchableOpacity>
    </View>

  );
}

const style = StyleSheet.create({

    container: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 2,
      },
      card: {
        flexDirection: 'row',
      },
      imageContainer: {
        position: 'relative',
      },
      image: {
        width: 80,
        height: 80,
      },
      heartIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: '#f00',
        borderRadius: 50,
        overflow: 'hidden',
        padding: 8,
      },
      heartIconColor: {
        color: '#fff',
      },
      info: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 8,
      },
      description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
      },
      price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f00',
      },
      tinyLogo: {
        width: 80,
        height: 80,
        marginRight: 10,
      },

});

export default PanelOrderedItem;