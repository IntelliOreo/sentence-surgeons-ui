import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/auth/AuthContext';

export default function LogInScreen({ navigation }) {
  const { signIn, signOut, isSignedIn } = useContext(AuthContext);

  const handleSignIn = async () => {
    try {
      await signIn();
      console.log('Signed in! - login screen');
      console.log('isSignedIn in LogIn page:' + isSignedIn);
      navigation.navigate('Main');
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log('Signed out!');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      {isSignedIn ? (
        <>
          <Text style={styles.message}>You are currently logged in.</Text>
          <Button title="Log Out" onPress={handleSignOut} />
        </>
      ) : (
        <Button title="Hit this button!" onPress={handleSignIn} />
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
});
