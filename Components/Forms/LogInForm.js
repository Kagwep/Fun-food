import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://example.com/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone_number: phone,
          password: password,
        })
      });
      const data = await response.json();
      console.log(data); // do something with the data
    } catch (error) {
      console.error(error);
    }
  };

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
