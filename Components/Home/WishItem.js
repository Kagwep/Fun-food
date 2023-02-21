import React , { useState } from 'react'
import { TouchableOpacity,Text,StyleSheet, View,Image,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const WishItem = ({
  id,item_details,item_id,setWishes,category
}) => {
    const navigation = useNavigation();
    const [color, setColor] = useState('white');

    const handlePress = () => {
      setColor(color === 'white' ? 'red' : 'white');
    };

    const handleSubmit = async(e) => {

      e.preventDefault();
      try {
      const formData = new FormData();
    
      formData.append('item_id',item_details.id);
      formData.append('category',category);
    
      const delivery_location = 'Nakuru';
      const order_quantity = 2;
    
      formData.append('order_quantity',order_quantity);
      formData.append('delivery_location',delivery_location);

      console.log(formData)
    
    
      const response = await fetch('http://192.168.43.4:8000/api/orders/', {
        method: 'POST',
    
        body: formData,
      });
    
      // Process the response from the backend API
      if (response.ok) {
        // Form was successfully submitted
        console.log('Order was successfully submitted');
        
    
        // ...
    
        Alert.alert(
          item_details.name,
          'Order added successfully!',
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

    const deleteWish = async () => {
      const response = await fetch(`http://192.168.43.4:8000/api/wishlist/${id}/`, {
        method: 'DELETE',
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${token}`
        // }
      });
      if (response.ok) {
        setWishes(prevOrders => prevOrders.filter(wishes => wishes.id !== id));
        Alert.alert(
          item_details.name,
          'Wish deleted successfully!',
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
      }
    }
  return (
    <View style={style.container}>
        <TouchableOpacity
        activeOpacity={1}
        style={style.card}
        onPress={() => navigation.navigate('Fruit', 
        {fruitId:id, item_id,item_details
        })}
        >
            <View>
            <Image
              style={style.tinyLogo}
              source={{
                uri: item_details.image,
              }}
            />
            </View>
            
            <View style={style.info}>
              <View style={style.des}>
              <Text style={style.text2}>ksh {item_details.price}</Text>
              <Text style={style.text}>{item_details.name}</Text>
              </View>
              <View style={style.cart}>
                <TouchableOpacity
                style={style.cas}
                onPress={handleSubmit}
                >
                  <Ionicons name="add-circle" size={18} color={'white'} />
                  <Text style={{textAlign:"center",fontSize:12,fontWeight:'400'}}> Add to Order</Text>
                </TouchableOpacity>
              </View>
              <View style={style.cart}>
                <TouchableOpacity
                style={style.cas}
                onPress={deleteWish} 
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
        elevation:20,
        
        
        
        
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
        fontSize:13,
        fontWeight:'bold',
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
        fontSize:14,
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
        paddingLeft:15,
      },

});

export default WishItem;