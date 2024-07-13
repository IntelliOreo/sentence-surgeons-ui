import * as AppleAuthentication from 'expo-apple-authentication';
import { logger } from '../../../utils/logger';
import AuthStrategy from './AuthStrategy';
import { Alert } from 'react-native';

export default class AppleStrategy extends AuthStrategy {
    constructor(setUser, setIsSignedIn) {
        super(setUser, setIsSignedIn);
    }

    async signIn(credentials) {
        let cred;
        try {
            cred = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            logger('cred','', cred);
            const userInfo = this.userMapper(cred);
            await this.putUserInfoInStorageAndSetState(userInfo);
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
      const userInfo = {
            user: { 
                name: `${credentials.fullName.givenName} ${credentials.fullName.familyName}`, 
                email: credentials.email },
            idToken: credentials.identityToken,
          };
      if(userInfo.user.name == null || userInfo.user.email == null){
        Alert.alert(
            'Apple Privacy Policy',
            'No name or email provided from Apple Sign-In',
            [{ text: 'OK' }]
          );
        userInfo.user.name = 'Anonymous Apple User';
        userInfo.user.email = credentials.user;
        
      }
      return userInfo;
    };

  }