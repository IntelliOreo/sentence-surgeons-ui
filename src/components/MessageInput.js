// src/components/MessageInput.js

import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';
import { globalStyles, COLORS, FONTS, FONT_SIZES } from '../styles/globalStyles';
import { Keyboard } from 'react-native';

const MAX_CHAR_LIMIT = 300;

const MessageInput = ({ message, setMessage, onSend }) => {
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (message.length > MAX_CHAR_LIMIT) {
      setIsValid(false);
      setErrorMessage(`Message exceeds ${MAX_CHAR_LIMIT} characters`);
    } else if (message.trim() === '') {
      setIsValid(false);
      setErrorMessage('');
    } else {
      setIsValid(true);
      setErrorMessage('');
    }
  }, [message]);

  const handleSend = () => {
    if (isValid) {
      onSend();
      setMessage(''); 
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, !isValid && message.trim() !== '' && styles.inputError]}
        value={message}
        onChangeText={(text) => setMessage((prevMessage) => text)}
        placeholder="Enter your message"
        multiline
        maxLength={MAX_CHAR_LIMIT}
      />
      <Text style={styles.charCount}>
        {message.length}/{MAX_CHAR_LIMIT}
      </Text>
      {errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
      <View style={styles.buttonContainer}>
        <CustomButton 
          title="Send" 
          onPress={handleSend}
          disabled={!isValid} 
          style={styles.sendButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    ...globalStyles.input,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 5,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  charCount: {
    alignSelf: 'flex-end',
    fontSize: FONT_SIZES.small,
    color: COLORS.secondary,
    marginBottom: 5,
    fontFamily: FONTS.primary,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.small,
    marginBottom: 5,
    fontFamily: FONTS.primary,
  },
  buttonContainer: {
    marginTop: 10,
  },
  sendButton: {
    alignSelf: 'flex-end',
    width: 100,
  }
});

export default MessageInput;