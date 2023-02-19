import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function UserRegistration() {
  const [fullNames, setFullNames] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const data = {
      full_names: fullNames,
      phone_number: phoneNumber,
      location: location,
      password: password,
    };

    fetch('https://example.com/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#428bca',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
