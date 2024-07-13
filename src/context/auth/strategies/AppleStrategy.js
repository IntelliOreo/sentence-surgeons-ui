import * as AppleAuthentication from 'expo-apple-authentication';
import { logger } from '../../utils/log';

export default class AppleStrategy extends AuthStrategy {
    constructor() {
        super();
    }

    async signIn(credentials) {
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
    }
  
    async signOut(credentials) {
        try {
            await GoogleSignin.signOut();
          } catch (error) {
            logger('Google Sign-Out Error:','e', error);
            throw error;
          }
    }

    async restoreSignIn(credentials){
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
    }

  }