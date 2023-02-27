import React, { useState ,useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ImageBackground,Dimensions,Image,Alert } from 'react-native';
import { useNavigation , useRoute} from '@react-navigation/native';
import {HeaderBackButton} from "@react-navigation/elements";

export default function UserRegistration() {
  const [fullNames, setFullNames] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

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
  
  const handleSubmit = () => {
    const data = {
      full_names: fullNames,
      phone_number: phoneNumber,
      location: location,
      password: password,
    };

    fetch('http://192.168.43.4:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data =>{
        console.log(data);
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
  };

  return (
    <View style={styles.containers}>
            <ImageBackground
            style={[styles.fixed, styles.containter]}
            source={
              require('./funfood.webp')
            }
      />
      <View  style={[styles.fixed, styles.scrollview]}>
      <Image style={styles.tinyLogo} source={require('./register.png')} />
      <Text style={styles.label}>Full Names:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setFullNames(text)}
        value={fullNames}
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setPhoneNumber(text)}
        value={phoneNumber}
      />

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

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
    alignItems: 'center',
    justifyContent: 'center',
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
   backgroundColor: 'rgba(255, 255, 255, 0.5)'
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
});
