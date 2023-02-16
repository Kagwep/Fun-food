import React , { useState } from 'react'
import { TouchableOpacity,Text,StyleSheet, View,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const DrinkItem = ({
  id,drink_name,drink_description,
  drink_image,drink_price,
  drink_category
}) => {
    const navigation = useNavigation();
    const [color, setColor] = useState('white');

    const handlePress = () => {
      setColor(color === 'white' ? 'red' : 'white');
    };
  return (
    <View style={style.container}>
        <TouchableOpacity
        activeOpacity={1}
        style={style.card}
        onPress={() => navigation.navigate('Product', 
        {drinkId:id, drink_name,drink_description,drink_image,drink_category,drink_price
        })}
        >
            <View>
            <Image
              style={style.tinyLogo}
              source={{
                uri: drink_image,
              }}
            />
              <TouchableOpacity onPress={handlePress}  style={{ position: 'absolute', top: 1, right: 1,backgroundColor:'#A7C7E7',borderRadius: 50, overflow: 'hidden', padding:2 }}>
                <Ionicons name="ios-heart" size={18} color={color} />
              </TouchableOpacity>
            </View>
            <View>
            <Text style={style.text2}>ksh {drink_price}</Text>
            <Text style={style.text}>{drink_name}</Text>
            <View>
              <TouchableOpacity>
                <Text style={{textAlign:"center"}}> Add to Cart</Text>
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
        
        
        
    },
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent: "center",
        paddingHorizontal: 3,

        
      },
      tinyLogo: {
        width: 150,
        height: 150,
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
      }

});

export default DrinkItem;