// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// export const configureGoogleSignIn = () => {
//   GoogleSignin.configure({
//     // Your configuration options
//     webClientId: 'YOUR_WEB_CLIENT_ID', // Get this from your Google API Console
//     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   });
// };

// export const signInWithGoogle = async () => {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     return userInfo;
//   } catch (error) {
//     console.error('Google Sign-In Error:', error);
//     throw error;
//   }
// };

// export const signOutGoogle = async () => {
//   try {
//     await GoogleSignin.signOut();
//   } catch (error) {
//     console.error('Google Sign-Out Error:', error);
//     throw error;
//   }
// };
