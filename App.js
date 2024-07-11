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
import * as Sentry from "@sentry/react-native";
import { Text,Button } from 'react-native';



import { 
  KeyboardAvoidingView, 
  Platform, 
  SafeAreaView, 
  StyleSheet,
} from 'react-native';

const Stack = createStackNavigator();

Sentry.init({
  dsn: "https://b6001c8a6eeccacdd77f9efdb9a94d6d:2b357b2e97d98c3b383a8a8bfeddc757@o4507585400143872.ingest.de.sentry.io/4507585403224144",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

function App() {
  let  { isSignedIn }  = useContext(AuthContext);
  const [fontsLoaded] = useFonts({
    'AmaticSC-Regular': require('./assets/fonts/AmaticSC-Regular.ttf'),
    'AmaticSC-Bold': require('./assets/fonts/AmaticSC-Bold.ttf'),
    'Bellefair-Regular': require('./assets/fonts/Bellefair-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  console.log('isSignedIn - in app.js', isSignedIn);


  const Tab = createBottomTabNavigator();


  return (
    <>
    <Text> here </Text>
    <Button
  title="Try!"
  onPress={() => {
    Sentry.captureException(new Error("First error"));
  }}
/></>
    // <>
    // <SafeAreaView style={styles.container}>
    //   <KeyboardAvoidingView 
    //     behavior={Platform.OS === "ios" ? "padding" : "height"}
    //     style={styles.keyboardAvoidingView}
    //   >
    //     <AuthProvider>
    //       <MessageHistoryProvider>
    //       <RateLimitProvider>
    //         <NavigationContainer>
    //           <Tab.Navigator initialRouteName="Name">
    //             <Tab.Screen name="Name" component={NameScreen} options={{ title: 'Welcome' }} />
    //             <Tab.Screen name="Main" component={MainScreen} options={{ title: 'LLM Chat' }} />
    //             <Stack.Screen name="Summary" component={SummaryScreen} options={{ title: 'Summary' }} />
    //             <Stack.Screen name="LogIn" component={LogInScreen} options={{ title: 'Log In' }} />
    //           </Tab.Navigator>
    //         </NavigationContainer>
    //         </RateLimitProvider>
    //        </MessageHistoryProvider>
    //      </AuthProvider>
    //   </KeyboardAvoidingView>
    // </SafeAreaView>
    // </>
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

export default Sentry.wrap(App);