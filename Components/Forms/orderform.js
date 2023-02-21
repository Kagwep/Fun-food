import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const OrderForm = () => {
  const [food, setFood] = useState('');
  const [drink, setDrink] = useState('');
  const [fruit, setFruit] = useState('');

  const handleOrder = async () => {
    try {
      const response = await fetch('https://example.com/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          food: food,
          drink: drink,
          fruit: fruit,
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
      <Text style={styles.title}>Order Form</Text>
      <TextInput
        value={food}
        onChangeText={setFood}
        placeholder="Food"
        style={styles.input}
      />
      <TextInput
        value={drink}
        onChangeText={setDrink}
        placeholder="Drink"
        style={styles.input}
      />
      <TextInput
        value={fruit}
        onChangeText={setFruit}
        placeholder="Fruit"
        style={styles.input}
      />
      <Button title="Place order" onPress={handleOrder} style={styles.button} />
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