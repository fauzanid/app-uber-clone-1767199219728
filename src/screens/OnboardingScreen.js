import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    { title: 'Welcome', description: 'Let us help you understand our app' },
    { title: 'Features', description: 'Discover what makes our app unique' },
    { title: 'Get Started', description: 'You are ready to explore!' }
  ];

  const handleNextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.replace('Welcome');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
      <Text style={styles.description}>{onboardingSteps[currentStep].description}</Text>
      <TouchableOpacity style={styles.button} onPress={handleNextStep}>
        <Text style={styles.buttonText}>Next</Text>
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
    fontSize: 24,
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

export default OnboardingScreen;