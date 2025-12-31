import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const greetings = [
  'Oi!',
  'Olá!',
  'E aí!',
  'Tudo bem?',
  'Como vai?',
  'Salve!'
];

export default function GreetingScreen({ navigation }) {
  const [currentGreeting, setCurrentGreeting] = useState(0);

  const changeGreeting = () => {
    setCurrentGreeting((prev) => (prev + 1) % greetings.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>👋</Text>
        <Text style={styles.greeting}>{greetings[currentGreeting]}</Text>
        <Text style={styles.subtitle}>Toque para mudar a saudação</Text>
        
        <TouchableOpacity style={styles.button} onPress={changeGreeting}>
          <Text style={styles.buttonText}>Mudança</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={() => navigation.navigate('Welcome')}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Ver Boas-vindas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
    minWidth: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3498db',
  },
  secondaryButtonText: {
    color: '#3498db',
  },
});