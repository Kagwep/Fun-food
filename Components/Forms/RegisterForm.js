import React, { useState ,useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ImageBackground,Dimensions,Image,Alert,ScrollView } from 'react-native';
import { useNavigation , useRoute} from '@react-navigation/native';
import {HeaderBackButton} from "@react-navigation/elements";
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';

export default function UserRegistration() {
  const [fullNames, setFullNames] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [mes, setMes] = useState('');

  const [pin, setPin] = React.useState({
        
    latitude: -1.286389,
    longitude:  36.817223,
  
})

const isFormValid = () => {
  return fullNames.trim() !== '' && phoneNumber.trim() !== '' && location.trim() !== '' && password.trim() !== '';
};

  // const defaultLatitude = 37.78825;
  // const defaultLongitude = -122.4324;
  const isValidPhoneNumber = (phoneNumber) => {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return regex.test(phoneNumber);
  };
  
  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  
    if (!isValidPhoneNumber(text)) {
      setPhoneNumberError('Please enter a valid phone number');
    } else {
      setPhoneNumberError('');
    }
  };
  

  const navigation = useNavigation();
  const route =useRoute();

  useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle:"Register",
        headerLeft: () => (
          <HeaderBackButton 
            tintColor='white'
            onPress={() => navigation.goBack()}
          
          />
        )
      })
     },[])

    //  const {longitude,latitude} = route.params;
  
  const handleSubmit = () => {
    if (isFormValid()) {
    setLoading(true);
    setMes('')
    const data = {
      full_names: fullNames,
      phone_number: phoneNumber,
      location: location,
      password: password,
    };

    fetch('https://funfood.vercel.app/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data =>{
        console.log(data);
        setLoading(false);
        Alert.alert(
          'Registration Successful!',
          'Welcome to fun food!',
          [
            {
              text: 'Log in to continue',
              onPress: () => navigation.navigate('Login')
            }
          ]
        );
      }
 
        )
      .catch(error => {
      console.error(error);
      setLoading(false);
      Alert.alert(
        'Oops!',
        'Something went wrong!',
        [
          {
            text: 'Try again',
            style: 'cancel'
          }
        ]
      );
    
      
      
      });
    } else{
      setMes("Invalid Details");
    }
  };

  return (
    <View style={styles.containers}>
        <ImageBackground
            style={[styles.fixed, styles.containter]}
            source={
              require('./funfood.webp')
            }
      />
      {loading ? ( 
      <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={'please wait...'}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />):(
          <></>
        )}
      
      <View  style={[styles.fixed, styles.scrollview]}>
      <Image style={styles.tinyLogo} source={require('./register.png')} />
      {mes ? <Text style={styles.errorMessag}>{mes}</Text> : null}
      <Text style={styles.label}>Full Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setFullNames(text)}
        value={fullNames}
      />

    <Text style={styles.label}>Phone Number:</Text>
    <TextInput
      style={[styles.input, phoneNumberError && styles.errorInput]}
      onChangeText={handlePhoneNumberChange}
      value={phoneNumber}
    />
    {phoneNumberError ? <Text style={styles.errorMessage}>{phoneNumberError}</Text> : null}

      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setLocation(text)}
        value={location}
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

 

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={phoneNumberError !== ''}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.buttonText1}>Log In</Text>
      </TouchableOpacity>
      </View>



    </View>
  );
}

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    padding: 20,
  },
  label: {
    textAlign:'center',
    fontWeight: 'bold',
    marginBottom: 5,
    color:'#46f',
    fontSize:17,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  button: {
    backgroundColor:"#D2B04C",
    padding: 10,
    borderRadius: 5,
    marginTop:10,
    paddingHorizontal:20,
    paddingVertical:10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containter: {
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height //for full screen
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
 scrollview: {
   backgroundColor: 'rgba(255, 255, 255, 0.5)',
   backgroundColor:'#ffff'

 },
 button1: {
   padding: 10,
   borderRadius: 5,
   marginTop:10
 },
 buttonText1: {
   color: '#48f',
   fontWeight: 'bold',
   textAlign: 'center',
   fontSize:18,
 },
 tinyLogo: {
  width: '100%',
  height: 150,
  
},
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
map: {
      
  width: '100%',
  height: '50%',
},
spinnerTextStyle: {
  color: '#FFF',
},
errorMessage: {
  color: 'red',
  fontSize: 14,
  marginBottom: 5,
},
errorMessag: {
  color: 'white',
  fontSize: 16,
  marginBottom: 10,
  backgroundColor:'#345',
  padding:5,
  borderRadius:7,
},
});
