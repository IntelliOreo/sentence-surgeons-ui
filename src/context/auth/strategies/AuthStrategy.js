import logger from '../../logger';

export default class AuthStrategy {

    signIn(credentials) {
      throw new Error('signIn method must be implemented');
    }
  
    signUp(credentials) {
      throw new Error('signUp method must be implemented');
    }
  
    signOut(credentials) {
      throw new Error('signOut method must be implemented');
    }

    restoreSignIn(credentials){
      throw new Error('restoreSignIn method must be implemented');
    }
  }