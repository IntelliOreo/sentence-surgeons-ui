import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { logger } from '../../../utils/logger';
import AuthStrategy from './AuthStrategy';

export default class GoogleStrategy extends AuthStrategy {
    constructor(setUser, setIsSignedIn) {
        super(setUser, setIsSignedIn);
        this.initialize();
        logger('GoogleStrategy.constructor initialized');
    }

    initialize() {
        GoogleSignin.configure({
            iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLT, // Get this from your Google API Console
            webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLT, // Get this from your Google API Console
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
          });
    }
    async signIn(credentials) {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            logger(`Google Sign-In Success. userInfo: `,'',userInfo); 
            this.putUserInfoInStorageAndSetState(userInfo);
        } catch (error) {
            logger('Google Sign-In Error:','e', error);
            throw error;
        }
    }
  }