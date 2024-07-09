import React, { createContext, useState, useEffect, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../screens/LoadingScreen';

//import { configureGoogleSignIn, signInWithGoogle, signOutGoogle, restoreSignInState } from './GoogleSignIn';

export const AuthContext = createContext({
   isSignedIn: false,
   user: null,
   signIn: () => {},
   signOut: () => {},
   checkSignInStatus: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    // configureGoogleSignIn();
    setTimeout(() => {
        setIsLoading(false);
      }, 500); 
    }, []); 

    useEffect(() => {
        () => console.log('isSignedIn updated in auth:', isSignedIn);
        }, [isSignedIn]); 

  const checkSignInStatus = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        // const restoredUser = await restoreSignInState();
        const restoredUser = true; // Testing
        if (restoredUser) {
          setUser(restoredUser);
          setIsSignedIn(true);
          await AsyncStorage.setItem('userData', JSON.stringify(restoredUser));
          console.log('Restored user:', restoredUser);
        } else {
          await handleSignOut(); 
        }
      }
    } catch (error) {
      console.error('Error checking sign-in status:', error);
      // Consider handling the error gracefully (e.g., display an error message to the user)
    }
  };

  const signOut = async () => {
    try {
      // await signOutGoogle();
      await SecureStore.deleteItemAsync('userToken');
      await AsyncStorage.removeItem('userData');
      setIsSignedIn(false);
      setUser(null);
    } catch (error) {
      console.error('Sign-out failed:', error);
      await handleSignOut(); 
    }
  };

  const signIn = useCallback(async () => {
    console.log('getting into the signIn callback');
    try {
      // const userInfo = await signInWithGoogle();
      const userInfo = {
        user: { name: 'SignedInName', email: '<EMAIL>' },
        idToken: '<TOKEN>',
      }; // Testing
      await SecureStore.setItemAsync('userToken', userInfo.idToken);
      await AsyncStorage.setItem('userData', JSON.stringify(userInfo.user));
      setUser(userInfo.user);
      setIsSignedIn(true);
      console.log('isSignedIn updated in auth - line 78:', isSignedIn);
    } catch (error) {
      console.error('Sign-in failed:', error);
      // Handle sign-in error gracefully
    }
  });

  const handleSignOut = async () => {
    // await signOutGoogle();
    await SecureStore.deleteItemAsync('userToken');
    await AsyncStorage.removeItem('userData');
    setIsSignedIn(false);
    setUser(null);

  };

  return (
    // <AuthContext.Provider value={{ isSignedIn, user, signIn, signOut, checkSignInStatus }}>
    //   {children}
    // </AuthContext.Provider>
     <AuthContext.Provider value={{ isSignedIn, user, signIn, signOut, checkSignInStatus }}>
       {isLoading ? <LoadingScreen /> : children} 
     </AuthContext.Provider>
  );
};
