import React from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, View,Text,TouchableOpacity } from 'react-native';
import {HeaderBackButton} from "@react-navigation/elements";
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';

const FunFoodMaps = () => {
    const [pin, setPin] = React.useState({
        
            latitude: -1.286389,
            longitude:  36.817223,
          
    })
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle:"Location",
          headerLeft: () => (
            <HeaderBackButton 
              tintColor='white'
              onPress={() => navigation.goBack()}
            
            />
          )
        })
       },[])

    const[locationSelected, setLocationSelected] = React.useState(false)
  return (
    <View style={styles.container}>
        <Text style={{textAlign:'center',padding:10,fontSize:20,}}> Select Your Location</Text>
        <MapView
        style={styles.map}

        initialRegion={{
            latitude: -1.286389,
            longitude:  36.817223,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}

          onPress={(e) => {
            setPin({
                latitude:e.nativeEvent.coordinate.latitude,
                longitude:e.nativeEvent.coordinate.longitude
            });
            setLocationSelected(true)
          }

          }

        >
        <Marker 
        coordinate={pin}
          pinColor='black'
          draggable={true}

          onDragStart={(e) => {
            console.log('drag start', e.nativeEvent.coordinate)
          }}
          onDragEnd = {(e) => {
            setPin({
                latitude:e.nativeEvent.coordinate.latitude,
                longitude:e.nativeEvent.coordinate.longitude
            })
          }}
          
          >
            <Callout>
               <Text> This is my location</Text> 
            </Callout>
        </Marker>
        <Circle center={pin}
         radius={1000}
        />

        </MapView>
        <Text style={{textAlign:'center',padding:10,fontSize:20,color:'green'}}> Tap your location to select it</Text>


        {locationSelected && (
        <>
        <TouchableOpacity
        style={styles.catbac}
        onPress={() => navigation.navigate('Register', 
        {latitude:pin.latitude, longitude:pin.longitude
        })}
        
        >

          <Ionicons name="arrow-forward-circle" size={24} color="blue" />
          <Text style={styles.catbactext}>Proceed To Register</Text>

        </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      
      width: '100%',
      height: '50%',
    },
    catbac:{
        marginTop:10,
        marginHorizontal:5,
        borderRadius:10,
        padding:10,
        flexDirection:'row',
        backgroundColor:'#fdfdfd',
        alignItems:'center',
        justifyContent:'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    catbactext:{
        fontSize:20,
        paddingHorizontal:5,
        textAlign:'center'
    },
  });

export default FunFoodMaps

