import { logger } from '../../../utils/logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store'; 

export default class AuthStrategy {
  constructor(setUser, setIsSignedIn) {
      this.setUser = setUser;
      this.setIsSignedIn = setIsSignedIn;
    }

    signIn(credentials) {
      throw new Error('signIn method must be implemented');
    }
  
    signUp(credentials) {
      throw new Error('signUp method must be implemented');
    }
  
    async signOut(credentials) {
      try {
        await this.deleteUserInfoAndSetState();
      } catch (error) {
        logger('Sign-Out Error:','e', error);
      }
    }

    async restoreSignInFromStorage(credentials){
      const userToken = await SecureStore.getItemAsync('userToken');
        const userData = await AsyncStorage.getItem('userData');
        if (userToken && userData) {
          this.setIsSignedIn(true);
          this.setUser(JSON.parse(userData));
        } else {
          this.setIsSignedIn(false);
          this.setUser(null);
        }
    }

    // internal methods

    async putUserInfoInStorageAndSetState(userInfo){
      try{
        await SecureStore.setItemAsync('userToken', userInfo.idToken);
        await AsyncStorage.setItem('userData', JSON.stringify(userInfo.user));
        this.setUser(userInfo.user);
        this.setIsSignedIn(true);
      } catch(error){
        logger('Error putting user info:', 'e', error);
      }
    } 

    async deleteUserInfoAndSetState(){
      try{
        await SecureStore.deleteItemAsync('userToken');
        await AsyncStorage.removeItem('userData');
        this.setIsSignedIn(false);
        this.setUser(null);
      }catch(error){
        logger('Error deleting user info in storage:', 'e', error);
      }
    };

    userMapper(credentials){
      throw new Error('userMapper method must be implemented');
    };

  }