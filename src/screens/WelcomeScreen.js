import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Our App</Text>
      <Text style={styles.description}>You are now ready to explore and use all features!</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Start Exploring</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 40,
    marginBottom: 30
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default WelcomeScreen;