import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function ResultDisplay({ result }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Result:</Text>
      <Text style={styles.result}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    ...globalStyles.secondaryText,
    marginBottom: 5,
  },
  result: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});