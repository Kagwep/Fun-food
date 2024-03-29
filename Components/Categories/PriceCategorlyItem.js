import React from 'react'
import { TouchableOpacity,Text,StyleSheet, View,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PriceCategoryItem = ({id,name,setPriceCategory,index,setPriceCatId,active}) => {
    const navigation = useNavigation();
  return (
    <View style={[style.container,index  === 0 ? {marginLeft:3,marginVertical:5} : {marginLeft:15,marginVertical:5,alignItems:'center',justifyContent:'center'}]}>
        <TouchableOpacity
        style={[style.card,active ? {backgroundColor:"#8BC34A"} : {backgroundColor:"white"}]}
        onPress={() => {
          setPriceCategory(id);
          setPriceCatId(id);
        }}
        
        // onPress={() => navigation.navigate(name)}

        >
        {/* <Image
              style={style.tinyLogo}
              source={image}
            /> */}
       <Text style={style.text}> {name}</Text>
        </TouchableOpacity>
    </View>

  );
}

const style = StyleSheet.create({

    card:{
        marginVertical:5,
        backgroundColor:'white',
        alignItems:'center',
        borderRadius:10,
      
        
        
    },
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent: "center",
        paddingHorizontal: 3,

        
      },
      tinyLogo: {
        width: 80,
        height: 80,
      },
      text:{
        textAlign:"center",
        paddingHorizontal:10,
        paddingVertical:10,
        fontWeight:'bold'
      }

});

export default PriceCategoryItem;