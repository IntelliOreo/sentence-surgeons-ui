import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function NameInput({ name, setName }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Your name"
      />
      {name && <Text style={styles.greeting}>Hello, {name}!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  greeting: {
    fontSize: 18,
    marginTop: 10,
  },
});