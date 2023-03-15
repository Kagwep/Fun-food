import React, { useState,useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity,Image,ImageBackground,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HeaderBackButton} from "@react-navigation/elements";
import { useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

const Login = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle:"Log in",
        headerLeft: () => (
          <HeaderBackButton 
            tintColor='white'
            onPress={() => navigation.goBack()}
          
          />
        )
      })
     },[])

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState('');
  const [loading,setLoading] = useState(false);

  const handleLogin = () => {
      // Validate the form fields
    setLoading(true);
    if (!phoneNumber || !password) {
        // Display an error message if any of the fields are empty
        alert('Phone number and password are required');
        return;
    } 
    // Make a POST request to the TokenViewSet to obtain a token
    fetch('https://funfood.vercel.app/api/tokens/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      // If the request is successful, set the token and refresh token in the app
      setToken(data.access);
      setRefreshToken(data.refresh);
      setUser(data.user);
      setLoading(false)
      // Store the token and refresh token in AsyncStorage
      const myuser = JSON.stringify(data.user);
      AsyncStorage.setItem('token', data.access);
      AsyncStorage.setItem('refresh_token', data.refresh);
      AsyncStorage.setItem('user',myuser)
      navigation.navigate('ProfileTab');

    })
    .catch(error => {
      // If the request fails, display an error message
      console.error(error);
      alert('Login failed');
      setLoading(false)
    });
  }

  const handleRefresh = () => {
    // Make a POST request to the TokenRefreshViewSet to obtain a new token
    fetch('https://funfood.vercel.app/api/tokens/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refresh: refreshToken
      })
    })
    .then(response => response.json())
    .then(data => {
      // If the request is successful, set the new token in the app
      setToken(data.token);

      // Update the token in AsyncStorage
      AsyncStorage.setItem('token', data.token);
    })
    .catch(error => {
      // If the request fails, display an error message
      console.error(error);
      alert('Token refresh failed');
    });
  }

  console.log(token)
  console.log(user)

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
    <View style={[styles.fixed, styles.scrollview]}>
      <Image style={styles.tinyLogo} source={require('./login.png')} />
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone number"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
      />
      <TouchableOpacity
      onPress={handleLogin}
      style={styles.login}
      >
        <Text style={styles.logintext}> Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
       onPress={() => navigation.navigate("Register")}
       style={styles.register}
      >
        <Text style={styles.registertext}>Register</Text>
      </TouchableOpacity>

    </View>
    </View>

  );
};

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  button: {
    marginTop: 20,
    borderRadius: 4,
  },
  login:{
    paddingHorizontal:20,
    paddingVertical:10,
    borderRadius:10,
    marginTop:10,
    backgroundColor:"#D2B04C",
  },
  register:{
    marginTop:10,
    padding:10,
    borderRadius:10,
  },
  logintext:{
    fontSize:15,
    color:'#ffffff',
    textAlign:'center'
  },
  registertext:{
    fontSize:15,
    color:'rgb(0,0,255)',
    fontSize:18,
  },
  tinyLogo: {
    width: '100%',
    height: 200,
    
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
 spinnerTextStyle: {
   color: '#FFF',
 },
});

export default Login;
