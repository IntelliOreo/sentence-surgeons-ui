import * as AppleAuthentication from 'expo-apple-authentication';
import { logger } from '../../../utils/log';

export default class AppleStrategy extends AuthStrategy {
  constructor(setUser, setIsSignedIn) {
        super();
    }

    async signIn(credentials) {
        try {
            const cred = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            const userInfo = this.userMapper(cred);
            this.putUserInfoInStorageAndSetState(userInfo);
        } catch (error) {
          if (error.code === 'ERR_REQUEST_CANCELED') {
            logger('Apple Sign-In was canceled by the user.');
          } else {
            logger('Apple Sign-In error:', 'e', error);
          }
            throw error;
        }
    }

    userMapper(credentials){
      return {
        user: { name: `${credentials.fullName.givenName} ${credentials.fullName.familyName}`, email: credential.email },
        idToken: credentials.identityToken,
      };
    };

  }