import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const QuestionInput = () => {
  const [question, setQuestion] = useState('');
  const maxLength = 500;

  const handleSubmit = () => {
    if (question.trim().length === 0) {
      Alert.alert('Empty Question', 'Please enter a question before submitting.');
      return;
    }

    if (question.trim().length < 10) {
      Alert.alert('Too Short', 'Please enter a more detailed question (at least 10 characters).');
      return;
    }

    Alert.alert(
      'Question Submitted!',
      `Your question: "${question.trim()}" has been submitted successfully.`,
      [
        {
          text: 'OK',
          onPress: () => setQuestion(''),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Ask Your Question</Text>
            <Text style={styles.subtitle}>What would you like to know?</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="Type your question here..."
              placeholderTextColor="#999"
              value={question}
              onChangeText={setQuestion}
              maxLength={maxLength}
              textAlignVertical="top"
            />
            
            <View style={styles.footer}>
              <Text style={styles.charCounter}>
                {question.length}/{maxLength}
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            style={[
              styles.submitButton,
              question.trim().length < 10 && styles.submitButtonDisabled
            ]} 
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.submitButtonText,
              question.trim().length < 10 && styles.submitButtonTextDisabled
            ]}>
              Ask Question
            </Text>
          </TouchableOpacity>

          {question.trim().length > 0 && question.trim().length < 10 && (
            <Text style={styles.helperText}>
              Please enter at least 10 characters for a detailed question
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    height: 200,
    padding: 16,
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  charCounter: {
    fontSize: 12,
    color: '#95a5a6',
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#3498db',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#bdc3c7',
    shadowOpacity: 0.1,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  submitButtonTextDisabled: {
    color: '#7f8c8d',
  },
  helperText: {
    fontSize: 12,
    color: '#e74c3c',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default QuestionInput;