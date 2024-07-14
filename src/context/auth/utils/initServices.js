import  AuthService  from '../service/AuthService';

export default function initServices(setUser, setIsSignedIn) {
  const isEasBuild = process.env.EXPO_PUBLIC_EAS_BUILD;

  const genericAuthService = new AuthService('generic', setUser, setIsSignedIn);
  const appleAuthService = new AuthService('apple', setUser, setIsSignedIn);
  const googleAuthService = isEasBuild
  ? new AuthService('google', setUser, setIsSignedIn) 
  : genericAuthService;
  

  const providerHandlers = {
    'google': googleAuthService,
    'apple': appleAuthService,
    'generic': genericAuthService,
  };
  return providerHandlers;
}