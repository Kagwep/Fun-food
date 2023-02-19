import React , { useState } from 'react'
import { TouchableOpacity,Text,StyleSheet, View,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const FruitsItem = ({
  id,name,description,
  image,price,
  category
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
        onPress={() => navigation.navigate('Fruit', 
        {fruitId:id, name,description,image,category,price
        })}
        >
            <View>
            <Image
              style={style.tinyLogo}
              source={{
                uri: image,
              }}
            />
              <TouchableOpacity onPress={handlePress}  style={{ position: 'absolute', top: 1, right: 1,backgroundColor:'#A7C7E7',borderRadius: 50, overflow: 'hidden', padding:2 }}>
                <Ionicons name="ios-heart" size={18} color={color} />
              </TouchableOpacity>
            </View>
            
            <View style={style.info}>
              <View style={style.des}>
              <Text style={style.text2}>ksh {price}</Text>
              <Text style={style.text}>{name}</Text>
              </View>
              <View style={style.cart}>
                <TouchableOpacity
                style={style.cas}
                >
                  <Ionicons name="add" size={18} color={'white'} />
                  <Text style={{textAlign:"center",fontSize:18,fontWeight:'400'}}> Add to Order</Text>
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

});

export default FruitsItem;