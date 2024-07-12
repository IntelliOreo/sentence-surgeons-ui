import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/auth/AuthContext';
import * as AppleAuthentication from 'expo-apple-authentication';
import CustomSignInButton from '../components/CustomSignInButton';
import { logger } from '../utils/log';

export default function LogInScreen({ navigation }) {
  const { signIn, signOut, isSignedIn, googleSignInTemporary } = useContext(AuthContext);

  const handleSignIn = async () => {
    try {
      await googleSignInTemporary();
      logger(`googleSignInTemporay in LogInScreen, isSignedIn: ${isSignedIn}`)
      navigation.navigate('Main');
    } catch (error) {
      logger('googleSignInTemporay in LogInScreen','error', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      logger('handleSignOut in LogInScreen. Signed out.');
    } catch (error) {
      logger('handleSignOut in LogInScreen','error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in page</Text>
      {isSignedIn ? (
        <>
          <Text style={styles.message}>You are currently logged in.</Text>
          <Button title="Log Out" onPress={handleSignOut} />
        </>
      ) : (
        <>

        <CustomSignInButton onPress={handleSignIn} title="Gooo :D" />
        <Text> </Text>       
        <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={async () => {
          try {
            signIn();
          } catch (e) {
            logger('AppleAuthentication in LogInScreen','error', e);
          }
        }}
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
