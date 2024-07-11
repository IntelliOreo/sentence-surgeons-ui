import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZES } from '../styles/globalStyles';

const CustomSignInButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress} 
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.white,
    fontSize: 18,
  },
});

export default CustomSignInButton;