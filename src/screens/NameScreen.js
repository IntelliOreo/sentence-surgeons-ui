import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { globalStyles, FONT_SIZES, COLORS } from '../styles/globalStyles';

const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z][a-zA-Z0-9 .]*$/;  
    return nameRegex.test(name);
};

export default function NameScreen({ navigation }) {
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (name.trim() === '') {
      setIsValid(false);
      setErrorMessage('');
    } else if (!isValidName(name)) {
      setIsValid(false);
      setErrorMessage('Name must start with a letter and contain only letters and numbers.');
    } else {
      setIsValid(true);
      setErrorMessage('');
    }
  }, [name]);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleContinue = () => {
    if (isValid) {
      navigation.navigate('Main', { name: name.trim() });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Please enter your name:</Text>
      <TextInput
        style={[styles.input, !isValid && name.trim() !== '' && styles.inputError]}
        value={name}
        onChangeText={handleNameChange}
        placeholder="Your name"
      />
      {errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
      <CustomButton 
        title="Continue" 
        onPress={handleContinue} 
        disabled={!isValid} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    label: {
      ...globalStyles.primaryText,
      fontSize: 45,
      marginBottom: 10,
    },
    input: {
      ...globalStyles.secondaryText,
      ...globalStyles.input,
      marginBottom: 20,
    },
  });