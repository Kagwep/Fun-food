import React,{useEffect,useState} from 'react'
import { TouchableOpacity,Text,StyleSheet, View,Image, Dimensions  } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const BannerItem = ({
  id,image
}) => {
    const navigation = useNavigation();

    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const updateScreenWidth = () => {
          setScreenWidth(Dimensions.get('window').width);
        };
    
        dimensionsHandler =Dimensions.addEventListener('change', updateScreenWidth);
    
        return () => {
          dimensionsHandler.remove()
        };
      }, []);

      
  return (
    <View style={[style.container,{ width: screenWidth } ]}>
        <TouchableOpacity
        style={style.card}
        >
        <Image style={{ width: screenWidth - 20, height: 130,padding:10 }}  source={image}/>
        </TouchableOpacity>
    </View>

  );
}

const style = StyleSheet.create({

    card:{
        marginVertical:5,
        backgroundColor:'white',
        padding:0
        
        
        
    },
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent: "center",
        paddingHorizontal: 3,
        marginBottom:10,
        borderRadius:10.

        
      },
      tinyLogo: {
        width: 150,
        height: 150,
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

export default BannerItem;