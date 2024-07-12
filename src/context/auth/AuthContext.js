import React, { createContext, useState, useEffect, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../../screens/LoadingScreen';
import { signInWithApple } from './AppleSignIn';
import { signInWithGoogle, configureGoogleSignIn } from './GoogleAuth';
import { IsEnvSentryCaptureException } from '../../utils/network';
import { logger } from '../../utils/log';

export const AuthContext = createContext({
   isSignedIn: false,
   user: null,
   signIn: () => {},
   signOut: () => {},
   googleSignInTemporary: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false);
      }, 500); 
      restoreSignInState();
      configureGoogleSignIn();
    }, []); 

    useEffect(() => {
        () => logger(`isSignedIn updated in auth: , ${isSignedIn}`);
        }, [isSignedIn]); 
  
  const restoreSignInState = async () => {
        const userToken = await SecureStore.getItemAsync('userToken');
        const userData = await AsyncStorage.getItem('userData');
        if (userToken && userData) {
          setIsSignedIn(true);
          setUser(JSON.parse(userData));
        } else {
          setIsSignedIn(false);
          setUser(null);
        }
      };

  const signOut = async () => {
    await deleteUserInfoAndSetState();
  };

  const signIn = useCallback(async () => {
    logger('getting into the signIn callback');
    try {
      const credential = await signInWithApple();
      const userInfo = userMapper(credential);
      putUserInfoInStorageAndSetState(userInfo);
      logger(`isSignedIn updated in auth:, ${isSignedIn}`);
    } catch (error) {
      logger('Sign-in failed:', 'error', error);
    }
  });


  const googleSignInTemporary = useCallback(async () => {
    logger('getting into the signIn callback');
    try {
      const userInfo = await signInWithGoogle();
      putUserInfoInStorageAndSetState(userInfo);
      logger(`isSignedIn in auth, ${isSignedIn}`);
    } catch (error) {
      logger('Sign-in failed:', 'error', error);
    }
  });

  const deleteUserInfoAndSetState = async () => {
    await SecureStore.deleteItemAsync('userToken');
    await AsyncStorage.removeItem('userData');
    setIsSignedIn(false);
    setUser(null);
  };

  const userMapper = (credential) => {
    return {
      user: { name: `${credential.fullName.givenName} ${credential.fullName.familyName}`, email: credential.email },
      idToken: credential.identityToken,
    };
  };

  const putUserInfoInStorageAndSetState = async (userInfo) => {
    try{
      await SecureStore.setItemAsync('userToken', userInfo.idToken);
      await AsyncStorage.setItem('userData', JSON.stringify(userInfo.user));
      setUser(userInfo.user);
      setIsSignedIn(true);
    } catch(error){
      logger('Error putting user info:', 'error', error);
    }  
  };

  return (

     <AuthContext.Provider value={{ isSignedIn, user, signIn, signOut, googleSignInTemporary }}>
       {isLoading ? <LoadingScreen /> : children} 
     </AuthContext.Provider>
  );


};
