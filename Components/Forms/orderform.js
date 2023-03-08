import React, { useState,useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HeaderBackButton} from "@react-navigation/elements";
import { useNavigation, useRoute } from '@react-navigation/native'

const OrderForm = () => {


  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');


  const navigation = useNavigation();

  useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle:"Checkout",
        headerLeft: () => (
          <HeaderBackButton 
            tintColor='white'
            onPress={() => navigation.goBack()}
          
          />
        )
      })
     },[])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order CheckOut</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone Number"
        style={styles.input}
      />
      <Button title="Place order"
      onPress={() => navigation.navigate('UnOrder', 
        {name, phone
        })}
         style={styles.button} />
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

export default OrderForm;
