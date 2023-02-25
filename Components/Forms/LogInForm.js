import React, { useState,useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HeaderBackButton} from "@react-navigation/elements";
import { useNavigation, useRoute } from '@react-navigation/native'

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

  const handleLogin = () => {
      // Validate the form fields
    if (!phoneNumber || !password) {
        // Display an error message if any of the fields are empty
        alert('Phone number and password are required');
        return;
    } 
    // Make a POST request to the TokenViewSet to obtain a token
    fetch('http://192.168.43.4:8000/api/tokens/', {
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
      // Store the token and refresh token in AsyncStorage
      AsyncStorage.setItem('token', data.access);
      AsyncStorage.setItem('refresh_token', data.refresh);
      AsyncStorage.setItem('user',data.user)
      navigation.navigate('Home');

    })
    .catch(error => {
      // If the request fails, display an error message
      console.error(error);
      alert('Login failed');
    });
  }

  const handleRefresh = () => {
    // Make a POST request to the TokenRefreshViewSet to obtain a new token
    fetch('http://localhost:8000/api/tokens/refresh/', {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
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
      <Button title="Log in" onPress={handleLogin} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    borderRadius: 4,
  },
});

export default Login;
