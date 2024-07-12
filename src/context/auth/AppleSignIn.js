import * as AppleAuthentication from 'expo-apple-authentication';
import { logger } from '../../utils/log';

export const signInWithApple = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    return credential;
  } catch (error) {
    if (error.code === 'ERR_REQUEST_CANCELED') {
      logger('Apple Sign-In was canceled by the user.');
    } else {
      logger('Apple Sign-In error:', 'e', error);
    }
    throw error;
  }
};

export const refreshAppleCredential = async (user) => {
  try {
    const credential = await AppleAuthentication.refreshAsync({
      user,
    });
    return credential;
  } catch (error) {
    if (error.code === 'ERR_REQUEST_CANCELED') {
      logger('Apple credential refresh was canceled by the user.');
    } else {
      logger('Apple credential refresh error:', 'e', error);
    }
    throw error;
  }
};

export const restoreAppleSignInState = async () => {
  try {
    const credential = await AppleAuthentication.getCredentialStateAsync();
    if (credential) {
      return credential;
    }
    return null;
  } catch (error) {
    logger('Error restoring Apple Sign-In state:', 'e', error);
    throw error;
  }
};

 
