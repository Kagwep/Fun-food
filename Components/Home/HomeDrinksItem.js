import React , { useState } from 'react'
import { TouchableOpacity,Text,StyleSheet, View,Image,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const HomeDrinksItem = ({
  id,name,description,
  image,price,
  category
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

  formData.append('item_id',id);
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



  e.preventDefault();
  try {
  const formData = new FormData();

  formData.append('item_id',id);
  formData.append('category',category);

  const response = await fetch('http://192.168.43.4:8000/api/wishlist/', {
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
        onPress={() => navigation.navigate('Food', 
        {itemId:id, name,description,image,category,price
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
              {/* <Text style={style.text}>{name}</Text> */}
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
      backgroundColor:'green'
        
        
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
        position: 'absolute',
        bottom: 1, 
        right: 20,
        fontSize:16,
        color:'#ffffff',
        fontWeight:'bold',
        backgroundColor:'#C0C0C0',
        borderRadius:5,
        padding:2,
        
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
      des:{
        alignItems:'center',
        justifyContent:'center'
      },

});

export default HomeDrinksItem;