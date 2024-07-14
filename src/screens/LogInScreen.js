import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/auth/AuthContext';
import * as AppleAuthentication from 'expo-apple-authentication';
import CustomSignInButton from '../components/CustomSignInButton';
import { logger } from '../utils/logger';
import initServices from '../context/auth/utils/initServices';

export default function LogInScreen({ navigation }) {
  const { setUser, setIsSignedIn, isSignedIn } = useContext(AuthContext);
  console.log('initServices,',  initServices)
  const authHandlers = initServices(setUser, setIsSignedIn);
  
  const handleSignIn = async (provider) => {
    try {
      await authHandlers[provider].signIn();
      navigation.navigate('Main');
    } catch (error) {
      logger('sign in failed in LogInScreen','e', error);
    }
  };

  const handleSignOut = async (provider = 'generic') => {
      await authHandlers[provider].signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in page</Text>
      {isSignedIn ? (
        <>
          <Text style={styles.message}>You are currently logged in.</Text>
          <Button title="Log Out" onPress={() => handleSignOut()} />
        </>
      ) : (
        <>
        <CustomSignInButton onPress={() => handleSignIn('google')} title="Gooo :D" />
        <Text> </Text>       
        <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={() => handleSignIn('apple')}
        />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 44,
  },
});
