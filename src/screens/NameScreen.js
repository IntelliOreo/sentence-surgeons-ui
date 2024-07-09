import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { globalStyles, FONT_SIZES, COLORS } from '../styles/globalStyles';
import { AuthContext } from '../context/auth/AuthContext';

const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z][a-zA-Z0-9 .]*$/;  
    return nameRegex.test(name);
};

export default function NameScreen({ navigation }) {
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { isSignedIn, user } = useContext(AuthContext);

  useEffect(() => {
    if(isSignedIn && user) {
      setName(`Welcome back, ${user.name}`);
      setIsValid(true);
    } else if (name.trim() === '') {
      setIsValid(false);
      setErrorMessage('');
    } else if (!isValidName(name)) {
      setIsValid(false);
      setErrorMessage('Name must start with a letter and contain only letters and numbers.');
    } else {
      setIsValid(true);
      setErrorMessage('');
    }
  }, [name, isSignedIn, user]);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleContinue = () => {
    if (isValid) {
      navigation.navigate('Main', { name: isSignedIn && user ? user.name : name.trim() });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{isSignedIn && user ? `Welcome back!! ${user.name}` : 'Please enter your name:'}</Text>
      {!isSignedIn && (
        <TextInput
          style={[styles.input, !isValid && name.trim() !== '' && styles.inputError]}
          value={name}
          onChangeText={handleNameChange}
          placeholder="Your name"
        />
      )}
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