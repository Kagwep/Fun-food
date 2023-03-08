import React from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, View,Text,TouchableOpacity , Platform, Share, Linking} from 'react-native';
import {HeaderBackButton} from "@react-navigation/elements";
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';


const UnOrderMap = () => {
    const [pin, setPin] = React.useState({
        
            latitude: -1.286389,
            longitude:  36.817223,
          
    })
    const navigation = useNavigation();
    const route = useRoute();

    const {name,phone} = route.params;
    const unorders = useSelector(state => state.orders);
    const [orders, setOrders] = React.useState([]);

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

    const [pdfData, setPdfData] = React.useState(null);
    const generateReceiptPDF = async () => {
      const htmlContent = `
        <html>
            <style>
            table {
              width: 100%;
            }
            td {
              padding: 4px;
            }
            th{
              padding:4px;
            }
          </style>
          <body>
            <h1>Receipt</h1>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${orders
                  .map(
                    ({ item_details, order_price, order_count }) => `
                      <tr>
                        <td>${item_details.name}</td>
                        <td>${item_details.description}</td>
                        <td>${order_price * order_count}</td>
                      </tr>
                    `
                  )
                  .join('')}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2">Total amount:</td>
                  <td>${orders.reduce(
                    (total, { order_price, order_count }) =>
                      total + order_price * order_count,
                    0
                  )}</td>
                </tr>
              </tfoot>
            </table>
          </body>
        </html>
      `;
    
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        width: 612, // 8.5 inches
        height: 792, // 11 inches
      });
    
      const fileName = 'my_pdf_file.pdf';
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;
      
      try {
        await FileSystem.copyAsync({ from: uri, to: fileUri });
        // await Sharing.shareAsync(fileUri);
      } catch (error) {
        console.error(error);
      }

      const message = `New order Placed,Name: ${name}, Phone number: ${phone} order number ${order_number} Please deliver to this location ` + `https://www.google.com/maps/search/?api=1&query=${pin.latitude},${pin.longitude}`;
      const encodedFileUri = encodeURIComponent(uri);
 
      const url = `whatsapp://send?phone=+254707801908&text=${message}&document=${encodedFileUri}`;
    
      Linking.openURL(url);
    };
  
    useFocusEffect(
        React.useCallback(() => {
          setOrders(unorders.orders);
          let isActive = true;
          return () => {
            isActive = false;
          };
        }, [unorders])
      );
      
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
        onPress={generateReceiptPDF}
        
        >

          <Ionicons name="arrow-forward-circle" size={24} color="blue" />
          <Text style={styles.catbactext}>Proceed To Order</Text>

        </TouchableOpacity>
        </>
      )}

      {/* {pdfData && (
        <Pdf
          source={{ base64: pdfData }}
          style={styles.pdf}
          onError={error => console.error(error)}
        />
      )} */}
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
    pdf: {
      flex: 1,
      width: '100%',
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

export default UnOrderMap

