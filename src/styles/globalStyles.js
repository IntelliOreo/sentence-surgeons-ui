// src/styles/globalStyles.js

export const COLORS = {
    primary: '#2196F3',
    disabled: '#A9A9A9',
    white: 'white',
    inputBorder: '#ccc',
    error: '#FF0000',
  };
  
  export const FONTS = {
    primary: 'AmaticSC-Bold',
    secondary: 'Bellefair-Regular',
  };
  
  export const FONT_SIZES = {
    large: 32,
    medium: 20,
    small: 16,
  };
  
  export const globalStyles = {
    primaryText: {
      fontFamily: FONTS.primary,
      fontSize: FONT_SIZES.large,
    },
    secondaryText: {
      fontFamily: FONTS.secondary,
      fontSize: FONT_SIZES.medium,
    },
    input: {
      borderWidth: 1,
      borderColor: COLORS.inputBorder,
      borderRadius: 5,
      padding: 10,
      fontSize: FONT_SIZES.medium,
      fontFamily: FONTS.secondary,
    },
  };