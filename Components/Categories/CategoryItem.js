import React from 'react'
import { TouchableOpacity,Text,StyleSheet, View,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CategoryItem = ({id,name,setCategory,index}) => {
    const navigation = useNavigation();
  return (
    <View style={[style.container,index  === 0 ? {marginLeft:3,marginVertical:5} : {marginLeft:15,marginVertical:5}]}>
        <TouchableOpacity
        style={style.card}
        onPress={() => setCategory(id)}
        >
          {
          id === 1 ? <Image
              style={style.tinyLogo}
              source={
                require('./flats.png')
              }
            /> :
            id === 2 ? <Image
            style={style.tinyLogo}
            source={
              require('./softdrinks.png')
            }
            /> 
            : id === 3 ? <Image
            style={style.tinyLogo}
            source={
              require('./harddr.png')
            }
          />: 
          id == 4 ? <Image
          style={style.tinyLogo}
          source={
            require('./at.png')
          }
        /> :<Image
        style={style.tinyLogo}
        source={
          require('./potent1.png')
        }
    /> }
       <Text style={style.text}> {name}</Text>
        </TouchableOpacity>
    </View>

  );
}

const style = StyleSheet.create({

    card:{
        marginVertical:5,
        backgroundColor:'white',
        padding:5,
        alignItems:'center',
        borderRadius:10
        
        
    },
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent: "center",
        paddingHorizontal: 3,

        
      },
      tinyLogo: {
        width: 50,
        height: 50,
      },
      text:{
        textAlign:"center",
        paddingHorizontal:10,
        paddingVertical:10,
        fontWeight:'bold'
      }

});

export default CategoryItem;