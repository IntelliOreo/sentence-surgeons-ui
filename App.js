import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import { AuthContext, AuthProvider } from './src/context/auth/AuthContext';
import { MessageHistoryProvider } from './src/context/messageHistory/MessageHistoryContext';
import { RateLimitProvider } from './src/context/rateLimit/RateLimitContext';
import NameScreen from './src/screens/NameScreen';
import MainScreen from './src/screens/MainScreen';
import LogInScreen from './src/screens/LogInScreen';
import SummaryScreen from './src/screens/SummaryScreen';

import { 
  KeyboardAvoidingView, 
  Platform, 
  SafeAreaView, 
  StyleSheet,
} from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  let  { isSignedIn, checkSignInStatus }  = useContext(AuthContext);
  const [fontsLoaded] = useFonts({
    'AmaticSC-Regular': require('./assets/fonts/AmaticSC-Regular.ttf'),
    'AmaticSC-Bold': require('./assets/fonts/AmaticSC-Bold.ttf'),
    'Bellefair-Regular': require('./assets/fonts/Bellefair-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  console.log('isSignedIn - in app.js', isSignedIn);
  console.log('checkSignInStatus - in app.js', checkSignInStatus);

  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <AuthProvider>
          <MessageHistoryProvider>
          <RateLimitProvider>
            <NavigationContainer>
              <Tab.Navigator initialRouteName="Name">
                <Tab.Screen name="Name" component={NameScreen} options={{ title: 'Welcome' }} />
                <Tab.Screen name="Main" component={MainScreen} options={{ title: 'LLM Chat' }} />
                <Stack.Screen name="Summary" component={SummaryScreen} options={{ title: 'Summary' }} />
                <Stack.Screen name="LogIn" component={LogInScreen} options={{ title: 'Log In' }} />
              </Tab.Navigator>
            </NavigationContainer>
            </RateLimitProvider>
           </MessageHistoryProvider>
         </AuthProvider>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
});