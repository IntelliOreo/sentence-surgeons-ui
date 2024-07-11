import * as AppleAuthentication from 'expo-apple-authentication';

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
      console.warn('Apple Sign-In was canceled by the user.');
    } else {
      console.error('Apple Sign-In error:', error);
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
      console.warn('Apple credential refresh was canceled by the user.');
    } else {
      console.error('Apple credential refresh error:', error);
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
    console.error('Error restoring Apple Sign-In state:', error);
    throw error;
  }
};

 
