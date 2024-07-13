import  AuthService  from '../service/AuthService';

export default function initServices(setUser, setIsSignedIn) {
  const googleAuthService = !!process.env.EAS_BUILD ? 
  new AuthService('google', setUser, setIsSignedIn) : new AuthService('generic', setUser, setIsSignedIn);
  const appleAuthService = new AuthService('apple', setUser, setIsSignedIn);
  const genericAuthService = new AuthService('generic', setUser, setIsSignedIn);
  const providerHandlers = {
    'google': googleAuthService,
    'apple': appleAuthService,
    'generic': genericAuthService,
  };
  return providerHandlers;
}