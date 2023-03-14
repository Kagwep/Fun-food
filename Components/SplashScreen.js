import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = () => {
  const scaleValue = new Animated.Value(1);

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1.5,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.logo, { transform: [{ scale: scaleValue }] }]}
        source={require('../assets/logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
