import AppleStrategy from "../strategies/AppleStrategy";
import GoogleStrategy from "../strategies/GoogleStrategy";
import AuthStrategy from "../strategies/AuthStrategy";

export default class AuthenticationService {
  constructor(provider, setUser, setIsSignedIn) {
    this.strategy = this.getStrategy(provider);
    this.setUser = setUser;
    this.setIsSignedIn = setIsSignedIn;
  }

  getStrategy(provider) {
    switch (provider) {
      case 'google':
        return new GoogleStrategy(this.setUser, this.setIsSignedIn);
      case 'apple':
        return new AppleStrategy(this.setUser, this.setIsSignedIn);
      case 'generic':
        return new AuthStrategy(this.setUser, this.setIsSignedIn);
      default:
        throw new Error('Invalid authentication provider');
    }
  }

  async signIn(credentials) {
    return this.strategy.signIn(credentials);
  }

  async signUp(credentials) {
    return this.strategy.signUp(credentials);
  }

  async signOut(credentials) {
    return this.strategy.signOut(credentials);
  }

  async restoreSignInFromStorage(credentials) {
    return this.strategy.restoreSignInFromStorage(credentials);
  }
}
